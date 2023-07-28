<template>
  <div class="k-slider">
    <div class="k-slider-rail">
      <div
        class="k-slider-progress"
        style="wdith: 10%"
      />
      <div class="k-slider-pointer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KSlider',
  props: {},
  setup() {
    // TODO
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-slider {
  padding: 10px 0;
  width: auto;
  height: 4px;
  position: relative;
  user-select: none;
  display: block;
  box-sizing: content-box;
  &-rail{
    background-color: var(--grey-200);
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }
  &-progress{
    background-color: var(--green-500);
    width: 10%;
    height: 100%;
    border-radius: 8px 0 0 8px;
    position: absolute;
  }
  &-pointer{
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: var(--green-500);
    position: absolute;
    z-index: 5;
  }
}
</style>
