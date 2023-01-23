<template>
  <label
    class="k-radio"
    :class="`k-radio-${type} ${$attrs.class ? $attrs.class : ''}`"
  >
    <input
      :checked="isSelected"
      v-bind="modifiedAttrs"
      class="k-input"
      type="radio"
      @click="handleClick"
    >
    <div
      v-if="!isTypeDefault && hasHeader"
      class="k-radio-content-header"
    >
      <slot name="header" />
    </div>
    <span
      v-if="hasLabel"
      class="k-radio-label"
    >
      <slot>{{ label }}</slot>
    </span>
    <div
      v-if="hasLabel && (description || hasDescription)"
      class="k-radio-description"
    >
      <slot name="description">{{ description }}</slot>
    </div>
    <div
      v-if="!isTypeDefault && hasFooter"
      class="k-radio-content-footer"
    >
      <slot name="footer" />
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
  type: {
    type: String,
    default: 'default',
    validator: (value: string): boolean => {
      return ['default', 'card'].includes(value)
    },
  },
})

const slots = useSlots()

const hasLabel = computed((): boolean => !!(props.label || slots.default))
const hasDescription = computed((): boolean => !!(props.description || slots.description))
const hasHeader = computed((): boolean => !!(slots.header))
const hasFooter = computed((): boolean => !!(slots.footer))

const isSelected = computed((): boolean => props.selectedValue === props.modelValue)

const isTypeDefault = computed((): boolean => props.type === 'default')

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

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

$text-color-default: var(--black-45, rgba(0, 0, 0, 0.45));
$text-color-card: color(black-500);
$border-color-card: color(grey-300);
$background-color-card-checked: color(blue-100);
$border-color-card-checked: color(blue-300);
$background-color-card-disabled: color(grey-200);

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
.k-radio-default {
  .k-radio-description {
    padding-left: var(--spacing-lg);
  }

  .k-radio-label:has(+ .k-radio-description) {
    font-weight: 600;
  }
}

// card radio input styling
.k-radio-card {
  align-items: center;
  background-color: color(white);
  border: 1px solid $border-color-card;
  border-radius: var(--spacing-xxs);
  cursor: pointer;
  display: flex;
  padding: 16px;
  flex-direction: column;

  .k-input {
    display: none;
  }

  .k-radio-label {
    color: $text-color-card;
    font-size: var(--type-sm, type(sm));
    font-weight: 500;
  }

  .k-radio-content-header {
    margin-bottom:  var(--spacing-sm);
  }

  .k-radio-content-footer {
    margin-top:  var(--spacing-sm);
  }

  &:has(.k-input:disabled) {
    background-color: $background-color-card-disabled;
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      border-color: $border-color-card;
    }
  }

  &:hover {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
  }

  &:has(.k-input:checked) {
    background-color: $background-color-card-checked;
    border-color: $border-color-card-checked;
    -webkit-box-shadow: 0px 4px 20px var(--black-10);
    box-shadow: 0px 4px 20px var(--black-10);
  }

  &:has(.k-input:checked:disabled) {
    border-color: $border-color-card-checked;
  }
}
</style>
