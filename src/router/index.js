import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
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
      path: '/manager',
      component: Manager,
      children: [
        {path: '', component: ProductManager}
      ]
    }
  ]
})
