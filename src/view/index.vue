<template>
  <div id="index">
    <h1>Index View</h1>
    <router-link to="/manager">manager</router-link>
    <my-footer></my-footer>
    <el-row gutter="20">
      <el-col span="6"> <el-button @click="click(true)" type="primary">Login</el-button></el-col>
      <el-col span="6"><el-button @click="click(false)">Logout</el-button></el-col>
    </el-row>


  </div>
</template>

<script>
  import MyFooter from '../components/myFooter.vue'
  import { EventBus } from '../util/eventBus'

  export default {
    components: {MyFooter},
    name: 'index',
    data () {
      return {
        id: 1,
        list: '',
        form: {
          name: ''
        },
        selected: ''
      }
    },
    created () {
      this.$api.get('/ent/query', null, r => {
        console.log(r)
        this.list = r
      })
    },
    methods: {
      pageChange (val) {
        this.$api.get('/ent/query', {page: val, pagesize: 1}, r => {
          console.log(r)
          this.list = r
        })
      },
      click (value) {
        EventBus.$emit('ifLogin', value)
      }
    }
  }
</script>

<style lang="scss">
  #index {
  }
</style>
