<template>
<v-container style=" ">
<!-- ========== 헤더 ========== -->
<page-header title="주문 상세보기" />
<br>
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
<!-- ========== 컨텐츠 ========== -->
<div v-else>
    <div class="cardbox cardbox-header" >
        <h3>주문 정보</h3>
    </div>
    <v-layout row cardbox cardbox-body style="padding:0;">
        <v-flex xs12 md12 >
            <table style="width:94%;" class="td-margin">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">주문 번호</h4></th>
                    <td>
                      {{orderData.id}}
                    </td>
                    <th><h4 class="center-align">주문 일자</h4></th>
                    <td>
                      {{orderData.reqDate}}
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">거래처명</h4></th>
                    <td>
                      {{orderData.cBName}}
                    </td>
                    <th><h4 class="center-align">결제 수단</h4></th>
                    <td>
                      {{orderData.payMethod}}
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">담당자 / 연락처</h4></th>
                    <td>
                      {{orderData.dManager}} / {{orderData.tel}}
                    </td>
                    <th><h4 class="center-align">총 주문 금액</h4></th>
                    <td>
                      {{orderData.amount}}원
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">거래처 주소</h4></th>
                    <td colspan="3">
                      {{orderData.address1}} {{orderData.address2}} {{orderData.address3}}
                    </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>

<div class="cardbox cardbox-header" >
    <h3>배송 정보</h3>
</div>
<v-layout row cardbox cardbox-body style="padding:0;">
    <v-flex xs12 md12 >
        <table style="width:94%;" class="td-margin">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <tr>
              <th><h4 class="center-align">배송 요청일</h4></th>
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
                    v-model="orderData.reqDate"
                    label="배송 요청일을 선택하세요"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="orderData.reqDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </td>

            </tr>
            <tr>
                <th><h4 class="center-align">배송 담당자</h4></th>
                <td>
                  {{orderData.dManager}}
                </td>
                <th><h4 class="center-align">영업 담당자</h4></th>
                <td>
                  {{orderData.cManager}}
                </td>
            </tr>
            <tr>
                <th><h4 class="center-align">요청 사항</h4></th>
                <td colspan="3">
                  <v-textarea
                    name="input-7-1"
                    v-model="orderData.requests"
                    rows="2">
                  </v-textarea>
                </td>
            </tr>
            <tr>
                <th><h4 class="center-align">메모</h4></th>
                <td colspan="3">
                  <v-textarea
                    name="input-7-1"
                    v-model="orderData.memo"
                    rows="2">
                  </v-textarea>
                </td>
            </tr>
        </table>
    </v-flex>
</v-layout>
<br>
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
        <td>{{props.item.price1}}</td>
        <td>{{props.item.price2}}</td>
        <td>{{props.item.price3}}</td>
        <td>{{props.item.price1 * props.item.qTY}}</td>
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
    <v-btn @click="regOrder()">수정하기</v-btn>
    <v-btn @click="deleteOrder()">삭제하기</v-btn>
  </v-flex>
</v-layout>
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
                  <td>{{props.item.price1}}</td>
                  <td>{{props.item.price2}}</td>
                  <td>{{props.item.price3}}</td>
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
                        <input type="text" v-model="props.item.price2" style="text-align:right;">원
                      </v-flex>
                    </v-layout>
                  </td>
                </template>
                <template
                  slot="footer">
                  <td>
                    <v-layout>
                      <v-flex>합계 금액</v-flex>
                      <v-flex style="text-align:right">{{totalPrice}}원</v-flex>
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


</div> <!-- ========== 컨텐츠 ========== -->

</v-container>
</template>

<script>
import {
  SearchForm,
  ButtonToggle,
  DateRange,
  SelectItems,
} from '@/components/commons/Form'

import {
    PageHeader,
    ListTable,
    DetailTable,
    Modal,
} from '@/components/commons/UIComponents';

export default{
    name : 'BrandList',
    // ========== components ========== //
    components: {
        SearchForm,
        ButtonToggle,
        SelectItems,
        PageHeader,
        ListTable,
        DetailTable,
        Modal,
        DateRange,
    },

    // ========== data ========== //
    data() {
        return {
            modal:{
                taxbill : false
            },
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
            appendModalCheck: false,
            loading:true,
            search: '',
            customerProducts: [],   //거래처가 취급하는 상품 데이터,
            selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
            pagination: {},
            selected: [],
            page: 1,
            order_id : null , // customer_id
            customer: null,
            orderData:[],
            orderItems:[],
            allCount:0,
            date: null,
            menu: false,
            modal: false,
            menu2: false,
            count:1, // 상품 개수,
            updateItems:[],// 수정한 아이템
            deleteOrderItems:[],//삭제한 상품
            insertProvierItemList:[], //원래 아이템
            totalPrice:0,
        }
    },

    // ========== methods ========== //
    methods: {
        // ===== 찾기 ===== //
        getCustomer(id){
          this.$axios.get('http://freshntech.cafe24.com/order/detail/'+id)
          .then(res => {
            this.orderData = res.data[0];
            this.orderItems = res.data[1];
            this.customerProducts = res.data[2];
            this.allCount = this.orderItems.length;
            for(var i =0;i < this.customerProducts.length;i++){
              this.customerProducts[i].qTY = 1;
              this.customerProducts[i].selectPrice = this.customerProducts[i].price3;
            }
            for(var i = 0;i < res.data[1].length;i++){
              this.insertProvierItemList.push(this.orderItems[i])
            }
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
            setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
        },

        selectProduct(item){ // 상품 추가
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

        openAppendModal() {
          this.appendModalCheck = !this.appendModalCheck;
        },
        closeProductAppendModal() {
          // this.selectItems = [];
          this.allCount = this.selectItems.length;
          this.appendModalCheck = false;
        },

        // ===== 수정 ===== //
        regOrder(){
          this.$axios.put('http://freshntech.cafe24.com/order',{
            id:this.orderData.id,
            requests:this.orderData.requests,
            memo:this.orderData.memo,
            reqDate:this.orderData.reqDate,
            insertProduct:this.updateItems,
            updateProduct:this.insertProvierItemList,
            deleteProduct:this.deleteOrderItems
          }).then((res) => {
            alert('수정이 완료되었습니다.');
            this.$router.push('/order/list');
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
        },

        deleteOrder(){
          this.$axios.delete('http://freshntech.cafe24.com/order/'+this.orderData.id)
          .then(res => {
            alert('삭제가 완료되었습니다.');
            this.$router.push('/order/list');
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },

        numberWithCommas(x) { //원화
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        saveOrderItem() { //상품 추가 후 저장 누를 시
          this.updateItems = this.updateItems.concat(this.selectItems);
          this.orderItems = this.selectItems.concat(this.orderItems);
          this.appendModalCheck = false;
          this.$axios.get('http://freshntech.cafe24.com/order/setinsert/'+this.customersItem.id)
          .then(res => {
            this.customerProducts = res.data;
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },

        deleteOneOrderItem(product) { // 상품 삭제
          this.deleteOrderItems.push(product.id);
          this.orderItems.forEach((item, index, array)=>{
            if(item == product){
              array.splice(index, 1);
            }
          })
          this.allCount--;
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
    },

    // ========== created ========== //
    created(){
      var order_id = this.$route.params.order_id
      this.$set(this, 'order_id', order_id)
      this.getCustomer(order_id);
    },
}
</script>

<style>
.listItem{
    cursor: pointer;
}
</style>
