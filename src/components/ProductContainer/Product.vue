<template>
<v-container>
  <page-header title="상품 관리" />
  <v-container>
    <v-layout>
      <v-flex>
        <detail-table>
          <tbody slot="contents">
            <!-- <tr>
              <th>키워드 검색</th>
              <td>
                <v-container>
                  <v-layout>
                    <v-flex>
                      <v-select
                        :items="['상품명', '상품코드','제조사']"/>
                    </v-flex>
                    <v-flex>
                      <search-form label="검색어를 입력해 주세요"></search-form>
                    </v-flex>
                  </v-layout>
                </v-container>
              </td>
              <td style="width: 35%;">
                <v-btn>검색</v-btn>
              </td>
            </tr> -->
            <tr>
              <th>즉시 검색</th>
              <td colspan="2">
                <v-container>
                  <v-layout>
                    <v-flex class="select-container" xs2>
                      <v-select
                        :items="['판매중','판매중지','재고부족']"
                        label="판매상태"/>
                    </v-flex>
                    <v-flex class="select-container" xs2>
                      <v-select
                        :items="['직배송','택배배송']"
                        label="배송유형"/>
                    </v-flex>
                    <v-flex class="select-container" xs2>
                      <v-select
                        :items="['테스트']"
                        label="1차카테고리"/>
                    </v-flex>
                    <v-flex class="select-container" xs2>
                      <v-select
                        :items="['테스트']"
                        label="2차카테고리"/>
                    </v-flex>
                    <v-flex class="select-container" xs2>
                      <v-select
                        :items="['테스트']"
                        label="브랜드"/>
                    </v-flex>
                  </v-layout>
                </v-container>
              </td>
            </tr>
          </tbody>
        </detail-table>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container class="middle-container">
    <v-layout>
      <v-flex>
        <span>전체 0건</span>
      </v-flex>
      <v-flex>
        <v-btn outline>판매중</v-btn>
        <v-btn outline>판매중지</v-btn>
      </v-flex>
      <v-flex>
        <v-btn outline>재고변경</v-btn>
      </v-flex>
      <v-flex style="text-align:right">
        <v-btn outline>삭제</v-btn>
        <v-btn outline>상품 일괄 수정</v-btn>
        <v-btn outline>상품 대량 등록</v-btn>
        <v-btn outline>상품등록</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="products"
          hide-actions>

          <template slot="items" slot-scope="props">
            <td>{{props.index}}</td>
            <td>{{props.item.productNum}}</td>
            <td>
              <img :src="props.item.thumbnail" style="width: 70px; margin: 5px;" alt="">
            </td>
            <td>{{props.item.productTitle}}</td>
            <td></td>
            <td>{{props.item.unit}}</td>
            <td>한국</td>
            <td>{{props.item.shippingType}}</td>
            <td>{{props.item.purchasePrice}}</td>
            <td>{{props.item.directDeliveryPrice}}</td>
            <td>{{props.item.deliveryPrice}}</td>
            <td>{{props.item.inventoryAmount}}</td>
            <td>{{props.item.salesStatus}}</td>
          </template>

        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container>
    <v-layout>
      <v-flex class="text-xs-center">
        <v-pagination :length="1"></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
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
    /* 상품관리 페이지 */
    name: 'Product',
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
        headers: [
          { text:  'no', value: 'num', sortable: false },
          { text: '상품코드', value: 'string', sortable: false },
          { text: '썸네일', value: 'string', sortable: false },
          { text: '상품명', value: 'string', sortable: false },
          { text: '카테고리', value: 'string', sortable: false },
          { text: '규격(단위)', value: 'string', sortable: false },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '배송유형', value: 'string', sortable: false },
          { text: '매입단가', value: 'string', sortable: false },
          { text: '직배송단가', value: 'string', sortable: false },
          { text: '택배배송단가', value: 'string', sortable: false },
          { text: '재고량', value: 'string', sortable: false },
          { text: '판매상태', value: 'string', sortable: false },
        ],
        products: []
      }
    },
    methods: {
      initProduct() {
        this.products = this.$models.products;
      }
    },
    created(){
      this.initProduct();
    }
  }
</script>
<style scoped>
  .select-container{
    padding: 0px 5px;
  }

  .middle-container {
    margin-top: 30px;
  }
</style>
