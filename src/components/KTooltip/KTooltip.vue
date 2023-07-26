<template>
  <KPop
    v-bind="$attrs"
    hide-caret
    :max-width="maxWidth"
    :placement="placement"
    :popover-classes="`k-tooltip ${computedClass} ${className}`"
    :popover-timeout="0"
    :position-fixed="positionFixed"
    :test-mode="!!testMode || undefined"
    trigger="hover"
    width="auto"
  >
    <slot />

    <template #content>
      <div role="tooltip">
        <slot
          :label="label"
          name="content"
        >
          {{ label }}
        </slot>
      </div>
    </template>
  </KPop>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue'
import KPop from '@/components/KPop/KPop.vue'
import { PopPlacementsArray, PopPlacements } from '@/types'

const props = defineProps({
  /**
  * Text to show in tooltip
  */
  label: {
    type: String,
    required: false,
    default: '',
  },

  /**
  * Define which side the tooltip displays
  */
  placement: {
    type: String as PropType<PopPlacements>,
    default: 'bottom',
    validator: (value: PopPlacements):boolean => {
      return PopPlacementsArray.includes(value)
    },
  },
  /**
  * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
  */
  positionFixed: {
    type: Boolean,
    default: false,
  },
  /**
  * Set the max-width of the ktooltip
  */
  maxWidth: {
    type: String,
    default: 'auto',
  },
  /**
  * Test mode - for testing only, strips out generated ids
  */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const className = ref('')
const computedClass = computed((): string => {
  let result = ''
  switch (props.placement) {
    case 'top':
      result = 'k-tooltip-top'
      break
    case 'right':
      result = 'k-tooltip-right'
      break
    case 'bottom':
      result = 'k-tooltip-bottom'
      break
    case 'left':
      result = 'k-tooltip-left'
      break
  }

  return result
})
</script>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-tooltip.k-popover {
  --KPopColor: var(--KTooltipColor, var(--white, var(--kui-color-text-inverse, #{$kui-color-text-inverse})));
  --KPopBackground: var(--KTooltipBackground, var(--black-400, var(--kui-color-background-neutral-stronger, #{$kui-color-background-neutral-stronger})));
  --KPopBodySize: var(--type-sm, var(--kui-font-size-30, #{$kui-font-size-30}));
  --KPopPaddingX: var(--spacing-xs, var(--kui-space-40, #{$kui-space-40}));
  --KPopPaddingY: var(--spacing-xs, var(--kui-space-40, #{$kui-space-40}));
  --KPopBorder: none;
  pointer-events: none;
  z-index: 9999;
}

.k-tooltip-top {
  margin-bottom: var(--kui-space-10, $kui-space-10) !important;
}

.k-tooltip-right {
  margin-left: var(--kui-space-10, $kui-space-10) !important;
}

.k-tooltip-bottom {
  margin-top: var(--kui-space-10, $kui-space-10) !important;
}

.k-tooltip-left {
  margin-right: var(--kui-space-10, $kui-space-10) !important;
}
</style>
