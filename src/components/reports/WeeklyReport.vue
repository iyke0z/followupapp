<template>
    <div class="view-container">
        <table id="myTable" class="table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Total Sales</th>                    
                    <th>Total Cost</th>
                    <th>Total Expenditure</th>                    
                    <th>Total Purchase</th>
                    <th>Profit</th>
                </tr>
            </thead>
            <tbody>
               <tr>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
                <td>...</td>
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
     methods: {
        padId(id){
            return String(id).padStart(3,'0')
        },

        datatable(){            
            $(function() {
                 $('#myTable').DataTable({
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

