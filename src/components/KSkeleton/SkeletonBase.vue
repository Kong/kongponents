<template>
  <div class="skeleton-loader">
    <slot>
      <KSkeletonBox
        width="100"
        height="1"
      />
      <KSkeletonBox
        width="100"
        height="1"
      />
      <KSkeletonBox
        width="75"
        height="1"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'

export default defineComponent({
  name: 'SkeletonBase',
  components: { KSkeletonBox },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
.skeleton-loader {
  width: 80%;
}
</style>
