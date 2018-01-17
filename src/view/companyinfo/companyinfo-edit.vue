<template>
  <div id="companyinfo-edit">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="form" ref="companyForm" :rules="rules" label-width="140px">
          <el-form-item label="企业Logo" prop="ent_logo">
            <logo-upload :logoId.sync="form.ent_logo"></logo-upload>
          </el-form-item>
          <el-form-item label="公司名称">
            {{form.ent_name}}
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="ent_id">
            <el-input v-model="form.ent_id"></el-input>
          </el-form-item>
          <el-form-item label="商标">
            <el-input v-model="form.trademark"></el-input>
          </el-form-item>
          <el-form-item label="企业类型" prop="ent_type">
            <el-checkbox-group v-model="form.ent_type">
              <el-checkbox :label="index.toString()" name="ent_type" v-for="(type, index) in entTypeList" :key="index">
                {{type}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="主营业务">
            <el-input type="textarea" v-model="form.ent_major" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label="所在地区" prop="ent_region_id">
            <region-picker :data="regionData" placeholder="选择你的所在地区" v-model="form.ent_region_id"
                           ref="regionPick"></region-picker>
          </el-form-item>
          <el-form-item label="企业地址" prop="ent_addr">
            <el-input v-model="form.ent_addr"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="ent_phone">
            <el-input v-model="form.ent_phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="ent_email">
            <el-input v-model="form.ent_email"></el-input>
          </el-form-item>
          <el-form-item label="公司简介">
            <el-input type="textarea" v-model="form.ent_produce" :rows="6"></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="signFile">
            <template v-if="form.signFile">
              <img :src="baseUrl+'/uploadify/renderFile/'+form.signFile" alt="" class="img-responsive">
              <div>{{form.signFile_status}}</div>
            </template>
            <file-upload @file-change="signChange"
                         v-if="form.signFile_status=='审核未通过'||form.signFile_status==''"></file-upload>
          </el-form-item>
          <el-form-item label="电子合同委托书" prop="ent_commission">
            <el-upload
              :action="fileUrl"
              drag
              name="imgFile"
              :limit="1"
              :headers="uploadImgHeader"
              :on-success="handleCommissionSuccess"
              :before-upload="beforeCommissionUpload"
              :on-error="handleError"
              :on-exceed="handleExceed"
              :on-remove="handleCommissionRemove"
              :file-list="commission"
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
          <el-form-item class="text-center">
            <el-button @click="submit" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RegionPicker from 'region-picker'
  import data from 'region-picker/dist/data.json'
  import FileUpload from '../../components/fileUpload/index'
  import LogoUpload from './logo-upload'

  export default {
    name: 'companyinfo-edit',
    components: {
      LogoUpload,
      FileUpload,
      RegionPicker
    },
    props: ['form', 'reload'],
    data: function () {
      return {
        formUrl: '/ent/update',
        commissionUrl: '/contract/uploaddoc/',
        fileUrl: this.baseUrl + '/uploadify/upload',
        signUrl: '/sign/upload',
        regionData: data,
        entTypeList: ['房地产企业', '消防产品厂家', '消防设计单位', '消防施工单位', '消防技术服务机构', '社会单位'],
        rules: {
          ent_logo: [{required: true, message: '请上传企业Logo', trigger: 'submit'}],
          ent_id: [{required: true, message: '请输入统一社会信用代码', trigger: 'submit'}],
          ent_type: [{required: true, message: '请选择企业类型', trigger: 'submit'}],
          ent_region_id: [{required: true, message: '请输入所在地区', trigger: 'submit'}],
          ent_addr: [{required: true, message: '请输入企业地址', trigger: 'submit'}],
          ent_phone: [{required: true, message: '请输入联系电话', trigger: 'submit'}],
          ent_email: [{required: true, message: '请输入电子邮箱', trigger: 'submit'}],
          ent_commission: [{required: true, message: '请上传电子合同委托书', trigger: 'submit'}],
          signFile: [{required: true, message: '请上传营业执照', trigger: 'submit'}]
        },
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        },
        commission: []
      }
    },
    mounted: function () {
      this.commission.push({name: '电子合同委托书', url: `${this.baseUrl}/uploadify/renderFile/${this.form.ent_commission}`})
      if (this.form.ent_commission) { this.commissionUrl = '/contract/updatedoc/' }
      if (this.form.signFile_status === '审核未通过') { this.signUrl = '/sign/update/' }
    },
    computed: {},
    methods: {
      signChange (file) {
        this.form.signFile = file
      },
      submitStepOne (callback) {
        this.$api.post(this.commissionUrl + this.form.ent_commission, null,
          resj => {
            this.commissionUrl = '/contract/updatedoc/'
          })
        let formData = new FormData()
        formData.append('signFile', this.form.signFile)
        formData.append('sign_kind', 1)
        formData.append('sign_type', 19)
        formData.append('pk_sign', this.form.signFileId)
        this.$api.post(this.signUrl, formData,
          resj => {
            this.signUrl = '/sign/update/'
          })
      },
      submit () {
        this.$refs.companyForm.validate((valid) => {
          if (valid) {
            this.form.ent_region = this.$refs.regionPick.getCityByAdcode(this.form.ent_region_id).fullName.replace(/\s\/\s/g, '')
            this.$api.post(this.formUrl, this.form,
              resj => {
                this.reload()
              })
            this.submitStepOne()
          } else {
            return false
          }
        })
      },
      handleCommissionSuccess (res, file) {
        if (res.error === 0) {
          this.form.ent_commission = res.fileId
        } else {
          this.$message.error(res.message)
        }
      },
      beforeCommissionUpload (file) {
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
      handleCommissionRemove () {
        this.form.ent_commission = ''
      },
      handleError () {
        this.$message.error('图片上传失败，请重试!')
      },
      handleExceed () {
        this.$message.error('超出图片上传个数限制!')
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  #companyinfo-edit {
    form {
      margin-top: 20px;
    }
    .el-checkbox-group {
      .el-checkbox {
        float: left;
        width: 150px;
        padding-right: 20px;
        margin: 0;
        padding: 0;
        & + .el-checkbox {
          margin-left: 0;
        }
      }
    }
    .Logo-uploader {
      .el-upload {
        border: 1px dashed #dcdfe6;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        &:hover {
          border-color: $hot-dark;
        }
      }
      .Logo-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .Logo {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .region-picker {
      .picker-menu:hover {
        border-color: $hot-dark;
      }
      .picker-toggle {
        .picker-input-icon {
          top: 13px
        }
        &:hover input, &:focus input {
          border-color: #c0c4cc;
        }
        input {
          transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          border-color: #dcdfe6;
        }
        input:focus {
          border-color: $hot-dark;
        }
        .picker-label {
          line-height: 40px;
        }
      }
    }
  }
</style>
