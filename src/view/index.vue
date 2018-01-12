<template>
  <div id="manager" class="container">
    <manager-header></manager-header>
    <el-row>
      <el-col :span="4">
        <manager-menu></manager-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ManagerHeader from '../components/managerHeader.vue'
  import ManagerMenu from '../components/myMenu.vue'

  export default {
    components: {
      ManagerMenu,
      ManagerHeader
    },
    name: 'manager',
    created () {
      this.$api.get('/account/islogin', null,
        resj => {
          if (resj.message === '未登录') {
            this.$router.replace('/login')
          }
        })
    }
  }
</script>

<style lang="scss" scoped>
  #manager {
    min-height: 904px;
    background-color: $white-max;
    padding-top: 60px;
    .router-link-active {
      background-color: red;
    }
  }
</style>
