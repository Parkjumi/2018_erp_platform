<template>
<div style="position:relative;">
    <v-btn-toggle v-model="value">

        <v-btn flat :value="id" v-for="(item, id)  in  items" :key="id" @click.prevent="selected(id)">
            <span>&nbsp;&nbsp;{{ item }}&nbsp;&nbsp;</span>
            <!-- <v-icon>format_align_left</v-icon> -->
        </v-btn>

      

    </v-btn-toggle>
</div>
</template>




<script>
export default{
    name: 'SearchForm',

    // ========== props ========== //
    props:{
        
        'list' : {
            type: Array
        },
        'default' : {
            type: Number,
            default(){ return 0 }
        }
        
    }, // ========== props ========== //



    // ========== data ========== //
    data () {
        return {
            value: 0,

            items:[],

            tempItems: ['Left', 'Center', 'Right'] 
        }
    }, // ========== data ========== //
    
    
    
    
    // ========== created ========== //
    created(){
        if(this.list){
            this.$set(this, 'items', this.list)
        }else{
            this.$set(this, 'items', this.tempItems)
        }
    }, // ========== created ========== //
    
    
    


    // ========== updated ========== //
    updated(){
    }, // ========== updated ========== //
    
    
    
    // ========== mounted ========== //
    mounted(){
        if(this.default != 0){
            this.$set(this, 'value', this.default)
        }

        //this.$emit('input', this.value)
    }, // ========== mounted ========== //
    
    



    
    // ========== data ========== //
    methods:{

        selected(id){
            this.$emit('input', id)
        }
        
    }, // ========== data ========== //
}
</script>