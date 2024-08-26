export interface TreeListItem {
  name: string
  id: string
  selected?: boolean
  children?: TreeListItem[]
}

export interface TreeListChangeEvent {
  items: TreeListItem[]
  target: {
    element: TreeListItem
    newIndex?: number
    oldIndex?: number
  }
}

export interface TreeListChildChangeEvent {
  parentId: string
  children: TreeListItem[]
  target: {
    element: TreeListItem
    newIndex?: number
    oldIndex?: number
  }
}

export interface DropEvent {
  item: TreeListItem
  parent: TreeListItem
}
