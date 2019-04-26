import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

axios.interceptors.response.use(function (response) {
    return response 
}, function (error) {
    window.location.href = '#/login'
    return Promise.reject(error) 
})


router.beforeEach((to, from, next) => {
    if ('/login' != to.fullPath) {
        let username = localStorage.getItem('ms_username');
        if (username && username != 'undefined') {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/login',
                query: {}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
})

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');