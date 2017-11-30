<template>
  <div id="managerMenu">
    <ul class="list">
      <li class="item">
        <router-link to="/manager/index">中</router-link>
      </li>
      <li class="item">
        <router-link to="/manager/product">product</router-link>
      </li>
      <li class="item">
        <a>会员管理</a>
        <ul class="list">
          <li class="sub-item">
            <router-link to="/manager/product">product</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'managerMenu',
    data () {
      return {}
    },
    created () {
    }
  }
</script>

<style lang="scss">
  #managerMenu {
    .list {
      list-style: none;
      padding: 0 10%;
      margin: 0 0 10px 0;
      .item {

        line-height: 50px;
        text-align: center;
        font-size: 16px;
        border-bottom: 1px solid #acacac;
        a {
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
    }
  }
</style>
