<template>
<v-container>
  <page-header title="신규 발주 등록"/>
  <h3 style="margin-top: 15px;">발주 정보</h3>
  <v-layout>
    <v-flex>
      <detail-table>
        <tbody slot="contents">
          <tr>
            <th>매입처*</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs8>
                  <v-text-field v-model="customersItem.bName"/>
                </v-flex>
                <v-flex xs4 style="padding-top: 8px;">
                  <v-btn
                    @click.stop="customersModalCheck = !customersModalCheck"
                    outline>
                    매입처 선택
                  </v-btn>
                </v-flex>
              </v-layout>
            </td>
            <th>납기일자*</th>
            <td>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="납기일자를 선택하세요"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </td>
          </tr>
          <tr>
            <th>비고</th>
            <td colspan="3">
              <v-layout>
                <v-flex>
                  <v-text-field
                    textarea
                    v-model="purchase.remark"
                    rows="2">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
        </tbody>
      </detail-table>
    </v-flex>
  </v-layout>
  <h3 style="margin-top: 15px;">발주 목록</h3>
  <v-layout style="padding-top: 20px;">
    <v-flex>
      전체 {{allCount}}건
    </v-flex>
    <v-flex style="text-align: right;">
      <v-btn
        color="orange"
        @click="openAppendModal()"
        outline>
        상품 추가
      </v-btn>
    </v-flex>
  </v-layout>
  <v-layout>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="orderItems"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>
            {{props.index + 1}}
          </td>
          <td>{{props.item.itemName}}</td>
          <td>{{props.item.unit}}</td>
          <td>{{props.item.manufacturer}}</td>
          <td>
            <v-text-field v-model="qTY[props.index]"/>
          </td>
          <td>
            <v-text-field v-model="price[props.index]"/>
          </td>
          <td>{{props.item.price1}}원</td>
          <td>{{props.item.price2}}원</td>
          <td>{{props.item.price3}}원</td>
          <td>
            {{qTY[props.index] * price[props.index]}}원
          </td>
          <td>
            <v-btn outline @click="deleteOneOrderItem(props.item)">삭제</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  <v-layout style="margin-top:20px;">
    <v-flex style="text-align: center">
      <v-btn @click="$router.push('/purchase/list')">목록으로</v-btn>
      <v-btn @click="regOrder()">등록하기</v-btn>
    </v-flex>
  </v-layout>
  <!-- 매입처 선택 모달 시작 -->
  <v-dialog
    v-model="customersModalCheck"
    width="50%">
    <v-card>
      <div style="padding: 10px; background-color: #263238; color: white; height: 48px;">
        <h3>매입처 선택</h3>
      </div>
      <v-layout style="padding: 20px 30px;">
        <v-flex xs3 style="padding-top: 20px;">
          <h2>매입처 선택</h2>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex style="padding: 0px 30px;">
          <v-data-table
            :headers="customersHeaders"
            :items="customersItems"
            hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{props.item.id}}</td>
              <td>{{props.item.bName}}</td>
              <td>{{props.item.tel}}</td>
              <td>{{props.item.count}}</td>
              <td>
                <v-btn outline sm @click="selectCustomer(props.item)">선택</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
  <!-- 매입처 선택 모달 종료 -->
  <!-- 상품 추가 모달 시작 -->
  <v-dialog
    v-model="appendModalCheck"
    width="70%">
    <v-card>
      <div style="padding: 10px; background-color: #263238; color: white; height: 48px;">
        <h3>직배송 상품 선택</h3>
      </div>
      <v-container>
        <v-layout>
          <v-flex xs3 style="padding-top: 20px;">
            <h2>직배송 상품 선택</h2>
          </v-flex>
        </v-layout>
        <v-layout style="margin-top:15px;">
          <v-flex xs12 style="padding: 0px 5px;">
            <v-layout>
              <v-flex>
                *해당 매입처에서 자주 주문한 상품 순입니다.
              </v-flex>
            </v-layout>
            <v-layout style="margin-top: 10px;">
              <v-flex>
                <v-data-table
                  :headers="productHeaders"
                  :items="customerProducts"
                  hide-actions>
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.id}}</td>
                    <td>{{props.item.itemName}}</td>
                    <td>{{props.item.first}}</td>
                    <td>{{props.item.unit}}</td>
                    <td>{{props.item.manufacturer}}</td>
                    <td>{{props.item.price2}}</td>
                    <td>
                      <v-btn outline @click="selectProduct(props.index,props.item)">선택</v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-flex>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
  <!-- 상품 추가 모달 종료 -->
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
    name: 'Append',
    components: {
      DetailTable,
      ListTable,
      ButtonToggle,
      DateRange,
      SearchForm,
      PageHeader,
      SelectItems
    },
    data() {
      return {
        menu: '',
        date: '',
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '상품명', value: 'string', sortable: false },
          { text: '규격(단위)', value: 'string', sortable: false },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '수량', value: 'string', sortable: false },
          { text: '매입 단가', value: 'string', sortable: false },
          { text: '배송 단가', value: 'string', sortable: false },
          { text: '소비자 가격', value: 'string', sortable: false },
          { text: '예비 가격', value: 'string', sortable: false },
          { text: '합계금액', value: 'string', sortable: false },
          { text: '삭제', value: 'string', sortable: false }
        ],
        items: [],
        appendModalCheck: false,
        productHeaders: [
          { text:  '상품코드', value: 'string', sortable: false },
          { text: '상품명', value: 'string', sortable: false },
          { text: '카테고리', value: 'string', sortable: false },
          { text: '규격(단위)', value: 'string', sortable: false },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '매입단가', value: 'string', sortable: false },
          { text: '선택', value: 'string', sortable: false }
        ],
        customersModalCheck: false,
        customersHeaders: [
          { text: 'no', value: 'num', sortable: false },
          { text: '매입처명', value: 'string', sortable: false },
          { text: '대표자 연락처', value: 'string', sortable: false },
          { text: '상품 수', value: 'num', sortable: false },
          { text: '매입처 선택', value: 'string', sortable: false }
        ],
        customersItems: [],     //거래처 모든 데이터
        customersItem: '',      //선택된 거래처 1개의 데이터
        customerProducts: [],   //거래처가 취급하는 상품 데이터,
        selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
        count: 1,
        orderItems: [],
        allCount:0, //전체 상품 개수,
        payment:0,
        purchase:[],
        qTY:[],//수량 배열
        price:[]//매입 단가 배열
      }
    },
    methods: {
      initCustormer(){
        this.$axios.get('http://freshntech.cafe24.com/purchase')
        .then(res => {
          this.customersItems = res.data;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      selectCustomer(customers) { //매입처 선택 누를시
        this.customersItem = customers;
        this.orderItems = [];
        this.selectItems = [];
        this.customersModalCheck = false;
        this.$axios.get('http://freshntech.cafe24.com/purchase/detail/'+this.customersItem.id)
        .then(res => {
          this.customerProducts = res.data[1];
          console.log(this.customerProducts);
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      openAppendModal() {
        if(this.customersItem == ''){
          alert('매입처를 선택하십시오');
          return;
        }
        this.appendModalCheck = !this.appendModalCheck;
      },
      selectProduct(index,item){
        this.orderItems = this.selectItems
        this.selectItems.push(item);
        this.price[this.orderItems.length-1] = item.price
        this.allCount++;
      },
      closeProductAppendModal() {
        this.selectItems = [];
        this.allCount = this.selectItems.length;
        this.appendModalCheck = false;
      },
      saveOrderItem() { //상품 추가 후 저장 누를 시
        this.orderItems = this.selectItems;
        this.appendModalCheck = false;
        this.$axios.get('http://freshntech.cafe24.com/order/setinsert/'+this.customersItem.id)
        .then(res => {
          this.customerProducts = res.data;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      deleteOneOrderItem(product) {
        this.orderItems.forEach((item, index, array)=>{
          if(item == product){
            array.splice(index, 1);
            this.price.splice(index, 1)
          }
        })
        this.allCount--;
      },
      regOrder() { //등록하기 버튼 누를 시
        for(var i = 0;i < this.orderItems.length;i++){
          this.orderItems[i].qTY = this.qTY[i];
          this.orderItems[i].price = this.price[i]
          this.orderItems[i].amount = this.qTY[i] * this.price[i]
        }
        console.log(this.orderItems);
        if(!this.customersItem.bName){
          alert('매입처가 선택되지 않았습니다.');
        }else if(this.date == ''){
          alert('납기일자를 선택해주세요');
        }else if(this.orderItems.length == 0){
          alert('상품을 먼저 등록해주세요');
        }else{
          if(this.purchase.remark == undefined){
            this.purchase.remark = null;
          }
          this.$axios.post('http://freshntech.cafe24.com/purchaseitem',{
            id:this.purchase.id,
            bName:this.customersItem.bName,
            tbProvider_ID:this.customersItem.id,
            remark:this.purchase.remark,
            dDay:this.date,
            insertPurchaseItemVOList:this.orderItems
          }).then((res) => {
            alert('등록이 완료되었습니다.');
            this.$router.push('/purchase/list');
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        }
      }
    },
    created() {
      this.initCustormer();
    }
  }
</script>
<style scoped>
</style>
