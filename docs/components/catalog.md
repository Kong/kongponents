# Catalog

KCatalog - a grid view of KCards.

<KCatalog :fetcher="fetcherXs" />

```html
<KCatalog :fetcher="fetcher" />
```

## Props

### title

The catalog title.

<KCatalog title="Cards Catalog" :fetcher="fetcherXs" />

```html
<KCatalog title="Cards Catalog" :fetcher="fetcher" />
```

### titleTag

HTML element you want title to be rendered as. Defaults to `div`.

Accepted values are:
<ul>
  <li v-for="tag in HeaderTags" :key="`${tag}-header-tag`">
    <code>{{ tag }}</code>
  </li>
</ul>

### cardSize

Size of the cards. Supports values `small`, `medium` (default), and `large`.

<div class="vertical-container">
  <KCatalog title="Small Cards" :fetcher="fetcherXs" card-size="small" hide-pagination-when-optional />
  <KCatalog title="Medium Cards" :fetcher="fetcherXs" hide-pagination-when-optional />
  <KCatalog title="Large Cards" :fetcher="fetcherXs" card-size="large" hide-pagination-when-optional />
</div>

```html
<KCatalog card-size="small" title="Small Cards" :fetcher="fetcher" hide-pagination-when-optional />
<KCatalog title="Medium Cards" :fetcher="fetcher" />
<KCatalog card-size="large" title="Large Cards" :fetcher="fetcher" hide-pagination-when-optional />
```

### truncateDescription

By default long card body text is truncated at 3 lines. Set this prop to `false` to turn truncation off.

<div class="vertical-container">
  <KCatalog title="Truncating card body" :fetcher="fetcherLong" hide-pagination-when-optional />
  <KCatalog title="Truncation disabled" :truncate-description="false" :fetcher="fetcherLong" hide-pagination-when-optional />
</div>

```html
<KCatalog title="Truncating card body" :fetcher="fetcherLong" hide-pagination-when-optional />
<KCatalog :truncate-description="false" title="Truncation disabled" :fetcher="fetcherLong" hide-pagination-when-optional />
```

### error

Boolean to control whether KCatalog should display [error state](#error-1). Defaults to `false`.

### loading

Boolean to control whether KCatalog should display [loading state](#loading-1). Defaults to `false`.

### fetcher

Use a custom fetcher function to fetch card catalog items and leverage server-side pagination. Fetcher functions takes a single optional param (see [`initialFetcherParams` prop](#initialfetcherparams)) as an object with following properties:

```ts
// fetcher function param
{
  page: number, // the currently visible page (default value is 1)
  pageSize: number, // the number of items to display per page (default value is 15)
  query: string // search query if search is supported
}
```

The return value of the fetcher function should be an object with the following properties:

```ts
// fetcher function return
{ 
  total: number, // the total count of catalog items (if using pagination)
  data: CatalogItem[] // an array of catalog items
}
```

```ts
interface CatalogItem {
  id?: string
  title: string
  description: string
  key?: string
}
```

Example fetcher function:

```ts
const fetcher = (payload: { page: number, pageSize: number, query: string }) => {
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

:::tip NOTE
The loading state is handled automatically. When the `fetcher` is called the internal loading state is triggered and will be resolved when the fetcher returns. You can override this behavior using the `loading` prop.
:::

### initialFetcherParams

Pass in an object of parameters for the initial fetcher function call. If not provided,
will default to the following values:

```ts
{ 
  pageSize: 15,
  page: 1
}
```

### cacheIdentifier

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. In order to take advantage of this caching, SWRV needs a way to identify which cache entry is associated with the catalog.

The identifier should be a string and will default to `''` if not provided. In that scenario, we will generate a random ID for the identifier every time the catalog is mounted.

:::danger
This identifier must be unique across all KCatalog instances across the entire Vue app, otherwise there is a risk that [SWRV](https://docs-swrv.netlify.app/) will return the cached data of the wrong catalog.
:::

### fetcherCacheKey

Whenever the cache key is changed the fetcher will automatically be called and attempt to fetch new catalog data.

```vue
<template>
  <KCatalog
    cache-identifier="fetcher-cache-key-example-catalog"
    :fetcher="fetcher"
    :fetcher-cache-key="cacheKey"
  />
</template>

<script setup lang="ts">
const cacheKey = ref<number>(1)

const itemDeleted = () => {
  // take an action on the DOM
  cacheKey.value++ // triggers refetch
}
</script>
```

### searchInput

Pass in a string of search input for server-side table filtering.

### paginationTotalItems

Pass the total number of items in the set to populate the pagination text. See [KPagination component docs](/components/pagination) for more details.

If not provided the fetcher response should return a top-level property `total` or return a `data` property that is an array.

### paginationNeighbors

Pass in a number of pagination neighbors to be used by the pagination component. See more detail in the [KPagination component docs](/components/pagination.html#neighbors).

### paginationPageSizes

Pass in an array of page sizes for the page size dropdown. If not provided will default to the following:

```ts
[15, 30, 50, 75, 100]
```

### disablePaginationPageJump

Set this to `true` to limit pagination navigation to `previous` / `next` page only.

<KCatalog :fetcher="fetcher" :disablePaginationPageJump="true" :paginationPageSizes="[4, 5, 6]" :initial-fetcher-params="{ pageSize: 4, page: 1 }" />

```html
<KCatalog :disable-pagination-page-jump="true" :fetcher="fetcher" />
```

### disablePagination

Set this to `true` to remove the pagination bar when using a fetcher.

### hidePaginationWhenOptional

Set this to `true` to hide the pagination UI when the table record count is less than or equal to the `pageSize`.

## KCatalogItem

KCatalog generates a KCatalogItem for each item in the `items` property. At the most basic level, KCatalogItem is a wrapper around KCard to display correctly inside KCatalog. You can use the `body` slot of the KCatalog to manually create your own catalog items.

### Props

#### item

Object instance of `CatalogItem` from which card content is built.

#### truncate

A boolean (default to `true`), whether or not to truncate the description text.

```html
<KCatalogItem :item="item" :truncate="false" class="catalog-item" />
```

### Slots

#### card-title

The title content for the card.

#### card-body

The body content for the card.

#### card-footer

The footer content for the card.

<KCatalogItem>
  <template #card-title>
    Card Title
  </template>
  <template #card-body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.
  </template>
  <template #card-footer>
    Card Footer
  </template>
</KCatalogItem>

```html
<KCatalogItem>
  <template #card-title>
    Card Title
  </template>
  <template #card-body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec justo libero. Nullam accumsan quis ipsum vitae tempus. Integer non pharetra orci. Suspendisse potenti.
  </template>
  <template #card-footer>
        <KBadge appearance="neutral">Card footer</KBadge>
  </template>
</KCatalogItem>
```

### Events

#### click

Fired when item is clicked. Event payload is item object.

## States

### Empty

<KCatalog :fetcher="emptyFetcher" />

```html
<KCatalog :fetcher="emptyFetcher" />
```

Set the following props to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIconVariant` - Icon variant for empty state (see [KEmptyState component props](/components/empty-state#iconvariant))
- `emptyStateActionMessage` - Button text for empty state action
- `emptyStateActionRoute` - Route for empty state action

Should you want to display an icon inside of action button, you can use `empty-state-action-icon` slot.

When empty state action button is clicked, KCatalog emits the `empty-state-action-click` event.

<KCatalog 
  :fetcher="emptyFetcher"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this catalog."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="#empty-state-full-example"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KCatalog>

```html
<KCatalog 
  :fetcher="emptyFetcher"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this catalog."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="#empty-state-full-example"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KCatalog>
```

### Error

Set the `error` prop to `true` to enable the error state.

<KCatalog :fetcher="fetcherXs" error />

```html
<KCatalog error :fetcher="fetcher" />
```

Set the following properties to customize error state:

- `errorStateTitle` - Title text for error state
- `errorStateMessage` - Message for error state
- `errorStateActionMessage` - Button text for error state action
- `errorStateActionRoute` - Route for error state action

A `error-action-click` event is fired when error state action button is clicked.

<KCatalog
  :fetcher="fetcherXs"
  :error="true"
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="#error-state-full-example"
/>

```html
<KCatalog
  :fetcher="fetcher"
  :error="true"
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="#error-state-full-example"
/>
```

### Loading

Set the `loading` prop to `true` to enable the loading state.

<KCatalog :fetcher="fetcherXs" loading />

```html
<KCatalog loading :fetcher="fetcher" />
```

## Slots

Both the title & description of the card items as well as the entire catalog body are slottable.

### body

The body of the card catalog, if you do not want to use KCatalogItem components for the children.

### card-title

Will slot the card title for each entry. The slot exposes card item through the `item` slot prop.

<KCatalog :fetcher="fetcherXs">
  <template #card-title="{ item }">
    {{ item.key % 2 ? 'Odd' : 'Even' }} item
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher">
  <template #card-title="{ item }">
    {{ item.key % 2 ? 'Odd' : 'Even' }} item
  </template>
</KCatalog>
```

### card-actions

Slot the card actions for each entry. The slot exposes card item through the `item` slot prop.

<KCatalog :fetcher="fetcherXs">
  <template #card-actions="{ item }">
    <KDropdown :items="[
      { label: 'Home', to: { path: '/' } },
      { label: 'Dropdown', to: { path: '/components/dropdown' } },
      { label: 'Button', to: { path: '/components/button' } }
    ]">
      <KButton size="small" :title="`${item.title} actions`" appearance="secondary">
        <template #icon>
          <MoreIcon />
        </template>
      </KButton>
    </KDropdown>
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher">
  <template #card-actions="{ item }">
    <KDropdown :items="items">
      <KButton size="small" :title="`${item.title} actions`" appearance="secondary">
        <template #icon>
          <MoreIcon />
        </template>
      </KButton>
    </KDropdown>
  </template>
</KCatalog>
```

### card-body

Will slot the card body for each entry. The slot exposes card item through the `item` slot prop.

### toolbar

The `toolbar` slot allows you to slot catalog controls rendered at the top of the `.k-catalog` element such as a search input or other UI elements. It provides the [SWRV](https://docs-swrv.netlify.app/) `state` and `hasData` in the slot param.

```ts
{
  state: {
    hasData: boolean
    state: string
  }
}
```

<KCatalog :fetcher="fetcherXs">
  <template #toolbar="{ state }">
    <KInput v-if="state.hasData" placeholder="Search" />
    <KSelect appearance="select" :items="[{ label: 'First option', value: '1', selected: true }, { label: 'Another option', value: '2'}]" />
  </template>
</KCatalog>

```html
<KCatalog :fetcher="fetcher">
  <template #toolbar="{ state }">
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
  </template>
</KCatalog>
```

### empty-state

Slot content to be displayed when empty.

### error-state

Slot content to be displayed when in an error state.

## Events

### card-click

Emitted when a KCatalogItem is clicked, the payload is the clicked item's object.

### empty-state-action-click

Emitted when empty state action button is clocked.

### error-action-click

Emitted when error state action button is clicked.

### update:catalog-preferences

Fired when the user changes the catalog's `pageSize`.

Returns a payload that adheres to the `CatalogPreferences` interface:

```ts
interface CatalogPreferences {
  /** The number of items to display per page */
  pageSize?: number
}
```

### state

Fired when the catalog state changes.

Returns the `state` and `hasData` (boolean) of the catalog, `state` can be one of:
- `loading` - when the catalog is fetching new catalog data
- `error` - when the catalog fetch failed
- `success` - when the catalog fetch completed successfully

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { AddIcon, MoreIcon } from '@kong/icons'
import { HeaderTags } from '@/types'

const getItems = (count: number): CardItem[] => {
  let myItems: CardItem[] = []
  for (let i = 0; i < count; i++) {
    myItems.push({
      title: "Item " + i,
      description: "The item's description for number " + i
    })
  }
  return myItems
}

const longItem: CardItem = reactive({
  title: "A very long item",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tempus lorem, et molestie quam. Praesent sapien massa, posuere et volutpat nec, imperdiet a dui. Fusce non leo posuere, molestie neque et, posuere ex. Nullam euismod tortor in est sagittis iaculis. In sodales bibendum nulla nec feugiat."
})

const resolveAfter5MiliSec = (count: number, pageSize: number, page: number): Promise<CardItem[]> => {
  let limit = count
  if ((pageSize * page) < count) { limit = pageSize * page }

  let myItems: CardItem[] = []
  for (let i = ((page - 1) * pageSize); i < limit; i++) {
    myItems.push({
      title: "Item " + `${i + 1}`,
      description: "The item's description for number " + `${i + 1}`,
      key: i + 1
    })
  }

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(myItems)
    }, 500)
  })
}

const fetcher = async (payload: { pageSize: number, page: number }) => {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page,
    data: await resolveAfter5MiliSec(25, payload.pageSize, payload.page),
    total: 25
  }

  return params
}

const fetcherSm = async (payload: { pageSize: number, page: number }) => {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page,
    data: await resolveAfter5MiliSec(6, payload.pageSize, payload.page),
    total: 6
  }

  return params
}

const fetcherXs = async (payload: { pageSize: number, page: number }) => {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page,
    data: await resolveAfter5MiliSec(4, payload.pageSize, payload.page),
    total: 4
  }

  return params
}

const fetcherLong = async (payload: { pageSize: number, page: number }) => {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page,
    data: [longItem],
    total: 1
  }

  return params
}

const emptyFetcher = () => {
  return { data: [], total: 0 }
}
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>
