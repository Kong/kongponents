### headers

Array of objects that represent table columns along with some configurations that should apply to each of the columns (whether a column is sortable, hidable, etc).

```ts
interface TableViewHeader {
  /** Must be unique for each column, see Reserved Header Keys section for more information about 'actions' key value */
  key: string
  /** Visible column header text */
  label: string
  /** This property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** Allow toggling column visibility */
  hidable?: boolean
  /** When provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** Whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
  /** Only supported in KTableData */
  /** Whether KTableData should use function passed through sortHandlerFunction prop to apply sorting logic to this column */
  useSortHandlerFunction?: boolean
}
```

<KTableView
  :data="basicData"
  :headers="basicHeaders(false, null, 'email')"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```vue
<template>
  <KTableView
    :data="tableData"
    :headers="headers"
    :pagination-attributes="{ totalCount: tableData.length }"
  />
</template>

<script setup lang="ts">
import type { TableViewHeader, TableViewData } from '@kong/kongponents'

const headers: Array<TableViewHeader> = [
  {
    key: 'name', 
    label: 'Full Name', 
  },
  {
    key: 'username',
    label: 'Username',
    tooltip: 'Unique for each user.',
  },
  {
    key: 'email',
    label: 'Email',
    hidable: true,
  },
]

const tableData = ref<TableViewData>([...])
</script>
```

:::tip NOTE
If at least one column is `hidable` in the table, KTableView will render a dropdown on the right of the table toolbar directly above the table, which will provide an interface for showing/hiding columns to the user.
:::

#### Reserved Header Keys

Some header key values are treated specially.

##### bulkActions

The column displays individual checkboxes to allow selecting individual rows, while the column header displays a checkbox will check or uncheck all visible table rows. KTableView will render a dropdown on the right of the table toolbar directly above the table and you simply need to provide dropdown items via the [`bulk-action-items` slot](#bulk-action-items).

:::warning IMPORTANT
Bulk actions column won't be rendered in case if:

- neither [`bulk-action-items`](#bulk-action-items), nor [`bulk-actions`](#bulk-actions) slots are provided
- [`rowKey` prop](#rowkey) prop is not provided
:::

<KTableView
  :data="basicData"
  :headers="basicHeaders(false, null, null, true)"
  :row-key="({ id }: Record<string, any>) => String(id)"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #bulk-action-items="{ selectedRows }">
    <KDropdownItem danger>
      Delete ({{ selectedRows.length }} items)
    </KDropdownItem>
  </template>
</KTableView>

```vue
<template>
  <KTableView
    :data="tableData"
    :headers="headers"
    row-key="id"
    :pagination-attributes="{ totalCount: tableData.length }"
  >
    <template #bulk-action-items="{ selectedRows }">
      <KDropdownItem danger>
        Delete ({{ selectedRows.length }} items)
      </KDropdownItem>
    </template>
  </KTableView>
</template>

<script setup lang="ts">
import type { TableViewHeader, TableViewData } from '@kong/kongponents'

const headers: Array<TableViewHeader> = [
  {
    key: 'bulkActions', 
    label: 'Bulk actions', 
  },
  ...
]

const tableData = ref<TableViewData>([ ... ])
</script>
```

##### actions

The column displays an actions [KDropdown](/components/dropdown) button for each row and displays no label (as if `hideLabel` was `true`; you can set `hideLabel` parameter to `false` to show the label). KTableView will automatically render the actions dropdown and you simply need to provide dropdown items via the [`action-items` slot](#action-items).

:::tip NOTE
KTableView automatically displays the bulk action checkbox as the first column, and the `actions` menu in the last column, when enabled.
:::

<KTableView
  :data="basicData"
  :headers="basicHeaders(true)"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #action-items>
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
</KTableView>

```vue
<template>
  <KTableView
    :data="tableData"
    :headers="headers"
    :pagination-attributes="{ totalCount: tableData.length }"
  >
    <template #action-items>
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
  </KTableView>
</template>

<script setup lang="ts">
import type { TableViewHeader, TableViewData } from '@kong/kongponents'

const headers: Array<TableViewHeader> = [
  {
    key: 'actions',
    label: 'Row actions',
  },
  ...
]

const tableData = ref<TableViewData>([...])
</script>
```

### data

Data to be rendered in the table. Accepted interface is an array of objects where each property key should have a corresponding `key` in the [`headers` prop](#headers).

```ts
type TableViewData = Record<string, any>[]
```

<KTableView
  :data="basicDataSortable"
  :headers="basicHeaders(true, 'username', 'email')"
  @sort="sortBasicData"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #action-items>
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
</KTableView>

```vue
<template>
  <KTableView
    :data="tableData"
    :headers="headers"
    @sort="sortData"
    :pagination-attributes="{ totalCount: tableData.length }"
  >
    <template #action-items>
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
  </KTableView>
</template>

<script setup lang="ts">
import type { TableViewHeader, TableViewData } from '@kong/kongponents'

const headers: Array<TableViewHeader> = [
  {
    key: 'name', 
    label: 'Full Name', 
  },
  {
    key: 'username',
    label: 'Username',
    sortable: true,
    tooltip: 'Unique for each user.',
  },
  {
    key: 'email',
    label: 'Email',
    hidable: true,
  },
  {
    key: 'actions',
    label: 'Row actions',
  },
]

const tableData = ref<TableViewData>([
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
])

const sortData = (sortData: TableSortPayload): void => {
  const data = [...tableData.value]
  const { sortColumnKey, sortColumnOrder } = sortData || { sortColumnKey: 'username', sortColumnOrder: 'asc' }

  data.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (sortColumnKey === 'username') {
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

    return 0
  })

  tableData.value = data
}
</script>
```

:::tip NOTE
Notice that in the example above the _Username_ column is `sortable` and the _Email_ column is `hidable`.
:::

### loading

Boolean to control whether the component should display the loading state. Defaults to `false`.

<KTableView
  loading
  :data="basicData"
  :headers="basicHeaders()"
/>

```html
<KTableView
  loading
  :data="tableData"
  :headers="headers"
/>
```

### error

Boolean to control whether the component should display the error state. Defaults to `false`. See [error state](#error-1) section for more customization options.

<KTableView
  error
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  error
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### resizeColumns

Allow table column width to be resizable (defaults to `false`). Adjusting a column's width will trigger an [`update:table-preferences` event](#updatetable-preferences).

<KTableView
  resize-columns
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  resize-columns
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### rowHover

Boolean to control whether table should display hover state upon hovering rows. Defaults to `true`.

### tablePreferences

Can be used to pass object with locally stored preferences for different table configuration options. For example, when user resizes a column in a given table, `update:table-preferences` event will be emitted - you can then save the value and re-apply it next time user encounters this table.

```ts
interface TablePreferences {
  /** the number of items to display per page */
  pageSize?: number
  /** the column to sort by's `key` defined in the table headers */
  sortColumnKey?: string
  /** the order by which to sort the column, one of `asc` or `desc` */
  sortColumnOrder?: SortColumnOrder
  /** the customized column widths, if resizing is allowed */
  columnWidths?: Record<string, number>
  /** column visibility, if visibility is toggleable */
  columnVisibility?: Record<string, boolean>
}
```

<KTableView
  :table-preferences="{ columnVisibility: { email: false } }"
  :data="basicData"
  :headers="basicHeaders(false, null, 'email')"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  :table-preferences="{ columnVisibility: { email: false } }"
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### rowAttrs

Function for adding custom attributes to each row. The function should return an object with `key: value` pairs for each attribute.

The passed function receives row value object as an argument.

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :row-attrs="(row) => { return { 'data-testid': `row-${row.id}` } }"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  :row-attrs="(row) => { return { 'data-testid': `row-${row.id}` } }"
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### rowLink

Function for turning row into a link. The function receives row value object as an argument and should return an object with two optional parameters:

```ts
interface RowLink {
  /** RouteLocationRaw or url string for row link */
  to?: RouteLocationRaw | string
  /** Target for row link */
  target?: '_self' | '_blank' | '_parent' | '_top'
}
```

<KTableView
  :row-link="getRowLink"
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```vue
<template>
  <KTableView
    :row-link="getRowLink"
    :data="tableData"
    :headers="headers"
    :pagination-attributes="{ totalCount: tableData.length }"
  />
</template>


<script setup lang="ts">
import type { RowLink } from '@kong/kongponents'

const headers = [...]

const tableData = [...]

const getRowLink = (row: Record<string, any>): RowLink => ({
  // using static route for demonstration purposes
  // but you can generate dynamic routes based on the row data
  to: { name: 'home' }, // pass a string to render the link as an anchor element instead of a router-link
  target: '_blank',
})
</script>
```

### rowKey

Certain features of KTableView require a unique identifier to utilize for each row of table data.

The `rowKey` prop provides a way to define which property of the `row` object should serve as this unique identifier, or to generate a custom unique identifier for each row.

:::tip NOTE
`rowKey` is required for these KTableView features:

* [bulk actions](#bulkactions)
:::

The `rowKey` prop accepts either a unique string or a function that returns a unique string: `string | ((row: Record<string, any>) => string)`.

If a string is provided which corresponds to a property of the `row`, the unique identifier will utilize the `row[rowKey]` as the unique identifier.

```html
<template>
  <KTableView
    row-key="id"
    :data="tableData"
    :headers="headers"
  />
</template>

<script setup lang="ts">
import type { TableViewData } from '@kong/kongponents'

const tableData: TableViewData = [
  {
    id: 'a70642b3-20f2-4658-b459-fe1cbcf9e315',
    ...
  },
  {
    id: '58c599a9-f453-41f3-9e64-0a7fc6caedad',
    ...
  }
]
</script>
```

Alternatively, if a function is passed, it allows for the creation of a custom identifier based on the row data passed to the function.

```html
<KTableView
  :row-key="({ id, username }: Record<string, any>) => username + id"
  :data="tableData"
  :headers="headers"
/>
```

:::warning IMPORTANT
The value provided through the `rowKey` prop must be unique for each `row` of data, even for paginated data.
:::

### rowBulkActionEnabled

Function for enabling or disabling row selection when `bulkActions` are enabled for the table. Helpful for making some rows unavailable for bulk actions selection. The function receives the row data object as a parameter and must return a `boolean` or an object that matches the following interface:

```ts
type RowBulkAction = boolean | { enabled: boolean, disabledTooltip?: string }
```

When the function returns a boolean value of `true`, bulk action selection will be enabled for the row. 

When `false` is returned, the bulk action checkbox will be disabled. 

If an object is returned, the `enabled` property determines if the row can be selected. The `disabledTooltip` value, if provided, will show the string as a tooltip message if the user hovers over the disabled checkbox.

Default value is `() => true`.

<KTableView
  :row-bulk-action-enabled="getRowBulkAction"
  :row-key="({ id }: Record<string, any>) => String(id)"
  :data="basicData"
  :headers="basicHeaders(false, null, null, true)"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #bulk-action-items="{ selectedRows }">
    <KDropdownItem danger>
      Delete ({{ selectedRows.length }} items)
    </KDropdownItem>
  </template>
</KTableView>

```vue
<template>
  <KTableView
    :row-bulk-action-enabled="getRowBulkActionEnabled"
    row-key="id"
    :data="tableData"
    :headers="headers"
    :pagination-attributes="{ totalCount: tableData.length }"
  >
    <template #bulk-action-items="{ selectedRows }">
      <KDropdownItem danger>
        Delete ({{ selectedRows.length }} items)
      </KDropdownItem>
    </template>
  </KTableView>
</template>

<script setup lang="ts">
import type { RowBulkAction } from '@kong/kongponents'

...

const getRowBulkActionEnabled = (row: Record<string, any>): RowBulkAction => {
  if (row.id === 2) {
    return false
  }

  if (row.id === 3) {
    return { enabled: false }
  }

  if (row.id === 4) {
    return {
      enabled: false,
      disabledTooltip: 'This row is disabled.',
    }
  }

  return true
}
</script>
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

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :cell-attrs="({ headerKey, row }) => { return { 'data-testid': `column-${headerKey}-row-${row.id}` } }"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  :cell-attrs="({ headerKey, row }) => { return { 'data-testid': `column-${headerKey}-row-${row.id}` } }"
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### maxHeight

Limit the table height by passing a number, in pixels. If the table height exceeds the specified number, it will be scrollable. Table header is a `position: sticky;` element and will always be visible.

<KTableView
  max-height="300"
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  max-height="300"
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

### paginationAttributes

Object to be passed to underlying pagination component. See [KPagination props](/components/pagination#props) for more details. Expects an object of type `TablePaginationAttributes`:

```ts
interface TablePaginationAttributes {
  totalCount?: number
  pageSizes?: number[]
  initialPageSize?: number
  currentPage?: number
  offset?: boolean
  disablePageJump?: boolean
  offsetPreviousButtonDisabled?: boolean
  offsetNextButtonDisabled?: boolean
}
```

<KTableView
  :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
  :data="paginatedData"
  :headers="basicHeaders()"
  @page-change="onPageChange"
  @page-size-change="onPageSizeChange"
/>

```html
<KTableView
  :pagination-attributes="{ totalCount: tableData.length, pageSizes: [5, 10] }"
  :data="paginatedData"
  :headers="headers"
/>
```

### hidePagination

A boolean to hide pagination element (defaults to `false`).

### hidePaginationWhenOptional

Set this to `true` to hide pagination when the table record count is less than or equal to the page size. Defaults to `false`.

### rowExpandable

Function for making a row expandable. The function receives row value object as an argument and should return a boolean value. Default value is `() => false`.

<KTableView
  :data="userTypeData"
  :row-expandable="(row) => row.type.toLowerCase() === 'external'"
  :headers="userTypeHeaders"
  :pagination-attributes="{ totalCount: userTypeData.length }"
>
  <template #row-expanded>
    Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae rutrum interdum dis elementum; consequat maximus potenti felis. Faucibus eget vel, efficitur vitae ullamcorper velit. Aliquam aliquam fusce sollicitudin dolor lorem aenean. Rutrum ligula diam mollis felis egestas arcu. Odio urna leo pharetra luctus urna adipiscing suscipit nisl. Eleifend natoque lacus scelerisque suspendisse libero pulvinar ut lectus. Ac parturient fringilla lacinia fusce natoque semper.
    Turpis pellentesque eu ad risus proin hendrerit litora. Sollicitudin facilisi per diam netus; at commodo ornare. Justo efficitur hendrerit augue blandit himenaeos suspendisse; mattis habitasse. Aliquet iaculis nibh ante et rutrum sollicitudin tincidunt enim. Suspendisse orci ac proin metus consectetur vel primis. Dictumst imperdiet nulla habitant donec gravida vel nulla in. Eleifend augue ligula convallis eros odio. Erat integer nibh mattis varius senectus.
    Sodales nisl sem aliquet neque scelerisque. Dapibus mauris leo commodo; nulla adipiscing purus ultricies porttitor laoreet. Dignissim sociosqu cras sollicitudin iaculis magna ex. Elit lacus tincidunt dapibus adipiscing tortor eros dui felis. Orci hendrerit senectus himenaeos ligula cursus in. Turpis dignissim duis nunc neque ornare congue primis aenean natoque. Himenaeos mollis dui dolor laoreet mauris aliquam hendrerit scelerisque.
    Sagittis lectus fringilla iaculis semper egestas mattis venenatis. Mollis parturient primis; pharetra leo neque faucibus nibh. Porttitor scelerisque magnis pellentesque nec vel etiam fames quisque. Senectus dictumst nisl enim sagittis primis magnis habitasse finibus torquent. Efficitur turpis hendrerit posuere dictum fusce nostra taciti donec. Parturient ut blandit ligula euismod taciti velit. Mollis urna nunc tellus; cras consequat volutpat turpis. Maximus egestas platea mauris mollis mollis conubia. Euismod scelerisque quam mauris parturient eleifend nostra. Mollis tempor hendrerit hendrerit praesent aliquet himenaeos dignissim.
    Dignissim penatibus velit sapien vehicula sodales suspendisse iaculis massa. Cubilia aenean morbi scelerisque eu imperdiet odio primis. Mollis netus natoque, euismod felis tempor nibh. In nostra nulla eros ac orci suspendisse luctus porta. Parturient cras turpis faucibus ut sed nunc lacus. At et fermentum sapien tristique ac primis. Interdum vivamus orci velit sed arcu in. Eros aptent primis suscipit parturient curae enim.
    Rutrum aliquam phasellus duis pellentesque torquent fermentum. Feugiat odio consequat cursus blandit tristique erat amet. Ornare scelerisque id erat lectus at erat. Dui nostra interdum tortor, turpis arcu dis. Netus fermentum lobortis primis fermentum velit ultrices nam condimentum? Dictum montes maximus senectus; quis varius scelerisque non ridiculus. Curae malesuada porttitor finibus venenatis mi faucibus. Velit blandit dis mauris laoreet ornare molestie.
    Ante torquent faucibus nascetur ultricies eros varius odio. Cubilia sodales maximus tellus leo cubilia lorem facilisis. Blandit egestas suspendisse torquent dolor; torquent commodo id nullam. Etiam facilisi faucibus litora quisque aptent vestibulum dapibus. Maecenas risus fermentum facilisis suspendisse imperdiet nascetur porta. Vehicula malesuada sollicitudin viverra in ac habitasse ligula. Adipiscing porta neque nullam pharetra est luctus pharetra. Consequat sapien parturient nisl augue ultricies placerat maximus convallis. Consectetur metus lacinia; euismod mollis class tortor.
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :row-expandable="(row) => row.type.toLowerCase() === 'external'"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #row-expanded>
    Lorem ipsum odor amet...
  </template>
</KTableView>
```

### rowExpanded

Use this prop to specify the initial expanded / collapsed state for each data row. The function receives the row value object as an argument and should return a boolean value. Default value is `() => false`. When returned value is `true`, a row is rendered expanded.

<KTableView
  :data="userTypeData"
  :row-expanded="(row) => row.id === userTypeData.find((dataRow) => dataRow.type.toLowerCase() === 'external')?.id"
  :row-expandable="(row) => row.type.toLowerCase() === 'external'"
  :headers="userTypeHeaders"
  :pagination-attributes="{ totalCount: userTypeData.length }"
>
  <template #row-expanded>
    Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae rutrum interdum dis elementum; consequat maximus potenti felis. Faucibus eget vel, efficitur vitae ullamcorper velit. Aliquam aliquam fusce sollicitudin dolor lorem aenean. Rutrum ligula diam mollis felis egestas arcu. Odio urna leo pharetra luctus urna adipiscing suscipit nisl. Eleifend natoque lacus scelerisque suspendisse libero pulvinar ut lectus. Ac parturient fringilla lacinia fusce natoque semper.
    Turpis pellentesque eu ad risus proin hendrerit litora. Sollicitudin facilisi per diam netus; at commodo ornare. Justo efficitur hendrerit augue blandit himenaeos suspendisse; mattis habitasse. Aliquet iaculis nibh ante et rutrum sollicitudin tincidunt enim. Suspendisse orci ac proin metus consectetur vel primis. Dictumst imperdiet nulla habitant donec gravida vel nulla in. Eleifend augue ligula convallis eros odio. Erat integer nibh mattis varius senectus.
    Sodales nisl sem aliquet neque scelerisque. Dapibus mauris leo commodo; nulla adipiscing purus ultricies porttitor laoreet. Dignissim sociosqu cras sollicitudin iaculis magna ex. Elit lacus tincidunt dapibus adipiscing tortor eros dui felis. Orci hendrerit senectus himenaeos ligula cursus in. Turpis dignissim duis nunc neque ornare congue primis aenean natoque. Himenaeos mollis dui dolor laoreet mauris aliquam hendrerit scelerisque.
    Sagittis lectus fringilla iaculis semper egestas mattis venenatis. Mollis parturient primis; pharetra leo neque faucibus nibh. Porttitor scelerisque magnis pellentesque nec vel etiam fames quisque. Senectus dictumst nisl enim sagittis primis magnis habitasse finibus torquent. Efficitur turpis hendrerit posuere dictum fusce nostra taciti donec. Parturient ut blandit ligula euismod taciti velit. Mollis urna nunc tellus; cras consequat volutpat turpis. Maximus egestas platea mauris mollis mollis conubia. Euismod scelerisque quam mauris parturient eleifend nostra. Mollis tempor hendrerit hendrerit praesent aliquet himenaeos dignissim.
    Dignissim penatibus velit sapien vehicula sodales suspendisse iaculis massa. Cubilia aenean morbi scelerisque eu imperdiet odio primis. Mollis netus natoque, euismod felis tempor nibh. In nostra nulla eros ac orci suspendisse luctus porta. Parturient cras turpis faucibus ut sed nunc lacus. At et fermentum sapien tristique ac primis. Interdum vivamus orci velit sed arcu in. Eros aptent primis suscipit parturient curae enim.
    Rutrum aliquam phasellus duis pellentesque torquent fermentum. Feugiat odio consequat cursus blandit tristique erat amet. Ornare scelerisque id erat lectus at erat. Dui nostra interdum tortor, turpis arcu dis. Netus fermentum lobortis primis fermentum velit ultrices nam condimentum? Dictum montes maximus senectus; quis varius scelerisque non ridiculus. Curae malesuada porttitor finibus venenatis mi faucibus. Velit blandit dis mauris laoreet ornare molestie.
    Ante torquent faucibus nascetur ultricies eros varius odio. Cubilia sodales maximus tellus leo cubilia lorem facilisis. Blandit egestas suspendisse torquent dolor; torquent commodo id nullam. Etiam facilisi faucibus litora quisque aptent vestibulum dapibus. Maecenas risus fermentum facilisis suspendisse imperdiet nascetur porta. Vehicula malesuada sollicitudin viverra in ac habitasse ligula. Adipiscing porta neque nullam pharetra est luctus pharetra. Consequat sapien parturient nisl augue ultricies placerat maximus convallis. Consectetur metus lacinia; euismod mollis class tortor.
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :row-expanded="(row) => row.id === tableData.find((dataRow) => dataRow.type.toLowerCase() === 'external')?.id"
  :row-expandable="(row) => row.type.toLowerCase() === 'external'"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #row-expanded>
    Lorem ipsum odor amet...
  </template>
</KTableView>
```

### hideHeaders

A boolean to hide table headers. Only recomended when used in nested table. Refer to [Expandable Rows](#expandable-rows) section documentation for more details. Defaults to `false`.

### nested

A boolean to disable some of the table features like column visibility, column resizing, bulk actions and hide toolbar element in nested tables. Refer to [Expandable Rows](#expandable-rows) section documentation for more details. Defaults to `false`.

### hideToolbar

Prop for hiding toolbar. Useful when elements provided in the toolbar are not actionable (for example, when toolbar contains filter controls, however the fetcher returns no results as there are no records to filter by).

## States

### Empty

<KTableView 
  :data="[]"
  :headers="basicHeaders()"
/>

```html
<KTableView 
  :data="[]"
  :headers="headers"
/>
```

Set the following props to handle empty state:

- `emptyStateTitle` - Title text for empty state
- `emptyStateMessage` - Message for empty state
- `emptyStateIconVariant` - Icon variant for empty state (see [KEmptyState component props](/components/empty-state#iconvariant))
- `emptyStateActionMessage` - Button text for empty state action
- `emptyStateActionRoute` - Route for empty state action
- `emptyStateButtonAppearance` - Appearance of empty state action button. See [KButton `appearance` prop](/components/button#appearance) for details

:::tip
To display an icon inside of action button, you can use the `empty-state-action-icon` slot.
:::

When the empty state action button is clicked, KTableView emits the `empty-state-action-click` event.

<KTableView 
  :data="[]"
  :headers="basicHeaders()"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this catalog."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="/"
  empty-state-button-appearance="secondary"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KTableView>

```html
<KTableView 
  :data="[]"
  :headers="headers"
  empty-state-title="No Workspaces exist"
  empty-state-message="Adding a new Workspace will populate this table."
  empty-state-icon-variant="kong"
  empty-state-action-message="Create a Workspace"
  empty-state-action-route="/"
  empty-state-button-appearance="secondary"
>
  <template #empty-state-action-icon>
    <AddIcon />
  </template>
</KTableView>
```

### Error

Set the `error` prop to `true` to enable the error state.

<KTableView
  error
  :data="basicData"
  :headers="basicHeaders()"
/>

```html
<KTableView
  error
  :data="tableData"
  :headers="headers"
/>
```

Set the following properties to customize the error state:

- `errorStateTitle` - Title text for the error state
- `errorStateMessage` - Message for the error state
- `errorStateActionMessage` - Button text for the error state action
- `errorStateActionRoute` - Route for the error state action

A `error-action-click` event is emitted when error state action button is clicked.

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  error
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="/"
/>

```html
<KTableView
  error
  :data="tableData"
  :headers="headers"
  error-state-title="Something went wrong"
  error-state-message="Error loading data."
  error-state-action-message="Report an Issue"
  error-state-action-route="/"
/>
```

## Expandable Rows

Data presented in a table often requires futher clarification or specification. The [`rowExpandable` prop](#rowexpandable) allows some rows to be toggled, revealing or hiding additional information without the need to navigate away from the current view. Any content can be passed using the [`row-expanded` slot](#row-expanded). However, when displaying a nested table in expanded rows, there are a few important considerations to be aware of.

### Nested Table With Different Columns

A nested table represents data that differs from the parent table but is loosely related. This type of nested table does not require any special handling other than setting the [`nested` prop](#nested) to `true`.

Notice that column visibility, column resizing and bulk actions features, as well as `toolbar` slot, are disabled in nested tables.

<KTableView
  :headers="teamsHeaders"
  :data="teamsData"
  :row-expandable="() => true"
  resize-columns
  :pagination-attributes="{ totalCount: teamsData.length }"
>
  <template #row-expanded>
    <KTableView
      :headers="basicHeaders()"
      :data="basicData"
      nested
      :pagination-attributes="{ totalCount: basicData.length }"
    />
  </template>
</KTableView>

```html
<KTableView
  :headers="parentHeaders"
  :data="parentData"
  :row-expandable="() => true"
  resize-columns
  :pagination-attributes="{ totalCount: parentData.length }"
>
  <template #row-expanded>
    <KTableView
      :headers="nestedHeaders"
      :data="nestedData"
      nested
      :pagination-attributes="{ totalCount: nestedData.length }"
    />
  </template>
</KTableView>
```

:::tip NOTE
Both parent and nested tables in this example contain static data for demonstration purposes.
:::

### Nested Table With Same Columns
  
A nested table that complements the parent table requires some special handling:

* The `nested` prop must be set to `true`
* Table headers can be hidden using the [`hideHeaders` prop](#hideHeaders). Value still need to be passed through the `headers` prop, and this is where the `nestedHeaders` slot prop becomes useful. It returns an array of header objects, simplifying the synchronization of column visibility when it is enabled in the parent table
* To better align the columns of the parent and nested tables, the `columnWidths` slot prop can be utilized. It returns an object that can be passed to the nested table through the [`tablePreferences` prop](#tablepreferences). Each time a column is resized in the parent table, the nested table will be updated accordingly

:::warning NOTE
If bulk actions is enabled in parent table, it will be disabled in the nested table.
:::

<KTableView
  :headers="cpGroupsHeaders"
  :data="cpGroupsData"
  :row-expandable="(row) => row.type === 'Control Plane Group'"
  resize-columns
  :pagination-attributes="{ totalCount: cpGroupsData.length }"
>
  <template #action-items>
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
  <template #row-expanded="{ nestedHeaders, columnWidths }">
    <KTableView
      :headers="nestedHeaders"
      :data="cpData"
      hide-headers
      nested
      :pagination-attributes="{ totalCount: cpData.length }"
      :table-preferences="{ columnWidths }"
    >
      <template #action-items>
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
    </KTableView>
  </template>
</KTableView>

```html
<KTableView
  :headers="parentHeaders"
  :data="parentData"
  :row-expandable="(row) => row.type === 'Control Plane Group'"
  resize-columns
  :pagination-attributes="{ totalCount: parentData.length }"
>
  <template #row-expanded="{ nestedHeaders, columnWidths }">
    <KTableView
      :headers="nestedHeaders"
      :data="nestedData"
      hide-headers
      nested
      :pagination-attributes="{ totalCount: nestedData.length }"
      :table-preferences="{ columnWidths }"
    />
  </template>
</KTableView>
```

:::tip NOTE
Both parent and nested tables in this example contain static data for demonstration purposes.
:::
