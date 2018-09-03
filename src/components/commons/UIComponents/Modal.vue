<template>
    <v-dialog v-model="open" persistent :max-width="width">
<v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text >
        <slot name="contents">
            <p>진행 하시겠습니까?</p>
        </slot>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <slot name="buttons">
                <v-btn color="green darken-1" flat @click.native="$emit('close', false), dialog=false">닫기</v-btn>
                <v-btn color="green darken-1" flat @click.native="$emit('confirm', true), dialog=false">확인</v-btn>
            </slot>
        </v-card-actions>
</v-card>
</v-dialog>

</template>



<script>
export default {
    name : 'Modal',


    props: {
        
        'open' : {
            type: Boolean,
            default(){ return false }
        },

        'title': {
            type: String, 
            default(){ return '알림' }
        },

        'width' : {
            type: String,
            default(){ return '50%' }
        }

    },

    data(){
        return {

            dialog: true,

        }
    }
}
</script>