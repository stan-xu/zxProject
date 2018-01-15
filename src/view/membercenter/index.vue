<template>
  <div id="memberCenter">
      <el-row v-if="memberInfo">
        <el-col :span="6" :offset="6">
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
              <span class="status-green">{{memberInfo.ent_state}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <h1 class="welcome">欢迎登录中消在线！</h1>
        <h2 class="step">现在请你先按照以下步骤进行信息填写</h2>
          <div id="arrowButtonBox" v-if="clicked">
            <a :href="companyurl" :class="(clicked.step1!='企业信息已完善')? 'arrowButton colorUnready':'arrowButton colorReady'">
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
        <div class="bottom-line">
          <div class="prefix-triangle">网站公告</div>
        </div>
        <a :href="baseUrl+noticeurl" class="pull-right"> 更多>> </a>
        <div class="notice-list" v-if="notice_list.records==0">暂无公告</div>
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
  .memberlogo{
    margin-top: 15px;
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
    }
  }
  .welcome{
    color:#c41335;
    text-align: center;
    font-size:23px;
    margin: 30px 0;
  }
  .step{
    font-size:18px;
    margin: 0 0 30px 60px;
  }
  #arrowButtonBox {
    width: 500px;
    height: 40px;
    padding: 0;
    margin: 0 auto 53px auto;
    position: relative;
  }
  #arrowButtonBox:after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 15px;
    border-style: solid;
    border-color: transparent transparent transparent #FFFFFF;
    position: absolute;
    left: 0px;
    top: 0;
    z-index: 2;
  }
  .arrowButton {
    height: 80px;
    width: 130px;
    text-align: center;
    line-height: 30px;
    color: white;
    font-weight: 600;
    position: relative;
    float: left;
    transition: margin 0.2s;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .arrowButton:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-width: 40px 35px;
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
    border-width: 40px 35px;
    border-style: solid;
    position: absolute;
    right: -69px;
    top: 0;
    z-index: 3;
  }
  .colorReady {
    background: #b2b2b2;
    padding-top: 25px;
    p {
      font-size: 0.9em;
      padding: 0;
      margin: 0;
      line-height: 25px;
    }
  }
  .colorUnready {
    background: #c31435;
    padding-top: 29px;
    p {
      font-size: 0.9em;
      padding: 0;
      margin: 0;
      line-height: 25px;
    }
  }
  .colorReady:before, .colorUnready:before {
    border-color: transparent transparent transparent #fff;
  }
  .colorReady:after {
    border-color: transparent transparent transparent #b2b2b2;
  }
  .colorUnready:after {
    border-color: transparent transparent transparent #c31435;
  }
  .arrowText{
    margin-left: 35px;
    font-size: 17px;
    width: 108px;
    height: 100%;
    position: absolute;
    left: 0px;
    z-index: 4;
  }
  .bottom-line {
    font-size: 18px;
    border-bottom: 1px solid #acacac;
    padding-left: 15px;
    padding-bottom: 15px;
   .prefix-triangle:before {
      content: '\25B6';
      color: #666;
      text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
      margin-right: 10px;
    }
  }
  .pull-right{
    margin-top: -30px;
    margin-right: 10px;
  }
 .notice-list {
    padding: 20px 0;
  }
}
</style>
