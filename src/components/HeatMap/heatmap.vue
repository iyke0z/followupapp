<template>
    <div>
        <nav-bar />
        <div class="main">  
         <div class="topbar">
                <div class="toggle" @click="toggleMenu"></div>				
                <h4 style="color:black">SLC FOLLOWUP APP</h4>
                <h4 style="color:black"></h4>
            </div>             
            <center>
            <!-- <div class="loading" v-if="isLoading">
                <loading />
            </div> -->
            </center>
            <!-- form start-->   
                <TransitionGroup name="content">                                     
                    <center>
                        <div class="form-group" style="margin-top:5%">
                            <!-- <label for="">Get Specific Area Densite</label>                      
                            <select v-model="location" @change="openLocation">
                                <option value="null">Select</option>
                                <option v-for="area in areas" :key="area" :value="area.id">
                                    {{area.area_name}}
                                </option>
                            </select> -->

                            <!-- <label for="">View All Areas</label>
                            <select v-model="location" @change="allLocations">
                                <option value="null">Select</option>
                                <option v-for="area in areas" :key="area" :value="area.id">
                                    All Locations
                                </option>
                            </select> -->
                                                                       
                        </div>                                           
                    </center>
                </TransitionGroup>                     
            <!-- form end -->
            <!-- Table Div Start -->
            <TransitionGroup name="content">                                     
                <center>
                    <Map :key="mapKey" :locarea="coordinates"/>
                </center>
            </TransitionGroup>                     
            <!-- Table Div End -->
        </div>
    </div>
</template>

<script>

import NavBar from '@/Navigation.vue';
import User from '@/components/Api/User'
import Swal from 'sweetalert2'
import Area from '@/components/Api/Area'
import Report from '@/components/Api/Report'
import Map from './map.vue'
    export default{          
        components:{NavBar,Map},
        data() {
            return {
                user:null,
                opencreateform:false,
                showtable:true,
                singleObject:null,
                tableKey:0,
                updateMode:false,
                isLoading:false,
                filter:1,
                mapKey:0,
                selectedArea:null,
                showArea:false,
                areas:null,
                location:null,
                coordinates:null

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

            api_refresh(){
                // 
            },

            allarea(){
                Area.allAreas().then((result) => {
                    this.areas = result.data   
                    this.tableKey++               
                })
            },
            
            openAreas(){
                this.showArea = true
            },

            openLocation(){                
                Report.getMemberLocation(this.location).then((result) => {
                    this.coordinates = result.data
                })
            },
            allLocations(){
                Report.allMembersCoordinate().then((result) => {
                    this.coordinates = result.data
                })                
            },
            object_created(){
                this.showtable = true            
                this.opencreateform = false
                this.api_refresh()
            },

            object_updated(){
                this.showtable = true
                this.opencreateform = false
                this.alladmin()
            },

            filter_table(){
                if(this.filter == 1){
                    // this.alladmin()
                }else if(this.filter == 2){
                    // this.activeAdmin()
                }else{
                    // this.inactiveAdmin()
                }
            },
           
            create(){ 
                this.opencreateform = !this.opencreateform
                this.showtable = false
                this.singleObject = null
                this.updateMode = false             
            },                      
                        
            datatable(){            
                $(function() {
                 $('#table').DataTable({                    
                    "bDestroy": true,
                        pageLength: 5,
                        lengthMenu: [[5,10,20], [5, 10, 20]],                    
                    });
                });
            },
            
            getAuth(){
                User.auth().then((result)=>{
                    this.user = result.data
                    this.allarea()
                    this.datatable()
                }).catch(()=>{
                    this.$router.push('/')                    
                })
            },            

            updateAdmin(object){
                this.updateMode = true
                this.singleObject = object
                this.showtable = false
                this.opencreateform=true
            },

        },

        watch:{
            opencreateform(){
                if(this.opencreateform == false){
                    this.showtable = true
                    this.datatable()
                }
            }
        },

        created() {
            this.getAuth()
            this.allLocations()
        },
    }
</script>

<style scoped>
li{
    list-style-type: none;
}
</style>