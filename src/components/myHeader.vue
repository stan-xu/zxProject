<template>
  <div id="myHeader" v-cloak>
    <div class="container clearfix">
      <div class="header-brand">
        <a class="brand" :href="baseUrl+'/'"></a>
      </div>
      <div class="header-title">企业名录</div>
      <template v-if="loaded">
        <ul class="header-nav logined list-inline" v-if="ifLogin">
          <li>
            <router-link to="/home/publish">我的发布</router-link>
          </li>
          <li>
            <a :href="baseUrl">找企业</a>
          </li>
          <li>
            <a @click="logout"><i class="fa fa-sign-out"></i></a>
          </li>
        </ul>
        <ul class="header-nav nologin list-inline" v-else>
          <li>
            <router-link to="/login">登录</router-link>
          </li>
          <li>
            <a :href="baseUrl+'/account/register'">注册</a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
  import { EventBus } from '../util/eventBus'

  export default {
    name: 'myHeader',
    data () {
      return {
        ifLogin: null,
        loaded: false
      }
    },
    created () {
      EventBus.$on('ifLogin', val => {
        this.ifLogin = val
      })
      this.$api.get('/account/islogin', null,
        resj => {
          (resj.message === '已登录') ? this.ifLogin = true : this.ifLogin = false
          this.loaded = true
        })
    },
    methods: {
      logout () {
        this.$api.get('/account/logout', null,
          resj => {
            EventBus.$emit('ifLogin', false)
            this.$router.replace('/login')
          })
      }
    }
  }
</script>

<style lang="scss">
  #myHeader {
    $header-height: 70px;
    z-index: 999;
    height: $header-height;
    line-height: $header-height;
    margin-bottom: 20px;
    background-color: $hot-dark;
    & + * {
      margin-top: -20px;
      //padding-top: 20px;
    }
    // 解决logo占用头部外20像素距离
    .header-brand {
      float: left;
      .brand {
        display: block;
        margin-top: 5px;
        width: 100px;
        height: 83px;
        background-image: url("../images/logo.png");
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
    .header-nav {
      float: right;
      height: 70px;
      padding-left: 0;
      &.logined > li {
        padding: 0 15px;
        font-size: 18px;
        &:hover {
          background-color: #a41531;
        }
        a {
          color: $white-max;
        }
      }
      &.nologin > li {
        &:first-child a {
          border-right: 1px solid $white-max;
        }
        a {
          display: inline-block;
          line-height: 20px;
          padding: 0 10px;
          color: $white-max;
        }
      }
    }
  }
</style>
