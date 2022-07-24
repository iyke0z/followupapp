<template>
    <div class="view-container">    
    <div class="tableDiv">
        <table id="myTable" class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Count</th>                                        
                </tr>
            </thead>
            <tbody>
               <tr> 
                    <td>{{ report.name }}</td>
                    <td>{{ report.count }}</td>
               </tr>
               
            </tbody>
        </table>        
    </div>
    </div>
</template>
<script>

export default {
    props:{
        title:null,
        report:null
    },
    
     methods: {
        padId(id){
            return String(id).padStart(3,'0')
        },

        datatable(){            
            $(function() {
                 $('#myTable').DataTable({
                    "bDestroy": true,
                    pageLength: 5,
                    lengthMenu: [[5,10,20], [5, 10, 20]]
                });
            });
        }
             
    },
    created() {
        this.datatable()
    },
    
}
</script>

