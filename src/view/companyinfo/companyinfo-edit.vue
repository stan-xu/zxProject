<template>
  <div id="companyinfo-edit">
    <el-row>
      <el-col :span="11" :offset="4">
        <el-form :model="form" ref="companyForm" :rules="rules" label-width="140px">
          <el-form-item label="企业Logo">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl+'/uploadify/uploadimg'"
              name="imgFile"
              :headers="uploadImgHeader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司名称">
            {{form.ent_name}}
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="ent_id">
            <el-input v-model="form.ent_id"></el-input>
          </el-form-item>
          <el-form-item label="商标" prop="trademark">
            <el-input v-model="form.trademark"></el-input>
          </el-form-item>
          <el-form-item label="企业类型" prop="ent_type">
            <el-checkbox-group v-model="form.ent_type">
              <el-checkbox :label="index" name="ent_type" v-for="(type, index) in entTypeList" :key="index">
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
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="公司简介">
            <el-input type="textarea" v-model="form.ent_produce" :rows="6"></el-input>
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
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import ElInput from 'element-ui/packages/input/src/input'
  import ElCheckboxGroup from 'element-ui/packages/checkbox/src/checkbox-group'
  import ElCheckbox from 'element-ui/packages/checkbox/src/checkbox'
  import ElButton from 'element-ui/packages/button/src/button'

  export default {
    name: 'companyinfo-edit',
    components: {
      ElButton,
      ElCheckbox,
      ElCheckboxGroup,
      ElInput,
      ElFormItem,
      RegionPicker
    },
    props: ['form', 'reload'],
    data: function () {
      return {
        formUrl: '/ent/update',
        imageUrl: '',
        regionData: data,
        entTypeList: ['房地产企业', '消防产品厂家', '消防设计单位', '消防施工单位', '消防技术服务机构', '社会单位'],
        rules: {
          ent_id: [{required: true, message: '请输入统一社会信用代码', trigger: 'submit'}],
          trademark: [{required: true, message: '请输入公司商标', trigger: 'submit'}],
          ent_type: [{required: true, message: '请选择企业类型', trigger: 'submit'}],
          ent_region_id: [{required: true, message: '请输入所在地区', trigger: 'submit'}],
          ent_addr: [{required: true, message: '请输入企业地址', trigger: 'submit'}],
          ent_phone: [{required: true, message: '请输入联系电话', trigger: 'submit'}],
          email: [{required: true, message: '请输入电子邮箱', trigger: 'submit'}]
        },
        uploadImgHeader: { // 设置接收到json格式的返回值
          'Accept': 'application/json, text/javascript, */*; q=0.01'
        }
      }
    },
    mounted: function () {
    },
    methods: {
      submit () {
        this.$refs.companyForm.validate((valid) => {
          if (valid) {
            this.form.ent_region = this.$refs.regionPick.getCityByAdcode(this.form.ent_region_id).fullName.replace(/\s\/\s/g, '')
            this.$api.post(this.formUrl, this.form,
              resj => {
                this.reload()
              })
          } else {
            return false
          }
        })
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
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
    .avatar-uploader {
      .el-upload {
        border: 2px dashed #dcdfe6;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        &:hover {
          border-color: $hot-dark;
        }
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
</style>
