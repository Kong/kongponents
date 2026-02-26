<template>
  <KPop
    ref="filterPopper"
    :max-width="filter.maxWidth ?? '400px'"
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
        <slot name="default">
          <div class="default-layout">
            <div
              v-if="operators.length > 1"
              class="operator"
            >
              <KSelect
                v-model="userOperator"
                :items="operatorSelectItems"
                :kpop-attributes="{
                  popoverClasses: 'force-operator-width',
                }"
                label="Operator"
                :title="userOperatorLabel"
              />
            </div>

            <div class="value">
              <KSelect
                v-if="filterType === 'select'"
                v-model="userSelect"
                data-testid="filter-pill-select"
                :items="filter.options"
                label="Value"
                placeholder="Select a value"
              />
              <KMultiselect
                v-else-if="filterType === 'multiselect'"
                v-model="userMultiselect"
                data-testid="filter-pill-multiselect"
                :items="filter.options"
                label="Value"
                placeholder="Select values"
              />
              <KInput
                v-else
                ref="inputField"
                v-model.trim="userInput"
                data-testid="filter-pill-input"
                label="Value"
                placeholder="Enter a value"
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
import type { FilterOperator, FilterPillProps, FilterPillSlots, FilterSelection, SelectItem } from '@/types'
import { KUI_SPACE_30 } from '@kong/design-tokens'

import KPop from '@/components/KPop/KPop.vue'
import KInput from '@/components/KInput/KInput.vue'
import KSelect from '@/components/KSelect/KSelect.vue'
import KMultiselect from '@/components/KMultiselect/KMultiselect.vue'

import InteractivePill from './InteractivePill.vue'

defineSlots<FilterPillSlots>()

// we don't want the attrs to get applied to the KPop wrapper
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

const {
  filter,
  initOpen = false,
  selection = undefined,
  custom = false,
} = defineProps<FilterPillProps>()

const emit = defineEmits<{
  (e: 'apply', selection?: FilterSelection): void
  (e: 'close'): void
  (e: 'open'): void
  (e: 'clear'): void
}>()

/**
 * Tracks whether the pill is open or not. Used to apply focus state when open.
 */
const isOpen = ref<boolean>(false)

/**
 * Used to programmatically open/close the popover
 */
const filterPopperRef = useTemplateRef('filterPopper')

/**
 * Tracks which operator the user has selected.
 */
const userOperator = ref<FilterOperator>()

/**
 * Tracks the content typed by the user in the text filter (if this is a text filter)
 */
const userInput = ref<string>()

/**
 * Tracks the selection made by the user in the select filter (if this is a select filter)
 */
const userSelect = ref<string | undefined>()

/**
 * Tracks the selection made by the user in the multiselect filter (if this is a multiselect filter)
 */
const userMultiselect = ref<string[]>()

/**
 * Used to programmatically apply focus to the text field
 */
const inputFieldRef = useTemplateRef('inputField')

/**
 * The type of filter to render.
 */
const filterType = computed((): 'custom' | 'input' | 'select' | 'multiselect' => {
  if (custom) {
    return 'custom'
  }

  if (filter.options && !filter.multiple) {
    return 'select'
  }

  if (filter.options && filter.multiple) {
    return 'multiselect'
  }

  return 'input'
})

/**
 * Whether the apply button is disabled or not. If the filter is a custom filter
 * we can't detect whether it should be disabled, so in that case it defaults to
 * false.
 */
const applyDisabled = computed((): boolean => {
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

/**
 * Operators to render in the operators dropdown. If length is 1, no choice is
 * allowed and all selections made will assume that the operator used is that one.
 */
const operators = computed((): FilterOperator[] => {
  return filter.operators && filter.operators.length
    ? filter.operators
    : ['eq']
})

/**
 * We manually select the size of the operator dropdown based on the presence of
 * our longest strings. "Less than or equal to" and "Greater than or equal to"
 * both fit within 205px. Everything else fits within 120px.
 */
const operatorDropdownWidth = computed((): string => {
  if (operators.value.some((operator) => operator === 'lte' || operator === 'gte')) {
    return '205px'
  }

  return '120px'
})

/**
 * The potentially ephemeral selection the user is making. If the user clicks
 * 'Apply' (and it's not a custom filter) this will get emitted in the apply
 * event. If the user clicks 'Cancel' or closes the popover, nothing will use
 * this FilterSelection.
 */
const userSelection = computed((): FilterSelection | undefined => {
  let value: string | string[] | undefined // the value to be used in this FilterSelection
  let text: string | undefined // the text to be used in this FilterSelection
  // we don't need to track the operator here because for all types `userOperator.value` is the same

  switch (filterType.value) {
    case 'input':
      value = userInput.value
      text = userInput.value
      break
    case 'select':
      value = userSelect.value
      text = filter?.options?.find(({ value }) => value === userSelect.value)?.label ?? userSelect.value?.toString()
      break
    case 'multiselect':
      value = userMultiselect.value
      text = userMultiselect.value
        ?.map((userValue) => filter.options?.find(({ value }) => value === userValue))
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

/**
 * The delimiter to display in the pill's label. Determined based on the `selection.operator`
 */
const delimiter = computed((): string | undefined => {
  switch (selection?.operator) {
    case 'eq':
      return ' = '
    case 'neq':
      return ' ≠ '
    case 'lt':
      return ' < '
    case 'lte':
      return ' ≤ '
    case 'gt':
      return ' > '
    case 'gte':
      return ' ≥ '
    case 'contains':
    case 'exists':
    default:
      return ': '
  }
})

/**
 * The labels to use for each operator when the operator select is visible
 */
const operatorSelectItems = computed((): SelectItem[] => {
  const filterOperatorLabels = {
    eq: 'Equals',
    neq: 'Not equals',
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

/**
 * The label for the operator currently chosen by the user. Used in the title
 * attribute of the operator dropdown.
 */
const userOperatorLabel = computed((): string => {
  return operatorSelectItems.value.find(({ value }) => value === userOperator.value)?.label ?? ''
})

/**
 * Focus on the text input field. This can only happen if the filterType is 'input'
 */
const focusUser = () => {
  if (filterType.value === 'input') {
    inputFieldRef.value?.input?.focus()
  }
}

/**
 * When the filter popover opens, the user's selection (if it exists) should be
 * displayed.
 */
const resetUserSelection = () => {
  // reset to selection if it exists, if not use first operator in the filter
  // definition, otherwise fallback to undefined
  userOperator.value = selection?.operator ?? operators.value?.[0]

  // reset to selection if selection has a string, otherwise undefined
  userInput.value = typeof selection?.value === 'string' ? selection.value : undefined

  // reset to selection if selection exists in the filter options, otherwise undefined
  userSelect.value = filter.options?.find(({ value }) => value === selection?.value)?.value

  // reset to selection if selection exists in the filter options, otherwise []
  userMultiselect.value = filter.options?.filter(({ value }) => {
    if (Array.isArray(selection?.value)) {
      return (selection.value).includes(`${value}`)
    }
  }).map(({ value }) => value)
}

/**
 * Open the filter. When called, we reset the user selection to its default,
 * manually show the popover, set our open state, and try to focus the user into
 * the text field greedily (`focusUser` checks for the input field's existence
 * so we don't need to here). Finally, emits @open.
 */
const openFilter = async () => {
  resetUserSelection()

  if (filterPopperRef.value) {
    filterPopperRef.value.showPopover()
    isOpen.value = true
    await nextTick()
    focusUser()
  }

  emit('open')
}

/**
 * Close the filter. When called we manually hide the popover, set our open state,
 * then emit @close.
 */
const closeFilter = () => {
  if (filterPopperRef.value) {
    filterPopperRef.value.hidePopover()
    isOpen.value = false
  }
  emit('close')
}

onMounted(() => {
  if (initOpen) {
    openFilter()
  }
})

/**
 * handle KPop's close event.
 */
const onPopClose = () => {
  // if the popper is closed without clicking on the pill (e.g. clicking
  // somewhere else in the DOM) we need to handle it manually
  if (isOpen.value) {
    closeFilter()
  }
}

/**
 * Handle the 'Apply' button's click event.
 */
const onApply = () => {
  if (filterType.value === 'custom') {
    // always emit `undefined` when the filter is custom because the host app
    // must handle the selection when they've created a custom filter.
    emit('apply', undefined)
  } else {
    emit('apply', userSelection.value)
  }

  closeFilter()
}

/**
 * Handle the 'Cancel' button's click event.
 */
const onCancel = () => {
  closeFilter()
}

/**
 * Handle the pill's @clear event
 */
const onClear = () => {
  closeFilter()
  emit('clear')
}

/**
 * Handle the pill's @trigger event
 */
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

:deep(.force-operator-width) {
  /**
   * We want to force the operator dropdown to match the width of the content in
   * its items. We can't override the popover's width with `kpopAttributes` because
   * of how KSelect forces those property values to be something else. These few
   * styles fix this, at the cost of needing to `:deep`.
   */
  width: v-bind(operatorDropdownWidth);

  .popover-container {
    max-width: none !important;
    width: auto !important;
  }
}

.filter-content {
  margin: $kui-space-40 0;
  min-width: 366px; // 400px - padding

  .default-layout {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-40, $kui-space-40);
    width: 100%;

    @media (min-width: $kui-breakpoint-mobile) {
      align-items: center;
      flex-direction: row;
    }

    .operator {
      flex-shrink: 0;
      width: 100%;

      @media (min-width: $kui-breakpoint-mobile) {
        width: 35%;
      }
    }

    .value {
      flex-grow: 1;
      min-width: 0; // this prevents the multiselect from choosing its own adventure
      width: 100%;
    }
  }
}
</style>
