import { AnyElementOf } from '@/types/utils'

export interface SelectItem {
  label: string
  value: string | number
  key?: string
  selected?: boolean
  disabled?: boolean
  group?: string
}

export interface SelectFilterFnParams {
  items: SelectItem[]
  query: string
}

export interface SelectItemWithGroup extends SelectItem {
  group: string
}

export type SelectDropdownFooterTextPosition = 'sticky' | 'static'

export const SelectAppearanceArray = ['dropdown', 'select', 'button'] as const

export type SelectAppearance = AnyElementOf<typeof SelectAppearanceArray>
