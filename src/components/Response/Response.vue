<template>
    <div class="container">   
        <nav-bar />
        <div class="main">
         <div class="topbar">
           <div class="toggle" @click="toggleMenu"></div>				
                <h4 style="color:black">SLC FOLLOWUP APP</h4>
                <h4 style="color:black"></h4>
            </div>

            <center style="margin-top:5%; margin-bottom:2%">
                <button @click="toggleCrud">
                    Add New Response <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </center>

        <section v-if="crud">
            <center>
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" placeholder="Input Question" @input="checkInput" v-model="response.rtype" >
                </div>
                <div class="form-group">                
                    <label>Followup Level</label>
                    <select v-model="response.levelid" @change="checkInput" >
                        <option value="null">Select Level</option>
                        <option v-for="level in followuplevel" :key="level" :value="level.id">
                            {{ level.level }}
                        </option>                        
                    </select>
                </div>

                <button  @click.prevent=addResponse() v-if="!updateMode" :disabled="!filled">Add</button>
                <button  @click.prevent=updateResponse() v-if="updateMode">Update</button>                                            
            </center>
        </section>
        <section>
            <center>                
                <table id="all-response">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Level</th>                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody :key="tableKey">
                        <tr v-for="response in allresponse" :key="response" >
                            <td>
                                <center>{{response.rtype}}</center>
                            </td>
                            <td>
                                <center>{{response.level.level}}</center>
                            </td>                           
                            <td>
                                <button style="background:red" id="delete" @click="deleteResponse(response)">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <button id="edit" @click="getResponse(response)">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </center>

        </section>                                       

        </div>

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import User from '../../components/Api/User'
import Response from '../../components/Api/Response'
import Swal from 'sweetalert2'

export default {
    components:{NavBar},
    data() {
        return {
            filled:false,
            updateMode:false,
            crud:false,
            user:null,
            tableKey:0,
            response:{
                id:null,
                rtype:null,
                levelid:null,                
            },
            allresponse:null,
            followuplevel:null
        }
    },    
    methods: {
        checkInput(){
            if(this.response.rtype == null || this.response.levelid == null){
                this.filled = false
            }else{
                this.filled = true
            }
        },
        toggleCrud(){
            this.crud = !this.crud
            this.response.id = null
            this.response.rtype = null
            this.response.levelid = null           
        },
        toggleMenu(){
            let toggle = document.querySelector('.toggle');            
			let navigation = document.querySelector('.navigation')
			let main = document.querySelector('.main')            
			navigation.classList.toggle('active')
			toggle.classList.toggle('active')
			main.classList.toggle('active')			
		}, 
        datatable(){            
            $(function() {
                 $('#all-response').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        allResponse(){
            Response.allResponse().then((result) => {
                this.allresponse = result.data[0]
                this.followuplevel = result.data[1]
                this.tableKey++               
                this.datatable()                                 
            })
        }, 
        addResponse(){
            Response.createResponse(this.response).then((result) => {
                  this.allResponse()
                  this.toggleCrud()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        deleteResponse(response){
             Response.deleteResponse(response).then((result) => { 
                  this.allResponse()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                 Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        getResponse(response){ 
            this.response.id = response.id       
            this.response.rtype = response.rtype 
            this.response.levelid = response.level.id
            this.updateMode = true
            this.crud = true
        },

        updateResponse(){
            Response.updateResponse(this.response).then((result) => {
                this.allResponse()
                this.toggleCrud()
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })    
            }).catch((err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: err.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            });
        },
        getAuth(){
            User.auth().then((result)=>{                
                this.user = result.data 
                this.allResponse()
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
    @import url('../../components/style.css');
</style>