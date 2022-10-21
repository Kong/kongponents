<template>
  <label
    class="k-input-label"
  >
    <KTooltip
      v-if="help"
      v-bind="tooltipAttributes"
      :label="help"
      :test-mode="!!testMode || undefined"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="help"
        size="16"
        hide-title
      />
    </KTooltip>
    <KTooltip
      v-else-if="info"
      v-bind="tooltipAttributes"
      :label="info"
      :test-mode="!!testMode || undefined"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="info"
        size="16"
        view-box="0 0 16 16"
        hide-title
      />
    </KTooltip>
    <slot v-else />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

export default defineComponent({
  name: 'KLabel',
  components: {
    KIcon,
    KTooltip,
  },
  props: {
    help: {
      type: String,
      default: undefined,
    },
    info: {
      type: String,
      default: undefined,
    },
    tooltipAttributes: {
      type: Object,
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
  }
}
</style>
