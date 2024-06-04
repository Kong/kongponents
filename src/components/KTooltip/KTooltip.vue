<template>
  <KPop
    v-if="showTooltip"
    v-bind="$attrs"
    hide-caret
    hide-close-icon
    :max-width="maxWidth"
    :placement="placement"
    popover-classes="k-tooltip"
    :popover-timeout="100"
    :position-fixed="positionFixed"
    trigger="hover"
    width="auto"
  >
    <slot />

    <template #content>
      <div
        :id="tooltipId || randomTooltipId"
        role="tooltip"
      >
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
import { v4 as uuidv4 } from 'uuid'

defineOptions({
  inheritAttrs: false,
})

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
    default: 'top',
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
  tooltipId: {
    type: String,
    default: '',
  },
  zIndex: {
    type: Number,
    default: 9999,
  },
})

const slots = useSlots()

const showTooltip = computed((): boolean => !!props.text || !!props.label || !!slots.content)

const randomTooltipId = uuidv4()
</script>

<style lang="scss" scoped>
:deep(.k-tooltip.popover) {
  .popover-container {
    background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);
    border: none;
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    padding: var(--kui-space-30, $kui-space-30);
    z-index: v-bind('zIndex');

    .popover-content {
      color: var(--kui-color-text-inverse, $kui-color-text-inverse);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-20, $kui-font-size-20);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      line-height: var(--kui-line-height-20, $kui-line-height-20);

      code {
        color: var(--kui-color-text-decorative-aqua, $kui-color-text-decorative-aqua);
      }

      a {
        color: var(--kui-color-text-inverse, $kui-color-text-inverse);

        &:hover {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker);
        }

        &:focus-visible {
          color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
        }

        &:active {
          color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
        }
      }
    }
  }

  &[x-placement^="top"] .popover-container {
    margin-bottom: var(--kui-space-20, $kui-space-20);
  }

  &[x-placement^="right"] .popover-container {
    margin-left: var(--kui-space-20, $kui-space-20);
  }

  &[x-placement^="bottom"] .popover-container {
    margin-top: var(--kui-space-20, $kui-space-20);
  }

  &[x-placement^="left"] .popover-container {
    margin-right: var(--kui-space-20, $kui-space-20);
  }
}
</style>
