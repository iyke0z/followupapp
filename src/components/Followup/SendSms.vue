<template>
    <div class="container">   
        <nav-bar />
        <div class="main">

            <center style="margin-top:5%">
                <h1>SMS ACTION</h1>
            </center>

            <section>
                <center>
                    <div>
                        <label for="">Start Date</label>
                        <input type="date" v-model="sms.date_joined">
                    </div>
                    <div>
                        <label for="">Message</label>
                        <textarea placeholder="Message" v-model="sms.message" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <button @click="sendSms">
                        <i class="fa fa-check" aria-hidden="true"></i> Send
                    </button>
                </center>
            </section>                                     

        </div>

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import User from '../../components/Api/User'
import Swal from 'sweetalert2'
import Sms from '../../components/Api/AssignMember'
export default {
    components:{NavBar},
    data() {
        return {
           user:null,
           sms:{
               date_joined:null,
               message:null
           }
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
         getAuth(){
            User.auth().then((result)=>{
                console.log(result)
                this.user = result.data                                  
            }).catch(()=>{
				this.$router.push('/')
			})
        },
        sendSms(){
            if(this.sms.date_joined == null || this.sms.message == null){
                Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Fields are empty',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
            }else{
                Sms.sendSMS(this.sms).then((result) => {
                     Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Messge sent',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                        this.sms.date_joined = null
                        this.sms.message = null
                }).catch((err) => {
                     Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Messge not sent',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })  
                });
            }
        }
    },
    created() {
        this.getAuth()
    },
}
</script>
<style scoped>
    @import url('../../components/style.css');
</style>