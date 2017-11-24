<template>
  <div id="manager" class="container">
    <el-row>
      <el-col :span="6">
        menu
        <ul>
          <li><router-link to="/manager/index">index</router-link></li>
          <li><router-link to="/manager/">product</router-link></li>
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
  export default {
    name: 'manager'
  }
</script>

<style>
</style>
