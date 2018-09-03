<template>
  <div style="padding:15px;">
    <!-- <h1>공통 컴포넌트 테스트 </h1>
    <hr> -->
    <page-header />
    
    <br>
    <br>
    <v-flex xs12 sm3>
      <h3>검색폼 [값: {{ searchModel }}]</h3>
      <search-form label="검색어를 입력해 주세요" :limit="null" @onSubmit="fucc" v-model="searchModel" />
    </v-flex>
    


    <br>
    <br>
    <v-flex xs12 sm3>
      <h3>옵션 [값: {{ selectedModel }}]</h3>
      <select-items :items="['유형1','유형2', '유형3']" v-model="selectedModel" />
    </v-flex>
    


    <br>
    <br>
    <v-flex xs12 sm3>
        <h3>옵션버튼 [값: {{ toggleModel }}]</h3>
      <button-toggle v-model="toggleModel" :list="[ '전체' , '일별' , '주별', '월별' ]" :default="2" />
    </v-flex>
    


    <br>
    <br>
    <v-flex xs12 sm6>
      <h3>날짜범위 [값: {{ dateModel }}]</h3>
      <date-range v-model="dateModel" />
    </v-flex>
    


    <br>
    <br>
    <v-flex xs12 sm6 style="clear:both;">
      <h3>테이블 </h3>
      <detail-table>
          <!-- <tbody slot="contents">
            <tr>
              <th>11</th>
              <td>11</td>
            </tr>
          </tbody> -->
      </detail-table>
      <list-table>
          <thead slot="headers">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="(item, id)  in  tableData" :key="id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
              </tr>
          </tbody>
      </list-table>
    </v-flex>
    

    <br>
    <br>
    <v-flex xs12 sm6 style="clear:both;">
      <h3>모달 </h3>
      
      
      <v-btn  dark @click.prevent="modal.test=true">Open modal</v-btn>
      <modal 
        title="Sample Modal" 
        width="35%"
        :open="modal.test" 
        @close="modal.test = false" 
        @confirm="modal.test=false">
          
        <p slot="contents">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br>
          Explicabo consequatur cum impedit velit autem perspiciatis qui aut fugit eligendi corporis earum, <br>
          dolorem nisi vitae aliquam soluta, aperiam ullam animi consequuntur.
        </p>

        <!-- <div slot="buttons">
            <v-btn color="green darken-1" flat @click.native="modal.test=false">Close</v-btn>
            <v-btn color="green darken-1" flat @click.native="modal.test=false">OK</v-btn>
        </div> -->
      </modal>
    
      
    </v-flex>

  </div>
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
  TableComp,
  DetailTable,
  ListTable,
  Modal,
} from '../commons/UIComponents'

  export default {
    name: 'Test',


    components: {
      PageHeader,
      SearchForm,
      ButtonToggle,
      DateRange,
      SelectItems,
      TableComp,
      DetailTable,
      ListTable,
      Modal,
    },

    data(){
      return{
        
        searchModel:0,
        toggleModel:null,
        dateModel:null,
        selectedModel:null,

        tableData: [
          { id: 10, name: 'Prod 01', price: 100000 },
          { id: 11, name: 'Prod 02', price: 200000 },
          { id: 12, name: 'Prod 02', price: 200000 },
          { id: 13, name: 'Prod 03', price: 300000 },
        ],

        
        modal: {
          test : false,
        }


      }
    },


    methods: {
      fucc(e){
        alert(e)
      }
    }

  }
  
</script>
<style scoped>

</style>
