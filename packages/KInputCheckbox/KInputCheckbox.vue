<template>
  <label class="k-inputCheckbox">
    <input
      :checked="value"
      v-bind="$attrs"
      type="checkbox"
      v-on="listeners">
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
export default {
  name: 'KInputCheckbox',
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
$primaryColor: var(--KInputCheckboxPrimary, var(--blue-base, color(blue-base)));
$borderColor: var(--KInputCheckboxBorder, var(--tblack-25, color(tblack-25)));

.k-inputCheckbox {
  input[type="checkbox"] {
    display: inline-block;
    vertical-align: middle;
    height: 20px;
    width: 20px;
    padding: 0;
    color: $primaryColor;
    border: 1px solid $borderColor;
    border-radius: 0.25rem;
    box-sizing: border-box;
    background-color: #fff;

    // Overide browser defaults
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    -webkit-print-color-adjust: exact;
            user-select: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.633 0L12 1.397 3.583 10 0 6.337 1.367 4.94l2.216 2.265z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/svg%3E");
      border-color: transparent;
      background-color: currentColor;
      background-position: center;
      background-repeat: no-repeat;
    }

    &:hover {
      border-color: $primaryColor;
    }

    &:focus {
      outline: none;
      border-color: $primaryColor;
    }

    &:disabled {
      background-color: var(--KInputCheckboxDisabled, var(--grey-92, color(grey-92)));
      cursor: not-allowed;
      &:hover {
        border-color: $borderColor;
      }
    }
  }
}
</style>
