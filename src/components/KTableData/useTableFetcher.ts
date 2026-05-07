/**
 * Composables that back KTableData.vue.
 *
 * - `useTableSort`, `useTablePagination`, `useTablePreferences` are internal building blocks,
 *   each owning a coherent slice of state. They are not (currently) used independently — they
 *   are split out so each one's inputs and outputs are explicit and the file reads as a set of
 *   small, single-purpose pieces.
 * - `useTableData` is the public entry point KTableData consumes. It wires the three sub-composables
 *   together, manages the swrv cache key, and gates fetching behind `hasInitialized`.
 */
import { computed, ref, useId, toValue, watch, onMounted } from 'vue'
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

/**
 * Owns sort state (column key + order) and chooses between client-side and server-side
 * sort paths. `initialSortHandled` exists so client-sort tables can defer their first
 * sort until the initial response arrives — at composable construction `tableData` is
 * empty, so there's nothing to sort yet.
 */
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
  // Starts `true` for the common case (no preset sort key, OR server-sort table where the
  // server already applied the initial sort). Flips to `false` only when client-sort is on
  // AND a sort key is preset — in that case the consumer's response watcher must run the
  // first sort against the freshly-arrived data and then set this back to true.
  const initialSortHandled = ref<boolean>(!(sortColumnKey.value && toValue(clientSort)))
  const sortParams = computed(() => ({
    sortColumnKey: sortColumnKey.value,
    sortColumnOrder: sortColumnOrder.value,
  })) as Ref<SortParams<Header>>

  const { clientSideSorter: defaultClientSideSorter } = useUtilities()

  /**
   * Branches on (clientSort × custom-sort-handler × pagination-style):
   *   1. Always reset page to 1 and clear `offsets` if the column actually changed —
   *      cursor offsets are column-scoped on the server and meaningless under a new sort.
   *   2. clientSort + header opts in via `useSortHandlerFunction` + caller passed
   *      `sortHandlerFunction` → call user fn; accept either in-place mutation or a
   *      returned array (see legacy-compat note below).
   *   3. clientSort without a custom fn → `defaultClientSideSorter` mutates `tableData` in place.
   *   4. server-sort:
   *        - cursor pagination → bail. We can't refetch without a cursor; the consumer must
   *          let pagination round-trip back to page 1 first.
   *        - offset/page pagination → `debouncedRevalidate()` to refetch page 1 with new sort.
   */
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

/**
 * Owns pagination state. Supports two pagination styles, selected by
 * `paginationAttributes.offset` (boolean):
 *
 *   - cursor-based (default, when `offset` is falsy): `page` is just a counter. The fetcher
 *     decides hasNextPage/hasPreviousPage; we don't track cursors.
 *   - offset-based (when `offset` is truthy): we maintain `offsets` as a *cursor history*.
 *     `offsets[i]` is the cursor that was used to fetch page `i`, with `offsets[0] = null`
 *     meaning "first page, no cursor." This indexing convention is load-bearing — see the
 *     `watch(response)` block below; commit `e5a4258b6` fixed an off-by-one that broke
 *     backward navigation past page 2 specifically because of it.
 */
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

  // Three fallbacks, in priority order:
  //   1. `paginationAttributes.totalCount` — caller knows the count out-of-band.
  //   2. `response.total` — fetcher reported it.
  //   3. `response.data.length` — degrade to "at least the visible rows" so cursor APIs that
  //      don't return a count still render a sensible "showing N of N" rather than "N of 0".
  const total = computed(() => {
    const res = response.value
    const paginationAttrs = toValue(props.paginationAttributes)
    return paginationAttrs?.totalCount || res?.total || res?.data?.length || 0
  })

  // Three exit conditions, in priority order:
  //   1. No fetcher, or `hidePagination` explicit → never show.
  //   2. `hidePaginationWhenOptional` + page 1 + cursor pagination → only show if total exceeds
  //      the smallest configured page size.
  //   3. `hidePaginationWhenOptional` + page 1 + offset pagination → show if either neighbor
  //      cursor exists, or the current page is at least full. (We can't trust `total` here:
  //      cursor APIs commonly omit a count, so we fall back to "did we get a full page?")
  //
  // The min-page-size anchor is intentional: pagination must NOT disappear when the user
  // *chooses* a larger page size for a list that has more rows than the smallest size but
  // fewer than the chosen size. Anchoring to `pageSizes[0]` keeps the control visible as
  // soon as the row count justifies any pagination at all.
  const showPagination = computed((): boolean => {
    const fetcherValue = toValue(props.fetcher)
    const hidePaginationValue = toValue(props.hidePagination)
    const paginationAttrs = toValue(props.paginationAttributes)
    const hidePaginationWhenOptionalValue = toValue(props.hidePaginationWhenOptional)

    if (!fetcherValue || hidePaginationValue) {
      return false
    }

    const minPageSize = paginationAttrs?.pageSizes?.[0] ?? DEFAULT_PAGE_SIZE

    if (hidePaginationWhenOptionalValue && page.value === 1) {
      if (!paginationAttrs?.offset) {
        return total.value > minPageSize
      } else {
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

  // Resets all three pagination refs to first-page state. Called from several places
  // (pageSize change, search query change, empty-page-after-delete) — centralized here so
  // the "back to page 1" semantics stay consistent.
  const resetPagination = () => {
    offsets.value = [null]
    offset.value = null
    page.value = 1
  }

  const pageChangeHandler = ({ page: newPage }: { page: number }) => {
    page.value = newPage
  }

  const pageSizeChangeHandler = ({ pageSize: newPageSize }: { pageSize: number }) => {
    resetPagination()
    pageSize.value = newPageSize
  }

  // ⚠️ Regression-prone — both `bd2b2a77c` and `e5a4258b6` patched this block. Read carefully
  // before changing.
  //
  //   - The early return guards cursor-style pagination: those tables don't use the `offsets`
  //     history at all (they read `pagination.hasNextPage` from each response instead).
  //   - We `push` rather than assign to `offsets[page.value]` because each new response
  //     represents the *next* page that was just fetched — we extend the history forward.
  //   - The check is `!offsets.value[page.value]`, NOT `[page.value - 1]`. Following the
  //     indexing convention from `useTablePagination`'s docblock (`offsets[i]` = cursor used
  //     to fetch page `i`, with `offsets[0] = null` for the seeded first page), the cursor
  //     for the page that just arrived lives at index `page.value`. When the user navigates
  //     *backward*, the response watcher fires again but `offsets[page.value]` is already
  //     filled — pushing again would corrupt the history. Off-by-one here breaks any
  //     backward navigation past page 2 (this was the e5a4258b6 fix).
  watch(response, (newResponse) => {
    const paginationAttrs = toValue(props.paginationAttributes)
    if (!paginationAttrs?.offset) return

    const { offset = null } = newResponse?.pagination || {}

    if (!offsets.value[page.value]) {
      offsets.value.push(offset)
    }
  })

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
    resetPagination,
    pageChangeHandler,
    pageSizeChangeHandler,
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

  // The spread-merge (`{...existing, ...new}`) is intentional and load-bearing: callers may
  // emit a *partial* preferences object (e.g. just the column they resized) and we must not
  // wipe other columns' state. Easy to "simplify" into a plain assignment and silently drop
  // every other column's width/visibility.
  const tablePreferencesUpdateHandler = ({ columnWidths: newColumnWidth, columnVisibility: newColumnVisibility }: TablePreferences<ColumnKey>) => {
    tableViewColumnWidths.value = {
      ...tableViewColumnWidths.value,
      ...newColumnWidth,
    }
    tableViewColumnVisibility.value = {
      ...tableViewColumnVisibility.value,
      ...newColumnVisibility,
    }

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

/**
 * Orchestrator. Wires the three sub-composables together, owns the swrv-backed `useRequest`,
 * and gates fetching behind `hasInitialized` so we don't fire one fetch with default params
 * and a second fetch immediately after `initData()` populates the real ones.
 *
 * Public surface (returned object) is consumed by KTableData.vue's template; everything
 * else here is internal coordination.
 */
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

  // Fetch gate. `tableFetcherCacheKey` returns '' (which suppresses `useRequest`) until this
  // flips to true at the end of `initData()`. Without the gate, swrv would fire one fetch
  // with the constructor-time defaults and a second fetch right after `initData()` overwrites
  // page/pageSize/sort/etc — wasted requests and a flicker.
  const hasInitialized = ref(false)
  const tableId = useId()

  const filterQuery = ref(toValue(searchInput) ?? '')
  // ⚠️ Default must be `true`. The flag distinguishes "never fetched" from "between fetches"
  // and flips to `false` after the first `fetchData()` resolves. The original extraction
  // defaulted to `false` and broke that distinction (fixed in `bd2b2a77c`).
  const isInitialFetch = ref(true)
  // Cannot use `ref<Data[number][]>([])` as the items will be inferred incorrectly inside the template.
  const tableData = ref<Array<Data[number]>>([]) as Ref<Array<Data[number]>>

  // The swrv cache key. Two roles in one value:
  //   1. Empty string is a sentinel — `useRequest` does not fire when the key is falsy. We
  //      return '' until `initData()` flips `hasInitialized` (see fetch-gate comment above).
  //   2. When non-empty, the key is composed of three parts so distinct table instances on
  //      the same page don't share a swrv cache entry:
  //        - identifier   : caller-supplied `cacheIdentifier`, or a random `tableId` so
  //                         unidentified tables are still isolated from each other
  //        - params JSON  : serialized `cacheKeyParams` (note: omits sort for client-sort
  //                         tables — see `cacheKeyParams` vs `fetcherParams` below)
  //        - extra suffix : optional `fetcherCacheKey` lets callers force a refetch by
  //                         changing it (e.g. when an out-of-band create/delete happens)
  const tableFetcherCacheKey = computed((): string => {
    if (!toValue(fetcher) || !hasInitialized.value) {
      return ''
    }

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

  // Single fetch entry point. Every refetch — whether triggered by a key change, a manual
  // `revalidate()`, or `debouncedRevalidate()` — funnels through here, which keeps the
  // `isInitialFetch` flag and the fetcher invocation in lockstep.
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
    resetPagination,
    pageChangeHandler,
    pageSizeChangeHandler,
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

  // Asymmetric on purpose — this is a correctness/perf split:
  //
  //   - `fetcherParams` ALWAYS contains sort params. The fetcher needs them: even a
  //     client-sort table may pre-sort on the server for the *initial* page, and a
  //     server-sort table needs them for every request.
  //   - `cacheKeyParams` OMITS sort params under client-sort. The wire response is the same
  //     regardless of sort order under client-sort, so including the sort key in the cache
  //     key would cause every header click to invalidate the cache and refetch identical
  //     data — visible as a loading flicker on every sort.
  const cacheKeyParams = computed(() => ({
    pageSize: pageSize.value,
    page: page.value,
    query: filterQuery.value,
    offset: offset.value,
    ...(toValue(clientSort) ? {} : sortParams.value),
  }))

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
   * One-shot initialization, called by the consumer in `onMounted`. Executes in this order:
   *
   *   1. Merge `defaultFetcherProps` with `initialFetcherParams`. The `??` fallbacks below
   *      treat `undefined` in the merged params as "use default" — a caller passing
   *      `{ page: undefined }` should not blank out the page.
   *   2. If client-sort + an initial sort key is set, run the sort *now* against
   *      `tableData.value`. At this exact moment `tableData` is empty for the typical
   *      fetcher-driven flow — this branch is defensive for callers that pre-seed the
   *      array (some consumers populate it from a different source before mount).
   *   3. If offset-pagination, seed `offset` and push it as `offsets[0]`. This matches
   *      the indexing convention documented on `useTablePagination` — `offsets[i]` is the
   *      cursor for page `i`, and the response watcher relies on `offsets[0]` already
   *      being populated when the first response arrives.
   *   4. Flip `hasInitialized` last. This is the gate release — `tableFetcherCacheKey`
   *      goes non-empty and `useRequest` fires the first fetch.
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

  // Bridges the consumer's `searchInput` prop into `filterQuery`. Two debounce instances:
  //   - `search` (zero delay) — used when the user clears the input. Clearing should feel
  //     instant; debouncing a clear leaves stale results on screen.
  //   - `debouncedSearch` (350ms) — used while the user is typing. Avoids one fetch per
  //     keystroke.
  const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => {
    filterQuery.value = q
  }, 350)
  const search = generateDebouncedSearch(0)

  watch(() => toValue(searchInput) ?? '', (newSearchInput) => {
    if (newSearchInput === '') {
      search(newSearchInput)
    } else {
      debouncedSearch(newSearchInput)
    }
  }, { immediate: true })

  // Search-query change must reset to page 1 — page-N can be empty under a new query, and
  // cursor offsets from the previous query are meaningless.
  watch(filterQuery, (newQuery, oldQuery) => {
    if (newQuery !== oldQuery && page.value !== 1) {
      resetPagination()
    }
  }, { immediate: true })

  // Response → tableData bridge. Three responsibilities, in order:
  //   1. Copy `response.data` into `tableData` (the template binds to `tableData`, not
  //      `response`, so client-sort can mutate it without round-tripping).
  //   2. If we landed on an empty page > 1 (e.g. user just deleted the last row of the
  //      last page), step back to page 1.
  //   3. Fire the deferred initial sort for client-sort tables — see `initialSortHandled`
  //      docblock above. We pass no event emitter since this is a synthetic, internal sort.
  watch(response, (res) => {
    if (!res?.data) {
      return
    }

    tableData.value = [...res.data]

    if (tableData.value.length === 0 && page.value > 1) {
      resetPagination()
    }

    if (toValue(sortable) && !initialSortHandled.value) {
      sortHandler({ sortColumnKey: sortColumnKey.value, prevKey: '', sortColumnOrder: sortColumnOrder.value })
    }
  }, { deep: true, immediate: true })

  // Sync external `tablePreferences` prop changes back into local state. Each branch is
  // truthy-guarded so partial preference objects don't blank out the unmentioned slots.
  // The sort branch fires `sortHandler` directly (no emitter) because this is a state
  // sync, not a user-driven sort event — we don't want to round-trip a `sort` event back
  // out to the parent.
  watch(() => toValue(tablePreferences), (newVal) => {
    pageSize.value = newVal?.pageSize ? newVal.pageSize : pageSize.value
    tableViewColumnWidths.value = newVal?.columnWidths ? newVal.columnWidths : tableViewColumnWidths.value
    tableViewColumnVisibility.value = newVal?.columnVisibility ? newVal.columnVisibility : tableViewColumnVisibility.value
    if ((newVal?.sortColumnKey || newVal?.sortColumnOrder) && (sortColumnKey.value !== newVal.sortColumnKey || sortColumnOrder.value !== newVal.sortColumnOrder)) {
      sortHandler({
        sortColumnKey: newVal.sortColumnKey!,
        prevKey: sortColumnKey.value,
        sortColumnOrder: newVal.sortColumnOrder!,
      })
    }
  })

  onMounted(() => {
    initData()
  })


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
    resetPagination,
    pageChangeHandler,
    pageSizeChangeHandler,

    // preferences props
    tableViewColumnVisibility,
    tableViewColumnWidths,
    tableDataPreferences,
    tablePreferencesUpdateHandler,
  }
}
