<template>
  <div class="skeleton-form-wrapper">
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1"
      />
      <KSkeletonBox
        width="100"
        height="2"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1"
      />
      <KSkeletonBox
        width="100"
        height="2"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1"
      />
      <KSkeletonBox
        width="100"
        height="2"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        width="10"
        height="1"
      />
      <KSkeletonBox
        width="100"
        height="2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'

export default defineComponent({
  name: 'FormSkeleton',
  components: { KSkeletonBox },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.skeleton-form-wrapper {
  width: 100%;
  .skeleton-form-row {
    margin-bottom: 2rem;
  }
}
</style>
