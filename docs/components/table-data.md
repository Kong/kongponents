<!--@include: ./parts/tables/script-setup.md-->

# Table Data

A table component that wraps [KTableView](/components/table-view) with built-in data fetching functionality.

:::tip NOTE
If you are looking for a simpler table component that does not integrate data fetching, check out [KTableView](/components/table-view).
:::

<KTableData
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTableData
  :fetcher="fetcher"
  :headers="headers"
/>
```

## Props

For an example of `headers` prop usage please refer to [`fetcher` prop documentation](#fetcher) below.

### fetcher

Function that handles data fetching and pagination. It takes a single param as an argument which you can conveniently pass as a prop (see [`initialFetcherParams` prop](#initialfetcherparams) for details).

The fetcher function is expected to return an object with the following properties:

* `data` - an array of objects to populate table with
* `total` - the total count of items (if using pagination)

<KTableData
  :fetcher="hardcodedFetcher"
  :headers="basicHeaders(false, 'username', 'email')"
  :sort-handler-function="basicSortHandlerFunction"
  client-sort
/>

```vue
<template>
  <KTableData
    :fetcher="fetcher"
    client-sort
    :headers="headers"
    :sort-handler-function="sortHandlerFunction"
  />
</template>

<script setup lang="ts">
import type { TableDataHeaders } from '@kong/kongponents'

const headers: TableDataHeaders = [
  { key: 'name', label: 'Full Name' },
  {
    key: 'username',
    label: 'Username',
    sortable: true,
    tooltip: 'Unique for each user.',
    useSortHandlerFunction: true
  },
  {
    key: 'email',
    label: 'Email',
    hidable: true
  },
]

const fetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const responseData = [
    {
      id: 1,
      // notice that property keys in data object correspond to each respective key in headers const
      name: 'Leanne Graham', 
      username: 'Bret',
      email: 'Sincere@april.biz'
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv'
    },
    ...
  ]

  return {
    data: responseData,
    total: responseData.length,
  }
}

const sortHandlerFunction = ({ key, sortColumnOrder, data }) => {
  return data.sort((a, b) => {
    if (key === 'username') {
      if (sortColumnOrder === 'asc') {
        if (a.username > b.username) {
          return 1
        } else if (a.username < b.username) {
          return -1
        }

        return 0
      } else {
        if (a.username > b.username) {
          return -1
        } else if (a.username < b.username) {
          return 1
        }

        return 0
      }
    }

    return data
  })
}
</script>
```

:::tip NOTE
Notice in the example above the _Username_ column is `sortable`. In this example sorting is handled client-side; however, should you want to handle sorting differently (e.g. make a call to the back-end to apply server-side logic), you can bind your logic to the [`sort` event](#sort) and perform re-fetching of data as needed.
:::

### initialFetcherParams

The fetcher function accepts a single parameter, an object with the following properties:

```ts
interface TableDataFetcherParams {
  /**
   * The number of items to display per page.
   */
  pageSize?: number
  /**
   * The currently active page.
   */
  page?: number
  /**
   * A text string to filter table data on (defined in the searchInput prop).
   */
  query?: string
  /**
   * Sortable column key (defined in the headers prop).
   */
  sortColumnKey?: string
  /**
   * Sorting order.
   */
  sortColumnOrder?: 'asc' | 'desc'
  /**
   * The value of the offset for offset-based pagination. Offset must be included in the fetcher params for offset-based pagination to work properly.
   */
  offset?: string | null
}
```

For ease of configuration, all properties in the `initialFetcherParams` object have default fallback values:

```ts
{ 
  pageSize: 15,
  page: 1,
  query: '',
  sortColumnKey: '',
  sortColumnOrder: '',
  offset: null
}
```

### clientSort

Boolean to enable client-side sorting if using a fetcher that returns unpaginated data. Defaults to `false`. Use this in conjunction with [`sortHandlerFunction` prop](#sorthandlerfunction).

### sortHandlerFunction

Pass a custom sort handler function to handle sorting table data for specific columns.

:::warning WARNING
If [`clientSort` prop](#clientsort) is `true` but no `sortHandlerFunction` provided, KTableData will apply some default logic for client side sorting. This may produce unexpected results. We recommend **always** providing a `sortHandlerFunction` when using client-side sorting.
:::

The function can take an object with these properties as the only argument and should return sorted array of table record objects:

```ts
interface SortHandlerFunctionParam {
  /** The key of the column to be sorted */
  key: string
  /** The key of the column previously sorted */
  prevKey: string
  /** The order in which to sort the column (asc or desc) */
  sortColumnOrder: 'asc' | 'desc'
  /** The data returned from the fetcher function response */
  data: Array<any>
}
```

:::tip NOTE
Please note that you have to set [`clientSort` prop](#clientsort) to `true` as well as to pass `sortable: true` and `useSortHandlerFunction: true` in the respective [headers object](#headers) to make a column sortable via `sortHandlerFunction`.
:::

Please refer to the [`fetcher` prop documentation](#fetcher) for an example.

### cacheIdentifier

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. In order to take advantage of this caching, SWRV needs a way to identify which cache entry is associated with the table.

The identifier should be a string and will default to `''` if not provided. In that scenario, we will generate a random ID for the identifier every time the table is mounted.

:::danger DANGER
This identifier must be unique across all KTableData instances across the entire Vue app, otherwise there is a risk that [SWRV](https://docs-swrv.netlify.app/) will return the cached data of the wrong table.
:::

### fetcherCacheKey

Whenever the cache key is changed the fetcher will automatically be called and attempt to fetch new table data.

```vue
<template>
  <KTableData
    cache-identifier="fetcher-cache-key-example-table"
    :fetcher-cache-key="String(cacheKey)"
    :fetcher="fetcher"
    :headers="headers"
  />
</template>

<script setup lang="ts">
const cacheKey = ref<number>(1)

const itemDeleted = (): void => {
  cacheKey.value++ // triggers refetch or reactivity
}
</script>
```

An alternate implementation is to apply a `key` attribute to the KTableData in conjunction with a `fetcher` and the [SWRV](https://docs-swrv.netlify.app/) `revalidate` function. To prevent unnecessary calls on mount, the `key` `ref` should have an initial value of `0`.

Since the `fetcher` function will handle the initial fetch of the data, we want the cache key for the `revalidate` function to be a falsey value on page load (to avoid an unnecessary duplicate call), and will manually call `revalidate()` and increment the `key` to trigger a refetch and redraw of the table.

```vue
<template>
  <KTableData :key="key" :fetcher="fetcher" :headers="headers" />
</template>

<script setup lang="ts">
const key = ref<string>(0) // initialized to zero

const fetcher = async ({ pageSize, page, query, offset = null }) => {
  try {
    const res = await services.getAll(pageSize, offset)

    // handle data
  } catch (error) {
    // handle error
  }
}

const { revalidate } = composables.useRequest(
  () => key.value && `service-list-${key.value}`, // will evaluate to falsey on mount, preventing an extra call
  () => { return fetcher() }
)

const handleDelete = (id): void => {
  try {
    const res = await services.delete(id)

    key.value++
    revalidate()
  } catch (error) {
    // handle error
  }
}
</script>
```

### searchInput

A string that will passed to fetcher function and can be used to modify the API request to perform data filtering.

### sortable

Set this to `false` to disable ability to sort.

## KTableView Props

Since KTableData is a wrapper component around KTableView, it supports all KTableView props, except for the `data` prop, which is replaced by the [`fetcher` prop](#fetcher). For ease of reference, this section includes all KTableView props that KTableData supports.

<!--@include: ./parts/tables/shared-props.md-->

## Slots

Since KTableData is a wrapper component around KTableView, it supports all KTableView slots. For ease of reference, this section includes all KTableView slots that KTableData supports.

<!--@include: ./parts/tables/shared-slots.md-->

## Events

### state

Fired when the table state changes. Returns an object of type `TableStatePayload`:

```ts
interface TableStatePayload {
  state: TableState
  hasData: boolean
}

type TableState = 'loading' | 'error' | 'success' | 'empty'
```

### update:table-preferences

This event only fires when KTableData is in `success` state (see [`state` event](#state) for details).

## KTableView Events

Since KTableData is a wrapper component around KTableView, it supports most KTableView events (except for pagination events). For ease of reference, this section includes all KTableView events that KTableData supports.

<!--@include: ./parts/tables/shared-events.md-->
