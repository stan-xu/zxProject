<template>
  <div id="myFooter">
    <div class="container">
      <el-row>
        <el-col :span="8">
          <div class="link">友情链接:</div>
          <el-row class="link-text">
            <el-col :span="12">
              <a href="http://www.gov.cn/">国务院</a>
              <a href="http://www.mps.gov.cn/" class="link-text-left">公安部</a>
            </el-col>
            <el-col :span="12"><a href="http://www.119.gov.cn/xiaofang/">公安部消防局</a></el-col>
          </el-row>
          <el-row class="link-text">
            <el-col :span="12"><a href="http://www.cccf.com.cn/getIndex.do">中国消防产品信息网</a></el-col>
            <el-col :span="12"><a href="http://www.zhongxiaogroup.com/">中消集团有限公司</a></el-col>
          </el-row>
          <el-row class="link-text">
            <el-col :span="12"><a :href="baseUrl+'/article-supervision-1.html'">监督举报</a></el-col>
            <el-col :span="12"><a :href="baseUrl+'/article-reddoor-1.html'">红门e家</a></el-col>
          </el-row>
        </el-col>
        <el-col :span="8" class="tel-line">
          <div class="link-bottom text-left">服务热线: 400-1919-119 1380-1919-119</div>
          <div class="link-bottom text-left">（周一至周五9:00-17:00，节假日顺延)</div>
          <div class="text-left">邮箱：4001919119@zxzx119.com</div>
        </el-col>
        <el-col :span="2" class="footer-rightline"></el-col>
        <el-col :span="6" class="footer-right">
          <el-row>
            <el-col :span="12">
              <img src="../images/qrwx.png" class="img-responsive center-block">
              <div class="text-center num">扫码关注公众号</div>
            </el-col>
            <el-col :span="12">
              <img src="../images/qrapp.png" class="img-responsive center-block">
              <div class="text-center">扫码下载app</div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="footer-topline"></div>
    </div>
    <div class="text-center footer-text-bottom">
      <a :href="baseUrl+'/article-about-1.html'">关于我们</a>
      <a :href="baseUrl+'/legal.html'">法律申明</a>
      <a :href="baseUrl+'/privacy.html'">隐私保护</a>
      <a :href="baseUrl+'/disclaimer.html'">免责声明</a>
    </div>
    <div class="text-center">
      ©2017 中消在线 沪ICP备16039608号
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myFooter'
  }
</script>

<style lang="scss">
  $line: 1px solid $white-max;
  #myFooter {
    background-color: $hot-dark;
    color: $white-max;
    padding-top: 38px;
    padding-bottom: 24px;
    font-size: 16px;
    .link-text {
      padding-top: 22px;
      .link-text-left {
        margin-left: 43px;
      }
    }
    .tel-line {
      margin-top: 30px;
    }
    .link-bottom {
      padding-bottom: 31px;
    }
    a {
      color: $white-max;
    }
    a:hover, a:focus {
      color: #ddd;
      background-color: transparent;
      text-decoration: none;
    }
    .num {
      margin: 0 -10px;
    }
    .footer-rightline {
      border-left: $line;
      height: 141px;
      margin-top: 18px;
    }
    img {
      margin-bottom: 22px;
    }
    .footer-topline {
      border-top: $line;
      width: 100%;
      margin-top: 33px;
      margin-bottom: 25px;
    }
    .footer-text-bottom {
      margin-bottom: 16px;
      a {
        padding: 10px;
      }
    }
  }
</style>
