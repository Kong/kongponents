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
import { watch, computed, onMounted, toRef, reactive } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import useUtilities from '@/composables/useUtilities'
import { useTableData } from './useTableFetcher'
import type {
  TablePreferences,
  TableDataHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  ButtonAppearance,
  RowLink,
  PageChangeData,
  PageSizeChangeData,
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

const { useDebounce } = useUtilities()

// Cannot use `ref<Data[number][]>([])` as the items will be inferred incorrectly inside the template.
// Same applies to other refs that have a generic type.
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
  filterQuery,
  response: fetcherResponse,
  revalidate: fetchRevalidate,
  isLoading: fetcherIsLoading,
  tableState,
  stateData,
  tableData,
  initData,

  // sort props
  sortColumnKey,
  sortColumnOrder,
  initialSortHandled,
  sortHandler,
  // pagination props
  page,
  pageSize,
  offsets,
  offset,
  showPagination,
  tablePaginationAttributes,
  toPreviousPageOffset,
  toNextPageOffset,

  // preferences props
  tableViewColumnVisibility,
  tableViewColumnWidths,
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

const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => {
  filterQuery.value = q
}, 350)

const search = generateDebouncedSearch(0) // generate a debounced function with zero delay (immediate)

const sortEvtEmitter = (params: TableSortPayload<ColumnKey>) => {
  emit('sort', params)
}

const onSort = (sortPayload: TableSortPayload<ColumnKey>, shouldEmit: boolean = true) => {
  sortHandler(sortPayload, shouldEmit ? sortEvtEmitter : undefined)
}


const pageChangeHandler = ({ page: newPage }: PageChangeData) => {
  page.value = newPage
}

const resetPagination = () => {
  offsets.value = [null]
  offset.value = null
  page.value = 1
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangeData) => {
  resetPagination()
  pageSize.value = newPageSize
}

watch(fetcherResponse, (res) => {
  if (!res?.data) {
    return
  }

  tableData.value = [...res.data]

  // if the data is empty and the page is greater than 1,
  // e.g. user deletes the last item on the last page,
  // reset the page to 1
  if (tableData.value.length === 0 && page.value > 1) {
    resetPagination()
  }

  // Call sortHandler if the initial sort has not been handled yet
  if (sortable && !initialSortHandled.value) {
    onSort({ sortColumnKey: sortColumnKey.value, prevKey: '', sortColumnOrder: sortColumnOrder.value }, false) // don't emit sort event when handling initial sort
  }
}, { deep: true, immediate: true })

watch(() => tablePreferences, (newVal) => {
  pageSize.value = newVal?.pageSize ? newVal.pageSize : pageSize.value
  tableViewColumnWidths.value = newVal?.columnWidths ? newVal.columnWidths : tableViewColumnWidths.value
  tableViewColumnVisibility.value = newVal?.columnVisibility ? newVal.columnVisibility : tableViewColumnVisibility.value
  // Handle sorting if the sort preferences have changed
  if ((newVal?.sortColumnKey || newVal?.sortColumnOrder) && (sortColumnKey.value !== newVal.sortColumnKey || sortColumnOrder.value !== newVal.sortColumnOrder)) {
    onSort({
      sortColumnKey: newVal.sortColumnKey!,
      prevKey: sortColumnKey.value,
      sortColumnOrder: newVal.sortColumnOrder!,
    }, false) // don't emit sort event when updating from prop change
  }
})

watch([stateData, tableState], (newState) => {
  const [newStateData, newTableState] = newState

  emit('state', {
    state: newTableState,
    hasData: newStateData.hasData,
  })
})

// handles debounce of search query
watch(() => searchInput, (newSearchInput: string) => {
  if (newSearchInput === '') {
    search(newSearchInput)
  } else {
    debouncedSearch(newSearchInput)
  }
}, { immediate: true })

// Originally watching [filterQuery, pageSize], but page size plays no role in the
// callback logic so removing this but keeping the comment here for context.
// also removing the `async` since no corresponding `await` keyword is present.
// removing `deep` since we are only watching a string value(primitive).
watch(filterQuery, (oldQuery, newQuery) => {
  if (newQuery !== oldQuery && page.value !== 1) {
    resetPagination()
  }
}, { immediate: true })

onMounted(() => {
  initData()
})

defineExpose({
  revalidate: fetchRevalidate,
})
</script>
