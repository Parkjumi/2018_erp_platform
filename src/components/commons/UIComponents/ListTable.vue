<template>
<div style="position:relative;">

    <table class="elevation-1 detail-table" >
        <colgroup>
        </colgroup>
        <slot name="headers">
            <tr>
                <th>#</th>
                <th>name</th>
                <th>price</th>
            </tr>
        </slot>
        <slot name="contents">
            <tr>
                <td>01</td>
                <td>Prod 01</td>
                <td>10,000</td>
            </tr>
            <tr>
                <td>01</td>
                <td>Prod 01</td>
                <td>10,000</td>
            </tr>
            <tr>
                <td>01</td>
                <td>Prod 01</td>
                <td>10,000</td>
            </tr>
        </slot>
    </table>




</div>
</template>




<script>
export default{
    name: 'TableComp',

    // ========== props ========== //
    props:{
        
        
        
    }, // ========== props ========== //



    // ========== data ========== //
    data () {
        return {
    

        }
    }, // ========== data ========== //
    
    
    
    
    // ========== created ========== //
    created(){
        
    }, // ========== created ========== //
    
    
    


    // ========== updated ========== //
    updated(){
    }, // ========== updated ========== //
    
    
    
    // ========== mounted ========== //
    mounted(){
        
    }, // ========== mounted ========== //
    
    



    
    // ========== data ========== //
    methods:{


        
    }, // ========== data ========== //
}
</script>



<style>

.detail-table{
    padding:0; 
    width:100%;
}
    .detail-table th{
        background:#f1f1f1; 
    }
    .detail-table td{
        background:#fff; 
    }
        .detail-table th,
        .detail-table td{
            padding:10px 20px;
        }

</style>
