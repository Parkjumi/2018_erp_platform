import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Test',
        component: () => import('@/components/CommonTest/Test')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('@/components/CommonTest/Main')
    },
    { // ===== 주문 관리 ===== //
        path: '/order',
        name: 'OrderContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'list',
                name: 'OrderContainer.List',
                component: () => import('@/components/OrderContainer/List')
            },
            {
                path: 'list/detail/:order_id',
                name: 'OrderContainer.Detail',
                component: () => import('@/components/OrderContainer/Detail')
            },
            // {
            //     path: 'product',
            //     name: 'OrderContainer.ProductList',
            //     component: () => import('@/components/OrderContainer/ProductList')
            // },
            // {
            //     path: 'return',
            //     name: 'OrderContainer.Return',
            //     component: () => import('@/components/OrderContainer/Return')
            // },
            {
                path: 'setting',
                name: 'OrderContainer.Setting',
                component: () => import('@/components/OrderContainer/Setting')
            },
            {
                path: 'append',
                name: 'OrderContainer.Append',
                component: () => import('@/components/OrderContainer/Append')
            },
            {
                path: 'returnAppend',
                name: 'OrderContainer.Append',
                component: () => import('@/components/OrderContainer/ReturnAppend')
            }
        ]
    },
    { // ===== 재고 관리 ===== //
        path: '/inventory',
        name: 'InventoryContainer',
        component: () => import('@/components/Dashboard/Layout'),
        children: [
            {
                path: 'area',
                name: 'InventoryContainer.AreaManagement',
                component: () => import('@/components/InventoryContainer/AreaManagement')
            },
            {
                path: 'list',
                name: 'InventoryContainer.SrList',
                component: () => import('@/components/InventoryContainer/SrList')
            },
            {
                path: 'srmanagement',
                name: 'InventoryContainer.SrManagement',
                component: () => import('@/components/InventoryContainer/SrManagement')
            },
            {
                path: 'stock',
                name: 'InventoryContainer.StockStatus',
                component: () => import('@/components/InventoryContainer/StockStatus')
            }
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
                path: 'category',
                name: 'ProductContainer.CategorySetting',
                component: () => import('@/components/ProductContainer/CategorySetting')
            },
            {
                path: 'product',
                name: 'ProductContainer.Product',
                component: () => import('@/components/ProductContainer/Product')
            },
            {
                path: 'list/detail/:product_id',
                name: 'ProductContainer.Detail',
                component: () => import('@/components/ProductContainer/Detail')
            },
            {
                path: 'apply',
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

                },

            { // === 가입신청목록 === //
                path: 'applicant',
                name: 'CustomerContainer.ApplicantList',
                component: () => import('@/components/CustomerContainer/ApplicantList'),

            },

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
                path: 'list',
                name: 'EmployeeContainer.employeeList',
                component: () => import('@/components/EmployeeContainer/employeeList')
            },
            {
                path: 'append',
                name: 'EmployeeContainer.appendEmployee',
                component: () => import('@/components/EmployeeContainer/appendEmployee')
            },
            {
                path: 'detail',
                name: 'EmployeeContainer.detailEmployee',
                component: () => import('@/components/EmployeeContainer/detailEmployee')
            },
        ]
    },
]

export default new VueRouter({
    mode: 'history',
    routes
})
