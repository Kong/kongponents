<template>
  <div
    :checked="isSelected"
    class="k-radio"
    :class="[
      $attrs.class ? $attrs.class : '',
      { 'disabled': isDisabled, 'k-radio-card': isCard, 'has-error': hasError }
    ]"
  >
    <input
      :id="inputId"
      :checked="isSelected"
      v-bind="modifiedAttrs"
      class="k-input"
      :disabled="isDisabled"
      type="radio"
      @click="handleClick"
    >

    <div
      v-if="!isCard && (label || $slots.default)"
      class="radio-wrapper"
      :class="{ 'has-description': hasDescription }"
    >
      <KLabel
        v-bind="labelAttributes"
        :for="inputId"
      >
        <slot>{{ label }}</slot>

        <template
          v-if="hasTooltip"
          #tooltip
        >
          <slot name="tooltip" />
        </template>
      </KLabel>

      <p
        v-if="hasDescription"
        class="radio-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <label
      v-else-if="label || $slots.default"
      class="radio-wrapper"
      :for="inputId"
      :tabindex="isDisabled ? -1 : 0"
    >
      <slot />
      <span
        v-if="label"
        class="radio-label"
      >
        {{ label }}
      </span>
      <p
        v-if="hasDescription"
        class="radio-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </label>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, useAttrs, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { RadioTypes, LabelAttributes } from '@/types'
import { RadioTypesArray } from '@/types'
import KLabel from '@/components/KLabel/KLabel.vue'

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
const props = defineProps({
  /**
   * Sets whether or not radio is selected
   */
  modelValue: {
    type: [String, Number, Boolean, Object],
    default: 'true',
    required: true,
  },
  /**
   * Overrides default label text
   */
  label: {
    type: String,
    default: '',
  },
  labelAttributes: {
    type: Object as PropType<LabelAttributes>,
    default: () => ({}),
  },
  /**
   * Overrides default description text
   */
  description: {
    type: String,
    default: '',
  },
  /**
   * The value emitted from the radio on change if selected
   */
  selectedValue: {
    type: [String, Number, Boolean, Object],
    required: true,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  isCard: {
    type: Boolean,
    default: false,
  },
  /**
   * @deprecated in favor of `isCard`
   */
  type: {
    type: String as PropType<RadioTypes>,
    default: 'radio',
    validator: (value: RadioTypes): boolean => {
      console.warn('KRadio: `type` prop is deprecated in favor of `isCard`. Please see the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kradio')

      return RadioTypesArray.includes(value)
    },
  },
})

const slots = useSlots()

const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const hasDescription = computed((): boolean => !!(props.description || slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)
const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

const emit = defineEmits<{
  (e: 'change', value: string | boolean | number | object): void
  (e: 'update:modelValue', value: string | boolean | number | object): void
}>()

const handleClick = (): void => {
  emit('change', props.selectedValue)
  emit('update:modelValue', props.selectedValue)
}

const attrs = useAttrs()

const modifiedAttrs = computed(() => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kRadioFocusRing: var(--kui-shadow-focus, $kui-shadow-focus);
$kRadioBackground: var(--kui-color-background, $kui-color-background);
$kRadioBorder: var(--kui-shadow-border, $kui-shadow-border);
$kRadioHoverBorder: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
// checked
$kRadioCheckedBackground: var(--kui-color-background-primary, $kui-color-background-primary);
$kRadioCheckedBorder: var(--kui-shadow-border-primary, $kui-shadow-border-primary);
$kRadioDotBackground: var(--kui-color-background, $kui-color-background);
// error
$kRadioErrorBackground: var(--kui-color-background-danger, $kui-color-background-danger);
$kRadioErrorBorder: var(--kui-shadow-border-danger, $kui-shadow-border-danger);
$kRadioErrorHoverBorder: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong);
// disabled
$kRadioDisabledBackground: var(--kui-color-background-disabled, $kui-color-background-disabled);
$kRadioDisabledBorder: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
$kRadioDisabledDotBackground: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);

/* Component mixins */

@mixin kRadioInputDot {
  background-color: $kRadioDotBackground;
  border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
  content: '';
  height: 6px;
  inset: 0;
  margin-left: 50%;
  margin-top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  transition: background-color $kongponentsTransitionDurTimingFunc;
  width: 6px;
}

/* Component styles */

.k-radio {
  display: inline-flex;

  .k-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: $kRadioBackground;
    border: 0;
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
    box-shadow: $kRadioBorder;
    cursor: pointer;
    height: var(--kui-icon-size-30, $kui-icon-size-30);
    margin-right: var(--kui-space-40, $kui-space-40);
    outline: none;
    position: relative;
    transition: box-shadow $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc;
    width: var(--kui-icon-size-30, $kui-icon-size-30);

    &:hover {
      box-shadow: $kRadioHoverBorder;
    }

    &:focus, &:focus-visible {
      box-shadow: $kRadioHoverBorder, $kRadioFocusRing;
    }

    &:checked {
      background-color: $kRadioCheckedBackground;
      box-shadow: $kRadioCheckedBorder;

      &::before {
        @include kRadioInputDot;
      }

      &:focus, &:focus-visible {
        box-shadow: $kRadioFocusRing;
      }

      &:disabled {
        background-color: $kRadioDisabledBackground;

        &::before {
          background-color: $kRadioDisabledDotBackground;
        }
      }
    }

    &:disabled {
      background-color: $kRadioDisabledBackground;
      box-shadow: $kRadioDisabledBorder;
      cursor: not-allowed;

      &::before {
        @include kRadioInputDot;
      }
    }
  }

  &.has-error {
    .k-input {
      &:not(:disabled) {
        box-shadow: $kRadioErrorBorder;

        &:hover {
          box-shadow: $kRadioErrorHoverBorder;
        }

        &:focus, &:focus-visible {
          box-shadow: $kRadioErrorHoverBorder, $kRadioFocusRing;
        }

        &:checked {
          background-color: $kRadioErrorBackground;
          box-shadow: $kRadioErrorBorder;

          &:focus, &:focus-visible {
            box-shadow: $kRadioFocusRing;
          }
        }
      }
    }
  }

  .radio-wrapper {
    .radio-description {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-20, $kui-font-size-20);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-20, $kui-line-height-20);
      // reset default margin from browser
      margin: 0;
    }
  }

  &.k-radio-card {
    width: 100%;

    .k-input {
      display: none;
    }

    .radio-wrapper {
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;

      .radio-label {
        @include labelDefaults;

        margin-top: var(--kui-space-40, $kui-space-40);
      }
    }
  }
}
</style>
