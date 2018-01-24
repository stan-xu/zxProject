<template>
  <div id="app">
    <warn v-if="isIEVersionSupport()"/>
    <my-header></my-header>
    <router-view/>
  </div>
</template>

<script>
  import myHeader from './components/myHeader.vue'
  import Warn from './components/warn.vue'

  export default {
    name: 'app',
    components: {myHeader, Warn},
    methods: {
      isIEVersionSupport () { // 判断是否是IE10以下版本
        const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
        console.log(userAgent)
        const is10AndLessIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否是包括10及以下的IE浏览器
        if (is10AndLessIE) {
          const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
          reIE.test(userAgent)
          const IEVersion = parseFloat(RegExp['$1'])
          if (IEVersion < 10) {
            return false
          } else {
            return true
          }
        }
      }
    }
  }
</script>

<style>
</style>
