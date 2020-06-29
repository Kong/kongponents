# Multiselect

**KMultiselect** is used to display a dropdown of multiple options. It can be used in place of the native multiple option select list. KMultiselect builds on top of [KPop](/components/popover.html) to provide the popup functionality.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true, disabled: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Select Items"
    title="Cool items"
    :items="data.items"
    has-filter
    @changes="(changedItems) => data.items = changedItems" />
</Komponent>

> The `Komponent` component is used in this example to create state.

```vue
<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Select Items"
    :items="data.items"
    has-filter
    @changes="(changedItems) => data.items = changedItems" />
</Komponent>
```

## Props
### items - required
An array of objects to be used as the list options. The `label` & `selected` properties are required. You can also add a property of `disabled` to disable the specific option.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true, disabled: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Includes disabled item"
    :items="data.items" />
</Komponent>

```js
const items = [
  { label: 'item1', selected: false },
  { label: 'item2', selected: true },
  { label: 'item3', selected: true, disabled: true }
]
```

### title
Title shown above the list of items.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect
    title="Cool Title Dude"
    button-text="Custom title"
    :items="data.items" />
</Komponent>

```vue
<KMultiselect
  button-text="Custom Title"
  title="Cool Title Dude"
  :items="data.items" />
```

### width
Sets the width of the popup container. Defaults to auto.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="BigBoi"
    :items="data.items"
    width="300" />
</Komponent>

```vue
<KMultiselect
  button-text="BigBoi"
  width="300"
  :items="data.items" />
```

### applyText
Text of apply action button.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: false }] }" v-slot="{ data }">
  <KMultiselect
    button-text="Custom Apply Text"
    apply-text="Submit"
    :items="data.items" />
</Komponent>

```vue
<KMultiselect
  button-text="Custom Apply Text"
  apply-text="Submit""
  :items="data.items" />
```

### buttonText
Sets the text of the trigger button.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: false }] }" v-slot="{ data }">
  <KMultiselect
    button-text="Select Items"
    :items="data.items" />
</Komponent>

```vue
<KMultiselect
  button-text="Select Items"
  :items="data.items" />
```

### buttonAttributes
An object of attributes to be passed to the trigger button. Any attributes available on [KButton](/components/button.html) will work.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Primary Button"
    :button-attributes="{ appearance: 'primary', disabled: true }"
    :items="data.items" />
</Komponent>

```vue
<KMultiselect
  button-text="Primary Button"
  :button-attributes="{ appearance: 'primary', disabled: true }"
  :items="data.items" />
```

### hasFilter
Enables a filter input to search the items

<Komponent :data="{ items: [{ label: 'Toyota', selected: true, disabled: false }, { label: 'Scion', selected: false, disabled: false }, { label: 'VW', selected: false, disabled: false }, { label: 'Mazda', selected: false, disabled: false }, { label: 'Ford', selected: true, disabled: true }, { label: 'Dodge', selected: false, disabled: true }, { label: 'Chevrolet', selected: true, disabled: false }, { label: 'Suzuki', selected: false, disabled: false }, { label: 'Hyundai', selected: true, disabled: true }, { label: 'Honda', selected: true, disabled: false }] }" v-slot="{ data }">
  <KMultiselect
    button-text="Car Makers"
    has-filter
    title="Select car makers" 
    :items="data.items" />
</Komponent>

> The `Komponent` component is used in this example to create state.

```vue
<Komponent :data="{ items: [{ label: 'Toyota', selected: true, disabled: false }, { label: 'Scion', selected: false, disabled: false }, { label: 'VW', selected: false, disabled: false }, { label: 'Mazda', selected: false, disabled: false }, { label: 'Ford', selected: true, disabled: true }, { label: 'Dodge', selected: false, disabled: true }, { label: 'Chevrolet', selected: true, disabled: false }, { label: 'Suzuki', selected: false, disabled: false }, { label: 'Hyundai', selected: true, disabled: true }, { label: 'Honda', selected: true, disabled: false }] }" v-slot="{ data }">
  <KMultiselect
    button-text="Car Makers"
    has-filter
    title="Select car makers" 
    :items="data.items" />
</Komponent>
```


## Usage
KMultiselect will keep internally keep track of the selected changes and will emitted the entire array of items when the `apply` button is clicked. You can then use the emitted data to update your state.

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: false}] }" v-slot="{ data }">
  <div>
    <KCard class="mb-4">
      <template #body>{{ data.items }}</template>
    </KCard>
    <KMultiselect
      button-text="Items"
      :items="data.items"
      @changes="(changedItems) => data.items = changedItems" />
  </div>
</Komponent>

```vue
<template>
  <KMultiselect
    button-text="Items"
    :items="data.items"
    @changes="(changedItems) => items = changedItems" />
</template>

<script>
export default {
  data () {
    items =  [
      { label: 'item1', selected: false },
      { label: 'item2', selected: false }
    ]
  }
}
</script>
```
