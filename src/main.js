// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './style/base/element-variables.scss'
import VueAreaLinkage from 'vue-area-linkage'
import 'normalize.css'
import '../static/css/font-awesome.min.css'
import api from './util/api' // 引用API文件

Vue.prototype.$api = api // 绑定API方法到全局
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
