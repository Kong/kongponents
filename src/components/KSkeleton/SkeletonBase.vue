<template>
  <div class="skeleton-loader">
    <slot>
      <KSkeletonBox
        height="1"
        width="100"
      />
      <KSkeletonBox
        height="1"
        width="100"
      />
      <KSkeletonBox
        height="1"
        width="75"
      />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
</script>

<style lang="scss" scoped>
.skeleton-loader {
  width: 80%;
}
</style>
