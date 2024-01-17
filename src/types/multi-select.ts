export interface MultiselectItem {
  label: string
  value: string
  key?: string
  selected?: boolean
  disabled?: boolean
  custom?: boolean
  group?: string
}

export interface MultiselectFilterFunctionParams {
  items: MultiselectItem[]
  query: string
}

export type DropdownFooterTextPosition = 'sticky' | 'static'
