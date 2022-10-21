<template>
  <div
    :class="{[`width-${width}`]: true, [`height-${height}`]: true }"
    class="box mr-1"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KSkeletonBox',
  props: {
    width: {
      type: String,
      default: '1',
      validator: function(val: string) {
        return ['1', '2', '5', '6', '10', '25', '50', '75', '100'].includes(val)
      },
    },
    height: {
      type: String,
      default: '1',
      validator: (val: string) => ['1', '2'].includes(val),
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.box {
  display: inline-flex;
  border-radius: 3px;
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
  animation: gradient 1s ease infinite;
  transition: 1s;
  // Provided box widths
  &.width {
    &-1 {
      width: 1rem;
    }
    &-2 {
      width: 2rem;
    }
    &-5 {
      width: 5rem;
    }
    &-6 {
      width: 6rem;
    }
    &-10 {
      width: 10rem;
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
      height: 1rem;
    }
    &-2 {
      height: 2rem;
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
