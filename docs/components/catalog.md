# Catalog

**KCatalog** - A grid view of KCards

<KCatalog :fetcher="fetcherXs" />

```html
<KCatalog :fetcher="fetcher" />
```

::: warning NOTE
`KCatalog` implements `KIcon` which imports .svg files directly, so a loader is needed in order to render these in your application such as the webpack
[raw-loader](https://webpack.js.org/loaders/raw-loader/). [See here for more information](/#raw-loader).
:::

Pass a fetcher function to build a slot-able card catalog.

## Props

### title

The catalog title.

<KCatalog title="Look Mah!" :fetcher="fetcherXs" />

```html
<KCatalog title="Look Mah!" :fetcher="fetcher" />
```

### cardSize

Size of the cards. Supports values `small`, `medium` (default), and `large`.

<KCatalog title="Small Cards" :fetcher="fetcherXs" cardSize="small" />
<KCatalog title="Medium Cards" :fetcher="fetcherXs" />
<KCatalog title="Large Cards" :fetcher="fetcherXs" cardSize="large" />

```html
<KCatalog title="Small Cards" :fetcher="fetcher" cardSize="small" />
<KCatalog title="Medium Cards" :fetcher="fetcher" />
<KCatalog title="Large Cards" :fetcher="fetcher" cardSize="large" />
```

### noTruncation

By default truncation of items with long descriptions is enabled at 5 lines. Enable `noTruncation`
to turn it off.

<KCatalog title="Truncate me" :fetcher="fetcherLong" />
<KCatalog title="No truncation allowed!!" :fetcher="fetcherLong" no-truncation />

```html
const longItem = {
  title: "Item long",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat."
}

<KCatalog title="Truncate me" :fetcher="fetcherLong" />
<KCatalog title="No truncation allowed!!" :fetcher="fetcherLong" no-truncation />
```

### hasError

See [the State section](#error) about `hasError`

### isLoading

See [the State section](#loading) about `isLoading`

### fetcher

Use a custom fetcher function to fetch card catalog items and leverage server-side pagination.

::: tip NOTE
All fetcher functions should take a single param. This parameter is a JSON
object supporting the following properties:

- Pagination support:
  - `page`: the currently visible page - starts at `1`
  - `pageSize`: the number of items to display per page
:::

::: tip NOTE
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

### cacheIdentifier

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. In order to take advantage of this caching, SWRV needs a way to identify which cache entry is associated with the catalog.

The identifier should be a string and will default to `''` if not provided. In that scenario, we will generate a random ID for the identifier every time the catalog is mounted.

::: danger Danger
This identifier must be unique across all `KCatalog` instances across the entire Vue app, otherwise there is a risk that SWRV will return the cached data of the wrong catalog.
:::

### fetcherCacheKey

Whenever the cache key is changed the fetcher will automatically be called and attempt to fetch new catalog data.

```html
<template>
  <KCatalog
    cache-identifier="fetcher-cache-key-example-catalog"
    :fetcher="fetcher"
    :fetcherCacheKey="cacheKey"
  />
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

### searchInput

Pass in a string of search input for server-side table filtering. See [the Server-side function section](#server-side-functions) for an example.

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
[15, 30, 50, 75, 100]
```

### disablePaginationPageJump

Set this to `true` to limit pagination navigation to `previous` / `next` page only.

<KCatalog :fetcher="fetcher" :disablePaginationPageJump="true" :paginationPageSizes="[4, 5, 6]" :initial-fetcher-params="{ pageSize: 4, page: 1 }" />

```html
<template>
  <KCatalog :fetcher="fetcher" :disablePaginationPageJump="true" />
</template>
```

### disablePagination

Set this to `true` to remove the pagination bar when using a fetcher.

### hidePaginationWhenOptional

Set this to `true` to hide the pagination UI when the table record count is less than or equal to the `pageSize`.

## KCatalogItem

**KCatalog** generates a **KCatalogItem** for each item in the `items` property. At the most basic level, **KCatalogItem** is
a wrapper around `KCard` to display correctly inside `KCatalog`. You can use the `body` slot of the `KCatalog` to manually create your own catalog items.

### Properties

- `item` - the card content is built from this, it expects a `title` and optionally a `description`.

  ```json
  { title: 'some title', description: 'some description' }
  ```

- `truncate` - a boolean (default to `true`), whether or not to truncate the `description` text.

```html
<KCatalogItem :item="item" :truncate="false" class="catalog-item" />
```

### Card Slots

- `cardTitle` - the title content for the card
- `cardBody` - the body content for the card

```html
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

<KCatalog title="Empty catalog" :fetcher="emptyFetcher" />

```html
<KCatalog title="Empty catalog" :fetcher="emptyFetcher" />
```

Set the following properties to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIcon` - Icon for empty state
- `emptyStateIconColor` - Color for empty state icon
- `emptyStateIconSize` - Size for empty state icon
- `emptyStateActionRoute` - Route for empty state action
- `emptyStateActionMessage` - Button text for empty state action
- `emptyStateActionButtonIcon` - Icon for the empty state action button

If using a CTA button, a `@kcatalog-empty-state-cta-clicked` event is fired when clicked.

<KCatalog :fetcher="emptyFetcher" title="Customized empty catalog" emptyStateTitle="No Workspaces exist" emptyStateMessage="Adding a new Workspace will populate this catalog." emptyStateActionMessage="Create a Workspace" emptyStateActionRoute="#empty-state-full-example" emptyStateIcon="workspaces" emptyStateIconColor="#5996ff" emptyStateIconSize="35" />

```html
<!-- Using a route string -->
<KCatalog
  title="Customized empty catalog"
  :fetcher="emptyFetcher"
  emptyStateTitle="No Workspaces exist"
  emptyStateMessage="Adding a new Workspace will populate this catalog."
  emptyStateActionMessage="Create a Workspace"
  emptyStateActionRoute="#empty-state-full-example"
  emptyStateIcon="workspaces"
  emptyStateIconColor="#5996ff"
  emptyStateIconSize="35"
/>

<!-- Using a route object -->
<KCatalog
  title="Customized empty catalog"
  :fetcher="emptyFetcher"
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

<KCatalog title="Catalog with error" :fetcher="fetcherXs" :hasError="true" />

```html
<KCatalog title="Empty catalog" :fetcher="fetcher" :hasError="true" />
```

Set the following properties to customize error state:

- `errorStateTitle` - Title text for error state
- `errorStateMessage` - Message for error state
- `errorStateIcon` - Icon for error state
- `errorStateIconColor` - Color for error state icon
- `errorStateIconSize` - Size for error state icon
- `errorStateActionRoute` - Route for error state action
- `errorStateActionMessage` - Button text for error state action

If using a CTA button, a `KCatalog-error-cta-clicked` event is fired when clicked.

<KCatalog
  title="Catalog with error"
  :fetcher="fetcherXs"
  :hasError="true"
  errorStateTitle="Something went wrong"
  errorStateMessage="Error loading data."
  errorStateActionMessage="Report an Issue"
  errorStateActionRoute="#error-state-full-example"
  errorStateIcon="dangerCircle"
  errorStateIconColor="#e6173a"
  errorStateIconSize="35"
/>

```html
<!-- Using a route string -->
<KCatalog
  title="Catalog with error"
  :fetcher="fetcher"
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
<KCatalog
  title="Catalog with error"
  :fetcher="fetcher"
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

<KCatalog title="Loading catalog" :fetcher="fetcherXs" :isLoading="true" />

```html
<KCatalog title="Loading catalog" :fetcher="fetcher" :isLoading="true" />
```

## Slots

### Main Slots

Both the `title` & `description` of the card items as well as the entire catalog `body` are slottable.

- `body` - The body of the card catalog, if you do not want to use `KCatalogItem` components for the children.
- `cardHeader` - Will slot the card title for each entry
- `cardActions` - Will slot the card actions for each entry
- `cardBody` - Will slot the card body for each entry

If used in conjuction with a `fetcher` you have the option of using the returned `data` in the `body` slot.

<KCatalog :fetcher="fetcherSm" title="Customized body">
  <template v-slot:body="{ data }">
    <div v-for="item in data">
      <h4>{{ item.title }}</h4>
      <p>{{ item.description }}</p>
    </div>
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher" title="Customized body">
  <template v-slot:body="{ data }">
    <div v-for="item in data">
      <h4>{{ item.title }}</h4>
      <p>{{ item.description }}</p>
    </div>
  </template>
</KCatalog>
```

Use the `cardTitle`, `cardActions`, and `cardBody` slots to access `item` specific data.

<KCatalog :fetcher="fetcherSm" title="Customized cards">
  <template v-slot:cardTitle="{ item }">
    <div class="color-blue-500">
      {{ item.title }}
    </div>
  </template>
  <template v-slot:cardBody="{ item }">
    <span class="color-purple-400">
    {{ item.description }}
    </span>
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher" title="Customized cards">
  <template v-slot:cardTitle="{ item }">
    <div class="color-blue-500">
      {{ item.title }}
    </div>
  </template>
  <template v-slot:cardBody="{ item }">
    <span class="color-purple-400">
    {{ item.description }}
    </span>
  </template>
</KCatalog>
```

### Toolbar

The `toolbar` slot allows you to slot catalog controls rendered at the top of the `.k-card-catalog` element such as a search input or other UI elements. It provides the [SWRV](https://docs-swrv.netlify.app/) `state` and `hasData` in the slot param.

```ts
{
  state: {
    hasData: boolean
    state: string
  }
}
```

If utilizing multiple elements, we recommend adding `display: flex; width: 100%;` to the root slot tag.

<KCatalog :fetcher="fetcherXs">
  <template #toolbar="{ state }">
    <div class="d-flex w-100 justify-content-between">
      <KInput v-if="state.hasData" placeholder="Search" />
      <KSelect appearance="select" :items="[{ label: 'First option', value: '1', selected: true }, { label: 'Another option', value: '2'}]" />
    </div>
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher">
  <template #toolbar="{ state }">
    <div class="d-flex w-100 justify-content-between">
      <KInput
        v-if="state.hasData"
        placeholder="Search"
      />
      <KSelect
        appearance="select"
        :items="[
          { label: 'First option', value: '1', selected: true },
          { label: 'Another option', value: '2'}
        ]"
      />
    </div>
  </template>
</KCatalog>
```


### State Slots

KCatalog has built-in state management for loading, empty, and error states. You can either use the props described in
the section above or completely slot in your own content.

- `empty-state` - Slot content to be displayed when empty
- `error-state` - Slot content to be displayed when in an error state

<KCard>
  <template v-slot:body>
    <KCatalog :fetcher="emptyFetcher">
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
    </KCatalog>
  </template>
</KCard>

```html
<template>
  <KCatalog :fetcher="() => { return { data: [] } }">
    <template v-slot:empty-state>
      <KIcon icon="warning" />
      No Content!!!
    </template>
    <template v-slot:error-state>
      <KIcon icon="error" />
      Something went wrong
    </template>
  </KCatalog>
</template>
```

## Server-side functions

Pass a fetcher function to enable server-side pagination.
The fetcher function should structure the ajax request URL in such a way that
enables server side pagination per the requirements of the API being used.

::: tip NOTE
The loading state is handled automatically. When the `fetcher` is called the internal loading state
is triggered and will be resolved when the fetcher returns. You can override this behavior using the
`isLoading` prop.
:::

<KCatalog
  cache-identifier="server-side-functions-catalog"
  :fetcher="fetcher"
  :initial-fetcher-params="{
    pageSize: 15,
    page: 1,
    query: ''
  }"
/>

```
Example URL

https://kongponents.dev/api/components?_page=1&_limit=10
```

```html
<!-- Example Component Usage -->

<KCard>
  <template v-slot:body>
    <KInput placeholder="Search" v-model="search" type="search" />
    <KCatalog
      cache-identifier="server-side-functions-catalog"
      :fetcher="fetcher"
      :initial-fetcher-params="{
        pageSize: 15,
        page: 1,
        query: ''
      }"
      :search-input="search"
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

  if (query) {
    params.q = payload.query
    params._page = 1
  }

  return axios.get('/user_list', {
    baseURL: 'https://kongponents.dev/api',
    params
  }).then(res => {
    return {
      data: res.data,
      total: res.total
    }
  })
}
```

## Events

### CTA Clicks

- `@kcatalog-empty-state-cta-clicked` - If using a CTA button in the empty state, this event is fired when clicked.
- `@kcatalog-error-cta-clicked` - If using a CTA button in the error state, this event is fired when clicked.

### Catalog Preferences

- `@update:catalog-preferences` - Fired when the user changes the catalog's `pageSize`.

Returns a payload that adheres to the `CatalogPreferences` interface:

```ts
interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}
```

### Catalog State

`@state` - Fired when the catalog state changes.

Returns the state of the catalog, can be one of:
- `loading` - when the catalog is fetching new catalog data
- `error` - when the catalog fetch failed
- `empty` - when fetching succeeded with no records returned
- `has-data` - when fetching succed with records returned

## Theming

**KCatalog** is for the most part a collection of KCards. To theme the cards, use
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
      // <!-- markdownlint-disable-next-line MD037 -->
      if ((pageSize * page) < count) { limit = pageSize * page }

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
    },
    async fetcherSm(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: await this.resolveAfter5MiliSec(6, payload.pageSize, payload.page),
        total: 6
      }

      return params
    },
    async fetcherXs(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: await this.resolveAfter5MiliSec(4, payload.pageSize, payload.page),
        total: 4
      }

      return params
    },
    async fetcherLong(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: [longItem],
        total: 1
      }

      return params
    },
    emptyFetcher () {
      return { data: [], total: 0 }
    },
  }
}
</script>
