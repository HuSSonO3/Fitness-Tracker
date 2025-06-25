import express from 'express'
import mongoose from 'mongoose'
import { Workout, Step, Account, Meal } from './src/models/models.js'
import { createHmac } from 'crypto'
import dotenv from 'dotenv'
import { default as connectMongoDBSession } from 'connect-mongodb-session'
import session from 'express-session'
import jwt from 'jsonwebtoken'
const MongoDBStore = connectMongoDBSession(session)
import verifyToken from './authMW.js'
import cors from 'cors'
import { truncate } from 'fs'

// let isAuthenticated;

dotenv.config()
const app = express()
const PORT = process.env.PORT

// const store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/fitnessSessions',
//   collection: 'sessions'
// });

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
)
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb' }))

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
  }),
)

// Check if loggedin

app.get('/api/islogged', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      res.status(200).json({ message: 'Logged in' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.post('/api/register', async (req, res) => {
  console.log(req.body)
  const hashedPass = await hashPassword(req.body.Password)
  console.log(hashedPass)
  const account = new Account({
    Username: req.body.Username,
    Email: req.body.Email,
    Password: hashedPass, // using Pre in models to hash it.
  })
  try {
    const newAccount = await account.save()
    res.status(201).json(newAccount)
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    console.log(req.body)
    const hashedPass = await hashPassword(req.body.Password)
    // const JWTAuthKey = req.session.JWTAuthKey || 'No session set';
    const user = await Account.findOne({ Username: req.body.Username })
    if (!user) {
      return res.status(401).send('Username Doesnt Exist')
    }

    if (!(hashedPass === user.Password)) {
      return res.status(401).send('Password Invalid')
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: req.body.StayLoggedIn ? '10d' : '2m',
    })
    req.session.token = token
    res.status(200).json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

app.post('/api/logout', async (req, res) => {
  req.session.destroy()
  res.send('Logged out')
})

// PROFILE

app.patch('/api/userImage', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      user.Image = req.body.Image
      await user.save()
      console.log('User found: ', user)
      console.log('Request body: ', req)
      res.status(201).json('Test')
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/profile', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/getImage', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ Image: user.Image, Valid: true })
    } catch (err) {
      res.status(500).json({ message: err.message, Valid: false })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/checkPass/:pass', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      const hashedPass = await hashPassword(req.params.pass)
      console.log('Hi')
      console.log(hashedPass)
      console.log(user.Password)
      if (hashedPass !== user.Password) {
        return res.status(200).json({ Pass: false })
      }
      res.status(200).json({ Pass: true })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.patch('/api/userInfo', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      user.Country = req.body.Country
      user.Firstname = req.body.Firstname
      user.Lastname = req.body.Lastname
      user.Phone = req.body.Phone
      user.Email = req.body.Email
      user.Height = req.body.Height
      user.Weight = req.body.Weight
      user.DoB = req.body.DoB

      await user.save()
      console.log('User found: ', user)
      console.log('Request body: ', req)
      res.status(201).json('Test')
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.patch('/api/changePass', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const oldPass = await hashPassword(req.body.oldPassword)
      const newPass = await hashPassword(req.body.newPassword)
      console.log('Old Password: ', oldPass)
      console.log('New Password: ', newPass)

      if (oldPass !== user.Password) {
        return res.status(200).json({ Pass: false })
      }

      user.Password = newPass
      await user.save()

      console.log('User found: ', user)
      console.log('Request body: ', req)
      res.status(201).json('Test')
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.delete('/api/deleteAccount', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      await Account.deleteOne({ _id: JWTAuthKey })
      req.session.destroy()
      res.send('Logged out')
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

// WORKOUT

app.get('/api/workout', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const tasks = await Workout.find({ userID: user._id })
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.post('/api/workout', async (req, res) => {
  const workout = new Workout({
    Name: req.body.Name,
    Type: req.body.Type,
    Muscles: req.body.Muscles,
    Intensity: req.body.Intensity,
    Time: req.body.Time,
    Date: req.body.Date,
  })

  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      workout.userID = user._id

      const newWorkout = await workout.save()

      res.status(201).json(newWorkout)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

// Steps

app.get('/api/steps', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const tasks = await Step.find({ userID: user._id })
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.post('/api/steps', async (req, res) => {
  const step = new Step({
    Name: req.body.Name,
    Machine: req.body.Machine,
    Steps: req.body.Steps,
    Incline: req.body.Incline,
    Time: req.body.Time,
    Date: req.body.Date,
  })

  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      step.userID = user._id

      const newStep = await step.save()

      res.status(201).json(newStep)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

// Meals

app.get('/api/meal/:id', async (req, res) => {
  const mealID = req.params.id
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  console.log(mealID)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const tasks = await Meal.findOne({ _id: mealID })
      console.log(tasks)
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/meals', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const tasks = await Meal.find()
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/favMeals', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    const user = await Account.findOne({ _id: JWTAuthKey })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    console.log(JWTAuthKey)
    try {
      const tasks = await Meal.find({ UsersLiked: user._id })
      res.json(tasks)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.post('/api/likeFood', async (req, res) => {
  const mealId = req.body.Food
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const meal = await Meal.findOne({ _id: mealId })
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' })
      }

      // Check if user has already liked the meal
      if (meal.UsersLiked.includes(user._id)) {
        return res.status(400).json({ message: 'You have already liked this meal' })
      }

      // Add userId to Likes array
      meal.UsersLiked.push(user._id)
      await meal.save()

      res.status(200).json(meal)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.post('/api/dislikeFood', async (req, res) => {
  const mealId = req.body.Food
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const meal = await Meal.findOne({ _id: mealId })
      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' })
      }

      // Check if user has already liked the meal
      if (!meal.UsersLiked.includes(user._id)) {
        return res.status(400).json({ message: 'You didnt like this meal' })
      }

      // Add userId to Likes array
      meal.UsersLiked.remove(user._id)
      await meal.save()

      res.status(200).json(meal)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

app.get('/api/checkIfLiked/:id', async (req, res) => {
  const mealId = req.params.id
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    console.log(JWTAuthKey)
    try {
      const meal = await Meal.findOne({ _id: mealId })

      if (!meal) {
        return res.status(404).json({ message: 'Meal not found' })
      }

      const user = await Account.findOne({ _id: JWTAuthKey })
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Check if user has already liked the meal
      if (meal.UsersLiked.includes(user._id)) {
        return res.status(200).json({ Liked: true })
      } else {
        return res.status(200).json({ Liked: false })
      }
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

// app.get('/api/searchMeal', async(req, res) => {
//   try{
//     const searchQ = req.query.query;
//     console.log(searchQ)
//     const query = {
//       $or: [
//         { Name: { $regex: searchQ, $options: 'i' } },
//       ],
//     };

//     const results = await Meal.find(query)

//     console.log(results)

//     // res.json(array)
//   }

//   catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }

// })

// Put more details - Info edit.

// app.put('/api/account/:id', async (req, res) => {
//   const { id } = req.params
//   const { Firstname, Lastname, Email, Phone, Country, Password } = req.body

//   try {
//     // check pass if same
//     const updatedAccount = await Account.findByIdAndUpdate(id, {
//       Firstname,
//       Lastname,
//       Email,
//       Phone,
//       Country,
//     })

//     if (!updatedAccount) {
//       return res.status(404).json({ message: 'Account not found' })
//     }

//     res.json(updatedAccount)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

app.get('/api/getStats', async (req, res) => {
  const JWTAuthKey = verifyToken(req, res)
  console.log(JWTAuthKey)
  if (JWTAuthKey !== 'Access Denied') {
    const user = await Account.findOne({ _id: JWTAuthKey })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    console.log(JWTAuthKey)
    try {
      const workouts = await Workout.find({ userID: user._id })
      const steps = await Step.find({ userID: user._id })
      const meals = await Meal.find({ UsersLiked: user._id })
      const stats = { Workouts: workouts, Steps: steps, meals: meals, name: user.Username }
      console.log(stats)
      res.json(stats)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(401).json({ message: 'Access Denied' })
  }
})

mongoose
  .connect('mongodb://localhost:27017/fitness')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

async function hashPassword(passwordd) {
  const hash = createHmac('sha256', 'abcdefg').update(passwordd).digest('hex')
  return hash
}
