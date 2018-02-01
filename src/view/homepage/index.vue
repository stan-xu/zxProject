<template>
  <div id="homepage">
    <home-nav></home-nav>
    <div class="banner-bg"></div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyHeader from '../../components/myHeader'
  import MyFooter from '../../components/myFooter'
  import HomeNav from './homeNav'

  export default {
    components: {
      HomeNav,
      MyFooter,
      MyHeader
    },
    name: 'homepage'
  }
</script>

<style lang="scss">
  #homepage {
    .banner-bg {
      height: 600px;
      background-image: url('./images/banner-homepage.png');
    }
    .menu{}
  }
</style>
