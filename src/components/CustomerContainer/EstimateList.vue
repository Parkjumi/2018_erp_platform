<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="견적서 관리" />
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
            <table width="100%" >
                <colgroup>
                    <col width="12%">
                </colgroup>
                <tr>
                    <th><h3>기간</h3></th>
                    <td >
                        <button-toggle :list="[ '전체' , '전일' , '당일' , '한달' ]" :default="0" />
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
                    <td>
                    </td>
                    <td>
                        <search-form label="이름을 입력해 주세요" />
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <th><h3>담당자</h3></th>
                    <td></td>
                    <td>
                    <v-select
                        :items="['David', 'Toress', 'Ronaldo']"
                        label="담당자"
                    ></v-select>
                    </td>
                    <td></td>
                    <td>
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
        <col width="73%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h4>전체 {{$models.estimate.length}}건</h4></td>
        <td><v-btn depressed outline style="width:97%;" @click="onPrint">견적서 출력</v-btn></td>
        <td><v-btn depressed style="width:97%;" color="success">신규견적서 등록</v-btn></td>
      </tr>
    </table>
              
  </div>
    <v-container grid-list-md cardbox cardbox-body text-xs-center style="padding:10px 0;">
        <v-layout row wrap>
            
            <!-- 데이터 -->
            <v-flex sm12>

                <v-data-table
                    :headers="[
                        { text:'번호', sortable:false },
                        { text:'작성일', sortable:false },
                        { text:'거래처', sortable:false },
                        { text:'수량', sortable:false },
                        { text:'견적금액', sortable:false },
                        { text:'등록관리자', sortable:false },
                    ]"
                    :items="$models.estimate"
                    hide-actions
                    class=""
                >
                <!-- 

                    "number":1,
                    "date":"2018-08-25 19:24:25",
                    "account":"오키토키",
                    "allAmount":2,
                    "estimatePrice":"2,500원",
                    "registrationManager":"코모리",
                    "shippingType":"직배송",
                    "sector":"유흥주점",
                    "remarks":"",
                    "product":[

                 -->
                
                    <template slot="items" slot-scope="props" >
                        <tr >
                            <td class="text-xs-left">
                                <v-checkbox v-model="checkList" :value="props.item.number"></v-checkbox>
                            </td>
                            <td @click="$router.push('/customers/estimate/detail/'+props.item.number)" class="text-xs-left">
                                {{ props.item.date }}
                            </td>
                            <td @click="$router.push('/customers/estimate/detail/'+props.item.number)" class="text-xs-left">
                                {{ props.item.account }}
                            </td>
                            <td class="text-xs-left">{{ props.item.allAmount }}</td>
                            <td class="text-xs-left">{{ props.item.estimatePrice }}</td>
                            <td class="text-xs-left">{{ props.item.registrationManager }}</td>
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
    title="견적서 출력" 
    width="65%"
    :open="modal.printer" 
    @close="modal.printer = false" 
    @confirm="modal.printer=false">
        
    <div slot="contents">
        <table class="printerTable" v-for="(item, idx) in printList" :key="idx">
            <tr>
                <th colspan="9">
                    <h2>견적서</h2>
                </th>
            </tr>
            <tr>
                <td colspan="5" rowspan="4">
                {{ item.date }}
                <br>
                {{ item.account }} 귀하
                <br>
                견적가 {{ item.estimatePrice }}
                </td>
                <td rowspan="4">발주처</td>
                <td>사업자 등록번호</td>
                <td colspan="2">{{ item.number }}</td>
            </tr>
            <tr>
                <td>상호(법인명)</td>
                <td colspan="2">신화유통</td>
            </tr>
            <tr>
                <td>대표자/연락처</td>
                <td colspan="2">홍진표/-</td>
            </tr>
            <tr>
                <td>주소</td>
                <td colspan="2">(13524) 경기 성남시 분당구 대왕판교로606번길 45 (삼평동, 판교역 푸르지오시티)</td>
            </tr>
            <tr>
                <th>No.</th>
                <th>상품명</th>
                <th>규격(단위)</th>
                <th>제조사(원산지)</th>
                <th>수량</th>
                <th>단가</th>
                <th>공급가액</th>
                <th>세액</th>
                <th>총액</th>
            </tr>
            <tr v-for="(prod, pid)  in  item.product" :key="pid">
                <td>{{ prod.number }}</td>
                <td>{{ prod.productName }}</td>
                <td>{{ prod.unit }}</td>
                <td>{{ prod.origin }}</td>
                <td>{{ prod.amount }}</td>
                <td>{{ prod.price }}</td>
                <td>{{ prod.supplyPrice }}</td>
                <td>{{ prod.vat }}</td>
                <td>{{ prod.totalPrice }}</td>
            </tr>
            <tr>
                <th rowspan="3">비고</th>
                <td colspan="6" rowspan="3"></td>
                <th>공급가 총액</th>
                <th>2,273원</th>
            </tr>
            <tr>
                <th>부가세 총액</th>
                <th>227원</th>
            </tr>
            <tr>
                <th>합계 금액</th>
                <th>2,500원</th>
            </tr>
        </table>
    </div>

    <!-- <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.printer=false">Close</v-btn>
        <v-btn color="green darken-1" flat @click.native="modal.printer=false">OK</v-btn>
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
                printer : false
            },
            loading:true,



            page: 1,

            checkList:[], // 견적서 출력용 체크리스트

            printList:[], // 출력데이터



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
        
        // ===== onPrint ===== //
        onPrint(){
            if(this.checkList.length < 1){
                alert('선택된 항목이 없습니다')
                return 
            }
            var pl = [] 
            var id;
            for(var ii  in  this.checkList){
                id = this.$models.estimate.findIndex(est=>{
                    return est.number == this.checkList[ii]
                })
                pl.push(this.$models.estimate[id])
            }
            
            this.$set(this.modal, 'printer', true)
            // setTimeout(()=>{
                this.$set(this, 'printList', pl)
            // }, 670)
        }

    },


    
}
</script>



<style>
.printerTable{
    margin-bottom:55px !important;
}
.printerTable,
.printerTable td,
.printerTable th{
    border: 1px solid #c1c1c1;
    margin:0;
    padding:5px;
}
.printerTable th{
    background: #f1f1f1;
}

</style>
