<template>
  <div id="companyInfo" v-cloak>
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
        },
        commissionInfo: '',
        signInfe: ''
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
            this.companyInfo = Object.assign({}, this.companyInfo, data)
          }
        )
        this.$api.get('/contract/info', null,
          resj => {
            this.companyInfo.ent_commission = resj.data.sign_file
          })
        this.$api.get('/sign/mylist/1/19', null,
          resj => {
            this.companyInfo.signFile = resj.rows[0].sign_file
          })
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
