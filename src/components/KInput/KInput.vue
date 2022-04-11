<template>
  <div
    :class="{'input-error' : hasError}"
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
          :value="currValue ? currValue : modelValue"
          :class="`k-input-${size}`"
          :aria-invalid="hasError ? hasError : 'false'"
          class="form-control k-input"
          @input="handleInput(true, $event)"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
          @focus="() => isFocused = true"
          @blur="() => isFocused = false"
        >
      </div>
      <p
        v-if="hasError"
        class="has-error"
      >
        {{ errorMessage }}
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
        :value="modelValue"
        :class="`k-input-${size}`"
        :aria-invalid="hasError ? hasError : 'false'"
        class="form-control k-input"
        @input="handleInput(false, $event)"
      >
      <p
        v-if="hasError"
        class="has-error"
      >
        {{ errorMessage }}
      </p>
    </div>

    <input
      v-else
      v-bind="modifiedAttrs"
      :value="modelValue"
      :class="`k-input-${size}`"
      :aria-invalid="hasError ? hasError : 'false'"
      class="form-control k-input"
      @input="handleInput(false, $event)"
    >

    <p
      v-if="hasError && !label"
      class="has-error"
    >
      {{ errorMessage }}
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
import { defineComponent, computed, ref } from 'vue'
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
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['input', 'update:modelValue'],

  setup(props, { attrs, emit }) {
    const currValue = ref('') // We need this so that we don't lose the updated value on hover/blur event with label
    const isFocused = ref(false)
    const isHovered = ref(false)
    const isDisabled = computed((): boolean => !!attrs?.disabled)
    const inputId = computed((): string => attrs.id ? String(attrs.id) : !props.testMode ? uuidv1() : 'test-input-id-1234')

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // use @input in template for v-model support
      delete $attrs.input

      return $attrs
    })

    const handleInput = (updateValue: boolean, $event: any):void => {
      emit('input', $event.target.value)
      emit('update:modelValue', $event.target.value)
      if (updateValue) {
        currValue.value = $event.target.value
      }
    }

    return {
      currValue,
      isFocused,
      isHovered,
      isDisabled,
      inputId,
      modifiedAttrs,
      handleInput,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

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
    font-size: 9px;
    line-height: 11px;
    margin-top: 2px;
  }
}
</style>
