<template>
  <div id="sign-info-tab">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-form :model="form" ref="signForm" :rules="rules" label-width="140px" v-if="isEdit">
          <el-form-item label="营业执照" prop="">
            <file-upload></file-upload>
          </el-form-item>
          <el-form-item class="text-center">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
        <el-form :model="form" label-width="140px" v-else>
          <el-form-item label="营业执照">
            <img :src="this.baseUrl + '/uploadify/renderFile/'+form.signId" alt="sign" class="img-responsive">
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
  import ElForm from 'element-ui/packages/form/src/form'
  import ElFormItem from 'element-ui/packages/form/src/form-item'
  import FileUpload from '../../components/fileUpload/index'

  export default {
    components: {
      FileUpload,
      ElFormItem,
      ElForm
    },
    name: 'sign-info-tab',
    data () {
      return {}
    },
    mounted () {},
    methods: {}
  }
</script>

<style scoped>

</style>
