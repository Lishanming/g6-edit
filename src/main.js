import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import Promise from 'es6-promise';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fonts/iconfont.css';
import $http from './util/http';
import {baseUrl, baseImgUrl} from './config/config'
import $ from 'jquery';

// 使用axios兼容ie9+
Promise.polyfill();
Vue.config.productionTip = false
Vue.use(ElementUI);

//使用mock模拟数据
require('./mock.js');

Vue.prototype.$baseUrl = baseUrl;
Vue.prototype.$baseImgUrl = baseImgUrl;

Vue.prototype.$axios = $http;
Vue.prototype.$ = $;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
