<template>
  <div id="fileUpload">
    <el-row class="upload-panel">
      <el-col :span="12">
        <img :src="urlImg" alt="">
        <div>
          <el-button type="primary" @click="fileSelect()">上传</el-button>
          <input @change="fileChoosed" type="file" ref="file" style="display: none"/>
        </div>
      </el-col>
      <el-col :span="12">
        <img :src="example" alt="">
        <div>(示例)</div>
      </el-col>
    </el-row>
    <p>支持上传jpg、jpeg、png的文件，文件大小不超过2MB</p>
  </div>
</template>

<script>
  export default {
    name: 'fileUpload',
    data () {
      return {
        urlImg: require('./noImg.jpg')
      }
    },
    props: ['example', 'file-change'],
    methods: {
      fileSelect () {
        this.$refs.file.click()
      },
      fileChoosed (e) {
        var self = this
        var file = e.target.files[0]
        // 未选择文件时不触发
        if (file) {
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
            this.$emit('file-change', file)// 更改父组件中的文件数组
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #fileUpload {
    .upload-panel {
      border: 1px solid #cdcdcd;
      border-radius: 4px;
      padding: 20px;
      text-align: center;
      img {
        width: 95%;
        height: 200px
      }
    }
  }
</style>
