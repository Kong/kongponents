<template>
  <div
    class="k-radio"
    :class="[
      $attrs.class ? $attrs.class : '',
      { 'disabled': isDisabled, 'k-radio-card': isCard, 'has-error': hasError, 'checked': isChecked }
    ]"
  >
    <input
      :id="inputId"
      :checked="isChecked"
      v-bind="modifiedAttrs"
      class="k-input"
      :disabled="isDisabled"
      type="radio"
      @click="handleClick"
    >

    <div
      v-if="!isCard && (label || $slots.default)"
      class="radio-label-wrapper"
    >
      <KLabel
        v-bind="labelAttributes"
        class="radio-label"
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
      class="card-radio-wrapper radio-label-wrapper"
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
    default: true,
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
      if (value === 'card') {
        console.warn('KRadio: `type` prop is deprecated in favor of `isCard`. Please see the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kradio')
      }

      return RadioTypesArray.includes(value)
    },
  },
})

const slots = useSlots()

const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const hasDescription = computed((): boolean => !!(props.description || slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)
const isChecked = computed((): boolean => props.selectedValue === props.modelValue)

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

$kRadioDotSize: 6px;
$kRadioDotBackground: var(--kui-color-background, $kui-color-background);
$kRadioBackground: var(--kui-color-background, $kui-color-background);
$kRadioBorder: var(--kui-shadow-border, $kui-shadow-border);
$kRadioHoverBorder: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
// focus
$kRadioFocusRing: var(--kui-shadow-focus, $kui-shadow-focus);
// active
$kRadioActiveBackground: var(--kui-color-background-primary-strongest, $kui-color-background-primary-strongest);
$kRadioActiveBorder: var(--kui-shadow-border-primary-strongest, $kui-shadow-border-primary-strongest);
// checked
$kRadioCheckedBackground: var(--kui-color-background-primary, $kui-color-background-primary);
$kRadioCheckedBorder: var(--kui-shadow-border-primary, $kui-shadow-border-primary);
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
  height: $kRadioDotSize;
  inset: 0;
  margin-left: 50%;
  margin-top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  transition: background-color $kongponentsTransitionDurTimingFunc;
  width: $kRadioDotSize;
}

/* Component styles */

.k-radio {
  display: inline-flex;

  /* Radio button styles */
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

    &:active:not(:disabled) {
      box-shadow: $kRadioActiveBorder;

      &::before {
        @include kRadioInputDot;
      }
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

      &:active {
        background-color: $kRadioActiveBackground;
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

          &:focus, &:focus-visible {
            box-shadow: $kRadioFocusRing;
          }
        }
      }
    }
  }

  /* Common label & description styles */
  .radio-label-wrapper {
    flex: 1;

    .radio-label {
      margin-bottom: var(--kui-space-20, $kui-space-20);
    }

    .radio-description {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      // reset default margin from browser
      margin: 0;
    }
  }

  /* Card styles */
  &.k-radio-card {
    width: 100%;

    .k-input {
      display: none;
    }

    .card-radio-wrapper {
      align-items: center;
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      box-shadow: $kRadioBorder;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      outline: none;
      padding: var(--kui-space-70, $kui-space-70);
      text-align: center;
      width: 100%;

      &:hover {
        box-shadow: $kRadioHoverBorder;
      }

      &:focus-visible {
        box-shadow: $kRadioHoverBorder, $kRadioFocusRing;
      }

      .radio-label {
        @include labelDefaults;

        margin-top: var(--kui-space-40, $kui-space-40);
      }
    }

    &.checked.k-radio-card {
      .card-radio-wrapper {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        box-shadow: $kRadioCheckedBorder;
      }
    }

    &.has-error {
      .card-radio-wrapper {
        box-shadow: $kRadioErrorBorder;

        &:hover {
          box-shadow: $kRadioErrorHoverBorder;
        }

        &:focus-visible {
          box-shadow: $kRadioErrorHoverBorder, $kRadioFocusRing;
        }
      }

      &.checked {
        .card-radio-wrapper {
          background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
          box-shadow: $kRadioErrorBorder;
        }
      }
    }

    &.disabled.k-radio-card {
      .card-radio-wrapper {
        background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
        box-shadow: $kRadioDisabledBorder;
        cursor: not-allowed;

        &:hover {
          box-shadow: $kRadioDisabledBorder;
        }
      }
    }
  }
}
</style>
