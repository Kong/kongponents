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
      result = 'mb-2'
      break
    case 'right':
      result = 'ml-2'
      break
    case 'bottom':
      result = 'mt-2'
      break
    case 'left':
      result = 'mr-2'
      break
  }

  return result
})
</script>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-tooltip.k-popover {
  --KPopColor: var(--KTooltipColor, var(--white, color(white)));
  --KPopBackground: var(--KTooltipBackground, var(--black-400, color(black-400)));
  --KPopBodySize: var(--type-sm);
  --KPopPaddingX: var(--spacing-xs);
  --KPopPaddingY: var(--spacing-xs);
  --KPopBorder: none;
  pointer-events: none;
  z-index: 9999;
}
</style>
