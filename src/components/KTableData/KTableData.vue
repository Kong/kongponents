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
    :table-preferences="tablePreferences"
    @empty-state-action-click="emit('empty-state-action-click')"
    @error-action-click="emit('error-action-click')"
    @get-next-offset="getNextOffsetHandler"
    @get-previous-offset="getPreviousOffsetHandler"
    @page-change="pageChangeHandler"
    @page-size-change="pageSizeChangeHandler"
    @row-actions-toggle="($event) => $emit('row-actions-toggle', $event)"
    @row-select="($event: Record<string, any>[]) => emit('row-select', $event)"
    @sort="sortHandler"
    @update:row-expanded="($event: RowExpandPayload) => emit('update:row-expanded', $event)"
    @update:table-preferences="tablePreferencesUpdateHandler"
  >
    <template
      v-if="$slots.toolbar && !hideToolbar"
      #toolbar
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
    </template>

    <template
      v-if="$slots['bulk-actions']"
      #bulk-actions="{ selectedRows }"
    >
      <slot
        name="bulk-actions"
        :selected-rows="selectedRows"
      />
    </template>

    <template
      v-if="$slots['bulk-action-items']"
      #bulk-action-items="{ selectedRows }"
    >
      <slot
        name="bulk-action-items"
        :selected-rows="selectedRows"
      />
    </template>

    <template
      v-if="$slots['error-state']"
      #error-state
    >
      <slot name="error-state" />
    </template>

    <template
      v-if="$slots['empty-state']"
      #empty-state
    >
      <slot name="empty-state" />
    </template>

    <template
      v-if="$slots['empty-state-action-icon']"
      #empty-state-action-icon
    >
      <slot name="empty-state-action-icon" />
    </template>

    <template
      v-for="slot in getHeaderSlots"
      :key="slot"
      #[slot]="{ column }"
    >
      <slot
        :column="column"
        :name="slot"
      />
    </template>

    <template
      v-for="slot in getHeaderTooltipSlots"
      :key="slot"
      #[slot]="{ column }"
    >
      <slot
        :column="column"
        :name="slot"
      />
    </template>

    <template
      v-for="slot in getCellSlots"
      :key="slot"
      #[slot]="{ row, rowKey, rowValue }"
    >
      <slot
        :name="slot"
        :row="row"
        :row-key="rowKey"
        :row-value="rowValue"
      />
    </template>

    <template
      v-if="$slots['action-items']"
      #action-items="{ row }"
    >
      <slot
        name="action-items"
        :row="row"
      />
    </template>

    <template
      v-if="$slots['row-expanded']"
      #row-expanded="{ columnWidths, nestedHeaders, row }"
    >
      <slot
        :column-widths="columnWidths"
        name="row-expanded"
        :nested-headers="nestedHeaders"
        :row="row"
      />
    </template>
  </KTableView>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch, computed, onMounted, useSlots, useId } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import useUtilities from '@/composables/useUtilities'
import type {
  TablePreferences,
  TableDataHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  SortColumnOrder,
  TableSortPayload,
  ButtonAppearance,
  RowLink,
  TablePaginationAttributes,
  PageChangeData,
  PageSizeChangeData,
  TableState,
  TableStatePayload,
  SwrvStateData,
  TableDataProps,
  RowExpandPayload,
  RowActionsTogglePayload,
} from '@/types'
import { EmptyStateIconVariants } from '@/types'
import { getInitialPageSize, DEFAULT_PAGE_SIZE } from '@/utilities'

const props = withDefaults(defineProps<TableDataProps>(), {
  resizeColumns: false,
  tablePreferences: () => ({}),
  rowHover: true,
  rowAttrs: () => ({}),
  rowLink: () => ({} as RowLink),
  rowBulkActionEnabled: () => true,
  rowKey: '',
  cellAttrs: () => ({}),
  loading: false,
  emptyStateTitle: 'No Data',
  emptyStateMessage: 'There is no data to display.',
  emptyStateActionMessage: '',
  emptyStateIconVariant: EmptyStateIconVariants.Default,
  error: false,
  errorStateTitle: 'An error occurred',
  errorStateMessage: 'Data cannot be displayed due to an error.',
  errorStateActionMessage: '',
  maxHeight: 'none',
  hidePagination: false,
  paginationAttributes: () => ({}),
  rowExpandable: () => false,
  rowExpanded: () => false,
  hideHeaders: false,
  nested: false,
  hidePaginationWhenOptional: false,
  hideToolbar: false,
  /**
   * KTableData props defaults
   */
  headers: () => ([]),
  fetcherCacheKey: '',
  cacheIdentifier: '',
  searchInput: '',
  initialFetcherParams: () => ({}),
  clientSort: false,
  sortable: true,
})

const slots = useSlots()

const { useDebounce, useRequest, useSwrvState, clientSideSorter: defaultClientSideSorter } = useUtilities()

const emit = defineEmits<{
  (e: 'cell-click', value: { data: Record<string, any> }): void
  (e: 'row-click', value: { data: Record<string, any> }): void
  (e: 'error-action-click'): void
  (e: 'empty-state-action-click'): void
  (e: 'update:table-preferences', preferences: TablePreferences): void
  (e: 'sort', value: TableSortPayload): void
  (e: 'state', value: TableStatePayload): void
  (e: 'row-select', data: Record<string, any>[]): void
  (e: 'update:row-expanded', data: RowExpandPayload): void
  (e: 'row-actions-toggle', data: RowActionsTogglePayload): void
}>()

const tableId = useId()

const tableData = ref<Record<string, any>[]>([])
const tableHeaders = computed((): TableDataHeader[] => props.sortable ? props.headers : props.headers.map((header) => ({ ...header, sortable: false })))
const getEmptyStateButtonAppearance = computed((): ButtonAppearance => {
  if (props.emptyStateButtonAppearance) {
    return props.emptyStateButtonAppearance
  }

  return props.searchInput ? 'tertiary' : 'primary'
})

const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(getInitialPageSize(props.tablePreferences, props.paginationAttributes))
const filterQuery = ref<string>(props.searchInput ?? '')
const sortColumnKey = ref<string>('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const offset: Ref<string | null> = ref(null)
const offsets: Ref<Array<any>> = ref([])
const hasNextPage = ref<boolean>(true)
const hasInitialized = ref<boolean>(false)

const defaultFetcherProps = {
  pageSize: pageSize.value,
  page: page.value,
  query: filterQuery.value,
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value,
  offset: offset.value,
}

const tablePaginationAttributes = computed((): TablePaginationAttributes => ({
  totalCount: total.value,
  initialPageSize: pageSize.value,
  currentPage: page.value,
  offsetPreviousButtonDisabled: !previousOffset.value,
  offsetNextButtonDisabled: !nextOffset.value || !hasNextPage.value,
  ...props.paginationAttributes,
}))

function isTableColumnSlotName(slot: string): slot is TableColumnSlotName {
  return slot.startsWith('column-')
}

function isTableColumnTooltipSlotName(slot: string): slot is TableColumnTooltipSlotName {
  return slot.startsWith('tooltip-')
}

const getHeaderSlots = computed((): TableColumnSlotName[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter(isTableColumnSlotName)
})

const getHeaderTooltipSlots = computed((): TableColumnTooltipSlotName[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter(isTableColumnTooltipSlotName)
})

const getCellSlots = computed((): string[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter((slot) => tableHeaders.value.some((header) => header.key === slot))
})

const sortParams = computed(() => ({
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value,
}))

// Params that are used in the cache key for the fetcher.
// For client-side sorting, we don't need to include the sort params in the cache key otherwise the cache key will change on every sort,
// which will cause the table to re-fetch data on every sort even though we don't need to fetch new data.
const cacheKeyParams = computed(() => ({
  pageSize: pageSize.value,
  page: page.value,
  query: filterQuery.value,
  offset: offset.value,
  ...props.clientSort ? {} : sortParams.value,
}))

// We still need all params for the fetcher
const fetcherParams = computed(() => ({
  ...cacheKeyParams.value,
  ...sortParams.value,
}))

const isInitialFetch = ref<boolean>(true)
const fetchData = async () => {
  const res = await props.fetcher(fetcherParams.value)

  isInitialFetch.value = false

  return res
}

/**
 * Initialize the table with the initial data
 */
const initData = () => {
  const fetcherParams = {
    ...defaultFetcherProps,
    ...props.initialFetcherParams,
  }

  // don't allow overriding default settings with undefined values
  page.value = fetcherParams.page ?? defaultFetcherProps.page
  pageSize.value = fetcherParams.pageSize ?? defaultFetcherProps.pageSize
  filterQuery.value = fetcherParams.query ?? defaultFetcherProps.query
  sortColumnKey.value = fetcherParams.sortColumnKey ?? defaultFetcherProps.sortColumnKey
  sortColumnOrder.value = fetcherParams.sortColumnOrder as SortColumnOrder ?? defaultFetcherProps.sortColumnOrder as SortColumnOrder

  if (props.clientSort && sortColumnKey.value && sortColumnOrder.value) {
    defaultClientSideSorter(sortColumnKey.value, '', sortColumnOrder.value, tableData.value)
  }

  if (props.paginationAttributes?.offset) {
    offset.value = fetcherParams.offset
    offsets.value.push(fetcherParams.offset)
  }

  // trigger setting of tableFetcherCacheKey
  hasInitialized.value = true
}

const previousOffset = computed((): string | null => offsets.value[page.value - 1])
const nextOffset = ref<string | null>(null)

// once initData() finishes, setting tableFetcherCacheKey to non-falsey value triggers fetch of data
const tableFetcherCacheKey = computed((): string => {
  if (!props.fetcher || !hasInitialized.value) {
    return ''
  }

  // Set the default identifier to a random string
  let identifierKey: string = tableId
  if (props.cacheIdentifier) {
    identifierKey = props.cacheIdentifier
  }

  identifierKey += `-${JSON.stringify(cacheKeyParams.value)}`

  if (props.fetcherCacheKey) {
    identifierKey += `-${props.fetcherCacheKey}`
  }

  return `k-table_${identifierKey}`
})

const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => {
  filterQuery.value = q
}, 350)
const search = generateDebouncedSearch(0) // generate a debounced function with zero delay (immediate)

// ALL fetching is done through this useRequest / _revalidate
// don't fire until tableFetcherCacheKey is set
const {
  data: fetcherData,
  response: fetcherResponse,
  error: fetcherError,
  revalidate: _revalidate,
  isValidating: fetcherIsValidating,
  isLoading: fetcherIsLoading,
} = useRequest(
  () => tableFetcherCacheKey.value,
  () => fetchData(),
  { revalidateOnFocus: false, revalidateDebounce: 0 },
)

const { state, hasData } = useSwrvState(fetcherData, fetcherError, fetcherIsValidating)
const stateData = computed((): SwrvStateData => ({
  hasData: hasData.value,
  state: state.value,
}))
const tableState = computed((): TableState => fetcherIsLoading.value ? 'loading' : fetcherError.value ? 'error' : 'success')
const { debouncedFn: debouncedRevalidate } = useDebounce(_revalidate, 500)

const sortHandler = ({ sortColumnKey: columnKey, prevKey, sortColumnOrder: sortOrder }: TableSortPayload): void => {
  const header: TableDataHeader = tableHeaders.value.find((header) => header.key === columnKey)!
  const { useSortHandlerFunction } = header

  emit('sort', {
    prevKey,
    sortColumnKey: columnKey,
    sortColumnOrder: sortOrder,
  })

  page.value = 1

  if (!sortColumnKey.value || columnKey !== sortColumnKey.value) {
    offsets.value = [null]
  }

  sortColumnKey.value = columnKey
  sortColumnOrder.value = sortOrder as SortColumnOrder

  if (props.clientSort) {
    if (useSortHandlerFunction && props.sortHandlerFunction) {
      props.sortHandlerFunction({
        key: columnKey,
        prevKey,
        sortColumnOrder: sortColumnOrder.value,
        data: tableData.value,
      })
    } else {
      defaultClientSideSorter(columnKey, prevKey, sortColumnOrder.value, tableData.value)
    }
  } else if (!props.paginationAttributes?.offset) {
    debouncedRevalidate()
  }
}

const pageChangeHandler = ({ page: newPage }: PageChangeData) => {
  page.value = newPage
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangeData) => {
  offsets.value = [null]
  offset.value = null
  pageSize.value = newPageSize
  page.value = 1
}

const tablePreferencesUpdateHandler = ({ columnWidths: newColumnWidth, columnVisibility: newColumnVisibility }: TablePreferences) => {
  tableViewColumnWidths.value = newColumnWidth
  tableViewColumnVisibility.value = newColumnVisibility

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

const tableViewColumnWidths = ref<Record<string, number> | undefined>({})
const tableViewColumnVisibility = ref<Record<string, boolean> | undefined>({})
const tableDataPreferences = computed((): TablePreferences => ({
  pageSize: pageSize.value,
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value,
  ...(tableViewColumnWidths.value ? { columnWidths: tableViewColumnWidths.value } : {}),
  ...(tableViewColumnVisibility.value ? { columnVisibility: tableViewColumnVisibility.value } : {}),
}))

const emitTablePreferences = (): void => {
  if (tableState.value === 'success') {
    emit('update:table-preferences', tableDataPreferences.value)
  }
}

const getNextOffsetHandler = (): void => {
  page.value++
  offset.value = nextOffset.value
}

const getPreviousOffsetHandler = (): void => {
  page.value--
  offset.value = previousOffset.value
}

const showPagination = computed((): boolean => {
  // if fetcher is not defined or hidePagination is true, don't show pagination
  if (!props.fetcher || props.hidePagination) {
    return false
  }

  const minPageSize = props.paginationAttributes?.pageSizes?.[0] ?? DEFAULT_PAGE_SIZE

  // this logic is built around min page size so that pagination doesn't disappear when a higher value is selected and hidePaginationWhenOptional is true
  if (props.hidePaginationWhenOptional && page.value === 1) {
    if (!props.paginationAttributes?.offset) {
      // if using cursor-based pagination, hide pagination when number of items is less than min page size
      return total.value > minPageSize
    } else {
      // if using offset-based pagination, hide pagination when neither previous nor next offset is available and total items is less than min page size
      return !!previousOffset.value || !!nextOffset.value || tableData.value.length >= minPageSize
    }
  }

  return true
})

watch(fetcherResponse, (res: Record<string, any>) => {
  if (!res?.data) {
    return
  }

  tableData.value = res.data as Record<string, any>[]
  total.value = props.paginationAttributes?.totalCount || res.total || res.data?.length || 0

  // if using offset-based pagination, set the next offset
  if (props.paginationAttributes?.offset) {
    if (!res.pagination?.offset) {
      nextOffset.value = null
    } else {
      nextOffset.value = res.pagination.offset

      if (!offsets.value[page.value]) {
        offsets.value.push(res.pagination.offset)
      }
    }

    // look for hasNextPage in the response, otherwise default to true
    hasNextPage.value = (res.pagination && 'hasNextPage' in res.pagination) ? res.pagination.hasNextPage : true
  }

  // if the data is empty and the page is greater than 1,
  // e.g. user deletes the last item on the last page,
  // reset the page to 1
  if (tableData.value.length === 0 && page.value > 1) {
    page.value = 1
    offsets.value = [null]
    offset.value = null
  }
}, { deep: true, immediate: true })

watch([stateData, tableState], (newState) => {
  const [newStateData, newTableState] = newState

  emit('state', {
    state: newTableState,
    hasData: newStateData.hasData,
  })
})

// handles debounce of search query
watch(() => props.searchInput, (newSearchInput: string) => {
  if (newSearchInput === '') {
    search(newSearchInput)
  } else {
    debouncedSearch(newSearchInput)
  }
}, { immediate: true })

watch([filterQuery, pageSize], async (newData, oldData) => {
  const [oldQuery] = oldData
  const [newQuery] = newData

  if (newQuery !== oldQuery && page.value !== 1) {
    page.value = 1
    offsets.value = [null]
    offset.value = null
  }
}, { deep: true, immediate: true })

onMounted(() => {
  initData()
})

defineExpose({
  revalidate: () => {
    _revalidate()
  },
})
</script>
