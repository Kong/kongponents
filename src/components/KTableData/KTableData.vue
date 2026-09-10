<template>
  <KTableView
    :cell-attrs="cellAttrs"
    class="k-table-data"
    :data="tableData"
    :empty-state-action-message="emptyStateActionMessage"
    :empty-state-action-route="emptyStateActionRoute!"
    :empty-state-button-appearance="getEmptyStateButtonAppearance"
    :empty-state-icon-variant="emptyStateIconVariant"
    :empty-state-message="emptyStateMessage"
    :empty-state-title="emptyStateTitle"
    :error="error"
    :error-state-action-message="errorStateActionMessage"
    :error-state-action-route="errorStateActionRoute!"
    :error-state-message="errorStateMessage"
    :error-state-title="errorStateTitle"
    :headers="tableHeaders"
    :hide-headers="hideHeaders"
    :hide-pagination="hidePagination || !showPagination"
    :hide-pagination-when-optional="false"
    :hide-toolbar="hideToolbar"
    :loading="loading || fetcherIsLoading"
    :max-height="maxHeight"
    :nested="nested"
    :pagination-attributes="tablePaginationAttributes"
    :resize-columns="resizeColumns"
    :row-attrs="rowAttrs"
    :row-bulk-action-enabled="rowBulkActionEnabled"
    :row-expandable="rowExpandable"
    :row-expanded="rowExpanded"
    :row-hover="rowHover"
    :row-key="rowKey"
    :row-link="rowLink"
    :table-preferences="tableDataPreferences"
    :tooltip-target="tooltipTarget"
    v-bind="listenerProps"
    @empty-state-action-click="emit('empty-state-action-click')"
    @error-action-click="emit('error-action-click')"
    @get-next-offset="toNextPageOffset"
    @get-previous-offset="toPreviousPageOffset"
    @page-change="pageChangeHandler"
    @page-size-change="pageSizeChangeHandler"
    @row-actions-toggle="($event) => $emit('row-actions-toggle', $event)"
    @row-select="($event) => emit('row-select', $event)"
    @sort="onSort"
    @update:row-expanded="($event) => emit('update:row-expanded', $event)"
    @update:table-preferences="tablePreferencesUpdateHandler"
  >
    <template
      v-if="slots.toolbar && !hideToolbar"
      #toolbar
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
    </template>

    <template
      v-if="slots['bulk-actions']"
      #bulk-actions="slotProps"
    >
      <slot
        name="bulk-actions"
        v-bind="slotProps"
      />
    </template>

    <template
      v-if="slots['bulk-action-items']"
      #bulk-action-items="slotProps "
    >
      <slot
        name="bulk-action-items"
        v-bind="slotProps"
      />
    </template>

    <template
      v-if="slots['error-state']"
      #error-state
    >
      <slot name="error-state" />
    </template>

    <template
      v-if="slots['empty-state']"
      #empty-state
    >
      <slot name="empty-state" />
    </template>

    <template
      v-if="slots['empty-state-action-icon']"
      #empty-state-action-icon
    >
      <slot name="empty-state-action-icon" />
    </template>

    <template
      v-for="slot in headerSlots"
      :key="slot"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      />
    </template>

    <template
      v-for="slot in headerTooltipSlots"
      :key="slot"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="slotProps"
      />
    </template>

    <template
      v-for="slot in cellSlots"
      :key="slot"
      #[slot]="slotProps"
    >
      <slot
        :name="slot"
        v-bind="(slotProps as any)"
      />
    </template>

    <template
      v-if="slots['action-items']"
      #action-items="slotProps"
    >
      <slot
        name="action-items"
        v-bind="slotProps"
      />
    </template>

    <template
      v-if="slots['row-expanded']"
      #row-expanded="slotProps"
    >
      <slot
        name="row-expanded"
        v-bind="slotProps"
      />
    </template>
  </KTableView>
</template>

<script setup lang="ts" generic="const Header extends TableDataHeader = TableDataHeader, Data extends readonly Record<string, any>[] = readonly Record<string, any>[], Offset extends string | number = string | number">
import { watch, computed, reactive } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import { useTableData } from './useTableFetcher'
import type {
  TablePreferences,
  TableDataHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  ButtonAppearance,
  RowLink,
  TableSortPayload,
  TableDataProps,
  TableColumnKey,
  TableDataEmits,
  TableDataSlots,
} from '@/types'
import { EmptyStateIconVariants } from '@/types'
import { pickBy } from 'lodash-es'

type ColumnKey = TableColumnKey<Header>

const {
  resizeColumns,
  tablePreferences = {},
  rowHover = true,
  rowAttrs = () => ({}),
  rowLink = () => ({} as RowLink),
  rowBulkActionEnabled = () => true,
  rowKey,
  cellAttrs = () => ({}),
  loading,
  emptyStateTitle = 'No Data',
  emptyStateMessage = 'There is no data to display.',
  emptyStateActionMessage = '',
  emptyStateIconVariant = EmptyStateIconVariants.Default,
  emptyStateButtonAppearance,
  emptyStateActionRoute,
  error,
  errorStateTitle = 'An error occurred',
  errorStateMessage = 'Data cannot be displayed due to an error.',
  errorStateActionMessage = '',
  errorStateActionRoute,
  maxHeight = 'none',
  hidePagination,
  paginationAttributes = {},
  rowExpandable = () => false,
  rowExpanded = () => false,
  hideHeaders,
  nested,
  hidePaginationWhenOptional,
  hideToolbar,
  headers = [],
  fetcherCacheKey = '',
  cacheIdentifier = '',
  searchInput = '',
  initialFetcherParams = {},
  clientSort,
  sortable = true,
  fetcher,
  sortHandlerFunction,
  tooltipTarget,
  ...restProps
} = defineProps<TableDataProps<Header, Data, Offset>>()

// extract `@cell:<event>` and `@row:<event>` handlers
const listenerProps = computed(() => {
  const onPattern = /^on[^a-z]/

  return pickBy(restProps, (_: any, name: string) => onPattern.test(name))
})

const emit = defineEmits<TableDataEmits<Header, Data>>()

const slots = defineSlots<TableDataSlots<Header, Data>>()

const getEmptyStateButtonAppearance = computed((): ButtonAppearance => {
  if (emptyStateButtonAppearance) {
    return emptyStateButtonAppearance
  }

  return searchInput ? 'tertiary' : 'primary'
})

const emitTablePreferences = (tableDataPreferences: TablePreferences): void => {
  if (tableState.value === 'success') {
    emit('update:table-preferences', tableDataPreferences)
  }
}

const {
  tableHeaders,
  // data props
  revalidate: fetchRevalidate,
  isLoading: fetcherIsLoading,
  tableState,
  stateData,
  tableData,

  // sort props
  sortHandler,
  // pagination props
  showPagination,
  tablePaginationAttributes,
  toPreviousPageOffset,
  toNextPageOffset,
  pageChangeHandler,
  pageSizeChangeHandler,

  // preferences props
  tableDataPreferences,
  tablePreferencesUpdateHandler,
} = useTableData(
  reactive({
    sortable: () => sortable,
    headers: () => headers,
    fetcher: () => fetcher,
    fetcherCacheKey: () => fetcherCacheKey,
    cacheIdentifier: () => cacheIdentifier,
    initialFetcherParams: () => initialFetcherParams,
    clientSort: () => clientSort,
    sortHandlerFunction: () => sortHandlerFunction,
    hidePaginationWhenOptional: () => hidePaginationWhenOptional,
    hidePagination: () => hidePagination,
    tablePreferences: () => tablePreferences,
    paginationAttributes: () => paginationAttributes,
    searchInput: () => searchInput,
  }), {
    emitTablePreferences,
  })

// Whether a string is a valid slot name for a table column header
const isTableColumnSlotName = (slot: string): slot is TableColumnSlotName<ColumnKey> => {
  return slot.startsWith('column-')
}

// Whether a string is a valid slot name for a table column tooltip
const isTableColumnTooltipSlotName = (slot: string): slot is TableColumnTooltipSlotName<ColumnKey> => {
  return slot.startsWith('tooltip-')
}

// Whether a string is a valid slot name for table cells in a column
const isTableColumnKey = (slot: string): slot is ColumnKey => {
  return tableHeaders.value.some((header) => header.key === slot)
}

const headerSlots = computed((): Array<TableColumnSlotName<ColumnKey>> => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter(isTableColumnSlotName)
})

const headerTooltipSlots = computed((): Array<TableColumnTooltipSlotName<ColumnKey>> => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter(isTableColumnTooltipSlotName)
})

const cellSlots = computed((): ColumnKey[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter(isTableColumnKey)
})

const sortEvtEmitter = (params: TableSortPayload<ColumnKey>) => {
  emit('sort', params)
}

// Bridges the component-level `shouldEmit` flag onto the composable's `sortEvtEmitter`
// callback shape. The composable doesn't know about `emit`; it just calls whatever emitter
// you hand it. We pass the emitter for user-driven sorts and skip it for synthetic sorts
// (initial sort, preference sync) to avoid round-tripping back to the parent.
const onSort = (sortPayload: TableSortPayload<ColumnKey>, shouldEmit: boolean = true) => {
  sortHandler(sortPayload, shouldEmit ? sortEvtEmitter : undefined)
}

watch([stateData, tableState], (newState) => {
  const [newStateData, newTableState] = newState

  emit('state', {
    state: newTableState,
    hasData: newStateData.hasData,
  })
})

defineExpose({
  revalidate: fetchRevalidate,
})
</script>
