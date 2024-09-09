<template>
  <div class="k-table">
    <div
      v-if="hasToolbarSlot"
      class="table-toolbar"
      data-testid="table-toolbar"
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
      <ColumnVisibilityMenu
        v-if="hasColumnVisibilityMenu"
        :columns="visibilityColumns"
        :disabled="isTableLoading || loading || !data || !data.length"
        :table-id="tableId"
        :visibility-preferences="visibilityPreferences"
        @update="(columnMap: Record<string, boolean>) => columnVisibility = columnMap"
      />
    </div>

    <KSkeleton
      v-if="(isTableLoading || loading || isRevalidating) && !error"
      data-testid="table-skeleton"
      type="table"
    />

    <div
      v-else-if="error"
      class="table-error-state"
      data-testid="table-error-state"
    >
      <slot name="error-state">
        <KEmptyState
          icon-variant="error"
          :message="errorStateMessage"
          :title="errorStateTitle"
        >
          <template
            v-if="!!errorStateActionMessage"
            #action
          >
            <KButton
              :data-testid="getTestIdString(errorStateActionMessage)"
              :to="errorStateActionRoute ? errorStateActionRoute : undefined"
              @click="$emit('error-action-click')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!error && (!isTableLoading && !loading && !isRevalidating) && (data && !data.length)"
      class="table-empty-state"
      data-testid="table-empty-state"
    >
      <slot name="empty-state">
        <KEmptyState
          :icon-variant="emptyStateIconVariant"
          :message="emptyStateMessage"
          :title="emptyStateTitle"
        >
          <template
            v-if="!!emptyStateActionMessage"
            #action
          >
            <KButton
              :appearance="searchInput ? 'tertiary' : 'primary'"
              :data-testid="getTestIdString(emptyStateActionMessage)"
              :to="emptyStateActionRoute ? emptyStateActionRoute : undefined"
              @click="$emit('empty-state-action-click')"
            >
              <slot name="empty-state-action-icon" />
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div v-else>
      <div
        class="table-wrapper"
        :style="tableWrapperStyles"
        @scroll.passive="scrollHandler"
      >
        <table
          v-bind-once="{ 'data-tableid': tableId }"
          class="table"
          :class="{
            'has-hover': rowHover,
            'is-clickable': isClickable
          }"
        >
          <thead :class="{ 'is-scrolled': isScrolled }">
            <tr
              ref="headerRow"
              :class="{ 'is-scrolled': isScrolled }"
            >
              <th
                v-for="(column, index) in visibleHeaders"
                :key="`table-${tableId}-headers-${index}`"
                :aria-sort="sortable && column.key === sortColumnKey ? (sortColumnOrder === 'asc' ? 'ascending' : 'descending') : undefined"
                class="table-headers"
                :class="getHeaderClasses(column, index)"
                :data-testid="`table-header-${column.key}`"
                :style="columnStyles[column.key]"
                @click="() => {
                  if (sortable && column.sortable) {
                    $emit('sort', {
                      prevKey: sortColumnKey,
                      sortColumnKey: column.key,
                      sortColumnOrder: sortColumnOrder === 'asc' ? 'desc' : 'asc' // display opposite because sortColumnOrder outdated
                    })
                    sortClickHandler(column)
                  }
                }"
                @mouseleave="currentHoveredColumn = ''"
                @mouseover="currentHoveredColumn = column.key"
              >
                <div
                  v-if="resizeColumns && index !== 0"
                  class="resize-handle previous"
                  @click.stop
                  @mousedown="startResize($event, visibleHeaders[index - 1].key)"
                  @mouseleave="resizerHoveredColumn = ''"
                  @mouseover="resizerHoveredColumn = visibleHeaders[index - 1].key"
                />

                <div
                  :aria-describedby="column.tooltip || $slots[getColumnTooltipSlotName(column.key)] ? `${getColumnTooltipSlotName(column.key)}-${tableId}` : undefined"
                  class="table-headers-container"
                  :class="{ 'resized': resizingColumn === column.key }"
                >
                  <slot
                    :column="getGeneric(column)"
                    :name="getColumnSlotName(column.key)"
                  >
                    <span
                      class="table-header-label"
                      :class="{
                        'sr-only': column.hideLabel,
                      }"
                    >
                      {{ column.label ? column.label : column.key }}
                    </span>
                  </slot>

                  <KTooltip
                    v-if="column.tooltip || $slots[getColumnTooltipSlotName(column.key)]"
                    :data-testid="getColumnTooltipSlotName(column.key)"
                    :tooltip-id="`${getColumnTooltipSlotName(column.key)}-${tableId}`"
                  >
                    <InfoIcon
                      class="header-tooltip-trigger"
                      :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                      :size="KUI_ICON_SIZE_30"
                    />

                    <template #content>
                      <slot
                        :column="getGeneric(column)"
                        :name="getColumnTooltipSlotName(column.key)"
                      >
                        {{ column.tooltip }}
                      </slot>
                    </template>
                  </KTooltip>

                  <ArrowDownIcon
                    v-if="sortable && !column.hideLabel && column.sortable"
                    class="sort-icon"
                    :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                    :size="KUI_ICON_SIZE_30"
                  />
                </div>

                <div
                  v-if="resizeColumns && index !== visibleHeaders.length - 1"
                  class="resize-handle"
                  @click.stop
                  @mousedown="startResize($event, column.key)"
                  @mouseleave="resizerHoveredColumn = ''"
                  @mouseover="resizerHoveredColumn = column.key"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(row, rowIndex) in data"
              v-bind="rowAttrs(row)"
              :key="`table-${tableId}-row-${rowIndex}`"
              :role="isClickable ? 'link' : null"
              :tabindex="isClickable ? 0 : null"
            >
              <td
                v-for="(header, index) in visibleHeaders"
                v-bind="cellAttrs({ headerKey: header.key, row, rowIndex, colIndex: index })"
                :key="`table-${tableId}-cell-${index}`"
                :class="{
                  'resize-hover': resizeColumns && resizeHoverColumn === header.key && index !== visibleHeaders.length - 1,
                }"
                :style="columnStyles[header.key]"
                v-on="tdlisteners(row[header.key], row)"
              >
                <slot
                  :name="header.key"
                  :row="getGeneric(row)"
                  :row-key="rowIndex"
                  :row-value="row[header.key]"
                >
                  {{ row[header.key] }}
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <KPagination
        v-if="shouldShowPagination"
        class="table-pagination"
        :current-page="page"
        data-testid="table-pagination"
        :disable-page-jump="disablePaginationPageJump"
        :initial-page-size="pageSize"
        :neighbors="paginationNeighbors"
        :offset="paginationOffset"
        :offset-next-button-disabled="!nextOffset || !hasNextPage"
        :offset-previous-button-disabled="!previousOffset"
        :page-sizes="paginationPageSizes"
        :total-count="total"
        @get-next-offset="getNextOffsetHandler"
        @get-previous-offset="getPrevOffsetHandler"
        @page-change="pageChangeHandler"
        @page-size-change="pageSizeChangeHandler"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, watch, computed, onMounted, useAttrs, useSlots } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KPagination from '@/components/KPagination/KPagination.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { InfoIcon, ArrowDownIcon } from '@kong/icons'
import useUtilities from '@/composables/useUtilities'
import type {
  TablePreferences,
  TableHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  SwrvState,
  SwrvStateData,
  TableState,
  PageChangeData,
  PageSizeChangeData,
  SortColumnOrder,
  TableSortPayload,
  TableStatePayload,
  EmptyStateIconVariant,
} from '@/types'
import { EmptyStateIconVariants } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import ColumnVisibilityMenu from './ColumnVisibilityMenu.vue'
import useUniqueId from '@/composables/useUniqueId'

const { useDebounce, useRequest, useSwrvState, clientSideSorter: defaultClientSideSorter, getSizeFromString } = useUtilities()

const props = defineProps({
  /**
   * Allow columns to be resized
   */
  resizeColumns: {
    type: Boolean,
    default: false,
  },
  /**
   * Used to customize the initial state of the table.
   * Column visibility/width.
   */
  tablePreferences: {
    type: Object as PropType<TablePreferences>,
    default: () => ({}),
  },
  /**
   * Enable client side sort - only do this if using a fetcher
   * that returns static data
   */
  clientSort: {
    type: Boolean,
    default: false,
  },
  /**
   * Enables hover highlighting to table rows
   */
  rowHover: {
    type: Boolean,
    default: true,
  },
  sortHandlerFunction: {
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
   * A function that conditionally specifies cell attributes
   */
  cellAttrs: {
    type: Function,
    default: () => ({}),
  },
  /**
   * A prop that enables a loading skeleton
   */
  loading: {
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
    type: [Object, String],
    default: '',
  },
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionMessage: {
    type: String,
    default: '',
  },
  emptyStateIconVariant: {
    type: String as PropType<EmptyStateIconVariant>,
    default: EmptyStateIconVariants.Default,
  },
  /**
   * A prop that enables the error state
   */
  error: {
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
    type: [Object, String],
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
  sortable: {
    type: Boolean,
    default: true,
  },
  disablePagination: {
    type: Boolean,
    default: false,
  },
  paginationOffset: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass to hide pagination for total table records is less than or equal to pagesize
   */
  hidePaginationWhenOptional: {
    type: Boolean,
    default: false,
  },
  maxHeight: {
    type: String,
    default: 'none',
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

const attrs = useAttrs()
const slots = useSlots()

const tableId = useUniqueId()
const defaultFetcherProps = {
  pageSize: 15,
  page: 1,
  query: '',
  sortColumnKey: '',
  sortColumnOrder: 'desc',
  offset: null,
}
const data = ref<Record<string, any>[]>([])
const headerRow = ref<HTMLDivElement>()
// all headers
const tableHeaders = ref<TableHeader[]>([])
// currently visible headers
const visibleHeaders = ref<TableHeader[]>([])
// highest priority - column currently being resized (mouse may be completely outside the column)
const resizingColumn = ref('')
// column the user is currently hovering over the resize handle for (may be hovered on the adjacent column to what we want to resize)
const resizerHoveredColumn = ref('')
// lowest priority - currently hovered resizable column (mouse is somewhere in the <th>)
const currentHoveredColumn = ref('')
const hasHidableColumns = computed((): boolean => tableHeaders.value.filter((header: TableHeader) => header.hidable).length > 0)
const hasColumnVisibilityMenu = computed((): boolean => !!(!props.error && hasHidableColumns.value))
// columns whose visibility can be toggled
const visibilityColumns = computed((): TableHeader[] => tableHeaders.value.filter((header: TableHeader) => header.hidable))
// visibility preferences from the host app (initialized by app)
const visibilityPreferences = computed((): Record<string, boolean> => hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})
// current column visibility state
const columnVisibility = ref<Record<string, boolean>>(hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})
const total = ref(0)
const isScrolled = ref(false)
const page = ref(1)
const pageSize = ref(15)
const filterQuery = ref('')
const sortColumnKey = ref('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const offset: Ref<string | null> = ref(null)
const offsets: Ref<Array<any>> = ref([])
const hasNextPage = ref(true)
const isClickable = ref(false)
const hasInitialized = ref(false)
const hasToolbarSlot = computed((): boolean => !!slots.toolbar || hasColumnVisibilityMenu.value)
const tableWrapperStyles = computed((): Record<string, string> => ({
  maxHeight: getSizeFromString(props.maxHeight),
}))

/**
 * Utilize a helper function to generate the column slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} columnKey The column.key
 */
const getColumnSlotName = (columnKey: string): TableColumnSlotName => {
  return `column-${columnKey}`
}

/**
 * Utilize a helper function to generate the column tooltip slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} columnKey The column.key
 */
const getColumnTooltipSlotName = (columnKey: string): TableColumnTooltipSlotName => {
  return `tooltip-${columnKey}`
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
    const ignoredElements = ['a', 'button', 'label', 'input', 'select']

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
        if (e.target.closest('.popover-content') !== null) {
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

const columnWidths = ref<Record<string, number>>(props.resizeColumns ? props.tablePreferences.columnWidths || {} : {})
const columnStyles = computed(() => {
  const styles: Record<string, any> = {}
  for (const colKey in columnWidths.value) {
    // no width set
    if (!columnWidths.value[colKey]) {
      continue
    }
    const width = columnWidths.value[colKey] + 'px'
    styles[colKey] = {
      width,
      maxWidth: width,
      minWidth: width,
    }
  }
  return styles
})

const getHeaderClasses = (column: TableHeader, index: number): Record<string, boolean> => {
  return {
    // display the resize handle on the right side of the column if resizeColumns is enabled, hovering current column, and not the last column
    'resize-hover': resizeHoverColumn.value === column.key && props.resizeColumns && index !== visibleHeaders.value.length - 1,
    resizable: props.resizeColumns,
    // display sort control if column is sortable, label is visible, and sorting is not disabled
    sortable: props.sortable && !column.hideLabel && !!column.sortable,
    // display active sorting styles if column is currently sorted
    'active-sort': props.sortable && !column.hideLabel && !!column.sortable && column.key === sortColumnKey.value,
    [sortColumnOrder.value]: props.sortable && column.key === sortColumnKey.value && !column.hideLabel,
    'is-scrolled': isScrolled.value,
    'has-tooltip': !!column.tooltip,
  }
}

/**
 * We have to track the state of all three hover events because
 * they have differing priorities that can have clashing styles.
 */
const resizerHoverState = computed((): string => {
  if (resizingColumn.value) {
    // highest priority - resize event in progress, mouse may be completely outside of the column
    return 'resizing'
  } else if (resizerHoveredColumn.value) {
    // hovered over a column resize handle (may need to trigger styles on the adjacent column instead of the current)
    return 'resize-hover'
  } else if (currentHoveredColumn.value) {
    // lowest priority - hovered somewhere in the <th> of a resizable column
    return 'th-hover'
  }

  return ''
})

const resizeHoverColumn = computed((): string => {
  switch (resizerHoverState.value) {
    case 'resizing':
      return resizingColumn.value
    case 'resize-hover':
      return resizerHoveredColumn.value
    case 'th-hover':
      return currentHoveredColumn.value
    default:
      return ''
  }
})

// get the resizable header divs to be used for the resize observers
// eslint-disable-next-line no-undef
const headerElems = computed((): NodeListOf<Element> | undefined => headerRow.value?.querySelectorAll('th.resizable'))
const headerHeight = computed((): string => {
  const elem = headerElems.value?.item(0)
  if (elem) {
    const styles = window?.getComputedStyle(elem)
    if (styles?.height) {
      return `${parseInt(styles.height, 10)}px`
    }
  }
  return 'auto'
})

const startResize = (evt: MouseEvent, colKey: string) => {
  // right clicks should be ignored
  if (evt.button !== 0) {
    return
  }

  let x = 0
  let width = 0

  resizingColumn.value = colKey

  // get the current column's element
  let col: HTMLElement | null = null
  headerElems.value?.forEach((elem) => {
    if (elem.getAttribute('data-testid') === `table-header-${colKey}`) {
      col = document?.querySelector(`[data-tableid="${tableId}"] [data-testid="table-header-${colKey}"]`)
    }
  })

  // resize in progress
  const mouseMoveHandler = (e: MouseEvent): void => {
    // distance mouse has moved
    const dx = e.clientX - x

    // Update column width to match
    col?.setAttribute('style', `width: ${width + dx}px`)
    columnWidths.value[colKey] = width + dx
  }

  // done resizing
  const mouseUpHandler = (): void => {
    resizingColumn.value = ''
    document?.removeEventListener('mousemove', mouseMoveHandler)
    document?.removeEventListener('mouseup', mouseUpHandler)
    emitTablePreferences()
  }

  // get mouse position
  x = evt.clientX

  if (col) {
    // set current column's width
    const styles = window?.getComputedStyle(col)
    if (styles?.width) {
      width = parseInt(styles.width, 10)
    }

    // event listeners for resizing
    document?.addEventListener('mousemove', mouseMoveHandler)
    document?.addEventListener('mouseup', mouseUpHandler)
  }
}

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

  if (props.paginationOffset) {
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
  if (data.value.length === 0 && page.value > 1) {
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
    defaultClientSideSorter(sortColumnKey.value, '', sortColumnOrder.value, data.value)
  }

  if (props.paginationOffset) {
    offset.value = fetcherParams.offset
    offsets.value.push(fetcherParams.offset)
  }

  // get table headers
  if (props.headers && props.headers.length) {
    tableHeaders.value = props.headers
  }

  // trigger setting of tableFetcherCacheKey
  hasInitialized.value = true
}

// Ensure `props.headers` are reactive.
watch(() => props.headers, (newVal: TableHeader[]) => {
  if (newVal && newVal.length) {
    tableHeaders.value = newVal
  }
}, { deep: true })

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

const sortClickHandler = (header: TableHeader): void => {
  const { key, useSortHandlerFunction } = header
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
      offsets.value = [null]
    }
  } else {
    sortColumnKey.value = key
    sortColumnOrder.value = 'asc'
    offsets.value = [null]
  }

  if (props.clientSort) {
    if (useSortHandlerFunction && props.sortHandlerFunction) {
      props.sortHandlerFunction({
        key,
        prevKey,
        sortColumnOrder: sortColumnOrder.value,
        data: data.value,
      })
    } else {
      defaultClientSideSorter(key, prevKey, sortColumnOrder.value, data.value)
    }
  } else if (!props.paginationOffset) {
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

const scrollHandler = (event: any): void => {
  if (event && event.target && typeof event.target.scrollTop === 'number') {
    if (event.target.scrollTop > 1) {
      isScrolled.value = true
    } else if (event.target.scrollTop === 0) {
      isScrolled.value = !isScrolled.value
    }
  }
}

// Store the tablePreferences in a computed property to utilize in the watcher
const tablePreferences = computed((): TablePreferences => ({
  pageSize: pageSize.value,
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value as 'asc' | 'desc',
  ...(props.resizeColumns ? { columnWidths: columnWidths.value } : {}),
  ...(hasHidableColumns.value ? { columnVisibility: columnVisibility.value } : {}),
}))

const emitTablePreferences = (): void => {
  if (tableState.value === 'success') {
    emit('update:table-preferences', tablePreferences.value)
  }
}

const getNextOffsetHandler = (): void => {
  page.value++
  offset.value = nextOffset.value
}

const getPrevOffsetHandler = (): void => {
  page.value--
  offset.value = previousOffset.value
}

// fetcher must be defined, disablePagination must be false
// if using standard pagination with hidePaginationWhenOptional
//  - hide if total <= min pagesize
// if using offset-based pagination with hidePaginationWhenOptional
//  - hide if neither previous/next offset exists and current data set count is < min pagesize
const shouldShowPagination = computed((): boolean => {
  return !!(props.fetcher && !props.disablePagination &&
        !(!props.paginationOffset && props.hidePaginationWhenOptional && total.value <= props.paginationPageSizes[0]) &&
        !(props.paginationOffset && props.hidePaginationWhenOptional && !previousOffset.value && !nextOffset.value && data.value.length < props.paginationPageSizes[0]))
})

const getTestIdString = (message: string): string => {
  const msg = message.toLowerCase().replace(/[^[a-z0-9]/gi, '-')

  return msg
}

watch([columnVisibility, tableHeaders], (newVals) => {
  const newVisibility = newVals[0]
  const newHeaders = newVals[1]
  const newVisibleHeaders = newHeaders.filter((header: TableHeader) => newVisibility[header.key] !== false)

  if (JSON.stringify(newVisibleHeaders) !== JSON.stringify(visibleHeaders.value)) {
    visibleHeaders.value = newVisibleHeaders
    emitTablePreferences()
  }
}, { deep: true, immediate: true })

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

// because hasColumnVisibilityMenu also accounts for error state, we need to watch it
watch(hasColumnVisibilityMenu, (newVal) => {
  if (newVal) {
    columnVisibility.value = props.tablePreferences.columnVisibility || {}
  }
}, { immediate: true })

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.k-table {
  @include table;

  table {
    thead {
      tr {
        .resize-handle {
          height: v-bind('headerHeight');
        }
      }
    }
  }
}
</style>
