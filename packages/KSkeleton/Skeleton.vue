<template>
  <div class="skeleton-loader">
    <slot>
      <KSkeletonBox
        width="100"
        height="1"/>
      <KSkeletonBox
        width="100"
        height="1"/>
      <KSkeletonBox
        width="80"
        height="1"/>
    </slot>
  </div>
</template>

<script>
import KSkeletonBox from './KSkeletonBox.vue'

export default {
  name: 'Skeleton',
  components: { KSkeletonBox }
}
</script>

<style lang="scss" scoped>
.skeleton-loader {
  width: 80%;
}
</style>
