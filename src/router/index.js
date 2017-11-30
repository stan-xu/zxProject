import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Login from '@/view/login'
import Manager from '@/view/manager'
import ProductManager from '@/view/productManager'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/manager',
      component: Manager,
      children: [
        {path: 'product', component: ProductManager},
        {path: 'index', component: Index}
      ]
    }
  ]
})
