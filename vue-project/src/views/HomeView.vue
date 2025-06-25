
<template>
  <NavSign></NavSign>
  <Loading v-if="load"></Loading>
  <div class="body">
      <div class="MyHome">
          <h2>Hello, {{this.holder.name}}</h2>
          <p class="stats">Your Stats</p>
          <div class="homeContainer">
                                  <!-- <div class="homeCardContainer">
                                    <div class="imgg">
                                      <img src="../assets/images/home-workout.jpg">
                                    </div>
                                    <div class="BigText">Total Number of Workouts</div>
                                    <div class="SmallText">{{ this.holder['Workouts'] }} Workouts through out your time here!</div>
                                  </div> -->
                  <div class="homeCard">
                    <div class="homeCs"><canvas id="muscleFrequencyChart" width="400" height="400"></canvas></div>
                    <div class="homeCs"><canvas id="workoutTypesChart" width="400" height="400"></canvas></div>
                    <div class="homeCs"><canvas id="weeklyWorkoutChart" width="400" height="400"></canvas></div>
                    <div class="homeCs"><canvas id="stepsThisWeekChart" width="400" height="400"></canvas></div>

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
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export default {name: 'Home',
  components: {
      NavSign,
      FoodContainer
  },
  data() {
      return {
          load: true,
          holder: {}
      };
  },
  methods:
  {
  renderMuscleFrequencyChart() {
  if (!this.holder.Workouts || !Array.isArray(this.holder.Workouts)) return;

  const muscleCounts = {};

  this.holder.Workouts.forEach(w => {
    if (w.Muscles) {
      // Assuming 'Muscles' is a string like "Chest" or maybe comma-separated
      const muscles = w.Muscles.split(',').map(m => m.trim());
      muscles.forEach(m => {
        muscleCounts[m] = (muscleCounts[m] || 0) + 1;
      });
    }
  });

  const muscles = Object.keys(muscleCounts);
  const counts = Object.values(muscleCounts);

  new Chart(document.getElementById("muscleFrequencyChart"), {
    type: 'bar',
    data: {
      labels: muscles,
      datasets: [{
        label: 'Times Trained',
        data: counts,
        backgroundColor: '#7C66C5'
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Most Trained Muscle Groups',
          position: 'bottom',
          font: { size: 18 },
        },
        legend: {
          labels: {
            font: { size: 14 }
          }
        }
      },
    }
  });
}
,

  renderWorkoutTypesChart() {
    if (!this.holder.Workouts || !Array.isArray(this.holder.Workouts)) return;

    const typeCounts = {};
    this.holder.Workouts.forEach(w => {
      typeCounts[w.Type] = (typeCounts[w.Type] || 0) + 1;
    });

    new Chart(document.getElementById("workoutTypesChart"), {
      type: 'doughnut',
      data: {
        labels: Object.keys(typeCounts),
        datasets: [{
          data: Object.values(typeCounts),
          backgroundColor: ['#2196f3', '#ff9800', '#9c27b0']
        }]
      },
      options: {
       responsive: true,
  maintainAspectRatio: false,
        plugins: { title: { display: true, text: 'Workout Types', position: 'bottom', font: {size: 20} ,   }, legend: {
            labels: {
               
              font: {
                size: 14 ,
              }
            }
          } }
      }
    });
  },

  renderWeeklyWorkoutCountChart() {
  if (!this.holder.Workouts || !Array.isArray(this.holder.Workouts)) return;

  const workoutByWeek = {};

  this.holder.Workouts.forEach(w => {
    const d = new Date(w.Date);
    const year = d.getFullYear();
    const week = Math.ceil((((d - new Date(year, 0, 1)) / 86400000) + new Date(year, 0, 1).getDay() + 1) / 7);
    const label = `Week ${week}, ${year}`;
    workoutByWeek[label] = (workoutByWeek[label] || 0) + 1;
  });

  const labels = Object.keys(workoutByWeek).slice(-6); // Last 6 weeks
  const data = labels.map(l => workoutByWeek[l]);

  new Chart(document.getElementById("weeklyWorkoutChart"), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Workouts per Week',
        data,
        borderColor: '#ff5722',
        backgroundColor: 'rgba(255, 87, 34, 0.3)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Weekly Workout Frequency',
           
          font: { size: 18 },
          position: 'bottom',
          legend: {
            
            labels: {
               
              font: {
                size: 14 // legend font
              }
            }
          }
        }
      }
    }
  });
  }
  ,

  renderStepsThisWeekChart() {
  if (!this.holder.Steps || !Array.isArray(this.holder.Steps)) return;

  const today = new Date();
  const pastWeek = new Date();
  pastWeek.setDate(today.getDate() - 6); // 7 days including today

  const stepMap = {};
  const dateKeys = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date(pastWeek);
    d.setDate(d.getDate() + i);
    const key = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
    dateKeys.push(key);
    stepMap[key] = 0;
  }

  this.holder.Steps.forEach(s => {
    const dateObj = new Date(s.Date);
    const key = dateObj.toLocaleDateString('en-CA'); // consistent key
    if (stepMap[key] !== undefined) {
      stepMap[key] += s.Steps;
    }
  });

  const labels = dateKeys.map(dateStr => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // "Mon", "Tue", ...
  });

  const data = dateKeys.map(key => stepMap[key]);

  // Step 4: Render chart
  new Chart(document.getElementById("stepsThisWeekChart"), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Steps This Week',
        data,
        backgroundColor: '#00bcd4'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Steps Taken This Week',
          position: 'bottom',
          font: { size: 18 },
        },
        legend: {
          labels: {
            font: { size: 14 }
          }
        }
      },
    }
  });
}



  
      
  }
  ,mounted()
  {
      axios.get("http://localhost:3000/api/getStats", { withCredentials: true })
          .then(response => {
            this.holder = response.data;
            console.log("Steps:", this.holder.Steps);
            console.log("Workouts:", this.holder.Workouts);

            this.$nextTick(() => {
              this.renderMuscleFrequencyChart();
              this.renderWorkoutTypesChart();
              this.renderStepsThisWeekChart();
              this.renderWeeklyWorkoutCountChart();
            });
          })
          .catch(error => {
              console.error('Error checking login status:', error);
          })
      //     .finally(() => {
      //         this.load = false;
      //     });
  }
  
  }
</script>

<style lang="css" src="../assets/home.css">

</style>
