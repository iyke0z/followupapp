<template>
    <div class="container">   
        <nav-bar />
        <div class="main">       
    
            <center style="margin-top:5%; margin-bottom:2%">
                <div class="loading" v-if="isLoading">
                    <loading />
                </div>
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
                    <select v-model="member.interest" @change="checkInput" >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </div>
                <div class="form-group">                
                    <label>Area of Residence</label>
                    <select v-model="member.areaid" @change="checkInput" >
                        <option value="null"> Select Area of Residence</option>
                        <option v-for="area in allareas" :key="area" :value="area.id">{{ area.area_name }}</option>                        
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
                <div class="tableDiv">
            
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
                </div>
            </center>

        </section>                                      

        </div>
        

    </div>
</template>
<script>
import NavBar from '../../Navigation.vue'
import Member from '../../components/Api/Member'
import User from '../../components/Api/User'
import Area from '@/components/Api/Area'
import Loading from '@/components/Loading.vue'
import Swal from 'sweetalert2'
export default {
    components:{NavBar, Loading},
    data() {
        return {
            filled:false,
            updateMode:false,
            crud:false,
            user:null,
            isLoading:false,
            tableKey:0,
            member:{
                id:null,
                fullname:null,
                email:null,
                tel:null,                
                date:null,
                interest:1,
                areaid:null
            },
            allareas:null,
            allmembers:null
        }
    },    
    methods: {
        checkInput(){
            if(this.member.areaid == null || this.member.fullname == null || this.member.email == null || this.member.tel == null || this.member.interest == null){
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
            this.isLoading = true
            Member.allMembers().then((result) => {
                this.allmembers = result.data   
                this.tableKey++               
                this.datatable() 
                this.isLoading = false                                
            })
        }, 
        addMember(){
            this.isLoading = true
            Member.createMember(this.member).then((result) => {
                  this.allMembers()
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
        deleteMember(member){
            this.isLoading = true
             Member.deleteMember(member).then((result) => {                 
                  this.allMembers()
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
            this.isLoading = true
            Member.updateMember(this.member).then((result) => {
                this.allMembers()
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
        allarea(){
            this.isLoading = true
            Area.allAreas().then((result) => {
                this.allareas = result.data   
                this.tableKey++               
                this.datatable()    
                this.isLoading = false                             
            })
        }, 
        getAuth(){
            this.isLoading = true
            User.auth().then((result)=>{                
                this.user = result.data 
                this.allarea()
                this.allMembers()
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