<template>
  <div id="memberCenter">
    <el-row v-if="memberInfo">
      <el-col :span="5">
        <img src="./images/logo.png" v-if="!memberInfo.ent_logo">
        <img v-if="memberInfo.ent_logo" :src="imgurl+memberInfo.ent_logo" class="img-responsive memberlogo">
      </el-col>
      <el-col :span="8">
        <div class="info-name">{{memberInfo.ent_name}}</div>
        <el-row class="text-font">
          <el-col :span="12">第
            <span class="text-hot">
              {{new Date().getFullYear()-memberInfo.create_time.substring(0,4)+1}}
            </span>年
          </el-col>
          <el-col :span="12">状态:
            <span class="status-green">【{{memberInfo.ent_state}}】</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="14">
        <h1 class="welcome">欢迎登录中消在线！</h1>
      </el-col>
    </el-row>
    <el-row>

      <h2 class="step">现在请你先按照以下步骤进行信息填写</h2>
      <div id="arrowButtonBox" v-if="clicked">
        <a :href="companyurl" :class="(clicked.step1!='企业信息已完善')? 'arrowButton fcolorUnready':'arrowButton fcolorReady'">
          <div class='arrowText'>
            <p>{{clicked.step1}}</p>
          </div>
        </a>
        <a v-if='memberInfo.ent_type!="6"' :href="qualificationurl"  :class="(clicked.step3!='资质信息审核通过')? 'arrowButton colorUnready':'arrowButton colorReady'" onclick="">
          <div class='arrowText'>
            <p>{{clicked.step3}}</p>
          </div>
        </a>
        <a v-if='memberInfo.ent_type!="6"&&clicked.step4' :href="(clicked.step3=='资质信息审核通过'&&clicked.step1=='企业信息已完善')?contracturl:'javascript:alert(\'请完善资质信息或企业信息\')'" disabled :class="(clicked.step4!='电子合同已签署')? 'arrowButton colorUnready':'arrowButton colorReady'"  onclick="">
          <div class='arrowText'>
            <p>{{clicked.step4}}</p>
          </div>
        </a>
        <a v-if='memberInfo.ent_type=="6"&&clicked.step4' :href="(clicked.step1=='企业信息已完善')?contracturl:'javascript:alert(\'请完善企业信息\')'" disabled :class="(clicked.step4!='电子合同已签署')? 'arrowButton colorUnready':'arrowButton colorReady'"  onclick="">
          <div class='arrowText'>
            <p>{{clicked.step4}}</p>
          </div>
        </a>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'memberCenter',
    data: function () {
      return {
        memberInfo: '',
        clicked: '',
        notice_list: '',
        imgurl: '/blade/uploadify/renderFile/',
        companyurl: '/home/companyinfo',
        qualificationurl: '/home/qualification/',
        contracturl: '/home/contract',
        noticeurl: '/notice/manager/'
      }
    },
    mounted () {
      this.get_data()
    },
    methods: {
      load: function () {
        this.$api.post('/home/ent', {}, (r) => {
          if (r.ent_id) {
            this.memberInfo = r
          } else {
            alert('请先填写企业信息')
            window.location.href = this.baseUrl + this.managerurl
          }
        })
      },
      get_data: function () {
        this.$api.get('/home/ent', {}, (r) => {
          this.memberInfo = r
        })
        this.$api.post('/ent/progress', {}, (r) => {
          this.clicked = r.data
        })
        this.$api.post('/notice/view', { }, (r) => {
          this.notice_list = r.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #memberCenter{
    margin-left: 20px;
    .memberlogo{
      width: 136px;
      height: 136px;
    }
    .info-name{
      font-size: 20px;
      color: #1111b3;
      line-height: 74px;
    }
    .text-font{
      font-size: 14px;
      .text-hot{
        color: $hot-dark;
      }
      .status-green{
        color: #089b01;
        font-weight: 800;
      }
    }
    .welcome{
      color:#c41335;
      font-size:23px;
      margin: 100px 0 30px 0;
    }
    .step{
      font-size:18px;
      margin: 0 0 30px 0;
    }
    #arrowButtonBox {
      width: 800px;
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
      margin-right:10px;
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
        font-size: 0.9em;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 45px;
      }
    }
    .colorUnready {
      background: #b2b2b2;
      p {
        font-size: 0.9em;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 45px;
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
      background: #c31435 ;
      p {
        font-size: 0.9em;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 15px;
      }
    }
    .fcolorUnready {
      background: #b2b2b2;
      p {
        font-size: 0.9em;
        padding: 0;
        margin: 0;
        line-height: 100px;
        margin-left: 15px;
      }
    }
    .fcolorReady:before , .fcolorReady:after {
      border-color: transparent transparent transparent #c31435;
    }
    .fcolorUnready:before,  .fcolorUnready:after {
      border-color: transparent transparent transparent #b2b2b2;
    }
    .arrowText{
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
