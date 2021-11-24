# Card Catalog

:::tip Note
The `KCardCatalog` component requires the [`@vue/composition-api`](https://github.com/vuejs/composition-api) package as a `peerDependency`. You must **manually** add the package to your host project by running the following

``` shell
yarn add @vue/composition-api
```

:::

**KCardCatalog** - A grid view of KCards

<KCardCatalog :items="getItems(5)" />

```vue
<KCardCatalog :items="items" />
```

Pass a fetcher function to build a slot-able card catalog.

```vue
<KCardCatalog :fetcher="fetcher" />
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

### fetcher

Use a custom fetcher function to fetch card catalog items and leverage server-side pagination.
::: tip Note
All fetcher functions should take a single param. This parameter is a JSON
object supporting the following properties:

- Pagination support:
  - `page`: the currently visible page - starts at `1`
  - `pageSize`: the number of items to display per page
:::

::: tip Note
All fetcher functions should return a JSON object. This JSON object should contain the following properties:

- `total` - the total count of catalog items (if using pagination)
- `data` - an array of JSON objects to populate the card catalog with
:::

Example fetcher function:

```js
fetcher(payload) {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page
  }

  return axios.get('/user_list', {
    baseURL: 'https://kongponents.dev/api',
    params
  }).then(res => {
    return {
      total: res.total,
      data: res.data
    }
  })
}
```

### initialFetcherParams

Pass in an object of parameters for the initial fetcher function call. If not provided,
will default to the following values:

```js
{ pageSize: 15, page: 1 }
```

### fetcherCacheKey

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. Whenever the cache key is changed the fetcher will automatically
refire and repopulate the table data.

```vue
<template>
  <KCardCatalog
    :fetcher="fetcher"
    :fetcherCacheKey="cacheKey" />
</template>

<script>
export default {
  data () {
    return {
      cacheKey: 1
    }
  },
  methods: {
    itemDeleted () {
      // take an action on the DOM
      cacheKey++ // triggers refetch
    }
  }
}
</script>
```

### paginationTotalItems

Pass the total number of items in the set to populate the pagination text:

```html
1 to 20 of <paginationTotalItems>
```

If not provided the fetcher response should return a top-level property `total` or return a `data` property that is an array.

### paginationNeighbors

Pass in a number of pagination neighbors to be used by the pagination component. See more detail in the [Pagination](/components/pagination.html#neighbors) docs.

### paginationPageSizes

Pass in an array of page sizes for the page size dropdown. If not provided will default to the following:

```js
[15, 25, 50, 75, 100]
```

### disablePaginationPageJump

Set this to `true` to limit pagination navigation to `previous` / `next` page only.

<KCardCatalog
  :fetcher="fetcher"
  :disablePaginationPageJump="true"
  :paginationPageSizes="[4, 5, 6]"
  :initial-fetcher-params="{
    pageSize: 4,
    page: 1,
    query: '',
    sortColumnKey: '',
    sortColumnOrder: ''
  }" />

```vue
<template>
  <KCardCatalog
    :fetcher="fetcher"
    :disablePaginationPageJump="true" />
</template>
```

### disablePagination

Set this to `true` to remove the pagination bar when using a fetcher.

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

### Card Slots

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

If using a CTA button, a `kcardcatalog-empty-state-cta-clicked` event is fired when clicked.

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

If using a CTA button, a `kcardcatalog-error-cta-clicked` event is fired when clicked.

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
            size="16"
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
            size="16"
            view-box="0 0 16 16"
            class="pr-0"
          />
        </KButton>
      </template>
    </KCatalogItem>
  </template>
</KCardCatalog>
```

KCardCatalog has built-in state management for loading, empty, and error states. You can either use the props described in
the section above or completely slot in your own content.

- `empty-state` - Slot content to be displayed when empty
- `error-state` - Slot content to be displayed when in an error state

<KCard>
  <template v-slot:body>
    <KCardCatalog
      :fetcher="emptyFetcher"
      :headers="headers"
    >
      <template v-slot:empty-state>
        <div class="w-100" style="text-align: center;">
          <KIcon icon="warning" />
          <div>No Content!!!</div>
        </div>
      </template>
      <template v-slot:error-state>
        <KIcon icon="error" />
        Something went wrong
      </template>
    </KCardCatalog>
  </template>
</KCard>

```vue
<template>
  <KCardCatalog
    :fetcher="() => { return { data: [] } }"
    :headers="headers"
  >
    <template v-slot:empty-state>
      <KIcon icon="warning" />
      No Content!!!
    </template>
    <template v-slot:error-state>
      <KIcon icon="error" />
      Something went wrong
    </template>
  </KCardCatalog>
</template>
```

## Server-side functions

Pass a fetcher function to enable server-side pagination.
The fetcher function should structure the ajax request URL in such a way that
enables server side pagination per the requirements of the API being used.

::: tip Note
The loading state is handled automatically. When the `fetcher` is called the internal loading state
is triggered and will be resolved when the fetcher returns. You can override this behavior using the
`isLoading` prop.
:::

<KCardCatalog
  :fetcher="fetcher" />

```http
Example URL

https://kongponents.dev/api/components?_page=1&_limit=10
```

```vue
<!-- Example Component Usage -->

<KCard>
  <template v-slot:body>
    <KCardCatalog
      :fetcher="fetcher"
      :initial-fetcher-params="{
        pageSize: 15,
        page: 1
      }"
    />
  </template>
</KCard>
```

```js
// Example Fetcher Function

fetcher(payload) {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page
  }

  return axios.get('/user_list', {
    baseURL: 'https://kongponents.dev/api',
    params
  }).then(res => {
    return {
      total: res.total,
      data: res.data
    }
  })
}
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
    resolveAfter5MiliSec(count, pageSize, page) {
      // simulate pagination
      let limit = count
      if ((pageSize * page) < count) {
        limit = pageSize
      }

      let myItems = []
      for (let i = ((page-1) * pageSize); i < limit; i++) {
        myItems.push({
          title: "Item " + `${i+1}`,
          description: "The item's description for number " + `${i+1}`
        })
      }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(myItems);
        }, 500)
      })
    },
    async fetcher(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: await this.resolveAfter5MiliSec(25, payload.pageSize, payload.page),
        total: 25
      }

      return params
    }
  }
}
</script>
