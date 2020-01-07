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
