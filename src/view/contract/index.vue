<template>
  <div id="contract">
    <div class="sign">
      <el-table
        id="contract-table"
        v-loading="loading"
        :data="content"
        style="width: 868px">
        <el-table-column
          prop="doc_name"
          label="合同标题">
        </el-table-column>
        <el-table-column
          prop="doc_state"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <a :href="baseUrl+url">
              <el-button type="text">下载合同</el-button>
            </a>
            <el-button type="text" @click="sign(content[0].id)" v-if="content[0].doc_state=='未签署'">签署合同</el-button>
            <apply-bill></apply-bill>
            <pay :payId="content[0].id" :on-success="get_data"></pay>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="合同签署"
        :visible.sync="dialogVisible"
        width="662px">
        <div v-loading="cloading">
          <pdf :src="baseUrl+pdfurl" :page="page" @progress="cloading=false" @num-pages="numPages = $event"></pdf>
          <div class="pdf-btn">
            <el-input-number size="mini" v-model.number="page" :min="1" :max="numPages">
            </el-input-number>
          </div>
          <div class="pdf-total" v-if="numPages > 0">共{{numPages}}页</div>
          <div class="contract-agree">
            <el-checkbox v-model="checkbox" label="agree">同意</el-checkbox>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
    <el-button type="primary" v-if="checkbox==true" @click="signContract(content[0].id)">签署合同</el-button>
    <el-button type="primary" v-if="checkbox==false" disabled>签署合同</el-button>
  </span>
      </el-dialog>
    </div>
    <Matter></Matter>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  import Matter from '../../components/matters'
  import ApplyBill from './apply-bill'
  import { EventBus } from '../../util/eventBus'
  import Pay from './pay'

  export default {
    name: 'contract',
    components: {
      Pay,
      ApplyBill,
      pdf,
      Matter
    },
    data: function () {
      return {
        content: [],
        dialogVisible: false,
        page: 1,
        numPages: 0,
        checkbox: '',
        url: '',
        pdfurl: '',
        loading: false,
        cloading: false,
        num: ''
      }
    },
    mounted () {
      this.get_data()
      EventBus.$emit('setHomeHeader', '合同与付款')
    },
    methods: {
      get_data: function () {
        this.$api.get('/contract/me', {}, (r) => {
          this.content = r.data
          if (this.content.length) {
            this.url = '/contract/download/' + this.content[0].id
            this.pdfurl = '/contract/pdf/' + this.content[0].id
            this.loading = false
          }
        })
      },
      sign: function (id) {
        this.dialogVisible = true
        this.cloading = true
        if (this.num > 0) {
          this.cloading = false
          this.get_data()
        } else {
          this.num = 1
        }
      },
      signContract: function (id) {
        this.$api.get('/contract/mysign/' + id, {}, (r) => {
          this.dialogVisible = false
          this.loading = true
          if (this.content[0].doc_state === '已签署') {
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  #contract {
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    .sign {
      margin-top: 25px;
      margin-bottom: 100px;
      .pdf-btn {
        position: relative;
        text-align: center;
      }
      .pdf-total {
        position: absolute;
        bottom: 140px;
        left: 410px;
        float: left;
      }
      .contract-agree {
        text-align: center;
        margin-top: 20px;
      }
      .el-dialog__footer {
        text-align: center;
      }
      .el-button--text {
        color: #2d2f33;
      }
      #contract-table {
        border: 1px solid #ebeef5;
        text-align: center;
        th {
          text-align: center;
          color: black;
          border-right: 1px solid #ebeef5;
        }
        td {
          border-right: 1px solid #ebeef5;
        }
      }
    }
  }
</style>
