export interface BreadcrumbItem {
  to?: object | string // router-link "to" object or href string
  text?: string // breadcrumb text that will appear inside of anchor tag
  title?: string // will be used for html title attribute on the anchor tag, helpful when text is truncated
  key?: string // identifier, must be unique for each breadcrumb item
  maxWidth?: string
}
