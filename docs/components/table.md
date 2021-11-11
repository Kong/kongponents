---
pageClass: table-docs
---
# Table

Pass a fetcher function to build a slot-able table.

```vue
  <KTable
    :fetcher="fetcher"
    :headers="headers" />
```

## Props

### Hover

Highlight the table row on hover. By default this is set to true. In the example we can set it to false as well.

<KTable
  :options="tableOptions"
  :hasHover="false" />

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :hasHover="false" />
</template>
```

### Clickable

Adds `user-select: none` styling and emits `row-clicked` event with `row` data as the payload.

<KTable
  :options="tableOptions"
  isClickable />

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    isClickable />
</template>
```

### hasSideBorder

Adds left border to each table row. By default set to false. The colors can be overridden by themes.
The below example demonstrates the disabled state:

<KTable
  :options="tableOptions"
  :hasSideBorder="true" />

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :hasSideBorder="true" />
</template>
```

### hasError

See [the State section](#error) about `hasError`

### isLoading

See [the State section](#loading) about `isLoading`

### fetcher

Use a custom fetcher function to fetch table data and leverage server-side search, sort and pagination.
::: tip Note: 
All fetcher functions should take a single param. This parameter is a JSON
object supporting the following properties: 
  - Pagination support: `page`, `pageSize`
  - Sort support: `sortColumnKey`, `sortColumnOrder`
  - Search support: `query`
:::

::: tip Note: 
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

### searchInput

Pass in a string of search input for server-side table filtering. See [the Server-side function section](#server-side-functions) 
for an example.


### headers

Pass in an array of header objects for the table.

| Parameter | Type | Description
|:-------- |:------- |:-------
| `key` | string | A unique key for the column
| `label` | string | The label displayed on the table for the column
| `sortable` | boolean | Enables or disables server-side sorting for the column
| `hideLabel`| boolean | Hides or displays the column label (useful for actions columns)

Example headers array:

```vue
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

Pass in an object of parameters for the initial fetcher function call. If not provided,
will default to the following values:

```js
{ pageSize: 15, page: 1, query: '', sortColumKey: '', sortColumOrder: '' }
```

### paginationTotalItems

Pass the total number of items in the set to populate the pagination text: 

```
1 to 20 of <paginationTotalItems>
```

If not provided the fetcher response should return a top-level property `total` or return a `data` property that is an array.

### paginationNeighbors

Pass in a number of pagination neighbors to be used by the pagination component

### paginationPageSizes

Pass in a number of pagination neighbors to be used by the pagination component. If not provided
will default to the following:

```js
[15, 25, 50, 75, 100]
```

## Row Attributes

Add custom properties to individual rows. The row object is passed as a param.

`rowAttrs` - Function that returns an object comprising the attributes.

<KTable
  :options="tableOptionsRowAttrs"
  :rowAttrs="rowAttrsFn" />

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :rowAttrs="rowAttrsFn" />
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
<style>
.k-table {
  tr.enabled {
    --KTableHover: var(--green-200, #ccffe1);
    --KTableBorder: var(--green-400, #19a654);
  }

  tr.disabled {
    --KTableHover: var(--yellow-100, #fff9e6);
    --KTableBorder: var(--yellow-200, #ffdc73);
  }
}
</style>
```

## Cell Attributes

Add custom properties to individual table cells or groups of cells. The cell attributes object is passed as a param.

`cellAttrs` - A function that returns an object comprising the attributes.

| Parameter | Description
|:-------- |:-------
| `headerKey`| The header key of the column containing the cell
| `row` | The contents of the row containing the cell
| `rowIndex` | The zero-based index of the row containing the cell
| `colIndex`| The zero-based index of the cell within a row

<KTable
  :options="tableOptionsCellAttrs"
  :cellAttrs="cellAttrsFn" />

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    :cellAttrs="cellAttrsFn" />
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

Bind any DOM [events](https://developer.mozilla.org/en-US/docs/Web/Events) to
various parts of the table. We support events on both table rows and cells in addition to click elements inside a row (ie. buttons or hyperlinks) without triggering the a row or cell event. You can also add logic to check for `metakey` to support cmd/ctrl when clicking. Examples highlighted below.

### Rows

`@row:<event>` - returns the `Event`, the row item, and the type: `row`

```vue
<KTable @row:click="rowHandler" @row:dblclick="rowHandler">
```

<KTable
  :options="tableOptionsLink"
  isClickable
  @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a v-if="rowValue" @click="linkHander">{{rowValue.label}}</a>
    <span v-else>{{rowValue}}</span>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <KButton
        appearance="secondary"
        @click="buttonHandler">
        Visit Website
      </KButton>
    </div>
  </template>
</KTable>

```vue{6,8,15,30-46}
<KTable
  :fetcher="fetcher"
  :headers="headers"
  isClickable
  @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a v-if="rowValue" @click="linkHander">{{rowValue.label}}</a>
    <span v-else>{{rowValue}}</span>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <KButton
        appearance="secondary"
        @click="buttonHandler">
        Visit Website
      </KButton>
    </div>
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
        return window.open(row.company.href)
      } else {
        window.location = row.company.href
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

### Cells

`@cell:<event>` - returns the `Event`, the cell value, and the type: `cell`

```vue
<KTable @cell:mouseout="cellHandler" @cell:mousedown="cellHandler">
```

<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTable
      :options="tableOptions"
      is-clickable
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</template>

#### Example

```vue
<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTable
      :fetcher="fetcher"
      :headers="headers"
      is-clickable
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
        is-clickable
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

Both column cells & header cells are slottable in KTable. Use slots to gain
access to the row data.

- `column-{column-key}` - Will slot the header cell
- `{column-key}` - Will slot the column cell of a given row

### Column Header

<KTable :options="tableOptions">
  <template v-slot:column-name="{ column }">
    {{ column.label.toUpperCase() }}
  </template>
</KTable>

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
  >
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

### Column Cell

<KTable :options="tableOptions">
  <template v-slot:enabled="{rowValue}">
    <span v-if="rowValue" style="color: green">&#10003;</span>
    <span v-else style="color: red">&#10007;</span>
  </template>
  <template v-slot:actions><KButton appearance="btn-link">Edit</KButton></template>
</KTable>

```vue
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
    <template v-slot:actions><a href="">Edit</a></template>
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

#### Default Empty State Messaging

<KCard class="my-2">
  <template v-slot:body>
    <KTable />
  </template>
</KCard>

```vue
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers" />
    </template>
  </KCard>
</template>
```

#### Empty State Full Example

<KCard class="my-2">
  <template v-slot:body>
    <KTable
      emptyStateTitle="No Workspaces exist"
      emptyStateMessage="Adding a new Workspace will populate this table."
      emptyStateActionMessage="Create a Workspace"
      emptyStateActionRoute="#empty-state-full-example"
      emptyStateIcon="workspaces"
      emptyStateIconColor="#5996ff"
      emptyStateIconSize="35" />
  </template>
</KCard>

```vue
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

#### Default Error State Messaging

<KCard class="my-2">
  <template v-slot:body>
    <KTable :hasError="true" />
  </template>
</KCard>

```vue
<template>
  <KCard>
    <template v-slot:body>
      <KTable
        :fetcher="fetcher"
        :headers="headers"
        :hasError="true" />
    </template>
  </KCard>
</template>
```

#### Error State Full Example

<KCard class="my-2">
  <template v-slot:body>
    <KTable
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

```vue
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
      :isLoading="true"
      class="my-0" />
  </template>
</KCard>

```vue
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

Pass a fetcher function to enable server-side search, sort and pagination.
The fetcher function should structure the ajax request URL in such a way that
enables server side sort, search and pagination per the requirements of the API
being used.

<KTable
  :fetcher="fetcher"
  :headers="headers" />

```http
Example URL

https://kongponents.dev/api/components?_page=1&_limit=10&_sort=name&_order=desc
```

```vue
<!-- Example Component Usage -->

<KCard>
  <template v-slot:body>
    <KInput placeholder="Search..." v-model="search" type="search" />
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
  <KTable
    :options="tableOptions"
    hasHover />
</div>

```vue
<template>
  <KTable
    :fetcher="fetcher"
    :headers="headers"
    hasHover />
</template>

<style>
:root {
  --KTableHover: lavender;
}
</style>
```

<script>
export default {
  data() {
    return {
      row: null,
      eventType: '',
      sortOrder: 'ascending',
      sortKey: 'name',
      headers: [
          { label: 'Title', key: 'title', sortable: true },
          { label: 'Description', key: 'description', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: false }
      ],
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name', sortable: true },
          { label: 'ID', key: 'id', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: true },
          { key: 'actions', hideLabel: true }
        ],
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
      },
      tableOptionsRowAttrs: {
        headers: [
          { label: 'Type', key: 'type' },
          { label: 'Value', key: 'value' },
          { label: 'Enabled', key: 'enabled'}
        ],
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
      },
      tableOptionsLink: {
        headers: [
          { label: 'Company', key: 'company' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          { company: { href: 'http://www.creative.com', label: 'Creative Labs' } },
          { company: { href: 'http://www.bang-olufsen.com', label: 'Bang&Olufsen' } },
          { company: { href: 'http://www.klipsch.com', label: 'Klipsch' } },
          { company: { href: 'http://www.bose.com', label: 'Bose'} },
          { company: { href: 'http://www.sennheiser.com', label: 'Sennheiser'} }
        ]
      },
      tableOptionsCellAttrs: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'Company', key: 'company' },
          { label: 'Description', key: 'description' }
        ],
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
    }
  },
  methods: {
    resolveAfter5MiliSec(count, pageSize, page, sortKey, sortOrder) {
      // simulate pagination and sort
      let limit = count
      if ((pageSize * page) < count) {
        limit = pageSize
      } 
      let myItems = []
        for (let i = ((page-1) * pageSize); i < limit; i++) {
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

    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    },
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (e.target.tagName !== 'BUTTON') {
        if (metaKeyPressed) {
          return window.open(row.company.href)
        } else {
          window.location = row.company.href
        }
      }
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
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
  }
}
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
    tr.enabled {
      --KTableHover: var(--green-200, #ccffe1);
      --KTableBorder: var(--green-400, #19a654);
    }

    tr.disabled {
      --KTableHover: var(--yellow-100, #fff9e6);
      --KTableBorder: var(--yellow-200, #ffdc73);
    }
  }
</style>
