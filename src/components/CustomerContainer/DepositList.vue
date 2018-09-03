<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="예치금 관리" />
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
                    <col width="12%">
                </colgroup>
                <tr>
                    <th><h3>기간</h3></th>
                    <td >
                        <button-toggle :list="[ '전체' , '전월' , '금월' , '당일' ]" :default="0" />
                    </td>
                    <td>
                        <date-range  />
                    </td>
                </tr>
            </table>
            <table width="100%">
                <colgroup>
                    <col width="12%">
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
            
        </v-flex>
      
    </div>
<br>




<v-container grid-list-md cardbox  text-xs-center style="padding:10px 0;">
    <table width="100%">
            <tr>
                <th rowspan="2">총 예치금잔액</th>
                <th>총 이전 예치금 잔액</th>
                <th>총 매출 금액</th>
                <th>총 충전 금액</th>
                <th>수정 금액</th>
                <th>총 예치금 잔액</th>
            </tr>
            <tr>
                <td>514,341원</td>
                <td>732,410원</td>
                <td>0원</td>
                <td>0원</td>
                <td>1,246,751원</td>
            </tr>
        </tbody>
    </table>
</v-container>

<br>





  <div class="cardbox cardbox-header" style="padding-top:5px; padding-bottom:5px;">

    <table width="100%">
      <colgroup>
        <col width="83%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h4>전체 {{desserts.length}}건</h4></td>
        <td><v-btn depressed outline small style="width:97%;" color="success">엑셀다운로드</v-btn></td>
      </tr>
    </table>
              
  </div>
    <v-container grid-list-md cardbox cardbox-body text-xs-center style="padding:10px 0;">
        <v-layout row wrap>
            
            <!-- 데이터 -->
            <v-flex sm12>
                

                <v-data-table
                    :headers="[
                        { text:'번호', align:'left', sortable:false },
                        { text:'거래처', align:'left', sortable:false },
                        { text:'이전 예치금 잔액', align:'left', sortable:false },
                        { text:'매출 금액', align:'left', sortable:false },
                        { text:'충전 금액', align:'left', sortable:false },
                        { text:'수정 금액', align:'left', sortable:false },
                        { text:'예치금 잔액', align:'left', sortable:false },
                        { text:'담당자', align:'left', sortable:false },
                        { text:'최종거래일', align:'left', sortable:false },
                    ]"
                    :items="$models.customers_deposit"
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
                        "preDeposit":"182,490원",
                        "salesAmount":"0원",
                        "chargeAmount":"0원",
                        "updateAmount":"0원",
                        "depositBalance":"182,490원",
                        "manager":"코모리",
                        "finalDate":"2018-07-13",
                        "detail":[]
                    }
                 -->
                    <template slot="items" slot-scope="props" >
                        <tr @click="$router.push('/customers/deposit/detail/'+props.item.number)">
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-left">{{ props.item.account }}</td>
                            <td class="text-xs-left">{{ props.item.preDeposit }}</td>
                            <td class="text-xs-left">{{ props.item.salesAmount }}</td>
                            <td class="text-xs-left">{{ props.item.chargeAmount }}</td>
                            <td class="text-xs-left">{{ props.item.updateAmount }}</td>
                            <td class="text-xs-left">{{ props.item.depositBalance }}</td>
                            <td class="text-xs-left">{{ props.item.manager }}</td>
                            <td class="text-xs-left">{{ props.item.finalDate }}</td>
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
    title="Sample Modal" 
    width="35%"
    :open="modal.customerEdit" 
    @close="modal.customerEdit = false" 
    @confirm="modal.customerEdit=false">
        
    <p slot="contents">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
        Explicabo consequatur cum impedit velit autem perspiciatis qui aut fugit eligendi corporis earum, <br>
        dolorem nisi vitae aliquam soluta, aperiam ullam animi consequuntur.
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
        DateRange,
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
            selected: [],

             headers: [
                {
                    text: 'Dessert (100g serving)',
                    align: 'left',
                    sortable: false,
                    value: 'name'
                },
                { text: 'Calories', value: 'calories' },
                { text: 'Fat (g)', value: 'fat' },
                { text: 'Carbs (g)', value: 'carbs' },
                { text: 'Protein (g)', value: 'protein' },
                { text: 'Iron (%)', value: 'iron' }
            ],
            desserts: [
                {
                    id:1,
                    value: false,
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '1%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '1%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '7%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '8%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '16%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '0%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '2%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '45%'
                },
                {
                    id:1,
                    value: false,
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '22%'
                },
                {
                    id:1,
                    value: false,
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '6%'
                }
            ],

            page: 1



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
        
    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
