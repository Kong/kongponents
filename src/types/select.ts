export interface SelectItem extends Record<string, any> {
  label: string
  value: string | number
  key?: string
  selected?: boolean
  disabled?: boolean
  group?: string
}

export interface SelectFilterFunctionParams {
  query: string
  items: SelectItem[]
}

export interface SelectItemWithGroup extends SelectItem {
  group: string
}

export type SelectDropdownFooterTextPosition = 'sticky' | 'static'
