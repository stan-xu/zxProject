<template>
    <span id="apply-bill">
      <el-button type="text" @click="billdialog = true">申请发票</el-button>
      <el-dialog
        title="申请发票"
        :visible.sync="billdialog"
        width="700px">
        <el-form :label-position="labelPosition" label-width="100px"  ref="form" :model="form" :rules="rules">
          <el-form-item label="发票抬头：" prop="invoice_rise">
            <el-input v-model="form.invoice_rise" type="text"></el-input>
          </el-form-item>
          <el-form-item label="税号：" prop="tax_num">
            <el-input v-model="form.tax_num" type="text"></el-input>
          </el-form-item>
            <el-form-item label="收件人：" prop="recipient_name">
              <el-input v-model="form.recipient_name" type="text"></el-input>
            </el-form-item>
            <el-form-item label="地址：" prop="recipient_add">
              <el-input v-model="form.recipient_add" type="text"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input v-model="form.phone" type="text"></el-input>
            </el-form-item>
            <el-form-item label="邮编：" prop="zip_code">
              <el-input v-model="form.zip_code" type="text"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="apply_bill('form',id)">提交</el-button>
  </span>
      </el-dialog>
    </span>
</template>

<script>
    export default {
      name: 'apply-bill',
      data: function () {
        var checkPhone = (rule, value, callback) => {
          if (!(/^1[3|4|5|8][0-9]\d{8}$/.test(value))) {
            return callback(new Error('请填写正确的联系电话'))
          } else {
            callback()
          }
        }
        var checkTax = (rule, value, callback) => {
          if (!(/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(value))) {
            return callback(new Error('请填写正确的税号'))
          } else {
            callback()
          }
        }
        return {
          labelPosition: 'right',
          billdialog: false,
          form: {
            invoice_rise: '',
            tax_num: '',
            invoice_type: '',
            recipient_name: '',
            recipient_add: '',
            phone: '',
            zip_code: ''
          },
          rules: {
            invoice_rise: [
              {required: true, message: '请输入发票抬头', trigger: 'submit'}
            ],
            tax_num: [
              {required: true, message: '请输入税号', trigger: 'submit'},
              {validator: checkTax, trigger: 'blur'}
            ],
            invoice_type: [
              {required: true, message: '请输入收件类型', trigger: 'submit'}
            ],
            recipient_name: [
              {required: true, message: '请输入收件人', trigger: 'submit'}
            ],
            recipient_add: [
              {required: true, message: '请输入地址', trigger: 'submit'}
            ],
            phone: [
              {required: true, message: '请输入联系电话', trigger: 'submit'},
              {validator: checkPhone, trigger: 'blur'}
            ],
            zip_code: [
            ]
          }
        }
      },
      methods: {
        apply_bill: function (form, id) {
          this.$refs[form].validate((valid) => {
            if (valid) {
              this.$api.post('/invoice/save?' + 'id=#' + id, this.form, (r) => {
                alert(r.message)
                this.resetForm(form)
                this.dialogVisible = false
              })
            } else {
              return false
            }
          })
        },
        resetForm: function (formName) {
          this.$refs[formName].resetFields()
        }
      }
    }
</script>

<style lang="scss">
#apply-bill{
  .el-dialog__header{
    text-align: left;
  }
  .el-dialog__body{
    margin-left: 50px;
  }
  .el-form-item__content{
    width: 400px;
  }
}
</style>
