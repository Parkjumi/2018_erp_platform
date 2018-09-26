<template>
<v-container style=" ">

<!-- ========== 헤더 ========== -->
<page-header title="직원 관리" />
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
                    <th><h4 class="center-align">담당자 *</h4></th>
                    <td>
                        <v-text-field
                            label="담당자를 입력해 주세요"
                            v-model="product.itemName"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">담당자 휴대폰 *</h4></th>
                    <td>
                        <v-text-field
                            label="숫자만 입력해 주세요"
                            v-model="product.itemQTY"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">아이디 *</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="4자 이상 영문 또는 숫자만 사용 가능"
                            v-model="product.manufacturer"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비밀번호 *</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="4자 이상 영문 또는 숫자만 사용 가능"
                            v-model="product.manufacturer"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비밀번호 확인*</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="비밀번호를 다시 입력해주세요"
                            v-model="product.manufacturer"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비고</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="내용을 입력해주세요"
                            v-model="product.manufacturer"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>
<v-layout style="text-align: center;">
  <v-flex style="text-align: center">
    <v-btn @click="$router.push('/employee/list')">목록으로</v-btn>
    <v-btn @click="saveEmployee()">등록하기</v-btn>
  </v-flex>
</v-layout>
</v-btn>

</div> <!-- ========== 컨텐츠 ========== -->

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

            bNameList:[],
            bName:[],

            category1List :[],

            page: 1,

            customer_id : null , // customer_id
            product: {},
        }
    },
    // ========== created ========== //
    created(){
      this.$axios.get('http://freshntech.cafe24.com/item/insertset')
      .then(res => {
        this.category1List = res.data[0];
        this.bNameList = res.data[1];
        for(var i = 0;i < this.category1List.length;i++){
          this.category1.push(this.category1List[i].first);
        }
        for(var i = 0;i < this.bNameList.length;i++){
          this.bName.push(this.bNameList[i].bName);
        }
      })
      .catch((ex) => {
        console.log("Error : ",ex);
      })
        setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
    },

    // ========== methods ========== //
    methods: {
        // ===== 저장 ===== //
        saveEmployee(){
          this.$axios.post('http://freshntech.cafe24.com/item',{
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
            second:this.category_2,
            bName:this.name,
            memo:this.memo
          })
          .then(res => {
            alert('저장되었습니다.')
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
          this.$router.push('/product/product')
        }
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
    }
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
