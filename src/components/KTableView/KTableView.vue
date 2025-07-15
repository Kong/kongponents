<template>
  <div
    class="k-table-view"
    :class="{ 'hide-headers': hideHeaders }"
  >
    <div
      v-if="hasToolbarSlot"
      class="table-toolbar"
      data-testid="table-toolbar"
    >
      <slot name="toolbar" />

      <div
        v-if="showBulkActionsToolbar || hasColumnVisibilityMenu"
        class="toolbar-default-items-container"
      >
        <slot
          v-if="showBulkActionsToolbar"
          name="bulk-actions"
          :selected-rows="bulkActionsSelectedRows"
        >
          <BulkActionsDropdown
            v-if="!$slots['bulk-actions']"
            :button-label="tableHeaders.find((header: TableViewHeader) => header.key === TableViewHeaderKeys.BULK_ACTIONS)!.label"
            :count="bulkActionsSelectedRowsCount"
            :disabled="!bulkActionsSelectedRowsCount || loading || !data.length"
          >
            <template #items>
              <slot
                name="bulk-action-items"
                :selected-rows="bulkActionsSelectedRows"
              />
            </template>
          </BulkActionsDropdown>
        </slot>

        <ColumnVisibilityMenu
          v-if="hasColumnVisibilityMenu"
          :columns="visibilityColumns"
          :disabled="columnVisibilityDisabled"
          :table-id="tableId"
          :visibility-preferences="visibilityPreferences"
          @update="(columnMap: Record<string, boolean>) => (columnVisibility as Record<string, boolean>) = columnMap"
        />
      </div>
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
              :to="errorStateActionRoute!"
              @click="emit('error-action-click')"
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
              :to="emptyStateActionRoute!"
              @click="emit('empty-state-action-click')"
            >
              <slot name="empty-state-action-icon" />
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else
      class="table-container"
    >
      <div
        ref="table-wrapper"
        class="table-wrapper"
        :style="tableWrapperStyles"
        @scroll.passive="scrollHandler"
      >
        <table
          class="table"
          :class="{
            'has-hover': rowHover && !isActionsDropdownHovered,
            'is-clickable': isClickable,
          }"
          :data-tableid="tableId"
        >
          <thead
            v-if="!hideHeaders"
            :class="{ 'is-scrolled': isScrolledVertically }"
          >
            <tr
              ref="header-row"
              :class="{ 'is-scrolled': isScrolledVertically }"
            >
              <th
                v-for="(column, index) in visibleHeaders"
                :key="`table-${tableId}-headers-${column.key}`"
                :aria-sort="column.key === sortColumnKey ? (sortColumnOrder === 'asc' ? 'ascending' : 'descending') : undefined"
                class="table-headers"
                :class="getHeaderClasses(column, index)"
                :data-key="column.key"
                :data-testid="`table-header-${column.key}`"
                :style="columnStyles[column.key]"
                @click="() => onHeaderClick(column)"
                @mouseleave="currentHoveredColumn = ''"
                @mouseover="currentHoveredColumn = column.key"
              >
                <div
                  v-if="resizeColumns && !nested && index !== 0 && showResizeHandle(column, true)"
                  class="resize-handle previous"
                  @click.stop
                  @mousedown="startResize($event, visibleHeaders[index - 1].key)"
                  @mouseleave="resizerHoveredColumn = ''"
                  @mouseover="resizerHoveredColumn = visibleHeaders[index - 1].key"
                />

                <div
                  :aria-describedby="column.tooltip || slots[getColumnTooltipSlotName(column.key)] ? `${getColumnTooltipSlotName(column.key)}-${tableId}` : undefined"
                  class="table-headers-container"
                  :class="{ 'resized': resizingColumn === column.key }"
                >
                  <slot
                    v-if="column.key !== TableViewHeaderKeys.BULK_ACTIONS"
                    :column="column"
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
                  <div
                    v-else
                    class="table-header-bulk-actions-container"
                  >
                    <KCheckbox
                      v-model="bulkActionsAll"
                      aria-label="Toggle selection for all rows"
                      class="table-header-bulk-actions-checkbox"
                      data-testid="table-header-bulk-actions-checkbox"
                      :indeterminate="isBulkActionsIndeterminate"
                      @change="handleIndeterminateChange"
                    />
                  </div>

                  <KTooltip
                    v-if="column.tooltip || $slots[getColumnTooltipSlotName(column.key)]"
                    :data-testid="getColumnTooltipSlotName(column.key)"
                    :kpop-attributes="{ target: tooltipTarget }"
                    max-width="300"
                    :tooltip-id="`${getColumnTooltipSlotName(column.key)}-${tableId}`"
                  >
                    <InfoIcon
                      class="header-tooltip-trigger"
                      :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                      :size="KUI_ICON_SIZE_30"
                      tabindex="0"
                    />

                    <template #content>
                      <slot
                        :column="column"
                        :name="getColumnTooltipSlotName(column.key)"
                      >
                        {{ column.tooltip }}
                      </slot>
                    </template>
                  </KTooltip>

                  <template v-if="!column.hideLabel && column.sortable && column.key !== TableViewHeaderKeys.BULK_ACTIONS && column.key !== TableViewHeaderKeys.ACTIONS">
                    <ArrowDownIcon
                      v-if="column.key === sortColumnKey"
                      class="sort-icon"
                      :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                      :size="KUI_ICON_SIZE_30"
                    />
                    <CodeIcon
                      v-else
                      class="sort-possible-icon"
                      :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                      :size="KUI_ICON_SIZE_30"
                    />
                  </template>
                </div>

                <div
                  v-if="resizeColumns && !nested && index !== visibleHeaders.length - 1 && showResizeHandle(column)"
                  class="resize-handle"
                  @click.stop
                  @mousedown="startResize($event, column.key)"
                  @mouseleave="resizerHoveredColumn = ''"
                  @mouseover="resizerHoveredColumn = column.key"
                />

                <div
                  v-if="isLastStickyColumn(column.key)"
                  class="scroll-overlay row-overlay left"
                  :class="{
                    'overlay-visible': isScrolledHorizontally,
                  }"
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <template
              v-for="(row, rowIndex) in data"
              :key="rowKeyMap.get(row)"
            >
              <tr
                :class="{
                  'last-row': rowIndex === data.length - 1 && !expandedRows.includes(rowIndex),
                }"
                :role="!!rowLink(row).to ? 'link' : undefined"
                :tabindex="isClickable && !rowLink(row).to ? 0 : undefined"
                v-bind="rowAttrs(row)"
              >
                <td
                  v-for="(header, index) in visibleHeaders"
                  :key="`${rowKeyMap.get(row)}-cell-${header.key}`"
                  :class="{
                    'resize-hover': resizeColumns && !nested && resizeHoverColumn === header.key && index !== visibleHeaders.length - 1 && showResizeHandle(header),
                    'row-link': !!rowLink(row).to,
                    'sticky-column': (header.key === TableViewHeaderKeys.BULK_ACTIONS || header.key === TableViewHeaderKeys.EXPANDABLE) && isScrolledHorizontally,
                    'second-sticky-column': header.key === TableViewHeaderKeys.BULK_ACTIONS && hasExpandableRows,
                    'has-row-scroll-overlay': isLastStickyColumn(header.key),
                  }"
                  :style="columnStyles[header.key]"
                  v-bind="cellAttrs({ headerKey: header.key, row, rowIndex, colIndex: index })"
                  v-on="tdlisteners(row[header.key], row)"
                >
                  <component
                    :is="getRowLinkComponent(row, header.key)"
                    v-if="header.key !== TableViewHeaderKeys.EXPANDABLE"
                    class="cell-wrapper"
                    v-bind="getRowLinkAttrs(row, header.key)"
                  >
                    <slot
                      v-if="header.key !== TableViewHeaderKeys.BULK_ACTIONS && header.key !== TableViewHeaderKeys.ACTIONS"
                      :name="header.key"
                      :row="row"
                      :row-key="rowIndex"
                      :row-value="row[header.key]"
                    >
                      {{ row[header.key] }}
                    </slot>

                    <KTooltip
                      v-else-if="header.key === TableViewHeaderKeys.BULK_ACTIONS && getRowState(row)"
                      :kpop-attributes="{ target: tooltipTarget }"
                      max-width="200"
                      placement="bottom-start"
                      :text="getRowBulkActionEnabled(row) ? undefined : getRowBulkActionTooltip(row)"
                    >
                      <KCheckbox
                        v-model="getRowState(row)!.selected"
                        aria-label="Toggle row selection"
                        class="bulk-actions-checkbox"
                        data-testid="bulk-actions-checkbox"
                        :disabled="!getRowBulkActionEnabled(row)"
                      />
                    </KTooltip>

                    <KDropdown
                      v-else-if="header.key === TableViewHeaderKeys.ACTIONS"
                      class="actions-dropdown"
                      data-testid="actions-dropdown"
                      :kpop-attributes="{ placement: 'bottom-end' }"
                      @toggle-dropdown="($event: boolean) => onRowActionsToggle(row, $event)"
                    >
                      <KButton
                        appearance="tertiary"
                        :aria-label="header.label"
                        class="actions-dropdown-trigger"
                        data-testid="row-actions-dropdown-trigger"
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
                          :row="row"
                        />
                      </template>
                    </KDropdown>
                  </component>

                  <div
                    v-else-if="rowExpandable(row)"
                    class="expandable-row-control-container"
                  >
                    <button
                      :aria-controls="`table-${tableId}-row-${rowIndex}-expandable-content`"
                      :aria-expanded="expandedRows.includes(rowIndex)"
                      aria-label="Toggle row expandable content"
                      class="expandable-row-control"
                      :class="{ 'expanded': expandedRows.includes(rowIndex) }"
                      data-testid="expandable-row-control"
                      type="button"
                      @click="toggleRow(rowIndex, row)"
                    >
                      <ChevronRightIcon
                        class="expandable-row-control-icon"
                        decorative
                      />
                    </button>
                  </div>

                  <div
                    v-if="isLastStickyColumn(header.key)"
                    class="scroll-overlay row-overlay left"
                    :class="{
                      'overlay-visible': isScrolledHorizontally,
                    }"
                  />
                </td>
              </tr>
              <tr
                v-if="hasExpandableRows && rowExpandable(row)"
                v-show="expandedRows.includes(rowIndex)"
                :id="`table-${tableId}-row-${rowIndex}-expandable-content`"
                class="expandable-content-row"
                data-testid="expandable-content-row"
              >
                <td :colspan="visibleHeaders.length">
                  <div class="expandable-content-wrapper">
                    <slot
                      :column-widths="actualColumnWidths"
                      name="row-expanded"
                      :nested-headers="getNestedTableHeaders"
                      :row="row"
                    />
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div
        v-if="!hasBulkActions && !hasExpandableRows"
        class="scroll-overlay table-overlay left"
        :class="{
          'overlay-visible': isScrolledHorizontally,
        }"
      />
      <div
        class="scroll-overlay table-overlay right"
        :class="{
          'overlay-visible': isScrollableRight,
          'scrollbar-offset': isScrollableVertically,
        }"
      />

      <KPagination
        v-if="showPagination"
        class="table-pagination"
        data-testid="table-pagination"
        v-bind="paginationAttributes"
        @get-next-offset="emit('get-next-offset')"
        @get-previous-offset="emit('get-previous-offset')"
        @page-change="emit('page-change', $event)"
        @page-size-change="onPaginationPageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="const Header extends TableViewHeader = TableViewHeader, Data extends readonly Record<string, any>[] = readonly Record<string, any>[]">
import { ref, watch, computed, nextTick, useId, useTemplateRef } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { InfoIcon, ArrowDownIcon, CodeIcon, MoreIcon, ChevronRightIcon } from '@kong/icons'
import type {
  TablePreferences,
  TableViewHeader,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  SortColumnOrder,
  RowLink,
  PageSizeChangeData,
  TableViewProps,
  TableViewSelectState,
  TableReservedColumnKey,
  TableViewEmits,
  TableViewSlots,
  TableColumnVisibility,
  TableColumnWidths,
  TableColumnKey,
} from '@/types'
import { EmptyStateIconVariants, TableViewHeaderKeys } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30, KUI_SPACE_60 } from '@kong/design-tokens'
import ColumnVisibilityMenu from './ColumnVisibilityMenu.vue'
import KPagination from '@/components/KPagination/KPagination.vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'
import BulkActionsDropdown from './BulkActionsDropdown.vue'
import { getInitialPageSize, getUniqueStringId } from '@/utilities'
import { getScrollbarSize } from '@/utilities/browser'
import { useResizeObserver } from '@vueuse/core'
import type { CSSProperties, Ref } from 'vue'
import { mapValues } from 'lodash-es'
import { normalizeSize } from '@/utilities/css'

type ColumnKey = TableColumnKey<Header>
type ColumnVisibility = TableColumnVisibility<Header>
type ColumnWidths = TableColumnWidths<Header>
type Row = Data[number]

const {
  resizeColumns,
  tablePreferences = {},
  rowHover = true,
  rowAttrs = (): Record<string, any> => ({}),
  rowLink = (): RowLink => ({}),
  rowBulkActionEnabled = () => true,
  rowKey,
  cellAttrs = () => ({}),
  loading,
  emptyStateTitle = 'No Data',
  emptyStateMessage = 'There is no data to display.',
  emptyStateActionMessage = '',
  emptyStateIconVariant = EmptyStateIconVariants.Default,
  emptyStateButtonAppearance = 'primary',
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
  tooltipTarget = 'body',
  data = [],
  headers = [],
  ...restProps
} = defineProps<TableViewProps<Header, Data>>()

const emit = defineEmits<TableViewEmits<Header, Data>>()

const slots = defineSlots<TableViewSlots<Header, Data>>()

const tableId = useId()

const getRowKey = (row: Row): string => {
  if (typeof rowKey === 'function' && typeof rowKey(row) === 'string') {
    return rowKey(row)
  }

  if (typeof rowKey === 'string' && !!(rowKey in row) && typeof row[rowKey] === 'string') {
    return row[rowKey]
  }

  return ''
}

const tableWrapperRef = useTemplateRef('table-wrapper')
const headerRowRef = useTemplateRef('header-row')
// all headers
const tableHeaders = ref([]) as Ref<Array<TableViewHeader<ColumnKey>>>
// currently visible headers
const visibleHeaders = ref([]) as Ref<Array<TableViewHeader<ColumnKey>>>
// highest priority - column currently being resized (mouse may be completely outside the column)
const resizingColumn = ref('') as Ref<ColumnKey | ''>
// column the user is currently hovering over the resize handle for (may be hovered on the adjacent column to what we want to resize)
const resizerHoveredColumn = ref('') as Ref<ColumnKey | ''>
// lowest priority - currently hovered resizable column (mouse is somewhere in the <th>)
const currentHoveredColumn = ref('') as Ref<ColumnKey | ''>
const hasHidableColumns = computed((): boolean => tableHeaders.value.filter((header) => header.hidable).length > 0)
const hasColumnVisibilityMenu = computed((): boolean => {
  if (nested || !hasHidableColumns.value || error) {
    return false
  }

  if (slots.toolbar) {
    // when toolbar slot is present, we want to disable column visibility menu rather than hide it in certain states
    return true
  }

  // show when not loading and there is data
  return !loading && !!data && !!data.length
})
const columnVisibilityDisabled = computed((): boolean => loading || !(data && data.length))
// columns whose visibility can be toggled
const visibilityColumns = computed(() => tableHeaders.value.filter((header) => header.hidable && !isSpecialColumn(header.key)))
// visibility preferences from the host app (initialized by app)
const visibilityPreferences = computed(() => (hasColumnVisibilityMenu.value ? tablePreferences.columnVisibility || {} : {})) as Ref<ColumnVisibility>
// current column visibility state
const columnVisibility = ref(hasColumnVisibilityMenu.value ? tablePreferences.columnVisibility || {} : {}) as Ref<ColumnVisibility>

const tableWrapperHeight = ref<string>('100%')
const isScrollableVertically = ref<boolean>(false)
const isScrolledVertically = ref<boolean>(false)
const isScrolledHorizontally = ref<boolean>(false)
const isScrollableRight = ref<boolean>(false)
const sortColumnKey = ref('') as Ref<ColumnKey | ''>
const sortColumnOrder = ref<SortColumnOrder>('desc')
const isClickable = ref(false)
const hasToolbarSlot = computed((): boolean => !hideToolbar && !nested && (!!slots.toolbar || hasColumnVisibilityMenu.value || showBulkActionsToolbar.value))
const isActionsDropdownHovered = ref<boolean>(false)
const tableWrapperStyles = computed((): CSSProperties => ({
  maxHeight: normalizeSize(maxHeight),
}))
const scrollbarWidth = computed((): string => `${getScrollbarSize()}px`)

const bulkActionsSelectedRows = ref([]) as Ref<Row[]>
const hasBulkActions = computed((): boolean => !nested && !error && tableHeaders.value.some((header) => header.key === TableViewHeaderKeys.BULK_ACTIONS) && !!(slots['bulk-action-items'] || slots['bulk-actions']) && !!data.every((row) => getRowKey(row)))
const dataSelectState = ref([]) as Ref<Array<TableViewSelectState<Row>>>
const showBulkActionsToolbar = computed((): boolean => {
  if (nested || !hasBulkActions.value || error) {
    return false
  }

  if (slots.toolbar) {
    // when toolbar slot is present, we want to disable bulk actions dropdown rather than hide it in certain states
    return true
  }

  // show when not loading and there is data
  return !loading && !!data && !!data.length
})
const bulkActionsSelectedRowsCount = computed((): string => {
  const selectedRowsCount = bulkActionsSelectedRows.value.length

  if (!selectedRowsCount) {
    return ''
  }

  if (selectedRowsCount > 100) {
    return '99+'
  }

  return String(selectedRowsCount)
})

const rowKeyMap = ref<WeakMap<Row, string>>(new WeakMap())
/**
 * Utilize a helper function to generate the column slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} columnKey The column.key
 */
const getColumnSlotName = (columnKey: ColumnKey): TableColumnSlotName<ColumnKey> => {
  return `column-${columnKey}`
}

/**
 * Utilize a helper function to generate the column tooltip slot name.
 * This helps TypeScript infer the slot name in the template section so that the slot props can be resolved.
 * @param {string} columnKey The column.key
 */
const getColumnTooltipSlotName = (columnKey: ColumnKey): TableColumnTooltipSlotName<ColumnKey> => {
  return `tooltip-${columnKey}`
}

/**
 * Grabs listeners from attrs matching a prefix to attach the
 * event that is dynamic. e.g. `v-on:cell:click`, `@row:focus` etc.
 * @param {'onRow:' | 'onCell:'} prefix - event listener prefix e.g. `row:`, `cell:`
 * @param {Record<string, unknown>} listenerProps - attrs on the vue instance to pluck from
 * @returns {Function} - returns a function that can pass an entity to the
                         listener callback function.
*/
const pluckListeners = (prefix: 'onRow:' | 'onCell:', listenerProps: Record<string, unknown>): any => {
  return (entity: unknown, type: 'row' | 'cell') => {
    const onPattern = /^on[^a-z]/
    const listeners = {} as any

    for (const property in listenerProps) {
      if (onPattern.test(property) && !!listenerProps[property]) {
        listeners[property] = listenerProps[property]
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
  return (entity: unknown, rowData: Row) => {
    const rowListeners = pluckListeners('onRow:', restProps)(rowData, 'row')
    const cellListeners = pluckListeners('onCell:', restProps)(entity, 'cell')
    const ignoredElements = ['a', 'button', 'label', 'input', 'select', 'span[role="checkbox"]']

    if (rowListeners.click || cellListeners.click) {
      isClickable.value = true
    }

    return {
      ...rowListeners,
      ...cellListeners,
      click(e: MouseEvent) {
        const target = e.target as Element
        const targetClasses = target.className
        let isIgnored = ignoredElements.includes(target.tagName.toLowerCase())
        let isPopoverContent = false

        // check for popover class
        if (typeof targetClasses === 'string' || Array.isArray(targetClasses)) {
          isPopoverContent = targetClasses.includes('k-popover')
        } else if (typeof targetClasses === 'object') {
          isPopoverContent = Object.keys(targetClasses).includes('k-popover')
        }

        // check parent for popover class
        if (target.closest('.popover-content') !== null) {
          isPopoverContent = true
        }

        // check parent of target is not an ignored elem
        for (let i = 0; i < ignoredElements.length; i++) {
          if (target.closest(ignoredElements[i]) !== null) {
            isIgnored = true
            break
          }
        }

        // ignore click if it is from the popover, or is a non-disabled ignored element
        if ((!isIgnored || target.hasAttribute('disabled')) &&
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

const expandableColumnWidth = (parseInt(KUI_SPACE_60) * 2) + parseInt(KUI_ICON_SIZE_30)
/**
 * Default column widths for better UX
 * expandable column is always 48px (padding-left + chevron width + padding-right adds up to 48px)
 * bulkActions column is also always 48px (padding-left + checkbox width + padding-right adds up to 48px)
 * actions column is always 54px (padding-left + button width + padding-right adds up to 54px)
 */
const DEFAULT_COLUMN_WIDTHS: Record<TableReservedColumnKey, number> = { expandable: expandableColumnWidth, bulkActions: 48, actions: 54 }
const DEFAULT_COLUMN_WIDTHS_PX: Record<TableReservedColumnKey, string> = mapValues(DEFAULT_COLUMN_WIDTHS, (width) => `${width}px`)
const columnWidths = ref(tablePreferences?.columnWidths || DEFAULT_COLUMN_WIDTHS) as Ref<ColumnWidths>
const columnStyles = computed(() => {
  const styles: Partial<Record<ColumnKey, CSSProperties>> = {}
  for (const colKey in columnWidths.value) {
    const key = colKey as ColumnKey
    // no width set
    if (!columnWidths.value[key]) {
      continue
    }
    const width = columnWidths.value[key] + 'px'
    styles[key] = {
      width,
      maxWidth: width,
      minWidth: width,
    }
  }
  return styles
})

const getHeaderClasses = (column: TableViewHeader<ColumnKey>, index: number): Record<string, boolean> => {
  return {
    // display the resize handle on the right side of the column if resizeColumns is enabled, hovering current column, and not the last column
    'resize-hover': resizeHoverColumn.value === column.key && resizeColumns && !nested && index !== visibleHeaders.value.length - 1 && showResizeHandle(column),
    resizable: resizeColumns && !nested,
    // display sort control if column is sortable, label is visible, and sorting is not disabled
    sortable: !column.hideLabel && !!column.sortable,
    // display active sorting styles if column is currently sorted
    'active-sort': !column.hideLabel && !!column.sortable && column.key === sortColumnKey.value,
    [sortColumnOrder.value]: column.key === sortColumnKey.value && !column.hideLabel,
    'is-scrolled': isScrolledVertically.value,
    'has-tooltip': !!column.tooltip,
    'sticky-column': (column.key === TableViewHeaderKeys.BULK_ACTIONS || column.key === TableViewHeaderKeys.EXPANDABLE) && isScrolledHorizontally.value,
    'second-sticky-column': column.key === TableViewHeaderKeys.BULK_ACTIONS && hasExpandableRows.value,
    'has-row-scroll-overlay': isLastStickyColumn(column.key),
  }
}

const onHeaderClick = (column: TableViewHeader<ColumnKey>) => {
  if (column.sortable && column.key !== TableViewHeaderKeys.BULK_ACTIONS && column.key !== TableViewHeaderKeys.ACTIONS) {
    let newSortColumnOrder: SortColumnOrder = 'asc'
    if (column.key === sortColumnKey.value && sortColumnOrder.value === 'asc') {
      newSortColumnOrder = 'desc'
    }
    emit('sort', {
      prevKey: sortColumnKey.value,
      sortColumnKey: column.key,
      sortColumnOrder: newSortColumnOrder,
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

const resizeHoverColumn = computed(() => {
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
const headerElems = computed((): NodeListOf<Element> | undefined => headerRowRef.value?.querySelectorAll('th.resizable'))
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

const startResize = (evt: MouseEvent, colKey: ColumnKey) => {
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

    if (hasExpandableRows.value) {
      setActualColumnWidths()
    }
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

// if table is scrollable horizontally, calculate which column is the last sticky column
const isLastStickyColumn = (columnKey: ColumnKey): boolean => {
  if (!isScrolledHorizontally.value) {
    return false
  }

  if (hasBulkActions.value) {
    return columnKey === TableViewHeaderKeys.BULK_ACTIONS
  }

  if (hasExpandableRows.value) {
    return columnKey === TableViewHeaderKeys.EXPANDABLE
  }

  return false
}

const isSpecialColumn = (columnKey: ColumnKey): boolean =>
  columnKey === TableViewHeaderKeys.EXPANDABLE ||
  columnKey === TableViewHeaderKeys.BULK_ACTIONS ||
  columnKey === TableViewHeaderKeys.ACTIONS

// don't show the resize handle if the column is a special column
const showResizeHandle = (column: TableViewHeader<ColumnKey>, previous: boolean = false): boolean => {
  if (previous) {
    if (visibleHeaders.value.indexOf(column) === visibleHeaders.value.length - 1) {
      return false
    }

    const previousColumn = visibleHeaders.value[visibleHeaders.value.indexOf(column) - 1]
    return !isSpecialColumn(previousColumn.key)
  }

  const nextColumn = visibleHeaders.value[visibleHeaders.value.indexOf(column) + 1]
  return !isSpecialColumn(column.key) && !isSpecialColumn(nextColumn.key)
}

const onRowActionsToggle = (row: Row, state: boolean): void => {
  emit('row-actions-toggle', { row, open: state })
}

const showPagination = computed((): boolean => {
  if (hidePagination || nested) {
    return false
  }

  if (hidePaginationWhenOptional && !!data.length && paginationAttributes.totalCount && paginationAttributes.totalCount <= data.length) {
    return false
  }

  return true
})

// Ensure `headers` are reactive.
watch(() => headers, (newVal: readonly Header[]) => {
  if (newVal && newVal.length) {
    /**
     * Reorder the headers to ensure bulk actions are first and actions are last
     */

    const headers: Header[] = newVal.filter((header) => header.key !== TableViewHeaderKeys.BULK_ACTIONS && header.key !== TableViewHeaderKeys.ACTIONS)

    const bulkActionsHeader = newVal.find((header) => header.key === TableViewHeaderKeys.BULK_ACTIONS)
    const actionsHeader = newVal.find((header) => header.key === TableViewHeaderKeys.ACTIONS)

    if (bulkActionsHeader) {
      headers.unshift(bulkActionsHeader)
    }

    if (actionsHeader) {
      headers.push(actionsHeader)
    }

    const firstInitialSort = newVal.find(({ initialSort }) => initialSort)
    if (!sortColumnKey.value && firstInitialSort) {
      sortColumnKey.value = firstInitialSort.key
      // @ts-ignore - initialSort can't be undefined here because we filtered for it already
      sortColumnOrder.value = firstInitialSort.initialSort
    }

    tableHeaders.value = headers
  }
}, { deep: true, immediate: true })

const sortClickHandler = (header: TableViewHeader<ColumnKey>): void => {
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

const scrollHandler = (event: Event): void => {
  const target = event.target as Element
  if (target && (typeof target.scrollTop === 'number' || typeof target.scrollLeft === 'number')) {
    if (target.scrollTop > 1) {
      isScrollableVertically.value = true
      isScrolledVertically.value = true
    } else if (target.scrollTop === 0) {
      isScrolledVertically.value = false
    }

    if (target.scrollLeft > 1) {
      isScrolledHorizontally.value = true
    } else if (target.scrollLeft === 0) {
      isScrolledHorizontally.value = false
    }

    // determine if there's still room to scroll right
    if (target.scrollWidth === target.scrollLeft + target.clientWidth) {
      isScrollableRight.value = false
    } else {
      isScrollableRight.value = true
    }
  }
}

const getRowState = (row: Row): TableViewSelectState<Row> | undefined => {
  return dataSelectState.value.find((rowState) => rowState.rowKey === getRowKey(row))
}

const getRowBulkActionEnabled = (row: Row): boolean => {
  if (typeof rowBulkActionEnabled !== 'function') {
    return false
  }

  const rowBulkActionEnabledValue = rowBulkActionEnabled(row)

  if (typeof rowBulkActionEnabledValue === 'boolean') {
    return rowBulkActionEnabledValue
  }

  return rowBulkActionEnabledValue.enabled
}

const getRowBulkActionTooltip = (row: Row): string => {
  if (typeof rowBulkActionEnabled !== 'function') {
    return ''
  }

  const rowBulkActionEnabledValue = rowBulkActionEnabled(row)

  if (typeof rowBulkActionEnabledValue === 'boolean') {
    return ''
  }

  return rowBulkActionEnabledValue.disabledTooltip || ''
}

// determine the component to use for the row link
const getRowLinkComponent = (row: Row, columnKey: ColumnKey): string => {
  const { to } = rowLink(row)

  if (!to || columnKey === TableViewHeaderKeys.BULK_ACTIONS || columnKey === TableViewHeaderKeys.ACTIONS) {
    return 'div'
  }

  return typeof to === 'object' ? 'router-link' : 'a'
}

// returns attributes for the wrapper element in each row link
const getRowLinkAttrs = (row: Row, columnKey: ColumnKey): Record<string, unknown> => {
  // if the column is the actions column, return an empty object
  if (columnKey === TableViewHeaderKeys.BULK_ACTIONS || columnKey === TableViewHeaderKeys.ACTIONS) {
    return {}
  }

  const { to, target }: { to?: string | object, target?: string } = rowLink(row)
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


const paginationPageSize = ref<number>(getInitialPageSize(tablePreferences, paginationAttributes))
const onPaginationPageSizeChange = (data: PageSizeChangeData): void => {
  paginationPageSize.value = data.pageSize
  emit('page-size-change', data)

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

// Store the tablePreferences in a computed property to utilize in the watcher
const computedTablePreferences = computed((): TablePreferences<ColumnKey> => ({
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value,
  ...(resizeColumns ? { columnWidths: columnWidths.value } : {}),
  ...(hasHidableColumns.value ? { columnVisibility: columnVisibility.value } : {}),
  ...(paginationPageSize.value && !hidePagination && { pageSize: paginationPageSize.value }),
}))

const emitTablePreferences = (): void => {
  emit('update:table-preferences', computedTablePreferences.value)
}

const hasExpandableRows = computed((): boolean => !nested && data.some((row: Row) => rowExpandable(row)))
const expandableRowHeader = { key: TableViewHeaderKeys.EXPANDABLE, label: 'Expandable rows controls', hideLabel: true }
/**
 * Get the expanded rows from the prop
 */
const getExpandedRows = (): number[] => {
  const initialExpandedRows: number[] = []

  data.forEach((row, index) => {
    if (rowExpanded(row)) {
      initialExpandedRows.push(index)
    }
  })

  return initialExpandedRows
}
const expandedRows = ref<number[]>(getExpandedRows())
/**
 * Toggle visibility of expendable row content
 */
const toggleRow = async (rowIndex: number, row: Row): Promise<void> => {
  setActualColumnWidths()
  await nextTick()

  if (expandedRows.value.includes(rowIndex)) {
    expandedRows.value = expandedRows.value.filter((row) => row !== rowIndex)
    emit('update:row-expanded', { row, expanded: false })
  } else {
    expandedRows.value = [...expandedRows.value, rowIndex]
    emit('update:row-expanded', { row, expanded: true })
  }
}

// Get the headers for the nested table
const getNestedTableHeaders = computed(() => visibleHeaders.value.filter((header) => header.key !== TableViewHeaderKeys.EXPANDABLE && header.key !== TableViewHeaderKeys.BULK_ACTIONS))

/**
 * Function that calculates client width of each column and sets the actualColumnWidths
 * actualColumnWidths passed as slot prop to the nested table
 */
const actualColumnWidths = ref({}) as Ref<ColumnWidths>
const setActualColumnWidths = (): void => {
  if (typeof document === 'undefined') {
    return
  }

  const table = document?.querySelector(`[data-tableid="${tableId}"]`)
  const headers = table?.querySelectorAll('th')
  const widths: ColumnWidths = {}

  headers?.forEach((header, index) => {
    const key = header.getAttribute('data-key') as ColumnKey

    if (key === TableViewHeaderKeys.EXPANDABLE) {
      return
    }

    let width = header.getBoundingClientRect().width

    // first column is the expandable row column which isn't present in the nested table
    // so for the nested table, we need to add the width of the expandable row column so that the nested table aligns with the parent table
    if (index === 1) {
      width += expandableColumnWidth
    }

    // reduce last column width to account for scrollbar
    // scrollbar is roughly 15px (tested in Chrome, Firefox and Safari)
    if (index === headers.length - 1) {
      width -= 15
    }

    widths[key] = width
  })

  actualColumnWidths.value = widths
}

watch([columnVisibility, tableHeaders, hasExpandableRows], (newVals) => {
  const [newVisibility, newHeaders, newExpandableRows] = newVals

  let newVisibleHeaders: Array<TableViewHeader<ColumnKey>> = newHeaders.filter((header) => {
    if (header.key === TableViewHeaderKeys.BULK_ACTIONS) {
      return hasBulkActions.value
    }

    return newVisibility[header.key] !== false
  })

  // remove the expandable row header if it exists because it has special handling
  if (newVisibleHeaders.find((header) => header.key === TableViewHeaderKeys.EXPANDABLE)) {
    newVisibleHeaders = newVisibleHeaders.filter((header) => header.key !== TableViewHeaderKeys.EXPANDABLE)
  }

  // add the expandable row header if expandable rows are enabled
  if (newExpandableRows) {
    newVisibleHeaders.unshift(expandableRowHeader)
  }

  if (JSON.stringify(newVisibleHeaders) !== JSON.stringify(visibleHeaders.value)) {
    visibleHeaders.value = newVisibleHeaders
    emitTablePreferences()
  }

  if (newExpandableRows) {
    setActualColumnWidths()
  }
}, { deep: true, immediate: true })

// because hasColumnVisibilityMenu also accounts for error/loading/empty state, we need to watch it
watch(hasColumnVisibilityMenu, (newVal) => {
  if (newVal) {
    columnVisibility.value = tablePreferences.columnVisibility || {}
  }
}, { immediate: true })

const bulkActionsAll = ref<boolean>(false)

const isBulkActionsIndeterminate = computed((): boolean => {
  // ignore thee disabled rows
  const selectableRowsState = dataSelectState.value.filter((rowState) => !rowState.disabled && data.find((row) => getRowKey(row) === rowState.rowKey))

  // it is indeterminate if there are selected and unselected rows
  return !!selectableRowsState.filter((rowState) => rowState.selected).length && !!selectableRowsState.filter((rowState) => !rowState.selected).length
})

const handleIndeterminateChange = (value: boolean) => {
  // assign the value to all selectable rows which will result in either selecting or deselecting all selectable rows
  dataSelectState.value.forEach((rowState) => {
    if (data.find((row) => getRowKey(row) === rowState.rowKey) && !rowState.disabled) {
      rowState.selected = value
    }
  })
}

/**
 * Watch for changes in data and dataSelectState
 */
watch([() => data, dataSelectState], (newVals) => {
  const [newData, newDataSelectState] = newVals

  // update the rowKeyMap
  newData.forEach((row) => {
    if (!rowKeyMap.value.get(row)) {
      const uniqueRowKey = getRowKey(row) || getUniqueStringId()

      rowKeyMap.value.set(row, `table-${tableId}-row-${uniqueRowKey}`)
    }
  })

  // logic that applies only when bulk actions are enabled
  if (hasBulkActions.value) {
    // add new rows to the dataSelectState
    newData.forEach((row) => {
      if (!getRowState(row)) {
        dataSelectState.value.push({
          rowKey: getRowKey(row),
          selected: false,
          disabled: !getRowBulkActionEnabled(row),
        })
      }
    })

    /** update the bulkActionsAll value */

    const selectableRowsState = newDataSelectState.filter((rowState) => !rowState.disabled && newData.find((row) => getRowKey(row) === rowState.rowKey))

    // all are selected
    if (selectableRowsState.length && selectableRowsState.filter((rowState) => rowState.selected).length === selectableRowsState.length) {
      bulkActionsAll.value = true
      // all are unselected
    } else if (selectableRowsState.filter((rowState) => !rowState.selected).length === selectableRowsState.length) {
      bulkActionsAll.value = false
      // some are selected
    } else {
      bulkActionsAll.value = false
    }

    /** update bulkActionsSelectedRows */

    // find all selected rows from the new state
    const newSelectedRows: Row[] = newData.filter((row) => {
      const rowState = newDataSelectState.find((rowState) => rowState.rowKey === getRowKey(row))

      if (rowState && rowState.selected) {
        return true
      }

      return false
    })

    // find all selected rows from the old state
    const oldSelectedRows: Row[] = []
    bulkActionsSelectedRows.value.forEach((selectedRow) => {
      const row = newData.find((dataRow) => getRowKey(selectedRow) === getRowKey(dataRow))

      if (!row) {
        oldSelectedRows.push(selectedRow)
      }
    })

    bulkActionsSelectedRows.value = [...oldSelectedRows, ...newSelectedRows]
  }

  expandedRows.value = getExpandedRows()
}, { deep: true, immediate: true })

watch(bulkActionsSelectedRows, (newVal) => {
  emit('row-select', newVal)
})

watch(() => tablePreferences, (newVal) => {
  if (newVal?.columnWidths) {
    columnWidths.value = newVal.columnWidths
  }
})

useResizeObserver(tableWrapperRef, (entries) => {
  const el = entries[0]?.target

  if (el) {
    // check if the table is scrollable horizontally
    isScrollableRight.value = el.scrollWidth > el.clientWidth
    tableWrapperHeight.value = el.clientHeight + 'px'
    isScrollableVertically.value = el.scrollHeight > el.clientHeight
  }
})
</script>

<style lang="scss" scoped>
.k-table-view {
  @include table;

  table {
    th,
    td {
      &.sticky-column.second-sticky-column {
        left: v-bind('DEFAULT_COLUMN_WIDTHS_PX.expandable') !important;
      }
    }

    thead {
      tr {
        .resize-handle {
          height: v-bind('headerHeight');
        }
      }
    }
  }

  .scroll-overlay.table-overlay {
    height: v-bind('tableWrapperHeight');

    &.right.scrollbar-offset {
      right: v-bind('scrollbarWidth');
    }
  }
}
</style>
