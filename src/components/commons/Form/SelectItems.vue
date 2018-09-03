<template>
<div class="select-items" style="position:relative !important;">
    <v-select
        style="padding:1px !important; "
        :items="items"
        :label="label"
        solo
        v-model="selected"
    ></v-select>
</div>
</template>




<script>
export default{
    name: 'SearchForm',

    // ========== props ========== //
    props:{
        'label' : {
            type: String,
            default(){ return '선택' }
        },
        'items' : {
            type: Array,
        },

    }, // ========== props ========== //



    // ========== data ========== //
    data(){
        return {

            selected: null,

        }
    }, // ========== data ========== //
    
    
    
    
    // ========== created ========== //
    created(){
    }, // ========== created ========== //
    
    
    


    // ========== updated ========== //
    updated(){
    }, // ========== updated ========== //
    
    

    watch: {
        selected(v){
            this.$emit('input', v)
        }
    },



    
    // ========== data ========== //
    methods:{
        
    }, // ========== data ========== //
}
</script>

<style>
.select-items .v-input__control{
    min-height:36px !important;
}
.select-items .v-input__slot{
    width: 100%;
}
</style>
