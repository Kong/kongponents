<template>
  <KoolTip
    v-if="($attrs.disabled === true || $attrs.disabled === '') && disabledTooltipText"
    :label="disabledTooltipText"
  >
    <label
      :for="$attrs.id ? $attrs.id : null"
      :disabled="$attrs.disabled"
      class="k-switch">
      <span v-if="(label || $scopedSlots.label) && labelPosition === 'left'">
        <slot name="label">{{ label }}</slot>
      </span>
      <input
        :checked="value"
        v-bind="$attrs"
        type="checkbox"
        v-on="listeners">
      <div :class="['switch-control', labelPosition === 'right' ? 'has-label-right' : 'has-label-left' ]" />
      <span v-if="(label || $scopedSlots.label) && labelPosition === 'right'">
        <slot name="label">{{ label }}</slot>
      </span>
    </label>
  </KoolTip>

  <label
    v-else
    :for="$attrs.id ? $attrs.id : null"
    :disabled="$attrs.disabled"
    :class="{ 'switch-with-icon' : enabledIcon }"
    class="k-switch">
    <span v-if="(label || $scopedSlots.label) && labelPosition === 'left'">
      <slot name="label">{{ label }}</slot>
    </span>
    <input
      :checked="value"
      v-bind="$attrs"
      type="checkbox"
      v-on="listeners">
    <div :class="['switch-control', labelPosition === 'right' ? 'has-label-right' : 'has-label-left' ]" />
    <KIcon
      v-if="enabledIcon && value === true"
      color="var(--white)"
      icon="check" />
    <span v-if="(label || $scopedSlots.label) && labelPosition === 'right'">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import KoolTip from '@kongponents/kooltip/KoolTip.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KInputSwitch',
  components: { KoolTip, KIcon },
  inheritAttrs: false,
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
     * Should the switch be positioned to the left or right of the label
     */
    labelPosition: {
      type: String,
      default: 'right',
      validator: (position) => {
        return ['left', 'right'].includes(position)
      }
    },

    /**
     * Tooltip text to be displayed if the switch is disabled
     */
    disabledTooltipText: {
      type: String,
      default: ''
    },

    /**
     * Sets whether or not to display a check icon if the switch is enabled
     */
    enabledIcon: {
      type: Boolean,
      default: false
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
@import '~@kongponents/styles/variables';
@import '~@kongponents/styles/forms/switch';

.k-switch {
  position: relative;

  .kong-icon {
    transform: translateX(-54px);
    position: absolute;
    left: 57px;
    top: 0;
  }
}
</style>
