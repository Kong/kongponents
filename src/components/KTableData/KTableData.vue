<template>
  <KTableView
    :cell-attrs="cellAttrs"
    class="k-table-data"
    :data="tableData"
    :empty-state-action-message="emptyStateActionMessage"
    :empty-state-action-route="emptyStateActionRoute"
    :empty-state-button-appearance="emptyStateButtonAppearance"
    :empty-state-icon-variant="emptyStateIconVariant"
    :empty-state-message="emptyStateMessage"
    :empty-state-title="emptyStateTitle"
    :error="error"
    :error-state-action-message="errorStateActionMessage"
    :error-state-action-route="errorStateActionRoute"
    :error-state-message="errorStateMessage"
    :error-state-title="errorStateTitle"
    :headers="tableHeaders"
    :hide-headers="hideHeaders"
    :hide-pagination="hidePagination || !showPagination"
    :loading="loading || isTableLoading"
    :max-height="maxHeight"
    :nested="nested"
    :pagination-attributes="tablePaginationAttributes"
    :resize-columns="resizeColumns"
    :row-attrs="rowAttrs"
    :row-bulk-action-enabled="rowBulkActionEnabled"
    :row-expandable="rowExpandable"
    :row-hover="rowHover"
    :row-link="rowLink"
    :table-preferences="tablePreferences"
    @get-next-offset="getNextOffsetHandler"
    @get-previous-offset="getPreviousOffsetHandler"
    @page-change="pageChangeHandler"
    @page-size-change="pageSizeChangeHandler"
    @sort="sortHandler"
    @update:table-preferences="tableViewPreferences = $event"
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
  </KTableView>
</template>

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, watch, computed, onMounted, useSlots } from 'vue'
import KTableView from '@/components/KTableView/KTableView.vue'
import useUtilities from '@/composables/useUtilities'
import type {
  TablePreferences,
  TableDataHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  SortColumnOrder,
  TableSortPayload,
  EmptyStateIconVariant,
  ButtonAppearance,
  RowLink,
  TablePaginationAttributes,
  PageChangeData,
  PageSizeChangeData,
  RowBulkAction,
  TableState,
  TableStatePayload,
  SwrvState,
  SwrvStateData,
} from '@/types'
import { EmptyStateIconVariants } from '@/types'
import useUniqueId from '@/composables/useUniqueId'
import type { RouteLocationRaw } from 'vue-router'

const slots = useSlots()

const { useDebounce, useRequest, useSwrvState, clientSideSorter: defaultClientSideSorter } = useUtilities()

const props = defineProps({
  /**
   * KTableView props
   */
  resizeColumns: {
    type: Boolean,
    default: false,
  },
  tablePreferences: {
    type: Object as PropType<TablePreferences>,
    default: () => ({}),
  },
  rowHover: {
    type: Boolean,
    default: true,
  },
  rowAttrs: {
    type: Function as PropType<(row: Record<string, any>) => Record<string, string>>,
    default: () => ({}),
  },
  rowLink: {
    type: Function as PropType<(row: Record<string, any>) => RowLink>,
    default: () => ({}),
  },
  rowBulkActionEnabled: {
    type: Function as PropType<(row: Record<string, any>) => RowBulkAction>,
    default: () => true,
  },
  cellAttrs: {
    type: Function,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyStateTitle: {
    type: String,
    default: 'No Data',
  },
  emptyStateMessage: {
    type: String,
    default: 'There is no data to display.',
  },
  emptyStateActionRoute: {
    type: [Object, String] as PropType<RouteLocationRaw | string>,
    default: null,
  },
  emptyStateActionMessage: {
    type: String,
    default: '',
  },
  emptyStateIconVariant: {
    type: String as PropType<EmptyStateIconVariant>,
    default: EmptyStateIconVariants.Default,
  },
  emptyStateButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorStateTitle: {
    type: String,
    default: 'An error occurred',
  },
  errorStateMessage: {
    type: String,
    default: 'Data cannot be displayed due to an error.',
  },
  errorStateActionRoute: {
    type: [Object, String] as PropType<RouteLocationRaw | string>,
    default: null,
  },
  errorStateActionMessage: {
    type: String,
    default: '',
  },
  headers: {
    type: Array as PropType<TableDataHeader[]>,
    default: () => [],
  },
  maxHeight: {
    type: String,
    default: 'none',
  },
  hidePagination: {
    type: Boolean,
    default: false,
  },
  paginationAttributes: {
    type: Object as PropType<TablePaginationAttributes>,
    default: () => ({}),
  },
  rowExpandable: {
    type: Function as PropType<(row: Record<string, any>) => boolean>,
    default: () => false,
  },
  hideHeaders: {
    type: Boolean,
    default: false,
  },
  nested: {
    type: Boolean,
    default: false,
  },
  /**
   * KTableData props
   */
  /**
   * A prop to pass in a fetcher function to enable server-side search, sort
   * and pagination
   */
  fetcher: {
    type: Function,
    default: undefined,
    required: true,
  },
  /**
   * A prop to trigger a revalidate of the fetcher function. Modifying this value
   * will trigger a manual refetch of the table data.
   */
  fetcherCacheKey: {
    type: String,
    default: '',
  },
  /**
   * A prop used to uniquely identify this table in the swrv cache
   */
  cacheIdentifier: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a search string for server-side search
   */
  searchInput: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in an object of intial params for the initial fetcher function call
   */
  initialFetcherParams: {
    type: Object,
    default: null,
  },
  /**
   * Enable client side sort - only do this if using a fetcher that returns static data
   */
  clientSort: {
    type: Boolean,
    default: false,
  },
  sortHandlerFunction: {
    type: Function,
    default: () => ({}),
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  /**
   * A prop to pass to hide pagination for total table records is less than or equal to pagesize
   */
  hidePaginationWhenOptional: {
    type: Boolean,
    default: false,
  },
  hideToolbar: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'cell-click', value: { data: any }): void
  (e: 'row-click', value: { data: any }): void
  (e: 'error-action-click'): void
  (e: 'empty-state-action-click'): void
  (e: 'update:table-preferences', preferences: TablePreferences): void
  (e: 'sort', value: TableSortPayload): void
  (e: 'state', value: TableStatePayload): void
}>()

const tableId = useUniqueId()
const defaultFetcherProps = {
  pageSize: 15,
  page: 1,
  query: '',
  sortColumnKey: '',
  sortColumnOrder: 'desc',
  offset: null,
}

const tableData = ref<Record<string, any>[]>([])
const tableHeaders = computed((): TableDataHeader[] => props.sortable ? props.headers : props.headers.map((header) => ({ ...header, sortable: false })))

const total = ref<number>(0)
const page = ref<number>(1)
const pageSize = ref<number>(15)
const filterQuery = ref<string>('')
const sortColumnKey = ref<string>('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const offset: Ref<string | null> = ref(null)
const offsets: Ref<Array<any>> = ref([])
const hasNextPage = ref<boolean>(true)
const hasInitialized = ref<boolean>(false)

const tablePaginationAttributes = computed((): TablePaginationAttributes => ({ ...props.paginationAttributes, totalCount: total.value, initialPageSize: pageSize.value, currentPage: page.value }))

const getHeaderSlots = computed((): string[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter((slot) => slot.startsWith('column-'))
})

const getHeaderTooltipSlots = computed((): string[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter((slot) => slot.startsWith('tooltip-'))
})

const getCellSlots = computed((): string[] => {
  if (!slots) {
    return []
  }

  return Object.keys(slots).filter((slot) => tableHeaders.value.some((header) => header.key === slot))
})

const isInitialFetch = ref<boolean>(true)
const fetchData = async () => {
  const searchInput = props.searchInput

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await props.fetcher({
    pageSize: pageSize.value,
    page: page.value,
    query: searchInput || filterQuery.value,
    sortColumnKey: sortColumnKey.value,
    sortColumnOrder: sortColumnOrder.value,
    offset: offset.value,
  })
  tableData.value = res.data as Record<string, any>[]
  total.value = props.paginationAttributes?.totalCount || res.total || res.data?.length

  if (props.paginationAttributes?.offset) {
    if (!res.pagination?.offset) {
      nextOffset.value = null
    } else {
      nextOffset.value = res.pagination.offset

      if (!offsets.value[page.value]) {
        offsets.value.push(res.pagination.offset)
      }
    }

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

  isInitialFetch.value = false

  return res
}

const initData = () => {
  const fetcherParams = {
    ...defaultFetcherProps,
    ...props.initialFetcherParams,
  }
  // don't allow overriding default settings with `undefined` values
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

// once `initData()` finishes, setting tableFetcherCacheKey to non-falsey value triggers fetch of data
const tableFetcherCacheKey = computed((): string => {
  if (!props.fetcher || !hasInitialized.value) {
    return ''
  }

  // Set the default identifier to a random string
  let identifierKey: string = tableId
  if (props.cacheIdentifier) {
    identifierKey = props.cacheIdentifier
  }

  if (props.fetcherCacheKey) {
    identifierKey += `-${props.fetcherCacheKey}`
  }

  return `k-table_${identifierKey}`
})

const query = ref('')
const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => {
  query.value = q
}, 350)
const search = generateDebouncedSearch(0) // generate a debounced function with zero delay (immediate)

// ALL fetching is done through this useRequest / _revalidate
// don't fire until tableFetcherCacheKey is set
const { data: fetcherData, error: fetcherError, revalidate: _revalidate, isValidating: fetcherIsValidating } = useRequest(
  () => tableFetcherCacheKey.value,
  () => fetchData(),
  { revalidateOnFocus: false, revalidateDebounce: 0 },
)

const { state, hasData, swrvState } = useSwrvState(fetcherData, fetcherError, fetcherIsValidating)
const isTableLoading = ref<boolean>(true)
const stateData = computed((): SwrvStateData => ({
  hasData: hasData.value,
  state: state.value as SwrvState,
}))
const tableState = computed((): TableState => isTableLoading.value ? 'loading' : fetcherError.value ? 'error' : 'success')
const { debouncedFn: debouncedRevalidate, generateDebouncedFn: generateDebouncedRevalidate } = useDebounce(_revalidate, 500)
const revalidate = generateDebouncedRevalidate(0) // generate a debounced function with zero delay (immediate)

const sortHandler = ({ sortColumnKey: columnKey, prevKey, sortColumnOrder: sortOrder }: TableSortPayload): void => {
  const header: TableDataHeader = tableHeaders.value.find((header) => header.key === columnKey)!
  const { useSortHandlerFunction } = header

  page.value = 1

  if (!sortColumnKey.value || columnKey !== sortColumnKey.value) {
    offsets.value = [null]
  }

  sortColumnKey.value = columnKey
  sortColumnOrder.value = sortOrder as SortColumnOrder

  if (props.clientSort) {
    if (useSortHandlerFunction && props.sortHandlerFunction) {
      props.sortHandlerFunction({
        columnKey,
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

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

const pageChangeHandler = ({ page: newPage }: PageChangeData) => {
  page.value = newPage
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangeData) => {
  offsets.value = [null]
  offset.value = null
  pageSize.value = newPageSize
  page.value = 1

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

const tableViewPreferences = ref<TablePreferences>({})
const tableDataPreferences = computed((): TablePreferences => ({ pageSize: pageSize.value, ...tableViewPreferences.value }))

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

// fetcher must be defined, hidePagination must be false
// if using standard pagination with hidePaginationWhenOptional
//  - hide if total <= min pagesize
// if using offset-based pagination with hidePaginationWhenOptional
//  - hide if neither previous/next offset exists and current data set count is < min pagesize
const showPagination = computed((): boolean => {
  return !!(props.fetcher && !props.hidePagination &&
        !(!props.paginationAttributes?.offset && props.hidePaginationWhenOptional && props.paginationAttributes?.pageSizes && total.value <= props.paginationAttributes?.pageSizes[0]) &&
        !(props.paginationAttributes?.offset && props.hidePaginationWhenOptional && !previousOffset.value && !nextOffset.value && props.paginationAttributes?.pageSizes && tableData.value.length < props.paginationAttributes?.pageSizes[0]))
})

watch(fetcherData, (fetchedData: any) => {
  if (fetchedData?.length && !tableData.value.length) {
    tableData.value = fetchedData
  }
}, { deep: true, immediate: true })

// we want to tie loader to 'pending' since 'validating' is triggered even when pulling from cache, which should result in no loader
// however, if this is a manual revalidation (triggered by page change, query, etc), display loader when validating
watch(state, () => {
  switch (state.value) {
    case swrvState.PENDING:
      isTableLoading.value = true
      break
    case swrvState.VALIDATING_HAS_DATA:
      isTableLoading.value = isRevalidating.value
      break
    default:
      isTableLoading.value = false
      break
  }
}, { immediate: true })

watch([stateData, tableState], (newData) => {
  emit('state', {
    state: newData?.[1], // newData[tableState]
    hasData: newData?.[0]?.hasData, // newData[stateData].hasData
  })
})

// handles debounce of search input
watch(() => props.searchInput, (newValue: string) => {
  if (page.value !== 1) {
    page.value = 1
  }

  if (newValue === '') {
    search(newValue)
  } else {
    debouncedSearch(newValue)
  }
}, { immediate: true })

const isRevalidating = ref<boolean>(false)
watch([query, page, pageSize], async (newData, oldData) => {
  const oldQuery = oldData?.[0]
  const newQuery = newData[0]
  const newPage = newData[1]

  if (newQuery !== oldQuery && newPage !== 1) {
    page.value = 1
    offsets.value = [null]
    offset.value = null
  }

  // don't revalidate until we have finished initializing and made initial fetch
  if (hasInitialized.value && !isInitialFetch.value) {
    isRevalidating.value = true

    if (newQuery !== '' && newQuery !== oldQuery) {
      // handles debounce of search request
      await debouncedRevalidate()
    } else {
      await revalidate()
    }

    isRevalidating.value = false
  }
}, { deep: true, immediate: true })

watch(tableDataPreferences, () => {
  emitTablePreferences()
}, { immediate: true })

onMounted(() => {
  initData()
})
</script>
