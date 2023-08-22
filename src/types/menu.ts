import type { AnyElementOf } from '@/types/utils'

export const MenuTypeArray = ['string', 'number', 'divider'] as const
export type MenuType = AnyElementOf<typeof MenuTypeArray>

export interface MenuItem {
  title: string
  description?: string
}

export interface KMenuItemType extends MenuItem {
  expandable?: boolean
  type: MenuType
}
