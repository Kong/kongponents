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
      class="k-radio-wrapper"
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
          {{ description }}
        </slot>
      </div>
    </div>

    <label
      v-else-if="label || $slots.default"
      class="k-radio-wrapper"
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
      <span
        v-if="hasDescription"
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
.k-radio {
  display: inline-flex;

  .k-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: var(--kui-color-background, $kui-color-background);
    border: 0;
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
    box-shadow: var(--kui-shadow-border, $kui-shadow-border);
    cursor: pointer;
    height: var(--kui-icon-size-30, $kui-icon-size-30);
    margin-right: var(--kui-space-40, $kui-space-40);
    outline: none;
    width: var(--kui-icon-size-30, $kui-icon-size-30);

    &:hover {
      box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak);
    }

    &:focus, &:focus-visible {
      box-shadow: var(--kui-shadow-border-primary-weak, $kui-shadow-border-primary-weak), var(--kui-shadow-focus, $kui-shadow-focus);
    }

    &:checked {
      box-shadow: 0px 0px 0px 5px #0044f4 inset; // TODO: token needed (kui-shadow-border-primary but with 5px)

      &:focus, &:focus-visible {
        box-shadow: 0px 0px 0px 5px #0044f4 inset, var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &:disabled {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }
    }

    &:disabled {
      box-shadow: 0px 0px 0px 5px #e0e4ea inset; // TODO: token needed (kui-shadow-border-disabled but with 5px)
      cursor: not-allowed;
    }
  }

  &.has-error {
    .k-input {
      &:not(:disabled) {
        box-shadow: var(--kui-shadow-border-danger, $kui-shadow-border-danger);
      }

      &:hover {
        box-shadow: 0px 0px 0px 1px #ad000e inset; // TODO: token needed (kui-shadow-border-danger-strong, red.70)
      }

      &:focus, &:focus-visible {
        box-shadow: 0px 0px 0px 1px #ad000e inset, var(--kui-shadow-focus, $kui-shadow-focus);
      }

      &:checked:not(:disabled) {
        box-shadow: 0px 0px 0px 5px #d60027 inset; // TODO: token needed (kui-shadow-border-danger but with 5px)

        &:focus, &:focus-visible {
          box-shadow: 0px 0px 0px 5px #d60027 inset, var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }
    }
  }

  // .k-radio-wrapper {
  // }

  &.k-radio-card {
    .k-input {
      display: none;
    }

    // .k-radio-wrapper {
    // }
  }
}
</style>
