<template>
<div style="position:relative;">

    <table class="elevation-1 detail-table" >
        <colgroup>
            <col width="15%">
        </colgroup>
        <slot name="contents">
            <tr>
                <th>업체명</th>
                <td>(주)컴컴</td>
            </tr>
            <tr>
                <th>담당자</th>
                <td>David</td>
            </tr>
            <tr>
                <th>거래 건 수</th>
                <td>총 25건</td>
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
