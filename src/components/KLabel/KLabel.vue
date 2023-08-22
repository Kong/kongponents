<template>
  <label class="k-input-label">
    <slot />
    <span
      v-if="required"
      class="is-required"
    >*</span>
    <KTooltip
      v-if="hasTooltip"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      position-fixed
      :test-mode="!!testMode || undefined"
    >
      <KIcon
        :color="`var(--black-25, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`"
        hide-title
        :icon="help ? 'help' : 'infoFilled'"
        :size="KUI_ICON_SIZE_30"
      />
      <template #content>
        <slot name="tooltip">{{ help || info }}</slot>
      </template>
    </KTooltip>
  </label>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { TooltipAttributes } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_30 } from '@kong/design-tokens'

const props = defineProps({
  help: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  tooltipAttributes: {
    type: Object as PropType<TooltipAttributes>,
    default: () => ({}),
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

const hasTooltip = computed((): boolean => !!(props.info || props.help || slots.tooltip))
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-input-label {
  .label-tooltip {
    :deep(.kong-icon) {
      &.kong-icon-help,
      &.kong-icon-info {
        cursor: pointer;
        height: 16px;
      }
    }

    :deep(.k-tooltip) {
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);

      code {
        background-color: var(--grey-500, var(--kui-color-background-neutral, $kui-color-background-neutral));
        color: var(--white, var(--kui-color-text-inverse, $kui-color-text-inverse));
      }
    }
  }
}
</style>
