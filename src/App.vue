<template>
  <div id="app">
    <my-header></my-header>
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

<style>
</style>
