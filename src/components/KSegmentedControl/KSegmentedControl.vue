<template>
  <div class="k-segmented-control">
    <button
      v-for="option in normalizedOptions"
      :key="`${option.value}-option`"
      :appearance="getAppearance(option)"
      :disabled="getDisabled(option)"
      @click="handleClick"
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

<script lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'
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
  disabled: {
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
  return !!option.disabled || props.disabled
}

const handleClick = (evt: Event): void => {
  // @ts-ignore
  emit('click', evt.target?.name)
  // @ts-ignore
  emit('update:modelValue', evt.target?.name)
}
</script>

<style lang="scss" scoped>
.k-segmented-control {
  display: flex;
  gap: var(--kui-space-0, $kui-space-0);
}
</style>
