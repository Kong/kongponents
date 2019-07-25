<template>
  <label class="k-toggle">
    <input
      :checked="isChecked"
      type="checkbox"
      class="toggle_input"
      @change="handleChange">
    <div class="toggle-control"/>
    <span>{{ label || toggleText }}</span>
  </label>
</template>

<script>
export default {
  name: 'KInputSwitch',
  props: {
    /**
     * Sets whether or not toggle is checked
     */
    isChecked: {
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
      return this.isChecked
        ? 'on'
        : 'off'
    }
  },

  methods: {
    /**
     * Emit input checked value on change event
     */
    handleChange (e) {
      this.$emit('change', e.target.checked)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

$width: 44px;
$height: 24px;
$color_checkbox_success: var(--KInputSwitchOn, var(--primary, color(blue-base)));
$transition: .2s cubic-bezier(0.95, 0.05, 0.795, 0.035);

.k-toggle {
  display: flex;
  align-items: center;
  cursor: pointer;
  .toggle-control {
    position: relative;
    display: block;
    width: $width;
    height: $height;
    margin-right: 1rem;
    border-radius: 12px;
    background-color: var(--KInputSwitchBackground, color(grey-92));
    transition: $transition;
    // Toggle
    &:after {
      position: absolute;
      top: 2px;
      left: 2px;
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--twhite-1, color(twhite-1));
      content: '';
      transition: $transition;
    }
    // Checkmark
    &:before {
      display: block;
      width: 20px;
      height: 24px;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      content: '';
      transition: $transition;
    }
  }

  // Hide default checkbox
  input {
    display: none;
    &:checked + .toggle-control {
      background-color: $color_checkbox_success;
      &:after {
        left: $width / 2;
      }
    }
  }

  span {
    color: var(--KInputSwitchLabel, var(--tblack-70, color(tblack-70)));
  }
}
</style>
