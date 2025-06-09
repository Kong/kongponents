export interface BreadcrumbItem {
  /** router-link "to" object or href string */
  to?: object | string
  /** Breadcrumb text that will appear inside of an anchor tag */
  text?: string
  /** Will be used for html title attribute on the anchor tag, helpful when text is truncated */
  title?: string
  /** Identifier, must be unique for each breadcrumb item */
  key?: string
  maxWidth?: number | string
}

export interface BreadcrumbProps {
  /**
   * An array of breadcrumb items.
   * @type {BreadcrumbItem[]}
   */
  items: BreadcrumbItem[]

  /**
   * Maximum width of each breadcrumb item for truncating to ellipsis.
   * @default '100px'
   */
  itemMaxWidth?: number | string
}
