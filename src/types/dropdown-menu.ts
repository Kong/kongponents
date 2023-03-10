export interface DropdownItem {
  label: string
  // This follows the vue-router RawLocation interface type
  to?: string | object
  value?: string | number
  selected?: boolean
}

export type Appearance = 'menu' | 'selectionMenu';
export type AppearanceRecord = Record<Appearance, Appearance>
