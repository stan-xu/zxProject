<template>
  <div id="contract-info-tab" v-show="loaded">
    <el-alert
      :title="'电子合同委托书审批未通过：'+(this.contractInfo.audit_text||'无')"
      type="error"
      show-icon
      v-if="this.contractInfo.contract_state==='审核未通过'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="电子合同委托书审批中,请耐心等待"
      type="warning"
      show-icon
      v-if="this.contractInfo.contract_state==='未审核'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="电子合同委托书审批已通过，完成营业执照与企业信息提交后前往资质认证进行企业资质认证"
      type="success"
      show-icon
      v-if="this.contractInfo.contract_state==='审核已通过'"
      class="status-alert">
    </el-alert>
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="form" ref="contractForm" :rules="rules" label-width="140px" v-if="isEdit">
          <el-form-item label="电子合同委托书" prop="contractId">
            <el-upload
              :action="fileUrl"
              drag
              name="imgFile"
              :limit="1"
              :headers="uploadImgHeader"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :on-error="handleError"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                <el-alert
                  title=""
                  type="warning"
                  :closable="false">
                  请打印<a :href="exampleFilePath" style="color: #1c78ab" target="_blank">电子合同委托书</a>填写完毕后拍照上传
                </el-alert>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="form" ref="contractForm" :rules="rules" label-width="140px" v-else>
          <el-form-item label="电子合同委托书">
            <img :src="this.baseUrl + '/uploadify/renderFile/'+form.contractId" alt="contract" class="img-responsive">
          </el-form-item>
          <el-form-item class="text-center" v-if="contractInfo.contract_state!=='未审核'">
            <el-button type="primary" @click="toggleEdit">编辑</el-button>
            <router-link to="/home/qualification" v-if="contractInfo.contract_state==='审核已通过'">
              <el-button type="primary">下一步</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ElForm from 'element-ui/packages/form/src/form'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import ElButton from 'element-ui/packages/button/src/button'

  export default {
    components: {
      ElButton,
      ElFormItem,
      ElForm
    },
    name: 'contract-info-tab',
    data () {
      return {
        loadUrl: '/contract/info',
        formUrl: '/contract/uploaddoc/',
        exampleFilePath: 'http://cdn.zxzx119.com/2017chinafire.pdf',
        fileUrl: this.baseUrl + '/uploadify/upload',
        loaded: '',
        contractInfo: '',
        form: {
          contractId: ''
        },
        fileList: [],
        rules: {
          contractId: [{required: true, message: '请上传电子合同委托书', trigger: 'submit'}]
        },
        isEdit: true,
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get(this.loadUrl, null,
          resj => {
            if (resj.data) {
              this.contractInfo = resj.data
              this.formUrl = '/contract/updatedoc/'
              this.form.contractId = resj.data.sign_file
              this.fileList.push({name: '电子合同委托书', url: `${this.baseUrl}/uploadify/renderFile/${this.form.contractId}`})
              this.isEdit = false
            } else {
              this.isEdit = true
            }
            this.loaded = true
          })
      },
      submit () {
        this.$refs.contractForm.validate((valid) => {
          if (valid) {
            this.$api.post(this.formUrl + this.form.contractId, null,
              resj => {
                this.load()
              })
          } else {
            return false
          }
        })
      },
      toggleEdit () {
        this.isEdit = true
      },
      handleSuccess (res, file) {
        if (res.error === 0) {
          this.form.contractId = res.fileId
        } else {
          this.$message.error(res.message)
        }
      },
      beforeUpload (file) {
        const isImg = /.(jpg|jpeg|png)$/i.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isImg) {
          this.$message.error('电子合同委托书图片只能是 JPG ，JPEG , PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('电子合同委托书图片大小不能超过 2MB!')
        }
        return isImg && isLt2M
      },
      handleRemove () {
        this.form.contractId = ''
      },
      handleError () {
        this.$message.error('图片上传失败，请重试!')
      },
      handleExceed () {
        this.$message.error('超出图片上传个数限制!')
      }
    }
  }
</script>

<style>
</style>
