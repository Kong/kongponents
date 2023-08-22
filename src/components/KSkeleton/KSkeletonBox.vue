<template>
  <div
    class="box"
    :class="{[`width-${width}`]: true, [`height-${height}`]: true }"
  />
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { SkeletonBoxHeight, SkeletonBoxWidth } from '@/types'
import { SkeletonBoxHeightArray, SkeletonBoxWidthArray } from '@/types'

defineProps({
  width: {
    type: String as PropType<SkeletonBoxWidth>,
    default: '1',
    validator: (val: SkeletonBoxWidth) => SkeletonBoxWidthArray.includes(val),
  },
  height: {
    type: String as PropType<SkeletonBoxHeight>,
    default: '1',
    validator: (val: SkeletonBoxHeight) => SkeletonBoxHeightArray.includes(val),
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.box {
  animation: gradient 1s ease infinite;
  background: linear-gradient(
      -70deg,
      #f2f2f2 0%,
      #f2f2f2 40%,
      #f7f7f7 50%,
      #f2f2f2 60%,
      #f2f2f2 100%
    )
    repeat;
  background-size: 400% 100%;
  border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
  display: inline-flex;
  margin-right: var(--kui-space-20, $kui-space-20) !important;
  transition: 1s;
  // Provided box widths
  &.width {
    &-1 {
      width: 16px;
    }
    &-2 {
      width: 32px;
    }
    &-5 {
      width: 80px;
    }
    &-6 {
      width: 96px;
    }
    &-10 {
      width: 160px;
    }
    &-25 {
      width: 25%;
    }
    &-50 {
      width: 50%;
    }
    &-75 {
      width: 75%;
    }
    &-100 {
      width: 100%;
    }
  }
  // Provided box heights
  &.height {
    &-1 {
      height: 16px;
    }
    &-2 {
      height: 32px;
    }
  }
}
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped

.box {
  @keyframes gradient {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
