<template>
  <label
    :checked="isSelected"
    class="k-radio"
    :class="`${isTypeDefault ? 'k-radio-default' : `k-radio-${type}`} ${$attrs.class ? $attrs.class : ''}`"
  >
    <input
      :checked="isSelected"
      v-bind="modifiedAttrs"
      class="k-input"
      type="radio"
      @click="handleClick"
    >
    <span
      v-if="isTypeDefault && hasLabel"
      class="k-radio-label"
    >
      <slot>{{ label }}</slot>
    </span>
    <div
      v-if="isTypeDefault && hasLabel && hasDescription"
      class="k-radio-description"
    >
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="!isTypeDefault && hasLabel">
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

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
    type: String,
    default: '',
    validator: (value: string): boolean => {
      return ['', 'card'].includes(value)
    },
  },
})

const slots = useSlots()

const hasLabel = computed((): boolean => !!(props.label || slots.default))
const hasDescription = computed((): boolean => !!(props.description || slots.description))

const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

const isTypeDefault = computed((): boolean => props.type === '')

const emit = defineEmits(['change', 'update:modelValue'])

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

@mixin disabled {
  background-color: $background-color-card-disabled;
  cursor: not-allowed;
  opacity: 0.6;

  &:hover {
    background-color: $background-color-card-disabled;
    border-color: $border-color-card;
  }
}

@mixin checked {
  background-color: $background-color-card-checked;
  border-color: $border-color-card-checked;
  -webkit-box-shadow: 0px 4px 20px var(--black-10);
  box-shadow: 0px 4px 20px var(--black-10);
}

@mixin checkedAndDisabled {
  &:hover {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
  }
}

.k-radio {
  .k-radio-label {
    font-size: var(--type-sm, type(sm));
  }

  .k-radio-description {
    padding-top: var(--spacing-xxs);
    font-size: var(--type-sm, type(sm));
    line-height: 20px;
    color: $text-color-default;
  }

  // default radio input styling
  &.k-radio-default {
    .k-radio-description {
      padding-left: var(--spacing-lg);
    }

    .k-radio-label:has(+ .k-radio-description) {
      font-weight: 600;
    }
  }

  // card radio input styling
  &.k-radio-card {
    background-color: color(white);
    border: 1px solid $border-color-card;
    border-radius: var(--spacing-xxs);
    cursor: pointer;
    padding: var(--spacing-md);

    .k-input {
      display: none;
    }

    > div {
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
    }

    .k-radio-label {
      color: $text-color-card;
      font-size: var(--type-sm, type(sm));
      font-weight: 500;
      text-align: center;
    }

    &:has(.k-input:disabled) {
      @include disabled;
    }

    // Mozila disabled state handling
    &[disabled=""], &[disabled="true"] {
      @include disabled;
    }

    &:hover {
      background-color: $background-color-card-checked;
      border-color: $border-color-card-checked;
    }

    &:has(.k-input:checked) {
      @include checked;
    }

    // Mozila checked state handling
    &[checked=""], &[checked="true"] {
      @include checked;
    }

    &:has(.k-input:checked:disabled) {
      @include checkedAndDisabled;
    }

    // Mozila checked AND disabled state handling
    &[checked=""][disabled=""], &[checked="true"][disabled="true"] {
      @include checkedAndDisabled;
    }
  }
}
</style>
