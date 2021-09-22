<template>
  <div class="k-input-wrapper">
    <input
      v-if="!label"
      :value="value"
      v-bind="attrs"
      :class="`k-input-${size}`"
      class="form-control k-input"
      @input="e => $emit('input', e.target.value)"
      v-on="listeners">

    <div
      v-else
      :class="`k-input-label-${size}`"
      class="col-md-4 mt-5">
      <div class="text-on-input">
        <label :class="{ focused: isFocused }">
          {{ label }}
        </label>
        <input
          :value="value"
          v-bind="attrs"
          :class="`k-input-${size}`"
          class="form-control k-input"
          @input="e => $emit('input', e.target.value)"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners">
      </div>
    </div>

    <p
      v-if="help"
      class="help">
      {{ help }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'KInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    help: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  data () {
    return {
      isFocused: false
    }
  },
  computed: {
    attrs () {
      return this.$attrs
    },
    listeners () {
      const listeners = { ...this.$listeners }

      // use @input in template for v-model support
      delete listeners['input']

      return listeners
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';

.text-on-input {
  position: relative;

  .focused {
    color: var(--KInputLabelColor, var(--KInputBorder, var(--blue-500)));
  }

  label {
    position: absolute;
    top: -8px;
    left: 13px;
    padding: 2px;
    z-index: 1;

    font-size: 11px;
    font-weight: 500;
    color: var(--KInputBorder, var(--gray-300));
    background-color: var(--KInputBackground, var(--white));
    display: inline-block;
    margin-bottom: .5rem;
  }
}

.form-control {
  box-shadow: none !important;
}

.help {
  display: block;
  margin: var(--spacing-xs, spacing(xs)) 0 0;
  font-size: var(--type-sm, type(sm));
  color: var(--black-45, color(black-45));
}
</style>
