<template>
  <div id="addhonor">
    <h3><i class="fa fa-trophy colorin"></i> 荣誉资料</h3>
    <div class="honorform">
      <el-form :model="honorForm" :rules="rules" ref="honorForm" label-width="100px">
      <el-form-item label="荣誉名称" prop="name">
        <el-input v-model="honorForm.honor_name"></el-input>
      </el-form-item>
      <el-form-item label="荣誉图片" prop="imgs">
        <el-upload
          class="upload-demo"
          action="/blade/uploadify/uploadimg"
          drag
          name="imgFile"
          :header="uploadImgHeader"
          :on-success="handleSuccess"
          :on-error="handleError"
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
          imgs: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入荣誉名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          imgs: [
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
              '/blade/honor/save',
              {},
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
      handleSuccess (res) {

      },
      handleError () {

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

