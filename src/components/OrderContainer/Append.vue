<template>
<v-container>
  <page-header title="신규 주문 등록"/>
  <h3 style="margin-top: 15px;">주문 정보</h3>
  <v-layout>
    <v-flex>
      <detail-table>
        <tbody slot="contents">
          <tr>
            <th>거래처 선택 *</th>
            <td colspan="3">
              <v-layout>
                <v-flex xs5>
                  <v-text-field v-model="customersItem.bName"/>
                </v-flex>
                <v-flex xs4 style="padding-top: 8px;">
                  <v-btn
                    @click.stop="customersModalCheck = !customersModalCheck"
                    outline>
                    거래처 선택
                  </v-btn>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>결제 방법</th>
            <td style="width: 30%;">
              <v-layout>
                <v-flex>
                  <v-select
                    :items="['신용카드','현금결제']"
                    item-text="paymentName"
                    label="결제 방법"
                    v-model="payMethod"
                  ></v-select>
                </v-flex>
              </v-layout>
              </td>
            <th>배송요청일</th>
            <td style="width: 40%;">
              <v-layout>
                <v-flex>
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
                    min-width="120px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="날짜를 선택해주세요"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">취소</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(date)">적용</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>요청사항</th>
            <td colspan="3">
              <v-layout>
                <v-flex>
                  <v-textarea
                    name="input-7-1"
                    v-model="requests"
                    rows="2">
                  </v-textarea>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>메모</th>
            <td colspan="3">
              <v-layout>
                <v-flex>
                  <v-textarea
                    name="input-7-1"
                    v-model="memo"
                    rows="2">
                  </v-textarea>
                </v-flex>
              </v-layout>
            </td>
          </tr>
        </tbody>
      </detail-table>
    </v-flex>
  </v-layout>
  <h3 style="margin-top: 15px;">상품 목록</h3>
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
          <td>{{props.item.qTY}}</td>
          <td>{{numberWithCommas(props.item.price1)}}</td>
          <td>{{numberWithCommas(props.item.price2)}}</td>
          <td>{{numberWithCommas(props.item.price3)}}</td>
          <td>{{numberWithCommas(props.item.price1 * props.item.qTY)}}</td>
          <td>
            <v-btn outline @click="deleteOneOrderItem(props.item)">삭제</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  <v-layout style="margin-top:20px;">
    <v-flex style="text-align: center">
      <v-btn @click="$router.push('/order/list')">목록으로</v-btn>
      <v-btn @click="regOrder()">등록하기</v-btn>
    </v-flex>
  </v-layout>
  <!-- 거래처 선택 모달 시작 -->
  <v-dialog
    v-model="customersModalCheck"
    width="50%">
    <v-card>
      <div style="padding: 10px; background-color: #263238; color: white; height: 48px;">
        <h3>거래처 검색</h3>
      </div>
      <v-layout style="padding: 20px 30px;">
        <v-flex xs1 style="padding-top: 20px;">
          <h2>검색</h2>
        </v-flex>
        <v-flex xs8>
          <search-form />
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
              <td>{{props.item.mobile}}</td>
              <td>{{props.item.manager}}</td>
              <td>
                <v-btn outline sm @click="selectCustomer(props.item)">선택</v-btn>
              </td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
  <!-- 거래처 선택 모달 종료 -->
  <!-- 상품 추가 모달 시작 -->
  <v-dialog
    v-model="appendModalCheck"
    width="70%">
    <v-card>
      <div style="padding: 10px; background-color: #263238; color: white; height: 48px;">
        <h3>직배송 상품 검색 및 선택</h3>
      </div>
      <v-container>
        <v-layout>
          <v-flex>
            <detail-table>
              <tbody slot="contents">
                <tr>
                  <th>즉시검색</th>
                  <td>
                    <v-layout>
                      <v-flex xs3 style="padding-right: 10px;">
                        <v-select
                          :items="['test','test2']"
                          label="1차카테고리" />
                      </v-flex>
                      <v-flex xs3 style="padding-right: 10px;">
                        <v-select
                          :items="['test2','test']"
                          label="2차카테고리"/>
                      </v-flex>
                      <v-flex xs6>
                        <search-form
                          label="검색어를 입력해 주세요"/>
                      </v-flex>
                    </v-layout>
                  </td>
                  <td>
                    <v-btn>검색</v-btn>
                  </td>
                </tr>
              </tbody>
            </detail-table>
          </v-flex>
        </v-layout>
        <v-layout style="margin-top:15px;">
          <v-flex xs8 style="padding: 0px 5px;">
            <v-layout>
              <v-flex>
                *해당 거래처에서 자주 주문한 상품 순입니다.
              </v-flex>
              <v-flex>
                전체 {{allCount}}건
              </v-flex>
            </v-layout>
            <v-layout style="margin-top: 10px;">
              <v-flex>
                <v-data-table
                  :headers="productHeaders"
                  :items="customerProducts"
                  hide-actions>
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.itemName}}</td>
                    <td>{{props.item.itemQTY}}</td>
                    <td>{{numberWithCommas(props.item.price1)}}</td>
                    <td>{{numberWithCommas(props.item.price2)}}</td>
                    <td>{{numberWithCommas(props.item.price3)}}</td>
                    <td>
                      <v-btn outline @click="selectProduct(props.item)">선택</v-btn>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs4 style="padding: 0px 5px;">
            <v-layout>
              <v-flex>
                <span>선택상품 목록(전체 {{allCount}}건)</span>
              </v-flex>
              <v-flex style="text-align:right;">
                <v-btn @click="defaultSelectItem()">초기화</v-btn>
              </v-flex>
            </v-layout>
            <v-layout style="margin-top: 10px; border: 2px solid #cccccc; min-height: 600px;">
              <v-flex xs12 md12 sm12>
                <v-data-table
                  hide-headers
                  hide-actions
                  :items="selectItems">
                  <template slot="items" slot-scope="props">
                    <td>
                      <v-layout>
                        <v-flex xs11>{{props.item.itemName}}</v-flex>
                        <v-flex xs1>
                          <span @click="deleteOneItem(props.item)">
                            <span class="fas fa-times"></span>
                          </span>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex>
                          <span @click="countModify('up', props.index, props.item)">
                            <span class="fas fa-angle-up"></span>
                          </span>
                          <input type="text" v-model="props.item.qTY" style="width: 30px; text-align:center;">
                          <span @click="countModify('down', props.index, props.item)">
                            <span class="fas fa-angle-down"></span>
                          </span>
                        </v-flex>
                        <v-flex>
                          <input type="text" v-model="props.item.price3" style="width: 60px; text-align:center;" disabled>원
                        </v-flex>
                      </v-layout>
                    </td>
                  </template>
                  <template
                    slot="footer">
                    <td>
                      <v-layout>
                        <v-flex>합계 금액</v-flex>
                        <v-flex style="text-align:right">{{numberWithCommas(this.totalPrice)}}원</v-flex>
                      </v-layout>
                    </td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout style="text-align: center;">
          <v-flex>
            <v-btn @click="closeProductAppendModal()">닫기</v-btn>
            <v-btn @click="saveOrderItem()">저장</v-btn>
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
          { text: '배송 단가', value: 'string', sortable: false },
          { text: '소비자 가격', value: 'string', sortable: false },
          { text: '예비 가격', value: 'string', sortable: false },
          { text: '합계금액', value: 'string', sortable: false },
          { text: '삭제', value: 'string', sortable: false }
        ],
        items: [],
        appendModalCheck: false,
        productHeaders: [
          { text:  '상품명', value: 'strings', sortable: false },
          { text: '재고량', value: 'string', sortable: false },
          { text: '배송 단가', value: 'string', sortable: false },
          { text: '소비자 가격', value: 'string', sortable: false },
          { text: '예비 가격', value: 'string', sortable: false },
          { text: '선택', value: 'string', sortable: false }
        ],
        customersModalCheck: false,
        customersHeaders: [
          { text: 'no', value: 'num', sortable: false },
          { text:  '거래처명', value: 'string', sortable: false },
          { text: '거래처 연락처', value: 'string', sortable: false },
          { text: '배송 담당자', value: 'string', sortable: false },
          { text: '거래처 선택', value: 'string', sortable: false }
        ],
        customersItems: [],     //거래처 모든 데이터
        customersItem: '',      //선택된 거래처 1개의 데이터
        customerProducts: [],   //거래처가 취급하는 상품 데이터,
        selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
        deliveryCategory: '직배송',
        manager: '',            //영업담당자
        shippingManager: '',     //배송담당자
        orderItems: [],
        shipping:[],
        allCount:0, //전체 상품 개수,
        payment:0,
        totalPrice:0, // 전체 금액
      }
    },
    methods: {
      initCustormer(){
        this.$axios.get('http://freshntech.cafe24.com/order/setinsert')
        .then(res => {
          this.shippingManager = res.data[0];
          for(var i = 0;i< this.shippingManager.length;i++){
            this.shipping.push(this.shippingManager[i].sManager);
          }
          this.customersItems = res.data[1];
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      selectCustomer(customers) { //거래처 선택 누를시
        this.customersItem = customers;
        this.orderItems = [];
        this.selectItems = [];
        this.customersModalCheck = false;
        this.$axios.get('http://freshntech.cafe24.com/order/setinsert/'+this.customersItem.id)
        .then(res => {
          this.customerProducts = res.data;
          for(var i =0;i < this.customerProducts.length;i++){
            this.customerProducts[i].qTY = 1;
            this.customerProducts[i].selectPrice = this.customerProducts[i].price3;
          }
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      openAppendModal() {
        if(this.customersItem == ''){
          alert('거래처를 선택하십시오');
          return;
        }
        this.appendModalCheck = !this.appendModalCheck;
      },

      countModify(mode, index, item){
        if(mode == 'up'){
          this.selectItems[index].qTY++;
          this.totalPrice += Number(this.selectItems[index].price3);
        }else if(mode == 'down'){
          this.selectItems[index].qTY--;
          this.totalPrice -= Number(this.selectItems[index].price3);
        }
      },

      selectProduct(item){ // 상품 선택
        if(this.selectItems[0] == null){
          this.selectItems.push(item);
          this.allCount++;
          this.totalPrice += this.selectItems[0].price3 * this.selectItems[0].qTY;
        }else{
          var count = 0;
          for(var i = 0;i < this.selectItems.length;i++){
            if(item.itemName == this.selectItems[i].itemName){
              this.selectItems[i].qTY++;
              this.totalPrice += Number(this.selectItems[i].price3);
              break;
            }else{
              count++;
            }
          }
          if(this.selectItems.length == count){
            this.selectItems.push(item);
            this.totalPrice += Number(this.selectItems[count].price3);
            this.allCount++;
          }
        }
      },
      defaultSelectItem() {
        this.totalPrice = 0
        this.selectItems = [];
        this.allCount = 0;
      },
      deleteOneItem(product) {
        this.selectItems.forEach((item, index, array)=>{
          if(item == product){
            array.splice(index,1);
          }
        })
        this.allCount--;
      },
      closeProductAppendModal() {
        this.selectItems = [];
        this.allCount = this.selectItems.length;
        this.appendModalCheck = false;
      },
      saveOrderItem() { //상품 추가 후 저장 누를 시
        for(var i = 0;i < this.selectItems.length;i++){
          this.selectItems[i].amount = this.selectItems[i].qTY * this.selectItems[i].price3;
        }
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
          }
        })
        this.allCount--;
      },
      regOrder() { //등록하기 버튼 누를 시
        this.orderItems.amount = this.selectItems.price;
        if(!this.customersItem.bName){
          alert('거래처가 선택되지 않았습니다.');
        }else if(this.date == ''){
          alert('배송요청일을 선택해주세요');
        }else if(this.orderItems.length == 0){
          alert('상품을 먼저 등록해주세요');
        }else{
          this.$axios.post('http://freshntech.cafe24.com/order',{
            tbCustomer_ID:this.customersItem.id,
            itemCount:this.allCount,
            amount:this.allCount,
            payment:this.payment,
            payMethod:this.payMethod,
            requests:this.requests,
            memo:this.memo,
            amount:this.totalPrice,
            insertProduct:this.orderItems
          }).then((res) => {
            alert('주문이 완료되었습니다.');
            this.$router.push('/order/list');
          }).catch((ex) => {
            alert('에러 발생');
            console.log("Error : ",ex);
          })
        }
      },
      numberWithCommas(x) { //원화
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
    },
    created() {
      this.initCustormer();
    }
  }
</script>
<style scoped>
</style>
