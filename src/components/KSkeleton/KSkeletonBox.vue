<template>
  <div
    class="skeleton-box"
    :class="{[`width-${width}`]: true, [`height-${height}`]: true }"
  />
</template>

<script lang="ts" setup>
import type { SkeletonBoxProps } from '@/types'

const {
  width = '1',
  height = '1',
} = defineProps<SkeletonBoxProps>()
</script>

<style lang="scss" scoped>
.skeleton-box {
  animation: kSkeletonGradient 4s ease infinite;
  background: linear-gradient(
    -70deg,
    var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) 0%,
    var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) 40%,
    var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest) 50%,
    var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) 60%,
    var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) 100%
  )
    repeat;
  background-size: 400% 100%;
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  display: inline-flex;
  margin-right: var(--kui-space-20, $kui-space-20);
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
      height: 8px;
    }

    &-2 {
      height: 16px;
    }
  }
}
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped
.skeleton-box {
  @keyframes kSkeletonGradient {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
}
</style>
