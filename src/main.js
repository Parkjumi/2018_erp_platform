// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'

Vue.prototype.$axios = axios
import models from './models'

// let customeSector = ["한식","중식","일식","수산물","분식","닭/오리","양식","패스트푸드","제빵","유흥주점","퓨전요리","커피/음료","음식배달","뷔페","기타음식점"]
// ---> 거래처 업종 option
// let group = ["일반단가","할인단가","관부가세포함가(19.8%)","운송료포함가(5%)","수수료포함가(5%)","최종단가"]
// ---> 단가 그룹 option
// let sales = ["할인1(3%)","할증1(3%)","할증2(5%)","할인2(5%)","10%할인(10%)","1등급가(10%)","1등급가(15%)","10%할증(10%)","13%할인(13%)"]
// ----> 할인/할증율 등급 option
// let transferee = ["유통업자","소매업자","손실량","수출"]
// ----> 수입물품 유통이력 정보 - 양수자유형 option


Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.prototype.$models = models // 데이터

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
