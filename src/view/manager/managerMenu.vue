<template>
  <div id="managerMenu">
    <ul class="list">
      <li v-for="item in menu" class="item">
        <template v-if="item.sub">
          <a @click="item.active=!item.active" :class="(item.active)?'router-link-active':''">{{item.title}}</a>
          <collapse-transition>
            <ul class="list" v-show="item.active">
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
    <img src="./tel.png" alt="" class="img-responsive center-block">
  </div>
</template>

<script>
  import CollapseTransition from '../../components/collapseTransition'

  export default {
    components: {CollapseTransition},
    name: 'managerMenu',
    data () {
      return {
        show: true,
        height: '200px',
        active: '',
        menu: [
          {
            title: '会员中心',
            href: '/manager/index'
          },
          {
            title: '用户管理',
            active: '',
            sub: [
              {
                title: '密码修改',
                href: '/manager/product'
              },
              {
                title: '企业信息修改',
                href: '/manager/product'
              }]
          }
        ]
      }
    },
    mounted () {
      // let path = this.$route.path
      /* this.menu.some((value, index) => {
        console.log(value.sub)
        if (value.sub) {
          let flag = value.sub.some((subvalue, index) => {
            console.log(path === subvalue.href)
            if (path === subvalue.href) {
              subvalue.active = value.title
              return true
            }
          })
          console.log(flag)
          value.active = flag
        } else {
          console.log(value.href)
          console.log(path)
          if (path === value.href) {
            value.active = true
          }
        }
      }) */
      this.ifActive(this.menu)
    },
    methods: {
      collapse () {
        this.show = !this.show
      },
      ifActive (item) {
        let path = this.$route.path
        let active = false
        item.some((value, index) => {
          if (value.sub) {
            let flag = this.ifActive(value.sub)
            value.active = flag
          } else {
            if (path === value.href) {
              value.active = true
              active = true
            }
          }
        })
        return active
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
