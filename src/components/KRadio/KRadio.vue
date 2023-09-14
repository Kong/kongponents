<template>
  <div
    :checked="isSelected"
    class="k-radio"
    :class="[
      isTypeDefault ? 'k-radio-default' : `k-radio-${type}`,
      $attrs.class ? $attrs.class : '',
      { 'disabled': isDisabled }
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

    <KLabel
      v-if="isTypeDefault && hasLabel"
      v-bind="labelAttributes"
      class="k-radio-label"
      :class="{ 'has-description': hasDescription }"
      :for="inputId"
    >
      <slot>{{ label }}</slot>

      <div
        v-if="hasDescription"
        class="k-radio-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </div>

      <template
        v-if="hasTooltip"
        #tooltip
      >
        <slot name="tooltip" />
      </template>
    </KLabel>

    <label
      v-else-if="$slots.default"
      :for="inputId"
    >
      <slot name="default" />
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
    default: 'on',
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
  /**
   * Controls appearance of radio input element
   */
  type: {
    type: String as PropType<RadioTypes>,
    default: 'radio',
    validator: (value: RadioTypes): boolean => RadioTypesArray.includes(value),
  },
  /**
   * Test mode - for testing only, strips out generated ids
   */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()

const inputId = computed((): string => attrs.id ? String(attrs.id) : props.testMode ? 'test-radio-input-id-1234' : uuidv4())
const isDisabled = computed((): boolean => attrs?.disabled !== undefined && String(attrs?.disabled) !== 'false')
const hasLabel = computed((): boolean => !!(props.label || slots.default))
const hasDescription = computed((): boolean => !!(props.description || slots.description))
const hasTooltip = computed((): boolean => !!slots.tooltip)

const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

const isTypeDefault = computed((): boolean => props.type === 'radio')

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
@import '@/styles/mixins';

.k-radio {
  .k-input {
    @include input-type-radio;
  }
}
</style>

<style lang="scss">
@import '@/styles/tmp-variables';
@import '@/styles/mixins';

$text-color-card: var(--kui-color-text, $kui-color-text);
$border-color-card: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak);
$background-color-card-checked: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
$border-color-card-checked: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
$background-color-card-disabled: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);

@mixin kRadioDisabled {
  background-color: $background-color-card-disabled;
  cursor: not-allowed;
  opacity: 0.6;

  &:hover {
    background-color: $background-color-card-disabled;
    border-color: $border-color-card;
  }
}

@mixin kRadioChecked {
  background-color: $background-color-card-checked;
  border-color: $border-color-card-checked;
  box-shadow: 0px 4px 20px $tmp-color-black-10;
}

@mixin kRadioCheckedAndDisabled {
  &:hover {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
  }
}

.k-radio {
  display: inline-block;

  .k-radio-label {
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    margin: var(--kui-space-0, $kui-space-0);
    vertical-align: middle;

    &.has-description {
      display: inline !important;
    }
  }

  &.disabled {
    .k-radio-label {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  .k-radio-description {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    padding-top: var(--kui-space-20, $kui-space-20);
  }

  // default radio input styling
  &.k-radio-default {
    .k-radio-label:has(> .k-radio-description) {
      font-weight: var(--kui-font-weight-semibold, #{$kui-font-weight-semibold});
    }
    .k-radio-description {
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      padding-left: var(--kui-space-80, $kui-space-80);
    }
  }

  // card radio input styling
  &.k-radio-card {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-10, $kui-border-width-10) solid $border-color-card;
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    cursor: pointer;

    .k-input {
      display: none;
    }

    > label {
      align-items: center;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      // Apply padding to the label so the entire element is clickable
      padding: var(--kui-space-60, $kui-space-60);
      width: 100%;
    }

    &[disabled], &.disabled {
      > label {
        cursor: not-allowed;
      }
    }

    .k-radio-label {
      color: $text-color-card;
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      text-align: center;
    }

    &:has(.k-input:disabled) {
      @include kRadioDisabled;
    }

    // Firefox disabled state handling
    &[disabled=""], &[disabled="true"] {
      @include kRadioDisabled;
    }

    &:hover {
      background-color: $background-color-card-checked;
      border-color: $border-color-card-checked;
    }

    &:has(.k-input:checked) {
      @include kRadioChecked;
    }

    // Firefox checked state handling
    &[checked=""], &[checked="true"] {
      @include kRadioChecked;
    }

    &:has(.k-input:checked:disabled) {
      @include kRadioCheckedAndDisabled;
    }

    // Firefox checked AND disabled state handling
    &[checked=""][disabled=""], &[checked="true"][disabled="true"] {
      @include kRadioCheckedAndDisabled;
    }
  }
}
</style>
