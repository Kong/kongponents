# Card Catalog

**KCardCatalog** - A grid view of KCards

<KCardCatalog :fetcher="fetcher" :page-size="3" />

```vue
<KCardCatalog :fetcher="fetcher" :page-size="3" />
```

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
The content of the cards. Expects a `title` and a `description`.

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

### hasError

See [the State section](#error) about `hasError`

### isLoading

See [the State section](#loading) about `isLoading`

## KCatalogItem
**KCardCatalog** generates a **KCatalogItem** for each item in the `items` property. At the most basic level, **KCatalogItem** is 
a wrapper around `KCard` to display correctly inside `KCardCatalog`. You can use the `body` slot of the `KCardCatalog` to manually create your own catalog items.

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

## States

### Empty

<KCardCatalog title="Empty catalog" :items="getItems(0)" />

```vue
<KCardCatalog title="Empty catalog" :items="getItems(0)" />
```

Set the following properties to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIcon` - Icon for empty state
- `emptyStateIconColor` - Color for empty state icon
- `emptyStateIconSize` - Size for empty state icon
- `emptyStateActionRoute` - Route for empty state action
- `emptyStateActionMessage` - Button text for empty state action

<KCardCatalog 
  title="Customized empty catalog"
  :items="getItems(0)"
  emptyStateTitle="No Workspaces exist"
  emptyStateMessage="Adding a new Workspace will populate this catalog."
  emptyStateActionMessage="Create a Workspace"
  emptyStateActionRoute="#empty-state-full-example"
  emptyStateIcon="workspaces"
  emptyStateIconColor="#5996ff"
  emptyStateIconSize="35"
/>

```vue
<!-- Using a route string -->
<KCardCatalog 
  title="Customized empty catalog"
  :items="getItems(0)"
  emptyStateTitle="No Workspaces exist"
  emptyStateMessage="Adding a new Workspace will populate this catalog."
  emptyStateActionMessage="Create a Workspace"
  emptyStateActionRoute="#empty-state-full-example"
  emptyStateIcon="workspaces"
  emptyStateIconColor="#5996ff"
  emptyStateIconSize="35"
/>

<!-- Using a route object -->
<KCardCatalog 
  title="Customized empty catalog"
  :items="getItems(0)"
  emptyStateTitle="No Workspaces exist"
  emptyStateMessage="Adding a new Workspace will populate this catalog."
  emptyStateActionMessage="Create a Workspace"
  emptyStateActionRoute="{
    name: 'create-workspace',
    params: {
      organizationId: 'd27e40e0-c9ac-43e2-8be8-54862fab45ea'
    }
  }"
  emptyStateIcon="workspaces"
  emptyStateIconColor="#5996ff"
  emptyStateIconSize="35"
/>
```

### Error

Set the `hasError` prop to `true` to enable the error state.

<KCardCatalog title="Catalog with error" :items="getItems(6)" :hasError="true" />

```vue
<KCardCatalog title="Empty catalog" :items="getItems(6)" :hasError="true" />
```

Set the following properties to customize error state:

- `errorStateTitle` - Title text for error state
- `errorStateMessage` - Message for error state
- `errorStateIcon` - Icon for error state
- `errorStateIconColor` - Color for error state icon
- `errorStateIconSize` - Size for error state icon
- `errorStateActionRoute` - Route for error state action
- `errorStateActionMessage` - Button text for error state action

<KCardCatalog 
  title="Catalog with error" 
  :items="getItems(6)" 
  :hasError="true"
  errorStateTitle="Something went wrong"
  errorStateMessage="Error loading data."
  errorStateActionMessage="Report an Issue"
  errorStateActionRoute="#error-state-full-example"
  errorStateIcon="dangerCircle"
  errorStateIconColor="#e6173a"
  errorStateIconSize="35"
/>

```vue
<!-- Using a route string -->
<KCardCatalog 
  title="Catalog with error" 
  :items="getItems(6)" 
  :hasError="true"
  errorStateTitle="Something went wrong"
  errorStateMessage="Error loading data."
  errorStateActionMessage="Report an Issue"
  errorStateActionRoute="create-workspace"
  errorStateIcon="dangerCircle"
  errorStateIconColor="#e6173a"
  errorStateIconSize="35"
/>

<!-- Using a route object -->
<KCardCatalog 
  title="Catalog with error" 
  :items="getItems(6)" 
  :hasError="true"
  errorStateTitle="Something went wrong"
  errorStateMessage="Error loading data."
  errorStateActionMessage="Report an Issue"
  errorStateActionRoute="{
    name: 'report-issue',
    params: {
      organizationId: 'd27e40e0-c9ac-43e2-8be8-54862fab45ea'
    }
  }"
  errorStateIcon="dangerCircle"
  errorStateIconColor="#e6173a"
  errorStateIconSize="35"
/>
```

### Loading

Set the `isLoading` prop to `true` to enable the loading state.

<KCardCatalog title="Loading catalog" :items="getItems(6)" :isLoading="true" />

```vue
<KCardCatalog title="Loading catalog" :items="getItems(6)" :isLoading="true" />
```

## Slots
- `body` - The body of the card catalog, we expect this to be an array of `KCatalogItem` components.
This should be used instead of the `items` property.

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
  data() {
    return {
      getItems,
      longItem
    }
  },

methods: {
  resolveAfter5MiliSec(count) {
    let myItems = []
      for (let i = 0; i < count; i++) {
        myItems.push({
        title: "Item " + i,
        description: "The item's description for number " + i
      })
    }
    return new Promise(resolve => {
      setTimeout(() => {
      resolve(myItems);
    }, 500);
  });
},

  async fetcher(pageSize = 9, page = 1) {
    const fetcherData =  { title: "Long Item", description: "Lorem Ipsum" }
    const params = {
      _limit: pageSize,
      _page: page,
      data: await this.resolveAfter5MiliSec(4)
    }
    console.log(params)
      return params
    }
  }
}
</script>
