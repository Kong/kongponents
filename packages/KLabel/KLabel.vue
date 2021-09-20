<template>
  <label
    v-bind="$attrs"
    class="k-input-label">
    <KoolTip
      v-if="help"
      :label="help"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="help"
        height="16"
        width="16"
        view-box="0 0 16 16"
        hide-title />
    </Kooltip>
    <KoolTip
      v-else-if="info"
      :label="info"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="info"
        height="16"
        width="16"
        color="#A3BBCC"
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@kongponents/styles/_variables.scss';
  @import '~@kongponents/styles/forms/_labels.scss';
</style>
