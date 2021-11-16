<template>
  <label
    v-bind="$attrs"
    class="k-input-label">
    <KoolTip
      v-if="help"
      :label="help"
      :test-mode="testMode"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="help"
        height="16"
        width="16"
        size="16"
        hide-title />
    </Kooltip>
    <KoolTip
      v-else-if="info"
      :label="info"
      :test-mode="testMode"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="info"
        height="16"
        width="16"
        view-box="0 0 16 16"
        hide-title />
    </Kooltip>
    <slot v-else />
  </label>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'
import KoolTip from '@kongponents/kooltip/KoolTip.vue'

export default {
  name: 'KLabel',
  components: {
    KIcon,
    KoolTip
  },
  props: {
    help: {
      type: String,
      default: undefined
    },
    info: {
      type: String,
      default: undefined
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@kongponents/styles/_variables.scss';
  @import '~@kongponents/styles/forms/_labels.scss';
</style>
