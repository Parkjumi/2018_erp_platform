<template>
<v-container style=" ">

<!-- ========== 헤더 ========== -->
<page-header title="배송팀 등록" />
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
                            v-model="deliverer.manager"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">담당자 휴대폰 *</h4></th>
                    <td>
                        <v-text-field
                            label="숫자만 입력해 주세요"
                            v-model="deliverer.mobile"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">상호명 *</h4></th>
                    <td>
                        <v-text-field
                            label="사업자 등록번호를 입력해 주세요"
                            v-model="deliverer.bName"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">사업자 등록번호 *</h4></th>
                    <td>
                        <v-text-field
                            label="사업자 등록번호를 입력해 주세요"
                            v-model="deliverer.bNumber"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">대표자 명</h4></th>
                    <td>
                        <v-text-field
                            label="대표자명을 입력해 주세요"
                            v-model="deliverer.chief"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">대표자 전화번호</h4></th>
                    <td>
                        <v-text-field
                            label="대표자 전화번호를 입력해 주세요"
                            v-model="deliverer.tel"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">아이디 *</h4></th>
                    <td>
                        <v-text-field
                            label="아이디는 대표자 전화번호 입니다."
                            v-model="deliverer.tel"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">업종</h4></th>
                    <td>
                        <v-select
                            :items="['한식','중식','일식','수산물','분식','닭/오리','양식','패스트푸드','제빵','유흥주점','퓨전요리','커피/음료','음식배달','뷔페','기타음식점']"
                            label="분류"
                            v-model="deliverer.bSector"
                        ></v-select>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">비밀번호 *</h4></th>
                  <td >
                      <v-text-field
                          label="4자 이상 영문 또는 숫자만 사용 가능"
                          v-model="deliverer.userPw"
                          required
                      ></v-text-field>
                  </td>
                  <th><h4 class="center-align">FAX</h4></th>
                  <td>
                      <v-text-field
                          label="FAX번호를 입력해 주세요"
                          v-model="deliverer.fax"
                          required
                      ></v-text-field>
                  </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">Email</h4></th>
                  <td colspan="3">
                      <v-text-field
                          label="Email을 입력해 주세요"
                          v-model="deliverer.email"
                          required
                      ></v-text-field>
                  </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">배송지</h4></th>
                  <td colspan="3">
                    <v-text-field
                        label="우편번호를 입력해 주세요"
                        v-model="deliverer.postNo"
                        required
                        style="width:50%;"
                    ></v-text-field>
                    <v-text-field
                        label="광역시/도를 입력해 주세요"
                        v-model="deliverer.address1"
                        required
                        style="width:50%;"
                    ></v-text-field>
                    <v-text-field
                        label="도로명을 입력해 주세요"
                        v-model="deliverer.address2"
                        required
                        style="width:50%;"
                    ></v-text-field>
                    <v-text-field
                        label="상세주소를 입력해 주세요"
                        v-model="deliverer.address3"
                        required
                        style="width:50%;"
                    ></v-text-field>
                  </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비고</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="내용을 입력해주세요"
                            v-model="deliverer.remark1"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">비고2</h4></th>
                  <td colspan="3">
                      <v-text-field
                          label="내용을 입력해주세요"
                          v-model="deliverer.remark2"
                          required
                      ></v-text-field>
                  </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">메모</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="내용을 입력해주세요"
                            v-model="deliverer.memo"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>
<div class="cardbox cardbox-header" >
    <h3>배송 담당자 정보</h3>
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
                <td colspan="3">
                  <v-select
                      :items="tbDelivererName"
                      label="배송 담당자"
                      v-model="deliverer.tbDelivererName"
                  ></v-select>
                </td>
            </tr>
        </table>
    </v-flex>
</v-layout>
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
            tbDelivererName:[], //배송 담당자
            customer_id : null , // customer_id
            deliverer: {},
        }
    },
    // ========== created ========== //
    created(){
      this.$axios.get('http://freshntech.cafe24.com/member')
      .then(res => {
        for(var i = 0; i < res.data.length;i++){
          this.tbDelivererName[i] = res.data[i].name;
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
          this.$axios.post('http://freshntech.cafe24.com/deliverer',{
            userId:this.deliverer.tel,
            userPw:this.deliverer.userPw,
            bName:this.deliverer.bName,
            bNumber:this.deliverer.bNumber,
            bSector:this.deliverer.bSector,
            chief:this.deliverer.chief,
            manager:this.deliverer.manager,
            tel:this.deliverer.tel,
            fax:this.deliverer.fax,
            email:this.deliverer.email,
            mobile:this.deliverer.mobile,
            postNo:this.deliverer.postNo,
            address1:this.deliverer.address1,
            address2:this.deliverer.address2,
            address3:this.deliverer.address3,
            memo:this.deliverer.memo,
            remark1:this.deliverer.remark1,
            remark2:this.deliverer.remark2,
            salesman_ID:deliverer.tbDelivererName
          })
          .then(res => {
            alert('저장되었습니다.')
            this.$router.push('/employee/list')
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
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
