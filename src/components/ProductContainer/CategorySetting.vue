<template>
<v-container>
  <page-header title="카테고리 설정" />
  <v-container>
    <v-layout>
      <v-flex xs6 style="padding-right:5px;">
        <v-list two-line>
          <template>
            <v-subheader>1차 카테고리<br/>(상위 카테고리 목록)</v-subheader>
            <v-divider></v-divider>
            <v-list-tile
              v-for="(item, index) in category"
              :key="index"
              class="list-tile"
              :class="{active: item.isActive}">
              <v-container>
                <v-layout>
                  <v-flex 
                    class="category-title" 
                    @click="clickCategory(item)"
                    xs6>
                    {{item.item}}
                  </v-flex>
                  <v-flex xs6 style="text-align:right;">
                    <span 
                      class="category-text-btn"
                      @click="modifyCategory(item)">수정</span>
                    &nbsp;
                    <span 
                      class="category-text-btn"
                      @click="deleteCategory(item)">삭제</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile>
            <v-list-tile>
              <v-container>
                <v-layout>
                  <v-flex xs11>
                    <v-form>
                      <v-text-field 
                        label="1차 카테고리"
                        v-model="firstCategory"/>
                    </v-form>
                  </v-flex>
                  <v-flex style="padding: 10px 5px 0px 0px;">
                    <v-btn outline @click="firstCateInput()">입력</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
      <v-flex xs6 style="padding-left:5px;">
        <v-list two-line>
          <template>
            <v-subheader>2차 카테고리<br/>(하위 카테고리 목록)</v-subheader>
            <v-divider></v-divider>
            <v-list-tile
              v-for="(item, index) in subCategory"
              :key="index"
              class="list-tile"
              :class="{active: item.isActive}">
              <v-container>
                <v-layout>
                  <v-flex class="category-title" xs6>
                    {{item.item}}
                  </v-flex>
                  <v-flex xs6 style="text-align:right;">
                    <span class="category-text-btn">수정</span>
                    &nbsp;
                    <span class="category-text-btn">삭제</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile>
            <v-list-tile>
              <v-container>
                <v-layout>
                  <v-flex xs11>
                    <v-form>
                      <v-text-field 
                        label="2차 카테고리"
                        v-model="secondCategory"/>
                    </v-form>
                  </v-flex>
                  <v-flex style="padding: 10px 5px 0px 0px;">
                    <v-btn outline>입력</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile>
          </template>
        </v-list>
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
    SelectItems
  } from '@/components/commons/Form'

  import {
    PageHeader,
    DetailTable,
    ListTable
  } from '@/components/commons/UIComponents'

  export default {
    /* 카테고리 설정 페이지 */
    name: 'CategorySetting',
    components: {
      DetailTable,
      ListTable,
      ButtonToggle,
      DateRange,
      SearchForm,
      PageHeader,
      SelectItems
    },
    data(){
      return {
        firstCategory: '',
        secondCategory: '',
        subCategory: [],
        category: [
          {
            item: '시럽',
            isActive: true,
            subItem: [
              { item: '1883', isActive: true },
              { item: '모닌', isActive: false }, 
              { item: '다빈치', isActive: false }
            ]
          },
          {
            item: '소스',
            isActive: false,
            subItem: [
              { item: '기라델리', isActive: true },
              { item: '다빈치', isActive: false },
              { item: '토라니', isActive: false },
              { item: '포모나', isActive: false }
            ]
          },
          {
            item: '파우더',
            isActive: false,
            subItem: [
              { item: '파멜레온', isActive: true },
              { item: '아임요', isActive: false },
              { item: '세미', isActive: false },
              { item: '타코', isActive: false }
            ]
          }
        ]
      }
    },
    methods: {
      clickCategory: function(item){
        this.subCategory = item.subItem;
      },

      firstCateInput: function(){
        this.category.push({
          item: this.firstCategory,
          isActive: false,
          subItem: []
        });
      },

      secondCateInput: function(){
        if(this.subCategory.item){
          this.subCategory.push({
            item: this.secondCategory,
            isActive: false
          });
        }else{
          alert('1차 카테고리를 선택하세요');
        }        
      },

      modifyCategory: function(item){

      },

      deleteCategory: function(){

      }
    },

    created(){
      this.subCategory = this.category[0].subItem;
    }
  }
</script>
<style scoped>
  .category-text-btn{
    cursor: pointer;
  }

  .category-text-btn:hover{
    text-decoration: underline;
  }

  .list-tile:hover{
    background-color: #ecf4ff;
  }

  .active {
    background-color: #ecf4ff;
  }

  .category-title {
    cursor: pointer;
  }
</style>
