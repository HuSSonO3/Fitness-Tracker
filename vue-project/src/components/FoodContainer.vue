<template>
    <div class="cardContainer">
        <div class="pic" @click="goToFood(this.details._id)">
            <div class="picHolder">
                <img :src="'data:image/png;base64, ' + this.details.Image" alt="Food Image" />
            </div>
        </div>
        <div class="textHolder" @click="goToFood(this.details._id)">
            <h5>{{ this.details.Name }}</h5>
        </div>
        <div class="detailsHolder">
            <div class="floatLeft" @click="goToFood(this.details._id)">
                <p class="details">{{ this.details.MainProtein }}</p>
                <p class="details">{{ this.details.Vegan ? "Vegan" : "Non-Vegan" }}</p>
                <p class="details">{{ this.details.Vegetarian ? "Vegetarian" : "Non-Vegetarian" }}</p>
                <p class="details">{{ this.details.Stats.Calories + " Calories" }}</p>
                <p class="details">{{ this.details.Type }}</p>
            </div>
            <div class="floatRight" @click="likeFood">
                <div class="heart">
                    <img :src="this.icon" alt="Back Arrow" />
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import heartClicked from "../assets/images/heart_clicked.svg";
import heartUnclicked from "../assets/images/heart_unclicked.svg";
import axios from "axios";

export default {
    name: 'FoodContainer',
    props: ['details'],
    data() {
        return {
            icon: heartUnclicked, // Default icon
            ifLiked : false
        };
    },
    components: {
      
    },
    methods:{
        likeFood()
        {
            if(this.ifLiked)
            {
                axios.post("http://localhost:3000/api/dislikeFood", {Food: this.details._id} , { withCredentials: true })
                .then(response => {
                    this.icon = heartUnclicked;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error disliking food:', error);
                });
            }
        else{
            axios.post("http://localhost:3000/api/likeFood", {Food: this.details._id} , { withCredentials: true })
            .then(response => {
                this.icon = heartClicked;
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error checking login status:', error);
            })
        }
        },
        goToFood(_id){
            this.$router.push({ path: `/food/${_id}` });
        },
    },
    mounted() {
        // You can use this.details to access the passed data
        console.log(this.details);
        axios.get("http://localhost:3000/api/checkIfLiked/" + this.details._id , { withCredentials: true })
            .then(response => {

                console.log(response.data);
                if(response.data.Liked === true)
            {
                this.icon = heartClicked;
                this.ifLiked = true;
            }
            else
            {
                this.icon = heartUnclicked;
                this.ifLiked = false;
            }
            })
            .catch(error => {
                console.error('Error checking login status:', error);
            })
    }
    }
</script>


<style scoped lang="css">
.cardContainer{
    margin-bottom: 3rem;
    margin-right: 6rem;
    display: flex;
    flex-direction: column;
    width: 30rem;
    height: fit-content;
    gap: 1rem;
    background-color: #7C66C5;
    font-family: "Gabarito", sans-serif;
    padding: 1.3rem;
    box-shadow: 8px 8px var(--neon_green);
}

.cardContainer .pic{
    align-self: center;
    width: 25rem;
    height:12rem;
    
}

.cardContainer .pic .picHolder{
    width: 25rem;
    height: 12rem;
}

.cardContainer .pic .picHolder img{
    width: 25rem;
    height: 12rem;
    object-fit: cover;
}

.cardContainer .textHolder{
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-items: baseline;
}

.cardContainer .textHolder h5{
    font-size: 1.1rem;
    margin: 0;
    padding-bottom: 0.2rem;
}

.cardContainer .detailsHolder{
    display: flex;
    flex-direction: row;
}

.cardContainer .detailsHolder .floatLeft{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin-left: 2rem;
}

.cardContainer .detailsHolder .floatLeft .details{
    opacity: 50%;
    width: 7rem;
    font-size: 0.9rem;
    margin-bottom: 0;
    margin-right: 0.5rem;
}

.cardContainer .detailsHolder .floatRight{
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 5%;
}

.cardContainer .detailsHolder .floatRight .heart{
    height: 2rem;
    width: 2rem;
}
</style>
