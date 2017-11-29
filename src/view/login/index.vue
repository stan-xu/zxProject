<template>
  <div id="login" class="banner-bg">
    <div class="container v-outter-table" :style="{height:bgHeight+'px'}">
      <el-row  class="v-table-cell">
        <el-col :xs="0" :sm="12" :md="14" :lg="16">
          <img src="./login-text.png" class="img-responsive">
        </el-col>
        <el-col :xs="24" :sm="12" :md="10" :lg="8">
          <login-panel></login-panel>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import LoginPanel from './loginPanel.vue'

  export default {
    components: {LoginPanel},
    name: 'login',
    data () {
      return {
        bgHeight: window.innerHeight - 90
      }
    }
  }
</script>

<style lang="scss" scoped>
  #login {
    background-image: url('/src/view/login/login-bg.jpg');
    img{
      height: 350px;
    }
  }
</style>
