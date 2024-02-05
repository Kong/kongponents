<template>
  <KPop
    v-if="showTooltip"
    v-bind="$attrs"
    hide-caret
    :max-width="maxWidth"
    :placement="placement"
    :popover-classes="`k-tooltip ${computedClass}`"
    :popover-timeout="0"
    :position-fixed="positionFixed"
    trigger="hover"
    width="auto"
  >
    <slot />

    <template #content>
      <div role="tooltip">
        <slot
          :label="text || label"
          name="content"
        >
          {{ text || label }}
        </slot>
      </div>
    </template>
  </KPop>

  <template v-else>
    <slot />
  </template>
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
  text: {
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
    default: true,
  },
  /**
  * Set the max-width of the ktooltip
  */
  maxWidth: {
    type: String,
    default: 'auto',
  },

  /**
   * @deprecated in favor of text prop
   */
  label: {
    type: String,
    default: '',
  },
})

const slots = useSlots()
const showTooltip = computed((): boolean => !!props.text || !!slots.content || !!props.label)

const computedClass = computed((): string => {
  let placementClass = ''
  const placementDirections = ['top', 'right', 'bottom', 'left']

  placementDirections.forEach((direction) => {
    if (props.placement.toLocaleLowerCase().includes(direction)) {
      if (placementClass) {
        placementClass += ` tooltip-${direction}`
      } else {
        placementClass = `tooltip-${direction}`
      }
    }
  })

  return placementClass
})
</script>

<style lang="scss" scoped>
:deep(.k-tooltip.k-popover) {
  background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);
  border: none;
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  padding: var(--kui-space-30, $kui-space-30);
  pointer-events: none;
  z-index: 9999;

  &.tooltip-top {
    margin-bottom: var(--kui-space-20, $kui-space-20);
  }

  &.tooltip-right {
    margin-left: var(--kui-space-20, $kui-space-20);
  }

  &.tooltip-bottom {
    margin-top: var(--kui-space-20, $kui-space-20);
  }

  &.tooltip-left {
    margin-right: var(--kui-space-20, $kui-space-20);
  }

  code {
    color: var(--kui-color-text-decorative-aqua, $kui-color-text-decorative-aqua);
  }
}
</style>
