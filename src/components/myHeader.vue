<template>
  <div id="myHeader">
    <div class="container clearfix">
      <div class="header-brand">
        <router-link class="brand" to=""></router-link>
      </div>
      <div class="header-title">企业名录</div>
      <ul class="header-nav-logined list-inline" v-if="ifLogin">
        <li>
          <router-link to="">我的发布</router-link>
        </li>
        <li>
          <router-link to="">找企业</router-link>
        </li>
        <li>
          <router-link to=""><i class="fa fa-sign-out"></i></router-link>
        </li>
      </ul>
      <ul class="header-nav-nologin list-inline" v-else>
        <li>
          <router-link to="/login">登录</router-link>
        </li>
        <li>
          <router-link to="">注册</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../util/eventBus'

  export default {
    name: 'myHeader',
    data () {
      return {
        ifLogin: false
      }
    },
    created () {
      EventBus.$on('ifLogin', val => {
        this.ifLogin = val
      })
    }
  }
</script>

<style lang="scss">
  #myHeader {
    $header-height: 70px;
    z-index: 999;
    height: $header-height;
    line-height: $header-height;
    //margin-bottom: 20px;
    background-color: $hot-dark;
    & + * {
      //margin-top: -20px;
      padding-top: 20px;
    }
    // 解决logo占用头部外20像素距离
    .header-brand {
      float: left;
      padding-left: 20px;
      .brand {
        display: block;
        margin-top: 5px;
        width: 100px;
        height: 83px;
        background-image: url("/static/image/logo.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .header-title {
      float: left;
      margin: 15px 20px;
      padding: 0 10px;
      line-height: 40px;
      font-size: 24px;
      color: $white-max;
      border-left: 1px solid #fff;
    }
    .header-nav-nologin {
      float: right;
      li {
        &:first-child a {
          border-right: 1px solid $white-max;
        }
        a {
          display: inline-block;
          line-height: 20px;
          padding: 0 10px;
          font-size: 1rem;
          color: $white-max;
        }
      }
    }
    .header-nav-logined {
      float: right;
      padding-bottom: 0;
      li {
        padding: 0 15px;
        font-size: 18px;
        &:hover {
          background-color: #a41531;
        }
        a {
          color: $white-max;
        }
      }
    }
  }
</style>
