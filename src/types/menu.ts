export type MenuType = 'string' | 'number' | 'divider'
export type MenuTypeRecord = Record<MenuType, MenuType>

export interface MenuItem {
  title: string
  description?: string
}

export interface KMenuItemType extends MenuItem {
  expandable: boolean
  type: MenuType
}
