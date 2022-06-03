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
                    Add New Member <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </center>

        <section v-if="crud">
            <center>
                <div class="form-group">
                    <label>Fullname</label>
                    <input type="text" placeholder="Input Fullname" @input="checkInput" v-model="member.fullname" >
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" placeholder="Input Email" @input="checkInput"  v-model="member.email" >
                </div>
                 <div class="form-group">
                    <label>Tel</label>
                    <input type="text" placeholder="Input Tel" @input="checkInput"  v-model="member.tel" >
                </div>                                             
                <div class="form-group">                
                    <label>Interest</label>
                    <select v-model="member.interest" @input="checkInput" >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="form-group" v-if="updateMode">
                    <label>Date Joined</label>
                    <input type="date" @input="checkInput"  v-model="member.date" >
                </div>
                <button  @click.prevent=addMember() v-if="!updateMode" :disabled="!filled">Add</button>
                <button  @click.prevent=updateUser() v-if="updateMode">Update</button>                                            
            </center>
        </section>
        <section>
            <center>                
                <table id="all-members">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Tel</th>                            
                            <th>Status</th>                            
                            <th>Date Joined</th> 
                            <th>Followup Count</th>                           
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody :key="tableKey">
                        <tr v-for="member in allmembers" :key="member" >
                            <td>
                                <center>{{member.fullname}}</center>
                            </td>
                            <td>
                                <center>{{member.email}}</center>
                            </td>
                            <td>
                                <center>{{member.tel}}</center>
                            </td>
                            <td>
                                <center>{{member.membership_status}}</center>
                            </td> 
                            <td>
                                <center>{{member.date}}</center>
                            </td> 
                            <td>
                                <center>{{member.followup_count}}</center>
                            </td> 
                                                      
                            <td>
                                <button style="background:red" id="delete" @click="deleteMember(member)">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <button id="edit" @click="getMember(member)">
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
import Member from '../../components/Api/Member'
import User from '../../components/Api/User'
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
            member:{
                id:null,
                fullname:null,
                email:null,
                tel:null,                
                date:null,
                interest:1
            },
            allmembers:null
        }
    },    
    methods: {
        checkInput(){
            if(this.member.fullname == null || this.member.email == null || this.member.tel == null || this.member.interest == null){
                this.filled = false
            }else{
                this.filled = true
            }
        },
        toggleCrud(){
            this.crud = !this.crud
            this.member.id = null
            this.member.fullname = null
            this.member.email = null
            this.member.tel = null            
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
                 $('#all-members').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    
                });
            });
        },
        allMembers(){
            Member.allMembers().then((result) => {
                this.allmembers = result.data   
                this.tableKey++               
                this.datatable()                                 
            })
        }, 
        addMember(){
            Member.createMember(this.member).then((result) => {
                  this.allMembers()
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
        deleteMember(member){
             Member.deleteMember(member).then((result) => {                 
                  this.allMembers()
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
        getMember(member){
            this.member.id = member.id
            this.member.fullname = member.fullname
            this.member.email = member.email
            this.member.tel = member.tel                        
            this.member.date= member.date
            this.updateMode = true
            this.crud = true
        },
        updateUser(){
            Member.updateMember(this.member).then((result) => {
                this.allMembers()
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
                this.allMembers()
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