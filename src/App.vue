<template>
  <div id="app">
    <myHeader></myHeader>
    <router-view/>
  </div>
</template>

<script>
  import myHeader from './components/myHeader.vue'

  export default {
    name: 'app',
    components: {myHeader}
  }
</script>

<style lang="scss">

</style>
