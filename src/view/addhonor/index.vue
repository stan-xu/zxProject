<template>
  <div id="addhonor">
    <h3><i class="fa fa-trophy colorin"></i> 荣誉资料</h3>
    <div class="honorform">
      <el-form :model="honorForm" :rules="rules" ref="honorForm" label-width="100px">
      <el-form-item label="荣誉名称" prop="honor_name">
        <el-input v-model="honorForm.honor_name"></el-input>
      </el-form-item>
      <el-form-item label="荣誉图片" prop="honor_pic">
        <el-upload
          class="upload-demo"
          :action="baseUrl+'/uploadify/uploadimg'"
          drag
          name="imgFile"
          :limit="1"
          :headers="uploadImgHeader"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-exceed="handleExceed"
          :file-list="imgList"
          list-type="picture">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('honorForm')">提交</el-button>
          <el-button @click="resetForm('honorForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        },
        honorForm: {
          honor_name: '',
          honor_pic: ''
        },
        rules: {
          honor_name: [
            { required: true, message: '请输入荣誉名称', trigger: 'blur' }
          ],
          honor_pic: [
            { required: true, message: '请上传图片', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              '/honor/save',
              this.honorForm,
              resj => {
                alert(resj.message)
              }
            )
          } else {
            console.log('请确认信息填写正确!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      handleSuccess (resj) {
        if (resj.code) { // 未成功
          alert(resj.message)
        } else {
          this.honorForm.honor_pic = resj.fileId
        }
      },
      handleError () {
        alert('图片上传失败，请重试!')
      },
      handleExceed () {
        alert('超出图片上传个数限制!')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #addhonor{
    width: 1160px;
    padding: 40px;
    margin: -20px auto 0;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    h3{
      font-weight: bold;
      .colorin{
        color: #d8bd21;
      }
    }
    .honorform{
      width: 720px;
      margin: 50px auto 0;
    }
  }
</style>

