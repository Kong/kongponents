<template>
  <div
    :class="{'input-error' : charLimitExceeded || hasError}"
    class="k-input-wrapper">
    <div
      v-if="label && overlayLabel"
      :class="`k-input-label-wrapper-${size}`"
      class="mt-5">
      <div class="text-on-input">
        <label
          :for="inputId"
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled }">
          <span>{{ label }}</span>
        </label>
        <input
          v-bind="$attrs"
          :id="inputId"
          :value="currValue || modelValueChanged ? currValue : value"
          :class="`k-input-${size}`"
          :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
          class="form-control k-input"
          @input="handleInput"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
          v-on="listeners">
      </div>
      <p
        v-if="charLimitExceeded || hasError"
        :class="{ 'over-char-limit': charLimitExceeded }"
        class="has-error"
      >
        {{ charLimitExceededError || errorMessage }}
      </p>
    </div>

    <div
      v-else-if="label"
      :class="`k-input-label-wrapper-${size}`">
      <KLabel
        :for="inputId"
        v-bind="labelAttributes">
        {{ label }}
      </KLabel>
      <input
        v-bind="$attrs"
        :id="inputId"
        :value="currValue || modelValueChanged ? currValue : value"
        :class="`k-input-${size}`"
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="form-control k-input"
        @input="handleInput"
        v-on="listeners">
      <p
        v-if="charLimitExceeded || hasError"
        :class="{ 'over-char-limit': charLimitExceeded }"
        class="has-error"
      >
        {{ charLimitExceededError || errorMessage }}
      </p>
    </div>

    <input
      v-else
      v-bind="$attrs"
      :value="currValue || modelValueChanged ? currValue : value"
      :class="`k-input-${size}`"
      :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
      class="form-control k-input"
      @input="handleInput"
      v-on="listeners">

    <p
      v-if="(charLimitExceeded || hasError) && !label"
      :class="{ 'over-char-limit': charLimitExceeded }"
      class="has-error"
    >
      {{ charLimitExceededError || errorMessage }}
    </p>

    <p
      v-if="help"
      class="help">
      {{ help }}
    </p>
  </div>
</template>

<script>
import KLabel from '@kongponents/klabel/KLabel.vue'
import { uuid } from 'vue-uuid'

export default {
  name: 'KInput',
  components: { KLabel },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    /**
     * Overlay the label on the input's border
     */
    overlayLabel: {
      type: Boolean,
      default: false
    },
    labelAttributes: {
      type: Object,
      default: () => ({})
    },
    help: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    },
    hasError: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    characterLimit: {
      type: Number,
      default: null,
      // Ensure the characterLimit is greater than zero
      validator: (limit) => limit > 0
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
      modelValueChanged: false, // Determine if the original value was modified by the user
      isFocused: false,
      isHovered: false
    }
  },
  computed: {
    inputId () {
      return this.$attrs.id ? this.$attrs.id : !this.testMode ? uuid.v1() : 'test-input-id-1234'
    },
    charLimitExceeded () {
      return !!this.characterLimit && (this.currValue.toString().length || (!this.modelValueChanged && this.value.toString().length)) > this.characterLimit
    },
    charLimitExceededError () {
      if (!this.charLimitExceeded) {
        return ''
      }

      return this.modelValueChanged ? `${this.currValue.toString().length} / ${this.characterLimit}` : `${this.value.toString().length} / ${this.characterLimit}`
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
  },
  watch: {
    charLimitExceeded (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('char-limit-exceeded', {
          value: this.currValue,
          length: this.currValue.toString().length,
          characterLimit: this.characterLimit,
          limitExceeded: newVal
        })
      }
    }
  },
  methods: {
    handleInput ($event) {
      this.currValue = $event.target.value
      this.modelValueChanged = true
      this.$emit('input', $event.target.value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';
@import '~@kongponents/styles/forms/inputs';

.form-control {
  box-shadow: none !important;
}

.help {
  display: block;
  margin: var(--spacing-xs, spacing(xs)) 0 0;
  font-size: var(--type-sm, type(sm));
  color: var(--black-45, color(black-45));
}

.has-error {
  font-weight: 500;
  color: var(--red-500);
}

.k-input-wrapper {
  input.k-input {
    -webkit-appearance: none;
  }

  &.w-auto .k-input {
    width: auto;
  }

  &.w-100 .k-input {
    width: 100%;
  }

  &.w-75 .k-input {
    width: 75%;
  }

  &.w-50 .k-input {
    width: 50%;
  }

  &.w-25 .k-input {
    width: 25%;
  }

  & .k-input-label-wrapper-large .has-error,
  & .k-input-large + .has-error {
    font-size: 12px;
    line-height: 15px;
    margin-top: 4px;
  }

  & .k-input-label-wrapper-medium .has-error,
  & .k-input-medium + .has-error {
    font-size: 10px;
    line-height: 13px;
    margin-top: 3px;
  }

  & .k-input-label-wrapper-small .has-error,
  & .k-input-small + .has-error {
    font-size: 9px;
    line-height: 11px;
    margin-top: 2px;
  }

  .text-on-input label.hovered,
  .text-on-input label:hover {
    color: var(--KInputHover, var(--blue-500));
  }

  &.input-error {
    .text-on-input label.hovered,
    .text-on-input label:hover {
      color: var(--red-500);
    }
  }
}

</style>
