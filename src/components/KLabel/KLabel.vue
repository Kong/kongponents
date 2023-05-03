<template>
  <label
    class="k-input-label"
  >
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
        hide-title
        :icon="help ? 'help' : 'info'"
        size="16"
      />
      <template #content>
        <slot name="tooltip">{{ help || info }}</slot>
      </template>
    </KTooltip>
  </label>
</template>

<script setup lang="ts">
import { computed, PropType, useSlots } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { TooltipAttributes } from '@/types'

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
      font-weight: 400;

      code {
        background-color: var(--grey-500, color(grey-500));
        color: var(--white, #fff);
      }
    }
  }
}
</style>
