
<template>
    <NavSign></NavSign>
    <Loading v-if="load"></Loading>
    <div v-else class="body">
        <div class="MyDish">
            <div class="mainTextContainer">
                <h2>Dish Explorer</h2>
                <button class="button" @click="likeFood" v-if="this.liked === false">Add to Favorites</button>
                <button class="button" @click="dislikeFood" v-if="this.liked === true">Remove From Favorites</button>
            </div>
            <div class="ReceipeContainer">
                <div class="leftFloat">
                    <div class="Image">
                        <img :src="'data:image/png;base64, ' + this.details.Image" alt="Food Image" />
                    </div>
                </div>
                <div class="rightFloat">
                    <h4>{{this.details.Name}}</h4>
                    <div class="dishDetails">
                        <div class="holder">
                            <p class="text1">Type of Dish:</p>
                            <p class="text2">{{this.details.Type}}</p>
                        </div>
                        <div class="holder">
                            <p class="text1">{{ this.details.Vegan ? "Vegan" : "Non-Vegan" }} Dish</p>
                        </div>
                        <div class="holder">
                            <p class="text1">{{ this.details.Vegetarian ? "Vegetarian" : "Non-Vegetarian" }} Dish</p>
                        </div>
                        <div class="holder">
                            <p class="text1">Main Protein:</p>
                            <p class="text2">{{this.details.MainProtein}}</p>
                        </div>
                    </div>
                    <div class="seperator"></div>
                    <div class="dishStats">
                        <h5>Stats</h5>
                        <div class="holder">
                            <p class="text1">Protein:</p>
                            <p class="text2">{{this.details.Stats.Protein}}G</p>
                        </div>
                        <div class="holder">
                            <p class="text1">Calories:</p>
                            <p class="text2">{{this.details.Stats.Calories}}C</p>
                        </div>
                        <div class="holder">
                            <p class="text1">Carbohydrates:</p>
                            <p class="text2">{{this.details.Stats.Carbohydrates}}G</p>
                        </div>
                        <div class="holder">
                            <p class="text1">Portion Size:</p>
                            <p class="text2">{{this.details.Stats.Portion}} Pax</p>
                        </div>
                    </div>
                    <div class="seperator"></div>
                    <div class="dishIngs">
                        <h5>Ingredients</h5>

                        <div class="holder" v-for="ing in this.details.Ingredients">
                            <p class="text1">{{ing.Name}} ~ </p>
                            <p class="text2">{{ing.Size}}</p>
                            <p class="text2">{{ing.Type}}</p>
                        </div>
                        
                    </div>
                    <div class="seperator"></div>
                </div>
            </div>
            <div class="InstructionsContainer">
                <h4>Instructions</h4>
                <ul v-for="instr in this.details.Instructions">
                    <li>{{instr}}</li>
                </ul>
                <h4 class="Bon">Bon appétit!</h4>
            </div>
        </div>
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import NavSign from "@/components/NavSign.vue";
import Loading from "@/components/Loading.vue";
import axios from "axios";

export default {name: 'Food',
    components: {
        NavSign,
        Loading
    },
    
    data() {
        return {
            foodId: this.$route.params.foodId,
            details: {},
            load: true,
            liked: false,
        };
    },

    methods:{
        likeFood() {
            axios.post("http://localhost:3000/api/likeFood", {Food: this.details._id} , { withCredentials: true })
                .then(response => {
                    this.liked = true;
                    
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error liking food:', error);
                });
        },
        dislikeFood() {
            axios.post("http://localhost:3000/api/dislikeFood", {Food: this.details._id} , { withCredentials: true })
                .then(response => {
                    this.liked = false;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error disliking food:', error);
                });
        },
    },

    mounted() {
        this.load = true;
        axios.get("http://localhost:3000/api/meal/" + this.foodId, { withCredentials: true })
            .then(response => {
                console.log("hlelo??")
                this.details = response.data;
                axios.get("http://localhost:3000/api/checkIfLiked/" + this.details._id , { withCredentials: true })
                .then(response => {

                    console.log(response.data);
                    if(response.data.Liked === true)
                    {
                        this.liked = true;
                    }
                    else
                    {
                        this.icon = false;
                    }
                    })
                .catch(error => {
                    console.error('Error checking login status:', error);
                })
                console.log(this.details)                
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

<style lang="css" src="../assets/food.css">

</style>
