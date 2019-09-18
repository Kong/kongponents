<template>
  <label class="k-switch">
    <input
      :checked="value"
      type="checkbox"
      v-on="listeners">
    <div class="switch-control"/>
    <span v-if="label || $scopedSlots.label">
      <slot name="label">{{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'KInputSwitch',
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
