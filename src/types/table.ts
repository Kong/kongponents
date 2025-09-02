import type { RouterLinkProps } from 'vue-router'
import type { ButtonAppearance, EmptyStateIconVariant, PageChangeData, PageSizeChangeData, PaginationProps, SwrvStateData } from '@/types'

/**
 * @internal
 */
export interface BulkActionsDropdownProps {
  disabled?: boolean
  count?: string
  buttonLabel?: string
}

/**
 * @internal
 */
export interface BulkActionsDropdownSlots {
  items?(): any
}

/**
 * @internal
 */
export interface ColumnVisibilityMenuProps {
  columns: Array<Record<string, any>>
  tableId: string
  visibilityPreferences: Partial<Record<string, boolean>>
  disabled?: boolean
}

export interface ColumnVisibilityMenuEmits {
  update: [columnVisibility: Record<string, boolean>]
}

export type SortColumnOrder = 'asc' | 'desc'
export type TableReservedColumnKey = 'expandable' | 'actions' | 'bulkActions'
export type TableColumnKey<T extends TableViewHeader | TableDataHeader> = T['key'] | TableReservedColumnKey
export type TableColumnVisibility<T extends TableViewHeader | TableDataHeader> = NonNullable<TablePreferences<TableColumnKey<T>>['columnVisibility']>
export type TableColumnWidths<T extends TableViewHeader | TableDataHeader> = NonNullable<TablePreferences<TableColumnKey<T>>['columnWidths']>

export interface TablePreferences<Key extends string = string> {
  /** The number of items to display per page */
  pageSize?: number
  /** The column to sort by's `key` defined in the table headers */
  sortColumnKey?: Key | ''
  /** The order by which to sort the column, one of `asc` or `desc` */
  sortColumnOrder?: SortColumnOrder
  /** The customized column widths, if resizing is allowed */
  columnWidths?: Partial<Record<Key | TableReservedColumnKey, number>>
  /** Column visibility, if visibility is toggleable */
  columnVisibility?: Partial<Record<Key | TableReservedColumnKey, boolean>>
}

export type TableViewData<Row extends Record<string, any> = Record<string, any>> = Row[]

/**
 * @deprecated in favor of TableDataHeader
 */
export interface TableHeader {
  /** Must be unique for each column */
  key: string
  /** Visible column header text */
  label?: string
  /** This property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** Allow toggling column visibility */
  hidable?: boolean
  /** When provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** Whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
  /** Whether KTable should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}

export interface TableViewHeader<Key extends string = string> {
  /** Must be unique for each column */
  key: Key
  /** Visible column header text */
  label?: string
  /** This property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** Allow toggling column visibility */
  hidable?: boolean
  /** When provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** Whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
}

export interface TableDataHeader<Key extends string = string> extends TableViewHeader<Key> {
  /** Whether KTable should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}

/**
 * Provide a type interface for KTable `column-*` and `tooltip-*` slot names.
 *
 * This helps TypeScript infer the slot name in the template section so that
 * the slot props can be resolved.
 */
export type TableColumnSlotName<Key extends string = string> = `column-${Key}`
export type TableColumnTooltipSlotName<Key extends string = string> = `tooltip-${Key}`

export type TableState = 'loading' | 'error' | 'success' | 'empty'

export interface TableSortPayload<Key extends string = string> {
  prevKey: Key | ''
  sortColumnKey: Key | ''
  sortColumnOrder: SortColumnOrder
}
export interface TableStatePayload {
  state: TableState
  hasData: boolean
}

export interface RowLink {
  /** RouteLocationRaw or url string for row link */
  to?: RouterLinkProps['to']
  /** Target for row link */
  target?: '_self' | '_blank' | '_parent' | '_top'
}

export type TablePaginationAttributes = Pick<PaginationProps<any>,
  | 'totalCount'
  | 'pageSizes'
  | 'initialPageSize'
  | 'currentPage'
  | 'offset'
  | 'disablePageJump'
  | 'offsetPreviousButtonDisabled'
  | 'offsetNextButtonDisabled'
>

export type RowBulkAction = boolean | { enabled: boolean, disabledTooltip?: string }

export interface SortHandlerFunctionParam<Key extends string = string, Row extends Record<string, any> = Record<string, any>> {
  /** The key of the column to be sorted */
  key: Key
  /** The key of the column previously sorted */
  prevKey: Key
  /** The order in which to sort the column (asc or desc) */
  sortColumnOrder: SortColumnOrder
  /** The data returned from the fetcher function response */
  data: Row[]
}

/**
 * Parameter object for the cellAttrs prop function
 */
export interface CellAttrsParam<Key extends string = string, Row extends Record<string, any> = Record<string, any>> {
  headerKey: Key
  row: Row
  rowIndex: number
  colIndex: number
}

type SupportedEvents =
  | 'click'
  | 'dblclick'
  | 'auxclick'
  | 'contextmenu'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousedown'
  | 'mouseup'
  | 'focus'
  | 'focusin'
  | 'blur'
  | 'focusout'
  | 'keydown'
  | 'keyup'
  | 'keypress'

export interface TableDataFetcherParams<Key extends string = string, Offset extends string | number = string> {
  /**
   * The number of items to display per page.
   */
  pageSize?: number
  /**
   * The currently active page.
   */
  page?: number
  /**
   * A text string to filter table data on (defined in the searchInput prop).
   */
  query?: string
  /**
   * Sortable column key (defined in the headers prop).
   */
  sortColumnKey?: Key
  /**
   * Sorting order.
   */
  sortColumnOrder?: SortColumnOrder
  /**
   * The value of the offset for offset-based pagination. Offset must be included in the fetcher params for offset-based pagination to work properly.
   */
  offset?: Offset | null
}

export interface TableDataFetcherResponse<Data extends ReadonlyArray<Record<string, any>> = ReadonlyArray<Record<string, any>>, Offset extends string | number = string> {
  data: Data
  total?: number
  pagination?: {
    offset?: Offset | null
    hasNextPage?: boolean
  }
}

export interface TableViewSelectState<Row extends Record<string, any> = Record<string, any>> {
  rowKey: keyof Row
  selected: boolean
  disabled: boolean
}

export enum TableViewHeaderKeys {
  EXPANDABLE = 'expandable',
  ACTIONS = 'actions',
  BULK_ACTIONS = 'bulkActions',
}

export interface RowExpandPayload<Row extends Record<string, any> = Record<string, any>> {
  row: Row
  expanded: boolean
}

export interface RowActionsTogglePayload<Row extends Record<string, any> = Record<string, any>> {
  row: Row
  open: boolean
}

type TablePropsShared<
  Key extends string, // column keys
  Data extends ReadonlyArray<Record<string, any>>, // data row
> = {
  /**
   * Allow columns to be resized.
   * @default false
   */
  resizeColumns?: boolean

  /**
   * Used to customize the initial state of the table.
   * Column visibility/width.
   * @default {}
   */
  tablePreferences?: NoInfer<TablePreferences<Key>>

  /**
   * Enables hover highlighting to table rows.
   * @default true
   */
  rowHover?: boolean

  /**
   * A function that conditionally specifies row attributes on each row.
   * @default () => ({})
   */
  rowAttrs?: NoInfer<(row: Data[number]) => Record<string, any>>

  /**
   * A function that conditionally turns a row into a link.
   * @default () => ({})
   */
  rowLink?: NoInfer<(row: Data[number]) => RowLink>

  /**
   * A function that conditionally specifies whether bulk actions are disabled for a row and the tooltip to display.
   * @default () => true
   */
  rowBulkActionEnabled?: NoInfer<(row: Data[number]) => RowBulkAction>

  /**
   * Provide the name of the data property key to utilize as a unique identifier, or a function that receives the `row` object as a parameter that generates a unique identifier string for each row.
   */
  rowKey?: NoInfer<keyof Data[number] | ((row: Data[number]) => string)>

  /**
   * A function that conditionally specifies cell attributes.
   * @default () => ({})
   */
  cellAttrs?: NoInfer<(param: CellAttrsParam<Key | TableReservedColumnKey, Data[number]>) => Record<string, any>>

  /**
   * A prop that enables a loading skeleton.
   * @default false
   */
  loading?: boolean

  /**
   * A prop to pass in a custom empty state title.
   * @default 'No Data'
   */
  emptyStateTitle?: string

  /**
   * A prop to pass in a custom empty state message.
   * @default 'There is no data to display.'
   */
  emptyStateMessage?: string

  /**
   * A prop to pass in a custom empty state action route.
   */
  emptyStateActionRoute?: RouterLinkProps['to']

  /**
   * A prop to pass in a custom empty state action message.
   * @default ''
   */
  emptyStateActionMessage?: string

  /**
   * A prop to pass in a custom empty state icon variant.
   * One of ['default', 'error', 'search', 'kong'].
   * @default 'default'
   */
  emptyStateIconVariant?: EmptyStateIconVariant

  /**
   * A prop to pass in a custom empty state button appearance.
   * @default 'primary'
   */
  emptyStateButtonAppearance?: ButtonAppearance

  /**
   * A prop that enables the error state.
   * @default false
   */
  error?: boolean

  /**
   * A prop to pass in a custom error state title.
   * @default 'An error occurred'
   */
  errorStateTitle?: string

  /**
   * A prop to pass in a custom error state message.
   * @default 'Data cannot be displayed due to an error.'
   */
  errorStateMessage?: string

  /**
   * A prop to pass in a custom error state action route.
   */
  errorStateActionRoute?: RouterLinkProps['to']

  /**
   * A prop to pass in a custom error state action message.
   * @default ''
   */
  errorStateActionMessage?: string

  /**
   * Limit the table height by passing a number, in pixels.
   * @default 'none'
   */
  maxHeight?: number | string

  /**
   * Whether to hide pagination element.
   * @default false
   */
  hidePagination?: boolean

  /**
   * Object to be passed to underlying pagination component.
   * @default {}
   */
  paginationAttributes?: TablePaginationAttributes

  /**
   * Enable expandable rows.
   * @default () => false
   */
  rowExpandable?: NoInfer<(row: Data[number]) => boolean>

  /**
   * A function that conditionally specifies whether a row is expanded or not.
   * @default () => false
   */
  rowExpanded?: NoInfer<(row: Data[number]) => boolean>

  /**
   * Hide the table header.
   * @default false
   */
  hideHeaders?: boolean

  /**
   * Nested table.
   * @default false
   */
  nested?: boolean

  /**
   * A boolean to hide pagination when total table records number is less than or equal to page size.
   * @default false
   */
  hidePaginationWhenOptional?: boolean

  /**
   * A prop for hiding the toolbar.
   * @default false
   */
  hideToolbar?: boolean

  /**
   * Target for tooltip teleports (column header tooltip, disabled bulk actions row tooltip).
   * @default 'body'
   */
  tooltipTarget?: string | null
} & {
  /**
   * Emitted when the user clicks on a table row.
   */
  [K in `onRow:${SupportedEvents}`]?: (
    e: K extends `onRow:${infer E}`
      ? E extends keyof HTMLElementEventMap
        ? HTMLElementEventMap[E]
        : Event
      : never,
    data: NoInfer<Data[number]>,
    type: 'row'
  ) => any
} & {
  /**
   * Emitted when the user clicks on a table cell.
   */
  [K in `onCell:${SupportedEvents}`]?: (
    e: K extends `onCell:${infer E}`
      ? E extends keyof HTMLElementEventMap
        ? HTMLElementEventMap[E]
        : Event
      : never,
    data: any,
    type: 'cell'
  ) => any
}

interface TableEmitsShared<
  Key extends string, // column keys
  Data extends ReadonlyArray<Record<string, any>>,
> {
  /**
   * Emitted whenever a cell is clicked.
   */
  'cell-click': [payload: { data: any }]

  /**
   * emitted whenever a row is clicked.
   */
  'row-click': [payload: { data: Data[number] }]

  /**
   * Emitted when error state action button is clicked.
   */
  'error-action-click': []

  /**
   * Emitted when empty state action button is clicked.
   */
  'empty-state-action-click': []

  /**
   * Emitted when the user performs sorting, resizes columns or toggles column visibility.
   */
  'update:table-preferences': [preferences: TablePreferences<Key>]

  /**
   * Emitted when user clicks on a sortable column heading.
   */
  sort: [payload: TableSortPayload<Key>]

  /**
   * Emitted when user interacts with checkboxes in bulk actions column.
   */
  'row-select': [data: Array<Data[number]>]

  /**
   * Emitted when row is expanded or collapsed (when `rowExpandable` prop is true).
   */
  'update:row-expanded': [payload: RowExpandPayload<Data[number]>]

  /**
   * Emitted when actions dropdown is opened and closed.
   */
  'row-actions-toggle': [payload: RowActionsTogglePayload<Data[number]>]
}

type TableCellSlotProps<Header extends TableViewHeader, Data extends ReadonlyArray<Record<string, any>>> = {
  row: Data[number]
  rowKey: number
  rowValue: unknown extends Data[number][Header['key']] ? any : Data[number][Header['key']]
}

type TableSlotsShared<Header extends TableViewHeader, Data extends ReadonlyArray<Record<string, any>>> = {
  /**
   * Slot for passing custom bulk actions trigger element.
   */
  'bulk-actions'?(props: { selectedRows: Array<Data[number]> }): any

  /**
   * Slot for passing bulk action dropdown items.
   */
  'bulk-action-items'?(props: { selectedRows: Array<Data[number]> }): any

  /**
   * Slot for passing action dropdown items.
   */
  'action-items'?(props: { row: Data[number] }): any

  /**
   * Slot for passing custom content that will be revealed once user expands one of the table rows when `rowExpandable` prop is true.
   */
  'row-expanded'?(props: { row: Data[number], columnWidths: TableColumnWidths<Header>, nestedHeaders: Header[] }): any

  /**
   * Slot content to be displayed when empty.
   */
  'empty-state'?(): any

  /**
   * Slot for icon to be displayed in front of action button text in empty state.
   */
  'empty-state-action-icon'?(): any

  /**
   * Slot content to be displayed when in error state.
   */
  'error-state'?(): any

  'column-actions'?(): (props: { column: TableViewHeader<'actions'> }) => any

  'column-expandable'?(): (props: { column: TableViewHeader<'expandable'> }) => any

  'tooltip-actions'?(): (props: { column: TableViewHeader<'actions'> }) => any

  'tooltip-expandable'?(): (props: { column: TableViewHeader<'expandable'> }) => any

  'tooltip-bulkActions'?(): (props: { column: TableViewHeader<'bulkActions'> }) => any
} & {
  /**
   * Each column header's content.
   */
  [K in TableColumnSlotName<Header['key']>]?: (props: { column: TableViewHeader<Header['key']> }) => any
} & {
  /**
   * Each column header's tooltip content.
   */
  [K in TableColumnTooltipSlotName<Header['key']>]?: (props: { column: TableViewHeader<Header['key']> }) => any
} & {
  /**
   * Each individual cell's content.
   */
  [K in Header['key']]?: (props: TableCellSlotProps<TableViewHeader, Data>) => any
}

export interface TableViewProps<
  Header extends TableViewHeader = TableViewHeader, // column
  Data extends ReadonlyArray<Record<string, any>> = ReadonlyArray<Record<string, any>>, // data row
> extends TablePropsShared<Header['key'], Data> {
  /**
   * Data to be rendered in the table.
   */
  data: Data

  /**
   * A prop to pass in an array of headers for the table.
   */
  headers: readonly Header[]
}

export interface TableViewEmits<
  Header extends TableViewHeader, // column
  Data extends ReadonlyArray<Record<string, any>>, // data row
> extends TableEmitsShared<Header['key'], Data> {
  /**
   * Emitted when the page has been changed.
   */
  'page-change': [payload: PageChangeData]

  /**
   * Emitted when the number of items per page has been changed.
   */
  'page-size-change': [payload: PageSizeChangeData]

  /**
   * Emitted when next arrow button clicked when `paginationAttributes.offset` is true.
   */
  'get-next-offset': []

  /**
   * Emitted when previous arrow button clicked when `paginationAttributes.offset` is true.
   */
  'get-previous-offset': []
}

export type TableViewSlots<
  Header extends TableViewHeader,
  Data extends ReadonlyArray<Record<string, any>>,
> = TableSlotsShared<Header, Data> & {
  /**
   * The toolbar is rendered directly above the table and is useful for providing table controls like search or filter fields.
   */
  toolbar?(): any
}

export interface TableDataProps<
  Header extends TableDataHeader = TableDataHeader,
  Data extends ReadonlyArray<Record<string, any>> = ReadonlyArray<Record<string, any>>,
  Offset extends string | number = string, // offset type
> extends TablePropsShared<Header['key'], Data> {
  /**
   * Function that handles data fetching and pagination.
   */
  fetcher: (params: TableDataFetcherParams<Header['key'], Offset>) =>
    | Promise<TableDataFetcherResponse<Data, Offset> | undefined>
    | TableDataFetcherResponse<Data, Offset> | undefined

  /**
   * A prop to pass in an array of headers for the table.
   */
  headers: readonly Header[]

  /**
   * Whenever the cache key is changed the fetcher will automatically be called and attempt to fetch new table data.
   */
  fetcherCacheKey?: string

  /**
   * The cache identifier for the underlying SWRV cache.
   * @default '''
   */
  cacheIdentifier?: string

  /**
   * A string that will passed to fetcher function and can be used to modify the API request to perform data filtering.
   * @default ''
   */
  searchInput?: string

  /**
   * The fetcher params to be applied to initial fetcher call.
   * @default {}
   */
  initialFetcherParams?: NoInfer<TableDataFetcherParams<Header['key'], Offset>>

  /**
   * Whether to enable client-side sorting if using a fetcher that returns unpaginated data.
   * @default false
   */
  clientSort?: boolean

  /**
   * A custom sort handler function to handle sorting table data for specific columns.
   */
  sortHandlerFunction?: NoInfer<(param: SortHandlerFunctionParam<Header['key'], Data[number]>) => Data>

  /**
   * Whether the table sorting is enabled.
   * @default true
   */
  sortable?: boolean
}

export interface TableDataEmits<
  Header extends TableViewHeader, // column
  Data extends ReadonlyArray<Record<string, any>>, // data row
> extends TableEmitsShared<Header['key'], Data> {
  /**
   * Emitted when the table state changes.
   */
  state: [payload: TableStatePayload]
}

export type TableDataSlots<
  Header extends TableViewHeader,
  Data extends ReadonlyArray<Record<string, any>>,
> = TableSlotsShared<Header, Data> & {
  /**
   * The toolbar is rendered directly above the table and is useful for providing table controls like search or filter fields.
   */
  toolbar?(props: { state: SwrvStateData }): any
}
