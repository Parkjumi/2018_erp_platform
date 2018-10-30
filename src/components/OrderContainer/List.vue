<template>
<v-container style=" ">

  <!-- ========== 헤더 ========== -->
  <page-header
    title="주문 목록"/>

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
                        :items="['결제대기','주문완료','주문취소','주문거절','주문확인','배송준비','배송중','배송완료','배송오류']"
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
              <v-btn outline color="black"><v-icon small light>fas fa-print</v-icon>&nbsp;거래명세표 출력</v-btn>
            </v-flex>
            <v-flex style="text-align:left">
              <v-btn outline color="black"><v-icon small light>fas fa-print</v-icon>&nbsp;거래명세표 출력</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-flex style="text-align:right">
            <v-btn outline color="indigo" @click="moveOrderAppend()"><v-icon small>far fa-file-alt</v-icon>&nbsp;신규주문 등록</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    <hr/>
      <v-layout>
        <v-flex style="text-align:left">
          <span>전체 {{total}}건</span>
          <v-btn>출고지시 완료</v-btn>
          <v-btn>출고 완료</v-btn>
        </v-flex>
        <v-flex style="text-align:right">
          <span>* 전일~당일까지의 주문내역이 기본으로 노출됩니다.</span>
          <v-btn><v-icon>fas fa-file-download</v-icon>&nbsp;택배원장</v-btn>
          <v-btn><v-icon>fas fa-file-download</v-icon>&nbsp;주문내역</v-btn>
        </v-flex>
      </v-layout>
      <v-layout class="bottom-container">
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="orderData"
            hide-actions>
            <template slot="items" slot-scope="props">
              <tr @click="$router.push('list/detail/'+props.item.id)">
                 <td>{{props.index + 1}}</td>
                 <td>{{props.item.orderDate}}</td>
                 <td>{{props.item.id}}</td>
                 <td>{{props.item.cBName}}</td>
                 <td>{{props.item.dManager}}</td>
                 <td>{{props.item.sName}}</td>
                 <td>{{props.item.amount}}개</td>
                 <td>{{props.item.payMethod}}</td>
                 <td>{{numberWithCommas(props.item.payMent)}}원</td>
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
  let ip = "35.200.2.168";
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
          { text: '주문일시', value: 'date' },
          { text: '주문번호', value: 'num', sortable: false },
          { text: '거래처', value: 'string', sortable: false },
          { text: '배송팀', value: 'string', sortable: false },
          { text: '영업팀', value: 'string', sortable: false },
          { text: '총 주문수량', value: 'num', sortable: false },
          { text: '결제수단', value: 'string', sortable: false },
          { text: '주문금액', value: 'string', sortable: false },
          { text: '주문상태', value: 'string', sortable: false }
        ],
        orderData: [],
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
      initOrderData() {
        this.$axios.get('http://freshntech.cafe24.com/order')
        .then(res => {
          this.orderData = res.data[2];
          this.customerData = res.data[0];
          for(var i = 0;i < this.customerData.length;i++){
            this.salesManList.push(this.customerData[i].sManager);
            this.deliveryManagerList.push(this.customerData[i].sManager);
          }
          this.total = res.data[2].length;
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
            this.orderData = res.data;
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
            this.orderData = res.data;
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
            this.orderData = res.data;
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        }
      },

      moveOrderAppend() {
        this.$router.push('/order/append');
      },
      numberWithCommas(x) { //원화
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    created() {
      setTimeout(()=>{
          this.$set(this, 'loading', false);
      }, 780)
      this.initOrderData();
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
