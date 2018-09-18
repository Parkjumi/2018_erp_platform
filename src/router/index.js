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
    {
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
    {
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
    {
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
            }
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


            // { // === 할인/할증목록 === //
            //     path: 'approval/sale',
            //     name: 'CustomerContainer.SaleList',
            //     component: () => import('@/components/CustomerContainer/SaleList'),
            //
            // },


            // { // === 거래처 예치금관리 === //
            //     path: 'deposit',
            //     name: 'CustomerContainer.DepositList',
            //     component: () => import('@/components/CustomerContainer/DepositList'),
            //
            // },
                // { // === 예치금상세 === //
                //     path: 'deposit/detail/:deposit_id',
                //     name: 'CustomerContainer.DepositDetail',
                //     component: () => import('@/components/CustomerContainer/DepositDetail'),
                //
                // },


            // { // === 결제수단 관리 === //
            //     path: 'payment',
            //     name: 'CustomerContainer.PaymentList',
            //     component: () => import('@/components/CustomerContainer/PaymentList'),
            //
            // },

            // { // === 외상한도 잔액관리 === //
            //     path: 'credit',
            //     name: 'CustomerContainer.Credit',
            //     component: () => import('@/components/CustomerContainer/Credit'),
            //
            // },

            // { // === 견적서 관리 === //
            //     path: 'estimate',
            //     name: 'CustomerContainer.EstimateList',
            //     component: () => import('@/components/CustomerContainer/EstimateList'),
            //
            // },
                // { // === 견적서 상세 === //
                //     path: 'estimate/detail/:est_id',
                //     name: 'CustomerContainer.EstimateDetail',
                //     component: () => import('@/components/CustomerContainer/EstimateDetail'),
                //
                // },

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




    { // ===== 브랜드관리 - seongh7800 ===== //
        path: '/brands',
        name: 'Brand',
        component:()=> import('@/components/Dashboard/Layout'),
        children: [
            // { // === 목록 ==== //
            //     path: 'list',
            //     name: 'BrandList',
            //     component: ()=> import('@/components/BrandContainer/BrandList')
            // },

            // { // === 상품목록 ==== //
            //     path: 'products',
            //     name: 'BrandProducts',
            //     component: ()=> import('@/components/BrandContainer/BrandProducts')
            // },
            //     { // === 상품상세 ==== //
            //         path: 'products/:brand_id',
            //         name: 'BrandProductDetail',
            //         component: ()=> import('@/components/BrandContainer/BrandProductDetail')
            //     },

            // { // === 거래처목록 ==== //
            //     path: 'customers',
            //     name: 'BrandCustomers',
            //     component: ()=> import('@/components/BrandContainer/BrandCustomers')
            // },
            //     { // === 거래처상세 ==== //
            //         path: 'customers/:brand_id',
            //         name: 'BrandCustomerDetail',
            //         component: ()=> import('@/components/BrandContainer/BrandCustomerDetail')
            //     },

            // { // === 입점요청 ==== //
            //     path: 'applicant',
            //     name: 'BrandApplicant',
            //     component: ()=> import('@/components/BrandContainer/BrandApplicant')
            // },

            // { // === 상세 ==== //
            //     path: ':brand_id',
            //     name: 'BrandDetail',
            //     component: ()=> import('@/components/BrandContainer/BrandDetail')
            // },
        ]
    },// ===== 브랜드관리 - seongh7800 ===== //






]

export default new VueRouter({
    mode: 'history',
    routes
})
