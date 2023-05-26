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
      :class="{ 'd-inline': hasDescription }"
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
import { computed, useAttrs, useSlots, PropType } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { RadioTypes, RadioTypesArray, LabelAttributes } from '@/types'
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

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

$text-color-default: var(--black-45, rgba(0, 0, 0, 0.45));
$text-color-card: color(black-500);
$border-color-card: color(grey-300);
$background-color-card-checked: color(blue-100);
$border-color-card-checked: color(blue-300);
$background-color-card-disabled: color(grey-200);

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
  -webkit-box-shadow: 0px 4px 20px var(--black-10);
  box-shadow: 0px 4px 20px var(--black-10);
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
    --KInputLabelWeight: 400;
    --KInputLabelLineHeight: 20px;
    --KInputLabelFont: Inter,Helvetica,Arial,sans-serif;
    --KInputLabelMargin: 0;
    --KInputLabelSize: var(--type-sm, type(sm));

    vertical-align: middle;
  }

  &.disabled {
    .k-radio-label {
      color: var(--KInputRadioDisabled, var(--grey-400, color(grey-400)));
    }
  }

  .k-radio-description {
    color: $text-color-default;
    font-size: var(--type-sm, type(sm));
    line-height: 20px;
    padding-top: var(--spacing-xxs);
  }

  // default radio input styling
  &.k-radio-default {
    .k-radio-label:has(> .k-radio-description) {
      --KInputLabelWeight: 600;
    }

    .k-radio-description {
      font-weight: 400;
      padding-left: var(--spacing-lg);
    }

  }

  // card radio input styling
  &.k-radio-card {
    background-color: color(white);
    border: 1px solid $border-color-card;
    border-radius: var(--spacing-xxs);
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
      padding: var(--spacing-md);
      width: 100%;
    }

    &[disabled], &.disabled {
      > label {
        cursor: not-allowed;
      }
    }

    .k-radio-label {
      color: $text-color-card;
      font-size: var(--type-sm, type(sm));
      font-weight: 500;
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
