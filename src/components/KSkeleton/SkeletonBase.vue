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
        width="100"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
</script>

<style lang="scss" scoped>
.skeleton-loader {
  width: 100%;
}
</style>
