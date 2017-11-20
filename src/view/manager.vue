<template>
  <div id="manager" class="container">
    content view
    <el-row>
      <el-col :span="6">
        <ul>
          <li><router-link to="/manager/productManager">product</router-link></li>
        </ul>
      </el-col>
      <el-col :span="18">
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
