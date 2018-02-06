<template>
  <div id="logo-carousel" v-loading="loading">
    <el-carousel height="296px">
      <el-carousel-item v-for="(i,index) in pages" :key="index">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item,index) in listInfo[i-1]" :key="index">
            <div  class="item-logo center-block">
              <img :src="baseUrl+'/uploadify/renderThumb/'+item.ent_logo+'/136x136'" alt="" class="img-responsive">
            </div>
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'logo-carousel',
    data () {
      return {
        listInfo: [],
        loading: true,
        pages: 0
      }
    },
    mounted () {
      this.$api.get('/ent/query', {pagesize: 24},
        resj => {
          this.pages = Math.ceil(resj.rows.length / 8)
          for (let i = 0; i < this.pages; i++) {
            this.listInfo[i] = []
            for (let j = 0; j < 8; j++) {
              let item = resj.rows.shift()
              if (item) {
                this.listInfo[i][j] = item
              } else {
                break
              }
            }
          }
          // this.listInfo = resj
          this.loading = false
        })
    }
  }
</script>

<style lang="scss" scoped>
  #logo-carousel{
   padding: 50px;
    .item-logo {
      border: 1px solid #ddd;
      line-height: 136px;
      height: 136px;
      text-align: center;
      margin-bottom: 20px;
      img {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>
