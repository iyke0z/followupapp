<template>
    <div class="container">   
        <nav-bar />
       
        <div class="main">
             
            <center style="margin-top:5%; margin-bottom:2%">
                <button @click="toggleCrud">
                    Add New Area <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
            </center>

        <section v-if="crud">
            <center>
                <div class="form-group">
                    <label>Area Name</label>
                    <input type="text" placeholder="Input Area" @input="checkInput" v-model="area.area_name" >
                </div>
                <div class="form-group">
                    <label>Latitude</label>
                    <input type="text" placeholder="Input Latitude" @input="checkInput"  v-model="area.latitude" >
                </div>
                 <div class="form-group">
                    <label>Longitude</label>
                    <input type="text" placeholder="Input Longitude" @input="checkInput"  v-model="area.longitude" >
                </div>                                                            
                <button  @click.prevent=addarea() v-if="!updateMode" :disabled="!filled">Add</button>
                <button  @click.prevent=updateUser() v-if="updateMode">Update</button>                                            
            </center>
        </section>
        <section>
            <center>        
                <div class="tableDiv">
        
                <table id="all-areas">
                    <thead>
                        <tr>
                            <th>Area Name</th>
                            <th>Longitude</th>
                            <th>Latitude</th>                            
                            <th>Status</th>                                                                                    
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody :key="tableKey">
                        <tr v-for="area in allareas" :key="area" >
                            <td>
                                <center>{{area.area_name}}</center>
                            </td>
                            <td>
                                <center>{{area.latitude}}</center>
                            </td>
                            <td>
                                <center>{{area.longitude}}</center>
                            </td>
                            <td v-if="area.deleted_at == null">
                                <center><p style="color:green">Active</p></center>
                            </td>                                                       
                            <td v-if="area.deleted_at != null">
                                <center><p style="color:red">Inactive</p></center>
                            </td>                                                       
                            <td>
                                <button style="background:red" id="delete" @click="deletearea(area)">
                                    <i class="fa fa-trash"></i>
                                </button>
                                <button id="edit" @click="getarea(area)">
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
import Area from '../../components/Api/Area'
import User from '@/components/Api/User'
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
            area:{
                id:null,
                area_name:null,
                latitude:null,                
                longitude:null,
            },
            allareas:null
        }
    },    
    methods: {
        checkInput(){
            if(this.area.area_name == null || this.area.latitude == null || this.area.longitude == null){
                this.filled = false
            }else{
                this.filled = true
            }
        },
        toggleCrud(){
            this.crud = !this.crud
            this.area.id = null
            this.area.area_name = null
            this.area.latitude = null
            this.area.longitude = null            
        },
        
        datatable(){ 
            $(function() {
                 $('#all-areas').DataTable({                    
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],                    
                });
            });
        },
        allarea(){
            Area.allAreas().then((result) => {
                this.allareas = result.data   
                this.tableKey++               
                this.datatable()                                 
            })
        }, 
        addarea(){
            Area.createArea(this.area).then((result) => {
                  this.allarea()
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
        deletearea(area){
             Area.deleteArea(area).then((result) => {                 
                  this.allarea()
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
        getarea(area){
            this.area.id = area.id
            this.area.area_name = area.area_name            
            this.area.latitude = area.latitude                        
            this.area.longitude= area.longitude
            this.updateMode = true
            this.crud = true
        },
        updateUser(){
            Area.updateArea(this.area).then((result) => {
                this.allarea()
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
                this.allarea()
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