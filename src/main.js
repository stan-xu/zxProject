// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './style/base/element-variables.scss'
import VueAreaLinkage from 'vue-area-linkage'
// 引用API文件
import api from './api'
// 绑定API方法到全局
Vue.prototype.$api = api
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
