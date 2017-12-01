<template>
  <div id="managerMenu">
    <ul class="list">
      <li v-for="item in menu" class="item">
        <template v-if="item.sub">
          <a @click="collapse">{{item.title}}</a>
          <collapse-transition>
            <ul class="list" v-show="show">
              <li class="sub-item" v-for="subItem in item.sub">
                <router-link :to="subItem.href">{{subItem.title}}</router-link>
              </li>
            </ul>
          </collapse-transition>
        </template>
        <router-link :to="item.href" v-else>{{item.title}}</router-link>
      </li>
<!--      <li class="item">
        <router-link to="/manager/index">中</router-link>
      </li>
      <li class="item">
        <router-link to="/manager/product">product</router-link>
      </li>
      <li class="item">
        <a @click="collapse">会员管理</a>
        <collapse-transition>
          <ul class="list" v-show="show">
            <li class="sub-item">
              <router-link to="/manager/product">product</router-link>
            </li>
            <li class="sub-item">
              <router-link to="/manager/product">product</router-link>
            </li>
          </ul>
        </collapse-transition>
      </li>-->
    </ul>
  </div>
</template>

<script>
  import CollapseTransition from '../../components/collapseTransition'

  export default {
    components: {CollapseTransition},
    name: 'managerMenu',
    data () {
      return {
        show: false,
        menu: [
          {
            title: '会员中心',
            href: ''
          },
          {
            title: '用户管理',
            sub: [
              {
                title: '密码修改',
                href: ''
              },
              {
                title: '企业信息修改',
                href: ''
              }]
          }
        ]
      }
    },
    created () {
    },
    methods: {
      collapse () {
        this.show = !this.show
      }
    }
  }
</script>

<style lang="scss">
  #managerMenu {
    .list {
      list-style: none;
      padding: 0 10%;
      margin: 0 0 10px 0;
      text-align: center;
      overflow: hidden;
      .item {
        line-height: 50px;
        font-size: 16px;
        border-bottom: 1px solid #acacac;
        & > a {
          display: inline-block;
          width: 100%;
          &.router-link-active {
            color: $hot-dark;
            &:before {
              content: "";
              border: 8px solid transparent;
              border-left-color: #c41335;
              position: absolute;
              margin-top: 17px; //triangle vertical center
              margin-left: -20px; //triangle margin to text
            }
          }
        }
      }
      .sub-item {
        font-size: 14px;
        line-height: 30px;
        & > a.router-link-active {
          color: $hot-light;
        }
      }
    }
  }
</style>
