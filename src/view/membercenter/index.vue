<template>
  <div id="memberCenter">
    <el-row v-if="memberInfo">
      <el-col :span="5">
        <img v-if="memberInfo.ent_logo" :src="imgurl+memberInfo.ent_logo" class="img-responsive memberlogo">
        <img src="./images/logo.png" class="img-responsive memberlogo" v-else>
      </el-col>
      <el-col :span="8">
        <div class="info-name">{{memberInfo.ent_name}}</div>
        <el-row class="text-font">
          <el-col :span="12">第
            <span class="text-hot">
              {{new Date().getFullYear()-memberInfo.create_time.substring(0,4)+1}}
            </span>年
          </el-col>
          <el-col :span="12" v-if="entStatus">状态:
            <span :style="{'color':entStatus[ent_state()]}">【{{ent_state()}}】</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <h1 class="welcome">欢迎登录中消在线！</h1>
      </el-col>
    </el-row>
    <el-row v-if="clicked">
      <h2 class="step">现在请你先按照以下步骤进行信息填写</h2>
      <div id="arrowButtonBox">
        <a @click="companyinfo_data()"
           :class="(clicked.step1 != step.step1Pass)? 'arrowButton fcolorUnready':'arrowButton fcolorReady'">
          <div class='arrowText'>
            <p>{{clicked.step1}}</p>
          </div>
        </a>
        <a @click="qualificationinfo_data()"
           :class="(clicked.step2!= step.step2Pass)? 'arrowButton colorUnready':'arrowButton colorReady'">
          <div class='arrowText'>
            <p>{{clicked.step2}}</p>
          </div>
        </a>
        <a @click="contractinfo_data()"
           disabled :class="(clicked.step3!= step.step3Ready)? 'arrowButton colorUnready':'arrowButton colorReady'">
          <div class='arrowText'>
            <p>{{clicked.step3}}</p>
          </div>
        </a>
        <a @click="payinfo_data()"
           disabled :class="(clicked.step4!= step.step4Ready)? 'arrowButton colorUnready':'arrowButton colorReady'">
          <div class='arrowText'>
            <p>{{clicked.step4}}</p>
          </div>
        </a>
      </div>
    </el-row>
  </div>
</template>

<script>
  import { EventBus } from '../../util/eventBus'

  export default {
    name: 'memberCenter',
    data () {
      return {
        memberInfo: '',
        clicked: '',
        imgurl: this.baseUrl + '/uploadify/renderFile/',
        companyurl: '/home/companyinfo/',
        qualificationurl: '/home/qualification/',
        contracturl: '/home/contract',
        noticeurl: '/notice/manager/',
        step: {
          step1UnReady: '企业信息未完善',
          step1Ready: '企业信息已提交',
          step1Pass: '企业信息审核已通过',
          step1NoPass: '企业信息审核未通过',
          step2UnReady: '资质信息未完善',
          step2Ready: '资质信息已提交',
          step2Pass: '资质信息审核已通过',
          step2NoPass: '资质信息审核未通过',
          step3UnReady: '合同未签订',
          step3Ready: '合同已签订',
          step4UnReady: '会员费未付款',
          step4Ready: '会员费已付款'
        },
        entStatus: {
          '未提交': '#909399',
          '审核中': '#c41335',
          '未认证': '#603811',
          '待签约': '#409eff',
          '未交费': '#e6a23c',
          '有效': '#67c23a'
        }
      }
    },
    mounted () {
      this.get_data()
      EventBus.$emit('setHomeHeader', '会员中心')
    },
    methods: {
      get_data () {
        this.$api.get('/home/ent', {}, (r) => {
          this.memberInfo = r
        })
        this.$api.post('/ent/progress', {}, (r) => {
          this.clicked = r.data
          // console.log(this.clicked)
        })
      },
      companyinfo_data () {
        if (this.clicked.step1 !== this.step.step1Pass) {
          this.$router.push({path: this.companyurl})
        }
      },
      qualificationinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 !== this.step.step2Pass) {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      contractinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 === this.step.step2Pass) {
            if (this.clicked.step3 !== this.step.step3Ready) {
              this.$router.push({path: this.contracturl})
            }
          } else {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      payinfo_data () {
        if (this.clicked.step1 === this.step.step1Ready || this.clicked.step1 === this.step.step1Pass) {
          if (this.clicked.step2 === this.step.step2Pass) {
            if (this.clicked.step3 === this.step.step3Ready) {
              if (this.clicked.step4 !== this.step.step4Ready) {
                this.$router.push({path: this.contracturl})
              }
            } else {
              this.$router.push({path: this.contracturl})
            }
          } else {
            this.$router.push({path: this.qualificationurl})
          }
        } else {
          this.$router.push({path: this.companyurl})
        }
      },
      ent_state () {
        let state = ''
        if (this.memberInfo.ent_state === '有效') {
          state = '有效'
        } else {
          if (this.clicked.step1 === this.step.step1UnReady) {
            state = '未提交'
          }
          if (this.clicked.step1 === this.step.step1Ready) {
            state = '审核中'
          }
          if (this.clicked.step2 === this.step.step2UnReady && this.clicked.step1 === this.step.step1Pass) {
            state = '未认证'
          }
          if (this.clicked.step2 === this.step.step2Pass && this.clicked.step1 === this.step.step1Pass) {
            state = '待签约'
          }
          if (this.clicked.step3 === this.step.step3Ready && this.clicked.step4 === this.step.step4UnReady) {
            state = '未交费'
          }
        }
        console.log(state)
        return state
      }
    }
  }
</script>

<style scoped lang="scss">
  #memberCenter {
    margin-left: 20px;
    .memberlogo {
      width: 136px;
      height: 136px;
    }
    .info-name {
      font-size: 20px;
      color: #1111b3;
      line-height: 74px;
    }
    .text-font {
      font-size: 14px;
      .text-hot {
        color: $hot-dark;
      }
      .status-green {
        color: #089b01;
        font-weight: 800;
      }
    }
    .welcome {
      color: #c41335;
      font-size: 23px;
      margin: 100px 0 30px 0;
    }
    .step {
      font-size: 18px;
      margin: 0 0 30px 0;
    }
    #arrowButtonBox {
      height: 40px;
      padding: 0;
      position: relative;
    }
    #arrowButtonBox:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      left: 0px;
      top: 0;
      z-index: 2;
    }
    .arrowButton {
      height: 100px;
      width: 200px;
      text-align: center;
      line-height: 30px;
      color: white;
      font-weight: 600;
      position: relative;
      float: left;
      transition: margin 0.2s;
      margin-right: 10px;
    }
    .arrowButton:before {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-width: 50px 35px;
      border-style: solid;
      position: absolute;
      left: 0px;
      top: 0;
      z-index: 2;
    }
    .arrowButton:after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-width: 50px 35px;
      border-style: solid;
      position: absolute;
      right: -69px;
      top: 0;
      z-index: 3;
    }
    .colorReady {
      background: #c31435;
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 35px;
        margin-right: -15px;
      }
    }
    .colorUnready {
      background: #b2b2b2;
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 35px;
        margin-right: -15px;
      }
    }
    .colorReady:before, .colorUnready:before {
      border-color: transparent transparent transparent #fff;
    }
    .colorReady:after {
      border-color: transparent transparent transparent #c31435;
    }
    .colorUnready:after {
      border-color: transparent transparent transparent #b2b2b2;
    }
    .fcolorReady {
      background: #c31435;
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 15px;
      }
    }
    .fcolorUnready {
      background: #b2b2b2;
      p {
        font-size: 15px;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 15px;
      }
    }
    .fcolorReady:before, .fcolorReady:after {
      border-color: transparent transparent transparent #c31435;
    }
    .fcolorUnready:before, .fcolorUnready:after {
      border-color: transparent transparent transparent #b2b2b2;
    }
    .arrowText {
      text-align: center;
      font-size: 17px;
      width: 200px;
      height: 100%;
      position: absolute;
      left: 0px;
      z-index: 4;
    }
  }
</style>
