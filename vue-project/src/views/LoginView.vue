<template>
    <NavNotSign></NavNotSign>
    <div class="main-bg-login">
        <div class="contianerReg">
            <h1 class="SignupText">Log In</h1>
            <div class="register-card">
                <form class="login-card-form" @submit.prevent="loginUser" method="post">
                    <p class="error" v-if="errorMsg['login']">Username or Password is incorrect.</p>

                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" name="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <div class="mb-3 checkbox-below">
                        <input type="checkbox" id="checkbox-below" name="checkbox-below">
                        <span class="checkmark"></span>
                        <label for="checkbox-below">Stay Logged In.</label>
                    </div>
                    <div class="mb-3 text-center">
                        <button type="submit" class="SubmitBtn">Submit</button>
                    </div>
                    <div class="goToReg">
                        <p class="text-center">You Don't Have an Account?
                            <router-link to="/register">Sign UP!</router-link>
                        </p>
                    </div>
                    
                </form>
            </div> 
        </div>
    </div>
</template>



<style lang="css" src="../assets/login.css">

</style>

<script>
import NavNotSign from '@/components/NavNotSign.vue';
import axios from 'axios';

export default{
    name: "LoginView",
    components: { NavNotSign },
    data() {
        return {
            errorMsg: {},
        };
    },
    methods:{
        loginUser() {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const checkbox = document.getElementById('checkbox-below').checked;

            console.log("Username:", username);
            console.log("Password:", password)

            axios.post("http://localhost:3000/api/login", {
                Username: username,
                Password: password,
                StayLoggedIn: checkbox
            }, { withCredentials: true })
                .then(response => {
                    console.log('Data posted successfully:', response.data);
                    this.$router.push('/home'); 
                })
                .catch(error => {
                    this.errorMsg['login'] = true;
                    console.error('Error posting data:', error);
                });
            }
    },
    mounted() {
        axios.get("http://localhost:3000/api/islogged",  { withCredentials: true })
                .then(response => {
                    if(response.data.message = 'Logged in') {
                        this.$router.push('/home');
                    }
                })
                .catch(error => {
                    console.error('Error checking login status:', error);
                    
                });
    }
}


</script>