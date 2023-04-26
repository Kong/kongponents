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
      v-if="help || info"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      :label="help || info"
      position-fixed
      :test-mode="!!testMode || undefined"
    >
      <KIcon
        hide-title
        :icon="help ? 'help' : 'info'"
        size="16"
      />
    </KTooltip>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import type { TooltipAttributes } from '@/types'

export default defineComponent({
  name: 'KLabel',
  components: {
    KIcon,
    KTooltip,
  },
  props: {
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
  },
})
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
    }
  }
}
</style>
