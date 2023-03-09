<template>
  <div
    class="k-input-wrapper"
    :class="[$attrs.class, {'input-error' : charLimitExceeded || hasError || String($attrs.class || '').includes('input-error')}]"
  >
    <div
      v-if="label && overlayLabel"
      :class="`k-input-label-wrapper-${size}`"
    >
      <div class="text-on-input">
        <label
          v-bind="labelAttributes"
          :class="{ focused: isFocused, hovered: isHovered, disabled: isDisabled, readonly: isReadonly }"
          :for="inputId"
        >
          <span>{{ label }}</span>
        </label>
        <input
          v-bind="modifiedAttrs"
          :id="inputId"
          :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
          class="form-control k-input"
          :class="[`k-input-${size}`, $slots['icon'] ? `has-icon icon-${iconPosition}` : '' ]"
          :value="getValue()"
          @blur="() => isFocused = false"
          @focus="() => isFocused = true"
          @input="handleInput"
          @mouseenter="() => isHovered = true"
          @mouseleave="() => isHovered = false"
        >
      </div>
      <p
        v-if="charLimitExceeded || hasError"
        class="has-error"
        :class="{ 'over-char-limit': charLimitExceeded }"
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
        :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
        class="form-control k-input"
        :class="[`k-input-${size}`, $slots['icon'] ? `has-icon icon-${iconPosition}` : '' ]"
        :value="getValue()"
        @input="handleInput"
      >
      <p
        v-if="charLimitExceeded || hasError"
        class="has-error"
        :class="{ 'over-char-limit': charLimitExceeded }"
      >
        {{ charLimitExceededError || errorMessage }}
      </p>
    </div>

    <input
      v-else
      v-bind="modifiedAttrs"
      :aria-invalid="hasError || charLimitExceeded ? 'true' : undefined"
      class="form-control k-input"
      :class="[`k-input-${size}`, $slots['icon'] ? `has-icon icon-${iconPosition}` : '' ]"
      :value="getValue()"
      @input="handleInput"
    >

    <p
      v-if="(charLimitExceeded || hasError) && !label"
      class="has-error"
      :class="{ 'over-char-limit': charLimitExceeded }"
    >
      {{ charLimitExceededError || errorMessage }}
    </p>

    <p
      v-if="help"
      class="help"
    >
      {{ help }}
    </p>

    <div
      v-if="$slots['icon']"
      ref="icon"
      class="input-icon"
      :class="{ 'clickable': isIconClickable }"
      :tabindex="isIconClickable ? 0 : -1"
      @click="handleIconClick"
      @keyup.enter="handleIconClick"
    >
      <slot name="icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, onMounted } from 'vue'
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
    iconPosition: {
      type: String,
      default: 'left',
      validator: (value: string) => ['left', 'right'].includes(value),
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
    const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
    const isReadonly = computed((): boolean => attrs?.readonly !== undefined && String(attrs?.readonly) !== 'false')
    const inputId = computed((): string => attrs.id ? String(attrs.id) : props.testMode ? 'test-input-id-1234' : uuidv1())
    // we need this so we can create a watcher for programmatic changes to the modelValue
    const value = computed({
      get(): string | number {
        return props.modelValue
      },
      set(newValue: string | number): void {
        handleInput({ target: { value: newValue } })
      },
    })

    const modifiedAttrs = computed(() => {
      const $attrs = { ...attrs }

      // delete classes because we bind them to the parent
      delete $attrs.class
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

    watch(value, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        handleInput({ target: { value: newVal } })
      }
    })

    const handleInput = ($event: any):void => {
      // avoid pass by ref
      const val = JSON.parse(JSON.stringify($event?.target?.value))

      currValue.value = val
      modelValueChanged.value = true
      emit('input', val)
      emit('update:modelValue', val)
    }

    const getValue = (): string | number => {
      // Use the modelValue only if it was initialized to something and the value hasn't been changed
      return currValue.value || modelValueChanged.value ? currValue.value : props.modelValue
    }

    const icon = ref<HTMLDivElement | null>(null)
    const isIconClickable = computed((): boolean => !!attrs['onIcon:click'])
    const handleIconClick = (e: any) => {
      if (isIconClickable.value) {
        // call event listener callback directly
        const callback = attrs['onIcon:click'] as any
        callback(e)
      }
    }

    onMounted(() => {
      if (icon.value && isIconClickable.value) {
        icon.value.role = 'button'
      }
    })

    return {
      currValue,
      modelValueChanged,
      isFocused,
      isHovered,
      isDisabled,
      isReadonly,
      inputId,
      charLimitExceeded,
      charLimitExceededError,
      modifiedAttrs,
      handleInput,
      getValue,
      icon,
      isIconClickable,
      handleIconClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.form-control {
  box-shadow: none !important;

  &.has-icon {
    // input size medium
    $kInputMediumSizingX: 10px;
    $kInputMediumSizingY: var(--spacing-md, spacing(md));
    $kInputMediumIconSize: 24px;

    ~ .input-icon {
      top: $kInputMediumSizingX;

      :deep(svg) {
        height: $kInputMediumIconSize;
        width: $kInputMediumIconSize;
      }
    }

    &.icon-left {
      padding-left: calc($kInputMediumSizingY + var(--spacing-xs, spacing(xs)) + $kInputMediumIconSize) !important; // account for icon offset and width
      ~ .input-icon {
        left: $kInputMediumSizingY;
      }
    }

    &.icon-right {
      padding-right: calc($kInputMediumSizingY + var(--spacing-xs, spacing(xs)) + $kInputMediumIconSize) !important; // account for icon offset and width
      ~ .input-icon {
        right: $kInputMediumSizingY;
      }
    }

    // input size small
    $kInputSmallSizingX: var(--spacing-xs, spacing(xs));
    $kInputSmallSizingY: var(--spacing-sm, spacing(sm));
    $kInputSmallIconSize: 22px;

    &.k-input-small {
      ~ .input-icon {
        top: $kInputSmallSizingX;

        :deep(svg) {
          height: $kInputSmallIconSize;
          width: $kInputSmallIconSize;
        }
      }

      &.icon-left {
        padding-left: calc($kInputSmallSizingY + var(--spacing-xs, spacing(xs)) + $kInputSmallIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          left: $kInputSmallSizingY;
        }
      }
      &.icon-right {
        padding-right: calc($kInputSmallSizingY + var(--spacing-xs, spacing(xs)) + $kInputSmallIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          right: $kInputSmallSizingY;
        }
      }
    }

    // input size large
    $kInputLargeSizingX: var(--spacing-md, spacing(md));
    $kInputLargeSizingY: var(--spacing-lg, spacing(lg));
    $kInputLargeIconSize: 26px;

    &.k-input-large {
      ~ .input-icon {
        top: $kInputLargeSizingX;

        :deep(svg) {
          height: $kInputLargeIconSize;
          width: $kInputLargeIconSize;
        }
      }

      &.icon-left {
        padding-left: calc($kInputLargeSizingY + var(--spacing-xs, spacing(xs)) + $kInputLargeIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          left: $kInputLargeSizingY;
        }
      }
      &.icon-right {
        padding-right: calc($kInputLargeSizingY + var(--spacing-xs, spacing(xs)) + $kInputLargeIconSize) !important; // account for icon offset and width
        ~ .input-icon {
          right: $kInputLargeSizingY;
        }
      }
    }
  }
}

.help {
  color: var(--black-45, color(black-45));
  display: block;
  font-size: var(--type-sm, type(sm));
  margin: var(--spacing-xs, spacing(xs)) 0 0;
}

.input-icon {
  align-items: center;
  display: inline-flex;
  pointer-events: none;
  position: absolute;

  &.clickable {
    cursor: pointer;
    pointer-events: auto;
  }
}

.has-error {
  color: var(--red-500);
  font-weight: 500;
}

.k-input-wrapper {
  position: relative;

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

  .text-on-input label:not(.disabled):not(.readonly).hovered,
  .text-on-input label:not(.disabled):not(.readonly):hover {
    color: var(--KInputHover, var(--blue-500));
  }

  &.input-error {
    .text-on-input label.hovered,
    .text-on-input label:hover,
    .text-on-input label.focused,
    .text-on-input label:focus {
      color: var(--red-500) !important;
    }
  }
}
</style>
