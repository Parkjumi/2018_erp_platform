<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="거래처 관리" />
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
            <col width="41%">
          </colgroup>
          <tr>
            <th><h3>키워드검색</h3></th>
            <td></td>
            <td>
              <v-text-field v-model="searchWord" label="거래처명을 입력해 주세요">

              </v-text-field>
            </td>
            <td><v-btn small @click="searchOrder()">검색</v-btn></td>
          </tr>
        </table>
        <!-- <table width="100%">
          <colgroup>
            <col width="13.5%">
            <col width="1%">
            <col width="20%">
            <col width="1%">
            <col width="20%">
            <col width="1%">
            <col width="20%">
          </colgroup>
          <tr>
            <th><h3>즉시검색</h3></th>
            <td></td>
            <td>
              <v-select
                :items="shippingList"
                label="배송 담당자"
              ></v-select>
            </td>
            <td></td>
            <td>
              <v-select
                :items="['전체', '거래처명', '브랜드명']"
                label="영업 담당자"
              ></v-select>
            </td>
            <td></td>
            <td style="width: 40%;">
              <v-btn>검색</v-btn>
            </td>
          </tr>
        </table> -->
      </v-flex>
    </div>
<br>
  <div class="cardbox cardbox-header" style="padding-top:5px; padding-bottom:5px;">

    <table width="100%">
      <colgroup>
        <col width="80%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h3>거래처목록</h3></td>
        <!-- <td><v-btn depressed outline style="width:97%;" @click.prevent="$router.push('/customers/approval/sale')">할인/할증 관리</v-btn></td> -->
        <td><v-btn depressed outline style="width:95%;" @click.prevent="deleteList">삭제</v-btn></td>
        <!-- <td><v-btn depressed outline style="width:97%;" @click.prevent="modal.customerEdit=true">일괄수정</v-btn></td> -->
        <td><v-btn depressed style="width:95%;" color="success" @click.prevent="$router.push('/customers/insert')">거래처 등록</v-btn></td>
      </tr>
    </table>

  </div>
    <v-container grid-list-md cardbox cardbox-body text-xs-center style="padding:10px 0;">
        <v-layout row wrap>

            <!-- 데이터 -->
            <v-flex sm12>
                <v-data-table
                    :headers="[
                        { text: '번호', align:'left', sortable: 'false', value:'number' },
                        { text: '날짜', align:'left', sortable: 'false', value:'date' },
                        { text: '거래처명', align:'left', sortable: 'false', value:'account' },
                        { text: '할인', align:'left', sortable: 'false', value:'sale' },
                        { text: '총매출', align:'left', sortable: 'false', value:'totalSales' },
                        { text: '선택', align:'left', sortable: 'false' },
                    ]"
                    :items="customers"
                    hide-actions
                    class=""
                >
                    <template slot="items" slot-scope="props" >
                        <tr @click="$router.push('/customers/list/detail/'+props.item.id)">
                            <td class="text-xs-left">{{ props.item.id }}</td>
                            <td class="text-xs-left">{{ props.item.regDate }}</td>
                            <td class="text-xs-left">
                                {{ props.item.bName }}
                            </td>
                            <td class="text-xs-left">{{ props.item.priceRate }}</td>
                            <td class="text-xs-left">{{ props.item.payment }}</td>
                            <td class="text-xs-left">
                                <!-- {{ props.item.number }} -->
                                <v-checkbox v-model="checkList" :value="props.item.number"></v-checkbox>
                            </td>
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
    title="거래처 일괄 수정"
    width="35%"
    :open="modal.customerEdit"
    @close="modal.customerEdit = false"
    @confirm="modal.customerEdit=false">

    <p slot="contents">

        <table style="width:100%;">
            <colgroup>
                <col width="28%">
            </colgroup>
            <tr>
                <th><h4 class="center-align">양식다운로드</h4></th>
                <td>
                    <v-btn depressed small style="width:97%;" color="success" @click.prevent="modal.taxbill = true">엑셀양식 다운로드</v-btn>
                </td>
            </tr>
            <tr>
                <th><h4 class="center-align">파일업로드</h4></th>
                <td>
                    <v-btn depressed small outline style="width:97%;"  @click.prevent="modal.taxbill = true">엑셀파일 업로드</v-btn>
                </td>
            </tr>
        </table>
    </p>

    <!-- <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.customerEdit=false">Close</v-btn>
        <v-btn color="green darken-1" flat @click.native="modal.customerEdit=false">OK</v-btn>
    </div> -->
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
                customerEdit : false
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

            customers:[], //거래처 목록
            shipping:[], //배송 담당자 목록
            shippingList:[] ,// 배송 담당자 이름 목록

        }
    },

    // ========== methods ========== //
    methods: {
      initCustomerData(){
        this.$axios.get('http://freshntech.cafe24.com/customer')
        .then(res => {
          this.customers = res.data[1];
          this.shipping = res.data[0]
          console.log(this.customers);

          for(var i = 0; i <this.shipping.length;i++){
            this.shippingList.push(this.shipping[i].delivererManager);
          }
        })
        .catch((ex) => {
          console.log("Error : ",ex);
        })
      },
        // ===== 목록 삭제 ===== //
        deleteList(){
            if(this.checkList.length < 1){
                alert('선택된 거래처가 없습니다.')
                return
            }
            if(!confirm('해당 거래처를 삭제하시겠습니까?')){
                return
            }
            this.$set(this, 'loading', true)
            setTimeout(()=>{
                var id;
                this.checkList.forEach((checkItem)=>{
                    id = this.$models.customers.findIndex((customer)=>{
                        return customer.number == checkItem
                    })
                    this.$models.customers.splice(id, 1)
                    id=null
                })
                this.$set(this, 'loading', false)
                this.$set(this, 'checkList', [])
            },670)
        },

        searchOrder(){
          this.$axios.post('http://freshntech.cafe24.com/customer/search',{
            bName:this.searchWord
          })
          .then(res => {
            this.customers = res.data;
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        },
    },
    // ========== created ========== //
    created() {
        setTimeout(()=>{
            this.$set(this, 'loading', false)
        }, 780)
        this.initCustomerData();
    },
}
</script>

<style>
.listItem{
    cursor: pointer;
}

</style>
