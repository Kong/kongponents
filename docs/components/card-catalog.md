# CardCatalog

**KCardCatalog** - A grid view of KCards

<script>
function getItems(count) {
  let myItems = []
  for (let i = 0; i < count; i++) {
    myItems.push({
      title: "Item " + i,
      description: "The item's description for number " + i
    })
  }
  return myItems
}

const longItem = {
  title: "A very long item",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat."
}

export default {
  data () {
    return {
      getItems,
      longItem
    }
  }
}
</script>


<KCardCatalog :items="getItems(5)" />
```vue
<KCardCatalog :items="items" />
```

## Props
### title
The catalog title.

<KCardCatalog title="Look Mah!" :items="getItems(5)" />
```vue
<KCardCatalog title="Look Mah!" :items="items" />
```

### items
The content of the cards. Expects a `title` (required) and a `description`.

<KCardCatalog :items="getItems(6)" />
```vue
function getItems(count) {
  let myItems = []
  for (let i = 0; i < count; i++) {
    myItems.push({
      title: "Item " + i,
      description: "The item's description for number " + i
    })
  }
  return myItems
}

<KCardCatalog :items="getItems(6)" />
```

### cardSize
Size of the cards. Supports values `small`, `medium` (default), and `large`.

<KCardCatalog title="Small Cards" :items="getItems(6)" cardSize="small" />
<KCardCatalog title="Medium Cards" :items="getItems(6)" />
<KCardCatalog title="Large Cards" :items="getItems(6)" cardSize="large" />

```vue
<KCardCatalog title="Small Cards" :items="getItems(6)" cardSize="small" />
<KCardCatalog title="Medium Cards" :items="getItems(6)" />
<KCardCatalog title="Large Cards" :items="getItems(6)" cardSize="large" />
```

### noTruncation
By default truncation of items with long descriptions is enabled at 5 lines. Enable `noTruncation`
to turn it off.

<KCardCatalog title="Truncate me" :items="[longItem]" />
<KCardCatalog title="No truncation allowed!!" :items="[longItem]" no-truncation />

```vue
const longItem = {
  title: "Item long",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat."
}

<KCardCatalog title="Truncate me" :items="[longItem]" />
<KCardCatalog title="No truncation allowed!!" :items="[longItem]" no-truncation />
```

## KCatalogItem
**KCatalogItem** is basically a wrapper around `KCard` to display it correctly in `KCardCatalog`. You
can use the `body` slot of the `KCardCatalog` to manually create your own catalog items.

### Properties
- `item` - the card content is built from this, it expects a `title` and optionally a `description`.
  ```json
  { title: 'some title', description: 'some description' }
  ```
- `truncate` - a boolean (default to `true`), whether or not to truncate the `description` text.

```vue
<KCatalogItem
  :item="item"
  :truncate="false"
  class="catalog-item"
/>
```

### Slots
- `cardTitle` - the title content for the card
- `cardBody` - the body content for the card

```vue
<KCatalogItem>       
  <template v-slot:cardTitle>
    <KIcon
      icon="profile"
      color="#7F01FE"
      size="44" />
    Look Mah!
  </template>
  <template v-slot:cardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.</template>
</KCatalogItem>
```

## Slots
- `body` - The body of the card catalog, we expect this to be an array of `KCardCatalogItem` widgets,
this should be used instead of the `items` property.

<KCardCatalog title="I'm slotted baby!" >
  <template v-slot:body>
    <KCatalogItem
      v-for="item in getItems(4)"
      :key="item.title.replace(' ', '-')"
      :item="item"
      class="catalog-item"
    />
    <KCatalogItem
      :item="longItem"
      :truncate="true"
      class="catalog-item"
    />
    <KCatalogItem>
      <template v-slot:cardTitle>
        <h4 class="d-flex">
          <KIcon
            icon="profile"
            color="#7F01FE"
            size="24" />
          <span class="ml-2">Call Me!</span>
        </h4>
      </template>     
      <template v-slot:cardBody>
        <span class="mr-2">Take action!</span>
        <KButton size="small">
          <KIcon
            icon="gearFilled"
            width="16px"
            view-box="0 0 16 16"
            class="pr-0"
          />
        </KButton>
      </template>
    </KCatalogItem>
  </template>
</KCardCatalog>

```vue
<KCardCatalog title="I'm slotted baby!" >
  <template v-slot:body>
    <KCatalogItem
      v-for="item in getItems(4)"
      :key="item.title.replace(' ', '-')"
      :item="item"
      class="catalog-item"
    />
    <KCatalogItem
      :item="longItem"
      :truncate="true"
      class="catalog-item"
    />
    <KCatalogItem>
      <template v-slot:cardTitle>
        <h4 class="d-flex">
          <KIcon
            icon="profile"
            color="#7F01FE"
            size="24" />
          <span class="ml-2">Call Me!</span>
        </h4>
      </template>     
      <template v-slot:cardBody>
        <span class="mr-2">Take action!</span>
        <KButton size="small">
          <KIcon
            icon="gearFilled"
            width="16px"
            view-box="0 0 16 16"
            class="pr-0"
          />
        </KButton>
      </template>
    </KCatalogItem>
  </template>
</KCardCatalog>
```

## Theming
**KCardCatalog** is for the most part a collection of KCards. To theme the cards, use
the existing **KCard** theming variables [here](./card.md#theming).
