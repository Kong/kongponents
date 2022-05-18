<template>
  <div
    :class="{'input-error' : charLimitExceeded || hasError}"
    class="k-input-wrapper"
  >
    <div
      v-if="label && overlayLabel"
      :class="`k-input-label-wrapper-${size}`"
      class="mt-5"
    >
      <div class="text-on-input">
        <label
          :for="inputId"
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled }"
        >
          <span>{{ label }}</span>
        </label>
        <input
          v-bind="modifiedAttrs"
          :id="inputId"
          :value="currValue || modelValueChanged ? currValue : modelValue"
          :class="`k-input-${size}`"
          :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
          class="form-control k-input"
          @input="handleInput"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
        >
      </div>
      <p
        v-if="charLimitExceeded || hasError"
        class="has-error"
      >
        {{ charLimitExceededError || errorMessage }}
      </p>
    </div>

    <div
      v-else-if="label"
      :class="`k-input-label-wrapper-${size}`"
    >
      <KLabel
        :for="inputId"
        v-bind="labelAttributes"
      >
        {{ label }}
      </KLabel>
      <input
        v-bind="modifiedAttrs"
        :id="inputId"
        :value="currValue || modelValueChanged ? currValue : modelValue"
        :class="`k-input-${size}`"
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="form-control k-input"
        @input="handleInput"
      >
      <p
        v-if="charLimitExceeded || hasError"
        class="has-error"
      >
        {{ charLimitExceededError || errorMessage }}
      </p>
    </div>

    <input
      v-else
      v-bind="modifiedAttrs"
      :value="currValue || modelValueChanged ? currValue : modelValue"
      :class="`k-input-${size}`"
      :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
      class="form-control k-input"
      @input="handleInput"
    >

    <p
      v-if="(charLimitExceeded || hasError) && !label"
      class="has-error"
    >
      {{ charLimitExceededError || errorMessage }}
    </p>

    <p
      v-if="help"
      class="help"
    >
      {{ help }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import KLabel from '@/components/KLabel/KLabel.vue'
import { v1 as uuidv1 } from 'uuid'

export default defineComponent({
  name: 'KInput',
  components: { KLabel },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    /**
     * Overlay the label on the input's border
     */
    overlayLabel: {
      type: Boolean,
      default: false,
    },
    labelAttributes: {
      type: Object,
      default: () => ({}),
    },
    help: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
    },
    hasError: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    characterLimit: {
      type: Number,
      default: null,
      // Ensure the characterLimit is greater than zero
      validator: (limit: number):boolean => limit > 0,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['input', 'update:modelValue', 'char-limit-exceeded'],

  setup(props, { attrs, emit }) {
    const currValue = ref('') // We need this so that we don't lose the updated value on hover/blur event with label
    const modelValueChanged = ref(false) // Determine if the original value was modified by the user
    const isFocused = ref(false)
    const isHovered = ref(false)
    const isDisabled = computed((): boolean => !!attrs?.disabled)
    const inputId = computed((): string => attrs.id ? String(attrs.id) : props.testMode ? 'test-input-id-1234' : uuidv1())

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // use @input in template for v-model support
      delete $attrs.input
      delete $attrs.onInput

      return $attrs
    })

    const charLimitExceeded = computed((): boolean => !!props.characterLimit && (currValue.value.toString().length || (!modelValueChanged.value && props.modelValue.toString().length)) > props.characterLimit)

    const charLimitExceededError = computed((): string => {
      if (!charLimitExceeded.value) {
        return ''
      }

      return modelValueChanged.value ? `${currValue.value.toString().length} / ${props.characterLimit}` : `${props.modelValue.toString().length} / ${props.characterLimit}`
    })

    watch(charLimitExceeded, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        emit('char-limit-exceeded', {
          value: currValue.value,
          length: currValue.value.length,
          characterLimit: props.characterLimit,
          limitExceeded: newVal,
        })
      }
    })

    const handleInput = ($event: any):void => {
      currValue.value = $event.target.value
      modelValueChanged.value = true
      emit('input', $event.target.value)
      emit('update:modelValue', $event.target.value)
    }

    return {
      currValue,
      modelValueChanged,
      isFocused,
      isHovered,
      isDisabled,
      inputId,
      charLimitExceeded,
      charLimitExceededError,
      modifiedAttrs,
      handleInput,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

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

  & .k-input-label-wrapper-large .has-error,
  & .k-input-large + .has-error {
    font-size: 12px;
    line-height: 15px;
    margin-top: 4px;
  }

  & .k-input-label-wrapper-medium .has-error,
  & .k-input-medium + .has-error {
    font-size: 11px;
    line-height: 13px;
    margin-top: 3px;
  }

  & .k-input-label-wrapper-small .has-error,
  & .k-input-small + .has-error {
    font-size: 11px;
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
