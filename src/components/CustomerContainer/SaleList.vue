<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="할인/할증 등급 관리" />
    <br>

   


  <div class="cardbox cardbox-header" style="padding-top:5px; padding-bottom:5px;">

    <table width="100%">
      <colgroup>
        <col width="83%">
      </colgroup>
      <tr>
        <td style="text-align:left;"><h4>전체 {{$models.sales.length}}건</h4></td>
        <td><v-btn depressed style="width:97%;" color="success" @click.prevent="modal.addSale=true">할인/할증 등록</v-btn></td>
      </tr>
    </table>
              
  </div>
    <v-container grid-list-md cardbox cardbox-body text-xs-center style="padding:10px 0;">
        <v-layout row wrap>
            
            <!-- 데이터 -->
            <v-flex sm12>
                

                <v-data-table
                    :headers="[
                        { text:'번호'         , align:'left', sortable:false },
                        { text:'구분'         , align:'center', sortable:false },
                        { text:'등급명'       , align:'center', sortable:false },
                        { text:'할인/할증'    , align:'center', sortable:false },
                        { text:'적용된 거래처 수'    , align:'center', sortable:false },
                        { text:'수정'         , align:'center', sortable:false },
                        { text:'삭제'         , align:'center', sortable:false },
                    ]"
                    :items="$models.sales"
                    hide-actions
                    class=""
                >
                
                    <template slot="items" slot-scope="props" >
                        <tr>
                            <td class="text-xs-left">{{ props.item.number }}</td>
                            <td class="text-xs-center">{{ props.item.division }}</td>
                            <td class="text-xs-center">{{ props.item.gradeName }}</td>
                            <td class="text-xs-center">{{ props.item.sales }}</td>
                            <td class="text-xs-center">{{ props.item.account }}</td>
                            <td class="text-xs-center" style="width:4%;">
                                <v-btn depressed style="width:100%;" >수정</v-btn>
                            </td>
                            <td class="text-xs-center" style="width:4%;">
                                <v-btn depressed style="width:100%;" >삭제</v-btn>
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
    


<!-- ===== 등록모달 ===== -->
<modal 
    title="Sample Modal" 
    width="35%"
    :open="modal.addSale" 
    @close="modal.addSale = false" 
    @confirm="modal.addSale=false">
        
    <p slot="contents">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
        Explicabo consequatur cum impedit velit autem perspiciatis qui aut fugit eligendi corporis earum, <br>
        dolorem nisi vitae aliquam soluta, aperiam ullam animi consequuntur.
    </p>

    <!-- <div slot="buttons">
        <v-btn color="green darken-1" flat @click.native="modal.addSale=false">Close</v-btn>
        <v-btn color="green darken-1" flat @click.native="modal.addSale=false">OK</v-btn>
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
            modal: {
                addSale : false,
            },


            page: 1



        }
    },
    
    
    
    
    // ========== created ========== //
    created() {
        
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
