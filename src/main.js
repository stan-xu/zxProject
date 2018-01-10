// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'normalize.css'
import './style/index.scss'
import '../static/css/font-awesome.min.css'
import api from './util/api' // 引用API文件

Vue.prototype.$api = api // 绑定API方法到全局
Vue.prototype.baseUrl = api.root
Vue.use(ElementUI)
/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    api.get('/account/islogin', null,
      resj => {
        if (resj.message === '未登录') {
          console.log(123)
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          })
        } else {
          next()
        }
      })
  } else {
    next() // 确保一定要调用 next()
  }
}) */
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
