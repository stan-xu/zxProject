<template>
  <div>
    <div class="banner-bg">
      <div class="container">
        <router-link to="/register">
          <el-button class="btn-to-register">立即注册</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-banner'
  }
</script>

<style scoped lang="scss">
  .banner-bg {
    height: 600px;
    background-image: url('./images/banner-homepage.jpg');
    position: relative;
  }
  .btn-to-register{
    position: absolute;
    bottom:120px;
    background-color: orange;
    color:$white-max;
    border-color: orange;
  }
</style>
