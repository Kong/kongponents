<!--@include: ./parts/tables/script-setup.md-->

# Table View

Component for displaying data in table format.

:::tip NOTE
KTableView does not handle data management capabilities like data fetching, functional pagination, sorting or searching. If you are looking for a component that integrates with the data layer, check out [KTableData](/components/table-data).
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

<!--@include: ./parts/tables/shared-props.md-->

## Slots

<!--@include: ./parts/tables/shared-slots.md-->

## Events

<!--@include: ./parts/tables/shared-events.md-->

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

### row-select

Emitted when user interacts with checkboxes in bulk actions column. Payload is array of selected table row objects.

### update:row-expanded

Emitted when row is expanded or collapsed (when [`rowExpandable` prop](#rowexpandable) is `true`). Payload is object of type `RowExpandPayload`.

```ts
interface RowExpandPayload {
  row: Record<string, any>
  expanded: boolean
}
```

<style lang = "scss" scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.expanded-row-content {
  display: flex;
  flex-direction: column;
  gap: $kui-space-40;

  .badges-container {
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
