
<template>
    <NavSign></NavSign>
    <Loading v-if="load"></Loading>
    <div class="body">
        <div class="MyFitnessWorkout">
            <h2>My Fitness Tracker</h2>
            <div class="workoutContainer">
                <h4>Workout Log</h4>
                <div class="rightSideHolder">
                    <svg @click="backW" class="Back" width="25" height="25" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9994 29.3337L23.916 26.417L20.5827 23.0837H29.3327V18.917H20.5827L23.916 15.5837L20.9994 12.667L12.666 21.0003L20.9994 29.3337ZM20.9994 41.8337C18.1174 41.8337 15.4091 41.2868 12.8743 40.193C10.3396 39.0993 8.13477 37.6149 6.25977 35.7399C4.38477 33.8649 2.90039 31.6601 1.80664 29.1253C0.712891 26.5906 0.166016 23.8823 0.166016 21.0003C0.166016 18.1184 0.712891 15.41 1.80664 12.8753C2.90039 10.3406 4.38477 8.13574 6.25977 6.26074C8.13477 4.38574 10.3396 2.90137 12.8743 1.80762C15.4091 0.713867 18.1174 0.166992 20.9994 0.166992C23.8813 0.166992 26.5896 0.713867 29.1244 1.80762C31.6591 2.90137 33.8639 4.38574 35.7389 6.26074C37.6139 8.13574 39.0983 10.3406 40.1921 12.8753C41.2858 15.41 41.8327 18.1184 41.8327 21.0003C41.8327 23.8823 41.2858 26.5906 40.1921 29.1253C39.0983 31.6601 37.6139 33.8649 35.7389 35.7399C33.8639 37.6149 31.6591 39.0993 29.1244 40.193C26.5896 41.2868 23.8813 41.8337 20.9994 41.8337Z" fill="white"/>
                    </svg>
                    <svg @click="nextW" class="Next" width="25" height="25" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0003 29.3332L29.3337 20.9998L21.0003 12.6665L18.0837 15.5832L21.417 18.9165H12.667V23.0832H21.417L18.0837 26.4165L21.0003 29.3332ZM21.0003 41.8332C18.1184 41.8332 15.41 41.2863 12.8753 40.1925C10.3406 39.0988 8.13574 37.6144 6.26074 35.7394C4.38574 33.8644 2.90137 31.6596 1.80762 29.1248C0.713867 26.5901 0.166992 23.8818 0.166992 20.9998C0.166992 18.1179 0.713867 15.4096 1.80762 12.8748C2.90137 10.3401 4.38574 8.13525 6.26074 6.26025C8.13574 4.38525 10.3406 2.90088 12.8753 1.80713C15.41 0.713379 18.1184 0.166504 21.0003 0.166504C23.8823 0.166504 26.5906 0.713379 29.1253 1.80713C31.66 2.90088 33.8649 4.38525 35.7399 6.26025C37.6149 8.13525 39.0993 10.3401 40.193 12.8748C41.2868 15.4096 41.8337 18.1179 41.8337 20.9998C41.8337 23.8818 41.2868 26.5901 40.193 29.1248C39.0993 31.6596 37.6149 33.8644 35.7399 35.7394C33.8649 37.6144 31.66 39.0988 29.1253 40.1925C26.5906 41.2863 23.8823 41.8332 21.0003 41.8332Z" fill="white"/>
                    </svg>
                    <button class="button" @click="toggleWorkout">New Workout</button>
                </div>
                <Transition name="popup">
                    <div v-if="workoutPopUp" class="workout-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="75" height="90" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 90.9329C42.8844 90.9329 35.9896 92.2448 29.3156 94.8688C22.6406 97.4928 16.4344 101.509 10.6969 106.919V107.278C11.0177 107.519 11.3385 107.7 11.6594 107.82C11.9792 107.94 12.3396 108 12.7406 108H87.0187C87.4198 108 87.7604 107.94 88.0406 107.82C88.3208 107.7 88.6214 107.519 88.9422 107.278V106.919C83.3651 101.509 77.2792 97.4928 70.6844 94.8688C64.0906 92.2448 57.1958 90.9329 50 90.9329ZM6.25 102.495C11.875 96.9745 18.4115 92.6256 25.8594 89.4485C33.3073 86.2714 41.3542 84.6829 50 84.6829C58.6458 84.6829 66.6927 86.2714 74.1406 89.4485C81.5885 92.6256 88.125 96.9745 93.75 102.495V24.3469C93.75 23.3844 93.3495 22.5027 92.5484 21.7016C91.7474 20.9006 90.8656 20.5 89.9031 20.5H10.0969C9.13437 20.5 8.2526 20.9006 7.45156 21.7016C6.65052 22.5027 6.25 23.3844 6.25 24.3469V102.495ZM50 67.375C44.7594 67.375 40.3245 65.5599 36.6953 61.9297C33.0651 58.3006 31.25 53.8657 31.25 48.625C31.25 43.3844 33.0651 38.9495 36.6953 35.3204C40.3245 31.6901 44.7594 29.875 50 29.875C55.2406 29.875 59.6755 31.6901 63.3047 35.3204C66.9349 38.9495 68.75 43.3844 68.75 48.625C68.75 53.8657 66.9349 58.3006 63.3047 61.9297C59.6755 65.5599 55.2406 67.375 50 67.375ZM50 61.125C53.4052 61.125 56.3401 59.8933 58.8047 57.4297C61.2682 54.9652 62.5 52.0303 62.5 48.625C62.5 45.2198 61.2682 42.2849 58.8047 39.8204C56.3401 37.3568 53.4052 36.125 50 36.125C46.5948 36.125 43.6599 37.3568 41.1953 39.8204C38.7318 42.2849 37.5 45.2198 37.5 48.625C37.5 52.0303 38.7318 54.9652 41.1953 57.4297C43.6599 59.8933 46.5948 61.125 50 61.125ZM10.0969 114.25C7.21979 114.25 4.81771 113.287 2.89062 111.359C0.963542 109.432 0 107.03 0 104.153V24.3469C0 21.4698 0.963542 19.0678 2.89062 17.1407C4.81771 15.2136 7.21979 14.25 10.0969 14.25H21.1531V0.307861H27.8844V14.25H72.5969V0.307861H78.8469V14.25H89.9031C92.7802 14.25 95.1823 15.2136 97.1094 17.1407C99.0365 19.0678 100 21.4698 100 24.3469V104.153C100 107.03 99.0365 109.432 97.1094 111.359C95.1823 113.287 92.7802 114.25 89.9031 114.25H10.0969Z" fill="white"/>
                            </svg>
                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleWorkout">
                            </div>
                            <p class="editText">Add a New Workout Entry</p>
                            <form class="formAddWorkout">
                                <p class="error" v-if="errorMsg['workout']"></p>
                                <div class="mb-1">
                                    <label for="workout" class="form-label">Workout Entry Name</label>
                                    <input type="text" class="form-control" id="workout" name="workout" required>
                                </div>
                                <div class="TypeAndMuscels">
                                    <p class="error" v-if="errorMsg['train']">Please input a valid Type of Traning</p>
                                    <p class="error" v-if="errorMsg['muscle']">Please input a valid Muscle</p>
                                    <div class="smallerContainer">
                                        <div class="mb-1">
                                            <label for="typeOfTrain" class="form-label">Type of Training</label>
                                            <input list="typesOfTrain" class="form-control" id="typeOfTrain" name="typeOfTrain" required>
                                            <datalist id="typesOfTrain">
                                                <option value="Endurance"></option>
                                                <option value="Strength"></option>
                                                <option value="HIIT"></option>
                                                <option value="Flexibility"></option>
                                                <option value="Cardiovascular"></option>
                                            </datalist>
                                        </div>
                                        <div class="mb-1">
                                            <label for="musclesTargeted" class="form-label">Muscles Targeted</label>
                                            <input list="muscleTargeted" class="form-control" id="musclesTargeted" name="musclesTargeted" required>
                                            <datalist id="muscleTargeted">
                                                <option value="Glutes"></option>
                                                <option value="Hamstrings"></option>
                                                <option value="Quadriceps"></option>
                                                <option value="Back"></option>
                                                <option value="Chest"></option>
                                                <option value="Core"></option>
                                                <option value="Arms"></option>
                                                <option value="Shoulders"></option>
                                                <option value="Legs"></option>
                                            </datalist>
                                        </div>
                                    </div>
                                </div>
                                <div class="intensityAndTime">
                                    <div class="mb-1">
                                        <label for="intensity" class="form-label">Intensity Level</label>
                                        <input type="number" class="form-control" min="1" max="5" id="intensity" name="intensity" required>
                                    </div>
                                    <div class="mb-1">
                                        <label for="timeWorkout" class="form-label">Time Taken</label>
                                        <input type="time" class="form-control" value="00:00" id="timeWorkout" name="timeWorkout" required>
                                    </div>
                                </div>
                            </form>
                            <button class="confirmWorkout button" @click="addNewWorkout">Confirm</button>
                    </div>
                </Transition>
            </div>
            <div class="cards">
                <div v-for="x in tempWCards">
                    <SteporWorkoutContainer :details="x" :stepOrWorkout="'Workout'"/>
                </div>
                <div class="nothing" v-if="workoutCards.length === 0">
                    <p>Nothing to display. ADD NOW!</p>
                </div>
            </div>
            
        </div>
        <div class="seperator"></div>
        <div class="MyFitnessSteps">
            <div class="stepsContainer">
                <h4>Steps Log</h4>
                <div class="rightSideHolder">
                    <svg class="Back" width="25" height="25" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.9994 29.3337L23.916 26.417L20.5827 23.0837H29.3327V18.917H20.5827L23.916 15.5837L20.9994 12.667L12.666 21.0003L20.9994 29.3337ZM20.9994 41.8337C18.1174 41.8337 15.4091 41.2868 12.8743 40.193C10.3396 39.0993 8.13477 37.6149 6.25977 35.7399C4.38477 33.8649 2.90039 31.6601 1.80664 29.1253C0.712891 26.5906 0.166016 23.8823 0.166016 21.0003C0.166016 18.1184 0.712891 15.41 1.80664 12.8753C2.90039 10.3406 4.38477 8.13574 6.25977 6.26074C8.13477 4.38574 10.3396 2.90137 12.8743 1.80762C15.4091 0.713867 18.1174 0.166992 20.9994 0.166992C23.8813 0.166992 26.5896 0.713867 29.1244 1.80762C31.6591 2.90137 33.8639 4.38574 35.7389 6.26074C37.6139 8.13574 39.0983 10.3406 40.1921 12.8753C41.2858 15.41 41.8327 18.1184 41.8327 21.0003C41.8327 23.8823 41.2858 26.5906 40.1921 29.1253C39.0983 31.6601 37.6139 33.8649 35.7389 35.7399C33.8639 37.6149 31.6591 39.0993 29.1244 40.193C26.5896 41.2868 23.8813 41.8337 20.9994 41.8337Z" fill="white"/>
                    </svg>
                    <svg class="Next" width="25" height="25" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.0003 29.3332L29.3337 20.9998L21.0003 12.6665L18.0837 15.5832L21.417 18.9165H12.667V23.0832H21.417L18.0837 26.4165L21.0003 29.3332ZM21.0003 41.8332C18.1184 41.8332 15.41 41.2863 12.8753 40.1925C10.3406 39.0988 8.13574 37.6144 6.26074 35.7394C4.38574 33.8644 2.90137 31.6596 1.80762 29.1248C0.713867 26.5901 0.166992 23.8818 0.166992 20.9998C0.166992 18.1179 0.713867 15.4096 1.80762 12.8748C2.90137 10.3401 4.38574 8.13525 6.26074 6.26025C8.13574 4.38525 10.3406 2.90088 12.8753 1.80713C15.41 0.713379 18.1184 0.166504 21.0003 0.166504C23.8823 0.166504 26.5906 0.713379 29.1253 1.80713C31.66 2.90088 33.8649 4.38525 35.7399 6.26025C37.6149 8.13525 39.0993 10.3401 40.193 12.8748C41.2868 15.4096 41.8337 18.1179 41.8337 20.9998C41.8337 23.8818 41.2868 26.5901 40.193 29.1248C39.0993 31.6596 37.6149 33.8644 35.7399 35.7394C33.8649 37.6144 31.66 39.0988 29.1253 40.1925C26.5906 41.2863 23.8823 41.8332 21.0003 41.8332Z" fill="white"/>
                    </svg>
                    <button class="button" @click="toggleSteps">New Steps Log</button>
                </div>
                <Transition name="popup">
                    <div v-if="stepsPopUp" class="steps-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="75" height="90" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 90.9329C42.8844 90.9329 35.9896 92.2448 29.3156 94.8688C22.6406 97.4928 16.4344 101.509 10.6969 106.919V107.278C11.0177 107.519 11.3385 107.7 11.6594 107.82C11.9792 107.94 12.3396 108 12.7406 108H87.0187C87.4198 108 87.7604 107.94 88.0406 107.82C88.3208 107.7 88.6214 107.519 88.9422 107.278V106.919C83.3651 101.509 77.2792 97.4928 70.6844 94.8688C64.0906 92.2448 57.1958 90.9329 50 90.9329ZM6.25 102.495C11.875 96.9745 18.4115 92.6256 25.8594 89.4485C33.3073 86.2714 41.3542 84.6829 50 84.6829C58.6458 84.6829 66.6927 86.2714 74.1406 89.4485C81.5885 92.6256 88.125 96.9745 93.75 102.495V24.3469C93.75 23.3844 93.3495 22.5027 92.5484 21.7016C91.7474 20.9006 90.8656 20.5 89.9031 20.5H10.0969C9.13437 20.5 8.2526 20.9006 7.45156 21.7016C6.65052 22.5027 6.25 23.3844 6.25 24.3469V102.495ZM50 67.375C44.7594 67.375 40.3245 65.5599 36.6953 61.9297C33.0651 58.3006 31.25 53.8657 31.25 48.625C31.25 43.3844 33.0651 38.9495 36.6953 35.3204C40.3245 31.6901 44.7594 29.875 50 29.875C55.2406 29.875 59.6755 31.6901 63.3047 35.3204C66.9349 38.9495 68.75 43.3844 68.75 48.625C68.75 53.8657 66.9349 58.3006 63.3047 61.9297C59.6755 65.5599 55.2406 67.375 50 67.375ZM50 61.125C53.4052 61.125 56.3401 59.8933 58.8047 57.4297C61.2682 54.9652 62.5 52.0303 62.5 48.625C62.5 45.2198 61.2682 42.2849 58.8047 39.8204C56.3401 37.3568 53.4052 36.125 50 36.125C46.5948 36.125 43.6599 37.3568 41.1953 39.8204C38.7318 42.2849 37.5 45.2198 37.5 48.625C37.5 52.0303 38.7318 54.9652 41.1953 57.4297C43.6599 59.8933 46.5948 61.125 50 61.125ZM10.0969 114.25C7.21979 114.25 4.81771 113.287 2.89062 111.359C0.963542 109.432 0 107.03 0 104.153V24.3469C0 21.4698 0.963542 19.0678 2.89062 17.1407C4.81771 15.2136 7.21979 14.25 10.0969 14.25H21.1531V0.307861H27.8844V14.25H72.5969V0.307861H78.8469V14.25H89.9031C92.7802 14.25 95.1823 15.2136 97.1094 17.1407C99.0365 19.0678 100 21.4698 100 24.3469V104.153C100 107.03 99.0365 109.432 97.1094 111.359C95.1823 113.287 92.7802 114.25 89.9031 114.25H10.0969Z" fill="white"/>
                            </svg>
                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleSteps">
                            </div>
                            <p class="editText">Add a New Steps Entry</p>
                            <form class="formAddSteps" @submit="addNewSteps">
                                <p class="error" v-if="errorMsg['steps']">Something went wrong please try again.</p>
                                <div class="mb-1">
                                    <label for="steps" class="form-label">Steps Entry Name</label>
                                    <input type="text" class="form-control" id="steps" name="steps" required>
                                </div>
                                <div class="TypeAndMuscels">
                                    <div class="mb-1">
                                        <label for="typeOfMachine" class="form-label">Type of Machine</label>
                                        <input list="machines" class="form-control" id="typeOfMachine" name="typeOfMachine" required>
                                        <datalist id="machines">
                                            <option value="Stepper"></option>
                                            <option value="Treadmill"></option>
                                            <option value="Walk"></option>
                                            <option value="Stepmill"></option>
                                            <option value="Jog"></option>
                                            <option value="Run"></option>
                                        </datalist>
                                    </div>
                                    <div class="mb-1">
                                        <label for="incline" class="form-label">Incline Level</label>
                                        <input type="number" class="form-control" id="incline" name="incline" required>
                                    </div>
                                </div>
                                <div class="intensityAndTime">
                                    <div class="mb-1">
                                        <label for="stepsTaken" class="form-label">Steps Taken</label>
                                        <input type="number" class="form-control" id="stepsTaken" name="stepsTaken" required>
                                    </div>
                                    <div class="mb-1">
                                        <label for="timeSteps" class="form-label">Time Taken</label>
                                        <input type="time" class="form-control" value="00:00" id="timeSteps" name="timeSteps" required>
                                    </div>
                                </div>
                            </form>
                            <button class="confirmSteps button" @click="addNewSteps">Confirm</button>
                    </div>
                </Transition>
            </div>
            <div class="cards" >
                <div v-for="x in tempSCards">
                    <SteporWorkoutContainer :details="x" :stepOrWorkout="'Step'"/>
                </div>
                <div class="nothing" v-if="stepsCards.length === 0">
                    <p>Nothing to display. ADD NOW!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import SteporWorkoutContainer from "@/components/SteporWorkoutContainer.vue";
import NavSign from "@/components/NavSign.vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";

export default {name: 'Tracker',
    components: {
        NavSign,
        SteporWorkoutContainer,
        Loading
    },
    data() {
        return {
            workoutPopUp: false,
            stepsPopUp: false,
            load: true,
            errorMsg: {},
            muscle: ["Glutes", "Hamstrings", "Quadriceps", "Back", "Chest", "Core", "Arms", "Shoulders", "Legs"],
            train: ["Endurance", "Strength", "HIIT", "Flexibility", "Cardiovascular"],
            machine: ["Stepper", "Treadmill", "Walk", "Stepmill", "Jog", "Run"],
            workoutCards : [],
            tempWCards: [],
            currentWorkoutCards: 0,
            stepsCards: [],
            currentStepsCards: 0,
            tempSCards:[]
        }
    },
    methods: {
        toggleWorkout() {
            this.workoutPopUp = !this.workoutPopUp;
        },
        toggleSteps() {
            this.stepsPopUp = !this.stepsPopUp;
        }
        ,
        addNewWorkout()
        {
            const workout = document.getElementById('workout').value ? document.getElementById('workout').value : "Workout";
            const typeOfTrain = document.getElementById('typeOfTrain').value;
            const musclesTargeted = document.getElementById('musclesTargeted').value;
            const intensity = document.getElementById('intensity').value ? document.getElementById('intensity').value : 1;
            const timeWorkout = document.getElementById('timeWorkout').value;
            let temp = timeWorkout.replace(":", "") ? timeWorkout.replace(":", "") : "00:00";
            const Dat = new Date();
            let yyyy = Dat.getFullYear();
            let mm = Dat.getMonth() + 1;
            let dd = Dat.getDay();
            let date = dd + "/" + mm + "/" + yyyy; 

            if(!this.muscle.includes(musclesTargeted))
            {
                this.errorMsg['muscle'] = true;
                this.errorMsg['train'] = false;
                this.errorMsg['time'] = false;
                return;
            }
            else if(!this.train.includes(typeOfTrain))
            {
                this.errorMsg['train'] = true;
                this.errorMsg['muscle'] = false;
                this.errorMsg['time'] = false;
                return;
            }
      
            axios.post("http://localhost:3000/api/workout", {
                Name: workout,
                Type: typeOfTrain,
                Muscles: musclesTargeted,
                Intensity : intensity,
                Time: temp,
                Date : Dat,

            },{withCredentials: true})
                .then(response => {
                    console.log('Data posted successfully:', response.data);
                    this.workoutPopUp = false;
                    this.$router.go()
                })
                .catch(error => {
                    this.errorMsg['workout'] = true;
                    this.errorMsg['train'] = false;
                    this.errorMsg['muscle'] = false;
                    this.errorMsg['time'] = false;
                    console.log(error)
                });
        },
        addNewSteps()
        {
            const steps = document.getElementById('steps').value ? document.getElementById('steps').value : "Steps";
            const typeOfMachine = document.getElementById('typeOfMachine').value;
            const incline = document.getElementById('incline').value ? document.getElementById('incline').value : 0;
            const stepsTaken = document.getElementById('stepsTaken').value ? document.getElementById('stepsTaken').value : 0;
            const timeSteps = document.getElementById('timeSteps').value;
            let temp = timeSteps.replace(":", "") ? timeSteps.replace(":", "") : "00:00";
            const Dat = new Date();
            

            if(!this.machine.includes(typeOfMachine))
            {
                this.errorMsg['machine'] = true;
                return;
            }

            axios.post("http://localhost:3000/api/steps", {
                Name: steps,
                Machine: typeOfMachine,
                Incline: incline,
                Steps: stepsTaken,
                Time: temp,
                Date : Dat,
            },{withCredentials: true})
                .then(response => {
                    console.log('Data posted successfully:', response.data);
                    this.stepsPopUp = false;
                    this.$router.go()
                })
                .catch(error => {
                    this.errorMsg['steps'] = true;
                    this.errorMsg['machine'] = false;
                    console.log(error)
                });
        },
        nextW()
        {
            if(this.currentWorkoutCards + 6 < this.workoutCards.length)
            {
                this.currentWorkoutCards += 6;
                this.tempWCards = this.workoutCards.slice(this.currentWorkoutCards, this.currentWorkoutCards + 6);
            }
        },
        backW()
        {
            if(this.currentWorkoutCards - 6 >= 0)
            {
                this.currentWorkoutCards -= 6;
                this.tempWCards = this.workoutCards.slice(this.currentWorkoutCards, this.currentWorkoutCards + 6);
            }
        },
        nextS()
        {
            if(this.currentStepsCards + 6 < this.stepsCards.length)
            {
                this.currentStepsCards += 6;
                this.tempSCards = this.stepsCards.slice(this.currentStepsCards, this.currentStepsCards + 6);
            }
        },
        backS()
        {
            if(this.currentStepsCards - 6 >= 0)
            {
                this.currentStepsCards -= 6;
                this.tempSCards = this.stepsCards.slice(this.currentStepsCards, this.currentStepsCards + 6);
            }
        }
    }
    ,
    mounted()
    {
        axios.get("http://localhost:3000/api/workout", {withCredentials: true})
            .then(response => {
                console.log('Data fetched successfully:', response.data);
                this.workoutCards = response.data;
                console.log(this.workoutCards.length)
                this.tempWCards = this.workoutCards.slice(0,6);

                axios.get("http://localhost:3000/api/steps", {withCredentials: true})
                .then(response => {
                    this.stepsCards = response.data;
                    console.log(this.stepsCards.length)
                    this.tempSCards = this.stepsCards.slice(0,6);
                    console.log('Data fetched successfully:', response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                this.load = false;
            });


    }
}
</script>

<style lang="css" src="../assets/tracker.css">

</style>
