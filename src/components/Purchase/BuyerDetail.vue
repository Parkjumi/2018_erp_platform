<template>
<v-container>
  <page-header title="신규 매입처 수정"/>
  <h3 style="margin-top: 15px;">기본 정보</h3>
  <v-layout>
    <v-flex>
      <detail-table>
        <tbody slot="contents">
          <tr style="height:70px">
            <th>매입처코드</th>
            <td style="width: 35%;">
              {{buyer.id}}
            </td>
            <th>매입처명*</th>
            <td style="width: 35%;">
              {{buyer.bName}}
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
  <br>
  <h3 style="margin-top: 15px;">매입처 계정 정보</h3>
  <v-layout>
    <v-flex>
      <detail-table>
        <tbody slot="contents">

          <tr>
            <th>담당자</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.manager" label="담당자를 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
            <th>담당자 휴대폰</th>
            <td style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.mobile" label="숫자만 입력해 주세요">

                  </v-text-field>
                </v-flex>
              </v-layout>
            </td>
          </tr>
          <tr>
            <th>비고</th>
            <td colspan="3" style="width: 35%;">
              <v-layout>
                <v-flex xs12 style="padding: 0px">
                  <v-text-field v-model="buyer.remark1" label="내용을 입력해 주세요">

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
        :items="purchaseItems"
        hide-actions>
        <template slot="items" slot-scope="props">
          <td>
            {{props.index + 1}}
          </td>
          <td>{{props.item.id}}</td>
          <td>{{props.item.itemName}}</td>
          <td>{{props.item.first}}</td>
          <td>{{props.item.unit}}</td>
          <td>{{props.item.manufacturer}}</td>
          <td>
            <v-layout>
              <v-flex xs10 style="padding: 0px">
                <v-text-field v-model="props.item.price2">

                </v-text-field>
              </v-flex>
            </v-layout>
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
      <v-btn @click="$router.push('/purchase/buyerList')">목록으로</v-btn>
      <v-btn @click="updateBuyer()">수정하기</v-btn>
      <v-btn @click="deleteProduct()">삭제하기</v-btn>
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
          { text: '상품코드', value: 'string', sortable: false },
          { text: '상품명', value: 'string', sortable: false },
          { text: '카테고리', value: 'string', sortable: false },
          { text: '규격(단위)', value: 'string', sortable: false },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '매입단가(원)', value: 'string', sortable: false },
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
        purchaseProducts:[],
        customerProducts: [],
        selectItems: [],         //거래처가 취급하는 상품중 선택된 상품
        count: 1,
        buyer:[], //매입처 정보
        purchaseItems: [],
        shipping:[],
        allCount:0, //전체 상품 개수,
        payment:0
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
      initBuyer(id){
        this.$axios.get('http://freshntech.cafe24.com/purchase/detail/'+id)
        .then(res => {
          this.buyer = res.data[0];
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })

        this.$axios.get('http://freshntech.cafe24.com/order/setinsert')
        .then(res => {
          this.customersItems = res.data[1];
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })

        this.$axios.get('http://freshntech.cafe24.com/item')
        .then(res => {
          this.purchaseProducts = res.data[0];
          console.log(this.purchaseProducts+"dd");
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
        this.purchaseItems = this.selectItems;
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
      updateBuyer(){
        this.$axios.put('http://freshntech.cafe24.com/purchase',{
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
          insertProvierItemList:this.orderItems
        })
        .then(res => {
          alert('수정되었습니다.')
          this.$router.push('/purchase/buyerList')
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
    },
    created() {
      var buyer_id = this.$route.params.buyer_id
      this.$set(this, 'buyer_id', buyer_id)
      this.initBuyer(buyer_id);
    }
  }
</script>
<style scoped>
</style>
