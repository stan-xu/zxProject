<template>
  <div id="addproject">
    <h3>项目资料</h3>
    <el-form label-position="right" label-width="120px" :model="projectData">
      <el-form-item label="项目名称:">
        <el-input v-model="projectData.name"></el-input>
      </el-form-item>
      <el-form-item label="项目地址:">
        <el-input v-model="projectData.region"></el-input>
      </el-form-item>
      <el-form-item label="建筑总面积:">
        <el-input v-model="projectData.type"></el-input>m²
      </el-form-item>
      <el-form-item label="建筑高度:">
        <el-input v-model="projectData.name"></el-input>层
      </el-form-item>
      <el-form-item label="项目简介:">
        <el-input v-model="projectData.region"></el-input>
      </el-form-item>
      <el-form-item label="项目展示封面图:">
        <el-input v-model="projectData.type"></el-input>
      </el-form-item>
      <el-form-item label="企业细节图:">
        <el-input v-model="projectData.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'AddProject',
    data () {
      return {
        projectData: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  #addproject{
    width: 1160px;
    padding: 40px;
    margin: -20px auto 0;
    background-color: #fff;
  }
</style>
