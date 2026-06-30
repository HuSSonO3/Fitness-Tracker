<template>
    <nav class="navbar navbar-expand-md fixed-top">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Fitness Tracker</router-link>
            <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
                <img src="../assets/images/hamburger.svg" alt="Menu" class="menu-icon">
            </button>
            <div class="offcanvas offcanvas-end d-md-none" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
                <div class="offcanvas-header mt-2">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Fitness Something</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/planner">Planner</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/tracker">Tracker</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Favorites</router-link>
                        </li>
                        <!-- Change -->
                        <!-- <li class="nav-item LogginBttnContainer extra">
                            <a class="LoginBttn" href="#">Sign Up</a>
                        </li> -->
                    </ul>
                </div>
            </div>
            <div class="d-none d-md-flex ms-auto align-items-center">
                <ul class="navbar-nav">
                    <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"> <router-link class="nav-link" to="/">Home</router-link></li>
                    <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"><router-link class="nav-link" to="/planner">Planner</router-link></li>
                    <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"><router-link class="nav-link" to="/tracker">Tracker</router-link></li>
                    <div class="nav-seperator custom-show"></div>
                    <div class="dropdown">
                        <button class="dropbtn">
                            <img :src="this.icon" alt="User Icon" class="user-icon">
                        </button>
                        <div class="dropdown-content">
                            <router-link class="nav-link dropdownData" to="/profile">Profile</router-link>
                            <router-link class="nav-link dropdownData" to="/favfood">Favorites</router-link>
                            <div @click="logout" class="nav-link dropdownData">Sign Out</div>
                        </div>
                    </div>
                    
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
import axios from 'axios';
import profileIcon from '@/assets/images/profile.png';

export default {
    name: 'NavNotSign',
    data() {
        return {
            icon: profileIcon // Default icon for logged in users
        };
    },
    methods:{
        logout() {
            axios.post("http://localhost:3000/api/logout", {}, { withCredentials: true })
                .then(response => {
                    console.log('Logged out successfully:', response.data);
                    this.$router.push('/login'); // Redirect to home page after logout
                })
                .catch(error => {
                    console.error('Error logging out:', error);
                });
        }
    },
    mounted()
    {
        axios.get("http://localhost:3000/api/getImage", { withCredentials: true })
            .then(response => {
                console.log("WAZZAP")
                console.log(response.data);
                if(response.data.Valid)
                {
                    this.icon = "data:image/png;base64, " + response.data.Image;
                }
                else {
                    this.icon = profileIcon;
                }
            })
            .catch(error => {
                console.error('Error checking login status:', error);
                this.icon = profileIcon;
            });
    }

}

    
</script>

<style lang="css" src="../assets/nav2.css"></style>