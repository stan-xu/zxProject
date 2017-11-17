<template>
  <div id="index">
    <p>index view</p>
    <el-row>
      <el-col :span="8">
        <el-button type="primary">默认按钮</el-button>
      </el-col>
      <el-col :span="8">2</el-col>
      <el-col :span="8">2</el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'index',
    created () {
      this.$api.get('/ent/query', null, r => {
        console.log(r)
      })
    }
  }
</script>

<style lang="scss">
  #index {
    p {
      background-color: red;
    }
  }
</style>
