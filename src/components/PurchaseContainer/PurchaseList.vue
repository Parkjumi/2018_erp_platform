<template>
<v-container style=" ">

  <!-- ========== 헤더 ========== -->
  <page-header
    title="발주 관리"/>

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
      <v-layout row wrap>
        <v-flex>
          <detail-table>
            <tbody slot="contents">
              <tr>
                <th>기간</th>
                <td>
                  <v-layout>
                    <v-flex xs4 style="padding-top:14px;">
                      <button-toggle
                        :list="period"
                        v-model="selectPeriod"
                        v-on:input="clickPeriod">
                      </button-toggle>
                    </v-flex>
                    <v-flex xs8>
                      <date-range
                        :selectPeriod="selectPeriod"
                        v-model="selectDate"
                        />
                    </v-flex>
                  </v-layout>
                </td>
                <td rowspan="3" style="width: 10%;">
                  <v-btn small @click="searchOrder()">검색</v-btn>
                </td>
              </tr>
              <tr>
                <th rowspan="2">검색</th>
                <td>
                  <v-layout style="padding-top:20px;">
                    <v-flex xs2>
                      <select-items
                        :items="['거래처명', '주문번호']"
                        v-model="select">
                      </select-items>
                    </v-flex>
                    <v-flex xs10 style="padding: 0px 20px;">
                      <v-text-field v-model="searchWord" label="검색어를 입력해 주세요">

                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </td>
              </tr>
              <tr>
                <td>
                  <v-layout>
                    <v-flex xs4 class="select-flex-container">
                      <v-select
                        :items="['주문완료','주문변경','주문취소','반품접수','반품완료']"
                        v-model="orderState"
                        label="주문상태"/>
                    </v-flex>
                    <v-flex xs4 class="select-flex-container">
                      <v-select
                        :items="deliveryManagerList"
                        v-model="deliveryManager"
                        label="배송담당자"/>
                    </v-flex>
                    <v-flex xs4 class="select-flex-container">
                      <v-select
                        :items="salesManList"
                        v-model="salesMan"
                        label="영업담당자"/>
                    </v-flex>
                  </v-layout>
                </td>
              </tr>
            </tbody>
          </detail-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="middle-container">
        <v-flex xs6>
          <v-layout>
            <v-flex xs4 style="text-align:left">
              <v-btn outline color="black"><v-icon small light>fas fa-print</v-icon>&nbsp;발주서 출력</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-flex style="text-align:right">
            <v-btn outline color="indigo" @click="moveOrderAppend()"><v-icon small>far fa-file-alt</v-icon>&nbsp;신규 발주 등록</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    <br>
    <hr/>
    <br>
      <v-layout>
        <v-flex style="text-align:left">
          <span>전체 {{total}}건</span>
        </v-flex>
        <v-flex style="text-align:right">
          <span>* 전일~당일까지의 발주내역이 기본으로 노출됩니다.</span>
        </v-flex>
      </v-layout>
      <v-layout class="bottom-container">
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="purchaseData"
            hide-actions
            select-all>
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                   <v-checkbox
                     v-model="props.selected"
                     primary
                     hide-details
                   ></v-checkbox>
                 </td>
                 <td>{{props.index + 1}}</td>
                 <td @click="$router.push('list/detail/'+props.item.id)">{{props.item.id}}</td>
                 <td>{{props.item.bName}}</td>
                 <td >{{props.item.cBName}}</td>
                 <td>{{props.item.dBName}}</td>
                 <td>{{props.item.cManager}}</td>
                 <td>{{props.item.amount}}</td>
                 <td>{{props.item.payMethod}}</td>
                 <td>{{props.item.payMent}}</td>
                 <td>{{props.item.orderState}}</td>
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
  let d = new Date();
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
        periodDivision: '주문 일시',
        period: ['전체','전일','당일','한달'],
        periodDate: [''],
        selectPeriod: 0,
        selectDate:{},
        page: 1,
        loading: true,
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '발주번호', value: 'date', sortable: true },
          { text: '매입처', value: 'string', sortable: false },
          { text: '발주일시', value: 'string', sortable: false },
          { text: '총 발주 수량', value: 'string', sortable: false },
          { text: '발주금액', value: 'string', sortable: false },
          { text: '발주유형', value: 'num', sortable: false },
          { text: '발주상태', value: 'string', sortable: false },
          { text: '매입처출고상태', value: 'string', sortable: false },
          { text: '입고상태', value: 'string', sortable: false }
        ],
        purchaseData: [],
        deliveryData: [],
        customerData: [],
        deliveryManagerList: [],
        salesManList:[],
        select:'',
        searchWord:'',
        orderState:'',
        deliveryManager:'',
        salesMan:'',
        total:'',
      }
    },
    methods: {
      initPurchaseData() {
        this.$axios.get('http://freshntech.cafe24.com/purchaseitem')
        .then(res => {
          this.purchaseData = res.data[0];
          this.total = res.data[0].length;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },

      clickPeriod(period) {
        this.selectPeriod = period;
      },

      searchOrder(){
        if(this.select == "거래처명"){
          this.$axios.post('http://freshntech.cafe24.com/order/search',{
            cBName:this.searchWord,
            orderState:this.orderState,
            dManager:this.deliveryManager,
            sName:this.salesMan,
            startDay:this.selectDate.startDate,
            endDay:this.selectDate.endDate
          }).then(res => {
            this.purchaseData = res.data;
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        }else if(this.select == "주문번호"){
          this.$axios.post('http://freshntech.cafe24.com/order/search',{
            id:this.searchWord,
            orderState:this.orderState,
            dManager:this.deliveryManager,
            sName:this.salesMan,
            startDay:this.selectDate.startDate,
            endDay:this.selectDate.endData
          }).then(res => {
            this.purchaseData = res.data;
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        }else{
          this.$axios.post('http://freshntech.cafe24.com/order/search',{
            startDay:this.selectDate.startDate,
            endDay:this.selectDate.endDate,
            orderState:this.orderState,
            sName:this.salesMan,
            cName:this.deliveryManager
          }).then(res => {
            this.purchaseData = res.data;
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        }
      },

      moveOrderAppend() {
        this.$router.push('/purchase/append');
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
    margin-top: 10px;
  }

  .bottom-container{
    margin-top: 20px;
  }

</style>
