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
                    <v-flex class="select-container" xs3>
                      <v-select
                        :items="['판매중','판매중지','재고부족']"
                        v-model="productState"
                        label="판매상태"/>
                    </v-flex>
                    <v-flex class="select-container" xs3>
                      <v-select
                        :items="category1"
                        v-model="category"
                        label="1차카테고리"/>
                    </v-flex>
                    <v-flex class="select-container" xs3>
                      <v-select
                        :items="category2"
                        v-model="category_2"
                        label="2차카테고리"/>
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
      <!-- <v-flex>
        <v-btn outline>판매중</v-btn>
        <v-btn outline>판매중지</v-btn>
      </v-flex> -->
      <!-- <v-flex>
        <v-btn outline>재고변경</v-btn>
      </v-flex> -->
      <v-flex style="text-align:right">
        <v-btn outline>삭제</v-btn>
        <v-btn outline>상품 일괄 수정</v-btn>
        <v-btn outline>상품 대량 등록</v-btn>
        <v-btn outline color="indigo" @click="moveOrderAppend()"><v-icon small>far fa-file-alt</v-icon>&nbsp;상품 등록</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container>
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="products"
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
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.index+1}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.id}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.itemName}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.unit}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.origin}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.price1}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.price2}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.price3}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.itemQTY}}</td>
              <td @click="$router.push('/product/list/detail/'+props.item.id)">{{props.item.state}}</td>
            </tr>
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
          { text: '상품명', value: 'string', sortable: false },
          { text: '규격(단위)', value: 'string', sortable: false },
          { text: '제조사(원산지)', value: 'string', sortable: false },
          { text: '배송단가', value: 'string', sortable: false },
          { text: '소지바가격', value: 'string', sortable: false },
          { text: '예비가격', value: 'string', sortable: false },
          { text: '재고량', value: 'string', sortable: false },
          { text: '판매상태', value: 'string', sortable: false },
        ],
        products: [],
        category1: [], //1차 카테고리 이름
        categoryList: [], //1차 카테고리 목록
        category2:[], //2차 카테고리 이름
        categoryList2: [], //2차 카테고리 목록
        category:'', //1차 카테고리 model
        category_2:[], //2차 카테고리 model
        productState:'',

      }
    },
    methods: {
      initProduct() {
        this.$axios.get('http://freshntech.cafe24.com/item')
        .then(res => {
          this.products = res.data[0];
          this.categoryList = res.data[1];
          for(var i = 0;i < res.data[1].length;i++){
            this.category1.push(this.categoryList[i].first);
          }
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },

      moveOrderAppend() {
        this.$router.push('/product/apply');
      },
    },

    watch:{
      productState(){
        this.$axios.post('http://freshntech.cafe24.com/item/search',{
          state:this.productState,
          first:this.category,
          second:this.category_2
        })
        .then(res => {
          this.products = res.data;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      category(){
        this.category2 = [];
        for(var i = 0;i < this.categoryList.length;i++){
          if(this.category == this.categoryList[i].first){
            for(var j = 0;j < this.categoryList[i].secondCategoryList.length;j++){
              this.category2.push(this.categoryList[i].secondCategoryList[j].second)
            }
          }
        }
        this.$axios.post('http://freshntech.cafe24.com/item/search',{
          state:this.productState,
          first:this.category,
          second:this.category_2
        })
        .then(res => {
          this.products = res.data;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
      category_2(){
        this.$axios.post('http://freshntech.cafe24.com/item/search',{
          state:this.productState,
          first:this.category,
          second:this.category_2
        })
        .then(res => {
          this.products = res.data;
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
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
    margin-top: 5px;
  }
</style>
