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
                <th>기간 구분</th>
                <td>
                  <v-radio-group
                    v-model="periodDivision">
                    <v-layout>
                      <v-flex
                        xs3
                        v-for="item in ['주문 일시', '배송 요청일']"
                        :key="item">

                        <!-- 기간 구분 폼 -->
                        <v-radio
                          :label="item"
                          :value="item">
                        </v-radio>

                      </v-flex>
                    </v-layout>                  
                  </v-radio-group>
                </td>
                <td rowspan="3" style="width: 10%;">
                  <v-btn small>검색</v-btn>
                </td>
              </tr>

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
                        propsDateStart="2016-08-01"/>
                    </v-flex>               
                  </v-layout>                
                </td>
              </tr>
              <tr>
                <th>키워드 검색</th>
                <td>
                  <v-layout style="padding-top:20px;">
                    <v-flex xs2>
                      <select-items
                        :items="['거래처명', '주문번호']">

                      </select-items>
                    </v-flex>
                    <v-flex xs10 style="padding: 0px 20px;">
                      <search-form label="검색어를 입력해 주세요">

                      </search-form>
                    </v-flex>
                  </v-layout>
                </td>
              </tr>
              <tr>
                <th>즉시검색</th>
                <td colspan="2">
                  <v-layout>
                    <v-flex xs2 class="select-flex-container" >
                      <v-select
                        :items="['직배송','택배배송']"
                        label="배송유형" />
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['주문완료','주문변경','주문취소','반품접수','반품완료']"
                        label="주문상태"/>
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['출고지시전','출고전','출고완료','출고거절']"
                        label="출고상태"/>
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['수령전','수령완료']"
                        label="수령상태"/>
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['박주미','배성원','김성훈']"
                        label="배송담당자"/>
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['박주미','배성원','김성훈','영업테스트']"
                        label="영업담당자"/>
                    </v-flex>
                    <v-flex xs2 class="select-flex-container">
                      <v-select
                        :items="['테스트','테스트2','테스트3']"
                        label="브랜드"/>
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
          <span>전체 0건</span>
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
            hide-actions
            select-all>
            
            <template slot="items" slot-scope="props">
               <td>
                  <v-checkbox
                    v-model="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
              <td>{{props.index + 1}}</td>
              <td>{{props.item.orderDate}}</td>
              <td>{{props.item.deliveryRequest}}</td>
              <td>{{props.item.orderNumber}}</td>
              <td>{{props.item.account}}</td>
              <td>{{props.item.shippingType}}</td>
              <td>{{props.item.allOrder}}</td>
              <td>{{props.item.payment}}</td>
              <td>{{props.item.orderAmount}}</td>
              <td>{{props.item.orderStatus}}</td>
              <td>{{props.item.outboundShipping}}</td>
              <td>{{props.item.receiptStatus}}</td>
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
        periodDivision: '주문 일시',
        period: ['전체','전일','당일','한달'],
        selectPeriod: '',
        page: 1,
        loading: true,
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '주문일시', value: 'date' },
          { text: '배송요청일', value: 'date' },
          { text: '주문번호', value: 'num', sortable: false },
          { text: '거래처', value: 'string' },
          { text: '배송유형', value: 'string', sortable: false },
          { text: '총 주문수량', value: 'num', sortable: false },
          { text: '결제수단', value: 'string', sortable: false },
          { text: '주문금액', value: 'string' },
          { text: '주문상태', value: 'string', sortable: false },
          { text: '출고상태', value: 'string', sortable: false },
          { text: '물품수령상태', value: 'string', sortable: false },
        ],

        orderData: []
      }
    },
    methods: {
      initOrderData() {
        this.orderData = this.$models.orders;
        console.log(this.orderData);
      },

      clickPeriod(period) {
        alert(period)
      },

      moveOrderAppend() {
        this.$router.push('/order/append');
      }
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
