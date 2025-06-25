// export default Task

import mongoose from 'mongoose';

const workoutsSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },

    Type: {
        type: String,
        enum: ['Cardiovascular', 'Strength', 'Flexibility', 'HIIT', 'Endurance'],
        required : true 
    },
    Muscles: {
        type: String,
        enum: ['Glutes', 'Hamstrings', 'Quadriceps', 'Back', 'Chest', 'Core', 'Shoulders', 'Arms', 'Legs'],
        required : true 
    },
    Intensity:{
        type: Number,
        required: true,
    },
    Time:{
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
});

const stepSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true,
    },
    Machine: {
        type: String,
        enum: ['Stepper', 'Treadmill', 'Stepmill', 'Walk', 'Jog', 'Run'],
        required : true 
    },
    Steps: {
        type: Number,
        required : true 
    },
    Incline:{
        type: Number,
        required: true,
    },
    Time:{
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

const IngredientsSchema = new mongoose.Schema({ 
    Name: {type: String, required: true} , 
    Size: {type:Number, required: true},
    Type: {type:String, required: true}
  });


const mealSchema = new mongoose.Schema({
    Name: { 
        type: String, 
        required: true 
    },
    Image : {
        type: String,
        required: false,
    },
    Type: {
        type: String,
        required : true 
    },
    MainProtein: {
        type: String,
        required : true 
    },
    Vegan:{
        type: Boolean,
        required: true,
    },
    Vegetarian:{
        type: Boolean,
        required: true,
    },
    Stats:{
        Protein:
        {
            type:Number,
            required: true,
        },
        Calories:
        {
            type:Number,
            required: true,
        },
        Carbohydrates:
        {
            type:Number,
            required: true,
        },
        Portion:
        {
            type:Number,
            required: true,
        },
    },
    Ingredients: [IngredientsSchema],
    Instructions:[{
        type: String,
        required: true,
    }],
    UsersLiked: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
    }],
});

const accountSchema = new mongoose.Schema({
    Firstname: { 
        type: String, 
        required: false 
    },
    Lastname: {
        type: String,
        required : false 
    },
    Username: {
        type: String,
        required : true,
        unique: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    Password:{
        type: String,
        required: true,
    },
    Phone:{
        type: String,
        required: false,
        unique: false,
    },
    Weight:{
        type: Number,
        required: false,
    },
    Height:{
        type: Number,
        required: false,
    },
    DoB:{
        type: String,
        required: false,
    },
    Image : {
        type: String,
        required: false,
    }
});


export const Workout = mongoose.model('Workout', workoutsSchema);
export const Step = mongoose.model('Step', stepSchema);
export const Meal = mongoose.model('Meal', mealSchema);
export const Account = mongoose.model('Account', accountSchema);

