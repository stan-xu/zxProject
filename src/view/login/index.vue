<template>
  <div id="login" class="banner-bg">
    <div class="container v-outter-table" :style="{height:bgHeight+'px'}">
      <el-row  class="v-table-cell">
        <el-col :sm="12" :md="14" :lg="16">
          <img src="./login-text.png" class="img-responsive">
        </el-col>
        <el-col :sm="12" :md="10" :lg="8">2</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        bgHeight: window.innerHeight - 90
      }
    }
  }
</script>

<style lang="scss">
  #login {
    background-image: url('/src/view/login/login-bg.jpg');
  }
</style>
