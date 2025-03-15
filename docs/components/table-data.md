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

## Base KTableView Component

KTableData wraps the KTableView component, adding data fetching functionality.

KTableData supports all [KTableView props](/components/table-view#props), except for the `data` prop, which is replaced by the [`fetcher` prop](#fetcher). It also supports [slots](/components/table-view#slots) and [events](/components/table-view#events), except for [pagination events](/components/table-view#pagination-events), which KTableData does not emit. Additionally, the `headers` prop and the `update:table-preferences` event are handled differently in KTableData. See the sections below for more details.

## Props

### headers

In addition to all header object properties supported by KTableView, KTableData also allows specifying whether a column should be sortable  by providing a [`sortHandlerFunction` prop](#sorthandlerfunction).

```ts
interface TableDataHeader {
  /** must be unique for each column, see Reserved Header Keys section for more information about 'actions' key value */
  key: string
  /** visible column header text */
  label: string
  /** this property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** allow toggling column visibility */
  hidable?: boolean
  /** when provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
  /** Whether KTableData should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}
```

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

### searchInput

A string that will passed to fetcher function and can be used to modify the API request to perform data filtering.

### sortable

Set this to `false` to disable ability to sort.

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

## Methods

### revalidate

Revalidates the cached data without triggering the loading state if data is already cached.

<script setup lang="ts">
import { AddIcon, SearchIcon, MoreIcon } from '@kong/icons'

const basicHeaders = (actions: boolean = false, sortable: string | null = null, hidable: string | null = null) => {
  const keys = {
    name: { 
      key: 'name',
      label: 'Full Name'
    },
    username: {
      key: 'username',
      label: 'Username',
      tooltip: 'Unique for each user.'
    },
    email: { 
      key: 'email',
      label: 'Email' 
    },
    ...(actions && { 
      actions: {
        key: 'actions',
        label: 'Row actions',
        hideLabel: true
      },
    })
  }

  const headers = []
  for (const [key, value] of Object.entries(keys)) {
    if ((!sortable && !hidable) || (sortable !== key && hidable !== key)) {
      headers.push({ ...value })
    } else if (sortable && sortable === key) {
      headers.push({ ...value, sortable: true, useSortHandlerFunction: true })
    } else if (hidable && hidable === key) {
      headers.push({ ...value, hidable: true })
    }
  }

  return headers
}

const basicFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: responseData,
    total: responseData.length,
  }
}

// use hardcoded response instead of basicFetcher when you need data in the table to match the data in the example
// in case data returned by https://jsonplaceholder.typicode.com/users endpoint ever changes
const hardcodedFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const responseData = [
    {
      id: 1,
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
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net'
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org'
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca'
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info'
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz'
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me'
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io'
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz'
    }
  ]

  return {
    data: responseData,
    total: responseData.length,
  }
}

const basicSortHandlerFunction = ({ key, sortColumnOrder, data }: any) => {
  return data.sort((a: any, b: any) => {
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
