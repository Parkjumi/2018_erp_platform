<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="브랜드 상품관리" />
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
        <h3>검색</h3>
    </div>
    <div class="cardbox cardbox-body" style="padding:0;">
    <v-flex sm12 class="td-margin">
        <table width="100%">
          <colgroup>
            <col width="13.5%">
            <col width="1%">
            <col width="20%">
            <col width="1%">
            <col width="41%">
          </colgroup>
          <tr>
            <th><h3>키워드검색</h3></th>
            <td></td>
            <td>
              <v-select
                :items="['브랜드명']"
                label="분류"
              ></v-select>
            </td>
            <td></td>
            <td>
              <search-form label="검색어를 입력해 주세요" />
            </td>
            <td></td>
          </tr>
        </table>
        
      </v-flex>
      
    </div>
<br>



  <div class="cardbox cardbox-header" style="padding-top:5px; padding-bottom:5px;">

    <table width="100%">
      <colgroup>
        <col width="55%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h3>브랜드 목록</h3></td>
        <td class="text-xs-right">* 신규 상품 등록은 상품관리 메뉴에서 가능합니다.</td>
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
                        { text: '브랜드명', align:'left', sortable: false },
                        { text: '상품 수', align:'center', sortable: false },
                        { text: '등록일', align:'center', sortable: false },
                    ]"
                    :items="$models.brands"
                    hide-actions
                    class=""
                >
                    <template slot="items" slot-scope="props" >
                        <tr @click.prevent="$router.push('/brands/products/'+props.item.number)">
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-left">{{ props.item.brandName }}</td>
                            <td class="text-xs-center">{{ props.item.products==undefined ? 0 : props.item.products.length }}</td>
                            <td class="text-xs-center">{{ props.item.date }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination  v-model="page" :length="6"></v-pagination>
                </div>


            </v-flex>

        </v-layout>
    </v-container>
    





    </div>
    <!-- ========== 컨텐츠 ========== -->







<!-- ===== 등록모달 ===== -->
<modal 
    title="브랜드 등록" 
    width="35%"
    :open="modal.createItem" 
    @close="modal.createItem = false" 
    @confirm="modal.createItem=false">
        
    <p slot="contents">
        
        <table style="width:100%;">
                <colgroup>
                    <col width="28%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">브랜드명</h4></th>
                    <td>
                        <v-text-field
                            label="내용을 입력해 주세요"
                            v-model="editBrand.brandName"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
    </p>

    <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.createItem=false">취소</v-btn>
        <v-btn color="green darken-1" flat @click.native="createItemConfirm">확인</v-btn>
    </div>
</modal>


<!-- ===== 수정모달 ===== -->
<modal 
    title="브랜드 수정" 
    width="35%"
    :open="modal.editItem" 
    @close="modal.editItem = false" 
    @confirm="modal.editItem=false">
        
    <p slot="contents">
        
        <table style="width:100%;">
                <colgroup>
                    <col width="28%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">브랜드명</h4></th>
                    <td>
                        <v-text-field
                            label="내용을 입력해 주세요"
                            v-model="editBrand.brandName"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
    </p>

    <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.editItem=false">취소</v-btn>
        <v-btn color="green darken-1" flat @click.native="editItemConfirm(editBrand.number)">확인</v-btn>
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
    },
    
    
    
    
    // ========== data ========== //
    data() {
        return {
            modal:{
                createItem : false,
                editItem : false,
            },
            loading:true,

            tableData: [
                { id: 10, name: 'Prod 01', price: 100000 },
                { id: 11, name: 'Prod 02', price: 200000 },
                { id: 12, name: 'Prod 02', price: 200000 },
                { id: 13, name: 'Prod 03', price: 300000 },
            ],

            search: '',
            pagination: {},
            
            checkList: [],

            page: 1,

            editBrand:{
                number:null,
                brandName:null,
            }, // 수정아이템



        }
    },
    
    
    
    
    // ========== created ========== //
    created() {
        setTimeout(()=>{
            this.$set(this, 'loading', false)
        }, 780)
    },
    
    
    
    
    // ========== methods ========== //
    methods: {
        

        

        // ===== 수정 ===== //
        editItem(item){
            var temp = JSON.stringify(item)
            console.log(temp);
            this.$set(this, 'editBrand', JSON.parse(temp))
            this.$set(this.modal, 'editItem', true)
        },
        

        // ===== 수정완료 ===== //
        editItemConfirm(id){
            var rid = this.$models.brands.findIndex(brands=>{
                return brands.number == id
            })
            this.$models.brands[rid] = this.editBrand
            this.$set(this.modal, 'editItem', false)
        },
       
       
        // ===== 등록 ===== //
        createItemConfirm(){
            if(this.editBrand.brandName === null){
                alert('브랜드명을 입력해 주세요')
                return
            }
            var dd = {
                "number" : this.$models.brands[this.$models.brands.length-1].number+1,
                "brandName" : this.editBrand.brandName,
                "amount" : 0,
                "accountNum" : 0,
                "date" : new Date()
            }
            this.$models.brands.push(dd)
            this.$set(this, 'editBrand', {
                number:null,
                brandName:null,
            })
            alert('추가되었습니다.')
            this.$set(this.modal, 'createItem', false)
        },


        // ===== 삭제 ===== //
        deleteItem(id){
            if(!confirm('해당 브랜드를 삭제하시겠습니까?')){
                return
            }
            var rid = this.$models.brands.findIndex(brands=>{
                return brands.number == id
            })
            this.$models.brands.splice(rid, 1)
            this.$set(this, 'editBrand', {
                number:null,
                brandName:null,
            })
            this.$set(this.modal, 'editItem', false)
        }


    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
