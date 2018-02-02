<template>
  <div id="homepage">
    <home-nav></home-nav>
    <div class="banner-bg"></div>
    <div class="container">
      <company-list></company-list>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader'
  import MyFooter from '../../components/myFooter'
  import HomeNav from './homeNav'
  import CompanyList from '../../components/company-list/index'

  export default {
    components: {
      CompanyList,
      HomeNav,
      MyFooter,
      MyHeader
    },
    name: 'homepage'
  }
</script>

<style lang="scss">
  #homepage {
    background-color: $white-max;
    .banner-bg {
      height: 600px;
      background-image: url('./images/banner-homepage.png');
    }
    .menu{}
  }
</style>
