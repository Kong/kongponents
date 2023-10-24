<template>
  <div
    class="k-radio"
    :class="[
      $attrs.class ? $attrs.class : '',
      { 'disabled': isDisabled, 'k-radio-card': isCard || type === 'card', 'has-error': hasError, 'checked': isChecked, 'has-description': hasDescription }
    ]"
  >
    <input
      :id="inputId"
      :checked="isChecked"
      v-bind="modifiedAttrs"
      class="radio-input"
      :disabled="isDisabled"
      type="radio"
      @click="handleClick"
    >

    <div
      v-if="!isCard && (label || $slots.default)"
      class="radio-label-wrapper"
      :class="{ 'has-description': hasDescription }"
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

      <div
        v-if="hasDescription"
        class="radio-description"
      >
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </div>
    </div>

    <label
      v-else-if="label || $slots.default"
      class="card-radio-wrapper radio-label-wrapper"
      :class="{ 'has-label': label, 'has-description': hasDescription }"
      :for="inputId"
      :tabindex="isDisabled ? -1 : 0"
      @keyup.enter="handleClick"
    >
      <span
        v-if="$slots.default"
        class="card-content-wrapper"
      >
        <slot />
      </span>
      <span
        v-if="label"
        class="radio-label"
      >
        {{ label }}
      </span>
      <div
        v-if="hasDescription"
        class="radio-description"
      >
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </div>
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
    default: '',
    validator: (value: RadioTypes): boolean => {
      if (value) {
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
// Only add variables for ease of use when the same value is referenced multiple times.

$kRadioDotSize: 6px;

/* Component mixins */

@mixin kRadioInputDot {
  background-color: var(--kui-color-background, $kui-color-background);
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
  align-items: center;
  display: inline-flex;

  &.has-description {
    align-items: flex-start;

    .radio-input {
      margin-top: 3px; // align with label
    }
  }

  /* Radio button styles */
  .radio-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--kui-color-background, $kui-color-background);
    border: 0;
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
    box-shadow: var(--kui-shadow-border, $kui-shadow-border);
    cursor: pointer;
    height: var(--kui-icon-size-30, $kui-icon-size-30);
    margin: 0;
    margin-right: var(--kui-space-40, $kui-space-40);
    outline: none;
    position: relative;
    transition: box-shadow $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc;
    width: var(--kui-icon-size-30, $kui-icon-size-30);

    &:hover {
      box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
    }

    &:focus-visible {
      box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak), var(--kui-shadow-focus, $kui-shadow-focus);
    }

    &:active:not(:disabled) {
      box-shadow: var(--kui-shadow-border-primary-strongest, $kui-shadow-border-primary-strongest);

      &::before {
        @include kRadioInputDot;
      }
    }

    &:checked {
      background-color: var(--kui-color-background-primary, $kui-color-background-primary);
      box-shadow: var(--kui-shadow-border-primary, $kui-shadow-border-primary);

      &::before {
        @include kRadioInputDot;
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &:active {
        background-color: var(--kui-color-background-primary-strongest, $kui-color-background-primary-strongest);
      }

      &:disabled {
        background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);

        &::before {
          background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        }
      }
    }

    &:disabled {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      box-shadow: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
      cursor: not-allowed;
    }
  }

  &.has-error {
    .radio-input {
      &:not(:disabled) {
        box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);

        &:hover {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong);
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong), var(--kui-shadow-focus, $kui-shadow-focus);
        }

        &:checked {
          background-color: var(--kui-color-background-danger, $kui-color-background-danger);

          &:focus-visible {
            box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
          }
        }
      }
    }
  }

  /* Common label & description styles */
  .radio-label-wrapper {
    flex: 1;

    .radio-label {
      cursor: pointer;
      margin: 0;
    }

    .radio-description {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: block;
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-20, $kui-font-size-20);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-20, $kui-line-height-20);

      p {
        // reset default margin from browser
        margin: 0;
      }
    }

    &.has-description {
      .radio-label {
        margin-bottom: var(--kui-space-20, $kui-space-20);
      }
    }
  }

  &.disabled .radio-label {
    cursor: not-allowed;
  }

  /* Card styles */
  &.k-radio-card {
    width: 100%;

    .radio-input {
      display: none;
    }

    .card-radio-wrapper {
      align-items: center;
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      box-shadow: var(--kui-shadow-border, $kui-shadow-border);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
      outline: none;
      padding: var(--kui-space-70, $kui-space-70);
      text-align: center;
      width: 100%;

      &:hover {
        box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak), var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &.has-label, &.has-description {
        .card-content-wrapper {
          margin-bottom: var(--kui-space-40, $kui-space-40);
        }
      }

      .radio-label {
        @include labelDefaults;
      }
    }

    &.checked.k-radio-card {
      .card-radio-wrapper {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
        box-shadow: var(--kui-shadow-border-primary, $kui-shadow-border-primary);
      }
    }

    &.has-error {
      .card-radio-wrapper {
        box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);

        &:hover {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong);
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong), var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }

      &.checked {
        .card-radio-wrapper {
          background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
          box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);
        }
      }
    }

    &.disabled.k-radio-card {
      .card-radio-wrapper {
        background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
        box-shadow: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
        cursor: not-allowed;

        &:hover {
          box-shadow: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
        }
      }
    }
  }
}
</style>
