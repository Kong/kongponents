<template>
  <div
    class="k-radio"
    :class="[
      $attrs.class ? $attrs.class : '',
      kRadioClasses
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
      v-if="!card && (label || $slots.default)"
      class="radio-label-wrapper"
      :class="{ 'has-description': showDescription }"
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
        v-if="showDescription"
        class="radio-description"
      >
        <slot name="description">
          <p>{{ description }}</p>
        </slot>
      </div>
    </div>

    <label
      v-else-if="label || $slots.default"
      class="radio-card-wrapper radio-label-wrapper"
      :class="{ 'has-label': label, 'has-description': showCardDescription }"
      :for="inputId"
      :tabindex="isDisabled ? -1 : 0"
      @keydown.space.prevent
      @keyup.space="handleClick"
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
      <span
        v-if="showCardDescription"
        class="radio-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </span>
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
    validator: (value: LabelAttributes): boolean => {
      if (value.help) {
        console.warn('KRadio: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#klabel')
      }

      return true
    },
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
  error: {
    type: Boolean,
    default: false,
  },
  card: {
    type: Boolean,
    default: false,
  },
  /**
   * @deprecated in favor of `card`
   */
  type: {
    type: String as PropType<RadioTypes>,
    default: '',
    validator: (value: RadioTypes): boolean => {
      if (value) {
        console.warn('KRadio: `type` prop is deprecated. Please use `card` prop instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kradio')
      }

      return RadioTypesArray.includes(value)
    },
  },
})

const slots = useSlots()

const inputId = computed((): string => attrs.id ? String(attrs.id) : uuidv4())
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const hasLabel = computed((): boolean => !!(props.label || slots.default))
// for regular radio we only show description if there is a label or default slot
const showDescription = computed((): boolean => hasLabel.value && (!!props.description || !!slots.description))
// for card radio we only show description if there is a label
const showCardDescription = computed((): boolean => !!props.label && (!!props.description || !!slots.description))
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

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const kRadioClasses = computed((): Record<string, boolean> => {
  return {
    disabled: isDisabled.value,
    'radio-card': props.card || props.type === 'card',
    'input-error': props.error,
    checked: isChecked.value,
    'has-description': showDescription.value,
  }
})
</script>

<style lang="scss" scoped>
/* Component variables */
// Only add variables here sparingly for ease of use when the same value needs to be referenced for display logic.

$kRadioDotSize: 6px;

/* Component mixins */

@mixin kRadioInputDot {
  background-color: var(--kui-color-background, $kui-color-background);
  border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
  content: '';
  height: $kRadioDotSize;
  inset: 0;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: background-color $kongponentsTransitionDurTimingFunc;
  width: $kRadioDotSize;
}

/* Component styles */

.k-radio {
  align-items: flex-start;
  display: inline-flex;

  /* Radio button styles */
  .radio-input {
    @include radioCheckboxDefaults;

    // Since the mixin is used in both KRadio and KCheckbox it doesn't have rules for some component-specific properties so we need to set them here
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
    margin-top: 3px; // align with label
    position: relative;

    &:hover {
      @include radioCheckboxHover;
    }

    &:focus-visible {
      @include radioCheckboxFocus;
    }

    &:active:not(:disabled) {
      @include radioCheckboxActive;

      &::before {
        @include kRadioInputDot;
      }
    }

    &:checked {
      @include radioCheckboxChecked;

      &::before {
        @include kRadioInputDot;
      }

      &:focus-visible {
        @include radioCheckboxCheckedFocus;
      }

      &:active {
        @include radioCheckboxCheckedActive;
      }

      &:disabled {
        @include radioCheckboxCheckedDisabled;

        &::before {
          background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
        }
      }
    }

    &:disabled {
      @include radioCheckboxDisabled;
    }
  }

  &.input-error {
    .radio-input {
      &:not(:disabled) {
        @include radioCheckboxError;

        &:hover {
          @include radioCheckboxErrorHover;
        }

        &:focus-visible {
          @include radioCheckboxErrorFocus;
        }

        &:checked {
          @include radioCheckboxErrorChecked;

          &:focus-visible {
            @include radioCheckboxErrorCheckedFocus;
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
      @include inputHelpText;

      margin-top: var(--kui-space-20, $kui-space-20);

      p {
        @include inputHelpText;

        margin: 0; // reset default margin from browser
      }
    }
  }

  &.disabled .radio-label {
    cursor: not-allowed;
  }

  /* Card styles */
  &.radio-card {
    width: 100%;

    .radio-input {
      display: none;
    }

    .radio-card-wrapper {
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
      transition: box-shadow $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc;
      width: 100%;

      &:hover {
        box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
      }

      &:active {
        box-shadow: var(--kui-shadow-border-primary-strongest, $kui-shadow-border-primary-strongest);
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak), var(--kui-shadow-focus, $kui-shadow-focus);
      }

      .card-content-wrapper {
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        height: 100%;
        transition: color $kongponentsTransitionDurTimingFunc;
      }

      &.has-label, &.has-description {
        .card-content-wrapper {
          height: auto;
          margin-bottom: var(--kui-space-40, $kui-space-40);
        }
      }

      .radio-label {
        @include labelDefaults;

        transition: color $kongponentsTransitionDurTimingFunc;
      }
    }

    &.checked.radio-card:not(.disabled) {
      .radio-card-wrapper {
        box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-primary, $kui-color-border-primary) inset;

        &:hover {
          box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-primary-strong, $kui-color-border-primary-strong) inset;

          .radio-label {
            color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
          }

          .card-content-wrapper {
            color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
          }
        }

        &:active {
          box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-primary-strongest, $kui-color-border-primary-strongest) inset;

          .radio-label {
            color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
          }

          .card-content-wrapper {
            color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
          }
        }

        &:focus-visible {
          box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-primary-strong, $kui-color-border-primary-strong) inset, var(--kui-shadow-focus, $kui-shadow-focus);
        }

        .radio-label {
          color: var(--kui-color-text-primary, $kui-color-text-primary);
        }

        .card-content-wrapper {
          color: var(--kui-color-text-primary, $kui-color-text-primary);
        }
      }
    }

    &.input-error.radio-card:not(.disabled) {
      .radio-card-wrapper {
        box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);

        &:hover {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong);
        }

        &:active {
          box-shadow: var(--kui-shadow-border-primary-strongest, $kui-shadow-border-primary-strongest);
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-border-danger-strong, $kui-shadow-border-danger-strong), var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }

      &.checked {
        .radio-card-wrapper {
          box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-danger, $kui-color-border-danger) inset;

          &:hover {
            box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-danger-strong, $kui-color-border-danger-strong) inset;
          }

          &:active {
            box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-primary-strongest, $kui-color-border-primary-strongest) inset;
          }

          &:focus-visible {
            box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-danger-strong, $kui-color-border-danger-strong) inset, var(--kui-shadow-focus, $kui-shadow-focus);
          }

          .radio-label {
            color: var(--kui-color-text, $kui-color-text);
          }

          .card-content-wrapper {
            color: var(--kui-color-text, $kui-color-text);
          }
        }
      }
    }

    &.disabled.radio-card {
      .radio-card-wrapper {
        box-shadow: var(--kui-shadow-border-disabled, $kui-shadow-border-disabled);
        cursor: not-allowed;

        .radio-label, .card-content-wrapper {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled);
        }
      }

      &.checked {
        .radio-card-wrapper {
          background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
          box-shadow: var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-0, $kui-border-width-0) var(--kui-border-width-20, $kui-border-width-20) var(--kui-color-border-disabled, $kui-color-border-disabled) inset;
        }
      }
    }
  }
}
</style>
