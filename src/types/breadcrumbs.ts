import { IconNames } from '@/types/icon'

export interface BreadcrumbItem {
  to: object | string // router-link "to" object or href string
  text?: string
  title?: string
  icon?: IconNames
  key?: string
  maxWidth?: string
}
