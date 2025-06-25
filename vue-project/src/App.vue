<script >
import { RouterLink, RouterView } from 'vue-router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import NavNotSign from '@/components/NavNotSign.vue'
import axios from 'axios';
import NavSign from '@/components/NavSign.vue';

export default {name: 'app',
    components: {
      NavNotSign
      ,
      NavSign
    },
    data() {
        return {
          isLoggedIn: false,
        };
    },
    mounted(){
      console.log("Hi")
        axios.get("http://localhost:3000/api/islogged",  { withCredentials: true })
                .then(response => {
                })
                .catch(error => {
                    console.error('Error checking login status:', error);
                    this.isLoggedIn = false; 
                    this.$router.push('/login');
                });
    }
  }
</script>

<template>
  <RouterView />
</template>

<style>

</style>
