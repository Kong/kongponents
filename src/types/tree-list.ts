export interface TreeListItem {
  name: string
  id: string
  icon?: string
  selected?: boolean
  children?: TreeListItem[]
}

export interface ChangeEvent {
  items: TreeListItem[]
  target: TreeListItem
}

export interface ChildChangeEvent {
  parentId: string
  children: TreeListItem[]
  target: TreeListItem
}

export interface DropEvent {
  item: TreeListItem
  parent: TreeListItem
}
