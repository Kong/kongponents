<template>
  <div
    class="k-radio"
    :class="[
      $attrs.class ? $attrs.class : '',
      kRadioClasses,
    ]"
  >
    <input
      :id="inputId"
      v-bind="modifiedAttrs"
      :aria-checked="isChecked"
      :checked="isChecked"
      class="radio-input"
      :class="{ 'hidden': card && !cardRadioVisible }"
      :disabled="isDisabled"
      :tabindex="card || isDisabled || isChecked ? -1 : 0"
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
      :class="{ 'has-label': label, 'has-description': showCardDescription, 'show-radio': cardRadioVisible }"
      :data-testid="cardLabelTestId"
      :for="inputId"
      :tabindex="isDisabled || isChecked ? -1 : 0"
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
        v-if="label || showCardDescription"
        class="card-label-container"
      >
        <span
          v-if="label"
          class="radio-label"
        >
          {{ label }}

          <KTooltip
            v-if="slots.tooltip"
            class="label-tooltip"
          >
            <InfoIcon
              class="tooltip-trigger-icon"
              :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
              tabindex="0"
            />
            <template #content>
              <slot name="tooltip" />
            </template>
          </KTooltip>
        </span>
        <span
          v-if="showCardDescription"
          class="radio-description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </span>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { computed, useAttrs, useId, watch } from 'vue'
import type { RadioTypes, LabelAttributes, RadioProps, RadioModelValue, RadioEmits, RadioSlots } from '@/types'
import KLabel from '@/components/KLabel/KLabel.vue'
import { InfoIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts" generic="T extends RadioModelValue | null = RadioModelValue | null">
const {
  modelValue,
  label = '',
  labelAttributes = {},
  description = '',
  selectedValue,
  error,
  card,
  cardRadioVisible = true,
  cardOrientation = 'vertical',
  type = '',
} = defineProps<RadioProps<T>>()

watch(() => labelAttributes, (newValue: LabelAttributes): void => {
  if (newValue.help) {
    console.warn('KRadio: `help` property of `labelAttributes` prop is deprecated. Please use `info` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#klabel')
  }
}, { deep: true, immediate: true })

watch(() => type, (newValue: RadioTypes): void => {
  if (newValue) {
    console.warn('KRadio: `type` prop is deprecated. Please use `card` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kradio')
  }
}, { immediate: true })

const emit = defineEmits<RadioEmits<Exclude<T, null>>>()

const slots = defineSlots<RadioSlots>()
const attrs = useAttrs()

const defaultId = useId()
const inputId = computed((): string => attrs.id ? String(attrs.id) : defaultId)
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const hasLabel = computed((): boolean => !!(label || slots.default))
// for regular radio we only show description if there is a label or default slot
const showDescription = computed((): boolean => hasLabel.value && (!!description || !!slots.description))
// for card radio we only show description if there is a label
const showCardDescription = computed((): boolean => !!label && (!!description || !!slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)
const isChecked = computed((): boolean => selectedValue === modelValue)

const handleClick = (): void => {
  emit('change', selectedValue)
  emit('update:modelValue', selectedValue)
}

const modifiedAttrs = computed((): Record<string, any> => {
  const $attrs = { ...attrs }

  // delete classes because we bind them to the parent
  delete $attrs.class

  return $attrs
})

const kRadioClasses = computed((): Record<string, boolean> => {
  return {
    disabled: isDisabled.value,
    'radio-card': card || type === 'card',
    'input-error': error,
    checked: isChecked.value,
    'has-description': showDescription.value,
    'card-horizontal': card && cardOrientation === 'horizontal',
    // Add vertical class for `vertical` or an invalid prop value
    'card-vertical': card && cardOrientation !== 'horizontal',
  }
})

const cardLabelTestId = computed(() => {
  return card && attrs['data-testid'] ? `${attrs['data-testid']}-label` : undefined
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

      &.required {
        margin-left: var(--kui-space-60, $kui-space-60);
      }
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
    position: relative;
    width: 100%;

    .radio-card-wrapper {
      background-color: var(--kui-color-background, $kui-color-background);
      border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      box-shadow: var(--kui-shadow-border, $kui-shadow-border);
      cursor: pointer;
      height: 100%;
      outline: none;
      padding: var(--kui-space-70, $kui-space-70);
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

      .card-label-container {
        display: flex;
        flex-direction: column;

        .radio-label {
          @include labelDefaults;

          align-items: center;
          display: flex;
          gap: var(--kui-space-40, $kui-space-40);
          transition: color $kongponentsTransitionDurTimingFunc;

          .tooltip-trigger-icon {
            cursor: help;
            height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
            width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
          }
        }
      }
    }

    .radio-input {
      left: 0;
      position: absolute;
      top: 0;

      &.hidden {
        display: none;
      }
    }

    &.card-vertical {
      .radio-card-wrapper {
        align-items: center;
        display: flex;
        flex-direction: column;
        text-align: center;

        &.has-label, &.has-description {
          .card-content-wrapper {
            height: auto;
            margin-bottom: var(--kui-space-40, $kui-space-40);
          }
        }

        .radio-label {
          justify-content: center;
        }
      }

      .radio-input {
        margin-left: var(--kui-space-50, $kui-space-50);
        margin-top: var(--kui-space-50, $kui-space-50);
      }
    }

    &.card-horizontal {
      .radio-card-wrapper {
        display: flex;

        &.has-label, &.has-description {
          &:has(.card-content-wrapper) {
            flex-direction: row-reverse;
            gap: var(--kui-space-50, $kui-space-50);
            justify-content: space-between;
          }

          .card-content-wrapper {
            align-self: center;
          }
        }

        &.show-radio {
          padding-left: var(--kui-space-110, $kui-space-110);
        }
      }

      .radio-input {
        margin-left: var(--kui-space-70, $kui-space-70);
        margin-top: var(--kui-space-80, $kui-space-80);
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
