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
          @update="(columnMap: Record<string, boolean>) => columnVisibility = columnMap"
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
              :to="emptyStateActionRoute!"
              @click="$emit('empty-state-action-click')"
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
            'is-clickable': isClickable
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
                  :aria-describedby="column.tooltip || $slots[getColumnTooltipSlotName(column.key)] ? `${getColumnTooltipSlotName(column.key)}-${tableId}` : undefined"
                  class="table-headers-container"
                  :class="{ 'resized': resizingColumn === column.key }"
                >
                  <slot
                    v-if="column.key !== TableViewHeaderKeys.BULK_ACTIONS"
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
                        :column="getGeneric(column)"
                        :name="getColumnTooltipSlotName(column.key)"
                      >
                        {{ column.tooltip }}
                      </slot>
                    </template>
                  </KTooltip>

                  <ArrowDownIcon
                    v-if="!column.hideLabel && column.sortable && column.key !== TableViewHeaderKeys.BULK_ACTIONS && column.key !== TableViewHeaderKeys.ACTIONS"
                    class="sort-icon"
                    :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
                    :size="KUI_ICON_SIZE_30"
                  />
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
                :tabindex="isClickable || !!rowLink(row).to ? 0 : undefined"
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
                      :row="getGeneric(row)"
                      :row-key="rowIndex"
                      :row-value="row[header.key]"
                    >
                      {{ row[header.key] }}
                    </slot>

                    <KTooltip
                      v-else-if="header.key === TableViewHeaderKeys.BULK_ACTIONS && getRowState(row)"
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
                          :row="getGeneric(row)"
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
                      :row="getGeneric(row)"
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
        @get-next-offset="$emit('get-next-offset')"
        @get-previous-offset="$emit('get-previous-offset')"
        @page-change="$emit('page-change', $event)"
        @page-size-change="onPaginationPageSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, useAttrs, useSlots, nextTick, useId, useTemplateRef } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { InfoIcon, ArrowDownIcon, MoreIcon, ChevronRightIcon } from '@kong/icons'
import type {
  TablePreferences,
  TableViewHeader,
  TableViewData,
  TableColumnSlotName,
  TableColumnTooltipSlotName,
  SortColumnOrder,
  TableSortPayload,
  RowLink,
  PageChangeData,
  PageSizeChangeData,
  TableViewProps,
  TableViewSelectState,
  RowExpandPayload,
} from '@/types'
import { EmptyStateIconVariants, TableViewHeaderKeys } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_30, KUI_SPACE_60 } from '@kong/design-tokens'
import ColumnVisibilityMenu from './ColumnVisibilityMenu.vue'
import useUtilities from '@/composables/useUtilities'
import KPagination from '@/components/KPagination/KPagination.vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KCheckbox from '@/components/KCheckbox/KCheckbox.vue'
import BulkActionsDropdown from './BulkActionsDropdown.vue'
import { getInitialPageSize, getUniqueStringId } from '@/utilities'
import { getScrollbarSize } from '@/utilities/browser'
import { useResizeObserver } from '@vueuse/core'

const props = withDefaults(defineProps<TableViewProps>(), {
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
  emptyStateButtonAppearance: 'primary',
  error: false,
  errorStateTitle: 'An error occurred',
  errorStateMessage: 'Data cannot be displayed due to an error.',
  errorStateActionMessage :'',
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
   * KTableView props defaults
   */
  data: () => ([]),
  headers: () => ([]),
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
  (e: 'row-select', data: TableViewData): void
  (e: 'update:row-expanded', data: RowExpandPayload): void
}>()

const attrs = useAttrs()
const slots = useSlots()

const tableId = useId()
const { getSizeFromString } = useUtilities()

const getRowKey = (row: Record<string, any>): string => {
  if (typeof props.rowKey === 'function' && typeof props.rowKey(row) === 'string') {
    return props.rowKey(row)
  }

  if (typeof props.rowKey === 'string' && !!(props.rowKey in row) && typeof row[props.rowKey] === 'string') {
    return row[props.rowKey]
  }

  return ''
}

const tableWrapperRef = useTemplateRef('table-wrapper')
const headerRowRef = useTemplateRef('header-row')
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
  if (props.nested || !hasHidableColumns.value || props.error) {
    return false
  }

  if (slots.toolbar) {
    // when toolbar slot is present, we want to disable column visibility menu rather than hide it in certain states
    return true
  }

  // show when not loading and there is data
  return !props.loading && !!props.data && !!props.data.length
})
const columnVisibilityDisabled = computed((): boolean => props.loading || !(props.data && props.data.length))
// columns whose visibility can be toggled
const visibilityColumns = computed((): TableViewHeader[] => tableHeaders.value.filter((header: TableViewHeader) => header.hidable && !isSpecialColumn(header.key)))
// visibility preferences from the host app (initialized by app)
const visibilityPreferences = computed((): Record<string, boolean> => hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})
// current column visibility state
const columnVisibility = ref<Record<string, boolean>>(hasColumnVisibilityMenu.value ? props.tablePreferences.columnVisibility || {} : {})

const tableWrapperHeight = ref<string>('100%')
const isScrollableVertically = ref<boolean>(false)
const isScrolledVertically = ref<boolean>(false)
const isScrolledHorizontally = ref<boolean>(false)
const isScrollableRight = ref<boolean>(false)
const sortColumnKey = ref('')
const sortColumnOrder = ref<SortColumnOrder>('desc')
const isClickable = ref(false)
const hasToolbarSlot = computed((): boolean => !props.hideToolbar && !props.nested && (!!slots.toolbar || hasColumnVisibilityMenu.value || showBulkActionsToolbar.value))
const isActionsDropdownHovered = ref<boolean>(false)
const tableWrapperStyles = computed((): Record<string, string> => ({
  maxHeight: getSizeFromString(props.maxHeight),
}))
const scrollbarWidth = computed((): string => `${getScrollbarSize()}px`)

const bulkActionsSelectedRows = ref<TableViewData>([])
const hasBulkActions = computed((): boolean => !props.nested && !props.error && tableHeaders.value.some((header: TableViewHeader) => header.key === TableViewHeaderKeys.BULK_ACTIONS) && !!(slots['bulk-action-items'] || slots['bulk-actions']) && !!props.data.every((row) => getRowKey(row)))
const dataSelectState = ref<TableViewSelectState[]>([])
const showBulkActionsToolbar = computed((): boolean => {
  if (props.nested || !hasBulkActions.value || props.error) {
    return false
  }

  if (slots.toolbar) {
    // when toolbar slot is present, we want to disable bulk actions dropdown rather than hide it in certain states
    return true
  }

  // show when not loading and there is data
  return !props.loading && !!props.data && !!props.data.length
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

const rowKeyMap = ref<WeakMap<Record<string, any>, string>>(new WeakMap())
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

    if (rowListeners.click || cellListeners.click) {
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

const expandableColumnWidth = (parseInt(KUI_SPACE_60) * 2) + parseInt(KUI_ICON_SIZE_30)
/**
 * Default column widths for better UX
 * expandable column is always 48px (padding-left + chevron width + padding-right adds up to 48px)
 * bulkActions column is also always 48px (padding-left + checkbox width + padding-right adds up to 48px)
 * actions column is always 54px (padding-left + button width + padding-right adds up to 54px)
 */
const DEFAULT_COLUMN_WIDTHS: Record<string, number> = { expandable: expandableColumnWidth, bulkActions: 48, actions: 54 }
const DEFAULT_COLUMN_WIDTHS_PX: Record<string, string> = Object.keys(DEFAULT_COLUMN_WIDTHS).map((key) => ({ [key]: `${DEFAULT_COLUMN_WIDTHS[key]}px` })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
const columnWidths = ref<Record<string, number>>(props.tablePreferences?.columnWidths || DEFAULT_COLUMN_WIDTHS)
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
    // display the resize handle on the right side of the column if props.resizeColumns is enabled, hovering current column, and not the last column
    'resize-hover': resizeHoverColumn.value === column.key && props.resizeColumns && !props.nested && index !== visibleHeaders.value.length - 1 && showResizeHandle(column),
    resizable: props.resizeColumns && !props.nested,
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

const onHeaderClick = (column: TableViewHeader) => {
  if (column.sortable && column.key !== TableViewHeaderKeys.BULK_ACTIONS && column.key !== TableViewHeaderKeys.ACTIONS) {
    let newSortColumnOrder = 'asc'
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
const isLastStickyColumn = (columnKey: string): boolean => {
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

const isSpecialColumn = (columnKey: string): boolean =>
  columnKey === TableViewHeaderKeys.EXPANDABLE ||
  columnKey === TableViewHeaderKeys.BULK_ACTIONS ||
  columnKey === TableViewHeaderKeys.ACTIONS

// don't show the resize handle if the column is a special column
const showResizeHandle = (column: TableViewHeader, previous: boolean = false): boolean => {
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

const showPagination = computed((): boolean => {
  if (props.hidePagination || props.nested) {
    return false
  }

  if (props.hidePaginationWhenOptional && !!props.data.length && props.paginationAttributes.totalCount && props.paginationAttributes.totalCount <= props.data.length) {
    return false
  }

  return true
})

// Ensure `props.headers` are reactive.
watch(() => props.headers, (newVal: TableViewHeader[]) => {
  if (newVal && newVal.length) {
    /**
     * Reorder the headers to ensure bulk actions are first and actions are last
     */

    const headers: TableViewHeader[] = newVal.filter((header) => header.key !== TableViewHeaderKeys.BULK_ACTIONS && header.key !== TableViewHeaderKeys.ACTIONS)

    const bulkActionsHeader = newVal.find((header: TableViewHeader) => header.key === TableViewHeaderKeys.BULK_ACTIONS)
    const actionsHeader = newVal.find((header: TableViewHeader) => header.key === TableViewHeaderKeys.ACTIONS)

    if (bulkActionsHeader) {
      headers.unshift(bulkActionsHeader)
    }

    if (actionsHeader) {
      headers.push(actionsHeader)
    }

    tableHeaders.value = headers
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
  if (event && event.target && (typeof event.target.scrollTop === 'number' || typeof event.target.scrollLeft === 'number')) {
    if (event.target.scrollTop > 1) {
      isScrollableVertically.value = true
      isScrolledVertically.value = true
    } else if (event.target.scrollTop === 0) {
      isScrolledVertically.value = false
    }

    if (event.target.scrollLeft > 1) {
      isScrolledHorizontally.value = true
    } else if (event.target.scrollLeft === 0) {
      isScrolledHorizontally.value = false
    }

    // determine if there's still room to scroll right
    if (event.target.scrollWidth === event.target.scrollLeft + event.target.clientWidth) {
      isScrollableRight.value = false
    } else {
      isScrollableRight.value = true
    }
  }
}

const getRowState = (row: Record<string, any>): TableViewSelectState | undefined => {
  return dataSelectState.value.find((rowState) => rowState.rowKey === getRowKey(row))
}

const getRowBulkActionEnabled = (row: Record<string, any>): boolean => {
  if (typeof props.rowBulkActionEnabled !== 'function') {
    return false
  }

  const rowBulkActionEnabledValue = props.rowBulkActionEnabled(row)

  if (typeof rowBulkActionEnabledValue === 'boolean') {
    return rowBulkActionEnabledValue
  }

  return rowBulkActionEnabledValue.enabled
}

const getRowBulkActionTooltip = (row: Record<string, any>): string => {
  if (typeof props.rowBulkActionEnabled !== 'function') {
    return ''
  }

  const rowBulkActionEnabledValue = props.rowBulkActionEnabled(row)

  if (typeof rowBulkActionEnabledValue === 'boolean') {
    return ''
  }

  return rowBulkActionEnabledValue.disabledTooltip || ''
}

// determine the component to use for the row link
const getRowLinkComponent = (row: Record<string, any>, columnKey: string): string => {
  const { to }: { to?: string | object } = props.rowLink(row)

  if (!to || columnKey === TableViewHeaderKeys.BULK_ACTIONS || columnKey === TableViewHeaderKeys.ACTIONS) {
    return 'div'
  }

  return typeof to === 'object' ? 'router-link' : 'a'
}

// returns attributes for the wrapper element in each row link
const getRowLinkAttrs = (row: Record<string, any>, columnKey: string): Record<string, any> => {
  // if the column is the actions column, return an empty object
  if (columnKey === TableViewHeaderKeys.BULK_ACTIONS || columnKey === TableViewHeaderKeys.ACTIONS) {
    return {}
  }

  const { to, target }: { to?: string | object, target?: string } = props.rowLink(row)
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


const paginationPageSize = ref<number>(getInitialPageSize(props.tablePreferences, props.paginationAttributes))
const onPaginationPageSizeChange = (data: PageSizeChangeData): void => {
  paginationPageSize.value = data.pageSize
  emit('page-size-change', data)

  // Emit an event whenever one of the tablePreferences are updated
  emitTablePreferences()
}

// Store the tablePreferences in a computed property to utilize in the watcher
const computedTablePreferences = computed((): TablePreferences => ({
  sortColumnKey: sortColumnKey.value,
  sortColumnOrder: sortColumnOrder.value as 'asc' | 'desc',
  ...(props.resizeColumns ? { columnWidths: columnWidths.value } : {}),
  ...(hasHidableColumns.value ? { columnVisibility: columnVisibility.value } : {}),
  ...(paginationPageSize.value && !props.hidePagination && { pageSize: paginationPageSize.value }),
}))

const emitTablePreferences = (): void => {
  emit('update:table-preferences', computedTablePreferences.value)
}

const hasExpandableRows = computed((): boolean => !props.nested && props.data.some((row: Record<string, any>) => props.rowExpandable(row)))
const expandableRowHeader = { key: TableViewHeaderKeys.EXPANDABLE, label: 'Expandable rows controls', hideLabel: true }
/**
 * Get the expanded rows from the prop
 */
const getExpandedRows = (): number[] => {
  const initialExpandedRows: number[] = []

  props.data.forEach((row, index) => {
    if (props.rowExpanded(row)) {
      initialExpandedRows.push(index)
    }
  })

  return initialExpandedRows
}
const expandedRows = ref<number[]>(getExpandedRows())
/**
 * Toggle visibility of expendable row content
 */
const toggleRow = async (rowIndex: number, row: any): Promise<void> => {
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
const getNestedTableHeaders = computed((): TableViewHeader[] => visibleHeaders.value.filter((header: TableViewHeader) => header.key !== TableViewHeaderKeys.EXPANDABLE && header.key !== TableViewHeaderKeys.BULK_ACTIONS))

/**
 * Function that calculates client width of each column and sets the actualColumnWidths
 * actualColumnWidths passed as slot prop to the nested table
 */
const actualColumnWidths = ref<Record<string, number>>({})
const setActualColumnWidths = (): void => {
  const table = document?.querySelector(`[data-tableid="${tableId}"]`)
  const headers = table?.querySelectorAll('th')
  const widths: Record<string, number> = {}

  headers?.forEach((header, index) => {
    const key = header.getAttribute('data-key')

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

    widths[key!] = width
  })

  actualColumnWidths.value = widths
}

watch([columnVisibility, tableHeaders, hasExpandableRows], (newVals) => {
  const [newVisibility, newHeaders, newExpandableRows] = newVals

  let newVisibleHeaders = newHeaders.filter((header: TableViewHeader) => {
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
    columnVisibility.value = props.tablePreferences.columnVisibility || {}
  }
}, { immediate: true })

const bulkActionsAll = ref<boolean>(false)

const isBulkActionsIndeterminate = computed((): boolean => {
  // ignore thee disabled rows
  const selectableRowsState = dataSelectState.value.filter((rowState) => !rowState.disabled && props.data.find((row) => getRowKey(row) === rowState.rowKey))

  // it is indeterminate if there are selected and unselected rows
  return !!selectableRowsState.filter((rowState) => rowState.selected).length && !!selectableRowsState.filter((rowState) => !rowState.selected).length
})

const handleIndeterminateChange = (value: boolean) => {
  // assign the value to all selectable rows which will result in either selecting or deselecting all selectable rows
  dataSelectState.value.forEach((rowState) => {
    if (props.data.find((row) => getRowKey(row) === rowState.rowKey) && !rowState.disabled) {
      rowState.selected = value
    }
  })
}

/**
 * Watch for changes in data and dataSelectState
 */
watch([() => props.data, dataSelectState], (newVals) => {
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
    if (selectableRowsState.filter((rowState) => rowState.selected).length === selectableRowsState.length) {
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
    const newSelectedRows: TableViewData = newData.filter((row) => {
      const rowState = newDataSelectState.find((rowState) => rowState.rowKey === getRowKey(row))

      if (rowState && rowState.selected) {
        return true
      }

      return false
    })

    // find all selected rows from the old state
    const oldSelectedRows: TableViewData = []
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

watch(() => props.tablePreferences, (newVal) => {
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
