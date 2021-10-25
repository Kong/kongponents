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
  title: "Item long",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat. Nunc condimentum, lacus non tincidunt facilisis, ante nisi eleifend est, et tempus sapien tortor nec velit. Nunc porttitor elit lacinia, pellentesque nulla quis, efficitur mi. Mauris a sem non lectus elementum consequat non vitae nibh. Suspendisse nec sem a magna fringilla euismod. Phasellus nec leo elementum, scelerisque diam non, auctor arcu. Proin vehicula cursus quam at semper."
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
By default truncation of items with long descriptions is enabled. Enable `noTruncation`
to turn it off.

<KCardCatalog title="Truncate me" :items="[longItem]" />
<KCardCatalog title="No truncation allowed!!" :items="[longItem]" no-truncation />

```vue
<KCardCatalog title="Truncate me" :items="[longItem]" />
<KCardCatalog title="No truncation allowed!!" :items="[longItem]" no-truncation />
```

## Theming
**KCardCatalog** is for the most part a collection of KCards. To theme the cards, use
the existing **KCard** theming variables [here](./card.md#theming).
