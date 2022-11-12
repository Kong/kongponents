---
pageClass: table-docs
---
# Table

Pass a fetcher function to build a slot-able table.

```html
  <KTable :fetcher="fetcher" :headers="headers" />
```

:::warning NOTE
`KTable` implements `KIcon` which imports .svg files directly, so a loader may be needed in order to render these in your application such as the webpack
[raw-loader](https://webpack.js.org/loaders/raw-loader/). [See here for more information](/#installation).
:::

## Props

### hasHover

Highlight the table row on hover. By default this is set to `true`. In the example we can set it to false as well.

<KTable :fetcher="tableOptionsFetcher" :headers="tableOptionsHeaders" :hasHover="false" />

```html
  <KTable :fetcher="fetcher" :headers="headers" :hasHover="false" />
```

### hasSideBorder

Adds left border to each table row. By default set to `false`. The colors can be overridden by themes.

The below example demonstrates the disabled state:

<KTable :fetcher="tableOptionsFetcher" :headers="tableOptionsHeaders" :hasSideBorder="true" />

```html
  <KTable :fetcher="fetcher" :headers="headers" :hasSideBorder="true" />
```

### hasError

See [the State section](#error) about `hasError`

### isLoading

See [the State section](#loading) about `isLoading`

### disablePaginationPageJump

Set this to `true` to limit pagination navigation to `previous` / `next` page only.

<KTable :fetcher="tableOptionsFetcher" :headers="tableOptionsHeaders" :disablePaginationPageJump="true" />

```html
  <KTable :fetcher="fetcher" :headers="headers" :disablePaginationPageJump="true" />
```

### disablePagination

Set this to `true` to remove the pagination bar when using a fetcher.

### hidePaginationWhenOptional

Set this to `true` to hide the pagination UI when the table record count is less than or equal to the `pageSize`.

### disableSorting

Set this to `true` to disable ablity to sort.

### enableClientSort

Set this prop to `true` to enable client side sorting if using a fetcher that returns unpaginatinated data.
This functionality may be flaky.

### sortHandlerFn

Use a custom sort handler function to handle sorting table data for specific columns

::: tip Notes

1. In order for a column to use the custom sort handler function, `useSortHandlerFn` must be set to `true` in the [headers](#headers) object

2. Sort handler functions can take four params:

- `key`: the key of the column to be sorted
- `prevKey`: the key of the column previously sorted
- `sortColumnOrder`: the order in which to sort the column (`asc` or `desc`)
- `data`: the data returned from the fetcher function response
:::

#### sortHandlerFn Example

Here the `last_seen` column is set to use the custom sort handler function via the `useSortHandlerFn` property set in the table header object. The function passed into the `sortHandlerFn` prop sorts and returns the table data. The other columns use the default built-in client side sort function because the `useSortHandlerFn` property is not set in the header objects.

<KTable :fetcher="sortHandlerFnFetcher" :headers="sortHandlerFnHeaders" :sortHandlerFn="sortHandlerFn" enable-client-sort />

```html
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :sortHandlerFn="sortHandlerFn"
    enable-client-sort
  />
</template>

<script lang="ts">
export default {
  data () {
    return {
      headers: [
        { label: 'Host', key: 'hostname', sortable: true },
        { label: 'Version', key: 'version', sortable: true },
        { label: 'Connected', key: 'connected', sortable: true },
        { label: 'Last Seen', key: 'last_seen', sortable: true, useSortHandlerFn: true }
      ],
    }
  },
  methods: {
    sortHandlerFn({ key, prevKey, sortColumnOrder, data}) {
      return data.sort((a, b) => {
        if (key === 'last_seen') {
          if (sortColumnOrder === 'asc') {
            if (a.last_ping > b.last_ping) {
              return 1
            } else if (a.last_ping < b.last_ping) {
              return -1
            }
            return 0
          } else {
            if (a.last_ping > b.last_ping) {
              return -1
            } else if (a.last_ping < b.last_ping) {
              return 1
            }
            return 0
          }
        }
      })
    },
    fetcher() {
      return {
        data: [
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.0.0-enterprise-edition',
            hostname: '99e591ae3776',
            last_ping: 1648855072,
            connected: 'Disconnected',
            last_seen: '6 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.7.0.0-enterprise-edition',
            hostname: '19e591ae3776',
            last_ping: 1649362660,
            connected: 'Connected',
            last_seen: '3 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.1.0-enterprise-edition',
            hostname: '79e591ae3776',
            last_ping: 1649355460,
            connected: 'Connected',
            last_seen: '5 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.6.0.0-enterprise-edition',
            hostname: '89e591ae3776',
            last_ping: 1648155072,
            connected: 'Disconnected',
            last_seen: '14 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.2.0-enterprise-edition',
            hostname: '59e591ae3776',
            last_ping: 1649855072,
            connected: 'Connected',
            last_seen: 'Just now'
          },
        ]
      }
    },
  }
}
</script>
```

### fetcher

Use a custom fetcher function to fetch table data and leverage server-side search, sort and pagination.

::: tip Note
All fetcher functions should take a single param. This parameter is a JSON
object supporting the following properties:

- Pagination support:
  - `page`: the currently visible page - starts at `1`
  - `pageSize`: the number of items to display per page
  - `offset`: the value of the offset for offset-based pagination. `offset` **MUST** be included in the fetcher params for offset-based pagination to work properly.
- Sort support:
  - `sortColumnKey`: the column to sort by's `key` defined in the `headers` prop
  - `sortColumnOrder`: can be 'asc' or 'desc'
- Search support:
  - `query`: a text string to filter table data on
:::

::: tip Note
All fetcher functions should return a JSON object. This JSON object should contain the following properties:

- `total` - the total count of items (if using pagination)
- `data` - an array of JSON objects to populate the table with
:::

Example fetcher function:

```js
fetcher(payload) {
  const params = {
    _limit: payload.pageSize,
    _page: payload.page
  }

  if (query) {
    params.q = payload.query
    params._page = 1
  }

  if (sortKey) {
    params._sort = payload.sortColumnKey
    params._order = payload.sortColumnOrder
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

The `fetcher` function does not actually need to make an API call. Tables that can get their data synchronously can be modified to use a `fetcher` that returns the static data object.

::: tip Note
Remember that the `fetcher` function is responsible for managing pagination/sort/search. So if returning a static data object these features should be explicitly disabled.
:::

<KTable :fetcher="() => {
  return {
    data: [
      {
        name: 'Basic Auth',
        id: '517526354743085',
        enabled: 'true'
      },
      {
        name: 'Website Desktop',
        id: '328027447731198',
        enabled: 'false'
      },
      {
        name: 'Android App',
        id: '405383051040955',
        enabled: 'true'
      }
    ]
  }}"
  :initial-fetcher-params="{
    sortColumnKey: 'name',
    sortColumnOrder: 'asc'
  }"
  :headers="[
    { label: 'Name', key: 'name', sortable: true },
    { label: 'Id', key: 'id', sortable: true },
    { label: 'Enabled', key: 'enabled', sortable: false }
  ]"
  hidePaginationWhenOptional
  :enableClientSort="true"
/>

```html
<template>
  <KTable
    :fetcher="() => {
      return {
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true'
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false'
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    }"
    :initial-fetcher-params="{
      sortColumnKey: 'name',
      sortColumnOrder: 'asc'
    }"
    :headers="[
      { label: 'Name', key: 'name', sortable: true },
      { label: 'Id', key: 'id', sortable: true },
      { label: 'Enabled', key: 'enabled', sortable: false }
    ]"
    hidePaginationWhenOptional
    :enableClientSort="true"
  />
</template>
```

### fetcherCacheKey

The fetcher functionality makes use of [SWRV](https://docs-swrv.netlify.app/) to handle caching of response data. Whenever the cache key is changed the fetcher will automatically refire and repopulate the table data.

```html
<template>
  <KTable :fetcher="fetcher" :headers="headers" :fetcherCacheKey="cacheKey" />
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

An alternate implementation is to apply a `key` attribute to the `KTable` in conjunction with a `fetcher` and the SWRV `revalidate` function. To prevent unnecessary calls on mount, the `key` `ref` should have an initial value of `0`.

Since the `fetcher` function will handle the intial GET of the data, we want the cache key for the `revalidate` function to evaluate to `falsey` on page load (to avoid an unnecessary duplicate call), and will manually call `revalidate()` and increment the `key` to trigger a refetch and redraw of the table.

```html
<template>
  <KTable :key="key" :fetcher="fetcher" :headers="headers" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const key = ref(0) // initialized to zero
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

    const handleDelete = (id) => {
      try {
        const res = await services.delete(id)

        key.value++
        revalidate()
      } catch (error) {
        // handle error
      }
    }

    return {
      key,
      fetcher,
      headers,
      handleDelete
    }
  }
})
</script>
```

### searchInput

Pass in a string of search input for server-side table filtering. See [the Server-side function section](#server-side-functions) for an example.

### headers

Pass in an array of header objects for the table.

| Parameter | Type | Description
|:-------- |:------- |:-------
| `key` | string | A unique key for the column
| `label` | string | The label displayed on the table for the column
| `sortable` | boolean | Enables or disables server-side sorting for the column (`false` by default)
| `hideLabel`| boolean | Hides or displays the column label (useful for actions columns)
| `useSortHandlerFn` | boolean | Uses the function passed in the [sortHandlerFn](#sorthandlerfn) prop to sort the column data instead of the default client sorter function

:::tip Note
`sortable` columns emit a `sort` event when clicked, returns:

  ```json
  {
    prevKey,        // the previously sorted column
    sortColumnKey,  // the column being sorted now
    sortColumnOrder // the sort direction (asc/desc)
  }
  ```

:::

Example headers array:

```html
<script>
  export default {
    data() {
      return {
        headers: [
          { key: 'name', label: 'Name', sortable: true },
          { key: 'email', label: 'Email', sortable: true },
          { key: 'department', label: 'department', sortable: true },
          { key: 'start_date', label: 'Start Date', sortable: true },
          { key: 'actions', label: '', sortable: false, hideLabel: true },
        ]
      }
    }
  }
</script>
```

### initialFetcherParams

Pass in an object of parameters for the initial fetcher function call. If not provided, will default to the following values:

```js
{ pageSize: 15, page: 1, query: '', sortColumnKey: '', sortColumnOrder: '' }
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
[15, 30, 50, 75, 100]
```

### paginationType

Pass in the type of pagination to be used. Options are `default` (page/pageSize) or `offset` (offset/pageSize)

<KTable
  :fetcher="offsetPaginationFetcher"
  :headers="offsetPaginationHeaders"
  :initial-fetcher-params="{ pageSize: offsetPaginationPageSize }"
  pagination-type="offset" />

```html
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    pagination-type="offset"
  />
</template>
```

## Row Attributes

A prop to add custom properties to individual rows. The row object is passed as a param.

`rowAttrs` - This prop takes a function that returns an object comprising the attributes.

<KTable :fetcher="tableOptionsRowAttrsFetcher" :headers="tableOptionsRowAttrsHeaders" :rowAttrs="rowAttrsFn" />

```html
<template>
  <KTable :fetcher="fetcher" :headers="headers" :rowAttrs="rowAttrsFn" />
</template>

<script>
export default {
  methods: {
    rowAttrsFn (rowItem) {
      return {
        class: {
          'enabled': rowItem.enabled === 'true',
          'disabled': rowItem.enabled === 'false'
        },
        'data-testid': 'row-item'
      }
    }
  }
}
</script>

<style lang="scss">
.k-table {
  tr.enabled:hover {
    --KTableHover: var(--green-200, #ccffe1);
  }

  tr.disabled:hover {
    --KTableHover: var(--yellow-100, #fff9e6);
  }
}
</style>
```

## Cell Attributes

A prop to add custom properties to individual table cells or groups of cells. The cell attributes object is passed as a param.

`cellAttrs` - This prop takes a function that returns an object comprising the attributes.

| Parameter | Description
|:-------- |:-------
| `headerKey`| The header key of the column containing the cell
| `row` | The contents of the row containing the cell
| `rowIndex` | The zero-based index of the row containing the cell
| `colIndex`| The zero-based index of the cell within a row

<KTable :headers="tableOptionsCellAttrsHeaders" :fetcher="tableOptionsCellAttrsFetcher" :cellAttrs="cellAttrsFn" />

```html
<template>
  <KTable :fetcher="fetcher" :headers="headers" :cellAttrs="cellAttrsFn" />
</template>

<script>
export default {
  methods: {
    cellAttrsFn ({ headerKey, row, rowIndex, colIndex }) {
      /**
       * Sets cell background color based on data returned in
       * the row parameter and the index of the cell
       */
      const backgroundColor = () => {
        if (row.company && row.company === 'Google') {
          if (colIndex === 0) {
            return '#4285F4'
          } else if (colIndex === 1) {
            return '#DB4437'
          } else {
            return '#F4B400'
          }
        }

        return ''
      }

      /**
       * Returns an object of attributes to be applied to cells
       */
      return {
        class: {
          'truncate': headerKey === 'description' || headerKey === 'name',
        },
        'datatest-id': `row-${rowIndex + 1}-col-${headerKey}`,
        style: {
          'maxWidth': headerKey === 'description' ? '50ch' : headerKey === 'name' ? '22ch' : '25ch',
          'backgroundColor': backgroundColor(),
        },
      }
    }
  }
}
</script>
```

## Events

Bind DOM [events](https://developer.mozilla.org/en-US/docs/Web/Events) to various parts of the table. We support events on both table rows and cells, but must be careful with clickable content in rows when row click is enabled. You can also add logic to check for `metakey` to support cmd/ctrl when clicking. Examples highlighted below.

::: tip Note
Styles and other accessibility-related attributes to indicate whether a row can be clicked are automatically applied when a value that does not evaluate to `undefined` is provided for an event handler.

If you want to conditionally apply an event handler to `@row:click`, the value must evaluate to either a callback function, or `undefined`.

If you always provide a function as the value for `@row:click` the table will not be able to correctly determine whether the row should be clickable without executing the callback.

<h4><KIcon icon="check" size="22" color="var(--green-500)" style="vertical-align: sub;" class="mr-1" />Correct Usage</h4>

```
@row:click="isAllowedBool ? handleRowClick : undefined"
```

<h4><KIcon icon="disabled" size="22" color="var(--red-500)" style="vertical-align: sub;" class="mr-1" />Incorrect Usage</h4>

```
@row:click="(evt, row) => isAllowedBool ? handleRowClick(evt, row) : undefined"
```

:::

### Rows

`@row:{event}` - returns the `Event`, the row item, and the type: `row`
`row-click` - Event is emitted whenever a row is clicked and the row handler is fired, returns the row `data`

To avoid firing row clicks by accident, the row click handler ignores events coming from `a`, `button`, `input`, and `select` elements (unless they have the `disabled` attribute). As such click handlers attached to these element types do not require stopping propagation via `@click.stop`.

<KInputSwitch v-model="enableRowClick" :label="enableRowClick ? 'Row clicks enabled' : 'Row clicks disabled'" />

<KTable :headers="tableOptionsLinkHeaders" :fetcher="tableOptionsLinkFetcher" @row:click="enableRowClick ? handleRowClick : undefined">
  <template v-slot:company="{ rowValue }">
    <a @click="linkHander">{{rowValue.label}}</a>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <KButton appearance="secondary" @click="buttonHandler">
        Fire Button Handler!
      </KButton>
    </div>
  </template>
  <template v-slot:input>
    <KInput type="text" placeholder="Need help?" />
    <KInput type="text" placeholder="Row click me" disabled />
  </template>
</KTable>

```html
<KInputSwitch v-model="enableRowClick" :label="enableRowClick ? 'Row clicks enabled' : 'Row clicks disabled'" />

<KTable
  :fetcher="fetcher"
  :headers="headers"
  @row:click="enableRowClick ? handleRowClick : undefined">
  <template v-slot:company="{rowValue}">
    <!-- .stop not needed on @click because we ignore clicks from anchors -->
    <a @click="linkHander">{{rowValue.label}}</a>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <!-- .stop not needed on @click because we ignore clicks from buttons -->
      <KButton
        appearance="secondary"
        @click="buttonHandler">
        Fire Button Handler!
      </KButton>
    </div>
  </template>
  <template v-slot:input>
    <!-- no special handling needed because click events on input elements are ignored -->
    <KInput type="text" placeholder="Need help?" />
    <!-- row click is triggered when clicking disabled elements -->
    <KInput type="text" placeholder="Row click me" disabled />
  </template>
</KTable>

<script>
export default {
  data() {
    return {
      row: null,
      eventType: ''
    }
  },
  methods: {
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (metaKeyPressed) {
        this.$toaster.open('MetaKey row click')
      } else {
        this.$toaster.open('Row click event fired!')
      }
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
    }
  }
}
</script>
```

Click events tied to non-ignored elements (not `a`, `button`, `input`, `select`) must use the `.stop` keyword to stop propagation firing the row click handler.

Using a `KPop` inside of a clickable row requires some special handling. Non-clickable content must be wrapped in a `div` with the `@click.stop` attribute to prevent the row click handler from firing if a user clicks content inside of the popover. Any handlers on non-ignored elements will need to have `.stop`.

<KTable :headers="tableOptionsLinkHeaders2" :fetcher="tableOptionsLinkFetcher" @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a @click="linkHander">{{rowValue.label}}</a>
  </template>
  <template v-slot:wrapped>
    <div>Row click event <div class="d-inline-block" @click.stop="buttonHandler"><KBadge appearance="success">Button click</KBadge></div></div>
  </template>
  <template v-slot:other>
    <div>
      <KPop title="Cool header">
        <KButton>
          <template #icon>
            <KIcon
              icon="more"
              color="var(--black-400)"
              size="16"
            />
          </template>
        </KButton>
        <template v-slot:content>
          <div @click.stop>Clicking me does nothing!</div>
          <div class="d-inline-block" @click.stop="buttonHandler"><KBadge appearance="success">Button click</KBadge></div>
        </template>
      </KPop>
    </div>
  </template>
</KTable>

```html
<KTable
  :fetcher="fetcher"
  :headers="headers"
  @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a @click="linkHander">{{rowValue.label}}</a>
  </template>
  <template v-slot:wrapped>
    <!-- We have a click event on a div, div clicks are not ignored so we need .stop -->
    <div>Row click event <div @click.stop="buttonHandler"><KBadge appearance="success">Button click</KBadge></div></div>
  </template>
  <template v-slot:other>
    <div>
      <KPop title="Cool header">
        <KButton>
          <template #icon>
            <KIcon
              icon="more"
              color="var(--black-400)"
              size="16"
            />
          </template>
        </KButton>
        <template v-slot:content>
          <!-- non-clickable content in a KPop MUST be wrapped in a div with @click.stop to prevent row click firing on content click -->
          <div @click.stop>Clicking me does nothing!</div>
          <!-- an example where we want a click event to fire from the popover, requires .stop on the @click -->
          <div @click.stop="buttonHandler"><KBadge appearance="success">Button click</KBadge></div>
        </template>
      </KPop>
    </div>
  </template>
</KTable>
```

### Cells

`@cell:{event}` - returns the `Event`, the cell value, and the type: `cell`
`cell-click` - Event is emitted whenever a cell is clicked and the cell handler is fired, returns the cell `data`

<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTable
      :headers="tableOptionsHeaders"
      :fetcher="tableOptionsFetcher"
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</template>

#### Example

```html
<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTable
      :fetcher="fetcher"
      :headers="headers"
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</template>

<template>
  <KCard>
    <template v-slot:body>
      <div v-if="eventType">
        {{eventType}} on: {{row}}
      </div>
      <div v-else>Waiting</div>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        has-hover
        @row:click="actionRow"
        @cell:mouseover="actionRow"
      />
    </template>
  </KCard>
</template>

<script>
export default {
  data() {
    return {
      row: null,
      eventType: ''
    }
  },
  methods: {
    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    }
  }
}
</script>
```

## Slots

### Toolbar

The `toolbar` slot allows you to slot table controls rendered right above the `<table>` element such as a search input or other UI elements.

If utilizing multiple elements, we recommend adding `display: flex; width: 100%;` to the root slot tag.

<KTable :fetcher="tableOptionsFetcher" :headers="tableOptionsHeaders" :hasHover="false">
  <template #toolbar>
    <div class="d-flex w-100 justify-content-between">
      <KInput placeholder="Search" />
      <KSelect appearance="select" :items="[{ label: 'First option', value: '1', selected: true }, { label: 'Another option', value: '2'}]" />
    </div>
  </template>
</KTable>

```html
<KTable :fetcher="fetcher" :headers="headers">
  <template #toolbar>
    <div class="d-flex w-100 justify-content-between">
      <KInput placeholder="Search" />
      <KSelect appearance="select" :items="[{ label: 'Ascending', value: 'asc', selected: true }, { label: 'Descending', value: 'desc'}]" />
    </div>
  </template>
</KTable>
```

### Column Header and Cell

Both column cells & header cells are slottable in KTable. Use slots to gain access to the row data.

- `column-{column-key}` - Will slot the header cell
- `{column-key}` - Will slot the column cell of a given row

#### Column Header

<KTable :headers="tableOptionsHeaders" :fetcher="tableOptionsFetcher">
  <template v-slot:column-name="{ column }">
    {{ column.label.toUpperCase() }}
  </template>
</KTable>

```html
<template>
  <KTable :fetcher="fetcher" :headers="headers">
    <!-- Slot column header "name" -->
    <template v-slot:column-name="{ column }">
      {{ column.label.toUpperCase() }}
    </template>
  </KTable>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { key: 'name', label: 'Name', sortable: false },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'enabled', label: 'Enabled', sortable: false }
      ]
    }
  }
}
</script>
```

#### Column Cell

This example uses the [`KDropdownMenu`](/components/dropdown-menu) component as the slot content for the `actions` column.

<div>
  <KTable
    :headers="tableOptionsHeaders"
    :fetcher="tableOptionsFetcher">
    <template v-slot:enabled="{rowValue}">
      <span v-if="rowValue" style="color: green">&#10003;</span>
      <span v-else style="color: red">&#10007;</span>
    </template>
    <template v-slot:actions>
      <KDropdownMenu>
        <template #default>
          <KButton
            appearance="secondary"
            size="small"
            class="non-visual-button"
          >
            <template #icon>
              <KIcon
                icon="more"
                color="var(--black-400)"
                size="16"
              />
            </template>
          </KButton>
        </template>
        <template #items>
          <KDropdownItem @click="clickHandler('Edit clicked!')">
            Edit
          </KDropdownItem>
          <KDropdownItem
            has-divider
            is-dangerous
            @click="clickHandler('Delete clicked!')"
          >
            Delete
          </KDropdownItem>
        </template>
      </KDropdownMenu>
    </template>
  </KTable>
</div>

```html
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
  >
    <!-- Slot each "enabled" cell in each row & add icon if matching value -->
    <template v-slot:enabled="{rowValue}">
      <span v-if="rowValue" style="color: green">&#10003;</span>
      <span v-else style="color: red">&#10007;</span>
    </template>
    <!-- Slot each "actions" cell in each row & link -->
    <template v-slot:actions>
      <KDropdownMenu>
        <template #default>
          <KButton
            appearance="secondary"
            size="small"
            class="non-visual-button"
          >
            <template #icon>
              <KIcon
                icon="more"
                color="var(--black-400)"
                size="16"
              />
            </template>
          </KButton>
        </template>
        <template #items>
          <KDropdownItem @click="clickHandler('Edit clicked!')">
            Edit
          </KDropdownItem>
          <KDropdownItem
            has-divider
            is-dangerous
            @click="clickHandler('Delete clicked!')"
          >
            Delete
          </KDropdownItem>
        </template>
      </KDropdownMenu>
    </template>
  </KTable>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { key: 'name', label: 'Name', sortable: false },
        { key: 'id', label: 'ID', sortable: false },
        { key: 'enabled', label: 'Enabled', sortable: false }
      ]
    }
  }
}
</script>
```

### State Slots

KTable has built-in state management for loading, empty, and error states. You can either use the props described in
the section below or completely slot in your own content.

- `empty-state` - Slot content to be displayed when empty
- `error-state` - Slot content to be displayed when in an error state

<KCard>
  <template v-slot:body>
    <KTable :fetcher="emptyFetcher" :headers="headers">
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
    </KTable>
  </template>
</KCard>

```html
<template>
  <KTable :fetcher="() => { return { data: [] } }" :headers="headers">
    <template v-slot:empty-state>
      <KIcon icon="warning" />
      No Content!!!
    </template>
    <template v-slot:error-state>
      <KIcon icon="error" />
      Something went wrong
    </template>
  </KTable>
</template>
```

## States

### Empty

Set the following properties to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIcon` - Icon for empty state
- `emptyStateIconColor` - Color for empty state icon
- `emptyStateIconSize` - Size for empty state icon
- `emptyStateActionRoute` - Route for empty state action
- `emptyStateActionMessage` - Button text for empty state action
- `emptyStateActionButtonIcon` - Icon for the empty state action button

If using a CTA button, a `@ktable-empty-state-cta-clicked` event is fired when clicked.

#### Default Empty State Messaging

<KCard class="my-2">
  <template v-slot:body>
    <KTable :fetcher="() => { return { data: [] } }" />
  </template>
</KCard>

```html
<template>
  <KCard>
    <template v-slot:body>
      <KTable :fetcher="fetcher" :headers="headers" />
    </template>
  </KCard>
</template>
```

#### Empty State Full Example

<KCard class="my-2">
  <template v-slot:body>
    <KTable
      :fetcher="() => { return { data: [] } }"
      emptyStateTitle="No Workspaces exist"
      emptyStateMessage="Adding a new Workspace will populate this table."
      emptyStateActionMessage="Create a Workspace"
      emptyStateActionButtonIcon="plus"
      emptyStateActionRoute="#empty-state-full-example"
      emptyStateIcon="workspaces"
      emptyStateIconColor="#5996ff"
      emptyStateIconSize="35" />
  </template>
</KCard>

```html
<!-- Using a route string -->
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        emptyStateTitle="No Workspaces exist"
        emptyStateMessage="Adding a new Workspace will populate this table."
        emptyStateActionMessage="Create a Workspace"
        emptyStateActionButtonIcon="plus"
        emptyStateActionRoute="create-workspace"
        emptyStateIcon="workspaces"
        emptyStateIconColor="#5996ff"
        emptyStateIconSize="35" />
    </template>
  </KCard>
</template>

<!-- Using a route object -->
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        emptyStateTitle="No Workspaces exist"
        emptyStateMessage="Adding a new Workspace will populate this table."
        emptyStateActionMessage="Create a Workspace"
        emptyStateActionButtonIcon="plus"
        emptyStateActionRoute="{
          name: 'create-workspace',
          params: {
            organizationId: 'd27e40e0-c9ac-43e2-8be8-54862fab45ea'
          }
        }"
        emptyStateIcon="workspaces"
        emptyStateIconColor="#5996ff"
        emptyStateIconSize="35" />
    </template>
  </KCard>
</template>
```

### Error

Set the following properties to handle error state:

- `hasError` - Boolean to toggle error state
- `errorStateTitle` - Title text for error state
- `errorStateMessage` - Message for error state
- `errorStateIcon` - Icon for error state
- `errorStateIconColor` - Color for error state icon
- `errorStateIconSize` - Size for error state icon
- `errorStateActionRoute` - Route for error state action
- `errorStateActionMessage` - Button text for error state action

If using a CTA button, a `ktable-error-cta-clicked` event is fired when clicked.

#### Default Error State Messaging

<KCard class="my-2">
  <template v-slot:body>
    <KTable :fetcher="() => { return { data: [] } }" :hasError="true" />
  </template>
</KCard>

```html
<template>
  <KCard>
    <template v-slot:body>
      <KTable :fetcher="fetcher" :headers="headers" :hasError="true" />
    </template>
  </KCard>
</template>
```

#### Error State Full Example

<KCard class="my-2">
  <template v-slot:body>
    <KTable
      :fetcher="() => { return { data: [] } }"
      :hasError="true"
      errorStateTitle="Something went wrong"
      errorStateMessage="We are not able to load the data for this table."
      errorStateActionMessage="Report an Issue"
      errorStateActionRoute="#error-state-full-example"
      errorStateIcon="dangerCircle"
      errorStateIconColor="#e6173a"
      errorStateIconSize="35" />
  </template>
</KCard>

```html
<!-- Using a route string -->
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        :hasError="true"
        errorStateTitle="Something went wrong"
        errorStateMessage="We are not able to load the data for this table."
        errorStateActionMessage="Report an Issue"
        errorStateActionRoute="report-issue"
        errorStateIcon="dangerCircle"
        errorStateIconColor="#e6173a"
        errorStateIconSize="35" />
    </template>
  </KCard>
</template>

<!-- Using a route object -->
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        :hasError="true"
        errorStateTitle="Something went wrong"
        errorStateMessage="We are not able to load the data for this table."
        errorStateActionMessage="Report an Issue"
        errorStateActionRoute="{
          name: 'report-issue',
          params: {
            organizationId: 'd27e40e0-c9ac-43e2-8be8-54862fab45ea'
          }
        }"
        errorStateIcon="dangerCircle"
        errorStateIconColor="#e6173a"
        errorStateIconSize="35" />
    </template>
  </KCard>
</template>
```

### Loading

Set the `isLoading` prop to `true` to enable the loading state.

<KCard class="pb-0 mt-2">
  <template v-slot:body>
    <KTable
      :fetcher="() => { return { data: [] } }"
      :isLoading="true"
      class="my-0" />
  </template>
</KCard>

```html
<template>
<KCard>
  <template v-slot:body>
    <KTable
      :fetcher="fetcher"
      :headers="headers"
      :isLoading="true" />
  </template>
</KCard>
</template>
```

## Server-side functions

Pass a fetcher function to enable server-side search, sort and pagination. The fetcher function should structure the ajax request URL in such a way that enables server side sort, search and pagination per the requirements of the API being used.

::: tip Note
The loading state is handled automatically. When the `fetcher` is called the internal loading state is triggered and will be resolved when the fetcher returns. You can override this behavior using the `isLoading` prop.
:::

<KTable :fetcher="fetcher" :headers="headers" />

```txt
Example URL

https://kongponents.dev/api/components?_page=1&_limit=10&_sort=name&_order=desc
```

```html
<!-- Example Component Usage -->

<KCard>
  <template v-slot:body>
    <KInput placeholder="Search" v-model="search" type="search" />
    <KTable
      :fetcher="fetcher"
      :initial-fetcher-params="{
        pageSize: 15,
        page: 1,
        query: '',
        sortColumnKey: '',
        sortColumnOrder: ''
      }"
      :headers="[
        { label: 'Title', key: 'title', sortable: true },
        { label: 'Description', key: 'description', sortable: true },
        { label: 'Enabled', key: 'enabled', sortable: false }
      ]"
      :search-input="search"
    />
  </template>
</KCard>
```

```js
// Example Fetcher Function

fetcher(payload) {
  const { pageSize, page, query, sortColumnKey, sortColumnOrder, offset } = payload

  const params = {
    _limit: pageSize,
    _page: page
  }

  if (query) {
    params.q = query
    params._page = 1
  }

  if (sortKey) {
    params._sort = sortColumnKey
    params._order = sortColumnOrder
  }

  if (offset) {
    params._offset = offset
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

| Variable | Purpose
|:-------- |:-------
| `--KTableBorder`| Sets cell border color
| `--KTableColor` | Font color
| `--KTableHover`| Hover variant background color
| `--KTableHeaderSize`| Font size of header th

\
An Example of changing the hover background might look like.

<div class="table-wrapper">
  <KTable :headers="tableOptionsHeaders" :fetcher="tableOptionsFetcher" hasHover />
</div>

```html
<template>
  <KTable :fetcher="fetcher" :headers="headers" hasHover />
</template>

<style>
:root {
  --KTableHover: lavender;
}
</style>
```

<!-- The markdownlint disable below is necessary due to some syntax in the <script> tags - `yarn lint` will not pass without this -->
<!-- markdownlint-disable MD011 MD037 -->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      row: null,
      eventType: '',
      enableRowClick: true,
      offsetPaginationPageSize: 15,
      offsetPaginationData: {},
      headers: [
        { label: 'Title', key: 'title', sortable: true },
        { label: 'Description', key: 'description', sortable: true },
        { label: 'Enabled', key: 'enabled', sortable: false }
      ],
      tableOptionsHeaders: [
        { label: 'Name', key: 'name' },
        { label: 'ID', key: 'id' },
        { label: 'Enabled', key: 'enabled' },
        { key: 'actions', hideLabel: true }
      ],
      tableOptionsRowAttrsHeaders: [
        { label: 'Type', key: 'type' },
        { label: 'Value', key: 'value' },
        { label: 'Enabled', key: 'enabled'}
      ],
      tableOptionsLinkHeaders: [
        { label: 'Company', key: 'company' },
        { label: 'Input', key: 'input' },
        { key: 'actions', hideLabel: true }
      ],
      tableOptionsLinkHeaders2: [
        { label: 'Company', key: 'company' },
        { label: 'Wrapped', key: 'wrapped' },
        { label: 'Pop', key: 'other' }
      ],
      tableOptionsCellAttrsHeaders: [
        { label: 'Name', key: 'name' },
        { label: 'Company', key: 'company' },
        { label: 'Description', key: 'description' }
      ],
      sortHandlerFnHeaders: [
        { label: 'Host', key: 'hostname', sortable: true },
        { label: 'Version', key: 'version', sortable: true },
        { label: 'Connected', key: 'connected', sortable: true },
        { label: 'Last Seen', key: 'last_seen', sortable: true, useSortHandlerFn: true }
      ],
      offsetPaginationHeaders: [
        { label: 'Host', key: 'hostname', sortable: false },
        { label: 'Version', key: 'version', sortable: false },
        { label: 'Connected', key: 'connected', sortable: false },
        { label: 'Last Seen', key: 'last_seen', sortable: false }
      ]
    }
  },
  methods: {
    resolveAfter5MiliSec(count, pageSize, page, sortKey, sortOrder) {
      // simulate pagination and sort
      let limit = count
      if ((pageSize *page) < count) {
        limit = pageSize
      }
      let myItems = []
      for (let i = ((page-1)* pageSize); i < limit; i++) {
          let offset = sortOrder === 'asc' ? count-i : i+1
          myItems.push({
            title: "Item " + offset,
            description: "The item's description for number " + offset,
            enabled: offset % 2 === 0
          })
        }

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(myItems);
        }, 500);
      });
    },

    async fetcher(payload) {
      const params = {
        _limit: payload.pageSize,
        _page: payload.page,
        data: await this.resolveAfter5MiliSec(20, payload.pageSize, payload.page, payload.sortColumnKey, payload.sortColumnOrder),
        total: 20
      }
      return params
    },

    tableOptionsFetcher () {
      return {
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true'
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false'
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    },

    emptyFetcher () {
      return { data: [] }
    },

    tableOptionsLinkFetcher () {
      return {
        data: [
          { company: { href: 'http://www.creative.com', label: 'Creative Labs' } },
          { company: { href: 'http://www.bang-olufsen.com', label: 'Bang&Olufsen' } },
          { company: { href: 'http://www.klipsch.com', label: 'Klipsch' } },
          { company: { href: 'http://www.bose.com', label: 'Bose'} },
          { company: { href: 'http://www.sennheiser.com', label: 'Sennheiser'} }
        ]
      }
    },

    tableOptionsRowAttrsFetcher () {
      return {
        data: [
          {
            type: 'desktop',
            value: 'Windows 10',
            enabled: 'true'
          },
          {
            type: 'phone',
            value: 'LineageOS',
            enabled: 'false'
          },
          {
            type: 'tablet',
            value: 'ipadOS',
            enabled: 'true'
          }
        ]
      }
    },

    tableOptionsCellAttrsFetcher() {
      return {
        data: [
          {
            name: 'SageMaker',
            company: 'Amazon',
            description: 'Amazon SageMaker is a fully-managed service that enables developers and data scientists to quickly and easily build, train, and deploy machine learning models at any scale. Amazon SageMaker removes all the barriers that typically slow down developers who want to use machine learning.',
          },
          {
            name: 'Azure Machine Learning Studio',
            company: 'Microsoft',
            description: 'Azure Machine Learning Studio is a GUI-based integrated development environment for constructing and operationalizing Machine Learning workflow on Azure.',
          },
          {
            name: 'IBM Watson Machine Learning',
            company: 'IBM',
            description: 'IBM Watson Studio accelerates the machine and deep learning workflows required to infuse AI into your business to drive innovation.',
          },
          {
            name: 'TensorFlow',
            company: 'Google',
            description: 'TensorFlow is an open source software library for numerical computation using data flow graphs.',
          },
        ]
      }
    },

    sortHandlerFn({ key, prevKey, sortColumnOrder, data}) {
      return data.sort((a, b) => {
        if (key === 'last_seen') {
          if (sortColumnOrder === 'asc') {
            if (a.last_ping < b.last_ping) {
              return 1
            } else if (a.last_ping > b.last_ping) {
              return -1
            }

            return 0
          } else {
            if (a.last_ping < b.last_ping) {
              return -1
            } else if (a.last_ping > b.last_ping) {
              return 1
            }

            return 0
          }
        }
      })
    },

    sortHandlerFnFetcher() {
      return {
        data: [
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.0.0-enterprise-edition',
            hostname: '99e591ae3776',
            last_ping: 1648855072,
            connected: 'Disconnected',
            last_seen: '6 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.7.0.0-enterprise-edition',
            hostname: '19e591ae3776',
            last_ping: 1649362660,
            connected: 'Connected',
            last_seen: '3 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.1.0-enterprise-edition',
            hostname: '79e591ae3776',
            last_ping: 1649355460,
            connected: 'Connected',
            last_seen: '5 hours ago',
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.6.0.0-enterprise-edition',
            hostname: '89e591ae3776',
            last_ping: 1648155072,
            connected: 'Disconnected',
            last_seen: '14 days ago'
          },
          {
            id: '08cc7d81-a9d8-4ae1-a42f-8d4e5a919d07',
            version: '2.8.2.0-enterprise-edition',
            hostname: '59e591ae3776',
            last_ping: 1649855072,
            connected: 'Connected',
            last_seen: 'Just now'
          },
        ]
      }
    },

    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    },
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (metaKeyPressed) {
        this.$toaster.open('MetaKey row click')
      } else {
        this.$toaster.open('Row click event fired!')
      }
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
    },
    clickHandler (msg) {
      this.$toaster.open(msg)
    },
    rowAttrsFn (rowItem) {
      return {
        class: {
          'enabled': rowItem.enabled === 'true',
          'disabled': rowItem.enabled === 'false'
        },
        'data-testid': 'row-item'
      }
    },
    cellAttrsFn ({ headerKey, row, rowIndex, colIndex }) {
      /**
       * Sets cell background color based on data returned in
       * the row parameter and the index of the cell
       */
      const backgroundColor = () => {
        if (row.company && row.company === 'Google') {
          if (colIndex === 0) {
            return '#4285F4'
          } else if (colIndex === 1) {
            return '#DB4437'
          } else {
            return '#F4B400'
          }
        }

        return ''
      }

      /**
       * Returns an object of attributes to be applied to cells
       */
      return {
        class: {
          'truncate': headerKey === 'description' || headerKey === 'name',
        },
        'datatest-id': `row-${rowIndex + 1}-col-${headerKey}`,
        style: {
          'maxWidth': headerKey==='description' ? '50ch' : headerKey === 'name' ? '22ch' : '25ch',
          'backgroundColor': backgroundColor(),
        },
      }
    },

    async generateOffsetPaginationTableData(pgSize) {
      const pageSize = pgSize || this.offsetPaginationPageSize
      const data = []
      const offsetObj = {}
      const offsetVal = 'offset'

      for (let i = 0; i < 50; i++) {
        data.push({
          id: `08cc7d81-a9d8-4ae1-a42f-8d4e5a919d0${i}`,
          version: '2.8.0.0-enterprise-edition',
          hostname: `99e591ae377${i}`,
          last_ping: 1648855072,
          connected: 'Connected',
          last_seen: `${i} days ago`
        })
      }

      const totalPages = Math.ceil(data.length / pageSize)

      for (let i = 0; i < totalPages; i++) {
        const start = i * pageSize
        const end = pageSize * (i + 1)

        offsetObj[`${offsetVal}_${i}`] = { data: [], pagination: { offset: '' } }
        offsetObj[`${offsetVal}_${i}`].data = data.slice(start, end)

        if (i < totalPages - 1) {
          offsetObj[`${offsetVal}_${i}`].pagination.offset = `${offsetVal}_${i + 1}`
        }
      }

      this.offsetPaginationData = offsetObj
    },

    async offsetPaginationFetcher({ pageSize, offset }) {
      if (pageSize !== this.offsetPaginationPageSize) {
        this.offsetPaginationPageSize = pageSize
        this.generateOffsetPaginationTableData()
      }

      return offset
        ? this.offsetPaginationData[offset]
        : Object.values(this.offsetPaginationData)[0]
    },
  },
  mounted() {
    this.generateOffsetPaginationTableData()
  }
})
</script>

<style lang="scss">
.table-docs .k-table {
  display: table;

  th, tr, td {
    border: unset;
  }
}

.table-wrapper {
  --KTableHover: lavender;
}

.k-table {
  tr.enabled:hover {
    --KTableHover: var(--green-200, #ccffe1);
  }

  tr.disabled:hover {
    --KTableHover: var(--yellow-100, #fff9e6);
  }
}
</style>
