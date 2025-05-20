import type { AnyElementOf } from '@/types/utils'
import type { HeaderTag } from './card'
import type { ButtonProps } from './button'
import type { EmptyStateIconVariant } from './empty-state'
import type { SwrvStateData } from './swrv'

export interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}

export const CardSizeArray = ['large', 'medium', 'small'] as const

export type CardSize = AnyElementOf<typeof CardSizeArray>

export interface CatalogItem extends Record<string, any> {
  id?: string | null
  title?: string | null
  description?: string | null
  /** Optional parameter to be used as key in v-for, has to be unique for each item */
  key?: string | null
}

export type CatalogState = 'loading' | 'error' | 'success'

export interface CatalogItemProps<T extends CatalogItem | undefined> {
  /**
   * Object instance of CatalogItem from which card content is built.
   */
  item?: T

  /**
   * Whether or not to truncate the description text.
   * @default true
   */
  truncate?: boolean
}

export interface CatalogItemEmits<T extends CatalogItem | undefined> {
  /**
   * Fired when item is clicked. Event payload is item object.
   */
  click: [args: { evt: MouseEvent, item: T extends CatalogItem ? T : undefined }]
}

export interface CatalogItemSlots {
  /**
   * The title content for the card.
   */
  'card-title'?(): any

  /**
   * The body content for the card.
   */
  'card-body'?(): any

  /**
   * The footer content for the card.
   */
  'card-footer'?(): any

  /**
   * Action elements to be rendered to the right of the card title.
   */
  'card-actions'?(): any
}

export interface CatalogFetcherParams {
  query: string
  page: number
  pageSize: number
  offset: string | null
}

export interface CatalogFetcherResponse<T extends readonly CatalogItem[] = readonly CatalogItem[]> {
  data: T
  total?: number
  pagination?: {
    offset?: string | null
    hasNextPage?: boolean
  }
}

export interface CatalogProps<T extends readonly CatalogItem[] = readonly CatalogItem[]> {
  /**
   * HTML element you want title to be rendered as.
   * One of ['div', 'p', 'span', 'a', 'legend', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].
   * @default 'div'
   */
  titleTag?: HeaderTag

  /**
   * A prop to pass in to display skeleton to indicate loading.
   * @default false
   */
  loading?: boolean

  /**
   * Base styling of the card.
   * One of ['large', 'medium', 'small'].
   * @default 'medium'
   */
  cardSize?: CardSize

  /**
   * Card catalog title.
   * @default ''
   */
  title?: string

  /**
   * By default long card body text is truncated at 3 lines.
   * Set this prop to false to turn truncation off.
   * @default true
   */
  truncateDescription?: boolean

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
   * @default ''
   */
  emptyStateActionRoute?: ButtonProps['to']

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
   * @default ''
   */
  errorStateActionRoute?: ButtonProps['to']

  /**
   * A prop to pass in a custom error state action message.
   * @default ''
   */
  errorStateActionMessage?: string

  /**
   * A prop to pass in a fetcher function to enable server-side pagination.
   */
  fetcher: (params: CatalogFetcherParams) =>
    | Promise<CatalogFetcherResponse<T> | undefined>
    | CatalogFetcherResponse<T> | undefined

  /**
   * A prop to pass in a an object of initial params for the initial fetcher function call.
   * @default null
   */
  initialFetcherParams?: Partial<CatalogFetcherParams> | null

  /**
   * A prop used to uniquely identify this catalog in the swrv cache.
   * @default ''
   */
  cacheIdentifier?: string

  /**
   * A prop to trigger a revalidate of the fetcher function. Modifying this value
   * will trigger a manual refetch of the table data.
   * @default ''
   */
  fetcherCacheKey?: string

  /**
   * A prop to pass in a search string for server-side search.
   * @default ''
   */
  searchInput?: string

  /**
   * A prop to pass in a the number of pagination neighbors used by the pagination component.
   * @default 1
   */
  paginationNeighbors?: number

  /**
   * A prop to pass in an array of page sizes used by the pagination component.
   * @default [15, 30, 50, 75, 100]
   */
  paginationPageSizes?: number[]

  /**
   * A prop to pass the total number of items in the set for the pagination text.
   * @default null
   */
  paginationTotalItems?: number | null

  /**
   * Restrict navigation to only previous/next page.
   * @default false
   */
  disablePaginationPageJump?: boolean

  /**
   * When true, hides pagination.
   * @default false
   */
  disablePagination?: boolean

  /**
   * A prop to pass to hide pagination for total table records is less than or equal to pagesize.
   * @default false
   */
  hidePaginationWhenOptional?: boolean

  /**
   * Boolean prop to enable offset-based pagination
   * @default false
   */
  paginationOffset?: boolean
}

export interface CatalogEmits<T extends readonly CatalogItem[]> {
  /**
   * Emitted when a KCatalogItem is clicked, the payload is the clicked item's object.
   */
  'card-click': NoInfer<[item: T[number]]>

  /**
   * Emitted when error state action button is clicked.
   */
  'error-action-click': []

  /**
   * Emitted when empty state action button is clocked.
   */
  'empty-state-action-click': []

  /**
   * Fired when the user changes the catalog's pageSize.
   */
  'update:catalog-preferences': [preferences: CatalogPreferences]

  /**
   * Fired when the catalog state changes.
   */
  state: [value: { state: CatalogState, hasData: boolean }]
}

export interface CatalogSlots<T extends readonly CatalogItem[]> {
  /**
   * The body of the card catalog, if you do not want to use KCatalogItem components for the children.
   */
  body?: NoInfer<(props: { data: T }) => any>

  /**
   * Will slot the card title for each entry.
   */
  'card-title'?: NoInfer<(props: { item: T[number] }) => any>

  /**
   * Slot the card actions for each entry.
   */
  'card-actions'?: NoInfer<(props: { item: T[number] }) => any>

  /**
   * Will slot the card body for each entry.
   */
  'card-body'?: NoInfer<(props: { item: T[number] }) => any>

  /**
   * Will slot catalog controls rendered at the top of the .k-catalog element such as a search input or other UI elements.
   */
  toolbar?(props: { state: SwrvStateData }): any

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
}
