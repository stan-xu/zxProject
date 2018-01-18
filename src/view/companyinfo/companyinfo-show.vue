<template>
  <div id="companyinfo-show">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="form" ref="companyForm" label-width="140px">
          <el-form-item label="企业Logo">
            <img class="img-responsive" :src="this.baseUrl + '/uploadify/renderFile/'+form.ent_logo" width="178" height="178">
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
              {{entTypeList[item]}}
            </template>
          </el-form-item>
          <el-form-item label="主营业务">
            {{form.ent_major}}
          </el-form-item>
          <el-form-item label="所在地区" prop="ent_region_id">
            {{form.ent_region}}
          </el-form-item>
          <el-form-item label="企业地址" prop="ent_addr">
            {{form.ent_addr}}
          </el-form-item>
          <el-form-item label="联系电话" prop="ent_phone">
            {{form.ent_phone}}
          </el-form-item>
          <el-form-item label="电子邮箱" prop="ent_email">
            {{form.ent_email}}
          </el-form-item>
          <el-form-item label="公司简介">
            {{form.ent_produce}}
          </el-form-item>
          <el-form-item label="营业执照" prop="signFile">
            <img class="img-responsive" :src="this.baseUrl + '/uploadify/renderFile/'+form.signFile" alt="">
          </el-form-item>
          <el-form-item label="电子合同委托书" prop="ent_commission">
            <img class="img-responsive" :src="this.baseUrl + '/uploadify/renderFile/'+form.ent_commission" alt="">
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="primary" @click="toggleEdit">编辑</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'companyinfo-show',
    props: ['form', 'toggleEdit'],
    data: function () {
      return {
        entTypeList: ['房地产企业', '消防产品厂家', '消防设计单位', '消防施工单位', '消防技术服务机构', '社会单位']
      }
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="scss">
  #companyinfo-show {
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
  }
</style>
