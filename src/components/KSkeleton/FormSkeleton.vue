<template>
  <div class="skeleton-form-wrapper">
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="1"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="1"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="1"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
      />
    </div>
    <div class="skeleton-form-row">
      <KSkeletonBox
        height="1"
        width="10"
      />
      <KSkeletonBox
        height="2"
        width="100"
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
