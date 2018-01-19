<template>
  <div id="upload1" v-cloak v-if="loading">
    <product-table v-if="data!='success'" keyword=''/>
    <el-button v-if="data!='success'" @click="submit" type="primary">确认提交</el-button>
    <entQuaCer v-if="data=='success'"/>
  </div>
</template>

<script>
  import ProductTable from '../../../components/product-table.vue'
  import entQuaCer from '../component/entQuaCer.vue'

  export default {
    components: {
      ProductTable,
      entQuaCer
    },
    name: 'auditinfo2',
    data () {
      return {
        loading: false,
        data: ''
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      submit () {
        this.$api.post('/product/sign', '',
          resj => {
            console.log(resj)
          }
        )
      },
      load () {
        this.$api.get('/entCert/info', '',
          resj => {
          if(resj.message){
            this.data = resj.message
          }
            console.log(this.data)
            this.loading = true
            // if(resj.rows[0].sign_kind)
            // this.level = resj.rows[0].sign_kind
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }

  .tips:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  #newEdit {
    border-top: 2px dotted #ECECEC;
    padding-top: 20px;
  }
</style>
