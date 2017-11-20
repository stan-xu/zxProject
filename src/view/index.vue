<template>
  <div id="index">
    <h1>Index View</h1>
    <router-link to="manager">manager</router-link>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        list: '',
        form: {
          name: ''
        },
        selected: ''
      }
    },
    created () {
      this.$api.get('/ent/query', null, r => {
        console.log(r)
        this.list = r
      })
    },
    methods: {
      pageChange (val) {
        this.$api.get('/ent/query', {page: val, pagesize: 1}, r => {
          console.log(r)
          this.list = r
        })
      }
    }
  }
</script>

<style lang="scss">
  #index {
    p {
      background-color: red;
      font-size: rem(16px);
      padding: rem(20px 15px);
      border: rem(5px solid blue);
    }

  }
</style>
