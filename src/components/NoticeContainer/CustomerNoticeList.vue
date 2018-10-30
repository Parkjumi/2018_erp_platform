<template>
<v-container style=" ">

  <!-- ========== 헤더 ========== -->
  <page-header
    title="거래처 공지사항"/>

  <!-- ========== 로딩 ========== -->
  <v-layout row v-if="loading">
      <v-flex xs12 md12  style="text-align:center;">
          <br>
          <v-progress-circular
              :value="80"
              :width="2"
              :size="50"
              color="deep-orange lighten-2"
              indeterminate
              style="width:200px !important;"
          ></v-progress-circular>
              <br>
              <br>
              <br>
      </v-flex>
  </v-layout>
  <!-- ========== 로딩 ========== -->

  <!-- ========== 컨텐츠 ========== -->
  <div v-else>
      <v-layout row wrap class="middle-container">
        <v-flex style="text-align:left">
          <span>전체 {{total}}건</span>
        </v-flex>
        <v-flex xs4>
          <v-flex style="text-align:right">
            <v-btn outline color="indigo" @click="moveAppend()"><v-icon small>far fa-file-alt</v-icon>&nbsp;공지사항 등록</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout class="bottom-container">
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="noticeData"
            hide-actions>
            <template slot="items" slot-scope="props">
              <tr>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.index + 1}}</td>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.item.id}}</td>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.item.title}}</td>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.item.regDate}}</td>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.item.startDate}}</td>
                 <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{props.item.ednDate}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="text-xs-center">
          <v-pagination v-model="page" :length="1"/>
        </v-flex>
      </v-layout>
  </div>
</v-container>
</template>
<script>
  import {
    SearchForm,
    ButtonToggle,
    DateRange,
    SelectItems
  } from '@/components/commons/Form'

  import {
    PageHeader,
    DetailTable,
    ListTable
  } from '@/components/commons/UIComponents'

  export default {
    /* 주문목록 페이지 */
    name: 'List',
    components: {
      DetailTable,
      ListTable,
      ButtonToggle,
      DateRange,
      SearchForm,
      PageHeader,
      SelectItems
    },
    data(){
      return {
        page: 1,
        loading: true,
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '공지번호', value: 'num', sortable: false },
          { text: '제목', value: 'string', sortable: false },
          { text: '등록일', value: 'string', sortable: false },
          { text: '시작일', value: 'string', sortable: false },
          { text: '종료일', value: 'string', sortable: false },
        ],
        total:'',
      }
    },
    methods: {
      initPurchaseData() {
        this.$axios.get('http://freshntech.cafe24.com/cuboarders')
        .then(res => {
          this.noticeData = res.data;
          this.total = res.data.length;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },

      moveAppend() {
        this.$router.push('/notice/customer/append');
      }
    },
    created() {
      setTimeout(()=>{
          this.$set(this, 'loading', false);
      }, 780)
      this.initPurchaseData();
    }
  }
</script>
<style scoped>
  .period-row-container{
    float: left;
  }

  hr{
    border-style: dotted;
    border-color: gainsboro;
  }

  .select-flex-container{
    padding: 0px 10px;
  }

  .middle-container{
    margin-top: 30px;
  }

  .bottom-container{
    margin-top: 20px;
  }

</style>
