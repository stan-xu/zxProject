<template>
  <div>
    <auditinfo1 v-if="id == 'HD'"></auditinfo1>
    <auditinfo3 v-if="id == 'FDU'"></auditinfo3>
    <auditinfo4 v-if="id == 'FCU'"></auditinfo4>
    <auditinfo5 v-if="id == 'FTS'"></auditinfo5>
  </div>
</template>
<script>
  import auditinfo1 from '../upload/uploadHP.vue'
  import auditinfo3 from '../upload/uploadFDU.vue'
  import auditinfo4 from '../upload/uploadFCU.vue'
  import auditinfo5 from '../upload/uploadFTS.vue'

  export default {
    components: {
      auditinfo1,
      auditinfo3,
      auditinfo4,
      auditinfo5
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
