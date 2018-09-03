<template>
    <component :is="component">
        <slot />
    </component>
</template>

<script>
    import VuebaseLayout from './layouts/VuebaseLayout'

    export default {
        name: 'App',

        components: {
            VuebaseLayout
        },

        computed: {
            component () {
                return VuebaseLayout
            }
        }
    }
</script>


<style>
.cardbox{
    border:1px solid #e8e8e8; 
    padding:15px; 
    background:#fff; 
    border-radius:3px 3px; 
    box-shadow:1px 1px 1px 1px rgba(0,0,0,.08);
}
    .cardbox-header{
        margin-bottom:0;
        border-radius: 5px 5px 0 0;
    }
    .cardbox-body{
        margin-top:0;
        border-top:none;
        border-radius: 0 0 5px 5px;
    }

.left-align{ text-align: left !important; }
.right-align{ text-align: right !important; }
.center-align{ text-align: center !important; }

.td-margin td, 
.td-margin th{
    padding:10px 13px;
    height:80px;
}
    .td-margin th {
        background: #f1f1f1;
    }
</style>
