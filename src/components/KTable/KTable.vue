<template>
  <div class="k-table-container">
    <div
      v-if="hasToolbarSlot"
      class="k-table-toolbar"
      data-testid="k-table-toolbar"
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
    </div>

    <KSkeleton
      v-if="(!testMode || testMode === 'loading') && (isTableLoading || isLoading || isRevalidating) && !hasError"
      data-testid="k-table-skeleton"
      type="table"
    />

    <div
      v-else-if="hasError"
      class="k-table-error-state"
      data-testid="k-table-error-state"
    >
      <slot name="error-state">
        <KEmptyState
          :cta-is-hidden="!errorStateActionMessage || !errorStateActionRoute"
          :icon="errorStateIcon || ''"
          :icon-color="errorStateIconColor"
          :icon-size="errorStateIconSize"
          is-error
        >
          <template #title>
            {{ errorStateTitle }}
          </template>

          <template #message>
            {{ errorStateMessage }}
          </template>

          <template #cta>
            <KButton
              v-if="errorStateActionMessage"
              appearance="primary"
              :data-testid="getTestIdString(errorStateActionMessage)"
              :to="errorStateActionRoute ? errorStateActionRoute : undefined"
              @click="$emit('ktable-error-cta-clicked')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!hasError && (!isTableLoading && !isLoading && !isRevalidating) && (data && !data.length)"
      class="k-table-empty-state"
      data-testid="k-table-empty-state"
    >
      <slot name="empty-state">
        <KEmptyState
          :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
          :icon="emptyStateIcon || ''"
          :icon-color="emptyStateIconColor"
          :icon-size="emptyStateIconSize"
        >
          <template #title>
            {{ emptyStateTitle }}
          </template>

          <template #message>
            {{ emptyStateMessage }}
          </template>

          <template #cta>
            <KButton
              v-if="emptyStateActionMessage"
              :appearance="searchInput ? 'btn-link' : 'primary'"
              :data-testid="getTestIdString(emptyStateActionMessage)"
              :icon="emptyStateActionButtonIcon"
              :to="emptyStateActionRoute ? emptyStateActionRoute : undefined"
              @click="$emit('ktable-empty-state-cta-clicked')"
            >
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <section
      v-else
      class="k-table-wrapper"
      @scroll.passive="scrollHandler"
    >
      <table
        class="k-table"
        :class="{'has-hover': hasHover, 'is-clickable': isClickable, 'side-border': hasSideBorder}"
        :data-tableid="tableId"
      >
        <thead :class="{ 'is-scrolled': isScrolled }">
          <tr :class="{ 'is-scrolled': isScrolled }">
            <th
              v-for="(column, index) in tableHeaders"
              :key="`k-table-${tableId}-headers-${index}`"
              :aria-sort="!disableSorting && column.key === sortColumnKey ? (sortColumnOrder === 'asc' ? 'ascending' : 'descending') : undefined"
              class="k-table-headers"
              :class="{
                'sortable': !disableSorting && !column.hideLabel && column.sortable,
                'active-sort': !disableSorting && !column.hideLabel && column.sortable && column.key === sortColumnKey,
                [sortColumnOrder]: !disableSorting && column.key === sortColumnKey && !column.hideLabel,
                'is-scrolled': isScrolled
              }"
              @click="() => {
                if (!disableSorting && column.sortable) {
                  $emit('sort', {
                    prevKey: sortColumnKey,
                    sortColumnKey: column.key,
                    sortColumnOrder: sortColumnOrder === 'asc' ? 'desc' : 'asc' // display opposite because sortColumnOrder outdated
                  })
                  sortClickHandler(column)
                }
              }"
            >
              <span class="k-table-headers-container">
                <slot
                  :column="getGeneric(column)"
                  :name="getColumnSlotName(column.key)"
                >
                  <span :class="{'sr-only': column.hideLabel}">
                    {{ column.label ? column.label : column.key }}
                  </span>
                </slot>

                <KIcon
                  v-if="!disableSorting && !column.hideLabel && column.sortable"
                  aria-hidden="true"
                  class="caret"
                  :color="`var(--KTableColor, var(--black-70, var(--kui-color-text, ${KUI_COLOR_TEXT})))`"
                  icon="chevronDown"
                  :size="KUI_ICON_SIZE_20"
                />
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            v-bind="rowAttrs(row)"
            :key="`k-table-${tableId}-row-${rowIndex}`"
            :role="isClickable ? 'link' : null"
            :tabindex="isClickable ? 0 : null"
            v-on="hasSideBorder ? tdlisteners(row, row) : {}"
          >
            <td
              v-for="(value, index) in tableHeaders"
              v-bind="cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index })"
              :key="`k-table-${tableId}-cell-${index}`"
              v-on="tdlisteners(row[value.key], row)"
            >
              <slot
                :name="value.key"
                :row="getGeneric(row)"
                :row-key="rowIndex"
                :row-value="row[value.key]"
              >
                {{ row[value.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>

      <KPagination
        v-if="shouldShowPagination"
        class="k-table-pagination"
        :current-page="page"
        data-testid="k-table-pagination"
        :disable-page-jump="disablePaginationPageJump"
        :initial-page-size="pageSize"
        :neighbors="paginationNeighbors"
        :offset-next-button-disabled="!offset"
        :offset-prev-button-disabled="!previousOffset"
        :page-sizes="paginationPageSizes"
        :pagination-type="paginationType"
        :test-mode="!!testMode || undefined"
        :total-count="total"
        @get-next-offset="getNextOffsetHandler"
        @get-prev-offset="getPrevOffsetHandler"
        @page-changed="pageChangeHandler"
        @page-size-changed="pageSizeChangeHandler"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed, onMounted, PropType, useAttrs, useSlots } from 'vue'
import { v1 as uuidv1 } from 'uuid'
import KButton from '@/components/KButton/KButton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KPagination from '@/components/KPagination/KPagination.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import useUtilities from '@/composables/useUtilities'
import type {
  TablePreferences,
  TablePaginationType,
  TableHeader,
  TableColumnSlotName,
  SwrvState,
  SwrvStateData,
  TableState,
  PageChangedData,
  PageSizeChangedData,
  SortColumnOrder,
  TableOptions,
  TableSortOrder,
  TableSortPayload, TableStatePayload,
  TableTestMode,
} from '@/types'
import {
  TablePaginationTypeArray,
  TableSortOrderArray,
  TableTestModeArray,
} from '@/types'
import { RouteLocationRaw } from 'vue-router'
import { KUI_COLOR_TEXT, KUI_ICON_SIZE_20 } from '@kong/design-tokens'

const { useDebounce, useRequest, useSwrvState } = useUtilities()

const props = defineProps({
  /**
   * @deprecated in favor of the "fetcher" prop
   * Object containing data which creates rows and columns.
   * @param {Object} options - Options to initialize the component with
   * @param {Array} options.headers - Array of Objects defining Table Headers
   * @param {Array} options.data - Array of Objects defining column data
   */
  options: {
    type: Object as PropType<TableOptions>,
    default: () => null,
    required: false,
  },
  /**
   * Enable client side sort - only do this if using a fetcher
   * that returns static data
   */
  enableClientSort: {
    type: Boolean,
    default: false,
  },
  /**
   * Enables hover highlighting to table rows
   */
  hasHover: {
    type: Boolean,
    default: true,
  },
  /**
   * @deprecated
   * the sort order for the table.
   */
  sortOrder: {
    type: String as PropType<TableSortOrder>,
    default: '',
    validator: (value: TableSortOrder): boolean => TableSortOrderArray.includes(value),
  },
  /**
   * @deprecated
   * the key of the column that's currently being sorted
   */
  sortKey: {
    type: String,
    default: '',
  },
  sortHandlerFn: {
    type: Function,
    default: () => ({}),
  },
  /**
   * A function that conditionally specifies row attributes on each row
   */
  rowAttrs: {
    type: Function,
    default: () => ({}),
  },
  /**
   * A prop that enables a side border with a themable color to it.
   */
  hasSideBorder: {
    type: Boolean,
    default: false,
  },
  /**
   * A function that conditionally specifies cell attributes
   */
  cellAttrs: {
    type: Function,
    default: () => ({}),
  },
  /**
   * A prop that enables a loading skeleton
   */
  isLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass in a custom empty state title
   */
  emptyStateTitle: {
    type: String,
    default: 'No Data',
  },
  /**
   * A prop to pass in a custom empty state message
   */
  emptyStateMessage: {
    type: String,
    default: 'There is no data to display.',
  },
  /**
   * A prop to pass in a custom empty state action route
   */
  emptyStateActionRoute: {
    type: [Object, String] as PropType<string | RouteLocationRaw>,
    default: '',
  },
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionMessage: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionButtonIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom empty state icon
   */
  emptyStateIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a color for the empty state icon
   */
  emptyStateIconColor: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a size for the empty state icon
   */
  emptyStateIconSize: {
    type: String,
    default: '50',
  },
  /**
   * A prop that enables the error state
   */
  hasError: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass in a custom error state title
   */
  errorStateTitle: {
    type: String,
    default: 'An error occurred',
  },
  /**
   * A prop to pass in a custom error state message
   */
  errorStateMessage: {
    type: String,
    default: 'Data cannot be displayed due to an error.',
  },
  /**
   * A prop to pass in a custom error state action route
   */
  errorStateActionRoute: {
    type: [Object, String] as PropType<string | RouteLocationRaw>,
    default: '',
  },
  /**
   * A prop to pass in a custom error state action message
   */
  errorStateActionMessage: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom error state icon
   */
  errorStateIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a color for the error state icon
   */
  errorStateIconColor: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a size for the error state icon
   */
  errorStateIconSize: {
    type: String,
    default: '50',
  },
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
   * A prop to pass in an array of headers for the table
   */
  headers: {
    type: Array as PropType<TableHeader[]>,
    default: () => [],
  },
  /**
   * A prop to pass in an object of intial params for the initial fetcher function call
   */
  initialFetcherParams: {
    type: Object,
    default: null,
  },
  /**
   * A prop to pass in the number of pagination neighbors used by the pagination component
   */
  paginationNeighbors: {
    type: Number,
    default: 1,
  },
  /**
   * A prop to pass in an array of page sizes used by the pagination component
   */
  paginationPageSizes: {
    type: Array as PropType<number[]>,
    default: () => ([15, 30, 50, 75, 100]),
    validator: (pageSizes: number[]): boolean => !!pageSizes.length && pageSizes.every(i => typeof i === 'number'),
  },
  /**
   * A prop to pass the total number of items in the set for the pagination text
   */
  paginationTotalItems: {
    type: Number,
    default: null,
  },
  disablePaginationPageJump: {
    type: Boolean,
    default: false,
  },
  disableSorting: {
    type: Boolean,
    default: false,
  },
  disablePagination: {
    type: Boolean,
    default: false,
  },
  paginationType: {
    type: String as PropType<TablePaginationType>,
    default: 'default',
    validator: (type: TablePaginationType) => TablePaginationTypeArray.includes(type),
  },
  /**
   * A prop to pass to hide pagination for total table records is less than or equal to pagesize
   */
  hidePaginationWhenOptional: {
    type: Boolean,
    default: false,
  },
  /**
   * for testing only, strips out generated ids and avoid loading state in tests.
   * 'true' - no id's no loading
   * 'loading' - no id's but allow loading
   */
  testMode: {
    type: String as PropType<TableTestMode>,
    default: undefined,
    validator: (val: TableTestMode): boolean => TableTestModeArray.includes(val),
  },
})

const emit = defineEmits<{
  (e: 'cell-click', value: { data: any }): void
  (e: 'row-click', value: { data: any }): void
  (e: 'ktable-error-cta-clicked'): void
  (e: 'ktable-empty-state-cta-clicked'): void
  (e: 'update:table-preferences', preferences: TablePreferences): void
  (e: 'sort', value: TableSortPayload): void
  (e: 'state', value: TableStatePayload): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const tableId = computed((): string => props.testMode ? 'test-table-id-1234' : uuidv1())
const defaultFetcherProps = {
  pageSize: 15,
  page: 1,
  query: '',
  sortColumnKey: '',
  sortColumnOrder: 'desc' as SortColumnOrder,
  offset: null,
}
const data = ref<Record<string, any>[]>([])
const tableHeaders: Ref<TableHeader[]> = ref([])
const total = ref(0)
const isScrolled = ref(false)
const page = ref(1)
const pageSize = ref(15)
const filterQuery = ref('')
const sortColumnKey = ref('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const offset: Ref<string | null> = ref(null)
const offsets: Ref<Array<any>> = ref([])
const isClickable = ref(false)
const hasInitialized = ref(false)
const nextPageClicked = ref(false)
const hasToolbarSlot = computed((): boolean => !!slots.toolbar)

/**
 * Utilize a helper function to generate the column slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} columnKey The column.key
 */
const getColumnSlotName = (columnKey: string): TableColumnSlotName => {
  return `column-${columnKey}`
}

/**
 * To avoid requiring the consuming app to typecast if they want to use `row` or `column`
 * we strip the types to something generic before we put it in the slot for use.
 * @param obj The object to strip the type from
 */
const getGeneric = (obj: Record<string, any>): any => {
  return obj as unknown as any
}

/**
 * Grabs listeners from attrs matching a prefix to attach the
 * event that is dynamic. e.g. `v-on:cell:click`, `@row:focus` etc.
 * @param {String} prefix - event listener prefix e.g. `row:`, `cell:`
 * @param {any} attrs - attrs on the vue instance to pluck from
 * @returns {Function} - returns a function that can pass an entity to the
                         listener callback function.
*/
const pluckListeners = (prefix: any, attrs: any): any => {
  return (entity: any, type: any) => {
    const onRE = /^on[^a-z]/
    const listeners = {} as any

    for (const property in attrs) {
      if (onRE.test(property) && !!attrs[property]) {
        listeners[property] = attrs[property]
      }
    }

    return Object.keys(listeners).reduce((acc: any, curr) => {
      if (curr.indexOf(prefix) === 0) {
        const parts = curr.split(prefix)
        acc[parts[1]] = (e: any) => listeners[curr](e, entity, type)
      }
      return acc
    }, {})
  }
}

const tdlisteners = computed((): any => {
  return (entity: any, rowData: any) => {
    const rowListeners = pluckListeners('onRow:', attrs)(rowData, 'row')
    const cellListeners = pluckListeners('onCell:', attrs)(entity, 'cell')
    const ignoredElements = ['a', 'button', 'input', 'select']

    if (rowListeners.click) {
      isClickable.value = true
    }

    return {
      ...rowListeners,
      ...cellListeners,
      click(e: any) {
        const targetClasses = e.target.className
        let isIgnored = ignoredElements.includes(e.target.tagName.toLowerCase())
        let isPopoverContent = false

        // check for popover class
        if (typeof targetClasses === 'string' || Array.isArray(targetClasses)) {
          isPopoverContent = targetClasses.includes('k-popover')
        } else if (typeof targetClasses === 'object') {
          isPopoverContent = Object.keys(targetClasses).includes('k-popover')
        }

        // check parent for popover class
        if (e.target.closest('.k-popover-content') !== null) {
          isPopoverContent = true
        }

        // check parent of target is not an ignored elem
        for (let i = 0; i < ignoredElements.length; i++) {
          if (e.target.closest(ignoredElements[i]) !== null) {
            isIgnored = true
            break
          }
        }

        // ignore click if it is from the popover, or is a non-disabled ignored element
        if ((!isIgnored || e.target.hasAttribute('disabled')) &&
                 !isPopoverContent && (rowListeners.click || cellListeners.click)) {
          if (cellListeners.click) {
            emit('cell-click', { data: entity })
            const result = cellListeners.click(e, entity, 'cell')
            if (typeof result === 'function') {
              result(e, entity)
            }
          } else {
            emit('row-click', { data: rowData })
            const result = rowListeners.click(e, rowData, 'row')
            if (typeof result === 'function') {
              result(e, rowData)
            }
          }
        }
      },
    }
  }
})

const isInitialFetch = ref(true)
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
  data.value = res.data as Record<string, any>[]
  total.value = props.paginationTotalItems || res.total || res.data?.length

  // get data
  if (props.fetcher) {
    if (props.enableClientSort && sortColumnKey.value && sortColumnOrder.value) {
      defaultSorter(sortColumnKey.value, '', sortColumnOrder.value, data.value)
    }
  } else if (props.options && props.options.data && props.options.data.length) { // support legacy props
    data.value = props.options.data
    total.value = props.options.data.length
  }

  if (props.paginationType === 'offset') {
    if (!res.pagination?.offset) {
      offset.value = null

      // reset to first page if no pagiantion data is returned unless the "next page" button was clicked
      // this will ensure buttons display the correct state for cases like search
      if (!nextPageClicked.value) {
        page.value = 1
      }
    } else {
      offset.value = res.pagination.offset

      if (!offsets.value[page.value]) {
        offsets.value.push(res.pagination.offset)
      }
    }
  }

  nextPageClicked.value = false
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
  sortColumnOrder.value = fetcherParams.sortColumnOrder ?? defaultFetcherProps.sortColumnOrder

  if (props.paginationType === 'offset') {
    offset.value = fetcherParams.offset
    offsets.value.push(fetcherParams.offset)
  }

  // get table headers
  if (props.headers && props.headers.length) {
    tableHeaders.value = props.headers
  } else if (props.options && props.options.headers && props.options.headers.length) {
    tableHeaders.value = props.options.headers
  }

  // trigger setting of tableFetcherCacheKey
  hasInitialized.value = true
}

const previousOffset = computed((): string | null => offsets.value[page.value - 1])

// once `initData()` finishes, setting tableFetcherCacheKey to non-falsey value triggers fetch of data
const tableFetcherCacheKey = computed((): string => {
  if (!props.fetcher || !hasInitialized.value) {
    return ''
  }

  // Set the default identifier to a random string
  let identifierKey: string = tableId.value
  if (props.cacheIdentifier) {
    identifierKey = props.cacheIdentifier
  }

  if (props.fetcherCacheKey) {
    identifierKey += `-${props.fetcherCacheKey}`
  }

  return `k-table_${identifierKey}`
})

const query = ref('')
const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => { query.value = q }, 350)
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

const sortClickHandler = (header: TableHeader): void => {
  const { key, useSortHandlerFn } = header
  const prevKey = sortColumnKey.value + '' // avoid pass by ref

  page.value = 1

  if (sortColumnKey.value) {
    if (key === sortColumnKey.value) {
      if (sortColumnOrder.value === 'asc') {
        sortColumnOrder.value = 'desc'
      } else {
        sortColumnOrder.value = 'asc'
      }
    } else {
      sortColumnKey.value = key
      sortColumnOrder.value = 'asc'
    }
  } else {
    sortColumnKey.value = key
    sortColumnOrder.value = 'asc'
  }

  // Use deprecated sort function to sort data passed in via
  // the deprecated options.data prop
  if ((props.options && props.options.data) || props.enableClientSort) {
    if (useSortHandlerFn && props.sortHandlerFn) {
      props.sortHandlerFn({
        key,
        prevKey,
        sortColumnOrder: sortColumnOrder.value,
        data: data.value,
      })
    } else {
      defaultSorter(key, prevKey, sortColumnOrder.value, data.value)
    }
  } else if (props.paginationType !== 'offset') {
    debouncedRevalidate()
  }

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

const pageChangeHandler = ({ page: newPage }: PageChangedData) => {
  page.value = newPage
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangedData) => {
  offsets.value = [null]
  offset.value = null
  pageSize.value = newPageSize
  page.value = 1

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

const scrollHandler = (event: any): void => {
  if (event && event.target && event.target.scrollTop) {
    if (event.target.scrollTop > 1) {
      isScrolled.value = true
    } else if (event.target.scrollTop) {
      isScrolled.value = !isScrolled.value
    }
  }
}

// Store the tablePreferences in a computed property to utilize in the watcher
const tablePreferences = computed((): TablePreferences => ({
  pageSize: pageSize.value,
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value as 'asc' | 'desc',
}))

const emitTablePreferences = (): void => {
  emit('update:table-preferences', tablePreferences.value)
}

const getNextOffsetHandler = (): void => {
  page.value++
  nextPageClicked.value = true
}

const getPrevOffsetHandler = (): void => {
  page.value--
  offset.value = previousOffset.value
}

// fetcher must be defined, disablePagination must be false
// if using standard pagination with hidePaginationWhenOptional
//  - hide if total <= min pagesize
// if using offset-based pagination with hidePaginationWhenOptional
//  - hide if neither previous/next offset exists and current data set count is <= min pagesize
const shouldShowPagination = computed((): boolean => {
  return !!(props.fetcher && !props.disablePagination &&
        !(props.paginationType !== 'offset' && props.hidePaginationWhenOptional && total.value <= props.paginationPageSizes[0]) &&
        !(props.paginationType === 'offset' && props.hidePaginationWhenOptional && !previousOffset.value && !offset.value && data.value.length <= props.paginationPageSizes[0]))
})

const getTestIdString = (message: string): string => {
  const msg = message.toLowerCase().replace(/[^[a-z0-9]/gi, '-')

  return msg
}

watch(fetcherData, (fetchedData: any) => {
  if (fetchedData?.length && !data.value.length) {
    data.value = fetchedData
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
    state: newData?.[1],            // newData[tableState]
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

onMounted(() => {
  initData()
})
</script>

<script lang="ts">
const { clientSideSorter } = useUtilities()

/**
 * @deprecated defaultSorter
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export const defaultSorter = (key: string, previousKey: string, sortOrder: string, items: Record<string, any>[]): Record<string, any> => {
  return clientSideSorter(key, previousKey, sortOrder, items)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

.k-table-wrapper {
  overflow: auto;
  width: 100%;
}

.k-table-toolbar {
  margin-bottom: var(--kui-space-80, $kui-space-80) !important;

  & > :deep(*) {
    display: flex;
  }
}

.k-table {
  border-collapse: collapse;
  margin-top: var(--kui-space-0, $kui-space-0);
  max-width: 100%;
  width: 100%;

  th,
  td {
    padding: var(--spacing-sm, var(--kui-space-50, $kui-space-50)) var(--spacing-md, var(--kui-space-60, $kui-space-60));
    vertical-align: middle;
    white-space: nowrap;
  }

  thead {
    background-color: var(--kui-color-background, $kui-color-background);
    border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--KTableBorder, var(--grey-200, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak)));
    height: 60px;
    position: sticky;
    top: var(--kui-space-0, $kui-space-0);

    &.is-scrolled {
      border-bottom: none;
    }

    tr {
      position: relative;

      &:after {
        box-shadow: none;
        content: '';
        height: 100%;
        left: var(--kui-space-0, $kui-space-0);
        opacity: 0;
        // Super-important to allow clicking on table rows in Safari.
        // This allows clicks to pass through the "invisible" :after layer
        pointer-events: none;
        position: absolute;
        transition: opacity $tmp-animation-timing-2 ease-in-out;
        width: 100%;
        z-index: -1;
      }

      &.is-scrolled {
        border-bottom: none;

        &:after {
          box-shadow: $tmp-color-shadow;
          opacity: 1;
          transition: opacity $tmp-animation-timing-2 ease-in-out;
        }
      }
    }

    th {
      font-size: var(--KTableHeaderSize, var(--type-sm, var(--kui-font-size-20, $kui-font-size-20)));
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      padding: var(--spacing-sm, var(--kui-space-50, $kui-space-50)) var(--spacing-md, var(--kui-space-60, $kui-space-60));
      text-align: left;

      &.active-sort {
        color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
      }

      .sr-only {
        border-width: var(--kui-border-width-0, $kui-border-width-0);
        clip: rect(0, 0, 0, 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: var(--kui-space-0, $kui-space-0);
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }

      &.sortable {
        cursor: pointer;
      }

      .k-table-headers-container {
        align-items: center !important;
        display: flex !important;

        .caret {
          margin-left: var(--kui-space-40, $kui-space-40) !important;
        }
      }
    }
  }

  tbody {
    tr {
      height: 44px;

      &:not(:last-of-type) {
        border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--KTableBorder, var(--grey-200, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak)));
      }
    }

    td {
      color: var(--KTableColor, var(--black-70, var(--kui-color-text, $kui-color-text)));
      white-space: nowrap;

      a {
        color: var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary));
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  // Variants
  &.has-hover {
     tbody tr:hover {
      background-color: var(--KTableHover, var(--blue-100, var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest)));
    }
  }

  &.is-clickable {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    tbody tr {
      cursor: pointer;
    }
  }

  &.side-border {
    border-collapse: separate;
    border-spacing: $tmp-border-spacing-0 $tmp-border-spacing-2;

    tbody tr {
      border-bottom: none;
    }

    tbody tr td:first-child {
      border-left: var(--kui-border-width-20, $kui-border-width-20) solid var(--KTableBorder, var(--steel-200, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak)));
    }

    &.has-hover {
      tbody tr:hover td:first-child {
        border-left: var(--kui-border-width-20, $kui-border-width-20) solid var(--KTableBorder, var(--steel-300, $tmp-color-steel-300));
      }
    }
  }

  .k-table-pagination {
    padding: var(--kui-space-20, $kui-space-20) !important;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-table {
  thead {
    th {
      .caret {
        position: relative;
        top: var(--kui-space-10, $kui-space-10);
        transform: rotate(0deg);
      }

      &.sortable {
        &.asc .caret {
          transform: rotate(-180deg);
        }
      }
    }
  }

  tbody {
    td {
      button,
      .k-button {
        margin-bottom: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs, var(--kui-space-40, $kui-space-40))));
        margin-top: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs, var(--kui-space-40, $kui-space-40))));
      }
      .k-table-cell-title {
        color: var(--grey-600, var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger));
        font-size: var(--type-md, var(--kui-font-size-40, $kui-font-size-40));
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      }
      .k-table-cell-description {
        color: var(--grey-500, var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong));
        font-size: var(--type-md, var(--kui-font-size-40, $kui-font-size-40));
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      }
    }
  }
}
</style>
