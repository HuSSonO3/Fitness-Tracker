
<template>
    <NavSign></NavSign>
    <Loading v-if="load"></Loading>
    <div class="body">
        <div class="MyPlanner">
            <h2>My Favorite Meals</h2>
            <div class="workoutContainer">
                <h4>Explore</h4>
                <div class="rightSideHolder">
                    <div class="search">
                        <input type="text" class="searchBar" id="search" name="search" placeholder="Search" required>
                        <div class="searchIcon">
                            <img src="../assets/images/search.svg" alt="Back Arrow" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="nextAndBack">
                <svg @click="backF" class="Back" width="35" height="35" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.9994 29.3337L23.916 26.417L20.5827 23.0837H29.3327V18.917H20.5827L23.916 15.5837L20.9994 12.667L12.666 21.0003L20.9994 29.3337ZM20.9994 41.8337C18.1174 41.8337 15.4091 41.2868 12.8743 40.193C10.3396 39.0993 8.13477 37.6149 6.25977 35.7399C4.38477 33.8649 2.90039 31.6601 1.80664 29.1253C0.712891 26.5906 0.166016 23.8823 0.166016 21.0003C0.166016 18.1184 0.712891 15.41 1.80664 12.8753C2.90039 10.3406 4.38477 8.13574 6.25977 6.26074C8.13477 4.38574 10.3396 2.90137 12.8743 1.80762C15.4091 0.713867 18.1174 0.166992 20.9994 0.166992C23.8813 0.166992 26.5896 0.713867 29.1244 1.80762C31.6591 2.90137 33.8639 4.38574 35.7389 6.26074C37.6139 8.13574 39.0983 10.3406 40.1921 12.8753C41.2858 15.41 41.8327 18.1184 41.8327 21.0003C41.8327 23.8823 41.2858 26.5906 40.1921 29.1253C39.0983 31.6601 37.6139 33.8649 35.7389 35.7399C33.8639 37.6149 31.6591 39.0993 29.1244 40.193C26.5896 41.2868 23.8813 41.8337 20.9994 41.8337Z" fill="white"/>
                </svg>
                <svg @click="nextF" class="Next" width="35" height="35" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.0003 29.3332L29.3337 20.9998L21.0003 12.6665L18.0837 15.5832L21.417 18.9165H12.667V23.0832H21.417L18.0837 26.4165L21.0003 29.3332ZM21.0003 41.8332C18.1184 41.8332 15.41 41.2863 12.8753 40.1925C10.3406 39.0988 8.13574 37.6144 6.26074 35.7394C4.38574 33.8644 2.90137 31.6596 1.80762 29.1248C0.713867 26.5901 0.166992 23.8818 0.166992 20.9998C0.166992 18.1179 0.713867 15.4096 1.80762 12.8748C2.90137 10.3401 4.38574 8.13525 6.26074 6.26025C8.13574 4.38525 10.3406 2.90088 12.8753 1.80713C15.41 0.713379 18.1184 0.166504 21.0003 0.166504C23.8823 0.166504 26.5906 0.713379 29.1253 1.80713C31.66 2.90088 33.8649 4.38525 35.7399 6.26025C37.6149 8.13525 39.0993 10.3401 40.193 12.8748C41.2868 15.4096 41.8337 18.1179 41.8337 20.9998C41.8337 23.8818 41.2868 26.5901 40.193 29.1248C39.0993 31.6596 37.6149 33.8644 35.7399 35.7394C33.8649 37.6144 31.66 39.0988 29.1253 40.1925C26.5906 41.2863 23.8823 41.8332 21.0003 41.8332Z" fill="white"/>
                </svg>
            </div>
            <div class="cards">
                <div v-for="x in tempFCards">
                    <FoodContainer :details="x"></FoodContainer>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import FoodContainer from "@/components/FoodContainer.vue";
import axios from 'axios';
import NavSign from "@/components/NavSign.vue";
import Loading from "@/components/Loading.vue";

export default {name: 'FavFood',
    components: {
        NavSign,
        FoodContainer
    },
    data() {
        return {
            load: true,
            manyFoods: [],
            tempFCards: [],
            currentFoodCards: 0,
        };
    },
    methods:
    {
        
        nextF()
        {
            if(this.currentFoodCards + 8 < this.manyFoods.length)
            {
                this.currentFoodCards += 8;
                this.tempFCards = this.manyFoods.slice(this.currentFoodCards, this.currentFoodCards + 8);
            }
        },
        backF()
        {
            if(this.currentFoodCards - 8 >= 0)
            {
                this.currentFoodCards -= 8;
                this.tempFCards = this.manyFoods.slice(this.currentFoodCards, this.currentFoodCards + 8);
            }
        },
        
    }
    ,mounted()
    {
        axios.get("http://localhost:3000/api/favMeals", { withCredentials: true })
            .then(response => {
                console.log(response.data);
                this.manyFoods = response.data;
                this.tempFCards = this.manyFoods.slice(0, 8);
            })
            .catch(error => {
                console.error('Error checking login status:', error);
            })
            .finally(() => {
                this.load = false;
            });
    }
    
    }
</script>

<style lang="css" src="../assets/planner.css">

</style>
