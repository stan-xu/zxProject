<template>
  <div id="homepage">
    <home-nav></home-nav>
    <img src="./images/banner-homepage.jpg" class="img-responsive">
    <div class="banner-bg">
      <div class="container">
        <img src="./images/content.png"  class="img-responsive" alt="">
      </div>
    </div>
    <div class="container">
      <img src="./images/logo-list.png" class="img-responsive" style="margin: 20px 0"/>
      <h1 class="text-center" style="color:#c41335">
        更多详细内容欢迎入驻企业名录！
        <router-link to="/register">
          <el-button type="primary">我要入驻</el-button>
        </router-link>
      </h1>
      <el-carousel style="margin-bottom: 40px" height="410px" :interval="20000">
        <el-carousel-item v-for="i in 3" :key="i">
          <img :src="require('./images/banner-company'+i+'.jpg')" class="img-responsive">
        </el-carousel-item>
      </el-carousel>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '../../components/myFooter'
  import HomeNav from './homeNav'

  export default {
    components: {
      HomeNav,
      MyFooter
    },
    name: 'homepage'
  }
</script>

<style lang="scss">
  #homepage {
    background-color: $white-max;
    .banner-bg {
      background-image: url('./images/bg-content.png');
      position: relative;
      padding: 100px 0;
    }
  }
</style>
