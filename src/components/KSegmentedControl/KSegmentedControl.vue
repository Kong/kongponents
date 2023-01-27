
<template>
  <div
    class="k-segmented-control d-flex"
    :class="{ 'allow-pointer-events': allowPointerEvents }"
  >
    <KButton
      v-for="option in normalizedOptions"
      :key="`${option.value}-option`"
      :appearance="getAppearance(option)"
      class="justify-content-center"
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
import { defineComponent, ref, PropType } from 'vue'
import KButton from '@/components/KButton/KButton.vue'

export interface SegmentedControlOption {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

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

export default defineComponent({
  name: 'KSegmentedControl',
  components: { KButton },
  props: {
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
  },
  emits: ['update:modelValue', 'click'],
  setup(props, { emit }) {
    const selectedValue = ref(props.modelValue)
    const normalizedOptions = ref(normalizeItems(props.options))

    const getAppearance = (option: SegmentedControlOption): 'primary' | 'secondary' => {
      return props.modelValue === option.value ? 'primary' : 'secondary'
    }

    const getDisabled = (option: SegmentedControlOption): boolean => {
      return !!option.disabled || props.isDisabled
    }

    const handleClick = (evt: any): void => {
      emit('click', evt.target?.name)
      emit('update:modelValue', evt.target?.name)
    }

    return {
      normalizedOptions,
      selectedValue,
      getAppearance,
      getDisabled,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-segmented-control {
  gap: var(--KSegmentedControlGap, 0px);

  :deep(.k-button) {
    --KButtonPrimaryBase: var(--KSegmentedControlSelectedBackground, var(--blue-100));
    --KButtonPrimaryHover: var(--KKSegmentedControlSelectedBackground, var(--blue-100));
    --KButtonSecondaryBase: var(--KSegmentedControlUnselectedBackground, var(--white));
    --KButtonSecondaryHover: var(--KSegmentedControlUnselectedBackground, var(--white));
    border-radius: 0;
    color: var(--KSegmentedControlText, var(--blue-500));
    flex: 1;
    margin-left: -1px;

    &.primary {
      border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500));
      z-index: 1;
    }

    &.secondary {
      border-color: var(--KSegmentedControlUnselectedBorder, rgba(color(blue-500), .4));

      &:hover {
        border-color: var(--KSegmentedControlSelectedBorder, var(--blue-500));
      }
    }

    &:hover {
      z-index: 2;
    }

    &:active {
      z-index: 2;
    }

    &:focus {
      box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--KSegmentedControlSelectedBorder, var(--blue-500));
      z-index: 3;
    }

    &:first-child {
      border-radius: 3px 0 0 3px;
      margin-left: 0;
    }

    &:last-child {
      border-radius: 0 3px 3px 0;
    }

    &:only-child {
      border-radius: 3px;
      margin-left: 0;
    }

    &:disabled, &:disabled:hover {
      background-color: var(--KSegmentedControlUnselectedBackground, var(--white)) !important;
      border-color: rgba(color(grey-500), .4);
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
