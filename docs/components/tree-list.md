# Tree List

**KTreeList** - A drag-n-drop reorderable list component.

::: tip
It can be tricky to determine if an item will be places below an item as a sibling or as a child when dropping. Items to be dropped as children should be dropped near the bottom border line of the parent. If this will be the first child of an item, you will notice the margin between the two items disappearing if you are hovering in the right place.
:::

<KTreeList :items="cloneDeep(defaultItems)" />

```html
<KTreeList :items="items" />
```

## Props

### items

An array of items that make up the tree.

<KTreeList :items="cloneDeep(defaultItems)" />

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
        "name": "Cats",
        "id": 0
      },
      {
        "name": "Dogs",
        "id": 1,
        "children": [{
          "name": "Puppies",
          "id": 3
        }]
      },
      {
        "name": "Bunnies",
        "id": 2
      }]
    }
  }
})
</script>
```

### disableDrag

Boolean (defaults to `false`) to turn of drag-n-drop reordering of the list.

<KTreeList disable-drag :items="cloneDeep(defaultItems)" />

```html
<KTreeList disable-drag :items="items" />
```

### maxLevel

Use this prop to customize the maximum supported depth of the tree. We default to a max level of `2` or support for parents, children, and grandchildren.

<KTreeList :items="cloneDeep(defaultItems)" :max-level="1" />

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
      myVal: 'cats',
    }
  },
  methods: {
    clearIt() {
      this.myVal = ''
    }
  }
})
</script>
```

## KTreeItem

### Properties

- `name` (required) - text displayed as the label for the item
- `id` (required) - a unique value used to identify the item
- `selected` - boolean to indicate whether the current item is selected or not
- `icon` - `KIcon` name to be displayed to the left of the item `name` (defaults to `treeDoc`, specify `none` to not display any icon)
- `children` - an array of `KTreeItem`'s that will be styled as children of the current item

### Item Slots

- `item-icon` - slot for content displayed to the left of the item name
- `item-label` - slot for the main content of an item (default's to display the `name` of the item)

See the [Slots section](#Slots) for an example.

```html
<KTreeItem>
  <template #item-icon>
    <KIcon
      icon="profile"
      color="var(--purple-400)"
      size="20"
    />
  </template>
  <template #item-label>
    Custom label
  </template>
</KTreeItem>
```

## Slots

`KTreeList` allows you to customize individual tree items via the item slots. These slots return the current `item` data as a slot param.

- `item-icon` - slot for content displayed to the left of the item name
- `item-label` - slot for the main content of an item (default's to display the `name` of the item)

<KTreeList :items="cloneDeep(defaultItems)">
  <template #item-icon="{ item }">
    <KIcon
      icon="profile"
      color="var(--purple-400)"
      size="20"
    />
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
    <KIcon
      icon="profile"
      color="var(--purple-400)"
      size="20"
    />
  </template>
  <template #item-label="{ item }">
    <span class="color-purple-400">
    {{ item.name }}
    </span>
  </template>
</KTreeList>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTreeListBorderColor`| KTreeList border color

An Example of changing the border color of KTreeList to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
  </div>
</template>

```html
<template>
  <div class="KTreeList-wrapper">
    <KTreeList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss">
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
```

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myList: [{
        "name": "Cats",
        "id": 0
      },
      {
        "name": "Dogs",
        "id": 1,
        "children": [{
          "name": "Puppies",
          "id": 3
        }]
      },
      {
        "name": "Bunnies",
        "id": 2
      }],
      defaultItems: [{
        "name": "Cats",
        "id": 0
      },
      {
        "name": "Dogs",
        "id": 1,
        "children": [{
          "name": "Puppies",
          "id": 3
        }]
      },
      {
        "name": "Bunnies",
        "id": 2
      }]
    }
  },
  methods: {
    cloneDeep (obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    reset () {
      this.myList = this.cloneDeep(this.defaultItems)
    }
  }
})
</script>

<style lang="scss">
.KTreeList-wrapper {
  --KTreeList-wrapperBorderColor: lime;
}
</style>
