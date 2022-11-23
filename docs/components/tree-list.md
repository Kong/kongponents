# Tree List

**KTreeList** - A drag-n-drop reorderable list component.

::: tip
It can be tricky to determine if an item will be placed below an item as a sibling or as a child when dropping. Items to be dropped as children should be dropped near the bottom border line of the parent. If this will be the first child of an item, you will notice the margin between the two items disappearing if you are hovering in the right place.
:::

<KTreeList :items="defaultItems" />

```html
<KTreeList :items="items" />
```

## Props

### items

An array of items that make up the tree.

<KTreeList :items="defaultItems2" />

```html
<template>
  <KTreeList :items="items" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      items: [{
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
      }]
    }
  }
})
</script>
```

### disableDrag

Boolean (defaults to `false`) to turn of drag-n-drop reordering of the list.

<KTreeList disable-drag :items="disableItems" />

```html
<KTreeList disable-drag :items="items" />
```

### maxLevel

Use this prop to customize the maximum supported depth of the tree. We default to a max level of `2` or support for parents, children, and grandchildren.

<KTreeList :items="maxLevelItems" :max-level="1" />

```html
<KTreeList :items="items" :max-level="1" />
```

### v-model

`KTreeList` works with v-model for data binding.

::: danger
You cannot use `v-model` with the `items` prop. You must use one or the other.
:::

<div>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList v-model="myList" />
  <br>
  <KButton @click="reset">Reset</KButton>
</div>

```html
<template>
  <KLabel>Value:</KLabel> {{ myList }}
  <KTreeList v-model="myList" />
  <KButton @click="reset">Reset</KButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myList: [{
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
      }]
    }
  },
  methods: {
    reset() {
      this.myList = [{
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
      }]
    }
  }
})
</script>
```

## KTreeItem

### Properties

- `name` (required) - text displayed as the label for the item
- `id` (required) - a unique `string` used to identify the item
- `selected` - boolean to indicate whether the current item is selected or not
- `icon` - `KIcon` name to be displayed to the left of the item `name` (defaults to `treeDoc`, specify `none` to not display any icon)
- `children` - an array of `KTreeItem`'s that will be styled as children of the current item

### Item Slots

- `item-icon` - slot for content displayed to the left of the item name
- `item-label` - slot for the main content of an item (default's to display the `name` of the item)

See the [Slots section](#Slots) for an example.

## Slots

`KTreeList` allows you to customize individual tree items via the item slots. These slots return the current `item` data as a slot param.

- `item-icon` - slot for content displayed to the left of the item name
- `item-label` - slot for the main content of an item (default's to display the `name` of the item)

<KTreeList :items="slotItems">
  <template #item-icon="{ item }">
    {{ item.id === 'cats' ? '😸' : item.id === 'bunnies' ? '🐰' : '🐶' }}
  </template>
  <template #item-label="{ item }">
    <span class="color-purple-400">
    {{ item.name }}
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

- `@change` - Emitted when there is a change to the root level items
  - returns `items` - an array of `KTreeItem`s
- `@child-change` - Emitted when an item is added or removed at the non-root level
  - returns `parent` - id of the parent item; `children` - an array of `KTreeItem`s
  - **Note:** two separate `child-change` events will fire if an item is moved from one parent to another
- `@selected` - Emitted when you click (and don't drag-n-drop) an item; returns the selected `KTreeItem` data

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      // each example must have it's own list because cloning
      // breaks drag-n-drop functionality
      myList: [{
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
      }],
      defaultItems: [{
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
      }],
      defaultItems2: [{
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
      }],
      disableItems: [{
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
      }],
      maxLevelItems: [{
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
      }],
      slotItems: [{
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
      }]
    }
  },
  methods: {
    reset () {
      this.myList = [{
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
      }]
    }
  }
})
</script>
