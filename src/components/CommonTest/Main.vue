<template>

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

  <div v-else style="padding:15px;">
    <!-- <h1>공통 컴포넌트 테스트 </h1>
    <hr> -->
    <page-header title="FRESHMAN" />
    <br>
    <h2>판매 진행 현황</h2>
    <v-container fluid grid-list-md>
      <h2>한달</h2>
      <v-data-iterator
        :items="items"
        content-tag="v-layout"
        hide-actions
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs2
        >
          <v-card>
            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>주문 {{ props.item.countMonth }} 건</v-list-tile-content>
                <v-list-tile-content>{{ props.item.paymentMonth }}원</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
      <br>
      <h2>당일</h2>
      <v-data-iterator
        :items="orderData"
        content-tag="v-layout"
        hide-actions
      >
        <v-flex
          slot="item"
          slot-scope="props"
          xs2
        >
          <v-card>
            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>주문 {{ props.item.countToday }} 건</v-list-tile-content>
                <v-list-tile-content>{{ props.item.paymentToday }}원</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-data-iterator>
    </v-container>
    <br>
    <h2>공지사항</h2>
    <v-container fluid grid-list-md>
      <h2 style="margin:0;width:40%;display:inline-block;margin-right:20px">거래처 공지사항</h2>
      <h2 style="margin:0;width:40%;display:inline-block">배송팀 공지사항</h2>
      <v-flex xs12>
        <div style="width:40%;display:inline-block;margin-right:20px;float:left">
          <v-data-table
            :headers="headers"
            :items="customerNotice"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td @click="$router.push('/notice/customer/detail/'+props.item.id)">{{ props.item.customerTitle }}</td>
            <td @click="$router.push('/notice/customer/detail/'+props.item.id)" class="text-xs-right">{{ props.item.customerUpdateDate }}</td>
          </template>
          </v-data-table>
        </div>
        <div style="width:40%;display:inline-block">
          <v-data-table
            :headers="headers"
            :items="deliveryNotice"
            hide-actions
            class="elevation-1"
          >
          <template slot="items" slot-scope="props">
            <td @click="$router.push('/notice/delivery/detail/'+props.item.id)">{{ props.item.delivereTitle }}</td>
            <td @click="$router.push('/notice/delivery/detail/'+props.item.id)" class="text-xs-right">{{ props.item.deliverUpdateDate }}</td>
          </template>
          </v-data-table>
        </div>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import {
  SearchForm,
  SelectItems,
} from '../commons/Form'

import {
  PageHeader,
  TableComp,
  DetailTable,
  Modal,
} from '../commons/UIComponents'

  export default {
    name: 'Main',

    components: {
      PageHeader,
      SelectItems,
      TableComp,
      DetailTable,
    },

    data(){
      return {
        headers: [
          {
            text: '제목',
            align: 'left',
            sortable: false,
            value: 'title'
          },
          {
            text: '날짜',
            align: 'right',
            sortable: false,
            value: 'date'
          },
        ],
        customerNotice:[], // 거래처 공지사항
        deliveryNotice:[], // 배송팀 공지사항
        orderData: [], // 당일 현황
        items: [], // 한달 현황
      }
    },
    created() {
      this.initCustormer();
    },
    methods: {
      initCustormer(){
        this.$axios.get('http://freshntech.cafe24.com/main')
        .then(res => {
          this.customerNotice = res.data[0]
          this.deliveryNotice = res.data[1]
          this.items = res.data[2]
          this.orderData = res.data[3]

          for(var i = 0;i < res.data[2].length;i++){
            switch (this.items[i].orderStateMonth) {
              case "결제대기":
                this.items[i].name = "결제대기"
                break;
              case "진행중":
                this.items[i].name = "진행중"
                break;
              case "출고거절":
                this.items[i].name = "출고거절"
                break;
              case "출고완료":
                this.items[i].name = "출고완료"
                break;
              case "출고전":
                this.items[i].name = "출고전"
                break;
            }
          }
          for(var i = 0;i < res.data[3].length;i++){
            switch (this.orderData[i].orderStateToday) {
              case "결제대기":
                this.orderData[i].name = "결제대기"
                break;
              case "진행중":
                this.orderData[i].name = "진행중"
                break;
              case "출고거절":
                this.orderData[i].name = "출고거절"
                break;
              case "출고완료":
                this.orderData[i].name = "출고완료"
                break;
              case "출고전":
                this.orderData[i].name = "출고전"
                break;
            }
          }
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      }
    }
  }

</script>
<style scoped>

</style>
