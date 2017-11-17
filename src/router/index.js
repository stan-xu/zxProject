import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/index'
import Content from '@/view/content'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/content/:id',
      component: Content
    }
  ]
})
