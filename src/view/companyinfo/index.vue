<template>
  <div id="companyInfo" v-cloak v-show="loaded">
    <el-alert
      :title="'营业执照审批未通过：'+resonText(this.signInfo.approve_text)"
      type="error"
      show-icon
      v-if="this.signInfo.sign_status==='未审批'"
      class="refuseResson">
    </el-alert>
    <el-alert
      :title="'电子合同委托书审批未通过：'+resonText(this.contractInfo.audit_text)"
      type="error"
      show-icon
      v-if="this.contractInfo.contract_state==='审核未通过'"
      class="refuseResson">
    </el-alert>
    <el-tabs v-model="activeName">
      <el-tab-pane label="企业信息" name="company">
        <el-alert
          :title="'企业信息审批未通过：'+resonText(this.companyInfo.approvetext)"
          type="error"
          show-icon
          v-if="this.companyInfo.status==='不通过'"
          class="refuseResson">
        </el-alert>
        <company-info-tab></company-info-tab>
      </el-tab-pane>
      <el-tab-pane label="电子合同委托书" name="contract">
          <contract-info-tab></contract-info-tab>
      </el-tab-pane>
      <el-tab-pane label="营业执照" name="sign">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'
  import CompanyInfoTab from './companyInfoTab'
  import ContractInfoTab from './contractInfoTab'

  export default {
    name: 'companyInfo',
    components: {
      ContractInfoTab,
      CompanyInfoTab
    },
    data () {
      return {
        activeName: 'contract',
        isEdit: {
          company: false,
          contract: false,
          sign: false
        },
        loaded: false,
        companyInfo: {
          ent_logo: '',
          ent_id: '',
          ent_type: '',
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
        signInfo: '',
        contractInfo: ''
      }
    },
    mounted () {
      this.load()
      EventBus.$emit('setHomeHeader', '企业信息')
    },
    computed: {},
    methods: {
      load () {
        this.$api.get('/ent/json', null,
          resj => {
            let data = resj.data
            this.loaded = true
            // 企业信息赋值
            if (data.ent_id) {
              this.isEdit.company = false
              data.ent_type = data.ent_type.split(',')
              this.companyInfo = Object.assign({}, this.companyInfo, data)
            } else {
              this.isEdit.company = true
            }
            if (data.tails.contract.length) {
              this.isEdit.contract = false
              this.contractInfo = data.tails.contract[0]
            } else {
              this.isEdit.contract = true
            }
            if (data.tails.sign) {
              this.isEdit.sign = false
              this.signInfo = data.tails.sign
            } else {
              this.isEdit.sign = true
            }
          }
        )
      },
      toggleEdit () {
        console.log(2)
        this.isEdit.company = true
      },
      resonText (text) {
        return text || '无'
      }
    }
  }
</script>

<style lang="scss">
  #companyInfo {
    [v-cloak] {
      display: none;
    }

    .refuseResson {
      margin-bottom: 10px;
    }
  }
</style>
