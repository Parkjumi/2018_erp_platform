<template>
<v-container style=" ">

  <!-- ========== 헤더 ========== -->
  <page-header
    title="매입처 관리"/>

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
                <th>키워드 검색</th>
                <td>
                  <v-layout style="padding-top:20px;">
                    <v-flex xs2>
                      <select-items
                        :items="['매입처명', '매입처코드']"
                        v-model="select">
                      </select-items>
                    </v-flex>
                    <v-flex xs7 style="padding: 0px 20px;">
                      <v-text-field v-model="searchWord" label="검색어를 입력해 주세요"></v-text-field>
                    </v-flex>
                    <v-btn>검색</v-btn>
                  </v-layout>
                </td>
              </tr>
            </tbody>
          </detail-table>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="middle-container">
        <v-flex xs12>
          <v-flex style="text-align:right">
            <v-btn outline color="indigo" @click="moveOrderAppend()"><v-icon small>far fa-file-alt</v-icon>&nbsp;신규 매입처 등록</v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex style="text-align:left">
          <span>전체 {{total}}건</span>
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
                 <td @click="$router.push('buyer/detail/'+props.item.id)">{{props.item.id}}</td>
                 <td>{{props.item.bName}}</td>
                 <td >{{props.item.count}}개</td>
                 <td><v-btn>삭제</v-btn></td>
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
        page: 1,
        loading: true,
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '매입처코드', value: 'string', sortable: false },
          { text: '매입처명', value: 'num', sortable: false },
          { text: '상품수', value: 'string', sortable: false },
          { text: '삭제', value: 'string', sortable: false },
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
        this.$axios.get('http://freshntech.cafe24.com/purchase')
        .then(res => {
          this.purchaseData = res.data;
          this.total = res.data.length;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
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
        this.$router.push('/purchase/appendBuyer');
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
