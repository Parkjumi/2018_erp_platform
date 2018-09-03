<template>
<v-container style=" ">
    







    <!-- ========== 헤더 ========== -->
    <page-header title="상세보기" />
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

    

<div v-else>

    <div class="cardbox cardbox-header" >
        <h3>브랜드정보</h3>
    </div>
    <v-layout row cardbox cardbox-body >
        <v-flex xs12 md12 >
            <v-card flat class="card--flex-toolbar" color="transparent">
                <v-chip style="margin-left:0;"   color="green" outline >우수기업</v-chip>
                <h1>Brand Name</h1>
                <v-divider></v-divider>
                <p style="margin-top:15px;">
                    <b>브랜드코드</b> : 000-02-01
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <b>등록일</b> : 2018년 01월 23일
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <b>상품수</b> : 45개
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <b>거래처</b> : 23곳
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <b>연락처</b> : 1588-0082
                    &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                    <b>담당자</b> : 까마귀
                </p>
                <v-divider></v-divider>

                <br>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae at tempora eligendi id necessitatibus consectetur veniam doloremque recusandae quasi quos odio et minima ad, debitis, laboriosam corporis! Minima, quisquam amet?
                </p>
                

            </v-card>
        </v-flex>
    </v-layout>
<br>

    <div class="cardbox cardbox-header">
        <h3>거래이력</h3>
    </div>
    <div class="cardbox cardbox-body">
        <!-- <v-chip style="margin-left:0;" v-model="chip3"  color="green" outline >거래 이력</v-chip> -->
        
        <v-data-table

            :headers="headers"
            :items="desserts"
            hide-actions
            class=" "
        >
        
            <template slot="items" slot-scope="props" >
                <tr @click="$router.push('/brands/'+props.item.id)">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(props.item)"
                >
                    delete
                </v-icon>
                </td>
                </tr>
            </template>
        </v-data-table>

    </div>

</div>    
                

    

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
    },
    
    
    
    
    // ========== data ========== //
    data() {
        return {
            loading:true,
            tabs: null,
                tabsItems: [
                    {id: 1, title: 'Indicators', link: 'indicators'},
                    {id: 2, title: 'Backup', link: 'backup'},
                    {id: 3, title: 'Logs', link: 'logs'}
                ],

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
