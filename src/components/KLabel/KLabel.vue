<template>
  <label
    class="k-input-label"
  >
    <KTooltip
      v-if="help"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      :label="help"
      position-fixed
      :test-mode="!!testMode || undefined"
    >
      <slot />
      <span
        v-if="isRequired"
        class="is-required"
      >*</span>
      <KIcon
        hide-title
        icon="help"
        size="16"
      />
    </KTooltip>

    <KTooltip
      v-else-if="info"
      v-bind="tooltipAttributes"
      class="label-tooltip"
      :label="info"
      position-fixed
      :test-mode="!!testMode || undefined"
    >
      <slot />
      <span
        v-if="isRequired"
        class="is-required"
      >*</span>
      <KIcon
        hide-title
        icon="info"
        size="16"
        view-box="0 0 16 16"
      />
    </KTooltip>

    <span v-else>
      <slot />
      <span
        v-if="isRequired"
        class="is-required"
      >*</span>
    </span>
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
    isRequired: {
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
      }
    }

    :deep(.k-tooltip) {
      font-weight: 400;
    }
  }
}
</style>
