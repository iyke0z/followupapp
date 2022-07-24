<template>
    <div class="view-container" :key="compKey">
        <table id="myTable">
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
                                <button id="edit" @click="history(member.id)">
                                    <i class="fa fa-history" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table><br />
                    <div v-if="showModal">
                        <h1>hesoyam</h1>                        
                    </div>

    </div>
</template>
<script>
import Report from '@/components/Api/Report.js'
import Swal from 'sweetalert2'
export default {
    props:{
        allmembers:null
    },
    data() {
        return {
            showModal:false,
            compKey:0,
            months:[
                {id:1, month:'January'},
                {id:2, month:'February'},
                {id:3, month:'March'},
                {id:4, month:'April'},
                {id:5, month:'May'},
                {id:6, month:'June'},
                {id:7, month:'July'},
                {id:8, month:'August'},
                {id:9, month:'September'},
                {id:10, month:'October'},
                {id:11, month:'November'},
                {id:12, month:'December'},

            ]
        }
    },
     methods: {
        padId(id){
            return String(id).padStart(3,'0')
        },
        history(member){
            this.compKey++
            this.showModal = !this.showModal
            Report.memberrecord({id:member}).then((result) => {
                console.log(result.data.data)
                var swal_html = result.data.data[0];                               
            }).catch((err) => {
                
            });
         
          
        },
        datatable(){            
            $(function() {
                 $('#myTable').DataTable({
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]],
                    ordering:false
                });
            });
        }
             
    },
    created() {
        this.datatable()
    },
    
}
</script>

