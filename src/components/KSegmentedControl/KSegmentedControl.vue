<template>
  <div
    class="k-segmented-control"
    :class="{ 'allow-pointer-events': allowPointerEvents }"
  >
    <KButton
      v-for="option in normalizedOptions"
      :key="`${option.value}-option`"
      :appearance="getAppearance(option)"
      :disabled="getDisabled(option)"
      :name="option.value"
      size="small"
      @click="handleClick"
    >
      <slot
        name="option-label"
        :option="option"
      >
        {{ option.label }}
      </slot>
    </KButton>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import type { SegmentedControlOption } from '@/types/segmented-control'

const itemsHaveRequiredProps = (items: SegmentedControlOption[]): boolean => {
  return items.every(i => i.value !== undefined)
}

// functions used in prop validators
const getValues = (items: SegmentedControlOption[]) => {
  const vals:string[] = []
  items.forEach((item: SegmentedControlOption) => vals.push(item.value + ''))

  return vals
}

const itemValuesAreUnique = (items: SegmentedControlOption[]): boolean => {
  const vals = getValues(items)
  const uniqueValues = new Set(vals)

  return vals.length === uniqueValues.size
}

const normalizeItems = (items: SegmentedControlOption[] | string[]): SegmentedControlOption[] => {
  return items.map((item:SegmentedControlOption | string) => {
    return {
      label: typeof item === 'string' ? item : (item.label || (item.value + '')),
      value: typeof item === 'string' ? item : item.value,
      disabled: typeof item === 'string' ? false : item.disabled,
    } as SegmentedControlOption
  })
}

const validateItems = (items: SegmentedControlOption[] | string[]): boolean => {
  const isStringArray = typeof items[0] === 'string'
  const nItems = normalizeItems(items)
  const isValid = itemValuesAreUnique(nItems)

  return isStringArray ? isValid && itemsHaveRequiredProps(items as SegmentedControlOption[]) : isValid
}

export default {}
</script>

<script lang="ts" setup>

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: true,
  },
  options: {
    type: Array as PropType<SegmentedControlOption[] | string[]>,
    required: true,
    validator: (items: SegmentedControlOption[] | string[]) => !items.length || validateItems(items),
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  allowPointerEvents: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'click', event: string): void;
  (e: 'update:modelValue', event: string): void;
}>()

const normalizedOptions = ref(normalizeItems(props.options))

const getAppearance = (option: SegmentedControlOption): 'primary' | 'secondary' => {
  return props.modelValue === option.value ? 'primary' : 'secondary'
}

const getDisabled = (option: SegmentedControlOption): boolean => {
  return !!option.disabled || props.isDisabled
}

const handleClick = (evt: PointerEvent): void => {
  // @ts-ignore
  emit('click', evt.target?.name)
  // @ts-ignore
  emit('update:modelValue', evt.target?.name)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-segmented-control {
  display: flex !important;
  gap: var(--KSegmentedControlGap, var(--kui-space-0, $kui-space-0));

  :deep(.k-button) {
    border-radius: var(--kui-border-radius-0, $kui-border-radius-0);
    color: var(--KSegmentedControlText, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
    flex: 1;
    justify-content: center !important;
    margin-left: -1px;
    --KButtonPrimaryBase: var(--KSegmentedControlSelectedBackground, var(--blue-100, var(--kui-color-background-primary-weakest, #{$kui-color-background-primary-weakest})));
    --KButtonPrimaryHover: var(--KKSegmentedControlSelectedBackground, var(--blue-100, var(--kui-color-background-primary-weakest, #{$kui-color-background-primary-weakest})));
    --KButtonSecondaryBase: var(--KSegmentedControlUnselectedBackground, var(--white, var(--kui-color-background, #{$kui-color-background})));
    --KButtonSecondaryHover: var(--KSegmentedControlUnselectedBackground, var(--white, var(--kui-color-background, #{$kui-color-background})));

    &.primary {
      border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary)));
      z-index: 1;
    }

    &.secondary {
      border-color: var(--KSegmentedControlUnselectedBorder, rgba($kui-color-border-primary, .4));

      &:hover {
        border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500, var(--kui-color-border-primary, $kui-color-border-primary)));
      }
    }

    &:hover {
      z-index: 2;
    }

    &:active {
      z-index: 2;
    }

    &:focus {
      box-shadow: 0 0 0 2px var(--white, var(--kui-color-background, $kui-color-background)), 0 0 0 4px var(--KSegmentedControlSelectedBorder, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary)));
      z-index: 3;
    }

    &:first-child {
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10) var(--kui-border-radius-0, $kui-border-radius-0) var(--kui-border-radius-0, $kui-border-radius-0) var(--kui-border-radius-10, $kui-border-radius-10);
      margin-left: var(--kui-space-0, $kui-space-0);
    }

    &:last-child {
      border-radius: var(--kui-border-radius-0, $kui-border-radius-0) var(--kui-border-radius-10, $kui-border-radius-10) var(--kui-border-radius-10, $kui-border-radius-10) var(--kui-border-radius-0, $kui-border-radius-0);
    }

    &:only-child {
      border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
      margin-left: var(--kui-space-0, $kui-space-0);
    }

    &:disabled, &:disabled:hover {
      background-color: var(--KSegmentedControlUnselectedBackground, var(--white, var(--kui-color-background, $kui-color-background))) !important;
      border-color: rgba($kui-color-border-neutral-weak, .4);
      z-index: 0;
    }
  }

  &:not(.allow-pointer-events) {
    :deep(.k-button) > * {
      pointer-events: none;
    }
  }
}
</style>
