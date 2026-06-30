<template>
    <NavNotSign></NavNotSign>
    <div class="main-bg">
        <div class="contianerReg">
            <div class="register-card">
                <h1 class="SignupText">Sign Up</h1>
                <form  @submit.prevent="registerUser">
                    <p class="error" v-if="errorMsg['issue']">Username or Email already exists.</p>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <p class="error" v-if="errorMsg['user']">Username is less than 3 characters.</p>
                        <input type="text" class="form-control" id="username" name="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <p class="error" v-if="errorMsg['email']">Username is less than 3 characters.</p>
                        <input type="email" class="form-control" id="email" name="email" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <p class="error" v-if="errorMsg['pass']">Password has to be longer than 8 characters.</p>
                        <input type="password" class="form-control" id="password" name="password" required>
                    </div>
                    <div class="mb-3">
                        <label for="passwordC" class="form-label">Password Confirmation</label>
                        <p class="error" v-if="errorMsg['passC']">Passwords don't match</p>
                        <input type="password" class="form-control" id="passwordC" name="passwordC" required>
                    </div>
                    <div class="mb-3 checkbox-belowR">
                        <p class="error" v-if="errorMsg['checkbox']">Please agree to proceed.</p>
                        <div class="checkbox-container">
                            <input type="checkbox" id="checkbox-below" name="checkbox-below">
                            <span class="checkmark"></span>
                            <label for="checkbox-below">Agree to Our Terms and Privacy Policy</label>
                        </div>
                    </div>
                    <div class="mb-3 text-center">
                        <button type="submit" class="SubmitBtn">Submit</button>
                    </div>
                    <div class="goToReg">
                        <p class="text-center">Already have an account?
                            <router-link to="/login">Log IN!</router-link>
                        </p>
                    </div>
                    
                </form>
            </div> 
        </div>
    </div>
</template>



<style lang="css" src="../assets/register.css">


</style>

<script>
import NavNotSign from '@/components/NavNotSign.vue';
import axios from 'axios';

export default{
    name: "RegisterView",
    components: { NavNotSign },
    data() {
        return {
            errorMsg: {},
        };
    },
    methods:
    {
        registerUser() {
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordC = document.getElementById('passwordC').value;
            const checkbox = document.getElementById('checkbox-below').checked;

            if (!checkbox) {
                this.errorMsg['checkbox'] = true;
                this.errorMsg['pass'] = false;
                this.errorMsg['passC'] = false;
                this.errorMsg['user'] = false;

                return;
            }

            if (username.length < 3) {
                this.errorMsg['checkbox'] = false;
                this.errorMsg['pass'] = false;
                this.errorMsg['passC'] = false;
                this.errorMsg['user'] = true;
                return;
            }

            if (password.length < 8) {
                this.errorMsg['checkbox'] = false;
                this.errorMsg['pass'] = true;
                this.errorMsg['passC'] = false;
                this.errorMsg['user'] = false;
                return;
            }

            if (password !== passwordC) {
                this.errorMsg['checkbox'] = false;
                this.errorMsg['pass'] = false;
                this.errorMsg['passC'] = true;
                this.errorMsg['user'] = false;
                return;
            }

            console.log("Username:", username);
            console.log("Email:", email);
            console.log("Password:", password)
            console.log("PasswordC:", passwordC)
            
            axios.post("http://localhost:3000/api/register", {
                Username: username,
                Email: email,
                Password: password
            })
                .then(response => {
                    console.log('Data posted successfully:', response.data);
                    this.$router.push('/login'); // Redirect to login page after successful registration
                })
                .catch(error => {
                    this.errorMsg['issue'] = true;
                    this.errorMsg['checkbox'] = false;
                    this.errorMsg['pass'] = false;
                    this.errorMsg['passC'] = false;
                    this.errorMsg['user'] = false;
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
