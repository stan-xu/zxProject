<template>
  <div id="company-list" v-loading="loading">
    <div class="prefix-hot">热门分类</div>
    <el-tabs v-model="activeName" @tab-click="tabSelect()">
      <el-tab-pane v-for="(item,index) in entTypeList" :name="index.toString()" :label="item" :key="index">
      </el-tab-pane>
    </el-tabs>
    <el-input class="search-input" placeholder="请输入要查询的内容" v-model="form.keywords" @keyup.enter.native="search()">
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
    <list-item v-for="(item,index) in listInfo.rows" :info="item" :key="index"></list-item>
  </div>
</template>

<script>
  import ListItem from './list-item'

  export default {
    components: {ListItem},
    name: 'company-list',
    data () {
      return {
        loadUrl: '/ent/query',
        loading: true,
        activeName: '0',
        entTypeList: ['全部', '房地产企业', '消防产品厂家', '消防设计单位', '消防施工单位', '消防技术服务机构', '社会单位'],
        form: {
          type: '',
          keywords: '',
          page: '',
          pagesize: 20
        },
        listInfo: ''
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        this.$api.get(this.loadUrl, this.form,
          resj => {
            this.listInfo = resj
            this.loading = false
          })
      }
    }
  }
</script>

<style lang="scss">
  #company-list {
    background-color: $white-max;
    .prefix-hot {
      margin-top: 20px;
      border-left: 5px solid $hot-dark;
      padding-left: 10px;
      font-size: 18px;
      font-weight: bold;
    }
    .el-tabs__item { // tabs样式改写
      height: 50px;
      line-height: 50px;
      font-size: 14px;
    }
    .search-input {
      margin-top: -60px;
      float: right;
      width: 300px;
    }
  }
</style>
