
<template>
    <NavSign></NavSign>
    <Transition name="shadow">
        <div class="shadow" v-if="editPassPop || editPicPop || editInfoPop || deleteAcc"></div>
    </Transition>
    <div class="body">
        <div class="MyProfile">
            <h2>My Profile</h2>
            <div class="profileContainer">
                <div class="ImgAndName">
                    <div class="image">
                        <img
                            :src="this.userData.Image ? 'data:image/png;base64, ' + this.userData.Image : this.tempImg"
                            alt="Profile Image">
                            
                    </div>
                    <div class="nameContainer">
                        <p class="name1">{{this.userData.Username}}</p>
                        <p class="name2">{{ this.userData.Firstname ? this.userData.Firstname : ""}} {{ this.userData.Lastname === "Not Set" ? "" : (this.userData.Lastname ? this.userData.Lastname : "") }}</p>
                    </div>
                </div>
                <div class="buttonsContainerProfile">
                    <button class="editButtonProfile button" @click="toggleP">Edit</button>
                    <Transition name="popup">
                        <div v-if="editPicPop" class="pic-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="80" height="80" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M38.25 71.0625C36.0625 71.0625 34.2135 70.3073 32.7031 68.7969C31.1927 67.2865 30.4375 65.4375 30.4375 63.25C30.4375 61.0625 31.1927 59.2135 32.7031 57.7031C34.2135 56.1927 36.0625 55.4375 38.25 55.4375C40.4375 55.4375 42.2865 56.1927 43.7969 57.7031C45.3073 59.2135 46.0625 61.0625 46.0625 63.25C46.0625 65.4375 45.3073 67.2865 43.7969 68.7969C42.2865 70.3073 40.4375 71.0625 38.25 71.0625ZM75.75 71.0625C73.5625 71.0625 71.7135 70.3073 70.2031 68.7969C68.6927 67.2865 67.9375 65.4375 67.9375 63.25C67.9375 61.0625 68.6927 59.2135 70.2031 57.7031C71.7135 56.1927 73.5625 55.4375 75.75 55.4375C77.9375 55.4375 79.7865 56.1927 81.2969 57.7031C82.8073 59.2135 83.5625 61.0625 83.5625 63.25C83.5625 65.4375 82.8073 67.2865 81.2969 68.7969C79.7865 70.3073 77.9375 71.0625 75.75 71.0625ZM57 107C70.9583 107 82.7812 102.156 92.4688 92.4688C102.156 82.7812 107 70.9583 107 57C107 54.5 106.844 52.0781 106.531 49.7344C106.219 47.3906 105.646 45.125 104.812 42.9375C102.625 43.4583 100.438 43.849 98.25 44.1094C96.0625 44.3698 93.7708 44.5 91.375 44.5C81.8958 44.5 72.9375 42.4688 64.5 38.4062C56.0625 34.3438 48.875 28.6667 42.9375 21.375C39.6042 29.5 34.8385 36.5573 28.6406 42.5469C22.4427 48.5365 15.2292 53.0417 7 56.0625V57C7 70.9583 11.8438 82.7812 21.5312 92.4688C31.2188 102.156 43.0417 107 57 107ZM57.0203 113.25C49.2422 113.25 41.9292 111.774 35.0812 108.822C28.2344 105.87 22.2781 101.864 17.2125 96.8031C12.1469 91.7427 8.13698 85.7917 5.18281 78.95C2.2276 72.1094 0.75 64.7995 0.75 57.0203C0.75 49.2422 2.22604 41.9292 5.17812 35.0812C8.13021 28.2344 12.1365 22.2781 17.1969 17.2125C22.2573 12.1469 28.2083 8.13698 35.05 5.18281C41.8906 2.2276 49.2005 0.75 56.9797 0.75C64.7578 0.75 72.0708 2.22605 78.9188 5.17813C85.7656 8.13021 91.7219 12.1365 96.7875 17.1969C101.853 22.2573 105.863 28.2083 108.817 35.05C111.772 41.8906 113.25 49.2005 113.25 56.9797C113.25 64.7578 111.774 72.0708 108.822 78.9187C105.87 85.7656 101.864 91.7219 96.8031 96.7875C91.7427 101.853 85.7917 105.863 78.95 108.817C72.1094 111.772 64.7995 113.25 57.0203 113.25ZM42.6734 8.98281C47.7693 19.1589 54.9688 26.5807 64.2719 31.2484C73.575 35.9161 82.6094 38.25 91.375 38.25C93.3146 38.25 95.2219 38.1521 97.0969 37.9562C98.9719 37.7594 100.839 37.4365 102.697 36.9875C98.7229 27.6927 92.5651 20.3713 84.2234 15.0234C75.8818 9.67447 66.8073 7 57 7C54.2594 7 51.7516 7.15833 49.4766 7.475C47.2005 7.79166 44.9328 8.29427 42.6734 8.98281ZM7.85313 48.9109C14.2875 46.0505 20.8063 41.363 27.4094 34.8484C34.0115 28.3339 37.8615 20.1448 38.9594 10.2812C30.6021 13.4625 23.6828 18.4703 18.2016 25.3047C12.7214 32.1401 9.27188 40.0089 7.85313 48.9109Z" fill="white"/>
                            </svg>

                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleP">
                            </div>
                            <p class="editText">Edit Profile Image</p>
                            <div class="userImage"></div>
                            <form>
                                <label class="inside-confirm">
                                    <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"/>
                                    Upload Image
                                </label>
                            </form>
                            <p class="extraText">PNG, JPG: 600x600 px</p>
                        </div>
                    </Transition>
                    <button class="changePassButton button" @click="toggleE">Change Password</button>
                    <Transition name="popup">
                        <div v-if="editPassPop" class="pass-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="75" height="90" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 90.9329C42.8844 90.9329 35.9896 92.2448 29.3156 94.8688C22.6406 97.4928 16.4344 101.509 10.6969 106.919V107.278C11.0177 107.519 11.3385 107.7 11.6594 107.82C11.9792 107.94 12.3396 108 12.7406 108H87.0187C87.4198 108 87.7604 107.94 88.0406 107.82C88.3208 107.7 88.6214 107.519 88.9422 107.278V106.919C83.3651 101.509 77.2792 97.4928 70.6844 94.8688C64.0906 92.2448 57.1958 90.9329 50 90.9329ZM6.25 102.495C11.875 96.9745 18.4115 92.6256 25.8594 89.4485C33.3073 86.2714 41.3542 84.6829 50 84.6829C58.6458 84.6829 66.6927 86.2714 74.1406 89.4485C81.5885 92.6256 88.125 96.9745 93.75 102.495V24.3469C93.75 23.3844 93.3495 22.5027 92.5484 21.7016C91.7474 20.9006 90.8656 20.5 89.9031 20.5H10.0969C9.13437 20.5 8.2526 20.9006 7.45156 21.7016C6.65052 22.5027 6.25 23.3844 6.25 24.3469V102.495ZM50 67.375C44.7594 67.375 40.3245 65.5599 36.6953 61.9297C33.0651 58.3006 31.25 53.8657 31.25 48.625C31.25 43.3844 33.0651 38.9495 36.6953 35.3204C40.3245 31.6901 44.7594 29.875 50 29.875C55.2406 29.875 59.6755 31.6901 63.3047 35.3204C66.9349 38.9495 68.75 43.3844 68.75 48.625C68.75 53.8657 66.9349 58.3006 63.3047 61.9297C59.6755 65.5599 55.2406 67.375 50 67.375ZM50 61.125C53.4052 61.125 56.3401 59.8933 58.8047 57.4297C61.2682 54.9652 62.5 52.0303 62.5 48.625C62.5 45.2198 61.2682 42.2849 58.8047 39.8204C56.3401 37.3568 53.4052 36.125 50 36.125C46.5948 36.125 43.6599 37.3568 41.1953 39.8204C38.7318 42.2849 37.5 45.2198 37.5 48.625C37.5 52.0303 38.7318 54.9652 41.1953 57.4297C43.6599 59.8933 46.5948 61.125 50 61.125ZM10.0969 114.25C7.21979 114.25 4.81771 113.287 2.89062 111.359C0.963542 109.432 0 107.03 0 104.153V24.3469C0 21.4698 0.963542 19.0678 2.89062 17.1407C4.81771 15.2136 7.21979 14.25 10.0969 14.25H21.1531V0.307861H27.8844V14.25H72.5969V0.307861H78.8469V14.25H89.9031C92.7802 14.25 95.1823 15.2136 97.1094 17.1407C99.0365 19.0678 100 21.4698 100 24.3469V104.153C100 107.03 99.0365 109.432 97.1094 111.359C95.1823 113.287 92.7802 114.25 89.9031 114.25H10.0969Z" fill="white"/>
                            </svg>
                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleE">
                            </div>
                            <p class="editText">Change Password</p>
                            <form class="formChangePass">
                                <div class="mb-3">
                                    <p class="error" v-if="this.error['passwordF']">{{ this.errorMsg['passwordF'] }}</p>
                                    <label for="password" class="form-label">Old Password</label>
                                    <input type="password" class="form-control" id="passwordO" name="passwordO" required>
                                </div>
                                <div class="mb-3">
                                    <p class="error" v-if="this.error['passwordC']">{{ this.errorMsg['passwordC'] }}</p>
                                    <label for="password" class="form-label">New Password</label>
                                    <input type="password" class="form-control" id="password" name="password" required>
                                </div>
                                <div class="mb-3">
                                    <label for="passwordC" class="form-label">Password Confirmation</label>
                                    <input type="password" class="form-control" id="passwordC" name="passwordC" required>
                                </div>
                            </form>
                            <button class="confirmPassChange button" @click="editPassword">Confirm</button>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="seperator"></div>
        <div class="MyPerInfo">
            <div class="PerContainer">
                <h4>My Personal Information</h4>
                <button class="editButtonInfo button" @click="toggleI">Edit</button>
                <Transition name="popup">
                        <div v-if="editInfoPop" class="info-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="75" height="90" viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M50 90.9329C42.8844 90.9329 35.9896 92.2448 29.3156 94.8688C22.6406 97.4928 16.4344 101.509 10.6969 106.919V107.278C11.0177 107.519 11.3385 107.7 11.6594 107.82C11.9792 107.94 12.3396 108 12.7406 108H87.0187C87.4198 108 87.7604 107.94 88.0406 107.82C88.3208 107.7 88.6214 107.519 88.9422 107.278V106.919C83.3651 101.509 77.2792 97.4928 70.6844 94.8688C64.0906 92.2448 57.1958 90.9329 50 90.9329ZM6.25 102.495C11.875 96.9745 18.4115 92.6256 25.8594 89.4485C33.3073 86.2714 41.3542 84.6829 50 84.6829C58.6458 84.6829 66.6927 86.2714 74.1406 89.4485C81.5885 92.6256 88.125 96.9745 93.75 102.495V24.3469C93.75 23.3844 93.3495 22.5027 92.5484 21.7016C91.7474 20.9006 90.8656 20.5 89.9031 20.5H10.0969C9.13437 20.5 8.2526 20.9006 7.45156 21.7016C6.65052 22.5027 6.25 23.3844 6.25 24.3469V102.495ZM50 67.375C44.7594 67.375 40.3245 65.5599 36.6953 61.9297C33.0651 58.3006 31.25 53.8657 31.25 48.625C31.25 43.3844 33.0651 38.9495 36.6953 35.3204C40.3245 31.6901 44.7594 29.875 50 29.875C55.2406 29.875 59.6755 31.6901 63.3047 35.3204C66.9349 38.9495 68.75 43.3844 68.75 48.625C68.75 53.8657 66.9349 58.3006 63.3047 61.9297C59.6755 65.5599 55.2406 67.375 50 67.375ZM50 61.125C53.4052 61.125 56.3401 59.8933 58.8047 57.4297C61.2682 54.9652 62.5 52.0303 62.5 48.625C62.5 45.2198 61.2682 42.2849 58.8047 39.8204C56.3401 37.3568 53.4052 36.125 50 36.125C46.5948 36.125 43.6599 37.3568 41.1953 39.8204C38.7318 42.2849 37.5 45.2198 37.5 48.625C37.5 52.0303 38.7318 54.9652 41.1953 57.4297C43.6599 59.8933 46.5948 61.125 50 61.125ZM10.0969 114.25C7.21979 114.25 4.81771 113.287 2.89062 111.359C0.963542 109.432 0 107.03 0 104.153V24.3469C0 21.4698 0.963542 19.0678 2.89062 17.1407C4.81771 15.2136 7.21979 14.25 10.0969 14.25H21.1531V0.307861H27.8844V14.25H72.5969V0.307861H78.8469V14.25H89.9031C92.7802 14.25 95.1823 15.2136 97.1094 17.1407C99.0365 19.0678 100 21.4698 100 24.3469V104.153C100 107.03 99.0365 109.432 97.1094 111.359C95.1823 113.287 92.7802 114.25 89.9031 114.25H10.0969Z" fill="white"/>
                            </svg>
                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleI">
                            </div>
                            <p class="editText">Edit User Information</p>
                            <form class="formChangeInfo">
                                <p class="error" v-if="error['passwordC']">{{ this.errorMsg['passwordC'] }}</p>
                                <p class="error" v-if="error['passwordF']">{{ this.errorMsg['passwordF'] }}</p>
                                <div class="nameContainer">
                                    <div class="mb-1">
                                        <label for="fName" class="form-label">First Name</label>
                                        <input type="text" :placeholder=" this.userData.Firstname ? this.userData.Firstname : ''" class="form-control" id="fname" name="fname">
                                    </div>
                                    <div class="mb-1">
                                        <label for="lName" class="form-label">Last Name</label>
                                        <input type="text" :placeholder=" this.userData.Lastname ? this.userData.Lastname : ''" class="form-control" id="lname" name="lname">
                                    </div>
                                </div>
                                <div class="phoneAndEmail">
                                    <div class="mb-1">
                                        <label for="email"  class="form-label">Email Address</label>
                                        <input type="email" :placeholder=" this.userData.Email ? this.userData.Email : ''" class="form-control" id="email" name="email" required>
                                    </div>
                                    <div class="mb-1">
                                        <p class="error" v-if="this.error['phone']">{{ this.errorMsg['phone'] }}</p>
                                        <label for="phone" class="form-label">Phone Number</label>
                                        <input type="number" :placeholder=" this.userData.Phone ? this.userData.Phone : ''" class="form-control" id="phone" name="phone">
                                    </div>
                                </div>
                                    <div class="heightandWeight">
                                        <div class="mb-1">
                                            <label for="height" class="form-label">Height</label>
                                            <input type="Number" :placeholder=" this.userData.Height ? this.userData.Height : ''" class="form-control" id="height" name="height">
                                        </div>
                                        <div class="mb-1">
                                            <label for="weight" class="form-label">Weight</label>
                                            <input type="Number" :placeholder=" this.userData.Weight ? this.userData.Weight : ''" class="form-control" id="weight" name="weight">
                                        </div>
                                    </div>
                                
                                <div class="passAndDate">
                                    <div class="mb-1">
                                        <label for="date" class="form-label">Date of Birth</label>
                                        <input type="date" :placeholder=" this.userData.DoB ? this.userData.DoB : ''" class="form-control dateForm" id="date" name="date">
                                    </div>
                                     <div class="mb-1">
                                        <label for="passwordC" class="form-label passSize">Confirm Password</label>
                                        <input type="password" class="form-control" id="passwordC" name="passwordC" required>
                                    </div>
                                </div>
                               
                            </form>
                            <button class="confirmPassChange button" @click="editInformation">Confirm</button>
                        </div>
                </Transition>
            </div>
            <div class="InfoContainer">
                <div class="fnameContainer smallContainer">
                    <p class="name1">First Name</p>
                    <p class="name2">{{ this.userData.Firstname ? this.userData.Firstname : "Not Set" }}</p>
                </div>
                <div class="lnameContainer smallContainer">
                    <p class="name1">Last Name</p>
                    <p class="name2">{{ this.userData.Lastname ? this.userData.Lastname : "Not Set" }}</p>
                </div>
                <div class="emailContainer smallContainer">
                    <p class="name1">Email address</p>
                    <p class="name2">{{ this.userData.Email ? this.userData.Email : "Not Set" }}</p>
                </div>
                <div class="phoneContainer smallContainer">
                    <p class="name1">Phone Number</p>
                    <p class="name2">{{ this.userData.Phone ? this.userData.Phone : "Not Set" }}</p>
                </div>
                <div class="heightContainer smallContainer">
                    <p class="name1">Height (CM)</p>
                    <p class="name2">{{ this.userData.Height ? this.userData.Height : "Not Set" }}</p>
                </div>
                <div class="weightContainer smallContainer">
                    <p class="name1">Weight (KG)</p>
                    <p class="name2">{{ this.userData.Weight ? this.userData.Weight : "Not Set" }}</p>
                </div>
                <div class="dobContainer smallContainer">
                    <p class="name1">Age</p>
                    <p class="name2">{{ this.calculateAge(this.userData.DoB) ? this.calculateAge(this.userData.DoB) : "Not Set" }}</p>
                </div>
                <div class="BMI smallContainer">
                    <p class="name1">BMI</p>
                    <p class="name2">{{ this.calculateBMI(this.userData.Weight, this.userData.Height)  
                    ? this.calculateBMI(this.userData.Weight, this.userData.Height) + " (" + 
                    this.getBMICategory(this.calculateBMI(this.userData.Weight, this.userData.Height)) + ")" : "Set Height/Weight" }} </p>
                </div>

            </div>

        </div>
        <div class="seperator"></div>
        <div class="DeleteContainer">
            <h3>Danger Zone - Account Deletion</h3>
            <p>Deleting your account may lead to the removal of all associated data.</p>
            <button class="button deleteButton" @click="toggleD">Delete</button>
            <Transition name="popup">
                        <div v-if="deleteAcc" class="delete-popup-holder">
                            <!-- CONTINUE HERE -->
                            <svg class="topImage" width="70" height="80" viewBox="0 0 88 99" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27.75 72.7984L44 56.5484L60.25 72.7984L64.6734 68.375L48.4234 52.125L64.6734 35.875L60.25 31.4515L44 47.7015L27.75 31.4515L23.3266 35.875L39.5766 52.125L23.3266 68.375L27.75 72.7984ZM16.5969 99C13.7198 99 11.3177 98.0364 9.39062 96.1093C7.46354 94.1822 6.5 91.7802 6.5 88.9031V11.5H0.25V5.24995H25.25V0.442139H62.75V5.24995H87.75V11.5H81.5V88.9031C81.5 91.7802 80.5365 94.1822 78.6094 96.1093C76.6823 98.0364 74.2802 99 71.4031 99H16.5969ZM75.25 11.5H12.75V88.9031C12.75 89.8656 13.1505 90.7474 13.9516 91.5484C14.7526 92.3494 15.6344 92.75 16.5969 92.75H71.4031C72.3656 92.75 73.2474 92.3494 74.0484 91.5484C74.8495 90.7474 75.25 89.8656 75.25 88.9031V11.5Z" fill="white"/>
                            </svg>
                            <div class="exitContainer">
                                <img class="exitImage" src="../assets/images/exit-white.svg" @click="toggleD">
                            </div>
                            <p class="deleteText">Are you sure?</p>
                            <p class="extraText">This step is unreversible. Deleting your account will PERMENANTLY remove all of your
                                existing information.</p>
                            <button class="finalDelete button" @click="deleteAccount">Delete</button>
                            
                        </div>
                    </Transition>
        </div>
        
    </div>
</template>

<script >
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import NavSign from "@/components/NavSign.vue";
import axios from "axios";
import icon from "@/assets/images/profile.png";

export default {name: 'Profile',
    components: {
        NavSign
    },
    data() {
        return {
            editInfoPop: false,
            editPassPop: false,
            editPicPop: false,
            deleteAcc: false,
            userData: {},
            error: {},
            errorMsg: {},
            tempImg : icon,
        }
    },
    methods:{
        toggleI() {
            this.editInfoPop = !this.editInfoPop;
        },
        toggleE() {
            this.editPassPop = !this.editPassPop;
        },
        toggleP() {
            this.editPicPop = !this.editPicPop;
        },
        toggleD()
        {
            this.deleteAcc = !this.deleteAcc;
        },
        fileToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = error => reject(error);
            });
         },
        uploadImage(event) {
            let file = event.target.files[0];
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                console.error("Invalid file type. Must Be (jpg, png, gif).");
                return;
            }

            // Restrict by file size
            const maxSize = 2 * 1024 * 1024;
            if (file.size > maxSize) {
                console.error("File size exceeds 2MB.");
                this.errorLimit = true;
                return;
            }

            this.fileToBase64(file)
            .then(base64String => 
                
                axios.patch("http://localhost:3000/api/userImage/", {Image: base64String}, {withCredentials: true})
                    .then((response) => {
                        console.log(base64String)
                        console.log("image upload response > ", response);
                        this.$router.go()
                    })
                    .catch((error) => {
                        this.error = error;
                        console.error(error);
                    })
                    .finally(() => {
                    }))
            .catch(error => console.error(error));
            
        },
        editInformation()
        {
            let fName = document.getElementById("fname").value ? document.getElementById("fname").value : (this.userData.Firstname ? this.userData.Firstname : "Not Set");
            let lName = document.getElementById("lname").value ? document.getElementById("lname").value : (this.userData.Lastname ? this.userData.Lastname : "Not Set");
            let email = document.getElementById("email").value ? document.getElementById("email").value : this.userData.Email;
            let phone = document.getElementById("phone").value ? document.getElementById("phone").value : (this.userData.Phone ? this.userData.Phone : "Not Set");
            let height = document.getElementById("height").value ? document.getElementById("height").value : (this.userData.Height ? this.userData.Height : 0);
            let weight = document.getElementById("weight").value ? document.getElementById("weight").value : (this.userData.Weight ? this.userData.Weight : 0);
            let dateOfBirth = document.getElementById("date").value ? document.getElementById("date").value : (this.userData.DoB ? this.userData.DoB : "Not Set");
            let passwordC = document.getElementById("passwordC").value;


            console.log("dateOfBirth", dateOfBirth)
            console.log("age", this.calculateAge(dateOfBirth))
            if(!passwordC || passwordC === ""){
                this.errorMsg['passwordC'] = "Password confirmation is required.";
                this.error['passwordC'] = true;
                this.error['passwordF'] = false;
                this.error['phone'] = false;
            }

            const phoneRegex = /^\d{10}$/;
            console.log(phone)
            console.log(phone == "Not Set")
            if(phone !== "" && phone != "Not Set" && phone !== null && phone !== undefined && phone != " " && phone) {
                if(!phoneRegex.test(phone)) {
                    this.errorMsg['phone'] = "Phone number must be 10 digits.";
                    this.error['phone'] = true;
                    this.error['passwordC'] = false;
                    this.error['passwordF'] = false;
                    return;
                }
            }

            axios.get("http://localhost:3000/api/checkPass/" + passwordC, { withCredentials: true })
                .then(response => {
                    console.log(response.data);
                    if (response.data.Pass === true) {
                        axios.patch("http://localhost:3000/api/userInfo/", { Firstname: fName, Lastname: lName, Email: email, Height: height, Weight: weight, DoB:dateOfBirth }, { withCredentials: true })
                            .then((response) => {
                                console.log("user info update response > ", response);
                                this.$router.go()
                            })
                            .catch((error) => {
                                this.error = error;
                                console.error(error);
                            });
                    } else {
                        this.error['passwordF'] = true;
                        this.error['passwordC'] = false;
                        this.errorMsg['passwordF'] = "Password confirmation does not match.";
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        },
        calculateAge(dateOfBirth) {
            const today = new Date();
            const dob = new Date(dateOfBirth);

            let age = today.getFullYear() - dob.getFullYear();
            const monthDifference = today.getMonth() - dob.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
                age--;
            }
            return age;
        },

        calculateBMI(weightKg, heightCm) {
            if(weightKg <= 0 || heightCm <= 0) {
                return "NaN";
            }
            const heightM = heightCm / 100;
            const bmi = weightKg / (heightM * heightM);
            return bmi.toFixed(2);
        },

        getBMICategory(bmi) {
            if (bmi < 18.5) return "Underweight";
            else if (bmi < 24.9) return "Normal weight";
            else if (bmi < 29.9) return "Overweight";
            else if (bmi > 29.9) return "Obese";
            else return "-";
        },
        editPassword(){
            let oldPass = document.getElementById("passwordO").value;
            let password = document.getElementById("password").value;
            let passwordC = document.getElementById("passwordC").value;

            if(password !== passwordC) {
                this.errorMsg['passwordC'] = "Password confirmation does not match.";
                this.error['passwordC'] = true;
                this.error['passwordF'] = false;
                return;
            }

            if(password.length < 8) {
                this.errorMsg['passwordC'] = "Password has to be longer than 8 characters.";
                this.error['passwordC'] = true;
                this.error['passwordF'] = false;
                return;
            }

            axios.patch("http://localhost:3000/api/changePass", { oldPassword: oldPass, newPassword: password }, { withCredentials: true })
                .then((response) => {
                    if(response.data.Pass === false) {
                        this.errorMsg['passwordF'] = "Old password is incorrect.";
                        this.error['passwordF'] = true;
                        this.error['passwordC'] = false;
                        return;
                    }

                    console.log("user pass update response > ", response);
                    this.$router.go();
                })
                .catch((error) => {
                    this.errorMsg['passwordF'] = "Old password is incorrect.";
                    this.error['passwordF'] = true;
                    this.error['passwordC'] = false;
                    this.error = error;
                    console.error(error);
                });
        },
        deleteAccount()
        {
            axios.delete("http://localhost:3000/api/deleteAccount", { withCredentials: true })
                .then((response) => {
                    console.log("user delete response > ", response);
                    
                    this.$router.push('/login');
                })
                .catch((error) => {
                    this.error = error;
                    console.error(error);
                });
        }
    },
    mounted() {
        axios.get("http://localhost:3000/api/profile", { withCredentials: true })
            .then(response => {
                console.log(response.data);
                this.userData = response.data;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
}
</script>

<style lang="css" src="../assets/profile.css">

</style>
