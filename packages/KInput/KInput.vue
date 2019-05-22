<template>
  <input
    class="form-control k-input"
    v-on="listeners">
</template>

<script>
export default {
  name: 'KInput',
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
}
</script>

<style lang="scss">
input.k-input + .hint {
  margin: var(--spacing-xs) 0 0;
  font-size: var(--type-sm);
  color: var(--tblack-45);
}
</style>

<style scoped lang="scss">
input {
  display: block;
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--KInputColor, var(--tblack-70));
  font-size: var(--type-md);
  font-weight: normal;
  line-height: 1.25;
  border: 1px solid var(--KInputBorder, var(--grey-88));
  background-color: var(--KInputBackground, var(--twhite-1));
  border-radius: 3px;
}

input:focus {
  outline: none !important;
  border: 1px solid var(--KInputFocus, var(--blue-light));
}

input:disabled {
  cursor: not-allowed;
  font-style: italic;
  background-color: var(--KInputDisabledBackground, var(--grey-98));
  opacity: 0.5;
}

input:invalid,
input.input-error {
  outline: none !important;
  border: 1px solid var(--KInputError, var(--red-light));
}

input[type="search"] {
  padding-left: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23000' fill-opacity='.45' fill-rule='evenodd' d='M6 12c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6c0 1.29583043-.410791 2.49571549-1.1092521 3.47653436l1.2305724 1.23057244 2.8232632 2.8338633c.3897175.3911808.3947266 1.0192147.005164 1.4087774-.3868655.3868655-1.014825.3873148-1.4087774-.005164l-2.8338633-2.8232632-1.23057244-1.2305724C8.49571549 11.589209 7.29583043 12 6 12zm4-6c0-2.209139-1.790861-4-4-4S2 3.790861 2 6s1.790861 4 4 4 4-1.790861 4-4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 12px 50%;
}

/* Browser Overrides */
input::placeholder {
  color: var(--tblack-45);
  font-weight: normal;
  opacity: 1;
}

input:invalid,
input:-moz-submit-invalid,
input:-moz-ui-invalid {
  box-shadow: none;
}

input::-ms-clear {
  display: none;
}
</style>
