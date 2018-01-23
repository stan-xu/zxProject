<template>
  <div id="companyInfo" v-cloak v-show="loaded">
    <el-alert
      :title="'企业信息审批未通过：'+this.companyInfo.approvetext"
      type="error"
      show-icon
      v-if="this.companyInfo.status==='不通过'"
      class="refuseResson">
    </el-alert>
    <el-alert
      :title="'营业执照审批未通过：'+this.signInfo.approve_text"
      type="error"
      show-icon
      v-if="this.signInfo.sign_status==='未审批'"
      class="refuseResson">
    </el-alert>
    <el-alert
      :title="'电子合同委托书审批未通过：'+this.commissionInfo.audit_text"
      type="error"
      show-icon
      v-if="this.commissionInfo.contract_state==='审核未通过'"
      class="refuseResson">
    </el-alert>
    <companyinfo-edit v-if="isEdit" :form="companyInfo" :reload="load"></companyinfo-edit>
    <companyinfo-show :form="companyInfo" :toggleEdit="toggleEdit" v-else></companyinfo-show>
  </div>
</template>

<script>
  import CompanyinfoEdit from './companyinfo-edit'
  import CompanyinfoShow from './companyinfo-show'
  import { EventBus } from '../../util/eventBus'
  import ElAlert from 'element-ui/packages/alert/src/main'

  export default {
    name: 'companyInfo',
    components: {
      ElAlert,
      CompanyinfoShow,
      CompanyinfoEdit
    },
    data: function () {
      return {
        isEdit: true,
        loaded: false,
        companyInfo: {
          ent_logo: '',
          ent_id: '',
          ent_type: '',
          ent_region_id: '',
          ent_addr: '',
          ent_phone: '',
          ent_email: '',
          ent_commission: '',
          ent_corporation: '',
          corporation_phone: '',
          signFile: '',
          signFile_status: '',
          signFileId: ''
        },
        signInfo: '',
        commissionInfo: ''
      }
    },
    mounted: function () {
      this.load()
      EventBus.$emit('setHomeHeader', '企业信息')
    },
    methods: {
      load: function () {
        this.$api.get('/ent/json', null,
          resj => {
            let data = resj.data
            data.ent_type ? data.ent_type = data.ent_type.split(',') : data.ent_type = []
            data.ent_id ? this.isEdit = false : this.isEdit = true
            this.loaded = true
            if (data.tails.contract.length) {
              this.commissionInfo = data.tails.contract[0]
              data.ent_commission = data.tails.contract[0].sign_file
            }
            if (data.tails.sign) {
              this.signInfo = data.tails.sign
              data.signFile = data.tails.sign.sign_file
              data.signFileId = data.tails.sign.pk_sign
              data.signFile_status = data.tails.sign.sign_status
            }
            this.companyInfo = Object.assign({}, this.companyInfo, data)
          }
        )
      },
      toggleEdit: function () {
        this.isEdit = true
      }
    }
  }
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }

  .refuseResson {
    margin-bottom: 10px;
  }
</style>
