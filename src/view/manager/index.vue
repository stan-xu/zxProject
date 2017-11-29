<template>
  <div id="manager" class="container">
    <manager-header></manager-header>
    <el-row>
      <el-col :span="6">
        menu
        <ul>
          <li>
            <router-link to="/manager/index">index</router-link>
          </li>
          <li>
            <router-link to="/manager/">product</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="18">
        content
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ManagerHeader from './managerHeader.vue'

  export default {
    components: {ManagerHeader},
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
    background-color: $white-max;
    padding-top: 60px;
  }
</style>
