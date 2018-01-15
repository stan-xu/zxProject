<template>
  <div id="addproject">
    <h3><i class="fa fa-building colorin"></i> 项目资料</h3>
    <div class="projectform">
      <el-form label-position="right" label-width="130px" :model="projectForm" :rules="rules">
        <el-form-item label="项目名称" prop="case_name">
          <el-input v-model="projectForm.case_name"></el-input>
        </el-form-item>
        <el-form-item label="项目地址" prop="case_address">
          <el-input v-model="projectForm.case_address"></el-input>
        </el-form-item>
        <el-form-item label="建筑总面积" prop="case_floorarea">
          <el-input v-model="projectForm.case_floorarea">
            <template slot="append">m²</template>
          </el-input>
        </el-form-item>
        <el-form-item label="建筑高度" prop="case_floor">
          <el-input v-model="projectForm.case_floor">
            <template slot="append">层</template>
          </el-input>
        </el-form-item>
        <el-form-item label="项目简介" prop="case_introduction">
          <el-input v-model="projectForm.case_introduction" type="textarea" :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="项目展示封面图" prop="case_mainpic">
          <el-upload
            ref="imgMainUpload"
            drag
            :action="baseUrl+'/uploadify/uploadimg'"
            name="imgFile"
            :limit="1"
            :headers="uploadImgHeader"
            :file-list="imgMainList"
            :before-upload="handleBeforeUpload"
            :on-remove="handleOnRemoveMain"
            :on-success="handleSuccessMain"
            :on-error="handleError"
            :on-exceed="handleExceed"
            list-type="picture">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              <el-alert
                title="只能上传一张jpg/png文件，且不超过2M"
                type="warning"
                :closable="false">
              </el-alert>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="企业细节图" prop="case_pic">
          <el-upload
            ref="imgUpload"
            drag
            :action="baseUrl+'/uploadify/uploadimg'"
            name="imgFile"
            :limit="12"
            :headers="uploadImgHeader"
            :file-list="imgList"
            :before-upload="handleBeforeUpload"
            :on-remove="handleOnRemove"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-exceed="handleExceed"
            list-type="picture">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              <el-alert
                title="只能上传jpg/png文件，且不超过2M，最多12张"
                type="warning"
                :closable="false">
              </el-alert>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('projectForm')">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AddProject',
    data () {
      return {
        path: '/case/save', // 添加接口
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        },
        projectForm: {
          case_name: '',
          case_address: '',
          case_floorarea: '',
          case_floor: '',
          case_introduction: '',
          case_mainpic: '',
          case_pic: []
        },
        rules: {
          case_name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          case_address: [
            { required: true, message: '请输入项目地址', trigger: 'blur' }
          ],
          case_floorarea: [
            { required: true, message: '请输入建筑总面积', trigger: 'blur' }
          ],
          case_floor: [
            { required: true, message: '请输入建筑高度', trigger: 'blur' }
          ],
          case_introduction: [
            { required: true, message: '请输入项目简介', trigger: 'blur' }
          ],
          case_mainpic: [
            { required: true, message: '请上传项目展示封面图', trigger: 'change' }
          ],
          case_pic: [
            { required: true, message: '请上传企业细节图', trigger: 'change' }
          ]
        },
        imgMainList: [],
        imgList: []
      }
    },
    methods: {
      infoSet (id) {
        this.caseForm.id = id
        this.$api.get(
          '/case/detail',
          {id},
          resj => {
            this.projectForm.case_name = resj.data.cases.case_name
            this.projectForm.case_address = resj.data.cases.case_address
            this.projectForm.case_floorarea = resj.data.cases.case_floorarea
            this.projectForm.case_floor = resj.data.cases.case_floor
            this.projectForm.case_introduction = resj.data.cases.case_introduction
            this.projectForm.case_mainpic = resj.data.cases.case_mainpic
            this.imgMainList.push({name: this.projectForm.case_name, url: `${this.baseUrl}/uploadify/renderFile/${resj.data.cases.case_mainpic}`})
            resj.data.detailpic.forEach((item, index) => {
              this.projectForm.case_pic.push(item.attach_id)
              this.imgList.push({name: `企业细节图${index}`, url: `${this.baseUrl}/uploadify/renderFile/${item.attach_id}`})
            })
          }
        )
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$api.post(
              this.path,
              this.projectForm,
              resj => {
                this.openMessageBox()
              },
              err => {
                this.$message.error(err.message)
              }
            )
          } else {
            this.$message.error('请确认信息填写正确!')
            return false
          }
        })
      },
      reset () {
        this.resetForm('projectForm')
        this.resetUpload('imgMainUpload')
        this.resetUpload('imgUpload')
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      resetUpload (uploadName) {
        this.$refs[uploadName].clearFiles()
      },
      handleBeforeUpload (file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
          this.$message.error('图片格式错误！')
          return false
        } else if (file.size > 1024 * 1024 * 2) {
          this.$message.error('图片大小超过限制！')
          return false
        } else {
          return true
        }
      },
      handleOnRemoveMain (file, fileList) {
        this.projectForm.case_mainpic = ''
      },
      handleSuccessMain (resj) {
        if (resj.code) { // 未成功
          this.$message.error(resj.message)
        } else {
          this.projectForm.case_mainpic = resj.fileId
        }
      },
      handleOnRemove (file, fileList) {
        let delIndex = 0
        this.projectForm.case_pic.forEach((item, index) => {
          if (item === file.response.fileId) {
            delIndex = index
          }
        })
        this.projectForm.case_pic.splice(delIndex, 1)
      },
      handleSuccess (resj) {
        if (resj.code) { // 未成功
          this.$message.error(resj.message)
        } else {
          this.projectForm.case_pic.push(resj.fileId)
        }
      },
      handleError () {
        this.$message.error('图片上传失败，请重试!')
      },
      handleExceed () {
        this.$message.error('超出图片上传个数限制!')
      },
      openMessageBox () {
        this.$confirm('恭喜您，项目录入已提交成功！', '温馨提示', {
          confirmButtonText: '继续录入',
          cancelButtonText: '返回我的发布'
        }).then(() => {
          this.reset()
        }).catch(() => {
          this.$router.push({path: '/home/publish'})
        })
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
    box-shadow: 0 0 10px #ccc;
    h3{
      font-weight: bold;
      .colorin{
        color: #9c5819;
      }
    }
    .projectform{
      width: 720px;
      margin: 50px auto 0;
    }
  }
</style>
