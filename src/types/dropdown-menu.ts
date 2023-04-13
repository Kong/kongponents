import { AnyElementOf } from '@/types'

export interface DropdownItem {
  label: string
  // This follows the vue-router RawLocation interface type
  to?: string | object
  value?: string | number
  selected?: boolean
  hasDivider?: boolean
}

export const AppearanceArray = ['menu', 'selectionMenu'] as const

export type Appearance = AnyElementOf<typeof AppearanceArray>

export type DropdownItemType = 'link' | 'button' | 'default'
