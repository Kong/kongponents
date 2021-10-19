<template>
  <div class="k-input-wrapper">
    <input
      v-if="!label"
      v-bind="attrs"
      :value="value"
      :class="`k-input-${size}`"
      class="form-control k-input"
      @input="e => {
        $emit('input', e.target.value)
      }"
      v-on="listeners">

    <div
      v-else
      :class="`k-input-label-${size}`"
      class="col-md-4 mt-5">
      <div class="text-on-input">
        <label
          :for="inputId"
          :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled }">
          <span>{{ label }}</span>
        </label>
        <input
          v-bind="attrs"
          :id="inputId"
          :value="currValue ? currValue : value"
          :class="`k-input-${size}`"
          class="form-control k-input"
          @input="e => {
            $emit('input', e.target.value),
            currValue = e.target.value
          }"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
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
import { uuid } from 'vue-uuid'

export default {
  name: 'KInput',
  inheritAttrs: false,
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
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currValue: '', // We need this so that we don't lose the updated value on hover/blur event with label
      isFocused: false,
      isHovered: false,
      inputId: !this.testMode ? uuid.v1() : 'test-input-id-1234'
    }
  },
  computed: {
    attrs () {
      return this.$attrs
    },
    isDisabled () {
      return this.$attrs.hasOwnProperty('disabled')
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
