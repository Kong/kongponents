<template>
  <div class="skeleton-form-wrapper">
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1" />
      <KSkeletonBox
        width="100"
        height="2" />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1" />
      <KSkeletonBox
        width="100"
        height="2" />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1" />
      <KSkeletonBox
        width="100"
        height="2" />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1" />
      <KSkeletonBox
        width="100"
        height="2" />
    </div>
  </div>
</template>

<script>
import KSkeletonBox from './KSkeletonBox'

export default {
  name: 'FormSkeleton',
  components: { KSkeletonBox }
}
</script>

<style lang="scss" scoped>
.skeleton-form-wrapper {
  width: 100%;
  .skeleton-form-row {
    margin-bottom: 2rem;
  }
}
</style>
