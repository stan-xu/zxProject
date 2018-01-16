<template>
  <div>
    <auditinfo1 v-if="id == 'HD'"></auditinfo1>
    <auditinfo3 v-if="id == 'FDU'"></auditinfo3>
    <auditinfo4 v-if="id == 'FCU'"></auditinfo4>
    <auditinfo5 v-if="id == 'FTS'"></auditinfo5>
    <auditinfo6 v-if="id == 'OTH'"></auditinfo6>
  </div>
</template>
<script>
  import auditinfo1 from './uploadHd.vue'
  import auditinfo3 from './uploadFdu.vue'
  import auditinfo4 from './uploadFcu.vue'
  import auditinfo5 from './uploadFts.vue'
  import auditinfo6 from './uploadOther.vue'

  export default {
    components: {
      auditinfo1,
      auditinfo3,
      auditinfo4,
      auditinfo5,
      auditinfo6
    },
    name: 'estate',
    data () {
      return {
        id: ''
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load () {
        var pathName = window.location.href
        var id = pathName.substring(pathName.lastIndexOf('=') + 1,
          pathName.length)
        this.id = id
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
