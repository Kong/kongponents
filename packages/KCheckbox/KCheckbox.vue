<template>
  <label class="k-checkbox d-inline-block">
    <input
      :checked="value"
      v-bind="$attrs"
      type="checkbox"
      class="k-input float-left"
      v-on="listeners">
    <span class="float-left"><slot>{{ label }}</slot></span>
  </label>
</template>

<script>
export default {
  name: 'KCheckbox',
  props: {
    /**
     * Sets whether or not checkbox is checked
     */
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    /**
     * Sets label text
     */
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
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
@import '~@kongponents/styles/forms/_checkbox-radio.scss';

.label-text {
  position: relative;
  top: 4px;
}
</style>
