<template>
  <div id="companyInfo" v-cloak v-show="loaded">
    <companyinfo-edit v-if="isEdit" :form="companyInfo" :reload="load"></companyinfo-edit>
    <companyinfo-show :form="companyInfo" :toggleEdit="toggleEdit" v-else></companyinfo-show>
  </div>
</template>

<script>
  import CompanyinfoEdit from './companyinfo-edit'
  import CompanyinfoShow from './companyinfo-show'
  import {EventBus} from '../../util/eventBus'

  export default {
    name: 'companyInfo',
    components: {
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
          signFile: '',
          signFile_status: '',
          signFileId: ''
        }
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
            console.log(this.loaded)
            console.log(data)
            if (data.tails.contract.length) {
              data.ent_commission = data.tails.contract[0].sign_file
            }
            if (data.tails.sign) {
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
</style>
