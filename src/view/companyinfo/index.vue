<template>
  <div id="companyInfo" v-cloak>
    <companyinfo-edit v-if="isEdit" :form="companyInfo" :reload="load"></companyinfo-edit>
    <companyinfo-show v-else></companyinfo-show>
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
          ent_type: [],
          ent_id: ''
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
            this.companyInfo = data
          }
        )
      }
    }
  }
</script>

<style lang="scss">
  [v-cloak] {
    display: none;
  }
</style>
