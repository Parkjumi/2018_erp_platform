<template>
<v-container style=" ">
    



<!-- ========== 헤더 ========== -->
<page-header title="견적서 수정" />
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
                    <th><h4 class="center-align">거래처 *</h4></th>
                    <td>
                        <v-text-field
                            label="거래처명을 입력해 주세요"
                            v-model="estimate.account"
                            required
                        ></v-text-field>
                    </td>
                    <th><h4 class="center-align">취급 업종</h4></th>
                    <td>
                        <v-text-field
                            label="취급업종명을 입력해 주세요"
                            v-model="estimate.sector"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">배송 유형</h4></th>
                    <td>
                        <v-radio-group v-model="estimate.shippingType" row>
                            <v-radio label="직배송" value="직배송"></v-radio>
                            <v-radio label="택배배송" value="택배배송"></v-radio>
                        </v-radio-group>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비고</h4></th>
                    <td colspan="3">
                        <v-textarea
                            name="input-7-1"
                            label="내용을 입력해 주세요"
                            v-model="estimate.remarks"
                            hint="Hint text"
                        ></v-textarea>
                    </td>
                </tr>
            </table>

        </v-flex>
    </v-layout>
<br>

    <div class="cardbox cardbox-header" >
        <table width="100%">
        <colgroup>
            <col width="85%">
        </colgroup>
        <tr>
            <td style="text-align:left;"><h3>상품목록</h3></td>
            <td class="text-xs-right"><v-btn depressed color="success">상품추가</v-btn></td>
        </tr>
        </table>
    </div>
    <v-layout row cardbox cardbox-body style="padding:0;">
        <v-flex sm12>
                

                <v-data-table
                    :headers="[
                        { text:'번호',        sortable:false },
                        { text:'상품명',      sortable:false },
                        { text:'규격',        sortable:false },
                        { text:'제조사',      sortable:false },
                        { text:'수량',        sortable:false, align:'center' },
                        { text:'단가',        sortable:false, align:'center' },
                        { text:'공급가액',    sortable:false, align:'center' },
                        { text:'부가세',      sortable:false, align:'center' },
                        { text:'합계금액',    sortable:false, align:'center' },
                        { text:'삭제',        sortable:false, align:'center' },
                    ]"
                    :items="estimate.product"
                    hide-actions
                    class=""
                >
                
                
                    <template slot="items" slot-scope="props" >
                        <tr>
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-left">{{ props.item.productName }}</td>
                            <td class="text-xs-left">{{ props.item.unit }}</td>
                            <td class="text-xs-left">{{ props.item.origin }}</td>
                            <td class="text-xs-center">{{ props.item.amount }}</td>
                            <td class="text-xs-center">{{ props.item.price }}</td>
                            <td class="text-xs-center">{{ props.item.supplyPrice }}</td>
                            <td class="text-xs-center">{{ props.item.vat }}</td>
                            <td class="text-xs-center">{{ props.item.totalPrice }}</td>
                            <td class="text-xs-center">
                                <v-btn depressed style="width:57%;" >삭제</v-btn>
                            </td>
                        </tr>
                    </template>
                    <template slot="footer">
                        <tr>
                            <th class="text-xs-center" colspan="4">합계</th>
                            <td class="text-xs-center">-</td>
                            <td class="text-xs-center">-</td>
                            <td class="text-xs-center">-</td>
                            <td class="text-xs-center">-</td>
                            <td class="text-xs-center">-</td>
                            <td class="text-xs-center"></td>
                        </tr>
                    </template>
                </v-data-table>


            </v-flex>
    </v-layout>



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
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업자등록번호</h4></th>
                    <td>
                        <v-text-field
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">대표자</h4></th>
                    <td>
                        <v-text-field
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업장 소재지</h4></th>
                    <td>
                        <v-text-field
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">사업종류</h4></th>
                    <td>
                        <v-text-field
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">이메일 주소</h4></th>
                    <td>
                        <v-text-field
                            label="코드를 입력해 주세요"
                            required
                        ></v-text-field>
                    </td>
                </tr>
            </table>
        </div>

        <!-- <div slot="buttons">
            <v-btn color="green darken-1" flat @click.native="modal.taxbill=false">Close</v-btn>
            <v-btn color="green darken-1" flat @click.native="modal.taxbill=false">OK</v-btn>
        </div> -->
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


            loading:true,



            search: '',
            pagination: {},
            selected: [],


            page: 1,
            estimate_id:null, // 견적서 아이디
            estimate:{}, // 견적서



        }
    },
    
    
    
    
    // ========== created ========== //
    created() {
        var estimate_id = this.$route.params.est_id
        this.$set(this, 'estimate_id', estimate_id)
        this.getEstimate()
        setTimeout(()=>{
            this.$set(this, 'loading', false)
        }, 780)
    },
    
    
    
    
    // ========== methods ========== //
    methods: {
        
        // ===== get data ===== //
        getEstimate(){
            var rid = this.$models.estimate.findIndex((est)=>{
                return est.number == this.estimate_id
            })
            var temp = JSON.stringify(this.$models.estimate[rid])
            this.$set(this, 'estimate', JSON.parse(temp))
        },
        
        
        // ===== save ===== //
        save(){
            var rid = this.$models.estimate.findIndex((est)=>{
                return est.number == this.estimate_id
            })
            this.$set(this.$models.estimate, rid, this.estimate)
        },

    },


    
}
</script>



<style>
.listItem{
    cursor: pointer;
}

</style>
