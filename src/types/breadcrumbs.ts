export interface BreadcrumbItem {
  /** router-link "to" object or href string */
  to?: object | string
  /** Breadcrumb text that will appear inside of an anchor tag */
  text?: string
  /** Will be used for html title attribute on the anchor tag, helpful when text is truncated */
  title?: string
  /** Identifier, must be unique for each breadcrumb item */
  key?: string
  maxWidth?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  itemMaxWidth?: string
}
