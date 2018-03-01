<template>
  <div id="homepage">
    <home-nav></home-nav>
    <home-banner></home-banner>
    <template v-if="loaded">
      <div class="container" v-if="isLogin">
        <company-list></company-list>
      </div>
      <logo-carousel v-else></logo-carousel>
    </template>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '../../components/myFooter'
  import HomeNav from './homeNav'
  import CompanyList from '../../components/company-list/index'
  import HomeBanner from './homeBanner'
  import LogoCarousel from './logoCarousel'

  export default {
    components: {
      LogoCarousel,
      HomeBanner,
      CompanyList,
      HomeNav,
      MyFooter
    },
    name: 'homepage',
    data () {
      return {
        isLogin: false,
        loaded: false
      }
    },
    mounted () {
      this.$api.get('/account/islogin', null,
        resj => {
          if (resj.message === '未登录') {
            this.isLogin = false
          } else {
            this.isLogin = true
          }
          this.loaded = true
        })
    }
  }
</script>

<style lang="scss">
  #homepage {
    background-color: $white-max;
  }
</style>
