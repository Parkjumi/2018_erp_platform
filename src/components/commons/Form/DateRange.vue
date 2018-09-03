<template>
<div style="position:relative;">

    

        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          style="float:left;"
        >
          <v-text-field
            slot="activator"
            v-model="computedStartDateFormatted"
            label="시작날짜"
            persistent-hint
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dateStart" :dateStart="propsDateStart" no-title @input="menu2 = false"></v-date-picker>
        </v-menu>
    



    
        <v-menu
          :close-on-content-click="false"
          v-model="menu1"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          style="float:left;"
        >
          <v-text-field
            slot="activator"
            v-model="computedEndDateFormatted"
            label="종료날짜"
            persistent-hint
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="dateEnd" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
    

</div>
</template>




<script>
export default{
    name: 'DateRange',

    // ========== props ========== //
    props:{
        propsDateStart: String,
        propsDateEnd: String
    },



    // ========== data ========== //
    data () {
        return {
            dateStart: null,
            dateEnd: null,
            dateFormatted: null,
            menu1: false,
            menu2: false
        }
    }, 
    
    
    
    
    // ========== created ========== //
    created(){
        if(this.list){
            this.$set(this, 'items', this.list)
        }else{
            this.$set(this, 'items', this.tempItems)
        }
    }, 
    
 
    

    // ========== computed ========== //
    computed: {
        computedStartDateFormatted () {
            var val = this.formatDate(this.dateStart)
            this.$emit('input', {
                start: val,
                end : this.dateEnd
            })
            return val
        },
        computedEndDateFormatted () {
            var val = this.formatDate(this.dateEnd)
            this.$emit('input', {
                start: this.dateStart,
                end : val
            })
            return val
        },
    },


    // ========== watch ========== //
    watch: {

        // dateStart(val){
        //     this.$emit('input', {
        //         start: val,
        //         end : this.dateEnd
        //     })
        // },

        // dateEnd(val){
        //     this.$emit('input', {
        //         start: this.dateStart,
        //         end : val
        //     })
        // }

    },



    
    // ========== data ========== //
    methods:{

        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${year}년 ${month}월 ${day}일`
        },

        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }
        
    }, // ========== data ========== //
}
</script>