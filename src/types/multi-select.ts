export interface MultiselectItem {
  label: string
  value: string
  key?: string
  selected?: boolean
  disabled?: boolean
  disabledTooltipText?: string
  custom?: boolean
  group?: string
}

export interface MultiselectFilterFnParams {
  items: MultiselectItem[]
  query: string
}

export type DropdownFooterTextPosition = 'sticky' | 'static'
