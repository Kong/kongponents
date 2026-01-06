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

/**
 * @internal
 */
export interface TreeListItemProps {
  item: TreeListItem
  disabled?: boolean
  hideIcons?: boolean
  collapsible?: boolean
  initialCollapse?: boolean
  hasChildren?: boolean
  controlsId: string
}

/**
 * @internal
 */
export interface TreeListItemEmits {
  selected: [item: TreeListItem]
  expanded: [val: boolean]
}

/**
 * @internal
 */
export interface TreeListItemSlots {
  'item-icon'?(): any
  'item-label'?(): any
}

/**
 * @internal
 */
export interface TreeDraggableProps {
  items: TreeListItem[]
  disableDrag: boolean
  filter: string | (() => string)
  maxDepth: number
  level?: number
  parentId?: string
  hideIcons: boolean
  group: string
  collapsible: boolean
  initialCollapseAll: boolean
}

/**
 * @internal
 */
export interface TreeDraggableEmits {
  change: [event: TreeListChangeEvent]
  'child-change': [event: TreeListChildChangeEvent]
  selected: [item: TreeListItem]
}

/**
 * @internal
 */
export interface TreeDraggableSlots {
  'item-icon'?(item: TreeListItem): any
  'item-label'?(item: TreeListItem): any
}

export interface TreeListProps {
  /**
   * An array of items that make up the tree.
   * You cannot use `v-model` with the `items` prop. You must use one or the other.
   * @default null
   */
  modelValue?: TreeListItem[]

  /**
   * An array of items that make up the tree.
   * You cannot use `v-model` with the `items` prop. You must use one or the other.
   * @default null
   */
  items?: TreeListItem[]

  /**
   * Whether to turn off drag-n-drop reordering of the list.
   * @default false
   */
  disableDrag?: boolean

  /**
   * A string or (function that returns a string) of selectors that should not result in dragging tree list items.
   * @default ''
   */
  ignoreDragSelectors?: string | (() => string)

  /**
   * The maximum supported depth of the tree.
   * @default 3
   */
  maxDepth?: number

  /**
   * The width of the tree list.
   * @default ''
   */
  width?: number | string

  /**
   * Whether to hide the icons.
   * @default false
   */
  hideIcons?: boolean

  /**
   * To drag elements from one list into another, both lists must have the same group value.
   * @default 'k-tree-list'
   */
  group?: string

  /**
   * Whether the collapse feature is enabled.
   * @default false
   */
  collapsible?: boolean

  /**
   * Whether to initially collapse all items in the tree.
   * @default false
   */
  initialCollapseAll?: boolean
}

export interface TreeListEmits {
  /**
   * Emitted when there is a change to the root level items.
   */
  change: [event: TreeListChangeEvent]

  /**
   * Emitted when an item is added or removed at the non-root level.
   */
  'child-change': [event: TreeListChildChangeEvent]

  /**
   * Emitted when you click (and don't drag) an item.
   */
  selected: [item: TreeListItem]
}

export interface TreeListSlots {
  /**
   * Slot for content displayed to the left of the item name in place of the default icon.
   */
  'item-icon'?(props: { item: TreeListItem }): any

  /**
   * Slot for the main content of an item (defaults to the `name` of the item).
   */
  'item-label'?(props: { item: TreeListItem }): any
}
