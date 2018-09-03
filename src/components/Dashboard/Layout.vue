<template>
    <div>
        <router-view 
            v-on:getComponent="getComponentInfo"/>                   
    </div>
</template>

<script>
    export default {
        data(){
            return {
                title: ''
            }
        },
        methods:{
            getComponentInfo(data){
                this.title = data;
            }
        },
        mounted: function(){
            console.log(this.$route.path)
        }
    }
</script>

<style scoped>
   .header-container {
      height: 40px;
  }

  .header-container div:nth-child(1){
      float: left;
  }

  .header-container div:nth-child(2){
      float: right;
  }
</style>
