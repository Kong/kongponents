export interface BreadcrumbItem {
  to: object | string // router-link "to" object or href string
  text?: string
  title?: string
  icon?: string
  key?: string
  maxWidth?: string
}
