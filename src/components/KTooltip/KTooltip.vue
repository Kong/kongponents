<template>
  <KPop
    v-bind="$attrs"
    hide-caret
    :max-width="maxWidth"
    :placement="placement"
    :popover-classes="`k-tooltip ${computedClass}`"
    :popover-timeout="0"
    :position-fixed="positionFixed"
    :test-mode="!!testMode || undefined"
    trigger="hover"
    width="auto"
  >
    <slot />

    <template
      v-if="showTooltip"
      #content
    >
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
import { computed, useSlots } from 'vue'
import type { PropType } from 'vue'
import KPop from '@/components/KPop/KPop.vue'
import type { PopPlacements } from '@/types'
import { PopPlacementsArray } from '@/types'

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

const slots = useSlots()
const showTooltip = computed((): boolean => !!props.label || !!slots.content)

const computedClass = computed((): string => {
  const result = []
  switch (props.placement) {
    case 'top':
      result.push('k-tooltip-top')
      break
    case 'right':
      result.push('k-tooltip-right')
      break
    case 'bottom':
      result.push('k-tooltip-bottom')
      break
    case 'left':
      result.push('k-tooltip-left')
      break
  }

  if (!showTooltip.value) {
    result.push('k-tooltip-hidden')
  }

  return result.join(' ')
})
</script>

<style lang="scss">
.k-tooltip.k-popover {
  background: var(--kui-color-background-neutral-stronger, $kui-color-background-neutral-stronger);
  border: none;
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  padding: var(--kui-space-40, $kui-space-40) var(--kui-space-40, $kui-space-40);
  pointer-events: none;
  z-index: 9999;

  &.k-tooltip-hidden {
    display: none;
  }
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
