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
    <page-header title="메인 페이지" />
    <br>
    <h2>판매 진행 현황</h2>
    <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      content-tag="v-layout"
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg3
      >
        <v-card>
          <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>출고전:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>출고 완료:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>출고 거절:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>

  
<!--
    <h2>주문 현황</h2>
    <br>
    <v-flex xs7>
      <v-data-table
        :headers="orderHeader"
        :items="desserts"
        hide-actions
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.fat }}</td>
      </template>
      </v-data-table>
    </v-flex> -->

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
        desserts: [
          {
            name: 0,
          }
        ],
        orderHeader:[
          { text: '당일', value: 'num', sortable: false},
          { text: '당일', value: 'num', sortable: false},
        ],

        items: [
          {
            value: false,
            name: '판매 진행 현황',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%',
            iron: '1%'
          },
          {
            value: false,
            name: '주문 현황',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%',
            iron: '1%'
          },

        ]
      }
    }
  }

</script>
<style scoped>

</style>
