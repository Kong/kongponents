# Tree List

KTreeList is a drag-n-drop reorderable list component.

<KTreeList :items="defaultItems" />

```html
<KTreeList :items="items" />
```

## Props

### v-model

KTreeList works with v-model for data binding.

:::tip NOTE
The value provided to `v-model` should adhere to all the same constraints of the `items` property.
:::

<div class="vertical-container">
  <KTreeList class="tree-wrapper" v-model="myList" />
  <div>
    <KButton @click="reset">Reset</KButton>
  </div>
  <div class="value-wrapper"><b>Value:</b> <pre class="json hide-from-percy">{{ JSON.stringify(myList, null, 2) }}</pre></div>
</div>

```vue
<template>
  <KTreeList v-model="myList" />
  <KButton @click="reset">Reset</KButton>
  <b>Value:</b>
  <pre>{{ JSON.stringify(myList) }}</pre>
</template>

<script lang="ts" setup>
import type { TreeListItem } from '@kong/kongponents'

const items: TreeListItem[] = [
  {
    name: 'Components',
    id: 'components-folder',
    children: [
      {
        name: 'ProfileCard.vue',
        id: 'profile-card',
      },
    ],
  },
  {
    name: 'Pages',
    id: 'pages-folder',
    children: [
      {
        name: 'Home.vue',
        id: 'home',
      },
      ...
    ]
  }
]

const myList = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const reset = (): void => {
  myList.value = JSON.parse(JSON.stringify(items))
}
</script>
```

### items

An array of items that make up the tree.

```ts
interface TreeListItem {
  name: string // text displayed as the label for the item
  id: string // a unique `string` used to identify the item (note: `id`'s must be unique across all items and their children)
  selected?: boolean
  children?: TreeListItem[] // an array of items that will be treated as children of the current item
}
```

:::danger
You cannot use `v-model` with the `items` prop. You must use one or the other.
:::

<KTreeList :items="defaultItems2" />

```vue
<template>
  <KTreeList :items="items" />
</template>

<script setup lang="ts">
import type { TreeListItem } from '@kong/kongponents'

const items = ref<TreeListItem[]>([
  {
    name: 'Components',
    id: 'components-folder',
    children: [
      {
        name: 'ProfileCard.vue',
        id: 'profile-card',
      },
    ],
  },
  {
    name: 'Pages',
    id: 'pages-folder',
    children: [
      {
        name: 'Home.vue',
        id: 'home',
      },
      {
        name: 'User',
        id: 'user-folder',
        children: [
          {
            name: 'UserList.vue',
            id: 'user-list',
          },
          {
            name: 'UserDetail.vue',
            id: 'user-detail',
          },
          {
            name: 'Settings',
            id: 'settings-folder',
          },
        ],
      },
    ],
  },
  {
    name: 'Types',
    id: 'types-folder',
    children: [{
      name: 'user.d.ts',
      id: 'user-types',
    }],
  },
])
</script>
```

### disableDrag

Boolean to turn off drag-n-drop reordering of the list. Defaults to `false`.

<KTreeList disable-drag :items="disableItems" />

```html
<KTreeList disable-drag :items="items" />
```

### maxDepth

Use this prop to customize the maximum supported depth of the tree. The default value is `3`. The maximum supported value for `maxDepth` is 5.

:::tip NOTE
Try moving any item under the Settings item in the example below and compare it to any other example on this page.
:::

<KTreeList :max-depth="4" :items="maxLevelsItems" />

```html
<KTreeList :max-depth="4" :items="items" />
```

### width

You can pass a `width` string for the entire tree. By default it will take the full width.

<KTreeList width="50%" :items="widthItems" />

```html
<KTreeList width="50%" :items="items" />
```

### hideIcons

Boolean to hide icons. Defaults to `false`.

<KTreeList hide-icons :items="hideIconsItems" />

```html
<KTreeList hide-icons :items="items" />
```

## Slots

KTreeList allows you to customize individual tree items via the item slots. The slots provide the current `item` data as a slot param.

### item-icon

Slot for content displayed to the left of the item name in place of the default icon.

:::tip NOTE
When you provide an icon through `item-icon` slot it will be displayed regardless what [`hideIcons` prop](#hideicons) value is.
:::

### item-label

Slot for the main content of an item (defaults to the `name` of the item).

<KTreeList :items="slotItems">
  <template #item-icon="{ item }">
    <InboxIcon v-if="item.id.includes('folder')" />
    <DataObjectIcon
      v-else
      :color="item.selected ? KUI_COLOR_TEXT_DECORATIVE_PURPLE : KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG"
    />
  </template>
  <template #item-label="{ item }">
    <span v-if="item.id.includes('folder')">
      <strong>{{ item.name }}</strong>
    </span>
    <span v-else>
      {{ item.name }}
    </span>
  </template>
</KTreeList>

```html
<KTreeList :items="items">
  <template #item-icon="{ item }">
    <InboxIcon v-if="item.id.includes('folder')" />
    <DataObjectIcon
      v-else
      :color="item.selected ? KUI_COLOR_TEXT_DECORATIVE_PURPLE : KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG"
    />
  </template>
  <template #item-label="{ item }">
    <span v-if="item.id.includes('folder')">
      <strong>{{ item.name }}</strong>
    </span>
    <span v-else>
      {{ item.name }}
    </span>
  </template>
</KTreeList>
```

## Events

### change

Emitted when there is a change to the root level items. Event payload is object instance of `TreeListChangeEvent`.

```ts
interface TreeListChangeEvent {
  items: TreeListItem[]
  target: {
    element: TreeListItem
    newIndex: number
    oldIndex: number
  }
}
```

### child-change

Emitted when an item is added or removed at the non-root level. Event payload is object instance of `TreeListChildChangeEvent`.

```ts
interface TreeListChildChangeEvent {
  parentId: string
  children: TreeListItem[]
  target: {
    element: TreeListItem
    newIndex: number
    oldIndex: number
  }
}
```
:::tip NOTE
Two separate `child-change` events will fire if an item is moved from one parent to another.
:::

### selected

Emitted when you click (and don't drag) an item. Returns the selected item's data.

<script setup lang="ts">
import { ref } from 'vue'
import { InboxIcon, DataObjectIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_DECORATIVE_PURPLE, KUI_COLOR_TEXT_DECORATIVE_PURPLE_STRONG } from '@kong/design-tokens'

const mySelection = ref<TreeListItem | null>(null)

const items: TreeListItem[] = [
  {
    name: 'Components',
    id: 'components-folder',
    children: [
      {
        name: 'ProfileCard.vue',
        id: 'profile-card',
      },
    ],
  },
  {
    name: 'Pages',
    id: 'pages-folder',
    children: [
      {
        name: 'Home.vue',
        id: 'home',
      },
      {
        name: 'User',
        id: 'user-folder',
        children: [
          {
            name: 'UserList.vue',
            id: 'user-list',
          },
          {
            name: 'UserDetail.vue',
            id: 'user-detail',
          },
          {
            name: 'Settings',
            id: 'settings-folder',
          },
        ],
      },
    ],
  },
  {
    name: 'Types',
    id: 'types-folder',
    children: [{
      name: 'user.d.ts',
      id: 'user-types',
    }],
  },
]

// each example must have it's own list because cloning
// breaks drag-n-drop functionality
const myList = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const defaultItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const defaultItems2 = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const disableItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const maxLevelsItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const widthItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const hideIconsItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const slotItems = ref<TreeListItem[]>(JSON.parse(JSON.stringify(items)))

const reset = (): void => {
  myList.value = JSON.parse(JSON.stringify(items))
}
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>
