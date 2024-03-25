<template>
  <div class="skeleton-form-wrapper">
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="2"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="2"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="2"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="2"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
</script>

<style lang="scss" scoped>

.skeleton-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-70, $kui-space-70);
  width: 100%;
}
</style>
