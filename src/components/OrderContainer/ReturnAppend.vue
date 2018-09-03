<template>
<v-container>
  <page-header title="반품 등록"/>
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
                  <v-text-field v-model="customersItem.account"/>
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
            <th>배송 유형</th>
            <td style="width: 30%;">
              <v-radio-group v-model="deliveryCategory">
                <v-layout>
                  <v-flex
                    xs6
                    v-for="item in ['직배송', '택배배송']"
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
          </tr>
          <tr>
            <th>배송 담당자</th>
            <td>
              <v-layout>
                <v-flex>
                  <v-select
                    :items="$models.delivery_lists"
                    item-text="managerName"
                    label="배송 담당자"
                    v-model="shippingManager"
                  ></v-select>
                </v-flex>
              </v-layout>
            </td>
            <th>영업 담당자</th>
            <td>
              <v-layout>
                <v-flex>
                  <v-select
                    :items="$models.sales_lists"
                    item-text="managerName"
                    label="영업 담당자"
                    v-model="manager"
                  ></v-select>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>사유</th>
            <td colspan="3">
              <v-layout>
                <v-flex>
                  <v-text-field
                    textarea
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
  <h3 style="margin-top: 15px;">반품 상품 목록</h3>
  <v-layout style="padding-top: 20px;">
    <v-flex>
      전체 0건
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
          <td>{{props.item.productTitle}}</td>
          <td>{{props.item.unit}}</td>
          <td>한국</td>
          <td>{{props.item.inventoryAmount}}</td>
          <td>0원</td>
          <td>{{props.item.purchasePrice}}</td>
          <td>0원</td>
          <td>{{props.item.purchasePrice}}</td>
          <td>
            <v-btn outline @click="deleteOneOrderItem(props.item)">삭제</v-btn>
          </td>
        </template>

      </v-data-table>
    </v-flex>
  </v-layout>
  <v-layout style="margin-top:20px;">
    <v-flex style="text-align: center">
      <v-btn @click="$router.push('/order/return')">목록으로</v-btn>
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
              <td>{{props.item.number}}</td>
              <td>{{props.item.account}}</td>
              <td>{{props.item.brand}}</td>
              <td>{{props.item.accoutPhone}}</td>
              <td>{{props.item.shippingManager}}</td>
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
          <v-flex xs7 style="padding: 0px 5px;">
            <v-layout>
              <v-flex>
                *해당 거래처에서 자주 주문한 상품 순입니다.
              </v-flex>
              <v-flex>
                전체 0건
              </v-flex>
            </v-layout>
            <v-layout style="margin-top: 10px;">
              <v-flex>
                <v-data-table
                  :headers="productHeaders"
                  :items="customerProducts"
                  hide-actions>

                  <template slot="items" slot-scope="props">
                    <td>{{props.item.productTitle}}</td>
                    <td>{{props.item.inventoryAmount}}</td>
                    <td>{{props.item.purchasePrice}}</td>
                    <td>{{props.item.deliveryPrice}}</td>
                    <td>
                      <v-btn outline @click="selectProduct(props.item)">선택</v-btn>
                    </td>
                  </template>

                </v-data-table>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs5 style="padding: 0px 5px;">
            <v-layout>
              <v-flex>
                <span>선택상품 목록(전체 0건)</span>
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
                        <v-flex xs11>{{props.item.productTitle}}</v-flex>
                        <v-flex xs1>
                          <span @click="deleteOneItem(props.item)">
                            <span class="fas fa-times"></span>
                          </span>
                          
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex>
                          <span @click="countModify('up',props.item)">
                            <span class="fas fa-angle-up"></span>
                          </span>
                          <input type="text" v-model="count" style="width: 30px; text-align:center;">
                          <span @click="countModify('down',props.item)">
                            <span class="fas fa-angle-down"></span>
                          </span>
                        </v-flex>
                        <v-flex>
                          <input type="text" v-model="props.item.deliveryPrice" style="text-align:right;">
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
          { text: '상품명', value: 'string' },
          { text: '규격(단위)', value: 'string' },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '수량', value: 'string' },
          { text: '단가(원)', value: 'string', sortable: false },
          { text: '공급가액', value: 'string', sortable: false },
          { text: '부가세', value: 'string', sortable: false },
          { text: '합계금액', value: 'string' },
          { text: '삭제', value: 'string', sortable: false }
        ],
        items: [],
        appendModalCheck: false,
        productHeaders: [
          { text:  '상품명', value: 'strings', sortable: false },
          { text: '재고량', value: 'string', sortable: false },
          { text: '매입 단가', value: 'string', sortable: false },
          { text: '판매 단가', value: 'string', sortable: false },
          { text: '선택', value: 'string', sortable: false }
        ],
        customersModalCheck: false,
        customersHeaders: [
          { text: 'no', value: 'num', sortable: false },
          { text:  '거래처명', value: 'string', sortable: false },
          { text: '브랜드', value: 'string', sortable: false },
          { text: '거래처 연락처', value: 'string', sortable: false },
          { text: '배송 담당자', value: 'string', sortable: false },
          { text: '거래처 선택', value: 'string', sortable: false }
        ],
        customersItems: [],     //거래처 모든 데이터
        customersItem: '',      //선택된 거래처 1개의 데이터
        customerProducts: [],   //거래처가 취급하는 상품 데이터,
        selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
        count: 0,
        deliveryCategory: '직배송',
        manager: '',            //영업담당자
        shippingManager: '',     //배송담당자
        orderItems: []
      }
    },
    computed: {
      sumPrice: function(){
        let sum = 0;
        this.selectItems.forEach(item=>{
          console.log(item)
          sum += Number(item.deliveryPrice.slice(0,-1));
        });
        return sum;
      }
    },
    methods: {
      initCustormer(){
        this.customersItems = this.$models.customers;
      },

      selectCustomer(customers) {
        this.customersItem = customers;
        this.customersModalCheck = false;

        //영업담당자 선택
        this.$models.sales_lists.forEach((item)=>{
          if(item.managerName == customers.manager){
            this.manager = item;
          }
        });

        //배송담당자 선택
        this.$models.delivery_lists.forEach((item)=>{
          if(item.managerName == customers.shippingManager){
            this.shippingManager = item;
          }
        });

        console.log(this.manager);

        this.initCustomerProduct();
      },

      openAppendModal() {
        if(this.customersItem == ''){
          alert('거래처를 선택하십시오');
          return;
        }
        this.appendModalCheck = !this.appendModalCheck;
      },

      initCustomerProduct() {
        this.customerProducts = [];
        this.customersItem.product.forEach((item,index)=>{
          var _number = item;
          this.$models.products.forEach((product)=>{
            if(product.productNum == _number){
              this.customerProducts.push(product);
            }
          });
          //this.customerProducts.push(this.$models.products.forEach((product) => {if(product.productNum == _number) return product}));
        });
        
      },

      selectProduct(item){
        this.selectItems.push(item);
      },

      countModify(mode, item){
        if(mode == 'up'){
          this.count += 1;
        }else{
          this.count -= 1;
        }
      },

      defaultSelectItem() {
        this.selectItems = [];
      },

      deleteOneItem(product) {
        this.selectItems.forEach((item, index, array)=>{
          if(item == product){
            array.splice(index,1);
          }
        })
      },

      closeProductAppendModal() {
        this.selectItems = [];
        this.appendModalCheck = false;
      },

      saveOrderItem() {
        this.orderItems = this.selectItems;
        this.appendModalCheck = false;
      },

      deleteOneOrderItem(product) {
        this.orderItems.forEach((item, index, array)=>{
          if(item == product){
            array.splice(index, 1);
          }
        })
      },

      regOrder() {
        let today = new Date();
        
        if(!this.customersItem.account){
          alert('거래처가 선택되지 않았습니다.');
        }else if(this.orderItems.length == 0){
          alert('상품을 먼저 등록해주세요');
        }else if(this.date == ''){
          alert('배송요청일을 선택해주세요');
        }
        this.$models.orders.push({
          number: this.$models.orders.length + 1,
          orderDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
          deliveryRequest: this.date,
          orderNumber: this.$models.orders.length + 1,
          account: this.customersItem.account,
          shippingType: this.deliveryCategory,
          allOrder: 0,
          payment: "신용카드",
          orderAmount: "0원",
          orderStatus: "주문완료",
          outboundShipping: "출고준비중",
          receiptStatus: "대기",
          orderProduct: this.orderItems
        });

        alert('반품  완료되었습니다.');

        this.$router.push('/order/return');
      }
    },
    created() {
      this.initCustormer();
    }
  }
  
</script>

<style scoped>

</style>
