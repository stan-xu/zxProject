<template>
  <el-container>
    <el-header>
      <p>(说明：房地产资质等级证书分为一级、二级、三级、四级。</p>
    </el-header>
    <el-main>
      <el-row >
         <el-col :span='6' class='label'><strong>等级类型:</strong></el-col>
         <el-col :span='16'>
              <label class="el-col el-col-6 radio-inline">
                   <input type="radio" name="level" checked id="level1" value="1"> 一级
               </label>
               <label class="el-col el-col-6 radio-inline">
                   <input type="radio" name="level" id="level2"  value="2"> 二级
               </label>
               <label class="el-col el-col-6 radio-inline">
                   <input type="radio" name="level" id="level3" value="3"> 三级
               </label>
               <label class="el-col el-col-6 radio-inline">
                   <input type="radio" name="level" id="level4"  value="4"> 四级
               </label>
         </el-col>
         <el-col :span='2' class='tips'></el-col>
      </el-row>
      <el-row>
          <el-col :span='6' class='label'><strong>资质证书:</strong></el-col>
          <el-col :span='16'>
          </el-col>
          <el-col :span='2' class='tips'></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script>
  export default{
    name:'auditinfo1',
    data(){
      return{

      }
    },
    mounted(){
      this.load()
    },
    methods:{
      load(){

      }
    }
  }
</script>
<style scoped>
  .label{
      text-align:right
  }
  .tips:before {
      color: #FD0000;
      content: '*';
      font-family: sans-serif;
      margin-left: -9px;
   }
   .tips {
      color: #929292;
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 14px;
    }
</style>
