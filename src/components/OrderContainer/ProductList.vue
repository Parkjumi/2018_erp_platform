<template>
<v-container>
  <page-header title="상품별 주문 목록"/>
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
              <td rowspan="3" style="width: 10%; text-align:left;">
                <v-btn small>검색</v-btn>
              </td>
            </tr>

            <tr>
              <th>기간</th>
              <td>
                <v-layout>
                  <v-flex xs4 style="padding-top: 14px;">
                     <button-toggle
                      :list="period"
                      v-model="selectPeriod">
                    </button-toggle>
                  </v-flex>  
                  <v-flex xs8>
                    <date-range></date-range>
                  </v-flex>               
                </v-layout>                
              </td>
            </tr>
            <tr>
              <th>거래처 검색</th>
              <td>
                <search-form
                  label="검색어를 입력해 주세요">

                </search-form>
              </td>
            </tr>
            <tr>
              <th>키워드 검색</th>
              <td colspan="2">
                <v-layout>
                  <v-flex xs2 style="padding: 30px 5px 0px 0px;">
                    <select-items
                      :items="['상품코드', '주문번호']">

                    </select-items>
                  </v-flex>
                  <v-flex xs10 style="padding: 20px; 0px 0px 5px;">
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
                  <v-flex xs2 class="select-flex-container">
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
                      :items="category"
                      label="1차카테고리"/>
                  </v-flex>
                  <v-flex xs2 class="select-flex-container">
                    <v-select
                      :items="['수령전','수령완료']"
                      label="2차카테고리"/>
                  </v-flex>
                </v-layout>
              </td>
            </tr>
          </tbody>
        </detail-table>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="padding-top: 20px;">
      <v-flex xs6>
        <span>전체 0건</span>
      </v-flex>
      <v-flex xs6 style="text-align:right;">
        <span>* 전일~당일까지의 주문내역이 기본으로 노출됩니다.</span>
        <v-btn outline color="green"><v-icon small light>fas fa-print</v-icon>&nbsp;Excel 다운로드</v-btn>
      </v-flex>
    </v-layout>
    <v-layout style="padding-top: 10px;">
      <v-flex xs12> 
          <v-data-table
            :headers="headers"
            :items="productListData"
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
              <td></td>
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
    name: 'ProductList',
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
        productListData: [],
        period: ['전체','전일','당일','한달'],
        category: [
          {
            item: '시럽',
            subItem: ['1883','모닌','다빈치','토라니','포모나','스포트','마리브리자드']
          },
          {
            item: '소스',
            subItem: ['기라델러','다빈치','토라니','포모나','큐팜스']
          },
        ],
        headers: [
          { text: 'no', value: 'num', sortable: false },
          { text: '주문일시', value: 'date', sortable: true },
          { text: '배송요청일', value: 'date', sortable: true },
          { text: '주문번호', value: 'num', sortable: false },
          { text: '거래처', value: 'string', sortable: false },
          { text: '상품명', value: 'string', sortable: false },
          { text: '카테고리', value: 'string', sortable: false },
          { text: '판매규격(단위)', value: 'string', sortable: false },
          { text: '배송유형', value: 'string', sortable: false },
          { text: '주문수량', value: 'string', sortable: false },
          { text: '단가', value: 'string', sortable: false },
        ]
      }
    },
    methods: {
      sendComponentInfo(){
        this.$emit('getComponent','상품별 주문 목록');
      },

      initProductListData() {
        // this.productListData = this.$models.
      }
    },
    mounted(){
      this.sendComponentInfo();
    }
  }
</script>
<style scoped>
  .header-table-container{
    width: 100%;
    height: 350px;
    border: 1px solid blue;
    padding: 10px;
  }

  .main-table-container{
    width: 100%;
    height: 350px;
    border: 1px solid crimson;
    padding: 10px;
    margin-top: 10px;
  }

  .paging-container{
    width: 100%;
    height: 80px;
    border: 1px solid yellow;
  }

  .select-flex-container{
    padding: 0px 10px;
  }
</style>
