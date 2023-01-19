<template>
  <KPop
    v-bind="$attrs"
    hide-caret
    :max-width="maxWidth"
    :placement="placement"
    :popover-classes="`k-tooltip ${computedClass} ${className}`"
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
import { computed, ref } from 'vue'
import KPop, { placements } from '@/components/KPop/KPop.vue'

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
    type: String,
    default: 'bottom',
    validator: (value: string):boolean => {
      return Object.keys(placements).includes(value)
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
const computedClass = computed((): any => {
  return {
    top: 'mb-2',
    right: 'ml-2',
    bottom: 'mt-2',
    left: 'mr-2',
  }[props.placement]
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
  z-index: 9999;
  pointer-events: none;
}
</style>
