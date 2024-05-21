# Table

Component that takes care of fetching and rendering data in a table format.

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
/>
```

## Props

### headers

Array of objects that represent table columns along with some configurations that should apply to each of the columns (whether a column is sortable, hidable, etc).

```ts
interface TableHeader {
  key: string // must be unique for each column
  label: string // visible column header text
  sortable?: boolean // in a nutshell, this property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it
  hidable?: boolean // allow toggling column visibility
  tooltip?: string // when provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed
  hideLabel?: boolean // whether column header text should be hidden (only visible to screen readers)
  useSortHandlerFunction?: boolean // whether KTable should use function passed through sortHandlerFunction prop to apply sorting logic to this column
}
```

:::tip NOTE
If at least one column is `hidable` in the table, KTable will render a dropdown on the right of the table toolbar, directly above the table, which will provide an interface for showing/hiding columns to the user.
:::

For an example of `headers` prop usage please refer to [`fetcher` prop documentation](#fetcher) below.

### fetcher

Function that handles data fetching, server-side search and pagination. It takes a single param as an argument which you can conveniently pass as a prop (see [`initialFetcherParams` prop](#initialfetcherparams) for details).

Fetcher function is expected to return an object with the following properties:
* `data` - an array of objects to populate table with
* `total` - the total count of items (if using pagination)

<KTable
  :fetcher="hardcodedFetcher"
  :headers="basicHeaders(false, 'username', 'email')"
  :sort-handler-function="basicSortHandlerFunction"
  client-sort
/>

```vue
<template>
  <KTable
    :fetcher="fetcher"
    client-sort
    :headers="headers"
    :sort-handler-function="sortHandlerFunction"
  />
</template>

<script setup lang="ts">
const headers = [
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
Notice that in the example above the _Username_ column is `sortable` and the _Email_ column is `hidable`. In this example sorting is handled on the client side, however should you want to apply server-side logic to handle sorting, you can bind your logic to the [`sort` event](#sort) and perform re-fetching of data as needed.
:::

### initialFetcherParams

Fetcher function takes a single param - an object with the following properties:

```ts
interface FetcherParams {
  pageSize?: number // the number of items to display per page
  page?: number // the currently visible page
  query?: string // a text string to filter table data on (defined in the searchInput prop)
  sortColumnKey?: string // sortable column key (defined in the headers prop)
  sortColumnOrder?: 'asc' | 'desc' // sorting order
  offset?: string | null // the value of the offset for offset-based pagination. offset MUST be included in the fetcher params for offset-based pagination to work properly
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

### loading

Boolean to control whether the component should display the loading state. When not explicitly set, KTable will display the loading state until the function passed for the [`fetcher` prop](#fetcher) resolves.

<KTable
  loading
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable
  loading
  :fetcher="fetcher"
  :headers="headers"
/>
```

### error

Boolean to control whether the component should display the error state. Defaults to `false`. See [error state](#error-1) section for more customization options.

<KTable
  error
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable
  error
  :fetcher="fetcher"
  :headers="headers"
/>
```

### resizeColumns

Allow table column width to be resizable (defaults to `false`). Adjusting a column's width will trigger an [`update:table-preferences` event](#updatetable-preferences).

:::warning WARNING
`update:table-preferences` event only fires when KTable is in `success` state (see [`state` event](#state) for details).
:::

<KTable
  resize-columns
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable
  resize-columns
  :fetcher="fetcher"
  :headers="headers"
/>
```

### clientSort

Boolean to enable client side sorting if using a fetcher that returns unpaginated data. Defaults to `false`. Use this in conjunction with [`sortHandlerFunction` prop](#sorthandlerfunction).

### sortHandlerFunction

Pass a custom sort handler function to handle sorting table data for specific columns.

:::warning WARNING
If [`clientSort` prop](#clientsort) is `true` but no `sortHandlerFunction` provided, KTable will apply some default logic for client side sorting. This may produce unexpected results. We recommend **always** providing a `sortHandlerFunction` when using client side sorting.
:::

The function can take an object with these properties as the only argument:

```ts
interface SortHandlerFunctionParam {
  key: string // the key of the column to be sorted
  prevKey: string // the key of the column previously sorted
  sortColumnOrder: 'asc' | 'desc' // the order in which to sort the column (asc or desc)
  data: Array<any> // the data returned from the fetcher function response
}
```

:::tip NOTE
Please note that you have to set [`clientSort` prop](#clientsort) to `true` as well as to pass `sortable: true` and `useSortHandlerFunction: true` in the respective [headers object](#headers) to make a column sortable via `sortHandlerFunction`.
:::

Please refer to [`fetcher` prop documentation](#fetcher) for example.

### rowHover

Boolean to control whether table should display hover state upon hovering rows. Defaults to `true`.

### tablePreferences

Table preferences object for persisting some configs.

```ts
interface TablePreferences {
  pageSize?: number // the number of items to display per page
  sortColumnKey?: string // the column to sort by's `key` defined in the table headers
  sortColumnOrder?: SortColumnOrder // the order by which to sort the column, one of `asc` or `desc`
  columnWidths?: Record<string, number> // the customized column widths, if resizing is allowed
  columnVisibility?: Record<string, boolean> // column visibility, if visibility is toggleable
}
```

<KTable
  :table-preferences="{ columnVisibility: { email: false } }"
  :fetcher="basicFetcher"
  :headers="basicHeaders(false, null, 'email')"
/>

```html
<KTable
  :table-preferences="{ columnVisibility: { email: false } }"
  :fetcher="fetcher"
  :headers="headers"
/>
```

### cacheIdentifier

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. In order to take advantage of this caching, SWRV needs a way to identify which cache entry is associated with the table.

The identifier should be a string and will default to `''` if not provided. In that scenario, we will generate a random ID for the identifier every time the table is mounted.

:::danger DANGER
This identifier must be unique across all KTable instances across the entire Vue app, otherwise there is a risk that [SWRV](https://docs-swrv.netlify.app/) will return the cached data of the wrong table.
:::

### fetcherCacheKey

Whenever the cache key is changed the fetcher will automatically be called and attempt to fetch new table data.

```vue
<template>
  <KTable
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

An alternate implementation is to apply a `key` attribute to the KTable in conjunction with a `fetcher` and the [SWRV](https://docs-swrv.netlify.app/) `revalidate` function. To prevent unnecessary calls on mount, the `key` `ref` should have an initial value of `0`.

Since the `fetcher` function will handle the initial fetch of the data, we want the cache key for the `revalidate` function to be a falsey value on page load (to avoid an unnecessary duplicate call), and will manually call `revalidate()` and increment the `key` to trigger a refetch and redraw of the table.

```html
<template>
  <KTable :key="key" :fetcher="fetcher" :headers="headers" />
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

Pass in a string of search input for server-side table filtering.

### sortable

Set this to `false` to disable ability to sort.

### rowAttrs

Function for adding custom attributes to each row. The function should return an object with `key: value` pairs for each attribute.

The passed function receives row value object as an argument.

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
  :row-attrs="(row) => { return { 'data-testid': `row-${row.id}` } }"
/>

```html
<KTable
  :row-attrs="(row) => { return { 'data-testid': `row-${row.id}` } }"
  :fetcher="fetcher"
  :headers="headers"
/>
```

### cellAttrs

Function for adding custom attributes to each table cell. The function should return an object with `key: value` pairs for each attribute.

The passed function receives an object with these parameters as an argument:
```ts
{
  headerKey: string // header key
  row: object // row value
  rowIndex: number // row index
  colIndex: index // column index
}
```

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
  :cell-attrs="({ headerKey, row }) => { return { 'data-testid': `column-${headerKey}-row-${row.id}` } }"
/>

```html
<KTable
  :cell-attrs="({ headerKey, row }) => { return { 'data-testid': `column-${headerKey}-row-${row.id}` } }"
  :fetcher="fetcher"
  :headers="headers"
/>
```

## Pagination

KTable uses KPagination component under the hood and exposes a few props as a way to modify how pagination looks and behaves in tables. See [KPagination](/components/pagination.html#props) docs for more details and examples:

* `paginationTotalItems`
* `paginationNeighbors`
* `paginationPageSizes`
* `paginationOffset`
* `disablePaginationPageJump`

### disablePagination

Set this to `true` to hide pagination when using a fetcher.

### hidePaginationWhenOptional

Set this to `true` to hide pagination when the table record count is less than or equal to the `pageSize`.

## States

### Empty

<KTable 
  :fetcher="emptyFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable 
  :fetcher="emptyFetcher"
  :headers="headers"
/>
```

Set the following props to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIconVariant` - Icon variant for empty state (see [KEmptyState component props](/components/empty-state#iconvariant))
- `emptyStateActionMessage` - Button text for empty state action
- `emptyStateActionRoute` - Route for empty state action

:::tip
Should you want to display an icon inside of action button, you can use `empty-state-action-icon` slot.
:::

When empty state action button is clicked, KTable emits the `empty-state-action-click` event.

<KTable 
  :fetcher="emptyFetcher"
  :headers="basicHeaders()"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this catalog."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="/"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KTable>

```html
<KTable 
  :fetcher="emptyFetcher"
  :headers="headers"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this table."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="/"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KTable>
```

### Error

Set the `error` prop to `true` to enable the error state.

<KTable
  error
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
/>

```html
<KTable
  error
  :fetcher="fetcher"
  :headers="headers"
/>
```

Set the following properties to customize error state:

- `errorStateTitle` - Title text for error state
- `errorStateMessage` - Message for error state
- `errorStateActionMessage` - Button text for error state action
- `errorStateActionRoute` - Route for error state action

A `error-action-click` event is fired when error state action button is clicked.

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
  error
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="/"
/>

```html
<KTable
  error
  :fetcher="fetcher"
  :headers="headers"
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="/"
/>
```

## Slots

### Column Header

You can slot in your custom content into each column header. For that, use column `key` value prefixed with `column-*` like in the example below.

Slot props:
* `column` - column header object

:::tip NOTE
Header slot container is a `display: flex;` element that takes care of spacing between slotted items so you can slot in your items without having to worry about adding margin between them.
:::

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
>
  <template #column-email="{ column }">
    {{ column.label }} <KBadge>Beta</KBadge>
  </template>
</KTable>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
>
  <template #column-email="{ column }">
    {{ column.label }} <KBadge>Beta</KBadge>
  </template>
</KTable>
```

### Cell

You can slot in each individual cell content. Each cell slot is name after the `key` it corresponds to.

Slot props:
* `row` - table row object
* `rowKey` - table row index
* `rowValue` - the cell value

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders(true)"
  :row-hover="false"
>
  <template #email="{ rowValue }">
    <KCopy :text="rowValue" />
  </template>
  <template #actions>
    <KDropdown>
      <template #default>
        <KButton
          appearance="tertiary"
          size="small"
        >
          <template #icon>
            <MoreIcon />
          </template>
        </KButton>
      </template>
      <template #items>
        <KDropdownItem>
          Edit
        </KDropdownItem>
        <KDropdownItem
          danger
          has-divider
        >
          Delete
        </KDropdownItem>
      </template>
    </KDropdown>
  </template>
</KTable>

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :row-hover="false"
  >
    <template #email="{ rowValue }">
      <KCopy :text="rowValue" />
    </template>
    <template #actions>
      <KDropdown>
        <template #default>
          <KButton
            appearance="tertiary"
            size="small"
          >
            <template #icon>
              <MoreIcon />
            </template>
          </KButton>
        </template>
        <template #items>
          <KDropdownItem>
            Edit
          </KDropdownItem>
          <KDropdownItem
            danger
            has-divider
          >
            Delete
          </KDropdownItem>
        </template>
      </KDropdown>
    </template>
  </KTable>
</template>

<script setup lang="ts">
const headers = [
  { key: 'name', label: 'Full Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  {
    key: 'actions',
    label: 'Row actions',
    hideLabel: true
  },
]

const fetcher = () => {
  // fetcher logic
}
</script>
```

### Header Tooltip

If you want to utilize HTML in the column header's tooltip, use the slot. Similar to column header slot, use column `key` value prefixed with `tooltip-*` like in the example below.

Slot props:
* `column` - column header object

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
>
  <template #tooltip-email>
    HubSpot Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTable>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
>
  <template #tooltip-email>
    HubSpot Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTable>
```

### toolbar

Toolbar is rendered directly above the table. Useful for slotting table controls like search or filter fields.

Slot props:
* `state` - table state object (refer to [`state` event docs](#state) for more details)

:::tip NOTE
Toolbar slot container is a `display: flex;` element that takes care of spacing between slotted items so you can slot in your items without having to worry about adding margin between them.
:::

<KTable
  :fetcher="basicFetcher"
  :headers="basicHeaders()"
>
  <template #toolbar>
    <KInput placeholder="Search">
      <template #before>
        <SearchIcon />
      </template>
    </KInput>
    <KButton size="large">
      <AddIcon /> Add user
    </KButton>
  </template>
</KTable>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
>
  <template #toolbar>
    <KInput placeholder="Search">
      <template #before>
        <SearchIcon />
      </template>
    </KInput>
    <KButton size="large">
      <AddIcon /> Add user
    </KButton>
  </template>
</KTable>
```

### empty-state

Slot content to be displayed when empty.

### empty-state-action-icon

Slot for icon to be displayed in front of action button text in empty state. See [empty state](#empty) section for example of usage of this slot.

### error-state

Slot content to be displayed when in error state.

## Events

### Row Events

`@row:{event}` - returns the `Event`, the row item, and the type. `row-click` event is emitted whenever a row is clicked and the row click event handler is fired, returns the row `data`.

To avoid firing row clicks by accident, the row click handler ignores events coming from `a`, `button`, `label`, `input`, and `select` elements (unless they have the `disabled` attribute). As such click handlers attached to these element types do not require stopping propagation via `@click.stop`.

<KComponent v-slot="{ data }" :data="{ rowClickEnabled: true }">
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.rowClickEnabled"
      label="Row clicks"
    />
    <KTable
      :fetcher="numberedColumnsFetcher"
      :headers="numberedHeaders"
      hide-pagination-when-optional
      @row:click="data.rowClickEnabled ? onRowClick : undefined"
    >
      <template #column1>
        <KButton @click="onButtonClick">Fire button click handler</KButton>
      </template>
      <template #column2>
        <KInput label="Table input" />
      </template>
      <template #column3>
        <KExternalLink href="https://kongponents.konghq.com/">External link</KExternalLink>
      </template>
    </KTable>
  </div>
</KComponent>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
  @row:click="onRowClick"
/>
```

### Cell Events

`@cell:{event}` - returns the `Event`, the cell value, and the type. `cell-click` event is emitted whenever a cell is clicked and the cell click event handler is fired, returns the cell `data`.

<KComponent v-slot="{ data }" :data="{ cellClickEnabled: true }">
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.cellClickEnabled"
      label="Cell clicks"
    />
    <KTable
      :fetcher="numberedColumnsFetcher"
      :headers="numberedHeaders"
      hide-pagination-when-optional
      @cell:click="data.cellClickEnabled ? onCellClick : undefined"
    >
      <template #column1>
        <KButton @click="onButtonClick">Fire button click handler</KButton>
      </template>
      <template #column2>
        <KInput label="Table input" />
      </template>
      <template #column3>
        <KExternalLink href="https://kongponents.konghq.com/">External link</KExternalLink>
      </template>
    </KTable>
  </div>
</KComponent>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
  @cell:click="onCellClick"
/>
```

### sort

Fired when user clicks on a sortable column heading. Event payload is object of type `TableSortPayload`:

```ts
interface TableSortPayload {
  prevKey: string
  sortColumnKey: string
  sortColumnOrder: string
}
```

### state

Fired when the table state changes. Returns an object of type `TableStatePayload`:

```ts
interface TableStatePayload {
  state: TableState
  hasData: boolean
}

type TableState = 'loading' | 'error' | 'success' | 'empty'
```

### empty-state-action-click

Emitted when empty state action button is clocked.

### error-action-click

Emitted when error state action button is clicked.

### update:table-preferences

Fired when the user changes the table's page size, performs sorting, resizes columns or toggles column visibility. Event payload is object of type `TablePreferences` interface (see [`tablePreferences` prop](#tablepreferences) for details).

<script setup lang="ts">
import { AddIcon, SearchIcon, MoreIcon } from '@kong/icons'
import { getCurrentInstance } from 'vue'

const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster

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

const emptyFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    data: [],
    total: 0,
  }
}

const numberedHeaders = [
  {
    key: 'column1',
    label: 'Column 1'
  },
  {
    key: 'column2',
    label: 'Column 2'
  },
  {
    key: 'column3',
    label: 'Column 3'
  }
]

const numberedColumnsFetcher = () => {
  return {
    data: [
      { 
        column1: 'Row 1 cell 1',
        column2: 'Row 1 cell 2',
        column3: 'Row 1 cell 3'
      },
      { 
        column1: 'Row 2 cell 1',
        column2: 'Row 2 cell 2',
        column3: 'Row 2 cell 3'
      },
      { 
        column1: 'Row 3 cell 1',
        column2: 'Row 3 cell 2',
        column3: 'Row 3 cell 3'
      }
    ],
    total: 3
  }
}

const onRowClick = (event, row) => {
  $toaster.open({ appearance: 'success', title: 'Row clicked! Row data:', message: row })
}

const onButtonClick = () => {
  $toaster.open({ appearance: 'system', title: 'Button clicked!', message: 'Button click is handled separately from row or cell clicks.' })
}

const onCellClick = (event, cell) => {
  $toaster.open({ title: 'Cell clicked! Cell data:', message: cell })
}
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>