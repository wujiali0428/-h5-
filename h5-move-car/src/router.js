import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddressDetail from './views/AddressDetail.vue'
import AddressAll from './views/AddressAll.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '码上挪车',
      component: Home
    },
    {
      path: '/AddressDetail',
      name: '添加收货地址',
      component: AddressDetail
    },
    {
      path: '/Address',
      name: '立即兑换',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Address.vue')
    },
    {
      path: '/AddressAll',
      name: '选择收货地址',
      component: AddressAll
    }
  ]
})
