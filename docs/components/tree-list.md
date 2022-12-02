# Tree List

**KTreeList** - A drag-n-drop reorderable list component.

<KTreeList :items="defaultItems" />

```html
<KTreeList :items="items" />
```

## Props

### v-model

`KTreeList` works with v-model for data binding.

::: tip NOTE
The value provided to `v-model` should adhere to all the same constraints of the `items` property.
:::

<div>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList class="mt-2" v-model="myList" />
  <br>
  <KButton @click="reset">Reset</KButton>
</div>

```html
<template>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList v-model="myList" />
  <KButton @click="reset">Reset</KButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const myList = ref([
  {
    name: "Cats",
    id: 'cats'
    selected: true
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }])

  const reset = () => {
    myList.value = [{
      name: "Cats",
      id: 'cats',
      selected: true
    },
    {
      name: "Dogs",
      id: 'dogs',
      children: [{
        name: "Puppies",
        id: 'puppies'
      }]
    },
    {
      name: "Bunnies",
      id: 'bunnies'
    }
  ]
}
</script>
```

### items

An array of items that make up the tree.

Item properties:

- `name` (required) - text displayed as the label for the item
- `id` (required) - a unique `string` used to identify the item (Note: `id`'s must be unique across all items and their children)
- `selected` - boolean to indicate whether the current item is selected or not
- `icon` - string of the `KIcon` icon name to be displayed to the left of the item `name` (defaults to `documentList`, specify `none` to not display any icon)
- `children` - an array of items that will be styled as children of the current item (Note: all children must have the same property constraints as `items`)

::: danger
You cannot use `v-model` with the `items` prop. You must use one or the other.
:::

<KTreeList :items="defaultItems2" />

```html
<template>
  <KTreeList :items="items" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])
</script>
```

### disableDrag

Boolean (defaults to `false`) to turn off drag-n-drop reordering of the list.

<KTreeList disable-drag :items="disableItems" />

```html
<KTreeList disable-drag :items="items" />
```

### maxLevels

Use this prop to customize the maximum supported depth of the tree. We default to a max level of `2` or support for parents, children, and grandchildren.

::: tip NOTE
The maximum supported value for `maxLevels` is 6.
:::

<KTreeList :items="maxLevelsItems" :max-levels="1" />

```html
<KTreeList :items="items" :max-levels="1" />
```


## Slots

`KTreeList` allows you to customize individual tree items via the item slots. The slots provide the current `item` data as a slot param.

- `item-icon` - slot for content displayed to the left of the item name in place of the default icon
- `item-label` - slot for the main content of an item (defaults to the `name` of the item)

<KTreeList class="slot-example" :items="slotItems">
  <template #item-icon="{ item }">
    {{ item.id === 'cats' ? '😸' : item.id === 'bunnies' ? '🐰' : '🐶' }}
  </template>
  <template #item-label="{ item }">
    <span class="color-purple-400">
    Animal: {{ item.name }}
    </span>
  </template>
</KTreeList>

```html
<KTreeList :items="items">
  <template #item-icon="{ item }">
    {{ item.id === 'cats' ? '😸' : item.id === 'bunnies' ? '🐰' : '🐶' }}
  </template>
  <template #item-label="{ item }">
    <span class="color-purple-400">
    {{ item.name }}
    </span>
  </template>
</KTreeList>
```

## Events

- `@change` - emitted when there is a change to the root level items
  - returns `items` - an array of tree items
- `@child-change` - emitted when an item is added or removed at the non-root level
  - returns `parent` - id of the parent item; `children` - an array of tree items
  - **Note:** two separate `child-change` events will fire if an item is moved from one parent to another
- `@selected` - emitted when you click (and don't drag) an item; returns the selected item's data

<div>
  <KLabel>Selected: </KLabel> {{ mySelection && mySelection.name || '' }}
  <br>
  <KLabel>Items: </KLabel> {{ eventItems }}
  <KTreeList
    :items="eventItems"
    class="mt-3"
    @selected="(item) => mySelection = item"
    @changed="({ items }) => eventItems = items"
    @child-change="handleChildChange"
  />
</div>

```html
<template>
  <KLabel>Selected: </KLabel> {{ mySelection && mySelection.name || '' }}
  <KLabel>Items: </KLabel> {{ myItems }}
  <KTreeList
    :items="myItems"
    @selected="(item) => mySelection = item"
    @changed="({ items }) => myItems = items"
    @child-change="handleChildChange"
  />
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const mySelection = ref(null)
  const handleChildChange = (data) => {
    const { parentId, children } = data
    const changedParent = myItems.value.filter(item => item.id === parentId)?.[0]
    changedParent.children = children
  }
</script>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTreeListItemText` | Text color for the item name
| `--KTreeListItemSelectedBorder` | Border color of a selected item and color of indicator bar when dragging an item
| `--KTreeListItemSelectedBackground` | Background color of a selected item
| `--KTreeListItemUnselectedBorder` | Border color of an unselected item and color of connecting line between parents and children
| `--KTreeListItemUnselectedBackground` | Background color of an unselected item
| `--KTreeListDropZoneHeight` | Number of pixels between tree items

An example of changing the theming might look like this:

<KTreeList class="themed-tree" :items="themeItems" />

```html
<template>
  <KTreeList class="themed-tree" :items="items" />
</template>

<style>
.themed-tree {
  --KTreeListItemText: var(--purple-400);
  --KTreeListItemSelectedBorder: var(--yellow-300);
  --KTreeListItemSelectedBackground: var(--yellow-200);
  --KTreeListItemUnselectedBorder: var(--purple-300);
  --KTreeListItemUnselectedBackground: var(--purple-100);
  --KTreeListDropZoneHeight: 6px;
}
</style>
```

<script lang="ts" setup>
import { ref } from 'vue'

const mySelection = ref(null)

// each example must have it's own list because cloning
// breaks drag-n-drop functionality
const myList = ref([
  {
    name: "Cats",
    id: 'cats',
    selected: true
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const defaultItems = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const defaultItems2 = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const disableItems = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const maxLevelsItems = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const slotItems = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const eventItems = ref([
  {
    name: "Cats",
    id: 'cats'
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const themeItems = ref([
  {
    name: "Cats",
    id: 'cats',
    selected: true
  },
  {
    name: "Dogs",
    id: 'dogs',
    children: [{
      name: "Puppies",
      id: 'puppies'
    }]
  },
  {
    name: "Bunnies",
    id: 'bunnies'
  }
])

const reset = () => {
  myList.value = [
    {
      name: "Cats",
      id: 'cats',
      selected: true
    },
    {
      name: "Dogs",
      id: 'dogs',
      children: [{
        name: "Puppies",
        id: 'puppies'
      }]
    },
    {
      name: "Bunnies",
      id: 'bunnies'
    }
  ]
}

const handleChildChange = (data) => {
  const { parentId, children } = data
  const changedParent = eventItems.value.filter(item => item.id === parentId)?.[0]
  changedParent.children = children
}
</script>

<style scoped lang="scss">
.slot-example :deep(.k-tree-item) .k-tree-item-icon {
  line-height: 1.4;
}

.themed-tree {
  --KTreeListItemText: var(--purple-400);
  --KTreeListItemSelectedBorder: var(--yellow-300);
  --KTreeListItemSelectedBackground: var(--yellow-200);
  --KTreeListItemUnselectedBorder: var(--purple-300);
  --KTreeListItemUnselectedBackground: var(--purple-100);
  --KTreeListDropZoneHeight: 6px;
}
</style>
