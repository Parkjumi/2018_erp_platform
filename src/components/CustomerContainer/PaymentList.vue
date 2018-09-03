<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="결제수단 관리" />
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
                    :items="['전체', '거래처명', '브랜드명']"
                    label="분류"
                ></v-select>
                </td>
                <td></td>
                <td>
                <search-form label="이름을 입력해 주세요" />
                </td>
                <td></td>
            </tr>
            </table>
            <table width="100%">
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
                    :items="['전체', '거래처명', '브랜드명']"
                    label="배송유형"
                ></v-select>
                </td>
                <td></td>
                <td>
                <v-select
                    :items="['전체', '거래처명', '브랜드명']"
                    label="담당자"
                ></v-select>
                </td>
                <td></td>
                <td>
                <v-select
                    :items="['전체', '거래처명', '브랜드명']"
                    label="담당자"
                ></v-select>
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
        <col width="85%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h3>거래처목록</h3></td>
        <td>
            <!-- <v-btn depressed style="width:97%;" color="success" @click.prevent="save">변경내용 저장</v-btn> -->
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
                        { text: '번호', align:'left', sortable: 'false', value:'number' },
                        { text: '거래처', align:'left', sortable: 'false', value:'account' },
                        { text: '외상거래', align:'left', sortable: 'false', value:'account' },
                        { text: '예치금', align:'left', sortable: 'false', value:'account' },
                        { text: '신용카드', align:'left', sortable: 'false', value:'account' },
                    ]"
                    :items="$models.customers_payment_method"
                    hide-actions
                    class=""
                >
                <!-- 
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        "number":1,
                        "account":"파스타앤피자",
                        "run_A_Tab":false,
                        "deposit":true,
                        "credit":true
                    },
                 -->
                    <template slot="items" slot-scope="props" >
                        <tr>
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-left">{{ props.item.account }}</td>
                            <td class="text-xs-left">
                                <v-checkbox v-model="props.item.run_A_Tab" value></v-checkbox>
                            </td>
                            <td class="text-xs-left">
                                <v-checkbox v-model="props.item.deposit" value></v-checkbox>
                            </td>
                            <td class="text-xs-left">
                                <v-checkbox v-model="props.item.credit" value></v-checkbox>
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
    name : 'PaymentList',

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

            search: '',
            pagination: {},
            selected: [],


            page: 1



        }
    },
    
    
    
    
    // ========== created ========== //
    created() {
        console.log(this.$models.orders[2]);
        setTimeout(()=>{
            this.$set(this, 'loading', false)
        }, 780)
    },
    
    
    
    
    // ========== methods ========== //
    methods: {

        // ===== 저장 ===== //
        save(){
            alert('저장되었습니다')
        }

        
    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
