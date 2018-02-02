<template>
  <div id="contract">
    <div class="sign">
      <div v-if="state">
        <el-alert
          title="请先完成电子合同委托书(确保您已经完成企业信息完善及资质认证)"
          type="error"
          show-icon>
        </el-alert>
      </div>
      <el-table
        id="contract-table"
        v-loading="loading"
        :data="content"
        style="width: 925px">
        <el-table-column
          label="合同标题">
          <template slot-scope="scope">
            <a @click="sign(content[0].id)">{{content[0].doc_name}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="doc_state"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="sign(content[0].id)" v-if="content[0].doc_state === '未签署'">签署合同</el-button>
            <div v-if="content[0].doc_state === '已签署'">
              <a :href="baseUrl+url">
                <el-button type="text">下载合同</el-button>
              </a>
              <pay :payId="content[0].id" :on-success="get_data" v-if="!tails.channel"></pay>
              <div v-if="tails.channel =='remittance' && tails.pay_state=='未付款'">付款审核中</div>
              <div v-if="tails.pay_state=='已付款'">
                <apply-bill :applyId="tails.orderid" :on-success="get_data"
                            v-if="tails.invoice_state == '未申请'"></apply-bill>
                <span v-if="tails.invoice_state == '已申请'">发票已申请</span>
                <div v-if="tails.invoice_state == '已开具'">
                  <div>物流公司:{{detail.express_company}}</div>
                  <div>物流单号:{{detail.express_number}}</div>
                </div>
              </div>
            </div>
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
            <div class="pdf-total" v-if="numPages > 0">共{{numPages}}页</div>
          </div>
          <div class="contract-agree">
            <el-checkbox v-model="checkbox" label="agree" v-if="contract.contract_state === '未签署'">同意</el-checkbox>
          </div>
        </div>
        <span slot="footer" class="dialog-footer" v-if="contract.contract_state === '未签署'">
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
    data () {
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
        tails: '',
        detail: '',
        contract: '',
        state: true
      }
    },
    mounted () {
      this.getInfo()
      EventBus.$emit('setHomeHeader', '合同与付款')
    },
    methods: {
      getInfo () {
        this.$api.get('/contract/info', null, (r) => {
          this.contract = r.data
          if (this.contract.contract_state === '未签署' || this.contract.contract_state === '已签署') {
            this.state = false
          } else {
            this.state = true
          }
          this.get_data()
        })
      },
      get_data () {
        this.$api.get('/contract/me', {}, (r) => {
          this.content = r.data
          console.log(this.content)
          if (this.content.length) {
            this.url = '/contract/download/' + this.content[0].id
            this.pdfurl = '/contract/pdf/' + this.content[0].id
            this.tails = this.content[0].tails
            this.loading = false
            this.getTax()
          }
        })
      },
      getTax () {
        this.$api.get('/zxOrder/detail?id=' + this.tails.orderid, null, (r) => {
          this.detail = r.data.tails
          console.log(this.detail)
        })
      },
      sign (id) {
        this.dialogVisible = true
        this.cloading = true
        this.getInfo()
      },
      signContract (id) {
        this.$api.get('/contract/mysign/' + id, {}, (r) => {
          this.dialogVisible = false
          this.loading = true
          this.get_data()
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
        bottom: 2px;
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
    .el-alert {
      width: 925px;
      margin-bottom: 15px;
    }
  }
</style>
