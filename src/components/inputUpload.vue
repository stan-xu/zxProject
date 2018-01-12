<template>
  <div id="managerHeader">
    会员中心
  </div>
</template>

<script>
  export default {
    name: 'managerHeader',
    props: {
          inputValue: String
        }
  }
</script>

<style lang="scss" scoped>
  #managerHeader {
    background-color: #e5e5e5;
    height: 55px;
    line-height: 55px;
    padding-left: 45px;
    font-size: 23px;
    font-weight: bold;
  }
</style>
