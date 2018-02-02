<template>
  <div id="homepage">
    <home-nav></home-nav>
    <home-banner></home-banner>
    <div class="container">
      <company-list></company-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '../../components/myFooter'
  import HomeNav from './homeNav'
  import CompanyList from '../../components/company-list/index'
  import HomeBanner from './homeBanner'

  export default {
    components: {
      HomeBanner,
      CompanyList,
      HomeNav,
      MyFooter
    },
    name: 'homepage'
  }
</script>

<style lang="scss">
  #homepage {
    background-color: $white-max;
  }
</style>
