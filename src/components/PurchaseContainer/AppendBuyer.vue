<template>
<v-container>
  <page-header title="신규 매입처 등록"/>
  <h3 style="margin-top: 15px;">기본 정보</h3>
  <v-layout>
    <v-flex>
      <detail-table>
        <tbody slot="contents">
          <tr style="height:70px">
            <th>매입처명*</th>
            <td colspan="3" style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.bName" label="매입처명을 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>사업자등록번호</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.bNumber" label="사업자등록번호를 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <th>대표자 명</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.chief" label="대표자 명을 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>대표 전화번호</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.tel" label="대표 전화번호를 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <th>업종/업태</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.bSector" label="업종을 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>FAX 번호</th>
            <td colspan="3" style="width: 35%;">
              <v-layout>
                <v-flex xs5 style="padding: 0px">
                  <v-text-field v-model="buyer.fax" label="FAX 번호를 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
          <tr>
            <th><h4 class="center-align">배송지</h4></th>
            <td colspan="3">
              <v-text-field
                  label="우편번호를 입력해 주세요"
                  v-model="buyer.postNo"
                  required
                  style="width:50%;"
              ></v-text-field>
              <v-text-field
                  label="광역시/도를 입력해 주세요"
                  v-model="buyer.address1"
                  required
                  style="width:50%;"
              ></v-text-field>
              <v-text-field
                  label="도로명을 입력해 주세요"
                  v-model="buyer.address2"
                  required
                  style="width:50%;"
              ></v-text-field>
              <v-text-field
                  label="상세주소를 입력해 주세요"
                  v-model="buyer.address3"
                  required
                  style="width:50%;"
              ></v-text-field>
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
        :items="purchaseItems"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>
            {{props.index + 1}}
          </td>
          <td>{{props.item.itemName}}</td>
          <td>{{props.item.unit}}</td>
          <td>{{props.item.manufacturer}}</td>
          <td>1</td>
          <td>{{props.item.price1}}</td>
          <td>{{props.item.price2}}</td>
          <td>{{props.item.price3}}</td>
          <td>{{props.item.price1}}</td>
          <td>
            <v-btn outline @click="deleteOneOrderItem(props.item)">삭제</v-btn>
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
  <v-layout style="margin-top:20px;">
    <v-flex style="text-align: center">
      <v-btn @click="$router.push('/purchase/buyerList')">목록으로</v-btn>
      <v-btn @click="regOrder()">등록하기</v-btn>
    </v-flex>
  </v-layout>
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
          <v-flex xs3>
            <h2>직배송 상품 선택</h2>
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
                  :items="purchaseProducts"
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
                          <input type="text" v-model="count" style="width: 30px; text-align:center;">
                          <span @click="countModify('down', props.item)">
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
                        <v-flex style="text-align:right">{{sumPrice}}원</v-flex>
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
        purchaseProducts:[],
        customerProducts: [],   //거래처가 취급하는 상품 데이터,
        selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
        count: 1,
        purchaseItems:[],
        orderItems: [],
        shipping:[],
        allCount:0, //전체 상품 개수,
        payment:0,
        buyer:[], //매입처 정보
      }
    },
    computed: {
      sumPrice: function(){
        let sum = 0;
        this.selectItems.forEach(item => {
          sum += Number(item.price2);
        });
        this.payment = sum*this.count;

        return sum*this.count;
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
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })

        this.$axios.get('http://freshntech.cafe24.com/item')
        .then(res => {
          this.purchaseProducts = res.data[0];
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      openAppendModal() {
        this.appendModalCheck = !this.appendModalCheck;
      },
      selectProduct(item){
        item.qTY = this.count;
        item.amount = this.count * item.price2;
        this.selectItems.push(item);
        this.allCount++;
      },
      countModify(mode, index, item){
        if(mode == 'up'){
          this.count += 1;
          console.log(item);
        }else{
          this.count -= 1;
        }
      },
      defaultSelectItem() {
        this.selectItems = [];
        this.allCount = 0;
      },
      deleteOneItem(product) {
        this.selectItems.forEach((item, index, array) => {
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
        for(var i =0; i < this.selectItems.length;i++){
          this.purchaseItems.push(this.selectItems[i])
        }
        this.selectItems = [];
        this.appendModalCheck = false;
      },
      deleteOneOrderItem(product) {
        this.purchaseItems.forEach((item, index, array)=>{
          if(item == product){
            array.splice(index, 1);
          }
        })
        this.allCount--;
      },
      regOrder() { //등록하기 버튼 누를 시
          this.$axios.post('http://freshntech.cafe24.com/purchase',{
            bName:this.buyer.bName,
            bNumber:this.buyer.bNumber,
            bSector:this.buyer.bSector,
            chief:this.buyer.chief,
            manager:this.buyer.manager,
            tel:this.buyer.tel,
            fax:this.buyer.fax,
            email:this.buyer.email,
            mobile:this.buyer.mobile,
            postNo:this.buyer.postNo,
            address1:this.buyer.address1,
            address2:this.buyer.address2,
            address3:this.buyer.address3,
            remark1:this.buyer.remark1,
            id:this.buyer.id,
            insertProvierItemList:this.purchaseItems
          }).then((res) => {
            alert('등록이 완료 되었습니다.');
          }).catch((ex) => {
            console.log("Error : ",ex);
          })
          this.$router.push('/purchase/buyerlist');
      }
    },
    created() {
      this.initCustormer();
    }
  }
</script>
<style scoped>
</style>
