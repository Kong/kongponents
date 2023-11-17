export interface SelectItem extends Record<string, any> {
  label: string
  value: string | number
  key?: string
  selected?: boolean
  disabled?: boolean
  group?: string
}

export interface SelectItemWithGroup extends SelectItem {
  group: string
}

export type SelectDropdownFooterTextPosition = 'sticky' | 'static'

export interface SelectQueryChangeParams {
  query: string
  items: SelectItem[]
}
