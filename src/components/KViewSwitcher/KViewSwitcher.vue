<template>
  <KButton
    appearance="outline"
    class="k-view-switcher view-switch-button"
    :class="[view, { paused: isPaused }]"
    :is-rounded="false"
    size="small"
    :title="`Toggle to ${view === 'table' ? 'grid' : 'table'} view`"
    @click="toggleView"
  >
    <div class="icon">
      <div class="dots">
        <i
          v-for="i in 4"
          :key="i"
        />
      </div>
      <div class="lines">
        <i
          v-for="i in 4"
          :key="i"
        />
      </div>
    </div>
  </KButton>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import type { SwitcherType } from '@/types'
import { SwitcherTypeArray } from '@/types'

const props = defineProps({
  view: {
    type: String as PropType<SwitcherType>,
    default: 'table',
    required: true,
    validator: (val: SwitcherType): boolean => SwitcherTypeArray.includes(val),
  },
})

const emit = defineEmits<{
  (e: 'view-changed', val: SwitcherType): void
}>()

const isPaused = ref<boolean>(true)

const toggleView = (): void => {
  // Removed paused animations
  isPaused.value = false

  // Emit new view
  emit('view-changed', props.view === 'table' ? 'grid' : 'table')
}
</script>

<style lang="scss" scoped>
@import '@/styles/tmp-variables';

@import '@/styles/mixins';

// Originally forked and modified from https://codepen.io/aaroniker/pen/dyoKeMP
.view-switch-button {
  @include non-visual-button;
  padding: var(--kui-space-30, $kui-space-30) var(--kui-space-30, $kui-space-30);
  transform: scale(1) translateZ(0);

  &:hover {
    background-color: var(--kui-color-background, $kui-color-background) !important;
    border-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak) !important;
  }

  &.paused .icon i {
    animation-duration: 0s;
  }

  .icon {
    height: 24px;
    position: relative;
    width: 24px;

    i {
      /* stylelint-disable-next-line custom-property-pattern */
      animation: var(--name, var(--dots-name, none)) var(--duration, var(--dots-duration, .5s)) var(--easing, var(--dots-easing, linear)) forwards var(--delay, var(--dots-delay, 0s));
      background-color: var(--kui-color-background-neutral, $kui-color-background-neutral);
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
      display: block;
      // TODO: Disabling CSS custom property rules in this file for animations only
      /* stylelint-disable */
      height: var(--height, 7px);
      left: var(--left, 4px);
      position: absolute;
      top: var(--top, 4px);
      transition: background-color $tmp-animation-timing-2 ease;
      width: var(--width, 7px);
      /* stylelint-enable */
    }

    // TODO: Disabling CSS custom property rules in this file for animations only
    /* stylelint-disable */
    .dots i {
      &:nth-child(1) {
        --x-middle: -8px;
        --y-middle: 10px;
        --x-end: -2px;
        --y-end: 12px;
        --x-back: 10px;
        --y-back: 7px;
        --x-back-end: 9px;
        --y-back-end: 0;
      }

      &:nth-child(2) {
        --left: 13px;
        --x-middle: -12px;
        --y-middle: 5px;
        --x-end: -11px;
        --y-end: 7px;
        --x-back: -3px;
        --y-back: 1px;
        --x-back-end: -9px;
        --y-back-end: 0;
      }

      &:nth-child(3) {
        --top: 13px;
        --x-middle: 4px;
        --y-middle: -5px;
        --x-end: -2px;
        --y-end: -7px;
        --x-back: -5px;
        --y-back: 0px;
        --x-back-end: 9px;
        --y-back-end: 0;
      }

      &:nth-child(4) {
        --left: 13px;
        --top: 13px;
        --x-middle: 0;
        --y-middle: -10px;
        --x-end: -11px;
        --y-end: -12px;
        --x-back: -14px;
        --y-back: -8px;
        --x-back-end: -9px;
        --y-back-end: 0;
      }
    }
    /* stylelint-enable */

    // TODO: Disabling CSS custom property rules in this file for animations only
    /* stylelint-disable */
    .lines {
      --name: var(--lines-name, none);
      --duration: var(--lines-duration, #{$tmp-animation-timing-2});
      --easing: linear;
      --delay: 0s;

      i {
        --left: 9px;
        --top: 3px;
        --height: 2px;
        --width: 11px;
        transform: translateY(20%) translateZ(0) scaleX(0);
        transform-origin: 0 50%;
        &:nth-child(2) { --top: 8px; }
        &:nth-child(3) { --top: 13px; }
        &:nth-child(4) { --top: 18px; }
        &:nth-child(3),
        &:nth-child(4) { transform-origin: 100% 50%; }
      }
    }
    /* stylelint-enable */
  }

  // TODO: Disabling CSS custom property rules in this file for animations only
  /* stylelint-disable */
  &.table {
    --dots-name: back;
    --lines-name: scale-down;

    .lines i {
      transform-origin: 0 50%;
      &:nth-child(3),
      &:nth-child(4) { transform-origin: 100% 50%; }
    }
  }

  &.grid {
    --dots-name: move;
    --lines-name: scale;
    --lines-duration: 0.15s;
    --lines-delay: 0.3s;

    .lines i {
      transform-origin: 100% 50%;
      &:nth-child(3),
      &:nth-child(4) { transform-origin: 0 50%; }
    }
  }
  /* stylelint-enable */
}
</style>

<style lang="scss">
// @keyframes animations need to be un-scoped
.k-view-switcher {
  // TODO: Disabling CSS custom property rules in this file for animations only
  /* stylelint-disable */
  @keyframes move {
    50% { transform: translate(var(--x-middle, 0), var(--y-middle, 0)) scale(.4); }
    100% { transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(.4); }
  }

  @keyframes back {
    0%,
    15% { transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(.4); }
    50% { transform: translate(var(--x-back, 0), var(--y-back, 0)) scale(.5); }
    100% { transform: translate(var(--x-back-end, 0), var(--y-back-end, 0)) scale(1); }
  }
  /* stylelint-enable */

  @keyframes scale {
    100% { transform: translateY(20%) translateZ(0) scaleX(1); }
  }

  @keyframes scale-down {
    0% { transform: translateY(20%) translateZ(0) scaleX(1); }
    100% { transform: translateY(20%) translateZ(0) scaleX(0); }
  }
}
</style>
