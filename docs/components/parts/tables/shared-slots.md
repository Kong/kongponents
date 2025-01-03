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

:::tip NOTE
If `toolbar` slot is not empty, the column visibility and/or bulk actions (whichever is enabled) dropdowns in the toolbar will be **disabled** when not actionable.
If it is empty, the column visibility and/or bulk actions dropdowns will be **hidden** when not actionable.
:::

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

See also: [`row-select` event](#row-select).

<KTableView
  :data="paginatedData1"
  :headers="basicHeaders(false, null, null, true)"
  :row-key="({ id }: Record<string, any>) => String(id)"
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
    row-key="id"
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
  :row-key="({ id }: Record<string, any>) => String(id)"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #bulk-actions="{ selectedRows }">
    <KButton
      appearance="danger"
      :disabled="!selectedRows.length"
    >
      Delete ({{ selectedRows.length }} items selected)
    </KButton>
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :headers="headers"
  row-key="id"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #bulk-actions="{ selectedRows }">
    <KButton
      appearance="danger"
      :disabled="!selectedRows.length"
    >
      Delete ({{ selectedRows.length }} items selected)
    </KButton>
  </template>
</KTableView>
```

### row-expanded

Slot for passing custom content that will be revealed once user expands one of the table rows when [`rowExpandable` prop](#rowexpandable) is `true`.

Slot props:

* `row` - table row object
* `headers` - array of table headers objects to be passed to the nested table. See [Expandable Rows](#expandable-rows) section documentation for more details
* `columnWidths` - an object where each key represents a table column, and its corresponding value specifies the width to be used for that column in a nested table. Refer to [Expandable Rows](#expandable-rows) section documentation for more details

<KTableView
  :data="basicData"
  :row-expandable="() => true"
  :headers="basicHeaders()"
  :pagination-attributes="{ totalCount: basicData.length }"
>
  <template #row-expanded="{ row }">
    <div class="expanded-row-content">
      <div class="badges-container">
        <KCopy
          :text="String(row.id)"
          badge
          badge-label="ID:"
        />
        <div>
          Joined on:
          <KBadge appearance="info" max-width="100">
            {{ new Date() }}
          </KBadge>
        </div>
        <div>
          Email verification status:
          <KBadge :appearance="row.id % 3 ? 'success' : 'danger'">
            {{ row.id % 3 ? '' : 'Not' }} Verified
          </KBadge>
        </div>
      </div>
      Lorem ipsum odor amet, consectetuer adipiscing elit. Vitae rutrum interdum dis elementum; consequat maximus potenti felis. Faucibus eget vel, efficitur vitae ullamcorper velit. Aliquam aliquam fusce sollicitudin dolor lorem aenean. Rutrum ligula diam mollis felis egestas arcu. Odio urna leo pharetra luctus urna adipiscing suscipit nisl. Eleifend natoque lacus scelerisque suspendisse libero pulvinar ut lectus. Ac parturient fringilla lacinia fusce natoque semper.
      Turpis pellentesque eu ad risus proin hendrerit litora. Sollicitudin facilisi per diam netus; at commodo ornare. Justo efficitur hendrerit augue blandit himenaeos suspendisse; mattis habitasse. Aliquet iaculis nibh ante et rutrum sollicitudin tincidunt enim. Suspendisse orci ac proin metus consectetur vel primis. Dictumst imperdiet nulla habitant donec gravida vel nulla in. Eleifend augue ligula convallis eros odio. Erat integer nibh mattis varius senectus.
      Sodales nisl sem aliquet neque scelerisque. Dapibus mauris leo commodo; nulla adipiscing purus ultricies porttitor laoreet. Dignissim sociosqu cras sollicitudin iaculis magna ex. Elit lacus tincidunt dapibus adipiscing tortor eros dui felis. Orci hendrerit senectus himenaeos ligula cursus in. Turpis dignissim duis nunc neque ornare congue primis aenean natoque. Himenaeos mollis dui dolor laoreet mauris aliquam hendrerit scelerisque.
      Sagittis lectus fringilla iaculis semper egestas mattis venenatis. Mollis parturient primis; pharetra leo neque faucibus nibh. Porttitor scelerisque magnis pellentesque nec vel etiam fames quisque. Senectus dictumst nisl enim sagittis primis magnis habitasse finibus torquent. Efficitur turpis hendrerit posuere dictum fusce nostra taciti donec. Parturient ut blandit ligula euismod taciti velit. Mollis urna nunc tellus; cras consequat volutpat turpis. Maximus egestas platea mauris mollis mollis conubia. Euismod scelerisque quam mauris parturient eleifend nostra. Mollis tempor hendrerit hendrerit praesent aliquet himenaeos dignissim.
      Dignissim penatibus velit sapien vehicula sodales suspendisse iaculis massa. Cubilia aenean morbi scelerisque eu imperdiet odio primis. Mollis netus natoque, euismod felis tempor nibh. In nostra nulla eros ac orci suspendisse luctus porta. Parturient cras turpis faucibus ut sed nunc lacus. At et fermentum sapien tristique ac primis. Interdum vivamus orci velit sed arcu in. Eros aptent primis suscipit parturient curae enim.
      Rutrum aliquam phasellus duis pellentesque torquent fermentum. Feugiat odio consequat cursus blandit tristique erat amet. Ornare scelerisque id erat lectus at erat. Dui nostra interdum tortor, turpis arcu dis. Netus fermentum lobortis primis fermentum velit ultrices nam condimentum? Dictum montes maximus senectus; quis varius scelerisque non ridiculus. Curae malesuada porttitor finibus venenatis mi faucibus. Velit blandit dis mauris laoreet ornare molestie.
      Ante torquent faucibus nascetur ultricies eros varius odio. Cubilia sodales maximus tellus leo cubilia lorem facilisis. Blandit egestas suspendisse torquent dolor; torquent commodo id nullam. Etiam facilisi faucibus litora quisque aptent vestibulum dapibus. Maecenas risus fermentum facilisis suspendisse imperdiet nascetur porta. Vehicula malesuada sollicitudin viverra in ac habitasse ligula. Adipiscing porta neque nullam pharetra est luctus pharetra. Consequat sapien parturient nisl augue ultricies placerat maximus convallis. Consectetur metus lacinia; euismod mollis class tortor.
    </div>
  </template>
</KTableView>

```html
<KTableView
  :data="tableData"
  :row-expandable="() => true"row-expandable
  :headers="headers"
  :pagination-attributes="{ totalCount: tableData.length }"
>
  <template #row-expanded="{ row }">
    <div>
      <KCopy
        :text="String(row.id)"
        badge
        badge-label="ID:"
      />
      <div>
        Joined on:
        <KBadge appearance="info">
          {{ new Date() }}
        </KBadge>
      </div>
      <div>
        Email verification status:
        <KBadge :appearance="row.emailVerified ? 'success' : 'danger'">
          {{ row.emailVerified ? '' : 'Not' }} Verified
        </KBadge>
      </div>
    </div>
    Lorem ipsum odor amet...
  </template>
</KTableView>
```
