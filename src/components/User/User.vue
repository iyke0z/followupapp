<template>
    <div class="container">   
        <nav-bar />
        <div class="main">

            <center style="margin-top:5%; margin-bottom:2%">
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
                <button @click="toggleCrud">
                    Add New Worker <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </center>

        <section v-if="crud">
            <center>
                <div class="form-group">
                    <label>Fullname</label>
                    <input type="text" placeholder="Input Fullname" @input="checkInput" v-model="worker.fullname" >
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Input Email" @input="checkInput"  v-model="worker.email" >
                </div>
                 <div class="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Input Tel" @input="checkInput"  v-model="worker.tel" >
                </div>
                <div class="form-group">                
                    <label>Birth Month</label>
                    <input type="text" placeholder="Input Birth Month" @input="checkInput"  v-model="worker.birthmonth" >
                </div>
                <div class="form-group">                
                    <label>User Type</label>
                    <select v-model="worker.usertype" @input="checkInput" >
                        <option value="null">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <div class="form-group">                
                    <label>Status</label>
                    <select v-model="worker.status" @input="checkInput" >
                        <option value="null">Select Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                  <div class="form-group">                
                    <label>Training</label>
                    <select v-model="worker.trained" @input="checkInput" >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <button  @click.prevent=addUser() v-if="!updateMode" :disabled="!filled">Add</button>
                <button  @click.prevent=updateUser() v-if="updateMode">Update</button>                                            
            </center>
        </section>
        <section>
            <center>  
            <div class="tableDiv">
                <table id="all-users">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Tel</th>
                            <th>Network</th>
                            <th>Status</th>
                            <th>Dob</th>
                            <th>Usertype</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody :key="tableKey">
                        <tr v-for="worker in allworkers" :key="worker" >
                            <td>
                                <center>{{worker.fullname}}</center>
                            </td>
                            <td>
                                <center>{{worker.email}}</center>
                            </td>
                            <td>
                                <center>{{worker.tel}}</center>
                            </td>
                             <td>
                                <center>{{worker.network_provider}}</center>
                            </td>
                             <td>
                                <center>{{worker.status}}</center>
                            </td>
                            <td>
                                <center>{{ worker.birthmonth }}</center>
                            </td>
                            <td>
                                <center>{{worker.usertype}}</center>
                            </td>
                            <td>
                                <button style="background:red" id="delete" @click="deleteUser(worker)">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <button id="edit" @click="getUser(worker)">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>              
            </center>

        </section>                                       

        </div>

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import User from '../../components/Api/User'
import Swal from 'sweetalert2'
import Loading from '@/components/Loading.vue'

export default {
    components:{NavBar, Loading},
    data() {
        return {
            filled:false,
            updateMode:false,
            crud:false,
            isLoading:false,
            user:null,
            tableKey:0,
            worker:{
                id:null,
                fullname:null,
                email:null,
                tel:null,
                birthmonth:null,
                usertype:null ,
                status:null,
                trained:0
            },
            allworkers:null
        }
    },    
    methods: {
        checkInput(){
            if(this.worker.fullname == null || this.worker.email == null || this.worker.tel == null || this.worker.birthmonth == null || this.worker.usertype == null){
                this.filled = false
            }else{
                this.filled = true
            }
        },
        toggleCrud(){
            this.crud = !this.crud
            this.worker.id = null
            this.worker.fullname = null
            this.worker.email = null
            this.worker.tel = null
            this.worker.birthmonth = null
            this.worker.usertype = null
            this.worker.status = null
            this.worker.trained = 0
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
                 $('#all-users').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        allUsers(){
            this.isLoading = true
            User.allUsers().then((result) => {
                this.allworkers = result.data   
                this.tableKey++               
                this.datatable() 
                this.isLoading = false                                
            })
        }, 
        addUser(){
            this.isLoading = true
            User.createUser(this.worker).then((result) => {
                  this.allUsers()
                  this.toggleCrud()
                  this.isLoading = false
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                this.isLoading = false
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
        deleteUser(worker){
            this.isLoading = true
             User.deleteUser(worker).then((result) => {                 
                  this.allUsers()
                  this.isLoading = false
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })
            }).catch((err) => {
                this.isLoading = false
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
        getUser(worker){
            this.worker.id = worker.id
            this.worker.fullname = worker.fullname
            this.worker.email = worker.email
            this.worker.tel = worker.tel
            this.worker.birthmonth = worker.birthmonth
            this.worker.usertype = worker.usertype
            this.worker.status = worker.status
            this.worker.trained = worker.trained
            this.updateMode = true
            this.crud = true
        },
        updateUser(){
            this.isLoading = true
            User.updateUser(this.worker).then((result) => {
                this.allUsers()
                this.toggleCrud()
                this.isLoading = false
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: result.data.message,
                    customClass: 'Swal-wide',
                    showConfirmButton: false,
                    timer: 3000
                })    
            }).catch((err) => {
                this.isLoading = false
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
            this.isLoading = true
            User.auth().then((result)=>{                
                this.user = result.data 
                this.allUsers()
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
    @import url('../../components/style.css');
</style>