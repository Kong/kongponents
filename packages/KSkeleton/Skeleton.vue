<template functional>
  <div class="skeleton-loader">
    <div class="box width-100 height-1"/>
    <div class="box width-100 height-1"/>
    <div class="box width-80 height-1"/>
  </div>
</template>

<script>
export default {
  name: 'Skeleton'
}
</script>

<style lang="scss" scoped>
.skeleton-loader {
  width: 80%;
}
</style>
