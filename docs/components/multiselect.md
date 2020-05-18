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

> The `Komponent` component is used as an example to create state.

```vue
<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Select Items"
    :items="data.items"
    @changes="(changedItems) => data.items = changedItems" />
</Komponent>
```

## Props
### items - required
An array of objects to be used as the list options. The `label` & `selected` properties are required. You can also add a property of `disabled` disable the specific option.

```js
const items = [
  { label: 'item1', selected: false },
  { label: 'item2', selected: true },
  { label: 'item3', selected: true, disabled: true }
]
```

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true, disabled: true}] }" v-slot="{ data }">
  <KMultiselect
    button-text="Disabled Item"
    :items="data.items" />
</Komponent>

### title
Title shown above the list of items.

### width
Sets the width of the popup container. Defaults to 200px.

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

### buttonText
Sets the text of the trigger button.

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

<Komponent :data="{ items: [{label: 'item1', selected: false}, {label: 'item2', selected: true}] }" v-slot="{ data }">
  <KMultiselect :items="data.items"><template #title>testtest</template></KMultiselect>
</Komponent>

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
