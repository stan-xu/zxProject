<template>
  <div id="publish">
    <el-tabs v-model="activeName" @tab-click="tabSelect()">
      <el-tab-pane name="project">
        <span slot="label"><i class="fa fa-building"></i> 工程案例</span>
        <div class="container-btn-add">
          <router-link to="/addproject" target="_blank">
            <el-button type="primary" round icon="el-icon-edit">新增工程案例</el-button>
          </router-link>
        </div>
        <el-table
          :data="projectData"
          border
          style="width: 100%"
          :header-cell-style="centerStyle"
          :cell-style="centerStyle">
          <el-table-column
            label="项目图片"
            width="180">
            <template slot-scope="scope">
              <img :src="scope.row.case_mainpic"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="case_name"
            label="项目名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="creat_time"
            label="发布日期">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <router-link :to="'/changeproject/'+scope.row.id" target="_blank">
                <el-button type="text">修改</el-button>
              </router-link>
              <el-button @click="delFun(scope.row.id)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="container-pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="projectTotal"
            @current-change="pageChange">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane name="honor">
        <span slot="label"><i class="fa fa-trophy"></i> 企业荣誉</span>
        <div class="container-btn-add">
          <router-link to="/addhonor" target="_blank">
            <el-button type="primary" round icon="el-icon-edit">新增企业荣誉</el-button>
          </router-link>
        </div>
        <el-table
          :data="honorData"
          border
          style="width: 100%"
          :header-cell-style="centerStyle"
          :cell-style="centerStyle">
          <el-table-column
            label="荣誉图片"
            width="180">
            <template slot-scope="scope">
              <img :src="scope.row.honor_pic"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="honor_name"
            label="荣誉名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="发布日期">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <router-link :to="'/changehonor/'+scope.row.id" target="_blank">
                <el-button type="text">修改</el-button>
              </router-link>
              <el-button @click="delFun(scope.row.id)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="container-pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="honorTotal"
            @current-change="pageChange">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="hadProductTab" name="product">
        <span slot="label"><i class="fa fa-fire-extinguisher"></i> 消防产品</span>
      </el-tab-pane>
    </el-tabs>
    <el-input class="search-input" placeholder="请输入内容" v-model="searchText" @keyup.enter.native="search()">
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    name: 'publish',
    mounted () {
      this.getMeberInfo()
      this.getProjectList()
    },
    data () {
      return {
        activeName: 'project', // 当前标签的name属性
        hadProductTab: false,
        searchText: '',
        centerStyle: { textAlign: 'center' },
        projectData: [],
        projectTotal: 0,
        honorData: [],
        honorTotal: 0,
        productData: [],
        productTotal: 0,
        paramsObj: {
          project: {
            case_name: '',
            page: '',
            pagesize: 10
          },
          honor: {
            honor_name: '',
            page: '',
            pagesize: 10
          },
          product: {
            product_name: '',
            page: '',
            pagesize: 10
          }
        }
      }
    },
    methods: {
      getMeberInfo () {
        this.$api.get(
          '/ent/json',
          null,
          resj => {
            if (resj.data.ent_type.indexOf('2') !== -1) {
              this.hadProductTab = true
            }
          }
        )
      },
      getProjectList () {
        this.$api.get(
          '/cases/view?',
          this.paramsObj.project,
          resj => {
            this.projectData = resj.data.rows.map((item, index) => {
              item.case_mainpic = `${this.baseUrl}/uploadify/renderThumb/${item.case_mainpic}/90x90`
              return item
            })
            this.projectTotal = parseInt(resj.data.records)
          }
        )
      },
      getHonorList () {
        this.$api.get(
          '/honor/listHonor?',
          this.paramsObj.honor,
          resj => {
            this.honorData = resj.data.rows.map((item, index) => {
              item.honor_pic = `${this.baseUrl}/uploadify/renderThumb/${item.honor_pic}/90x90`
              return item
            })
            this.honorTotal = parseInt(resj.data.records)
          }
        )
      },
      getProductList () {
        this.$api.get(
          '/product/view?',
          this.paramsObj.product,
          resj => {
            this.productData = resj.data.rows
            this.productTotal = parseInt(resj.data.records)
          }
        )
      },
      loadList () {
        switch (this.activeName) {
          case 'project':
            this.getProjectList()
            break
          case 'honor':
            this.getHonorList()
            break
          case 'product':
            this.getProductList()
            break
          default:
            break
        }
      },
      tabSelect () {
        this.searchText = ''
        this.loadList()
      },
      search () {
        switch (this.activeName) {
          case 'project':
            this.paramsObj.project.case_name = this.searchText
            break
          case 'honor':
            this.paramsObj.honor.honor_name = this.searchText
            break
          case 'product':
            this.paramsObj.product.product_name = this.searchText
            break
          default:
            break
        }
        this.loadList()
      },
      pageChange (page) {
        this.paramsObj[this.activeName].page = page
        this.loadList()
      },
      changeFun (id) {

      },
      delFun (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let delPath = ''
          switch (this.activeName) {
            case 'project':
              delPath = `/cases/remove?id=${id}`
              break
            case 'honor':
              delPath = `/honor/remove?id=${id}`
              break
            case 'product':
              delPath = `/product/remove/${id}`
              break
            default:
              break
          }
          this.$api.post(
            delPath,
            {},
            resj => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.loadList()
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    filters: {
      ellipsis (text) {
        if (text.length > 11) {
          return `${text.substring(0, 7)}...${text.substring(text.length - 4, text.length)}`
        } else {
          return text
        }
      }
    }
  }
</script>

<style lang="scss">
  #publish{
    position: relative;
    padding: 0 35px 0 20px;
    .container-btn-add{
      text-align: right;
      margin-bottom: 15px;
    }
    .container-pagination{
      text-align: center;
      margin-top: 15px;
    }
    .el-tabs__item{ // tabs样式改写
      height: 60px;
      line-height: 60px;
      font-size: 18px;
    }
    .search-input{
      position: absolute;
      right: 35px;
      top: 10px;
      width: 300px;
    }
  }
</style>
