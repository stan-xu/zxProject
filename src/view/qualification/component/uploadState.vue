<template>
  <el-row id='uploadState' :gutter="20" class='status'>
    <el-col :span='12'><p>{{data.sign_type}}</p></el-col>
    <el-col :span='12'>
      <span>
          <i v-if='data.sign_status=="审核通过"' style='color:green' class="fa fa-check-circle"></i>
          <i v-if='data.sign_status=="审核未通过"' style='color:red' class="fa fa-times-circle"></i>
          {{data.sign_status}}
      </span>
    </el-col>
    <el-col :span='24' v-if='data.sign_status=="审核未通过"'>
        <el-row :gutter="20">
        <el-col :span='12'><p>已上传证书</p></el-col>
        <el-col :span='12'>
          <img :src="imgFile+data.sign_file" alt="">
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'uploadState',
    data () {
      return {
        imgFile: '../../blade/uploadify/renderFile/' // 在线图片地址
      }
    },
    props: ['data']
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .status {
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    text-align: center;
    padding: 20px;
    p {
      margin: 0;
      padding: 0;
      font-size: 20px;
      text-align:right;
    }
    span {
      width: 100%;
      display: block;
      /* margin: 20px; */
      font-size: 20px;
      color: rgb(137, 137, 137);
      text-align:left
    }
    img {
      height:171px;
      display:block;
    }
  }

  .tips:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }
  #uploadState {
    margin-bottom:20px
  }
</style>
