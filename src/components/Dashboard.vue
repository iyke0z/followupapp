<template>
    <div class="container">   
        <nav-bar />
        <div class="main">                
            <div style="margin-top:5%" >             
                <center>
                <div class="loading" v-if="isLoading">
                <loading />
            </div>  
                <h1>            
                      
                    Members Assigned To Call
                </h1></center>

                <div v-if="assigned == null || assigned.length == 0">
                    <center>
                        <h1 style="color:red"> 
                            <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                        </h1>
                        <p>Currently have no members to follow up</p>
                    </center>
                </div>     
                <div class="tableDiv">
                <table :key="tableKey" id="myTable" v-if="assigned != null">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Tel</th>
                            <th>Follow up Count</th>
                            <th>Interest</th>
                            <th>Date Joined</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="member in assigned" :key="member">
                            <td><center>{{member.fullname}}</center></td>
                            <td><center>{{member.tel}}</center></td>
                            <td><center>{{member.followup_count}}</center></td>
                            <td><center>{{member.interest}}</center></td>
                            <td><center>{{member.date}}</center></td>
                        </tr>
                    </tbody>
                </table>
                </div>           
            </div>

        </div>

    </div>
</template>
<script>
import NavBar from '../Navigation.vue'
import User from '../components/Api/User'
import Followup from './Api/Followup'
import Loading from '@/components/Loading.vue'
export default {
    components:{NavBar, Loading},
    data() {
        return {
            assigned:null,
            user:null,
            isLoading:false,
        }
    },    
    methods: {  
        datatable(){            
            $(function() {
                 $('#myTable').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        }, 
         toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		},  
        
        async getAssigned(){  
            this.isLoading = true          
            await Followup.getAssigned().then((result) => {
                this.assigned = result.data
                this.datatable()
                this.isLoading = false
            })            
        },
        
        getAuth(){
            this.isLoading = true          
            User.auth().then((result)=>{
                this.user = result.data                                  
                this.getAssigned()   
                this.isLoading = false             
            }).catch(()=>{
				this.$router.push('/')
			})
        },
    },
    created() {
        this.getAuth()
    },
}
</script>
<style scoped>
    @import url('../components/style.css');
</style>