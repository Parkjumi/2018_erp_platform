import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    // {
    //     path: '/',
    //     name: 'Test',
    //     component: () => import('@/components/CommonTest/Test')
    // },
    {
        path: '/',
        name: 'Main',
        component: () => import('@/components/CommonTest/Main')
    },
    { // ===== 주문 관리 ===== //
        path: '/order',
        name: 'OrderContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'list', // 주문 리스트
                name: 'OrderContainer.List',
                component: () => import('@/components/OrderContainer/List')
            },
            {
                path: 'list/detail/:order_id', // 주문 상세보기
                name: 'OrderContainer.Detail',
                component: () => import('@/components/OrderContainer/Detail')
            },
            {
                path: 'append', // 주문 등록
                name: 'OrderContainer.Append',
                component: () => import('@/components/OrderContainer/Append')
            },
        ]
    },
    { // ===== 매입 관리 ===== //
      path:'/purchase',
      name:'PurchaseContainer',
      component: () => import('@/components/Dashboard/Layout'),
      children:[
        {
          path:'list', // 발주 관리
          name:'PurchaseContainer.List',
          component: () => import('@/components/PurchaseContainer/PurchaseList')
        },
        {
          path: 'list/detail/:order_id', // 발주관리 상세보기
          name:'PurchaseContainer.purchaseDetail',
          component: () => import('@/components/PurchaseContainer/PurchaseDetail')
        },
        {
          path:'append', // 신규 발주 등록
          name:'PurchaseContainer.Append',
          component: () => import('@/components/PurchaseContainer/Append')
        },
        {
          path:'buyerList', // 매입처 관리
          name:'PurchaseContainer.BuyerList',
          component: () => import('@/components/PurchaseContainer/BuyerList')
        },
        {
          path: 'buyer/detail/:buyer_id', // 매입처 관리 상세보기
          name:'PurchaseContainer.buyerDetail',
          component: () => import('@/components/PurchaseContainer/buyerDetail')
        },
        {
          path:'appendBuyer', // 신규 매입처 등록
          name:'PurchaseContainer.AppendBuyer',
          component: () => import('@/components/PurchaseContainer/AppendBuyer')
        },
      ]
    },
    { // ===== 상품관리 ===== //
        path: '/product',
        name: 'ProductContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'product', // 상품 리스트
                name: 'ProductContainer.Product',
                component: () => import('@/components/ProductContainer/Product')
            },
            {
                path: 'list/detail/:product_id', // 상품 상세보기
                name: 'ProductContainer.Detail',
                component: () => import('@/components/ProductContainer/Detail')
            },
            {
                path: 'apply', // 상품 등록
                name: 'ProductContainer.Product',
                component: () => import('@/components/ProductContainer/ProductApply')
            },
        ]
    },

    { // ===== 거래처관리 ===== //
        path: '/customers',
        name: 'CustomerContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            { // === 거래처목록 === //
                path: 'list',
                name: 'CustomerContainer.List',
                component: () => import('@/components/CustomerContainer/List')
            },
            { // === 거래처상세 === //
                path: 'list/detail/:customer_id',
                name: 'CustomerContainer.CustomerDetail',
                component: () => import('@/components/CustomerContainer/CustomerDetail'),
                props: true
            },
            { // === 거래처등록 === //
                path: 'insert',
                name: 'CustomerContainer.CustomerDetail',
                component: () => import('@/components/CustomerContainer/CustomerInsert'),
            }
        ]
    }, // ===== 거래처관리 ===== //
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'indicators',
                name: 'dashboard.indicators',
                component: () => import('@/components/Dashboard/Indicators')
            },
            {
                path: 'backup',
                name: 'dashboard.backup',
                component: () => import('@/components/Dashboard/Backup')
            },
            {
                path: 'logs',
                name: 'dashboard.logs',
                component: () => import('@/components/Dashboard/Logs')
            }
        ]
    },
    { // ===== 직원 관리 ===== //
        path: '/employee',
        name: 'EmployeeContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'list', // 직원 리스트
                name: 'EmployeeContainer.employeeList',
                component: () => import('@/components/EmployeeContainer/employeeList')
            },
            {
                path: 'append', // 직원 등록
                name: 'EmployeeContainer.appendEmployee',
                component: () => import('@/components/EmployeeContainer/appendEmployee')
            },
            {
                path: 'list/detail/:employee_id', // 직원 상세보기
                name: 'EmployeeContainer.detailEmployee',
                component: () => import('@/components/EmployeeContainer/detailEmployee')
            },
        ]
    },

    { // ===== 공지사항 ===== //
        path: '/notice',
        name: 'NoticeContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'customer/list', // 거래처 공지사항 목록
                name: 'NoticeContainer.CustomerNoticeList',
                component: () => import('@/components/NoticeContainer/CustomerNoticeList')
            },
            {
                path: 'customer/append', // 거래처 공지사항 등록
                name: 'NoticeContainer.CustomerNoticeAppend',
                component: () => import('@/components/NoticeContainer/CustomerNoticeAppend')
            },
            {
                path: 'customer/detail/:notice_id', // 거래처 공지사항 수정
                name: 'NoticeContainer.CustomerNoticeDetail',
                component: () => import('@/components/NoticeContainer/CustomerNoticeDetail')
            },
            {
                path: 'delivery/list', // 배송팀 공지사항 목록
                name: 'NoticeContainer.DeliveryNoticeList',
                component: () => import('@/components/NoticeContainer/DeliveryNoticeList')
            },
            {
                path: 'delivery/append', // 배송팀 공지사항 등록
                name: 'NoticeContainer.DeliveryNoticeAppend',
                component: () => import('@/components/NoticeContainer/DeliveryNoticeAppend')
            },
            {
                path: 'delivery/detail/:notice_id', // 배송팀 공지사항 수정
                name: 'NoticeContainer.DeliveryrNoticeDetail',
                component: () => import('@/components/NoticeContainer/DeliveryNoticeDetail')
            },
        ]
    },
    // { // ===== 로그인 ===== //
    //     path: '/login',
    //     name: 'LoginContainer',
    //     component: () => import('@/components/Dashboard/Layout'),
    //     children: [
    //         {
    //             path: 'login', // 로그인
    //             name: 'LoginContainer.login',
    //             component: () => import('@/components/LoginContainer/login')
    //         }
    //     ]
    // },
]

export default new VueRouter({
    mode: 'history',
    routes
})
