export interface BreadcrumbItem {
  /** router-link "to" object or href string */
  to?: object | string
  /** breadcrumb text that will appear inside of an anchor tag */
  text?: string
  /** will be used for html title attribute on the anchor tag, helpful when text is truncated */
  title?: string
  /** identifier, must be unique for each breadcrumb item */
  key?: string
  maxWidth?: string
}
