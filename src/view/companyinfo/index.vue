<template>
  <div id="companyInfo" v-cloak v-if="loaded">
    <companyinfo-edit v-if="isEdit" :form="companyInfo" :reload="load"></companyinfo-edit>
    <companyinfo-show :form="companyInfo" :toggleEdit="toggleEdit" v-else></companyinfo-show>
  </div>
</template>

<script>
  import CompanyinfoEdit from './companyinfo-edit'
  import CompanyinfoShow from './companyinfo-show'

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
          signFile: ''
        }
      }
    },
    mounted: function () {
      this.load()
    },
    methods: {
      load: function () {
        this.$api.get('/ent/json', null,
          resj => {
            let data = resj.data
            data.ent_type ? data.ent_type = data.ent_type.split(',') : data.ent_type = []
            data.ent_id ? this.isEdit = false : this.isEdit = true
            data.ent_commission = data.tails.contract[0].sign_file
            data.signFile = data.tails.sign.sign_file
            data.signFileId = data.tails.sign.pk_sign
            data.signFile_status = data.tails.sign.sign_status
            this.companyInfo = Object.assign({}, this.companyInfo, data)
            this.loaded = true
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
