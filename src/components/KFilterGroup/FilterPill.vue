<template>
  <KPop
    ref="filterPopper"
    :max-width="filterType === 'custom' ? 'none' : '400px'"
    :offset="KUI_SPACE_30"
    :placement="filter.placement ?? 'bottom-start'"
    width="auto"
    @close="onPopClose"
  >
    <template #default>
      <InteractivePill
        :content-label="selection?.text"
        data-testid="filter-pill"
        :delimiter="delimiter"
        :label="filter.label"
        :pill-focus="isOpen"
        v-bind="attrs"
        @clear="onClear"
        @click.prevent.stop
        @trigger="onTrigger"
      />
    </template>

    <template #title>
      {{ filter.label }}
    </template>

    <template #content>
      <div
        class="filter-content"
        data-testid="filter-pill-content"
      >
        <slot name="content">
          <div class="internal-layout">
            <div
              v-if="operators.length > 1"
              class="operator"
            >
              <KSelect
                v-model="userOperator"
                :items="operatorSelectItems"
                label="Operator"
              />
            </div>
            <div class="value">
              <KSelect
                v-if="filterType === 'select'"
                v-model="userSelect"
                data-testid="filter-pill-select"
                :items="filter.selectOptions"
                label="Value"
                placeholder="Enter a value"
              />
              <KMultiselect
                v-else-if="filterType === 'multiselect'"
                v-model="userMultiselect"
                data-testid="filter-pill-multiselect"
                :items="filter.multiselectOptions"
                label="Value"
                placeholder="Select values"
              />
              <KInput
                v-else
                ref="inputField"
                v-model="userInput"
                data-testid="filter-pill-input"
                label="Value"
                placeholder="Select a value"
              />
            </div>
          </div>
        </slot>
      </div>
    </template>

    <template #footer>
      <div class="footer">
        <KButton
          appearance="secondary"
          data-testid="filter-pill-cancel"
          @click="onCancel"
        >
          Cancel
        </KButton>
        <KButton
          appearance="primary"
          data-testid="filter-pill-apply"
          :disabled="applyDisabled"
          @click="onApply"
        >
          Apply
        </KButton>
      </div>
    </template>
  </KPop>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useAttrs, useTemplateRef } from 'vue'
import type { FilterPillProps, FilterOperator, FilterSelection, SelectItem } from '@/types'
import { KUI_SPACE_30 } from '@kong/design-tokens'

import KPop from '@/components/KPop/KPop.vue'
import KInput from '@/components/KInput/KInput.vue'
import KSelect from '@/components/KSelect/KSelect.vue'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'

import InteractivePill from './InteractivePill.vue'

// we don't want the attrs to get applied to the KPop wrapper
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const {
  filter,
  initOpen = false,
  selection = undefined,
  isCustom = false,
} = defineProps<FilterPillProps>()

const isOpen = ref<boolean>(false)
const filterPopperRef = useTemplateRef('filterPopper')

const userOperator = ref<FilterOperator>()
const userInput = ref<string>()
const userSelect = ref<string | number>()
const userMultiselect = ref<string[]>()
const inputFieldRef = useTemplateRef('inputField')

const filterType = computed<'custom' | 'input' | 'select' | 'multiselect'>(() => {
  if (isCustom) {
    return 'custom'
  }

  if (filter.selectOptions) {
    return 'select'
  }

  if (filter.multiselectOptions) {
    return 'multiselect'
  }

  return 'input'
})

const applyDisabled = computed<boolean>(() => {
  switch (filterType.value) {
    case 'input':
      return !userInput.value || userInput.value === ''
    case 'select':
      return !userSelect.value
    case 'multiselect':
      return !userMultiselect.value || userMultiselect.value.length === 0
    case 'custom':
    default:
      return false
  }
})

const operators = computed<FilterOperator[]>(() => {
  const defaultOperators: FilterOperator[] = filterType.value === 'input'
    ? ['eq', 'contains']
    : ['eq', 'contains', 'exists']

  return filter.operators && filter.operators.length
    ? filter.operators
    : defaultOperators
})

const userSelection = computed<FilterSelection | undefined>(() => {
  let value
  let text

  switch (filterType.value) {
    case 'input':
      value = userInput.value
      text = userInput.value
      break
    case 'select':
      value = userSelect.value
      text = filter?.selectOptions?.find(({ value }) => value === userSelect.value)?.label ?? userSelect.value?.toString()
      break
    case 'multiselect':
      value = userMultiselect.value
      text = userMultiselect.value
        ?.map((userValue) => filter.multiselectOptions?.find(({ value }) => value === userValue))
        ?.filter((option) => option !== undefined)
        ?.map(({ label }) => label)
        ?.join(', ')
      break
  }

  if (userOperator.value === undefined || value === undefined || text === undefined) {
    return undefined
  }

  return {
    operator: userOperator.value,
    value,
    text,
  }
})

const delimiter = computed<string | undefined>(() => {
  switch (selection?.operator) {
    case 'eq':
      return ' = '
    case 'neq':
      return ' ≠ '
    case 'contains':
      return ' in '
    case 'lt':
      return ' < '
    case 'lte':
      return ' ≤ '
    case 'gt':
      return ' > '
    case 'gte':
      return ' ≥ '
    case 'exists':
    default:
      return ': '
  }
})

const operatorSelectItems = computed<SelectItem[]>(() => {
  const filterOperatorLabels = {
    eq: 'Equal to',
    neq: 'Not equal to',
    contains: 'Contains',
    exists: 'Exists',
    lt: 'Less than',
    lte: 'Less than or equal to',
    gt: 'Greater than',
    gte: 'Greater than or equal to',
  }

  return operators.value.map((operator) => ({
    label: filterOperatorLabels[operator],
    value: operator,
  }))
})


const resetSelection = () => {
  userOperator.value = selection?.operator ?? operators.value?.[0]
  userInput.value = typeof selection?.value === 'string' ? selection.value : undefined
  userSelect.value = filter.selectOptions?.find(({ value }) => value === selection?.value)?.value
  userMultiselect.value = filter.multiselectOptions?.filter(({ value }) => {
    if (Array.isArray(selection?.value)) {
      return (selection.value as string[]).includes(value)
    }
  }).map(({ value }) => value)
}

const focusUser = () => {
  if (filterType.value === 'input') {
    inputFieldRef.value?.input?.focus()
  }
}

const openFilter = async () => {
  resetSelection()

  if (filterPopperRef.value) {
    filterPopperRef.value.showPopover()
    isOpen.value = true
    await nextTick()
    focusUser()
  }

  emit('open')
}

const closeFilter = () => {
  if (filterPopperRef.value) {
    filterPopperRef.value.hidePopover()
    isOpen.value = false
  }
  emit('close')
}

const onPopClose = () => {
  // if the popper is closed without clicking on the pill (e.g. clicking
  // somewhere else in the DOM) we need to handle it manually
  if (isOpen.value) {
    closeFilter()
  }
}

onMounted(() => {
  if (initOpen) {
    openFilter()
  }
})

const emit = defineEmits<{
  (e: 'apply', selection?: FilterSelection): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'clear'): void
}>()

const onApply = () => {
  if ((userSelection.value === undefined && filterType.value === 'custom')
    || (userSelection.value !== undefined && filterType.value !== 'custom')) {
    emit('apply', userSelection.value)
  }
  closeFilter()
}

const onCancel = () => {
  closeFilter()
}

const onClear = () => {
  closeFilter()
  emit('clear')
}

const onTrigger = () => {
  if (isOpen.value) {
    closeFilter()
  } else {
    openFilter()
  }
}
</script>

<style lang="scss" scoped>
.footer {
  align-items: center;
  display: flex;
  gap: var(--kui-space-40, $kui-space-40);
  justify-content: flex-end;
  width: 100%;
}

.filter-content {
  margin: $kui-space-40 0;

  .internal-layout {
    align-items: center;
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
    width: 100%;

    .operator {
      flex-shrink: 0;
      width: 30%;
    }

    .value {
      flex-grow: 1;
      min-width: 0; // this prevents the multiselect from choosing its own adventure
    }
  }
}
</style>
