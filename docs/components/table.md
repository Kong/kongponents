---
pageClass: table-docs
tableOptions:
  headers:
    - label: Name
      key: name
    - label: ID
      key: id
    - label: Enabled
      key: enabled
    - key: actions
      hideLabel: true
  data:
    - name: Basic Auth
      id: 517526354743085
      enabled: true
    - name: Website Desktop
      id: 328027447731198
      enabled: false
    - name: Android App
      id: 405383051040955
      enabled: true
---
# Table
Pass an object of headers & data to build a slot-able table.

<KTable :options="$frontmatter.tableOptions" />

```vue
<template>
  <KTable :options="tableOptions" />
</template>
<script>
export default {
  data() {
    return {
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
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
      }
    }
  }
}
</script>
```
## Props
### Hover
Highlight the table row on hover

<KTable :options="$frontmatter.tableOptions" hasHover />
```vue
<KTable
  :options="tableOptions"
  hasHover />
```

### Small
Lessen the table cell padding

<KTable :options="$frontmatter.tableOptions" isSmall />
```vue
<KTable
  :options="tableOptions"
  isSmall />
```

### Clickable
Adds `cursor: pointer` and `user-select: none` styling. 

<KTable :options="$frontmatter.tableOptions" isClickable />
```vue
<KTable
  :options="tableOptions"
  isClickable />
```

## Events
Bind any DOM [events](https://developer.mozilla.org/en-US/docs/Web/Events) to
various parts of the table.

### Rows
- `@row:<event>` - returns the `Event`, the row item, and the type: `row`

```vue
<KTable @row:click="rowHandler" @row:dblclick="rowHandler">
```

### Cells

- `@cell:<event>` - returns the `Event`, the cell value, and the type: `cell`

```vue
<KTable @cell:mouseout="cellHandler" @cell:mousedown="cellHandler">
```

#### Example

```vue
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

<KCard>
  <div slot="body">
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    
    <KTable 
      :options="$frontmatter.tableOptions"
      is-clickable
      has-hover
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</KCard>

### Sorting

- `@sort` - returns header key that was clicked and current `sortOrder`.

There are two props used to make the table sortable; `sortOrder`, which is
either 'ascending' or 'descending' and `sortKey`, which tells the table which
column is currently being sorted. If a sortKey exists, then clicking the table
header will emit an Event called `sort` which must be handled by the parent
component to implement the actual sorting logic. A basic implementation of
`sort` called `defaultSorter` is included in KTable and can be imported
separately and used with a helper function in the parent. Once a table column
with `sortable` is read, that column header will become clickable. An arrow then
appears beside the table header, the state of the arrow depending on the
sortOrder. In the following example, the `defaultSorter` from KTable is being
imported, and the table is able to be sorted by any of the three columns by
clicking on the headers.

<template>
  <KTable
    :options="tableOptions"
    :sort-order="sortOrder"
    :sort-key="sortKey"
    @sort="sortFieldHelper"
    />
</template>

```vue
<template>
<KTable
    :options="tableOptions"
    :sort-order="sortOrder"
    :sort-key="sortKey"
    @sort="sortFieldHelper"
    />
</template>
<script>
import { defaultSorter } from '@kongponents/KTable'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      sortOrder: 'ascending',
      sortKey: 'name',
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name', sortable: true },
          { label: 'ID', key: 'id', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: true },
          { label: 'Theme Colors', key: 'themeColors', sortable: true },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true',
            themeColors: []
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false',
            themeColors: ['blue','violet']
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true',
            themeColors: ['green', 'yellow']
          }
        ]
      }
    }
  },
  methods: {
    sortFieldHelper (key) {
      const {previousKey, sortOrder } = this.defaultSorter(key, this.sortKey, this.sortOrder, this.tableOptions.data)
      this.sortKey = previousKey
      this.sortOrder = sortOrder
    },
    defaultSorter
  }
}
</script>
```

### Custom Row Attributes

There is a prop called `hasSideBorder` that when passed in, enables a default side border on each row, using the color `steal-200` by default.
It also adds a default hover color on the row that uses the color `steal-100` by default. These colors can be overridden by themes or by using
custom row attributes. This prop also causes the row borders to be separate and enables spacing between rows.
Example using `hasSideBorder` prop:

<template>
  <KTable
    :options="tableOptions"
    hasSideBorder
    />
</template>

```vue
<template>
  <KTable
    :options="tableOptions"
    hasSideBorder
    />
</template>
```

We can also add custom row attributes via a prop called `rowAttrs` - this prop is a Function that returns an object comprising the conditional custom attributes
that you want the rows to have. `hasSideBorder` prop must be passed in to enable custom row attributes.
In the following example, the rows have a custom green color if enabled is true, and yellow if enabled is false, coming from the
custom `rowAttrs` function. We can also add a custom data-testid onto each row using these attributes (you can inspect it to see there is a custom data-testid attribute with `rowItem` on each row).

<template>
  <KTable
    :options="tableOptions"
    hasSideBorder
    :rowAttrs="rowAttrsFn"
    />
</template>

```vue
<template>
  <KTable
    :options="tableOptions"
    :rowAttrs="rowAttrsFn"
    hasSideBorder
    />
</template>
<script>
import { defaultSorter } from '@kongponents/KTable'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      tableOptions: {
        headers: [
          { label: 'Type', key: 'type' },
          { label: 'Value', key: 'value' }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true',
            themeColors: []
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false',
            themeColors: ['blue','violet']
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true',
            themeColors: ['green', 'yellow']
          }
        ]
      }
    }
  },
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
table.k-table {
  &.side-border {
    tr.enabled {
      &:hover {
        background-color: var(--green-200, #ccffe1);
      }

      td:first-child {
        border-left: 3px solid var(--green-400, #19a654);
      }
    }

    tr.disabled {
      &:hover {
        background-color: var(--yellow-100, #fff9e6);
      }

      td:first-child {
        border-left: 3px solid var(--yellow-200, #ffdc73);
      }
    }
  }
}
</style>
```

## Slots
Both column cells & header cells are slottable in KTable. Use slots to gain
access to the row data.

- `column-{column-key}` - Will slot the header cell
- `{column-key}` - Will slot the column cell of a given row

### Column Header

<KTable :options="$frontmatter.tableOptions">
  <template v-slot:column-name="{ column }">
    {{ column.label.toUpperCase() }}
  </template>
</KTable>

```vue
<template>
  <KTable :options="tableOptions">
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
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
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
      }
    }
  }
}
</script>
```

### Column Cell
<KTable :options="$frontmatter.tableOptions">
  <template v-slot:enabled="{rowValue}">
    <span v-if="rowValue" style="color: green">&#10003;</span>
    <span v-else style="color: red">&#10007;</span>
  </template>
  <template v-slot:actions><KButton appearance="btn-link">Edit</KButton></template>
</KTable>

```vue
<template>
  <KTable :options="tableOptions">
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
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: true
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: false
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    }
  }
}
</script>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KTableBorder `| Sets cell border color
| `--KTableColor` | Font color
| `--KTableHover`| Hover variant background color
| `--KTableHeaderSize`| Font size of header th

\
An Example of changing the hover background might look like.  

<div class="table-wrapper">
  <KTable :options="$frontmatter.tableOptions" hasHover />
</div>

```vue
<template>
  <KTable
    :options="tableOptions" 
    hasHover /> 
</template>

<style>
:root {
  --KTableHover: lavender;
}
</style>
```

<script>
import { defaultSorter } from '../../packages/KTable/KTable'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      sortOrder: 'ascending',
      sortKey: 'name',
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name', sortable: true },
          { label: 'ID', key: 'id', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: true },
          { label: 'Theme Colors', key: 'themeColors', sortable: true },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true',
            themeColors: []
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false',
            themeColors: ['blue','violet']
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true',
            themeColors: ['green', 'yellow']
          }
        ]
      }
    }
  },
  methods: {
    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    },
    sortFieldHelper (key) {
      const {previousKey, sortOrder } = this.defaultSorter(key, this.sortKey, this.sortOrder, this.tableOptions.data)
      this.sortKey = previousKey
      this.sortOrder = sortOrder
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
    defaultSorter
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

table.k-table {
  &.side-border {
    tr.enabled {
      &:hover {
        background-color: var(--green-200, #ccffe1);
      }

      td:first-child {
        border-left: 3px solid var(--green-400, #19a654);
      }
    }

    tr.disabled {
      &:hover {
        background-color: var(--yellow-100, #fff9e6);
      }

      td:first-child {
        border-left: 3px solid var(--yellow-200, #ffdc73);
      }
    }
  }
}
</style>
