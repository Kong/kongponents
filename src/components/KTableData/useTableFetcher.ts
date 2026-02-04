import { computed, ref, useId, toValue } from 'vue'
import { getInitialPageSize, DEFAULT_PAGE_SIZE } from '@/utilities'
import useUtilities from '@/composables/useUtilities'

import type { ComputedRef, Ref, UnwrapRef, MaybeRefOrGetter } from 'vue'
import type { TableDataProps, TableColumnKey, TableDataHeader, SortColumnOrder, TableState, TableSortPayload, TablePaginationAttributes, TableColumnVisibility, TableColumnWidths, TablePreferences } from '@/types/table'
import type { SwrvStateData } from '@/types/swrv'

export type TableDataRecord = ReadonlyArray<Record<string, any>>
export type OffsetType = string | number

/**
 * Utility type that wraps all properties of an object type with MaybeRefOrGetter
 */
export type MaybeRefOrGetterProps<T> = {
  [K in keyof T]: MaybeRefOrGetter<T[K]>
}

export type TableSortProps<
  Header extends TableDataHeader,
  Data extends TableDataRecord,
  Offset extends OffsetType,
> = MaybeRefOrGetterProps<Pick<
  TableDataProps<Header, Data, Offset>,
  | 'initialFetcherParams' | 'clientSort' | 'tablePreferences'
  | 'paginationAttributes' | 'sortHandlerFunction' | 'sortable' | 'headers'
>>

export type SortParams<T extends TableDataHeader> = {
  sortColumnKey: TableColumnKey<T>
  sortColumnOrder: SortColumnOrder
}

const DEFAULT_SORT_ORDER: SortColumnOrder = 'desc'

export const useTableSort = <Header extends TableDataHeader, Data extends TableDataRecord, Offset extends OffsetType>(
  {
    tablePreferences,
    initialFetcherParams,
    clientSort,
    paginationAttributes,
    sortHandlerFunction,
  }: TableSortProps<Header, Data, Offset>,
  {
    tableHeaders,
    page,
    offsets,
    tableData,
    debouncedRevalidate,
  }: {
    tableHeaders: ComputedRef<readonly Header[]>
    page: Ref<number>
    offsets: Ref<Array<Offset | null>>
    tableData: Ref<Array<Data[number]>>
    debouncedRevalidate: () => void
  },
) => {

  type ColumnKey = TableColumnKey<Header>

  const sortColumnKey = ref(toValue(tablePreferences)?.sortColumnKey || toValue(initialFetcherParams)?.sortColumnKey || '') as Ref<ColumnKey>
  const sortColumnOrder = ref(toValue(tablePreferences)?.sortColumnOrder || toValue(initialFetcherParams)?.sortColumnOrder || DEFAULT_SORT_ORDER) as Ref<SortColumnOrder>
  const initialSortHandled = ref<boolean>(!(sortColumnKey.value && toValue(clientSort))) // For clientSort tables, if sortColumnKey is set, that means we need to handle initial sort
  const sortParams = computed(() => ({
    sortColumnKey: sortColumnKey.value,
    sortColumnOrder: sortColumnOrder.value,
  })) as Ref<SortParams<Header>>

  const { clientSideSorter: defaultClientSideSorter } = useUtilities()

  const sortHandler = ({ sortColumnKey: columnKey, prevKey, sortColumnOrder: sortOrder }: TableSortPayload<ColumnKey>, sortEvtEmitter?: (params: TableSortPayload<ColumnKey>) => void): void => {
    initialSortHandled.value = true

    const header = tableHeaders.value.find((header) => header.key === columnKey) || {} as UnwrapRef<typeof tableHeaders>[number]
    const { useSortHandlerFunction } = header

    sortEvtEmitter?.({
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
    const sortHandler = toValue(sortHandlerFunction)
    if (toValue(clientSort)) {
      if (useSortHandlerFunction && sortHandler) {
        const sorted = sortHandler({
          key: columnKey,
          prevKey,
          sortColumnOrder: sortColumnOrder.value,
          data: tableData.value,
        })

        // As `sortHandlerFunction` was marked as returning an array but we didn't use the return value
        // before, we can keep the old behavior when nothing is returned but use the returned value if it exists.
        if (sorted) {
          tableData.value = [...sorted]
        }
      } else {
        defaultClientSideSorter(columnKey, prevKey, sortColumnOrder.value, tableData.value)
      }
    } else if (!toValue(paginationAttributes)?.offset) {
      debouncedRevalidate()
    }
  }

  return {
    sortColumnKey,
    sortColumnOrder,
    sortParams,
    initialSortHandled,

    sortHandler,
  }
}

export type TablePaginationProps<
  Header extends TableDataHeader,
  Data extends TableDataRecord,
  Offset extends OffsetType,
> = MaybeRefOrGetterProps<Pick<
  TableDataProps<Header, Data, Offset>,
  | 'fetcher' | 'paginationAttributes' | 'hidePaginationWhenOptional' | 'hidePagination' | 'tablePreferences'
>>

export const useTablePagination = <Header extends TableDataHeader, Data extends TableDataRecord, Offset extends OffsetType>(
  props: TablePaginationProps<Header, Data, Offset>,
  tableData: Ref<Array<Data[number]>>,
  response: Ref<Awaited<ReturnType<TableDataProps<Header, Data, Offset>['fetcher']>>>,
) => {
  const page = ref<number>(1)
  const pageSize = ref<number>(getInitialPageSize(toValue(props.tablePreferences) ?? {}, toValue(props.paginationAttributes) ?? {}))
  const offset = ref(null) as Ref<Offset | null>
  const offsets = ref([]) as Ref<Array<Offset | null>>
  const hasNextPage = computed(() => {
    const res = response.value
    return (res?.pagination && 'hasNextPage' in res.pagination) ? res.pagination.hasNextPage || false : true
  })

  const previousOffset = computed((): Offset | null => offsets.value[page.value - 1] || null)
  const nextOffset = computed(() => {
    const res = response.value
    const paginationAttrs = toValue(props.paginationAttributes)

    if (paginationAttrs?.offset) {
      if (!res?.pagination?.offset) {
        return null
      } else {
        return res?.pagination.offset
      }
    }

    return null
  })

  const total = computed(() => {
    const res = response.value
    const paginationAttrs = toValue(props.paginationAttributes)
    return paginationAttrs?.totalCount || res?.total || res?.data?.length || 0
  })

  const showPagination = computed((): boolean => {
    const fetcherValue = toValue(props.fetcher)
    const hidePaginationValue = toValue(props.hidePagination)
    const paginationAttrs = toValue(props.paginationAttributes)
    const hidePaginationWhenOptionalValue = toValue(props.hidePaginationWhenOptional)

    // if fetcher is not defined or hidePagination is true, don't show pagination
    if (!fetcherValue || hidePaginationValue) {
      return false
    }

    const minPageSize = paginationAttrs?.pageSizes?.[0] ?? DEFAULT_PAGE_SIZE

    // this logic is built around min page size so that pagination doesn't disappear when a higher value is selected and hidePaginationWhenOptional is true
    if (hidePaginationWhenOptionalValue && page.value === 1) {
      if (!paginationAttrs?.offset) {
        // if using cursor-based pagination, hide pagination when number of items is less than min page size
        return total.value > minPageSize
      } else {
        // if using offset-based pagination, hide pagination when neither previous nor next offset is available and total items is less than min page size
        return !!previousOffset.value || !!nextOffset.value || tableData.value.length >= minPageSize
      }
    }

    return true
  })

  const tablePaginationAttributes = computed((): TablePaginationAttributes => ({
    totalCount: total.value,
    initialPageSize: pageSize.value,
    currentPage: page.value,
    offsetPreviousButtonDisabled: !previousOffset.value,
    offsetNextButtonDisabled: !nextOffset.value || !hasNextPage.value,
    ...toValue(props.paginationAttributes),
  }))

  const toNextPageOffset = () => {
    page.value++
    offset.value = nextOffset.value
  }

  const toPreviousPageOffset = () => {
    page.value--
    offset.value = previousOffset.value
  }

  return {
    total,
    page,
    offset,
    offsets,
    nextOffset,
    showPagination,
    pageSize,
    tablePaginationAttributes,
    hasNextPage,

    toNextPageOffset,
    toPreviousPageOffset,
  }
}

export type TablePreferencesProps<
  Header extends TableDataHeader,
  Data extends TableDataRecord,
  Offset extends OffsetType,
> = MaybeRefOrGetterProps<Pick<
  TableDataProps<Header, Data, Offset>,
  | 'tablePreferences'
>>

export const useTablePreferences = <Header extends TableDataHeader, Data extends TableDataRecord, Offset extends OffsetType>(
  {
    tablePreferences,
  }: TablePreferencesProps<Header, Data, Offset>,
  {
    emitTablePreferences,
    pageSize,
    sortColumnKey,
    sortColumnOrder,
  }: {
    emitTablePreferences: (tablePreferences: TablePreferences) => void
  }
  & Pick<ReturnType<typeof useTablePagination<Header, Data, Offset>>, 'pageSize'>
  & Pick<ReturnType<typeof useTableSort<Header, Data, Offset>>, 'sortColumnKey' | 'sortColumnOrder'>,
) => {
  type ColumnKey = TableColumnKey<Header>
  type ColumnVisibility = TableColumnVisibility<Header>
  type ColumnWidths = TableColumnWidths<Header>

  const tableViewColumnWidths = ref(toValue(tablePreferences)?.columnWidths || {}) as Ref<ColumnWidths>
  const tableViewColumnVisibility = ref(toValue(tablePreferences)?.columnVisibility || {}) as Ref<ColumnVisibility>

  const tablePreferencesUpdateHandler = ({ columnWidths: newColumnWidth, columnVisibility: newColumnVisibility }: TablePreferences<ColumnKey>) => {
  // Update the column width and visibility overriding but keeping the existing properties (in case the new objects are empty)
    tableViewColumnWidths.value = {
      ...tableViewColumnWidths.value,
      ...newColumnWidth,
    }
    tableViewColumnVisibility.value = {
      ...tableViewColumnVisibility.value,
      ...newColumnVisibility,
    }

    // Emit an event whenever one of the tablePreferences are updated
    emitTablePreferences(tableDataPreferences.value)
  }

  const tableDataPreferences = computed<TablePreferences<Header['key']>>(() => ({
    pageSize: pageSize.value,
    sortColumnKey: sortColumnKey.value,
    sortColumnOrder: sortColumnOrder.value,
    ...(tableViewColumnWidths.value ? { columnWidths: tableViewColumnWidths.value } : {}),
    ...(tableViewColumnVisibility.value ? { columnVisibility: tableViewColumnVisibility.value } : {}),
  }))

  return {
    tablePreferencesUpdateHandler,
    tableDataPreferences,

    tableViewColumnVisibility,
    tableViewColumnWidths,
  }
}

export type TableCacheProps<
  Header extends TableDataHeader,
  Data extends TableDataRecord,
  Offset extends OffsetType,
> = Pick<
  TableDataProps<Header, Data, Offset>,
  | 'searchInput' | 'cacheIdentifier' | 'fetcherCacheKey'
>

export type TableFetcherProps<
  Header extends TableDataHeader,
  Data extends TableDataRecord,
  Offset extends OffsetType,
> = MaybeRefOrGetterProps<TableDataProps<Header, Data, Offset>>

export const useTableData = <Header extends TableDataHeader, Data extends TableDataRecord, Offset extends OffsetType>(
  {
    headers,
    sortable,
    searchInput,
    fetcher,
    cacheIdentifier,
    fetcherCacheKey,
    clientSort,
    paginationAttributes,
    sortHandlerFunction,
    initialFetcherParams,
    tablePreferences,
    hidePagination,
    hidePaginationWhenOptional,
  }: TableFetcherProps<Header, Data, Offset>,
  handlers: {
    emitTablePreferences: (tablePreferences: TablePreferences) => void
  },
) => {
  const { useSwrvState, useDebounce, useRequest, clientSideSorter: defaultClientSideSorter } = useUtilities()
  const tableHeaders = computed(() => {
    const headersVal = toValue(headers) ?? []
    return toValue(sortable) ? headersVal : headersVal.map((header) => ({ ...header, sortable: false }))
  })

  const hasInitialized = ref(false)
  const tableId = useId()

  const filterQuery = ref(toValue(searchInput) ?? '')
  const isInitialFetch = ref(false)
  // Cannot use `ref<Data[number][]>([])` as the items will be inferred incorrectly inside the template.
  const tableData = ref<Array<Data[number]>>([]) as Ref<Array<Data[number]>>

  // once initData() finishes, setting tableFetcherCacheKey to non-falsey value triggers fetch of data
  const tableFetcherCacheKey = computed((): string => {
    if (!toValue(fetcher) || !hasInitialized.value) {
      return ''
    }

    // Set the default identifier to a random string
    let identifierKey: string = tableId
    if (toValue(cacheIdentifier)) {
      identifierKey = toValue(cacheIdentifier)!
    }

    identifierKey += `-${JSON.stringify(cacheKeyParams.value)}`

    if (toValue(fetcherCacheKey)) {
      identifierKey += `-${toValue(fetcherCacheKey)}`
    }

    return `k-table_${identifierKey}`
  })

  // ALL fetching is done through this useRequest / _revalidate
  // don't fire until tableFetcherCacheKey is set
  const fetchData = async () => {
    const res = await toValue(fetcher)!(toValue(fetcherParams))

    isInitialFetch.value = false

    return res
  }

  const {
    data,
    response,
    error,
    revalidate,
    isValidating,
    isLoading,
  } = useRequest(
    () => tableFetcherCacheKey.value,
    () => fetchData(),
    { revalidateOnFocus: false, revalidateDebounce: 0 },
  )

  const {
    page,
    offset,
    offsets,
    pageSize,
    showPagination,
    tablePaginationAttributes,

    toNextPageOffset,
    toPreviousPageOffset,
  } = useTablePagination({
    fetcher: fetcher,
    paginationAttributes: paginationAttributes,
    hidePaginationWhenOptional: hidePaginationWhenOptional,
    hidePagination: hidePagination,
    tablePreferences: tablePreferences,
  }, tableData, response)

  const { state, hasData } = useSwrvState(data, error, isValidating)
  const stateData = computed((): SwrvStateData => ({
    hasData: hasData.value,
    state: state.value,
  }))

  const tableState = computed((): TableState => isLoading.value ? 'loading' : error.value ? 'error' : 'success')
  const { debouncedFn: debouncedRevalidate } = useDebounce(revalidate, 500)

  const {
    sortColumnKey,
    sortColumnOrder,
    sortParams,
    initialSortHandled,

    sortHandler,
  } = useTableSort({
    initialFetcherParams,
    clientSort,
    tablePreferences,
    paginationAttributes,
    sortHandlerFunction,
    sortable,
    headers,
  }, {
    tableHeaders,
    page,
    offsets,
    tableData,
    debouncedRevalidate,
  })

  const {
    tablePreferencesUpdateHandler,
    tableDataPreferences,
    tableViewColumnVisibility,
    tableViewColumnWidths,
  } = useTablePreferences({
    tablePreferences,
  }, { emitTablePreferences: handlers.emitTablePreferences, pageSize, sortColumnKey, sortColumnOrder })

  // Params that are used in the cache key for the fetcher.
  // For client-side sorting, we don't need to include the sort params in the cache key otherwise the cache key will change on every sort,
  // which will cause the table to re-fetch data on every sort even though we don't need to fetch new data.
  const cacheKeyParams = computed(() => ({
    pageSize: pageSize.value,
    page: page.value,
    query: filterQuery.value,
    offset: offset.value,
    ...(toValue(clientSort) ? {} : sortParams.value),
  }))

  // We still need all params for the fetcher
  const fetcherParams = computed(() => ({
    ...cacheKeyParams.value,
    ...sortParams.value,
  }))

  const defaultFetcherProps = {
    pageSize: pageSize.value,
    page: page.value,
    query: filterQuery.value,
    sortColumnKey: sortColumnKey.value,
    sortColumnOrder: sortColumnOrder.value,
    offset: offset.value,
  }

  /**
   * Initialize the table with the initial data
   */
  const initData = () => {
    const fetcherParams = {
      ...defaultFetcherProps,
      ...(toValue(initialFetcherParams) ?? {}),
    }
    // don't allow overriding default settings with undefined values
    page.value = fetcherParams.page ?? defaultFetcherProps.page
    pageSize.value = fetcherParams.pageSize ?? defaultFetcherProps.pageSize
    filterQuery.value = fetcherParams.query ?? defaultFetcherProps.query
    sortColumnKey.value = fetcherParams.sortColumnKey ?? defaultFetcherProps.sortColumnKey
    sortColumnOrder.value = fetcherParams.sortColumnOrder ?? defaultFetcherProps.sortColumnOrder

    if (toValue(clientSort) && sortColumnKey.value && sortColumnOrder.value) {
      const header = tableHeaders.value.find((header) => header.key === sortColumnKey.value) || {} as UnwrapRef<typeof tableHeaders>[number]
      const { useSortHandlerFunction } = header

      const sortHandler = toValue(sortHandlerFunction)
      // If a custom sort function is provided, use it. Otherwise, use the default client-side sorter.
      if (useSortHandlerFunction && sortHandler) {
        const sorted = sortHandler({
          key: sortColumnKey.value,
          prevKey: '',
          sortColumnOrder: sortColumnOrder.value,
          data: tableData.value,
        })

        if (sorted) {
          tableData.value = [...sorted]
        }
      } else {
        defaultClientSideSorter(sortColumnKey.value, '', sortColumnOrder.value, tableData.value)
      }
    }

    if (toValue(paginationAttributes)?.offset) {
      offset.value = fetcherParams.offset
      offsets.value.push(fetcherParams.offset)
    }

    // trigger setting of tableFetcherCacheKey
    hasInitialized.value = true
  }


  return {
    tableHeaders,

    // data props
    filterQuery,
    data,
    response,
    error,
    isValidating,
    isLoading,
    tableState,
    stateData,
    tableData,
    revalidate,
    initData,
    debouncedRevalidate,

    // sort props
    sortColumnKey,
    sortColumnOrder,
    sortParams,
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
  }
}
