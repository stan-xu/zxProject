<template>
  <div id="upload1" v-cloak v-if="loading">
    <template v-if="data">
      <el-row class='status'>
        <el-col :span='24'>
          <p>资质证书<span>
              <i v-if='data.sign_status=="审核通过"' style='color:green' class="fa fa-check-circle"></i>
              <i v-if='data.sign_status=="审核未通过"' style='color:red' class="fa fa-times-circle"></i>
              {{data.sign_status}}</span>
          </p>
        </el-col>
        <el-col :span='24' v-if='data.sign_status=="审核未通过"'>
          <el-row>
            <el-col :span='6' class='label'><strong>等级类型:</strong></el-col>
            <el-col :span='16'>
              <el-radio v-model="level" label="1">一级</el-radio>
              <el-radio v-model="level" label="2">二级</el-radio>
              <el-radio v-model="level" label="3">三级</el-radio>
              <el-radio v-model="level" label="4">四级</el-radio>
            </el-col>
            <el-col :span='2' class='tips'></el-col>
          </el-row>
          <el-row>
            <el-col :span='6' class='label'><strong>资质证书:</strong></el-col>
            <el-col :span='16'>
              <inputView :example='example' :fileId='fileId'></inputView>
            </el-col>
            <el-col :span='2' class='tips'></el-col>
          </el-row>
          <el-row>
            <el-col style='text-align:center'>
              <el-button v-on:click="reSubmit" class='el-button-zxzx'>确认重新上传</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </template>
    <template v-if="!data||data.status=='未通过'">
      <p>(说明：房地产资质等级证书分为一级、二级、三级、四级。</p>
      <el-row>
        <el-col :span="20" :offset="1">
          <el-form :model="form" ref="form" labelWidth="140px" :rules="rules">
            <el-form-item label="等级类型" prop="sign_type">
              <el-radio-group v-model="form.sign_type">
                <el-radio v-for="(item,index) in levelLsit" :label="index" :key="index">{{item}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="资质证书" prop="signFile">
              <file-upload :example="example" @file-change="fileChange"></file-upload>
            </el-form-item>
            <el-form-item class="text-center">
              <el-button @click="submit" type="primary">审批提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
  import FileUpload from '../../../components/fileUpload/index.vue'

  export default {
    components: {
      FileUpload
    },
    name: 'auditinfo1',
    data () {
      return {
        levelLsit: ['一级', '二级', '三级', '四级'],
        data: '',  // 已上传的信息
        example: require('./1_cert.png'), // 示例图片,
        addUrl: '/sign/upload',
        updateUrl: '/sign/update/',
        loading: false,
        form: {
          signFile: '',
          sign_type: '',
          sign_kind: 2
        },
        rules: {
          sign_type: [{required: true, message: '请选择证书类型', trigger: 'submit'}],
          signFile: [{required: true, message: '清上传资质证书', trigger: 'submit'}]
        }
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get('/sign/mylist/2/1', '',
          resj => {
            this.data = resj.rows[0]
            this.loading = true
            // if(resj.rows[0].sign_kind)
            // this.level = resj.rows[0].sign_kind
          })
      },
      submit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.data ? this.update() : this.add()
          } else {
            return false
          }
        })
      },
      add () {
        let formData = new FormData()
        formData.append('signFile', this.form.signFile)
        formData.append('sign_kind', this.form.sign_kind)
        formData.append('sign_type', this.form.sign_type)
        this.$api.post(this.addUrl, formData,
          resj => {
            this.load()
          })
      },
      update () {
        let formData = new FormData()
        formData.append('signFile', this.form.signFile)
        formData.append('pk_sign', this.data.pk_sign)
        formData.append('sign_type', this.form.sign_type)
        this.$api.post(this.updateUrl, formData,
          resj => {
            this.load()
          })
      },
      fileChange (file) {
        this.form.signFile = file
      }
    }
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
      font-size: 20px
    }
    span {
      margin: 20px;
      color: rgb(137, 137, 137);
    }
  }
</style>
