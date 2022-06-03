<template>
    <div class="container">   
        <nav-bar />
        <div class="main">
         <div class="topbar">
            <div class="toggle" @click="toggleMenu"></div>				
                <h4 style="color:black">SLC FOLLOWUP APP</h4>
                <h4 style="color:black"></h4>
            </div>   
        <center>
        <br><br>
            <h3>Assign Followup Members to New Members</h3>
        </center>                                             
        <section  style="margin-top:5%">
            <form>
                <center>                
                    <div>
                        <label for="">Followup Member</label>
                        <select v-model="assignuser" required>
                            <option :value="null">Select</option>
                            <option v-for="user in users" :key="user" :value="user.id" >
                                {{ user.fullname }}
                            </option>
                        </select>
                    </div>
                </center>
            </form>
        </section>
        <section>
            <div>
                <table id="all-assign">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Fullname</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in members" :key="member">
                            <td>
                                <center>
                                    <input type="checkbox" v-model="assignMember" :value="{userid:this.assignuser, memberid:member.id}" required   >
                                </center>
                            </td>
                            <td>
                                <center> {{ member.fullname }} </center>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <center style="margin-top:5%">
            <button @click="submitassign">Assign New Members</button>
        </center>


        </div>

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import User from '../../components/Api/User'
import Assign from '../../components/Api/AssignMember'
import Swal from 'sweetalert2'
export default {
    components:{NavBar},
    data() {
        return {
            assignuser: null,
            assignMember: [],
            members:null,
            users:null,            
            user:null
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
        getUsers(){
            Assign.getUsersToAssign().then((result) => {
                this.users = result.data  
            })
        },
        datatable(){            
            $(function() {
                 $('#all-assign').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        getMembers(){
            Assign.getUnassignedMembers().then((result) => {
                this.members = result.data
                this.datatable()
            })
        },
         getAuth(){
            User.auth().then((result)=>{
                this.user = result.data                                  
                this.getUsers()
                this.getMembers()
            }).catch(()=>{
				this.$router.push('/')
			})
        },

        addMember(member){            
            this.assignMember.push(
                {userid:this.assignuser, memberid:member},
            )
        },

        submitassign(){
            if(this.assignuser == null){
                Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Select a follow up member',
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })   
            }else{
                Assign.assignMember(this.assignMember).then((result) => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: result.data.message,
                        customClass: 'Swal-wide',
                        showConfirmButton: false,
                        timer: 3000
                    })       
                    this.assignuser = null
                    this.assignMember = []             
                }).catch((err) => {
                    if(err.response.status == 500){

                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'This assignment already exists',
                            customClass: 'Swal-wide',
                            showConfirmButton: false,
                            timer: 3000
                        })    
                    }
                });
            }
        }
    },
    watch:{
        assignuser(){
            if(this.assignuser == null){
                this.assignMember = []
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