<template>
<v-container style=" ">

<!-- ========== 헤더 ========== -->
<page-header title="배송팀 공지사항 등록" />
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
    <v-layout row cardbox cardbox-body  style="padding:0;">
        <v-flex xs12 md12 >
            <table style="width:94%;" class="td-margin">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tr>
                    <th><h4 class="center-align">공지제목 *</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="공지제목을 입력해 주세요"
                            v-model="notice.title"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">공지시작 일시 *</h4></th>
                    <td>
                      <v-menu
                        ref="menu"
                        :close-on-content-click="false"
                        v-model="menu"
                        :nudge-right="40"
                        :return-value.sync="date"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date"
                          label="시작 일자를 선택하세요"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="startDate" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.menu.save(startDate)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </td>
                    <th><h4 class="center-align">공지종료 일시 *</h4></th>
                    <td>
                      <v-menu
                        ref="menu2"
                        :close-on-content-click="false"
                        v-model="menu2"
                        :nudge-right="40"
                        :return-value.sync="date2"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          v-model="date2"
                          label="종료 일자를 선택하세요"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="ednDate" no-title scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.menu2.save(ednDate)">OK</v-btn>
                        </v-date-picker>
                      </v-menu>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">공지내용 *</h4></th>
                    <td colspan="3">
                        <v-textarea
                          name="input-7-4"
                          label="내용을 입력해주세요"
                          v-model="notice.content"
                          required
                          rows="20"
                        ></v-textarea>
                    </td>
                </tr>
                <tr>
                    <th><h4 class="center-align">비고</h4></th>
                    <td colspan="3">
                        <v-text-field
                            label="내용을 입력해주세요"
                            v-model="notice.remark1"
                            required
                        ></v-text-field>
                    </td>
                </tr>
                <tr>
                  <th><h4 class="center-align">비고2</h4></th>
                  <td colspan="3">
                      <v-text-field
                          label="내용을 입력해주세요"
                          v-model="notice.remark2"
                          required
                      ></v-text-field>
                  </td>
                </tr>
            </table>
        </v-flex>
    </v-layout>
<br>
<v-layout style="text-align: center;">
  <v-flex style="text-align: center">
    <v-btn @click="$router.push('/notice/customer/list')">목록으로</v-btn>
    <v-btn @click="saveNotice()">등록하기</v-btn>
  </v-flex>
</v-layout>
</v-btn>

</div> <!-- ========== 컨텐츠 ========== -->

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
            menu: '',
            menu2: '',
            date:'',
            date2:'',
            modal:{
                taxbill : false
            },
            loading:true,
            notice:[],
            startDate:'', // 시작 일시
            ednDate:'', // 종료 일시
        }
    },
    // ========== created ========== //
    created(){
        setTimeout(()=>{ this.$set(this, 'loading', false) }, 750)
    },

    // ========== methods ========== //
    methods: {
        // ===== 저장 ===== //
        saveNotice(){
          this.$axios.post('http://freshntech.cafe24.com/deboarders',{
            title:this.notice.title,
            startDate:this.startDate,
            ednDate:this.ednDate,
            content:this.notice.content,
            remark1:this.notice.remark1,
            remark2:this.notice.remark2,
          })
          .then(res => {
            alert('저장되었습니다.')
            this.$router.push('/notice/delivery/list')
          })
          .catch((ex) => {
            console.log("Error : ",ex);
          })
        }
    },
}
</script>

<style>
.listItem{
    cursor: pointer;
}

.select-container{
  padding: 0px 5px;
}

</style>
