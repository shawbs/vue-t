<template>
  <div>
    <h2 class="text-center">welcome!!!</h2>
  </div>
</template>

<script>
  export default {
    mounted(){
      this.$store.dispatch('base/getList')
    }
  }
</script>

<style lang="scss" scoped>

</style>
