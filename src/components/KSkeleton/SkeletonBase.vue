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
