<template functional>
  <label class="k-input-label">
    <KoolTip
      v-if="props.help"
      :label="props.help"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="help"
        height="16"
        width="16"
        view-box="0 0 16 16"
      />
    </Kooltip>
    <KoolTip
      v-else-if="props.info"
      :label="props.info"
      class="label-tooltip"
    >
      <slot />
      <KIcon
        icon="info"
        height="16"
        width="16"
        color="black"
      />
    </Kooltip>
    <slot v-else />
  </label>
</template>

<script>
export default {
  name: 'KLabel',
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
