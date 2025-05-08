<template>
  <div class="k-segmented-control">
    <button
      v-for="option in normalizedOptions"
      :key="`${option.value}-option`"
      class="segmented-control-button"
      :class="[size, { selected: modelValue === option.value }]"
      :data-testid="`${option.value}-option`"
      :disabled="getDisabled(option)"
      type="button"
      @click="handleClick(option)"
    >
      <slot
        name="option-label"
        :option="option"
      >
        {{ option.label }}
      </slot>
    </button>
  </div>
</template>

<script lang="ts" setup generic="T extends SegmentedControlOption<string | number | boolean>[] | string[]">
import { computed, watch } from 'vue'
import type { SegmentedControlSlots } from '@/types/segmented-control'
import { type SegmentedControlEmits, type SegmentedControlOption, type SegmentedControlProps } from '@/types/segmented-control'
import { warnInvalidProp } from '@/utilities/warning'

type NormalizedOption = T extends string[] ? SegmentedControlOption<T[number]> : T[number]
type Value = NormalizedOption['value']

const itemsHaveRequiredProps = (items: NormalizedOption[]): boolean => {
  return items.every(i => i.value !== undefined)
}

// functions used in prop validators
const getValues = (items: NormalizedOption[]) => {
  const vals: string[] = []
  items.forEach((item: NormalizedOption) => vals.push(item.value + ''))

  return vals
}

const itemValuesAreUnique = (items: NormalizedOption[]): boolean => {
  const vals = getValues(items)
  const uniqueValues = new Set(vals)

  return vals.length === uniqueValues.size
}

const normalizeItems = (items: T): NormalizedOption[] => {
  return items.map((item) => {
    return {
      label: typeof item === 'string' ? item : (item.label || (item.value + '')),
      value: (typeof item === 'string' ? item.toLocaleLowerCase().replace(' ', '-') : item.value),
      disabled: typeof item === 'string' ? false : item.disabled,
    } as NormalizedOption
  })
}

const validateItems = (items: T): boolean => {
  const isStringArray = typeof items[0] === 'string'
  const nItems = normalizeItems(items)
  const isValid = itemValuesAreUnique(nItems)

  return isStringArray ? isValid && itemsHaveRequiredProps(nItems) : isValid
}

const {
  modelValue,
  options,
  size = 'small',
  disabled,
} = defineProps<SegmentedControlProps<T>>()

watch(() => options, (newOptions) => {
  if (!validateItems(newOptions)) {
    warnInvalidProp('options', 'The options prop must be an array of unique strings or objects with a unique value property.')
  }
}, { immediate: true })

const emit = defineEmits<SegmentedControlEmits<Value>>()

defineSlots<SegmentedControlSlots<NormalizedOption>>()

const normalizedOptions = computed(() => normalizeItems(options))

const getDisabled = (option: NormalizedOption): boolean => {
  return !!option.disabled || disabled
}

const handleClick = (option: NormalizedOption): void => {
  emit('click', option.value)
  emit('update:modelValue', option.value)
}
</script>

<style lang="scss" scoped>
/* Component variables */

$kSegmentedControlSmallHeight: 32px;

/* Component styles */

.k-segmented-control {
  display: flex;
  gap: var(--kui-space-0, $kui-space-0);
  width: 100%;

  .segmented-control-button {
    align-items: center;
    background-color: var(--kui-color-background, $kui-color-background);
    border-color: var(--kui-color-border-primary, $kui-color-border-primary);
    border-style: solid;
    border-width: var(--kui-border-width-20, $kui-border-width-20);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
    cursor: pointer;
    display: flex;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    gap: var(--kui-space-30, $kui-space-30);
    height: $kSegmentedControlSmallHeight;
    justify-content: center;
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    outline: none;
    padding-left: var(--kui-space-50, $kui-space-50);
    padding-right: var(--kui-space-50, $kui-space-50);
    transition: border-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
    white-space: nowrap;
    width: 100%;
    z-index: 1;

    &:not(:first-child) {
      // offset the border of the previous button
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      margin-left: calc(var(--kui-border-width-20, $kui-border-width-20) * -1);
    }

    &:first-child {
      border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      border-top-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    }

    &:last-child {
      border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      border-top-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    }

    &.large {
      height: $kongponentsInputElementHeight;
      padding-left: var(--kui-space-60, $kui-space-60);
      padding-right: var(--kui-space-60, $kui-space-60);
    }

    &:hover:not([disabled]) {
      border-color: var(--kui-color-border-primary-strong, $kui-color-border-primary-strong);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
      z-index: 2;
    }

    &:focus:not([disabled]) {
      border-color: var(--kui-color-border-primary-stronger, $kui-color-border-primary-stronger);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
      z-index: 3;
    }

    &:active:not([disabled]) {
      border-color: var(--kui-color-border-primary-strongest, $kui-color-border-primary-strongest);
      color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
      z-index: 3;
    }

    &:focus-visible:not([disabled]) {
      border-color: var(--kui-color-border-primary-strong, $kui-color-border-primary-strong);
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
      z-index: 3;
    }

    &[disabled] {
      border-color: var(--kui-color-border-disabled, $kui-color-border-disabled) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      cursor: not-allowed;
      z-index: 0;

      &.selected {
        background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      }
    }

    &.selected {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      border-color: var(--kui-color-border-primary-stronger, $kui-color-border-primary-stronger);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
      z-index: 2;
    }

    :deep(#{$kongponentsKongIconSelector}) {
      height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
      width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    }
  }
}
</style>
