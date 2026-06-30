<template>
    <div class="cardContainer">
        <div class="pic">
            <div class="picHolder" v-if="stepOrWorkout === 'Workout'">
                <img src="../assets/images/workoutTemp.jpg" alt="Workout Image" />
            </div>
            <div class="picHolder" v-if="stepOrWorkout === 'Step'">
                <img src="../assets/images/runTemp.jpeg" alt="Workout Image" />
            </div>
        </div>
        <div class="textHolder" v-if="stepOrWorkout === 'Workout'">
            <h5>{{details.Name}}</h5>
            <p class="details">{{ details.Type }} Training</p>
            <p class="details">{{ details.Muscles }}</p>
            <p class="details">Intensity Level {{ details.Intensity }}</p>
            <p class="details">{{this.time}}</p>
        </div>
        <div class="textHolder" v-if="stepOrWorkout === 'Step'">
            <h5>{{details.Name}}</h5>
            <p class="details">{{ details.Machine }} Training</p>
            <p class="details">{{ details.Steps }} Steps</p>
            <p class="details">Incline Level {{ details.Incline }} </p>
            <p class="details">{{this.time}}</p>
        </div>
        <div class="date">{{ this.date }} </div>
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap";

export default {name: 'SteporWorkoutContainer',
    props:['details' , 'stepOrWorkout'],
    components: {
      
    },
    data() {
        return {
            time: '',
            date : ''
        }
    
    },
    mounted() {
        let temp = this.details.Time;
        console.log(temp)
        temp = temp.split("",2);
        this.time = temp[0] + " H " + temp[1] + " M";

        let temo = this.details.Date;
        const datee = new Date(temo)

        this.date = (datee.getDate() < 10 ? ('0' + datee.getDate()) : datee.getDate()) +  "/" + 
        ((datee.getMonth() + 1) < 10 ? ('0' + (datee.getMonth() + 1)) : datee.getMonth() + 1)
         + "/" + datee.getFullYear(); 
    },
}
</script>


<style scoped lang="css">
.cardContainer{
    display: flex;
    flex-direction: row;
    width: 25rem;
    height: fit-content;
    gap: 1rem;
    background-color: #7C66C5;
    font-family: "Gabarito", sans-serif;
    padding: 1.3rem;
    padding-right: 0rem;
    box-shadow: 8px 8px var(--neon_green);
}

.cardContainer .pic{
    width: 7rem;
    height: 7rem;
    
}

.cardContainer .pic .picHolder{
    width: 7rem;
    height: 7rem;

}

.cardContainer .pic .picHolder img{
    width: 7rem;
    height: 7rem;
    object-fit: cover;
}

.cardContainer .textHolder{
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-items: baseline;
}

.cardContainer .textHolder h5{
    font-size: 1.1rem;
    margin: 0;
    padding-bottom: 0.2rem;
}

.cardContainer .textHolder .details{
    opacity: 50%;
    font-size: 0.9rem;
    margin-bottom: 0;
}

.cardContainer .date{
    width: fit-content;
    opacity: 50%;
    margin-bottom: 0;
    font-size: 0.9rem;
    
}
</style>

