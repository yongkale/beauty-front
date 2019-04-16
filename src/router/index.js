import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/editusertable',
                    name: 'editusertable',
                    component: resolve => require(['../components/page/EditUserTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/addemployee',
                    name: 'addemployee',
                    component: resolve => require(['../components/page/AddEmploy.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/empolyeelist',
                    name: 'empolyeelist',
                    component: resolve => require(['../components/page/EmpolyeeList.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/memberList',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                },
                {
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/findBill',
                    component: resolve => require(['../components/page/findBill.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/findMemberBill',
                    component: resolve => require(['../components/page/findMemberBill.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/memberrecharge',
                    component: resolve => require(['../components/page/memberrecharge.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/memberrecost',
                    component: resolve => require(['../components/page/memberrecost.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/billTotal',
                    component: resolve => require(['../components/page/billTotal.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/memberredetail',
                    component: resolve => require(['../components/page/memberredetail.vue'], resolve)    // 拖拽列表组件
                },
                {
                    path: '/editempolyee',
                    component: resolve => require(['../components/page/editempolyee.vue'], resolve)    // 拖拽列表组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
