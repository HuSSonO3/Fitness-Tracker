<template>
    <nav class="navbar navbar-expand-md fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Fitness Tracker</a>
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
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item LogginBttnContainer extra">
                            <router-link class="LoginBttn" to="/register">Sign Up</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="d-none d-md-flex ms-auto align-items-center">
                <ul class="navbar-nav">
                    <!-- <div class="nav-seperator custom-show"></div> -->
                    <!-- <li class="nav-item"><a class="nav-link" href="#">Home</a></li> -->
                    <!-- <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"><a class="nav-link" href="#">Planner</a></li>
                    <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"><a class="nav-link" href="#">Tracker</a></li>
                    <div class="nav-seperator custom-show"></div>
                    <li class="nav-item"><a class="nav-link" href="#">Favorites</a></li> -->
                    <!-- <div class="nav-seperator custom-show"></div> -->
                    <li class="nav-item LogginBttnContainer">
                        <router-link class="LoginBttn" to="/register">Sign Up</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
export default {
    name: 'NavNotSign',


}

    
</script>

<style lang="css" src="../assets/nav1.css">


</style>