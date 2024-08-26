<template>
  <div class="k-table-view">
    <div
      v-if="hasToolbarSlot"
      class="table-toolbar"
      data-testid="table-toolbar"
    >
      <slot name="toolbar" />
      <ColumnVisibilityMenu
        v-if="hasColumnVisibilityMenu"
        :columns="visibilityColumns"
        :table-id="tableId"
        :visibility-preferences="visibilityPreferences"
        @update="(columnMap: Record<string, boolean>) => columnVisibility = columnMap"
      />
    </div>

    <KSkeleton
      v-if="loading && !error"
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
              data-testid="error-state-action"
              :to="errorStateActionRoute"
              @click="$emit('error-action-click')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!error && !loading && (data && !data.length)"
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
              :appearance="emptyStateButtonAppearance"
              data-testid="empty-state-action"
              :to="emptyStateActionRoute"
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
            'has-hover': rowHover && !isActionsDropdownHovered,
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
                :aria-sort="column.key === sortColumnKey ? (sortColumnOrder === 'asc' ? 'ascending' : 'descending') : undefined"
                class="table-headers"
                :class="getHeaderClasses(column, index)"
                :data-testid="`table-header-${column.key}`"
                :style="columnStyles[column.key]"
                @click="() => onHeaderClick(column)"
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
                        'sr-only': column.hideLabel || (column.key === TableViewHeaderKeys.ACTIONS && column.hideLabel !== false),
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
                    v-if="!column.hideLabel && column.key !== TableViewHeaderKeys.ACTIONS && column.sortable"
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
              :role="isClickable ? 'link' : undefined"
              :tabindex="isClickable ? 0 : undefined"
            >
              <td
                v-for="(header, index) in visibleHeaders"
                v-bind="cellAttrs({ headerKey: header.key, row, rowIndex, colIndex: index })"
                :key="`table-${tableId}-cell-${index}`"
                :class="{
                  'resize-hover': resizeColumns && resizeHoverColumn === header.key && index !== visibleHeaders.length - 1,
                  'row-link': !!rowLink(row).to,
                }"
                :style="columnStyles[header.key]"
                v-on="tdlisteners(row[header.key], row)"
              >
                <component
                  :is="getRowLinkComponent(row, header.key)"
                  class="cell-wrapper"
                  v-bind="getRowLinkAttrs(row, header.key)"
                >
                  <slot
                    v-if="header.key !== TableViewHeaderKeys.ACTIONS"
                    :name="header.key"
                    :row="getGeneric(row)"
                    :row-key="rowIndex"
                    :row-value="row[header.key]"
                  >
                    {{ row[header.key] }}
                  </slot>

                  <KDropdown
                    v-else
                    class="actions-dropdown"
                    data-testid="actions-dropdown"
                    :kpop-attributes="{ placement: 'bottom-end' }"
                  >
                    <KButton
                      appearance="tertiary"
                      :aria-label="header.label"
                      class="actions-dropdown-trigger"
                      icon
                      size="small"
                      @mouseleave="isActionsDropdownHovered = false"
                      @mouseover="isActionsDropdownHovered = true"
                    >
                      <MoreIcon
                        class="more-icon"
                        decorative
                      />
                    </KButton>

                    <template #items>
                      <slot
                        name="action-items"
                        :row="getGeneric(row)"
                        :row-value="row[header.key]"
                      />
                    </template>
                  </KDropdown>
                </component>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <KPagination
        v-if="showPagination"
        class="table-pagination"
        data-testid="table-pagination"
        v-bind="paginationAttributes"
        @get-next-offset="$emit('get-next-offset')"
        @get-previous-offset="$emit('get-previous-offset')"
        @page-change="$emit('page-change', $event)"
        @page-size-change="onPaginationPageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch, computed, useAttrs, useSlots } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { InfoIcon, ArrowDownIcon, MoreIcon } from '@kong/icons'
import type {
  TablePreferences,
  TableViewHeader,
  TableViewData,
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
} from '@/types'
import { EmptyStateIconVariants } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import ColumnVisibilityMenu from './../KTable/ColumnVisibilityMenu.vue'
import useUniqueId from '@/composables/useUniqueId'
import useUtilities from '@/composables/useUtilities'
import type { RouteLocationRaw } from 'vue-router'
import KPagination from '@/components/KPagination/KPagination.vue'

enum TableViewHeaderKeys {
  ACTIONS = 'actions',
}

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
   * Enables hover highlighting to table rows
   */
  rowHover: {
    type: Boolean,
    default: true,
  },
  /**
   * A function that conditionally specifies row attributes on each row
   */
  rowAttrs: {
    type: Function as PropType<(row: Record<string, any>) => Record<string, string>>,
    default: () => ({}),
  },
  /**
   * A function that conditionally turns a row into a link
   */
  rowLink: {
    type: Function as PropType<(row: Record<string, any>) => RowLink>,
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
    type: [Object, String] as PropType<RouteLocationRaw | string>,
    default: null,
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
  emptyStateButtonAppearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
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
    type: [Object, String] as PropType<RouteLocationRaw | string>,
    default: null,
  },
  /**
   * A prop to pass in a custom error state action message
   */
  errorStateActionMessage: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in an array of headers for the table
   */
  headers: {
    type: Array as PropType<TableViewHeader[]>,
    default: () => [],
  },
  data: {
    type: Array as PropType<TableViewData>,
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
})

const emit = defineEmits<{
  (e: 'cell-click', value: { data: any }): void
  (e: 'row-click', value: { data: any }): void
  (e: 'error-action-click'): void
  (e: 'empty-state-action-click'): void
  (e: 'update:table-preferences', preferences: TablePreferences): void
  (e: 'sort', value: TableSortPayload): void
  (e: 'page-change', val: PageChangeData): void
  (e: 'page-size-change', val: PageSizeChangeData): void
  (e: 'get-next-offset'): void
  (e: 'get-previous-offset'): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const tableId = useUniqueId()
const { getSizeFromString } = useUtilities()

const headerRow = ref<HTMLDivElement>()
// all headers
const tableHeaders = ref<TableViewHeader[]>([])
// currently visible headers
const visibleHeaders = ref<TableViewHeader[]>([])
// highest priority - column currently being resized (mouse may be completely outside the column)
const resizingColumn = ref('')
// column the user is currently hovering over the resize handle for (may be hovered on the adjacent column to what we want to resize)
const resizerHoveredColumn = ref('')
// lowest priority - currently hovered resizable column (mouse is somewhere in the <th>)
const currentHoveredColumn = ref('')
const hasHidableColumns = computed((): boolean => tableHeaders.value.filter((header: TableViewHeader) => header.hidable).length > 0)
const hasColumnVisibilityMenu = computed((): boolean => {
  // has hidable columns, no error/loading/empty state
  return !!(hasHidableColumns.value &&
    !props.error && !props.loading && !props.loading && (props.data && props.data.length))
})
// columns whose visibility can be toggled
const visibilityColumns = computed((): TableViewHeader[] => tableHeaders.value.filter((header: TableViewHeader) => header.hidable))
// visibility preferences from the host app (initialized by app)
const visibilityPreferences = computed((): Record<string, boolean> => hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})
// current column visibility state
const columnVisibility = ref<Record<string, boolean>>(hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})
const isScrolled = ref(false)
const sortColumnKey = ref('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const isClickable = ref(false)
const hasToolbarSlot = computed((): boolean => !!slots.toolbar || hasColumnVisibilityMenu.value)
const isActionsDropdownHovered = ref<boolean>(false)
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
    const ignoredElements = ['a', 'button', 'label', 'input', 'select', 'span[role="checkbox"]']

    if (rowListeners.click) {
      isClickable.value = true
    }

    return {
      ...rowListeners,
      ...cellListeners,
      click(e: any) {
        console.log(e.target)
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

// default column widths for better UX
// actions column is always 54px (padding-left + button width + padding-right adds up to 54px)
const defaultColumnWidths = { actions: 54 }
const columnWidths = ref<Record<string, number>>(props.resizeColumns ? props.tablePreferences.columnWidths || defaultColumnWidths : defaultColumnWidths)
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

const getHeaderClasses = (column: TableViewHeader, index: number): Record<string, boolean> => {
  return {
    // display the resize handle on the right side of the column if resizeColumns is enabled, hovering current column, and not the last column
    'resize-hover': resizeHoverColumn.value === column.key && props.resizeColumns && index !== visibleHeaders.value.length - 1,
    resizable: props.resizeColumns,
    // display sort control if column is sortable, label is visible, and sorting is not disabled
    sortable: !column.hideLabel && !!column.sortable,
    // display active sorting styles if column is currently sorted
    'active-sort': !column.hideLabel && !!column.sortable && column.key === sortColumnKey.value,
    [sortColumnOrder.value]: column.key === sortColumnKey.value && !column.hideLabel,
    'is-scrolled': isScrolled.value,
    'has-tooltip': !!column.tooltip,
  }
}

const onHeaderClick = (column: TableViewHeader) => {
  if (column.sortable) {
    emit('sort', {
      prevKey: sortColumnKey.value,
      sortColumnKey: column.key,
      sortColumnOrder: sortColumnOrder.value === 'asc' ? 'desc' : 'asc', // display opposite because sortColumnOrder outdated
    })
    sortClickHandler(column)
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

const showPagination = computed((): boolean => {
  if (props.hidePagination) {
    return false
  }

  if (props.data && props.data.length && props.paginationAttributes.totalCount && props.paginationAttributes.totalCount <= props.data.length) {
    return false
  }

  return true
})

// Ensure `props.headers` are reactive.
watch(() => props.headers, (newVal: TableViewHeader[]) => {
  if (newVal && newVal.length) {
    tableHeaders.value = newVal
  }
}, { deep: true, immediate: true })

const sortClickHandler = (header: TableViewHeader): void => {
  const { key } = header

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

// determine the component to use for the row link
const getRowLinkComponent = (row: Record<string, any>, columnKey: string): string => {
  const { to } = props.rowLink(row)

  if (!to || columnKey === TableViewHeaderKeys.ACTIONS) {
    return 'div'
  }

  return typeof to === 'object' ? 'router-link' : 'a'
}

// returns attributes for the wrapper element in each row link
const getRowLinkAttrs = (row: Record<string, any>, columnKey: string): Record<string, any> => {
  // if the column is the actions column, return an empty object
  if (columnKey === TableViewHeaderKeys.ACTIONS) {
    return {}
  }

  const { to, target } = props.rowLink(row)
  const isRouterLink = to && typeof to === 'object'
  const isAnchor = to && typeof to === 'string'

  return {
    ...(isRouterLink && { to: to }),
    ...(isAnchor && { href: to }),
    ...((isRouterLink || isAnchor) && {
      ...(target && { target: target }),
    }),
  }
}

const getInitialPageSize = (): number | null => {
  if (props.paginationAttributes.initialPageSize) {
    return props.paginationAttributes.initialPageSize
  } else if (props.paginationAttributes.pageSizes) {
    return props.paginationAttributes.pageSizes[0]
  }

  return null
}
const paginationPageSize = ref<number | null>(getInitialPageSize())
const onPaginationPageSizeChange = (data: PageSizeChangeData): void => {
  paginationPageSize.value = data.pageSize
  emit('page-size-change', data)
}

// Store the tablePreferences in a computed property to utilize in the watcher
const tablePreferences = computed((): TablePreferences => ({
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value as 'asc' | 'desc',
  ...(props.resizeColumns ? { columnWidths: columnWidths.value } : {}),
  ...(hasHidableColumns.value ? { columnVisibility: columnVisibility.value } : {}),
  ...(paginationPageSize.value && !props.hidePagination && { pageSize: paginationPageSize.value }),
}))

const emitTablePreferences = (): void => {
  emit('update:table-preferences', tablePreferences.value)
}

watch([columnVisibility, tableHeaders], (newVals) => {
  const newVisibility = newVals[0]
  const newHeaders = newVals[1]
  const newVisibleHeaders = newHeaders.filter((header: TableViewHeader) => newVisibility[header.key] !== false)

  if (JSON.stringify(newVisibleHeaders) !== JSON.stringify(visibleHeaders.value)) {
    visibleHeaders.value = newVisibleHeaders
    emitTablePreferences()
  }
}, { deep: true, immediate: true })

// because hasColumnVisibilityMenu also accounts for error/loading/empty state, we need to watch it
watch(hasColumnVisibilityMenu, (newVal) => {
  if (newVal) {
    columnVisibility.value = props.tablePreferences.columnVisibility || {}
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.k-table-view {
  @include table;

  table {
    thead {
      tr {
        .resize-handle {
          height: v-bind('headerHeight');
        }
      }
    }

    tbody {
      tr {
        td {
          .actions-dropdown {
            .actions-dropdown-trigger {
              color: var(--kui-color-text-neutral, $kui-color-text-neutral);

              &:hover:not(:disabled):not(:focus):not(:active) {
                background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
                color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
              }

              &:focus-visible {
                background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
                color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
              }

              &:active {
                background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
                color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
              }

              .more-icon {
                pointer-events: none;
              }
            }
          }

          &.row-link {
            padding: var(--kui-space-0, $kui-space-0);

            a.cell-wrapper {
              color: var(--kui-color-text, $kui-color-text);
              display: block;
              padding: var(--kui-space-50, $kui-space-50) var(--kui-space-60, $kui-space-60);
              text-decoration: none;
            }
          }
        }
      }
    }
  }
}
</style>
