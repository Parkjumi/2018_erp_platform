<template>
<v-container style=" ">

<!-- ========== 헤더 ========== -->
<page-header title="신규 거래처" />
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
        <h3>거래처정보</h3>
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
                    <th><h4 class="center-align">거래처명 *</h4></th>
                    <td>
                        <v-text-field
                            label="거래처명을 입력해 주세요"
                            v-model="customer.bName"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">사업자 등록번호 *</h4></th>
                    <td>
                        <v-text-field
                            label="사업자 등록 번호를 입력해 주세요"
                            v-model="customer.bNumber"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">대표자명 *</h4></th>
                  <td>
                      <v-text-field
                          label="대표자명을 입력해 주세요"
                          v-model="customer.chief"
                          required
                      ></v-text-field>
                  </td>
                    <th><h4 class="center-align">대표자 전화번호 *</h4></th>
                    <td>
                      <v-text-field
                          label="대표자 전화번호를 입력해 주세요"
                          v-model="customer.tel"
                          required
                      ></v-text-field>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">담당자명 *</h4></th>
                  <td>
                      <v-text-field
                          label="담당자명을 입력해 주세요"
                          v-model="customer.manager"
                          required
                      ></v-text-field>
                  </td>
                  <th><h4 class="center-align">담당자 전화번호 *</h4></th>
                  <td>
                      <v-text-field
                          label="담당자 전화번호를 입력해 주세요"
                          v-model="customer.mobile"
                          required
                      ></v-text-field>
                  </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">FAX</h4></th>
                  <td>
                      <v-text-field
                          label="FAX번호를 입력해 주세요"
                          v-model="customer.fax"
                          required
                      ></v-text-field>
                  </td>
                  <th><h4 class="center-align">Email</h4></th>
                  <td>
                      <v-text-field
                          label="Email을 입력해 주세요"
                          v-model="customer.email"
                          required
                      ></v-text-field>
                  </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">할인/할증</h4></th>
                  <td>
                      <v-text-field
                          label="할인율을 입력해 주세요"
                          v-model="customer.priceRate"
                          required
                      ></v-text-field>
                  </td>
                    <th><h4 class="center-align">업종</h4></th>
                    <td>
                        <v-select
                            :items="['한식','중식','일식','수산물','분식','닭/오리','양식','패스트푸드','제빵','유흥주점','퓨전요리','커피/음료','음식배달','뷔페','기타음식점']"
                            label="분류"
                            v-model="customer.bSector"
                        ></v-select>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">배송지</h4></th>
                    <td colspan="3">
                      <v-text-field
                          label="우편번호를 입력해 주세요"
                          v-model="customer.postNo"
                          required
                          style="width:50%;"
                      ></v-text-field>
                      <v-text-field
                          label="광역시/도를 입력해 주세요"
                          v-model="customer.address1"
                          required
                          style="width:50%;"
                      ></v-text-field>
                      <v-text-field
                          label="도로명을 입력해 주세요"
                          v-model="customer.address2"
                          required
                          style="width:50%;"
                      ></v-text-field>
                      <v-text-field
                          label="상세주소를 입력해 주세요"
                          v-model="customer.address3"
                          required
                          style="width:50%;"
                      ></v-text-field>
                    </td>
                </tr>
                <tr>

                  <th><h4 class="center-align">아이디(대표자 연락처)</h4></th>
                  <td>
                      <v-text-field
                          label="자동 생성(ex.01000000000)"
                          v-model="customer.tel"
                          required
                      ></v-text-field>
                  </td>
                  <th><h4 class="center-align">패스워드</h4></th>
                  <td>
                      <v-text-field
                          label="패스워드를 입력해 주세요"
                          v-model="customer.userPW"
                          :type="'password'"
                          required
                      ></v-text-field>
                  </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>
    <div class="cardbox cardbox-header" >
        <h3>배송/영업 담당자 정보</h3>
    </div>
    <v-layout row cardbox cardbox-body style="padding:0;">
        <v-flex xs12 md12 class="td-margin">
            <table style="width:94%;">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">배송 담당자 *</h4></th>
                    <td>
                      <v-select
                          :items="shipping"
                          label="배송 담당자"
                          v-model="customer.tbDelivererName"
                      ></v-select>
                    </td>
                    <th><h4 class="center-align">영업 담당자</h4></th>
                    <td>
                      <v-select
                          :items="salesMan"
                          label="영업 담당자"
                          v-model="customer.salesmanName"
                      ></v-select>
                    </td>
                </tr>

            </table>

        </v-flex>
    </v-layout>
<br>

<v-layout style="text-align: center;">
  <v-flex style="text-align: center">
    <v-btn @click="$router.push('/customers/list')">목록으로</v-btn>
    <v-btn @click="saveOrderItem()">등록하기</v-btn>
  </v-flex>
</v-layout>
<br>
</div> <!-- ========== 컨텐츠 ========== -->

</v-container>
</template>

<script>
let ip = "192.168.64.166";
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

            page: 1,

            customer_id : null , // customer_id
            customer: {},
            shippingList:[], // 배송 담당자 json
            shipping:[], // 배송 담당자 명
            salesManList:[], // 영업 담당자 Json
            salesMan:[], //영업 담당자 명,
        }
    },

    // ========== created ========== //
    created(){
      this.$axios.get('http://freshntech.cafe24.com/customer')
      .then(res => {
        this.shippingList = res.data[0];
        this.salesManList = res.data[2];
        for(var i = 0;i < this.shippingList.length;i++){
          this.shipping.push(this.shippingList[i].delivererManager);
        }

        for(var i = 0;i < this.salesManList.length;i++){
          this.salesMan.push(this.salesManList[i].sManager);
        }
      })
        setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
    },

    // ========== methods ========== //
    methods: {
        // ===== 저장 ===== //
        saveOrderItem(){
          this.$axios.post('http://freshntech.cafe24.com/customer',{
            bName:this.customer.bName,
            userID:this.customer.id,
            userPW:this.customer.userPW,
            tel:this.customer.tel,
            postNo:this.customer.postNo,
            address1:this.customer.address1,
            address2:this.customer.address2,
            address3:this.customer.address3,
            priceRate:this.customer.priceRate,
            tbDeliverer_ID:this.customer.tbDelivererName,
            salesman_ID:this.customer.salesmanName
          })
          .then(res => {
            alert('등록되었습니다.')
            this.$router.push('/customers/list')
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },
    },
}
</script>

<style>
.listItem{
    cursor: pointer;
}

</style>
