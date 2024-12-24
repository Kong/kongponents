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
