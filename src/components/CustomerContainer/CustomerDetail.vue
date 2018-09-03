<template>
<v-container style=" ">
    



<!-- ========== 헤더 ========== -->
<page-header title="거래처 상세보기" />
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
                    <th><h4 class="center-align ">거래처 코드</h4></th>
                    <td colspan="3" >
                        <v-text-field
                            label="코드를 입력해 주세요"
                            v-model="customer.number"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">거래처명 *</h4></th>
                    <td>
                        <v-text-field
                            label="거래처명을 입력해 주세요"
                            v-model="customer.account"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">업종</h4></th>
                    <td>
                        <v-select
                            :items="$models.option_sector"
                            v-model="customer.customerSector"
                            label="업종"
                        ></v-select>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">브랜드 선택</h4></th>
                    <td>
                        <v-select
                            :items="this.$models.brands"
                            item-text="brandName"
                            v-model="customer.brand"
                            label="분류"
                        ></v-select>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th><h4 class="center-align">배송지</h4></th>
                    <td colspan="3">
                        <!-- <search-form label="주소를 입력해 주세요" style="width:70%;" v-model="customer.shipping[1]" /> -->
                        <v-text-field
                            label="상세주소"
                            v-model="customer.shipping[1]"
                            required
                            style="width:50%;"
                        ></v-text-field>
                        <v-text-field
                            label="상세주소"
                            v-model="customer.shipping[2]"
                            required
                            style="width:50%;"
                        ></v-text-field>
                        <v-text-field
                            label="우편번호"
                            v-model="customer.shipping[0]"
                            required
                            style="width:30%;"
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">배송유형</h4></th>
                    <td colspan="3">
                        <button-toggle 
                            :list="[ '전체' , '직접배송' , '택배배송' ]" 
                            :default="(customer.shippingType=='직배송')?1:(customer.shippingType=='택배배송')?2:0" 
                        />
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">아이디</h4></th>
                    <td>
                        <v-text-field
                            label="아이디를 입력해 주세요"
                            v-model="customer.accountId"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">패스워드</h4></th>
                    <td>
                        <v-text-field
                            label="패스워드를 입력해 주세요"
                            v-model="customer.accountPw"
                            type="password"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">거래처 연락처</h4></th>
                    <td>
                        <v-text-field
                            label="연락처를 입력해 주세요"
                            v-model="customer.accoutPhone"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">세금계산서 정보</h4></th>
                    <td>
                        <v-btn depressed outline style="width:97%;" color="pupple" @click.prevent="modal.taxbill = true">상세보기</v-btn>
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
                        <v-text-field
                            label="배송담당자를 입력해 주세요"
                            v-model="customer.shippingManager"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">연락처</h4></th>
                    <td>
                        <v-text-field
                            label="전화번호를 입력해 주세요"
                            v-model="customer.shippingPhone"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">영업 담당자</h4></th>
                    <td>
                        <v-text-field
                            label="영업담당자를 입력해 주세요"
                            v-model="customer.manager"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">연락처</h4></th>
                    <td>
                        <v-text-field
                            label="전화번호를 입력해 주세요"
                            v-model="customer.managerPhone"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>

        </v-flex>
    </v-layout>
<br>

    <!-- <div class="cardbox cardbox-header" >
        <h3>단가 그룹</h3>
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
                    <th><h4 class="center-align">단가그룹 선택</h4></th>
                    <td>
                        <v-select
                            :items="['전체', '거래처명', '브랜드명']"
                            label="분류"
                        ></v-select>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>

        </v-flex>
    </v-layout>
<br>




    <div class="cardbox cardbox-header" >
        <h3>할인/할증율 등급</h3>
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
                    <th><h4 class="center-align">할인/할증율<br>등급 선택</h4></th>
                    <td>
                        <v-select
                            :items="['전체', '거래처명', '브랜드명']"
                            label="분류"
                        ></v-select>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>

        </v-flex>
    </v-layout>
<br>


    <div class="cardbox cardbox-header" >
        <h3>수입물품 유통이력 정보</h3>
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
                    <th><h4 class="center-align">사업자등록증 보유 유무</h4></th>
                    <td>
                        <button-toggle :list="[ '유' , '무' ]" :default="0" />
                    </td>
                    <th><h4 class="center-align">양수자 유형</h4></th>
                    <td>
                        <v-select
                            :items="['전체', '거래처명', '브랜드명']"
                            
                        ></v-select>
                    </td>
                </tr>
            </table>

        </v-flex>
    </v-layout> -->
<br>


<v-btn
    fixed
    dark
    fab
    bottom
    right
    color="pupple"
    @click.prevent="save"
>
    <v-icon>save</v-icon>
</v-btn>

</div> <!-- ========== 컨텐츠 ========== -->   
                





<!-- ========== 모달 ========== -->   

    <!-- ===== 세금계산서 ===== -->
    <modal 
        title="세금계산서 정보" 
        width="45%"
        :open="modal.taxbill" 
        @close="modal.taxbill = false" 
        @confirm="modal.taxbill=false">
            
        <div slot="contents">
            <table style="width:94%;">
                <colgroup>
                    <col width="30%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">사업자명</h4></th>
                    <td>
                        <v-text-field
                            label="사업자명을 입력해 주세요"
                            v-model="taxCalculator.name"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업자등록번호</h4></th>
                    <td>
                        <v-text-field
                            label="사업자번호를 입력해 주세요"
                            v-model="taxCalculator.code"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">대표자</h4></th>
                    <td>
                        <v-text-field
                            label="대표자명을 입력해 주세요"
                            v-model="taxCalculator.manager"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업장 소재지</h4></th>
                    <td>
                        <v-text-field
                            label="소재지를 입력해 주세요"
                            v-model="taxCalculator.addr"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업종류</h4></th>
                    <td>
                        <v-text-field
                            label="사업종류를 입력해 주세요"
                            v-model="taxCalculator.type"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">이메일 주소</h4></th>
                    <td>
                        <v-text-field
                            label="이메일을 입력해 주세요"
                            v-model="taxCalculator.email"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
        </div>

        <div slot="buttons">
            <!-- <v-btn color="green darken-1" flat @click.native="modal.taxbill=false">Close</v-btn> -->
            <v-btn color="green darken-1" flat @click.native="modal.taxbill=false">확인</v-btn>
        </div>
    </modal>


<!-- ========== 모달 ========== -->   

    

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


            page: 1,

            customer_id : null , // customer_id
            customer: null,

            // 세금계산서
            taxCalculator:{
                name:'',
                code:'',
                manager:'',
                addr:'',
                type:'',
                email:''
            }// 



        }
    },
    
    
    
    
    // ========== created ========== //
    created(){
        var customer_id = this.$route.params.customer_id
        this.$set(this, 'customer_id', customer_id)
        this.getCustomer(customer_id)
    },
    
    
    
    
    // ========== methods ========== //
    methods: {
        
        // ===== 찾기 ===== //
        getCustomer(idx){
            var rid = this.$models.customers.findIndex((item)=>{
                return item.number == idx
            })
            var c = JSON.stringify(this.$models.customers[rid])
            var tax = JSON.stringify(this.$models.customers[rid].taxCalculator)
            this.$set(this, 'customer', JSON.parse(c))
            if(tax!=undefined){
                this.$set(this, 'taxCalculator', JSON.parse(tax))
            }
            setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
        },

        // ===== 저장 ===== //
        save(){
            var rid = this.$models.customers.findIndex((item)=>{
                return item.number == this.customer_id
            })

            this.customer.taxCalculator = this.taxCalculator
            this.$models.customers[rid] = this.customer
            alert('저장되었습니다.')
            this.$router.push('/customers/list')
        },

    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
