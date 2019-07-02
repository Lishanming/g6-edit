import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Test from './views/test.vue'
// import BaseFlow from './components/BaseFlow.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'BaseFlow',
    //   component: BaseFlow
    // },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
   ]
})
