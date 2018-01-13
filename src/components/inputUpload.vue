<template>
  <div class="pic-bowl">
      <el-row :gutter="50">
        <el-col style='text-align:center' :span="12"><img class='imgElm' :src="urlImg" alt="">
          <div>
            <label class='el-button el-button-zxzx' :for="fileId">上传</label><input v-on:change="logo_upload" type="file" :id="fileId" name="logo" style="display: none"/>
          </div>
        </el-col>
        <el-col style='text-align:center' :span="12">
          <img class='imgElm' :src="root+example" alt="">
          <p>(示例)</p>
        </el-col>
      </el-row>
      <p>支持上传jpg、jpeg、png的文件，文件大小不超过2MB</p>
  </div>
</template>

<script>
  export default {
    name: 'inputView',
    data () {
      return {
        root: '../../static/images/qualification/',
        urlImg: '../../static/images/qualification/noImg.jpg'
      }
    },
    props: ['example', 'fileId'],
    methods: {
      logo_upload (e) {
        var self = this
        var file = e.target.files[0]
        var fr = new FileReader()
        var type = file.name.substring(file.name.lastIndexOf('.'), file.name.length)
        if (!/.(jpg|jpeg|png)$/i.test(type)) {
          alert('文件格式不正确！')
          return false
        } else if (file.size > (1024 * 1024 * 2)) {
          alert('文件大小不能超过2MB！')
        } else {
          fr.readAsDataURL(file)
          fr.onload = function (e) {
            self.urlImg = this.result
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pic-bowl {
    width:80%;
    margin-left:10%;
    text-align:center
  }
  .el-row {
    border:1px solid #000000;
    padding-top:20px;
  }
  .imgElm {
    width:217px;
    height:136px
  }
  .el-button-zxzx {
    color: #fff;
    background-color: #CA1039;
    border-color: #CA1039;
  }
</style>
