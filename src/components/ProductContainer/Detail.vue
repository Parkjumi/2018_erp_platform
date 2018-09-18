<template>
<v-container style=" ">

<!-- ========== 헤더 ========== -->
<page-header title="상품 관리" />
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
        <h3>기본정보</h3>
    </div>
    <v-layout row cardbox cardbox-body  style="padding:0;">
        <v-flex xs12 md12 >
            <table style="width:94%;" class="td-margin">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">상품명 *</h4></th>
                    <td>
                        <v-text-field
                            label="상품명을 입력해 주세요"
                            v-model="product.itemName"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">재고수량 *</h4></th>
                    <td>
                        <v-text-field
                            label="재고수량을 입력해 주세요"
                            v-model="product.itemQTY"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">제조사 *</h4></th>
                    <td>
                        <v-text-field
                            label="제조사를 입력해 주세요"
                            v-model="product.manufacturer"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">원산지 *</h4></th>
                    <td>
                        <v-text-field
                            label="원산지를 입력해 주세요"
                            v-model="product.origin"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">판매 규격</h4></th>
                    <td>
                        <v-text-field
                            label="판매규격을 입력해 주세요"
                            v-model="product.spec"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">판매 단위</h4></th>
                    <td>
                        <v-text-field
                            label="판매단위를 입력해 주세요"
                            v-model="product.unit"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">배송 단가</h4></th>
                    <td>
                        <v-text-field
                            label="배송 단가를 입력해 주세요"
                            v-model="product.price1"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">소비자 가격 *</h4></th>
                    <td>
                        <v-text-field
                            label="소비자 가격을 입력해 주세요"
                            v-model="product.price2"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">예비 단가</h4></th>
                    <td>
                        <v-text-field
                            label="예비 단가를 입력해 주세요"
                            v-model="product.price3"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">매입 단가</h4></th>
                    <td>
                        <v-text-field
                            label="매입 단가를 입력해 주세요"
                            v-model="product.purchasePrice"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">카테고리</h4></th>
                    <td colspan="3">
                      <v-layout>
                        <v-flex class="select-container" xs6>
                          <v-select
                            :items="category1"
                            v-model="category"
                            label="1차카테고리를 선택하세요"/>
                        </v-flex>
                        <v-flex class="select-container" xs6>
                          <v-select
                            :items="category2"
                            v-model="secondCategory"
                            label="2차카테고리를 선택하세요"/>
                        </v-flex>
                      </v-layout>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">주공급자 상호명</h4></th>
                  <td>
                    <v-flex class="select-container">
                      <v-select
                        :items="bName"
                        v-model="product.bName"
                        label="주공급자 상호명을 입력하세요"/>
                    </v-flex>
                  </td>
                  <th><h4 class="center-align">판매 상태</h4></th>
                  <td>
                    <v-flex class="select-container">
                      <v-select
                        :items="['판매중','판매중지','재고부족']"
                        v-model="product.state"
                        label="판매 상태를 선택하세요"/>
                    </v-flex>
                  </td>
                </tr>
                <tr>
                  <th>메모</th>
                  <td colspan="3">
                    <v-layout>
                      <v-flex>
                        <v-text-field
                          textarea
                          v-model="product.memo"
                          rows="2">
                        </v-text-field>
                      </v-flex>
                    </v-layout>
                  </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>
<v-layout style="text-align: center;">
  <v-flex style="text-align: center">
    <v-btn @click="$router.push('/product/product')">목록으로</v-btn>
    <v-btn @click="saveItem()">수정하기</v-btn>
    <v-btn @click="deleteProduct()">삭제하기</v-btn>
  </v-flex>
</v-layout>
</v-btn>

</div> <!-- ========== 컨텐츠 ========== -->

</v-container>
</template>

<script>
var product_id;
var category;
import {
  SearchForm,
  ButtonToggle,
  DateRange,
  SelectItems,
} from '../commons/Form'

import {
    PageHeader,
    ListTable,
    DetailTable,
    Modal,
} from '../commons/UIComponents';


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
    },

    // ========== data ========== //
    data() {
        return {

            modal:{
                taxbill : false
            },

            loading:true,
            search: '',
            pagination: {},
            selected: [],
            category1:[],
            category:'',
            category_2:'',
            category2:[],
            memo:'',
            name:'',
            secondCategory:'',

            bNameList:[],
            bName:[],

            category1List :[],

            page: 1,

            customer_id : null , // customer_id
            product: [],
        }
    },
    // ========== created ========== //
    created(){
      product_id = this.$route.params.product_id
      this.$set(this, 'product_id', product_id)
      this.getProduct(product_id);
        setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
    },

    // ========== methods ========== //
    methods: {
        // ===== 저장 ===== //
        saveItem(){
          this.$axios.put('http://freshntech.cafe24.com/item/'+product_id,{
            itemName:this.product.itemName,
            itemQTY:this.product.itemQTY,
            manufacturer:this.product.manufacturer,
            origin:this.product.origin,
            spec:this.product.spec,
            unit:this.product.unit,
            price1:this.product.price1,
            price2:this.product.price2,
            price3:this.product.price3,
            purchasePrice:this.product.purchasePrice,
            first:this.category,
            second:this.secondCategory,
            bName:this.product.bName,
            memo:this.product.memo,
            state:this.product.state,
          })
          .then(res => {
            alert('수정되었습니다.')
            this.$router.push('/product/product')
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },

        getProduct(product_id){
          this.$axios.get('http://freshntech.cafe24.com/item/detail/'+product_id)
          .then(res => {
            this.product = res.data;
            this.category = this.product.first;
            category = this.category;
            this.secondCategory = this.product.second;
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })

          this.$axios.get('http://freshntech.cafe24.com/insertset')
          .then(res => {
            this.category1List = res.data[0];
            this.bNameList = res.data[1];
            for(var i = 0;i < this.category1List.length;i++){
              this.category1.push(this.category1List[i].first);
            }
            for(var i = 0;i < this.bNameList.length;i++){
              this.bName.push(this.bNameList[i].bName);
            }

            for(var i = 0;i < this.category1List.length;i++){
              if(this.category1List[i].first == category){
                for(var j = 0;j < this.category1List[i].secondCategoryList.length;j++){
                  this.category2.push(this.category1List[i].secondCategoryList[j].second);
                }
              }
            }
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },

        deleteProduct(){ // 상품 삭제
          this.$axios.delete('http://freshntech.cafe24.com/item/'+product_id)
          .then(res => {
            alert('삭제가 완료되었습니다.');
            this.$router.push('/product/product');
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },
    },

    watch:{
      category(){
        this.category2 = [];
        for(var i = 0;i < this.category1List.length;i++){
          if(this.category == this.category1List[i].first){
            for(var j=0;j < this.category1List[i].secondCategoryList.length;j++){
              this.category2.push(this.category1List[i].secondCategoryList[j].second)
            }
          }
        }
      }
    },
}
</script>

<style>
.listItem{
    cursor: pointer;
}

.select-container{
  padding: 0px 5px;
}

</style>
