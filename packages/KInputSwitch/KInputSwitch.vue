<template>
  <KoolTip
    v-if="$attrs.disabled !== undefined && disabledTooltipText"
    :label="disabledTooltipText"
  >
    <label
      v-bind="$attrs"
      class="k-switch">
      <input
        :checked="value"
        v-bind="$attrs"
        type="checkbox"
        v-on="listeners">
      <div class="switch-control"/>
      <span v-if="label || $scopedSlots.label">
        <slot name="label">{{ label }}</slot>
      </span>
    </label>
  </KoolTip>

  <label
    v-else
    class="k-switch">
    <input
      :checked="value"
      v-bind="$attrs"
      type="checkbox"
      v-on="listeners">
    <div class="switch-control"/>
    <span v-if="label || $scopedSlots.label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import KoolTip from '@kongponents/kooltip/KoolTip.vue'

export default {
  name: 'KInputSwitch',
  components: { KoolTip },
  props: {
    /**
     * Sets whether or not toggle is checked
     */
    value: {
      type: Boolean,
      default: false,
      required: true
    },

    /**
     * Overrides default on/off label text
     */
    label: {
      type: String,
      default: ''
    },

    /**
     * Tooltip text to be displayed if the switch is disabled
     */
    disabledTooltipText: {
      type: String,
      default: ''
    }
  },

  computed: {
    toggleText () {
      return this.value
        ? 'on'
        : 'off'
    },

    listeners () {
      const listeners = {
        ...this.$listeners,
        change: e => {
          this.$emit('change', e.target.checked)
          this.$emit('input', e.target.checked)
        }
      }

      // remove 'input' since it doesn't need to be bound to the checkbox
      delete listeners['input']

      return listeners
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_switch.scss';
</style>
