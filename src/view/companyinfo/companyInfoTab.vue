<template>
  <div class="company-info-tab" v-show="loaded">
    <el-alert
      :title="'企业信息审核未通过：'+(this.form.approvetext||'无')"
      type="error"
      show-icon
      v-if="this.form.status==='审核未通过'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="企业信息审核中,请耐心等待"
      type="warning"
      show-icon
      v-if="this.form.status==='审核中'"
      class="status-alert">
    </el-alert>
    <el-alert
      title="企业信息审核已通过，完成电子合同委托书与营业执照提交后前往资质认证进行企业资质认证"
      type="success"
      show-icon
      v-if="this.form.status==='审核已通过'"
      class="status-alert">
    </el-alert>
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="form" ref="companyForm" :rules="rules" label-width="140px" v-if="isEdit">
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
              <el-checkbox :label="(index+1).toString()" name="ent_type" v-for="(type, index) in entTypeList"
                           :key="index">
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
          <el-form-item label="企业法人" prop="ent_corporation">
            <el-input v-model="form.ent_corporation"></el-input>
          </el-form-item>
          <el-form-item label="企业法人联系方式" prop="corporation_phone">
            <el-input v-model="form.corporation_phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="form" label-width="140px" v-else>
          <el-form-item label="企业Logo">
            <img class="img-responsive" :src="this.baseUrl + '/uploadify/renderFile/'+form.ent_logo" width="178"
                 height="178" v-if="form.ent_logo">
          </el-form-item>
          <el-form-item label="公司名称">
            {{form.ent_name}}
          </el-form-item>
          <el-form-item label="统一社会信用代码">
            {{form.ent_id}}
          </el-form-item>
          <el-form-item label="商标">
            {{form.trademark}}
          </el-form-item>
          <el-form-item label="企业类型">
            <template v-for="item in form.ent_type">
              {{entTypeList[item - 1]}}
            </template>
          </el-form-item>
          <el-form-item label="主营业务">
            {{form.ent_major}}
          </el-form-item>
          <el-form-item label="所在地区">
            {{form.ent_region}}
          </el-form-item>
          <el-form-item label="企业地址">
            {{form.ent_addr}}
          </el-form-item>
          <el-form-item label="联系电话">
            {{form.ent_phone}}
          </el-form-item>
          <el-form-item label="电子邮箱">
            {{form.ent_email}}
          </el-form-item>
          <el-form-item label="公司简介">
            {{form.ent_produce}}
          </el-form-item>
          <el-form-item label="企业法人">
            {{form.ent_corporation}}
          </el-form-item>
          <el-form-item label="企业法人联系方式">
            {{form.corporation_phone}}
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="toggleEdit" v-if="form.status!=='审核中'">
              编辑
            </el-button>
            <router-link to="/home/qualification" v-if="form.status==='审核已通过'">
              <el-button type="primary">下一步</el-button>
            </router-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RegionPicker from 'region-picker'
  import data from 'region-picker/dist/data.json'
  import LogoUpload from './logo-upload'

  export default {
    name: 'company-info-tab',
    components: {
      LogoUpload,
      RegionPicker
    },
    data () {
      return {
        formUrl: '/ent/update',
        loaded: '',
        form: {
          ent_logo: '',
          ent_id: '',
          ent_type: [],
          ent_region_id: '',
          ent_addr: '',
          ent_phone: '',
          ent_email: '',
          ent_corporation: '',
          corporation_phone: '',
          signFile: '',
          signFile_status: '',
          signFileId: ''
        },
        regionData: data,
        entTypeList: ['房地产企业', '消防产品厂家', '消防设计单位', '消防施工单位', '消防技术服务机构', '社会单位'],
        rules: {
          ent_logo: [{required: true, message: '请上传企业Logo', trigger: 'submit'}],
          ent_id: [{required: true, message: '请输入统一社会信用代码', trigger: 'submit'}],
          ent_type: [{required: true, message: '请选择企业类型', trigger: 'submit'}],
          ent_region_id: [{required: true, message: '请输入所在地区', trigger: 'submit'}],
          ent_addr: [{required: true, message: '请输入企业地址', trigger: 'submit'}],
          ent_phone: [{required: true, message: '请输入联系电话', trigger: 'submit'}],
          ent_email: [{type: 'email', message: '请输入电子邮箱', trigger: 'submit'}],
          ent_corporation: [{required: true, message: '请输入企业法人', trigger: 'submit'}],
          corporation_phone: [{required: true, message: '请输入企业法人联系方式', trigger: 'submit'}]
        },
        isEdit: true
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/ent/json', null,
          resj => {
            let data = resj.data
            if (data.ent_id) {
              this.isEdit = false
              data.ent_type = data.ent_type.split(',')
              this.form = Object.assign({}, this.companyInfo, data)
            } else {
              this.isEdit = true
            }
            this.loaded = true
          }
        )
      },
      submit () {
        this.$refs.companyForm.validate((valid) => {
          if (valid) {
            this.form.ent_region = this.$refs.regionPick.getCityByAdcode(this.form.ent_region_id).fullName.replace(/\s\/\s/g, '')
            this.$api.post(this.formUrl, this.form,
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
      }
    }
  }
</script>

<style lang="scss">
  #company-info-tab {
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
