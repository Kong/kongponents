# Table View

Component for displaying data in table format.

:::tip NOTE
KTableView does not handle data management capabilities like data fetching, functional pagination, sorting or searching. If you are looking for a component that integrates with the data layer, check out [KTable](/components/table).
:::

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
/>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
/>
```

## Props

### headers

Array of objects that represent table columns along with some configurations that should apply to each of the columns (whether a column is sortable, hidable, etc).

```ts
interface TableViewHeader {
  /** must be unique for each column, see Reserved Header Keys section for more information about 'actions' key value */
  key: string
  /** visible column header text */
  label: string
  /** in a nutshell, this property defines whether sort icon should be displayed next to the column header and whether the column header will emit sort event upon clicking on it */
  sortable?: boolean
  /** allow toggling column visibility */
  hidable?: boolean
  /** when provided, an info icon will be rendered next to the column label, upon hovering on which the tooltip will be revealed */
  tooltip?: string
  /** whether column header text should be hidden (only visible to screen readers) */
  hideLabel?: boolean
}
```

:::tip NOTE
If at least one column is `hidable` in the table, KTableView will render a dropdown on the right of the table toolbar directly above the table, which will provide an interface for showing/hiding columns to the user.
:::

For an example of `headers` prop usage please refer to [`data` prop documentation](#data) below.

#### Reserved Header Keys

- `bulkActions` - the column displays checkboxes for each row. Column header displays a checkbox clicking on which will check or uncheck all table rows and selected rows count. Apart from that, KTableView will render a dropdown on the right of the table toolbar directly above the table and you simply need to provide dropdown items via the [`bulk-action-items` slot](#bulk-action-items). Refer to the [`bulk-action-items` slot](#bulk-action-items) for the example.
- `actions` - the column displays an actions [KDropdown](/components/dropdown) button for each row and displays no label (as if `hideLabel` was `true`; you can set `hideLabel` parameter to `false` to show the label). KTableView will automatically render the actions dropdown and you simply need to provide dropdown items via the [`action-items` slot](#action-items).

:::tip NOTE
KTableView automatically displays the bulk action checkbox as the first column, and `actions` menu as the last column, when enabled.
::: 

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

### rowBulkActionEnabled

Function for controlling row selection (enabled vs. disabled). Helpful for making some rows unavailable for bulk actions selection. The function receives row value object as an argument and should return a boolean or an object with two parameters:

```ts
type RowBulkAction = boolean | { enabled: boolean, disabledTooltip?: string }
```

When the function returns a boolean value of `true`, bulk action selection will be enabled for the row. 

When `false` is returned, the bulk action checkbox will be disabled. 

If an object is returned, the `enabled` property determines if the row can be selected. The `disabledTooltip` property will show the string as a tooltip message when the disabled checkbox is hovered.

<KTableView
  :row-bulk-action-enabled="getRowBulkAction"
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

const getRowBulkActionEnabled = (data: Record<string, any>): RowBulkAction => {
  if (data.id === 2) {
    return false
  }

  if (data.id === 3) {
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

## Slots

### Column Header

You can slot in your custom content into each column header. For that, use column `key` value prefixed with `column-*` like in the example below.

Slot props:
* `column` - column header object

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #column-email="{ column }">
    {{ column.label }} <KBadge>Beta</KBadge>
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #column-email="{ column }">
    {{ column.label }} <KBadge>Beta</KBadge>
  </template>
</KTableView>
```

### Cell

You can provide each individual cell's content via slot. Each cell slot is named after the header `key` it corresponds to.

Slot props:
* `row` - table row object
* `rowKey` - table row index
* `rowValue` - the cell value

:::warning NOTE
This slot is not supported for the [`actions` column](#reserved-header-keys).
:::

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #email="{ rowValue }">
    <KCopy :text="rowValue" />
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #email="{ rowValue }">
    <KCopy :text="rowValue" />
  </template>
</KTableView>
```

### Header Tooltip

Utilize HTML in the column header's tooltip by utilizing this slot. Similar to the column header slot, it uses the column `key` value prefixed with `tooltip-*` as shown in the example below.

Slot props:
* `column` - column header object

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #tooltip-email>
    HubSpot Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #tooltip-email>
    HubSpot Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
  </template>
</KTableView>
```

### toolbar

The toolbar is rendered directly above the table and is useful for providing table controls like search or filter fields.

<KTableView
  :data="basicData"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
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
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
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
</KTableView>
```

### empty-state

Slot content to be displayed when empty.

### empty-state-action-icon

Slot for icon to be displayed in front of action button text in empty state. See [empty state](#empty) section for example of usage of this slot.

### error-state

Slot content to be displayed when in error state.

### action-items

Slot for passing action dropdown items. See [KDropdownItem component docs](/components/dropdown#kdropdownitem) for details.

Slot props:
* `row` - table row object
* `rowKey` - table row index

:::tip NOTE
This slot is only available when the `actions` header key is present in [`headers`](#reserved-header-keys).
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

```html
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
```

### bulk-action-items

Slot for passing bulk action dropdown items.

Slot props:
- `selectedRows` - array of selected table row objects

See also: [`bulk-actions-select` event](#bulk-actions-select).

<KTableView
  :data="paginatedData1"
  :headers="basicHeaders(false, null, null, true)"
  :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
  @page-change="onPageChange1"
  @page-size-change="onPageSizeChange1"
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
    :data="paginatedData"
    :headers="headers"
    :pagination-attributes="{ totalCount: tableData.length, pageSizes: [5, 10] }"
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
const paginatedData = tableData.slice(...)
</script>
```

### bulk-actions

Slot for passing custom bulk actions trigger element. Content provided through this slot will replace default bulk actions dropdown.

Slot props:
- `selectedRows` - array of selected table row objects

<KTableView
  :data="basicData"
  :headers="basicHeaders(false, null, null, true)"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #bulk-actions="{ selectedRows }">
    <KButton
      appearance="danger"
      :disabled="!selectedRows.length"
    >
      Bulk Delete ({{ selectedRows.length }} items selected)
    </KButton>
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #bulk-actions="{ selectedRows }">
    <KButton
      appearance="danger"
      :disabled="!selectedRows.length"
    >
      Bulk Delete ({{ selectedRows.length }} items selected)
    </KButton>
  </template>
</KTableView>
```

## Events

### Row Events

`@row:{event}` - returns the `Event`, the row item, and the type. `row-click` event is emitted whenever a row is clicked and the row click event handler is emitted, returns the row `data`.

To avoid firing row clicks by accident, the row click handler ignores events coming from `a`, `button`, `label`, `input`, and `select` elements (unless they have the `disabled` attribute). As such click handlers attached to these element types do not require stopping propagation via `@click.stop`.

The table in the example below contains buttons, inputs and links to demonstrate how KTableView handles clicks on different interactive elements within the table as well as clicks on its rows.

Try clicking below on the table row, and then within elements inside the table cells.

<KComponent v-slot="{ data }" :data="{ rowClickEnabled: true }">
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.rowClickEnabled"
      label="Row clicks"
    />
    <KTableView
      :data="numberedColumnsData"
      :headers="numberedHeaders"
      @row:click="data.rowClickEnabled ? onRowClick : undefined"
      hide-pagination
    >
      <template #column1>
        <KButton @click="onButtonClick">Button with click handler</KButton>
      </template>
      <template #column2>
        <KInput label="Table input" />
      </template>
      <template #column3>
        <KExternalLink href="https://kongponents.konghq.com/">External link</KExternalLink>
      </template>
    </KTableView>
  </div>
</KComponent>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  @row:click="onRowClick"
  hide-pagination
/>
```

### Cell Events

`@cell:{event}` - returns the `Event`, the cell value, and the type. `cell-click` event is emitted whenever a cell is clicked and the cell click event handler is emitted, returns the cell `data`.

The table in the example below contains buttons, inputs and links to demonstrate how KTableView handles clicks on different interactive elements within the table as well as clicks on its cells.

<KComponent v-slot="{ data }" :data="{ cellClickEnabled: true }">
  <div class="vertical-container">
    <KInputSwitch
      v-model="data.cellClickEnabled"
      label="Cell clicks"
    />
    <KTableView
      :data="numberedColumnsData"
      :headers="numberedHeaders"
      @cell:click="data.cellClickEnabled ? onCellClick : undefined"
      hide-pagination
    >
      <template #column1>
        <KButton appearance="secondary" @click="onButtonClick">Button with click handler</KButton>
      </template>
      <template #column2="{ rowKey }">
        <KInputSwitch v-model="toggleModel[rowKey]" />
      </template>
      <template #column3>
        <KExternalLink hide-icon href="https://kongponents.konghq.com/">External link</KExternalLink>
      </template>
    </KTableView>
  </div>
</KComponent>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  @cell:click="onCellClick"
  hide-pagination
/>
```

### Pagination Events

KTableView propagates all events emitted by underlying pagination component. See [KPagination docs](/components/pagination#events) for more details.

### sort

Emitted when user clicks on a sortable column heading. Event payload is object of type `TableSortPayload`:

```ts
interface TableSortPayload {
  prevKey: string
  sortColumnKey: string
  sortColumnOrder: string
}
```

Refer to [`data` prop usage](#data) for example.

### empty-state-action-click

Emitted when empty state action button is clocked.

### error-action-click

Emitted when error state action button is clicked.

### update:table-preferences

Emitted when the user performs sorting, resizes columns or toggles column visibility. Event payload is object of type `TablePreferences` interface (see [`tablePreferences` prop](#tablepreferences) for details).

### bulk-actions-select

Emitted when user interacts with checkboxes in bulk actions column. Payload is array of selected table row objects.

<script setup lang="ts">
import { ref } from 'vue'
import { AddIcon, SearchIcon, MoreIcon } from '@kong/icons'
import { ToastManager } from '@/index'

const toaster = new ToastManager()

const basicHeaders = (actions: boolean = false, sortable: string | null = null, hidable: string | null = null, bulkActions: boolean = false): Array<TableViewHeader> => {
  const keys = {
    ...(bulkActions && { 
      actions: {
        key: 'bulkActions',
        label: 'Bulk actions',
      },
    }),
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
      },
    })
  }

  const headers = []
  for (const [key, value] of Object.entries(keys)) {
    if ((!sortable && !hidable) || (sortable !== key && hidable !== key)) {
      headers.push({ ...value })
    } else if (sortable && sortable === key) {
      headers.push({ ...value, sortable: true })
    } else if (hidable && hidable === key) {
      headers.push({ ...value, hidable: true })
    }
  }

  return headers
}

const basicData: TableViewData = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
]

const basicDataSortable = ref<TableViewData>(basicData)

const sortBasicData = (sortData: TableSortPayload): void => {
  const data = [...basicData]
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

  basicDataSortable.value = data
}

const extraRecords: TableViewData = [
  {
    id: 11,
    name: 'Chris Lo',
    username: 'Krislow',
    email: 'dj@kris.low',
  },
  {
    id: 12,
    name: 'Vitaliy Yarmak',
    username: 'Tamarack',
    email: 'Right@sail.xyz',
  },
]
const basicPaginatedData: TableViewData = [...basicData, ...extraRecords]
const paginatedPageSize = ref<number>(5)
const paginatedData = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize.value))
const onPageChange = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData.value = basicPaginatedData.slice(0, paginatedPageSize.value)
  } else {
    paginatedData.value = basicPaginatedData.slice((paginatedPageSize.value * (page - 1)), (paginatedPageSize.value * (page - 1)) + paginatedPageSize.value)
  }
}
const onPageSizeChange = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize.value = pageSize
}

const paginatedPageSize1 = ref<number>(5)
const paginatedData1 = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize1.value))
const onPageChange1 = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData1.value = basicPaginatedData.slice(0, paginatedPageSize1.value)
  } else {
    paginatedData1.value = basicPaginatedData.slice((paginatedPageSize1.value * (page - 1)), (paginatedPageSize1.value * (page - 1)) + paginatedPageSize1.value)
  }
}
const onPageSizeChange1 = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize1.value = pageSize
}

const getRowLink = (row: Record<string, any>): TableRowAttributes => ({
  // using static route for demonstration purposes
  // but you can generate dynamic routes based on the row data
  to: { path: '/' }, // pass a string to render the link as an anchor element instead of a router-link
  target: '_blank',
})

const numberedHeaders: Array<TableViewHeader> = [
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

const numberedColumnsData: TableViewData = [
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
]

const onRowClick = (event, row) => {
  toaster.open({ appearance: 'success', title: 'Row clicked! Row data:', message: row })
}

const onButtonClick = () => {
  toaster.open({ appearance: 'system', title: 'Button clicked!', message: 'Button click is handled separately from row or cell clicks.' })
}

const onCellClick = (event, cell) => {
  toaster.open({ title: 'Cell clicked! Cell data:', message: cell })
}

const toggleModel = ref<boolean[]>([false, false, false])

const getRowBulkAction = (data: Record<string, any>): RowBulkAction => {
  if (data.id === 2) {
    return false
  }

  if (data.id === 3) {
    return { enabled: false }
  }

  if (data.id === 4) {
    return {
      enabled: false,
      disabledTooltip: 'This row is disabled.',
    }
  }

  return true
}
</script>

<style lang="scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}
</style>
