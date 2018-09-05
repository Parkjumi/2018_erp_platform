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
    <v-date-picker v-model="dateStart"  no-title @input="menu2 = false"></v-date-picker>
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
var d = new Date();
export default{
    name: 'DateRange',

    // ========== props ========== //
    props:{
        selectPeriod: Number,
    },



    // ========== data ========== //
    data () {
        return {
            dateStart: "2018-01-01",
            dateEnd: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
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
        console.log(this.list);
    },

    // ========== computed ========== //
    computed: {
        computedStartDateFormatted () {
          console.log("등장아아아아앙");
            var val = this.formatDate(this.dateStart)
            this.$emit('input', {
                startDate: val,
                endDate : this.dateEnd
            })
            return val
        },
        computedEndDateFormatted () {
            var val = this.formatDate(this.dateEnd)
            this.$emit('input', {
                startDate: this.dateStart,
                endDate : val
            })
            return val
        },
    },


    // ========== watch ========== //
    watch: {
        selectPeriod () {
          switch (this.selectPeriod) {
            case 0:
              console.log("전체");
              this.dateStart= "2018-01-01";
              this.dateEnd= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              break;
            case 1:
              console.log("전일");
              this.dateEnd= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate()-1);
              this.dateStart= this.dateEnd;
              break;
            case 2:
              console.log("당일");
              this.dateStart= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              this.dateEnd= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              break;
            case 3:
              console.log("한달");
              this.dateStart= d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
              this.dateEnd= d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              break;
          }
        }
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
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

            // return `${year}년 ${month}월 ${day}일`
        },

        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        }

    }, // ========== data ========== //
}
</script>
