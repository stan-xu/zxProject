<template>
  <el-container>
    <el-header v-if="data==''">
      <p>(说明：房地产资质等级证书分为一级、二级、三级、四级。</p>
    </el-header>
    <el-main v-if="data==''">
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
            <inputView :example='example' :fileId = 'fileId'></inputView>
          </el-col>
          <el-col :span='2' class='tips'></el-col>
      </el-row>
      <el-row>
          <el-col style='text-align:center'>
            <el-button v-on:click="submit" class='el-button-zxzx'>审批提交</el-button>
          </el-col>
      </el-row>
    </el-main>
    <el-main v-if="data!=''">
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
                  <inputView :example='example' :fileId = 'fileId'></inputView>
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
    </el-main>
  </el-container>
</template>
<script>
  import inputView from '../../../components/inputUpload.vue'
  export default{
    components: {inputView},
    name: 'auditinfo1',
    data () {
      return {
        level: '1', //证书类型，默认值
        sign_kind: '2',// 上传类型
        data: '',  //已上传的信息
        fileId: 'zz', //证书类型
        example:'1_cert.png' //示例图片
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
          //if(resj.rows[0].sign_kind)
          //this.level = resj.rows[0].sign_kind
        },
        err => {
        })
      },
      submit () {
        var formData = new FormData();
        formData.append('signFile',document.querySelectorAll('#'+this.fileId+'')[0].files[0] );
        formData.append('sign_type',this.level);
        formData.append('sign_kind', this.sign_kind);
        this.$api.post('/sign/upload', formData,
        resj => {
          this.$message('resj.message');
          location.reload([false])
        },
        err => {
          alert(resj.message)
        })
      },
      reSubmit () {
        var formData = new FormData();
        formData.append('signFile', document.querySelectorAll('#'+this.fileId+'')[0].files[0]);
				formData.append('pk_sign', this.data.pk_sign);
				formData.append('sign_type', this.level);
        this.$api.post('/sign/update/', formData,
        resj => {
          console.log(resj)
          this.$alert(resj.message, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              location.reload([false])
            }
          });
        },
        err => {
          alert(err.message)
        })
      }
    }
  }
</script>
<style scoped>
  .el-col{
    margin-top:20px
  }
  .label{
    text-align:right
  }
  .tips:before {
      color: #FD0000;
      content: '*';
      font-family: sans-serif;
      margin-left: -9px;
   }
   .tips {
      color: #929292;
      margin-top: 5px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .radio-inline{
      text-align:center
    }
    .el-button-zxzx {
      color: #fff;
      background-color: #CA1039;
      border-color: #CA1039;
    }
    .status {
      border: 1px solid #cdcdcd;
      border-radius: 10px;
      text-align:center;
      padding: 0px 30px 20px;
    }
    .status p{
      margin:0;
      padding:0;
      font-size:20px
    }
    .status span{
      margin:20px;
      color: rgb(137, 137, 137);
    }
</style>
