<template>
    <div class="container">   
        <nav-bar />
        <div class="main">

            <center style="margin-top:5%">
            <div class="loading" v-if="isLoading">
                <loading />
            </div>
            <h1>Follow Up</h1> <br><br>
                <div>
                    <label for="">Select Assigned Member</label>
                    <select v-model="followup.memberid">
                        <option value="null">Select Assigned Member</option>
                        <option v-for="member in assigned" :key="member" :value="member.member.id">{{ member.member.fullname }}</option>
                    </select>
                </div>
                  <div class="form-group">                
                    <label>Followup Level</label>
                    <select v-model="followup.levelid" @change="getResponse">
                        <option value="null">Select Level</option>
                        <option v-for="level in followuplevel" :key="level" :value="level.id">
                            {{ level.level }}
                        </option>                        
                    </select>
                </div>
                <div>
                    <label for="">Follow Up Question</label>
                    <select v-model="followup.responseid">
                        <option value="null">Select Questions</option>
                        <option v-for="response in response" :key="response" :value="response.id">
                            {{ response.rtype}}
                        </option>
                    </select>
                </div>
                <div>
                    <label for="">Member Response Up Question</label>
                    <select v-model="followup.response">
                        <option value="null">Select</option>
                        <option value="positive">Positive</option>
                        <option value="between">Between</option>
                        <option value="negative">Negative</option>
                    </select>
                </div>
                <div>
                    <label for="">Details</label>
                    <textarea placeholder="Member Response" id="" cols="30" rows="10"></textarea>
                </div>

                <button style="margin-bottom:10%" @click="followupmember"> Save </button>
            </center>

        </div>

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import User from '../../components/Api/User'
import Followup from '../Api/Followup'
import Swal from 'sweetalert2'
export default {
    components:{NavBar},
    data() {
        return {
            followup:{levelid:null, memberid:null, responseid:null, response:null, details:null},
            user:null,
            isLoading:false,
            followuplevel:null,
            assigned:null,
            response:null
        }
    },    
    methods: {  
        toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		}, 
      
        getLevels(){
            Followup.getFollowupLevel().then((result) => {
                this.followuplevel = result.data
            })
        },

        getResponse(){
            this.followup.responseid = null
            Followup.getResponse(this.followup.levelid).then((result) => {
                this.response = result.data                
            })
        },

        followupmember(){
            this.isLoading = true
            if(this.followup.memberid == null || this.followup.levelid == null || this.followup.responseid == null || this.followup.response == null){
                this.isLoading = false
                 Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Fields are empty',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
            }else{
                Followup.followup(this.followup).then((result) => {
                    this.isLoading = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Follow Up Data Stored Successfully',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                }).catch((err) => {
                    this.isLoading = false
                    Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: err.response.data.message,
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                });
            }
        },

        getAuth(){
            this.isLoading = true
            User.auth().then((result)=>{
                this.user = result.data
                this.getLevels() 
                this.isLoading = false           
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        async getAssigned(){            
            await Followup.getAssigned().then((result) => {
                this.assigned = result.data
            })            
        },
    },
    created() {
        this.getAuth()
        this.getAssigned()
    },
}
</script>
<style scoped>
    @import url('../../components/style.css');
</style>