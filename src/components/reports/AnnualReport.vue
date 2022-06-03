<template>
    <div class="view-container">
        <table id="myTable" class="table">
            <thead>
                <tr>
                    <th>Month</th>
                    <th>Total Sales</th>                    
                    <th>Total Cost</th>
                    <th>Total Expenditure</th>                    
                    <th>Total Purchase</th>
                    <th>Profit</th>

                </tr>
            </thead>
            <tbody>
               <tr v-for="month in months" :key="month.id">
                    <td>{{month.month}}</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>                    
               </tr>
                <tr>
                    <td></td>
                    <td><b>&#8358;...</b></td>
                    <td><b>&#8358;...</b></td>
                    <td><b>&#8358;...</b></td>
                    <td><b>&#8358;...</b></td>
                    <td><b>&#8358;...</b></td>
               </tr>
              
            </tbody>
        </table>
    </div>
</template>
<script>

export default {
    props:{
        allExpenditures:null
    },
    data() {
        return {
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

        datatable(){            
            $(function() {
                 $('#myTable').DataTable({
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

