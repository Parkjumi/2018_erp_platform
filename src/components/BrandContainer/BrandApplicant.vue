<template>
<v-container style=" ">

    <!-- ========== 헤더 ========== -->
    <page-header title="브랜드 입점관리" />

    <v-container grid-list-md text-xs-center style="padding:10px 0;">
        <v-layout row wrap>
            
            <!-- 검색 폼 -->
            <v-flex sm3 >
                <search-form label="브랜드 명을 입력해 주세요" />
            </v-flex>

        </v-layout>
        <v-layout row wrap>
            
            <!-- 데이터 -->
            <v-flex sm12>
                

                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    hide-actions
                    class="elevation-1"
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
                <div class="text-xs-center pt-2">
                    <v-pagination  v-model="page" :length="6"></v-pagination>
                </div>


            </v-flex>

        </v-layout>
    </v-container>
    

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
} from '../commons/UIComponents';


export default{
    name : 'BrandApplicant',

    // ========== components ========== //
    components: {
        SearchForm,
        ButtonToggle,
        SelectItems,
        PageHeader,
        ListTable,
    },
    
    
    
    
    // ========== data ========== //
    data() {
        return {

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
