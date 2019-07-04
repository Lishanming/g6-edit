import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import G6 from '@antv/g6'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/fonts/iconfont.css';
// import Minimap from '@antv/g6/build/minimap'
// import Grid from "@antv/g6/build/grid"
// import Net from "@antv/g6/build/net"


Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.prototype.G6 = G6
// Vue.prototype.Minimap = Minimap
// Vue.prototype.Grid = Grid
// Vue.prototype.Net = Net

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
