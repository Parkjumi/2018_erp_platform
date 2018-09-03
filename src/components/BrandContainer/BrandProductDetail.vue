<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="브랜드 상품수정" />
    <br>



    <!-- ========== 로딩 ========== -->
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
    <!-- ========== 로딩 ========== -->





    <!-- ========== 컨텐츠 ========== -->
    <div v-else>
    




    <div class="cardbox cardbox-header" >
        <h3>브랜드 정보</h3>
    </div>
    <div class="cardbox cardbox-body" style="padding:0;">
        <v-flex sm12 class="td-margin">
            <table width="100%">
                <colgroup>
                    <col width="12%">
                    <col width="38%">
                    <col width="12%">
                </colgroup>
                <tr>
                    <th><h3>브랜드명</h3></th>
                    <td >
                        <v-text-field
                            label="브랜드명을 입력해 주세요"
                            v-model="brand.brandName"
                            required
                        ></v-text-field>
                    </td>
                    <th><h3>등록일</h3></th>
                    <td >
                        {{ brand.date }}
                    </td>
                </tr>
            </table>
            
        </v-flex>
      
    </div>
<br>










  <div class="cardbox cardbox-header" style="padding-top:5px; padding-bottom:5px;">

    <table width="100%">
      <colgroup>
        <col width="10%">
        <col width="20%">
        <col >
        <col width="15%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h3>상품목록</h3></td>
        <td class="text-xs-right">
            <search-form label="이름을 입력해 주세요" />
        </td>
        <td class="text-xs-right"></td>
        <td class="text-xs-right">
            <v-btn depressed style="width:97%;" color="success" @click.prevent="modal.addProduct = true">상품추가</v-btn>
        </td>
      </tr>
    </table>
              
  </div>
    <v-container grid-list-md cardbox cardbox-body text-xs-center style="padding:10px 0;">
        <v-layout row wrap>
            
            <!-- 데이터 -->
            <v-flex sm12>
                

                <v-data-table
                    :headers="[
                        { text: '번호', align:'left', sortable: false },
                        { text: '상품명', align:'left', sortable: false },
                        { text: '카테고리', align:'center', sortable: false },
                        { text: '규격', align:'center', sortable: false },
                        { text: '제조사', align:'center', sortable: false },
                        { text: '배송유형', align:'center', sortable: false },
                        { text: '직배송 단가', align:'center', sortable: false },
                        { text: '택배배송 단가', align:'center', sortable: false },
                        { text: '삭제', align:'center', sortable: false },
                    ]"
                    :items="brand.products"
                    hide-actions
                    class=""
                >
                    <template slot="items" slot-scope="props" >
                        <tr >
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-left">{{ props.item.productTitle }}</td>
                            <td class="text-xs-center">{{ props.item.category }}</td>
                            <td class="text-xs-center">{{ props.item.unit }}</td>
                            <td class="text-xs-center">{{ props.item.origin }}</td>
                            <td class="text-xs-center">{{ props.item.shippingType }}</td>
                            <td class="text-xs-center">{{ props.item.directDeliveryPrice }}</td>
                            <td class="text-xs-center">{{ props.item.deliveryPrice }}</td>
                            <td class="text-xs-center">
                                <v-icon
                                    small
                                    @click="deleteProduct(props.item.productNum)"
                                >
                                    delete
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                </v-data-table>


            </v-flex>

        </v-layout>
    </v-container>
    


    </div>
    <!-- ========== 컨텐츠 ========== -->






<!-- ===== 직접수정 모달 ===== -->
<modal 
    title="상품추가" 
    width="60%"
    :open="modal.addProduct" 
    @close="modal.addProduct = false" 
    @confirm="modal.addProduct=false">
        
    <div slot="contents">
        <table width="100%" style="padding:1%;">
            <colgroup>
                <col width="17.5%">
                <col width="17.5%">
                <col width="17.5%">
            </colgroup>
            <tr>
                <td>
                    <v-select
                        :items="['브랜드명']"
                        label="분류"
                        style="width:95%;"
                    ></v-select>
                </td>
                <td>
                    <v-select
                        :items="['브랜드명']"
                        label="분류"
                        style="width:95%;"
                    ></v-select>
                </td>
                <td>
                    <v-select
                        :items="['브랜드명']"
                        label="분류"
                        style="width:95%;"
                    ></v-select>
                </td>
                <td class="text-xs-right">
                    <search-form label="검색어를 입력해 주세요" style="width:70%;" />
                </td>
                <td></td>
            </tr>
        </table>

        <v-data-table
            :headers="[
                { text: '번호', align:'left', sortable: false },
                { text: '상품명', align:'left', sortable: false },
                { text: '카테고리', align:'center', sortable: false },
                { text: '규격', align:'center', sortable: false },
                { text: '제조사', align:'center', sortable: false },
                { text: '배송유형', align:'center', sortable: false },
                { text: '직배송 단가', align:'center', sortable: false },
                { text: '택배배송 단가', align:'center', sortable: false },
                { text: '선택', align:'center', sortable: false },
            ]"
            :items="$models.products"
            hide-actions
            class=""
        >
            <template slot="items" slot-scope="props" >
                <tr >
                    <td class="text-xs-left">{{ props.item.number }}</td>
                    <td class="text-xs-left">{{ props.item.productTitle }}</td>
                    <td class="text-xs-center">{{ props.item.category }}</td>
                    <td class="text-xs-center">{{ props.item.unit }}</td>
                    <td class="text-xs-center">{{ props.item.origin }}</td>
                    <td class="text-xs-center">{{ props.item.shippingType }}</td>
                    <td class="text-xs-center">{{ props.item.directDeliveryPrice }}</td>
                    <td class="text-xs-center">{{ props.item.deliveryPrice }}</td>
                    <td class="text-xs-center"><v-checkbox v-model="checkList" :value="props.item"></v-checkbox></td>
                </tr>
            </template>
        </v-data-table>
    </div>

    <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.addProduct=false">닫기</v-btn>
        <v-btn color="green darken-1" flat @click.native="addProduct">추가</v-btn>
    </div>
</modal>



</v-container>
</template>




<script>
import { 
  SearchForm, 
  ButtonToggle,
  DateRange,
  SelectItems,
} from '../commons/Form'

import {
    PageHeader,
    ListTable,
    Modal,
} from '../commons/UIComponents';


export default{
    name : 'List',

    // ========== components ========== //
    components: {
        SearchForm,
        ButtonToggle,
        SelectItems,
        PageHeader,
        ListTable,
        Modal,
        DateRange,
    },
    
    
    
    
    // ========== data ========== //
    data() {
        return {
            modal:{
                deposit : false,
                addProduct : false,
            },
            loading:true,

            page: 1,

            checkList:[],//상품추가 목록
            brand_id:null,
            brand:null,



        }
    },
    
    
    
    
    // ========== created ========== //
    created() {
        var brand_id = this.$route.params.brand_id
        this.$set(this, 'brand_id', brand_id)
        this.getBrand(brand_id)
        
    },
    
    
    
    
    // ========== methods ========== //
    methods: {
        
        // ===== get data ===== //
        getBrand(id){
            var rid = this.$models.brands.findIndex(brand=>{
                return brand.number == id
            })
            if(this.$models.brands[rid].products == undefined){
                this.$models.brands[rid].products = []
            }
            // var temp = JSON.stringify(this.$models.brands[rid])
            // this.$set(this, 'brand', JSON.parse(temp))
            this.$set(this, 'brand', this.$models.brands[rid])
            setTimeout(()=>{
                this.$set(this, 'loading', false)
            }, 780)
        },


        // ===== 상품추가 ===== //
        addProduct(){
            this.$set(this.brand, 'products', this.checkList)
            this.$set(this.modal, 'addProduct', false)
            this.$set(this, 'checkList', [])
        },
        
        
        // ===== 상품삭제 ===== //
        deleteProduct(id){
            if(!confirm('해당 상품을 삭제하시겠습니까?')){
                return
            }
            var rid = this.brand.products.findIndex(prod=>{
                return prod.productNum == id
            })
            this.brand.products.splice(rid, 1)
        }

    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
