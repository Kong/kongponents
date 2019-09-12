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
highlight the table row on hover

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

### Custom Filter condition
If a row has to be excluded for any reason then a custom filter function can be passed in.
The example below filters out rows which are not enabled.

<KTable :options="$frontmatter.tableOptions" :rows-to-filter="(row) => row.enabled" />
```vue
<KTable
  :options="tableOptions"
  :rows-to-filter="(row) => row.enabled'" />
```

## Slots
Both column cells & header cells are slottable in KTable. Use `slot-scope` to gain
access to the row data.

- `column-{column-key}` - Will slot the header cell
- `{column-key}` - Will slot the column cell of a given row

### Column Header
<KTable :options="$frontmatter.tableOptions">
  <template slot="column-name" slot-scope="{ column }">
    {{ column.label | capitalize }}
  </template>
</KTable>

```vue
<template>
  <KTable :options="tableOptions">
    <!-- Slot column header "name" and pass through Vue Filter -->
    <template slot="column-name" slot-scope="{ column }">
      {{ column | capitalize }}
    </template>
  </KTable>
</template>
<script>
export default {
  filters: {
    capitalize: (value) {
      if (!value) return
      
      return value.toUpperCase()
    }
  },
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
  <template slot="enabled" slot-scope="{rowValue}">
    <span v-if="rowValue === 'true'" style="color: green">&#10003;</span>
    <span v-else style="color: red">&#10007;</span>
  </template>
  <template slot="actions"><a href="">Edit</a></template>
</KTable>

```vue
<template>
  <KTable :options="tableOptions">
    <!-- Slot each "enabled" cell in each row & add icon if matching value -->
    <template slot="enabled" slot-scope="{rowValue}">
      <span v-if="rowValue === 'true'" style="color: green">&#10003;</span>
      <span v-else style="color: red">&#10007;</span>
    </template>
    <!-- Slot each "actions" cell in each row & link -->
    <template slot="actions"><a href="">Edit</a></template>
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

<!-- Page settings -->
<script>
export default {
  filters: {
    capitalize: function (value) {
      if (!value) return
      
      return value.toUpperCase() + '...'
    }
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
</style>
