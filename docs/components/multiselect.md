# Multiselect

KMultiselect - A select component that allows for choosing multiple items and creating new options.

- Selected items labels will be displayed as dismissible badges.
- When the dropdown is open, the input field for filtering items will be displayed.
- If at least one item is selected, there will be a clear all button displayed in place of the dropdown chevron when the multiselect has focus.
- Selected items are displayed at the top of the dropdown for easy access (refreshed on multiselect collapse).

<ClientOnly>
  <KMultiselect label="Pick Something" :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect label="Pick Something" :items="items" />
```

## Props

### v-model

KMultiselect works as regular inputs do using `v-model` for data binding:

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json">{{ JSON.stringify(myVal) }}</pre>
  <KMultiselect v-model="myVal" :items="deepClone(defaultItems)" />
  <br>
  <KButton @click="clearIt">Clear</KButton>
</ClientOnly>

```vue
<template>
  <KLabel>Value:</KLabel> {{ myVal }}
  <KMultiselect v-model="myVal" :items="items" />
  <KButton @click="clearIt">Clear</KButton>
</template>

<script setup lang="ts">
import { MultiselectItem } from '@kong/kongponents'

const myVal = ref<string[]>(["cats", "dogs", "bunnies"])

const items: MultiselectItem[] = [
  { label: 'Cats', value: 'cats', selected: true },
  { label: 'Dogs', value: 'dogs', selected: true, disabled: true },
  { label: 'Bunnies', value: 'bunnies', selected: true },
  { label: 'Lions', value: 'lions' },
  { label: 'Tigers', value: 'tigers' },
  { label: 'Bears', value: 'bears' },
  { label: 'An extremely lengthy truncated item', value: 'long' }
]

const clearIt = () => {
  myVal.value = []
}
</script>
```

### items

An array of items containing a `label` and `value`.

You may also specify:
- a certain item is `selected` by default
- a certain item is `disabled`
- certain items are grouped under a `group`

<ClientOnly>
  <KMultiselect :items="deepClone(defaultItemsWithDisabledAndGroups)" />
</ClientOnly>

```html
<KMultiselect :items="[{
    label: 'Cats',
    value: 'cats',
    selected: true
  }, {
    label: 'Dogs',
    value: 'dogs',
    selected: true,
    disabled: true,
  }, {
    label: 'Bunnies',
    value: 'bunnies',
    selected: true
  },
  {
    label: 'Lions',
    value: 'lions',
    disabled: true,
  }, {
    label: 'Tigers',
    value: 'tigers',
    disabled: true
  }, {
    label: 'Bears',
    value: 'bears'
  }, {
    label: 'An extremely lengthy truncated item',
    value: 'long'
  }, ...]"
/>
```

### help

Pass a `string` of help text to be displayed below the multiselect element.

<ClientOnly>
  <KMultiselect label="Label" help="Help text or other tips." :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect label="Label" help="Help text or other tips." :items="items" />
```

### error

A `boolean` to put the component into an error state.

<ClientOnly>
  <KMultiselect error :items="deepClone(defaultItemsCollapse)" />
  <br>
  <KMultiselect error collapsed-context help="Help text can turn into error message." :items="deepClone(defaultItemsCollapse)" />
</ClientOnly>

```html
<KMultiselect error :items="items" />
<KMultiselect error collapsed-context help="Help text can turn into error message." :items="items" />
```

### enableItemCreation

KMultiselect can offer users the ability to add custom items to the list by typing the item they want to and then **clicking the** `... (Add new value)` **item at the bottom of the list**, which will also automatically select it.

Newly created items will have a `label` consisting of the user input and a randomly generated id for the `value` to ensure uniqueness. The item will also have an attribute `custom` set to `true`. This action triggers an `item-added` event containing the added item data.

Deselecting the item will completely remove it from the list and underlying data, and trigger a `item-removed` event containing the removed item's data.

:::tip NOTE
You cannot add an item if the `label` matches the `label` of a pre-existing item. In that scenario the `... (Add new value)` item will not be displayed.
:::

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json">{{ JSON.stringify(mySelections) }}</pre>
  <KLabel>Added Items:</KLabel> <pre class="json">{{ JSON.stringify(addedItems) }}</pre>
  <KMultiselect
    v-model="mySelections"
    :items="deepClone(defaultItems)"
    enable-item-creation
    @item-added="(item) => trackNewItems(item, true)"
    @item-removed="(item) => trackNewItems(item, false)"
  />
</ClientOnly>

```html
<template>
  <KLabel>Value:</KLabel> {{ mySelections }}
  <KLabel>Added Items:</KLabel> {{ addedItems }}
  <KMultiselect
    v-model="mySelections"
    :items="items"
    enable-item-creation
    @item-added="(item) => trackNewItems(item, true)"
    @item-removed="(item) => trackNewItems(item, false)"
  />
</template>

<script setup lang="ts">
const mySelections = ref(['cats','bunnies'])
const addedItems = ref([])

const trackNewItems = (item, added) => {
  if (added) {
    addedItems.value.push(item)
  } else {
    addedItems.value = addedItems.value.filter(anItem => anItem.value !== item.value)
  }
}
</script>
```

### itemCreationValidator

Prop for passing a function for input validation when item creation is enabled.

The function takes the query input string as a single parameter and must return a `boolean` value.

When the function passed through `itemCreationValidator` returns `false`, the "Add new value" button will be disabled.

<KMultiselect
  :item-creation-validator="itemCreationValidator"
  :items="deepClone(defaultItems)"
  enable-filtering
  enable-item-creation
  @query-change="onItemCreationQueryChange"
>
  <template
    v-if="showNewItemValidationError"
    #dropdown-footer-text
  >
    <span class="item-creation-validation-error-message">
      New item should be at least 3 characters long.
    </span>
  </template>
</KMultiselect>

```vue
<template>
  <KMultiselect
    :item-creation-validator="itemCreationValidator"
    :items="items"
    enable-filtering
    enable-item-creation
    @query-change="onQueryChange"
  >
    <template
      v-if="showNewItemValidationError"
      #dropdown-footer-text
    >
      <span class="item-creation-validation-error-message">
        New item should be at least 3 characters long.
      </span>
    </template>
  </KMultiselect>
</template>

<script setup lang="ts">
import type { MultiselectItem } from '@kong/kongponents'

const items: MultiselectItem = [...]

const showNewItemValidationError = ref<boolean>(false)
const itemCreationValidator = (value: string) => value.length >= 3

const onQueryChange = (query: string): void => {
  showNewItemValidationError.value = query ? !itemCreationValidator(query) : false
}
</script>

<style lang="scss" scoped>
.item-creation-validation-error-message {
  color: $kui-color-text-danger;
}
</style>
```

### label

The label for the select.

<ClientOnly>
  <KMultiselect label="Cool label" :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect label="Cool label" :items="items" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the KLabel's [props](/components/label) if using the `label` prop. This example shows using the `label-attributes` to set up a tooltip, see the [slot](#slots) section if you want to slot HTML into the tooltip rather than use plain text.

<ClientOnly>
  <KMultiselect label="Name" :label-attributes="{
      info: 'I use the KLabel `info` prop',
      'data-testid': 'test'
    }"
    :items="defaultItemsUnselect"
  />
</ClientOnly>

```html
<KMultiselect
  label="Name"
  :label-attributes="{
    info: 'I use the KLabel `info` prop',
    'data-testid': 'test'
  }"
  :items="items"
/>
```

### width

You can pass a `width` number or string for the dropdown. By default the `width` is `100%`. This is the width of the input, dropdown, and selected item. Currently we support any valid CSS length value.

::: tip NOTE
Because we are controlling the widths of multiple elements, we recommend using this prop to control the width instead of explicitly adding classes or styles to the `KMultiselect` component.
:::

<ClientOnly>
  <KMultiselect width="80%" :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect width="80%" :items="items" />
```

### selectedRowCount

Use this prop to customize the number of rows of selected items to display when the multiselect has focus. By default, we display one row of selected items. 

Additional selections will be combined into a count badge if the number of selections would extend beyond the selection row count. You can hover over this badge to see the remaining selections.

Note that this prop only applies when `collapsedContext` prop is `false`.

<ClientOnly>
  <KMultiselect :selected-row-count="2" :items="deepClone(defaultItemsManySelected)" />
</ClientOnly>

```html
<KMultiselect :selected-row-count="2" :items="items" />
```

### collapsedContext

By default KMultiselect displays selected items as badges. However, you can set `collapsedContext` to `true` and have it display just the number of selected items.

<ClientOnly>
  <KMultiselect collapsed-context :items="deepClone(defaultItemsManySelected)" />
</ClientOnly>

```html
<KMultiselect collapsed-context :items="items" />
```

### dropdownMaxHeight

You can pass a `dropdownMaxHeight` number or string for the dropdown. By default, the `dropdownMaxHeight` is `300px`. This is the maximum height of the `KMultiselect` dropdown when open. You can pass any valid CSS length value.

<ClientOnly>
  <KMultiselect :items="deepClone(defaultItemsLongList)" dropdown-max-height="150" />
</ClientOnly>

```html
<KMultiselect :items="items" dropdown-max-height="150" />
```

### dropdownFooterText

Adds informational text to the bottom of the dropdown options which remains visible even if the content is scrolled. Can also be [slotted](#slots).

<ClientOnly>
  <KMultiselect dropdown-footer-text="Sticky dropdown footer text" :items="deepClone(defaultItemsLongList)" />
</ClientOnly>

```html
<KMultiselect dropdown-footer-text="Sticky dropdown footer text" :items="items" />
```

### dropdownFooterTextPosition

By default, the dropdown footer text will be stuck to the bottom of the dropdown and will always be visible even if the dropdown content is scrolled.

If you want to override the behaviour and have the footer text at the end of the dropdown list, use the value `static`. This ensures the footer text is visible only when the user scrolls to view the bottom of the list.

Accepted values: `sticky` (default) and `static`.

<ClientOnly>
  <KMultiselect dropdown-footer-text-position="static" dropdown-footer-text="Static dropdown footer text" :items="deepClone(defaultItemsLongList)" />
</ClientOnly>

```html
<KMultiselect dropdown-footer-text-position="static" dropdown-footer-text="Static dropdown footer text" :items="items" />
```

### loading

You can use the `loading` prop to show a loading indicator in place of the chevron while fetching data from API.
See [autosuggest](#autosuggest-with-debounce) for a functional example.

<ClientOnly>
  <KMultiselect loading :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect loading :items="items" />
```

### filterFunction

Use this prop to override the default filter function if you want to do something like filter on an attribute other than `label`. Your filter function
should take as parameter a JSON object containing the items to filter on (`items`) and the query string (`query`) and return the filtered items. See [slots](#slots) for an example.

```ts
import { MultiselectFilterFunctionParams } from '@kong/kongponents'

const myCustomFilter = ({ items, query }: MultiselectFilterFunctionParams) => {
  return items.filter(anItem => anItem.label.includes(query))
}
```

::: tip NOTE
`filterFunction` does not work with `autosuggest` enabled.
For `autosuggest`, you are in charge of filtering the options, so `KMultiselect` won't filter them internally.
See [autosuggest](#autosuggest) for more details.
:::

### autosuggest

Add the `autosuggest` prop to trigger a query to an API with the filter keyword, and then update `items` asynchronously as suggestions as the user types.
Empty state content can be configured using the `empty` slot.

::: tip NOTE
When using `autosuggest`, you **must** use `v-model` otherwise the Multiselect can't maintain an accurate list of which items are selected.
:::

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json">{{ JSON.stringify(myAutoVal) }}</pre>
  <KMultiselect
    v-model="myAutoVal"
    autosuggest
    :items="itemsForAutosuggest"
    :loading="loading"
    @query-change="onQueryChange"
  >
    <template #item-template="{ item }">
      <div class="item-container">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
    </template>
    <template #empty>
      <div>No results found</div>
    </template>
  </KMultiselect>
</ClientOnly>

```vue
<template>
  <KMultiselect
    v-model="myAutoVal"
    autosuggest
    :items="items"
    :loading="loading"
    @query-change="onQueryChange"
  >
    <template #item-template="{ item }">
      <div class="item-container">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
    </template>
    <template #empty>
      <div>No results found</div>
    </template>
  </KMultiselect>
</template>

<script setup lang="ts">
import { MultiselectItem } from '@kong/kongponents'

const allItems: MultiselectItems[] = new Array(10).fill().map((_, i) => ({
  label: `${i % 2 === 0 ? 'Even item' : 'Odd item'} ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}))

const myAutoVal = ref([])
const defaultItems = ref([])
const items = ref([])
const loading = ref(false)

const onQueryChange = (val) => {
  if (val === '' && !defaultItems.value.length) {
    loading.value = true

    // If query is empty and default items are not fetched, fetch them
    setTimeout(() => {
      defaultItems.value = [...allItems]
      items.value = defaultItems.value.map((item) => ({ ...item }))
      loading.value = false
    }, 200)
    return
  }

  if (val === '') {
    // If query is empty and default items are fetched, use the default items
    items.value = defaultItems.value.map((item) => ({ ...item }))
    return
  }

  loading.value = true

  // Otherwise fetch items that contain the keyword
  setTimeout(() => {
    items.value = allItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(val.toLowerCase()) ||
          item.description.toLowerCase().includes(val.toLowerCase())
      )
      .map((item) => ({ ...item }))
    loading.value = false
  }, 200)
}
</script>
```

### autosuggest with debounce

::: tip NOTE
The `query-change` event triggers immediately when the user types in the input.
If you need to send API requests in the `query-change` event handler, you may want to implement a debounce function.
The following is an example:
:::

<ClientOnly>
  <KMultiselect
    v-model="myDebounceAutoVal"
    autosuggest
    :items="itemsForDebouncedAutosuggest"
    :loading="loadingForDebounced"
    @query-change="onQueryChangeForDebounced"
  >
    <template #item-template="{ item }">
      <div class="item-container">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
    </template>
  </KMultiselect>
</ClientOnly>

```vue
<template>
  <KMultiselect
    v-model="myDebounceAutoVal"
    autosuggest
    :items="items"
    :loading="loading"
    @query-change="onQueryChange"
  >
    <template #item-template="{ item }">
      <div class="item-container">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-description">{{ item.description }}</div>
      </div>
    </template>
  </KMultiselect>
</template>

<script setup lang="ts">
import { MultiselectItem } from '@kong/kongponents'

function debounce(func, timeout) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const allItems: MultiselectItems[] = new Array(10).fill().map((_, i) => ({
  label: `${i % 2 === 0 ? 'Even item' : 'Odd item'} ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}))

const myDebounceAutoVal = ref([])
const defaultItems = ref([])
const items = ref([])
const loading = ref(true)

const onQueryChange = (val) => {
  if (val === '' && !defaultItems.value.length) {
    // If query is empty and default items are not fetched, fetch them
    loading.value = true

    setTimeout(() => {
      defaultItems.value = allItems
      items.value = defaultItems.value.map(item => ({ ...item }))
      loading.value = false
    }, 200)
    return
  }

  if (val === '') {
    // If query is empty and default items are fetched, use the default items
    items.value = defaultItems.value.map(item => ({ ...item }))
    return
  }

  debouncedHandler(val)
}

const debouncedHandler = debounce(function (val) {
  loading.value = true
  // Fetch items that contain the keyword
  setTimeout(() => {
    items.value =
      allItems
        .filter(item => item.label.toLowerCase().includes(val.toLowerCase()) || item.description.toLowerCase().includes(val.toLowerCase()))
        .map(item => ({ ...item }))
    loading.value = false
  }, 200)
}, 400)
</script>
```

### placeholder

Text to be displayed inside of the dropdown trigger element (only applies when [`collapsedContext` prop](#collapsedcontext) is `false`). See [`searchPlaceholder` prop](#searchplaceholder) if you want to set a placeholder in the dropdown search input.

<KMultiselect
  placeholder="Select one or more items"
  :items="deepClone(defaultItemsUnselect)"
/>

```html
<KMultiselect
  placeholder="Select one or more items"
  :items="items"
/>
```

### searchPlaceholder

Search input placeholder (when [`collapsedContext` prop](#collapsedcontext) is `false`, acts as placeholder in dropdown input).

<div class="vertical-container">
  <KMultiselect
    label="Multiselect with a placeholder"
    search-placeholder="Search"
    :items="deepClone(defaultItemsUnselect)"
  />

  <KMultiselect
    label="Multiselect with a placeholder (collapsedContext)"
    collapsed-context
    search-placeholder="Search"
    :items="deepClone(defaultItemsUnselect)"
  />
</div>

```html
<KMultiselect
  search-placeholder="Search"
  label="Multiselect with a placeholder"
  :items="items"
/>
<KMultiselect
  search-placeholder="Search"
  collapsed-context
  label="Multiselect with a placeholder (collapsedContext)"
  :items="items"
/>
```

### kpopAttributes

Attributes to be passed to underlying KPopover component. See [KPopover's props](/components/popover#props) for more info.


## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<ClientOnly>
  <KMultiselect disabled :items="[{ label: 'test', value: 'test' }]" />
</ClientOnly>

```html
<KMultiselect disabled :items="[{ label: 'test', value: 'test' }]" />
```

### required

KMultiselect will display a red dot to indicate a field is required if you set the `required` attribute and provide a `label`. See KLabel's [props](/components/label#required) for more information.

:::tip NOTE
Text passed in for the `label` will automatically strip any trailing `*` when used with the `required` attribute to try to prevent duplicate visual indications.
:::

<ClientOnly>
  <KMultiselect label="Name" required :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KMultiselect label="Name" required :items="items" />
```

## Slots

### label-tooltip

If you want to utilize HTML in the multiselect label's tooltip, use the slot.

<ClientOnly>
  <KMultiselect label="My tooltip" :items="deepClone(defaultItems)">
    <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect label="My tooltip" :items="items">
  <template #label-tooltip>Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code></template>
</KMultiselect>
```

### item-template

You can use the `item-template` slot to customize the look and feel of your items. Use slots to gain access to the `item` data.

<ClientOnly>
  <KMultiselect :items="myItems">
    <template #item-template="{ item }">
      <div class="custom-item">
        <KongIcon />
        <div class="custom-item-title-container">
          <span class="custom-item-title">{{ item?.label }}</span>
          <span class="custom-item-description">{{ item?.label }} description.</span>
        </div>
      </div>
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect :items="myItems">
  <template #item-template="{ item }">
    <div class="custom-item">
      <KongIcon />
      <div class="custom-item-title-container">
        <span class="custom-item-title">{{ item?.label }}</span>
        <span class="custom-item-description">{{ item?.label }} description.</span>
      </div>
    </div>
  </template>
</KMultiselect>
```

### item-badge-icon

Slot for passing a custom icon to be displayed in front of item label in selected item badge.

<ClientOnly>
  <KMultiselect :items="deepClone(defaultItems)">
    <template #item-badge-icon="{ item }">
      <DisabledIcon v-if="item.disabled" />
      <KongIcon v-else />
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect :items="myItems">
  <template #item-badge-icon="{ item }">
    <DisabledIcon v-if="item.disabled" />
    <KongIcon v-else />
  </template>
</KMultiselect>
```

### empty

You can use the `empty` slot to customize the look of the dropdown list when there is no options. See [autosuggest](#autosuggest) for an example of this slot.

### dropdown-footer-text

Slot the content of the dropdown footer text. This slot will override the `dropdownFooterText` prop if provided.

<ClientOnly>
  <KMultiselect dropdown-footer-text="Dropdown footer text" :items="deepClone(defaultItemsLongList)">
    <template #dropdown-footer-text>
      Come as you are
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect dropdown-footer-text="I am replaceable" :items="items">
  <template #dropdown-footer-text>
    Come as you are
  </template>
</KMultiselect>
```

## Events

### selected

Fires when an item is clicked. Returns an array of selected item objects.

### update:modelValue

Fires when selections are changed. Returns an array of selected item values.

### change

Fires when selections are changed. Returns the last item selected/deselected object or `null`.

### item-added

Fires when `enableItemCreation` is true and an item is added. Returns the item object being added to selections.

### item-removed

Fires when `enableItemCreation` is true and an added item is deselected. Returns the item object being removed from selections.

### query-change

Fires when the filter string is changed. Returns the `query` String.

An example of hooking into events to modify newly created items (`enableItemCreation`) as they are added.

<ClientOnly>
  <KLabel>myItems:</KLabel> <pre class="json">{{ JSON.stringify(myEventItems) }}</pre>
  <KMultiselect
    :items="myEventItems"
    enable-item-creation
    @item-added="item => handleAddedItem(item, true)"
    @item-removed="item => handleAddedItem(item, false)"
    @selected="handleSelection"
  />
</ClientOnly>

```vue
<template>
  <KMultiselect
    :items="myItems"
    enable-item-creation
    @item-added="item => handleAddedItem(item, true)"
    @item-removed="item => handleAddedItem(item, false)"
    @selected="handleSelection"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myItems = ref([
  {
    label: '200',
    value: 200,
    selected: true,
    disabled: true
  },
  {
    label: '400',
    value: 400
  },
  {
    label: '401',
    value: 401
  },
  {
    label: '404',
    value: 404
  },
  {
    label: '500',
    value: 500
  },
])

const handleAddedItem = (item, added) => {
  if (added) { // addition
    item.custom = true
    // mutate added items in some way
    item.value = `${item.label}-overridden`
    myItems.value.push(item)
  } else { // removal
    myItems.value = myItems.value.filter(anItem => anItem.value !== item.value)
  }
}

const handleSelection = (selectedItems) => {
  // updated selected state
  myItems.value.forEach(item => {
    const itemSelected = selectedItems.filter(sItem => sItem.value === item.value).length
    item.selected = itemSelected ? true : false
  })
}
</script>
```

<script lang="ts">
import { defineComponent } from 'vue'
import { KongIcon, DisabledIcon } from '@kong/icons'

function getItems(count) {
  let myItems = []
    for (let i = 0; i < count; i++) {
      myItems.push({
        label: `Item ${i}`,
        value: `item_${i}`,
        description: `${i} - The item's description for number ${i}`
      })
    }
  return myItems
}

function debounce(func, timeout) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const allItems = new Array(10).fill().map((_, i) => ({
  label: `${i % 2 === 0 ? 'Even item' : 'Odd item'} ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}));

export default defineComponent({
  components: { KongIcon, DisabledIcon },
  data() {
    return {
      myItems: getItems(5),
      mySelect: '',
      mySelections: ['cats', 'bunnies'],
      addedItems: [],
      myVal: ['cats', 'dogs', 'bunnies'],
      myAutoVal: [],
      myDebounceAutoVal: [],
      defaultItems: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs',
        selected: true,
        disabled: true
      }, {
        label: 'Bunnies',
        value: 'bunnies',
        selected: true
      },
      {
        label: 'Lions',
        value: 'lions'
      }, {
        label: 'Tigers',
        value: 'tigers'
      }, {
        label: 'Bears',
        value: 'bears'
      }, {
        label: 'An extremely lengthy truncated item',
        value: 'long'
      }],
      defaultItemsWithDisabledAndGroups: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs',
        selected: true,
        disabled: true,
      }, {
        label: 'Bunnies',
        value: 'bunnies',
        selected: true
      },
      {
        label: 'Lions',
        value: 'lions',
        disabled: true,
      }, {
        label: 'Tigers',
        value: 'tigers',
        disabled: true
      }, {
        label: 'Bears',
        value: 'bears'
      }, {
        label: 'An extremely lengthy truncated item',
        value: 'long'
      }, {
        label: 'Duck',
        value: 'duck',
        group: 'Birds'
      },{
        label: 'Salmon',
        value: 'salmon',
        group: 'Fish'
      }, {
        label: 'Oriole',
        value: 'oriole',
        group: 'Birds'
      }, {
        label: 'Trout',
        value: 'trout',
        group: 'Fish'
      }],
      defaultItemsCollapse: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs',
        selected: true,
        disabled: true
      }, {
        label: 'Bunnies',
        value: 'bunnies',
        selected: true
      },
      {
        label: 'Lions',
        value: 'lions'
      }, {
        label: 'Tigers',
        value: 'tigers'
      }, {
        label: 'Bears',
        value: 'bears'
      }, {
        label: 'An extremely lengthy truncated item',
        value: 'long',
        selected: true
      }],
      defaultItemsManySelected: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs',
        selected: true,
      }, {
        label: 'Bunnies',
        value: 'bunnies',
        selected: true
      },
      {
        label: 'Lions',
        value: 'lions',
        selected: true
      }, {
        label: 'Tigers',
        value: 'tigers',
        selected: true
      }, {
        label: 'Bears',
        value: 'bears',
        selected: true
      }, {
        label: 'An extremely lengthy truncated item',
        value: 'long',
        selected: true
      }],
      defaultItemsUnselect: [{
        label: 'Cats',
        value: 'cats'
      }, {
        label: 'Dogs',
        value: 'dogs'
      }, {
        label: 'Bunnies',
        value: 'bunnies'
      },
      {
        label: 'Lions',
        value: 'lions'
      }, {
        label: 'Tigers',
        value: 'tigers'
      }, {
        label: 'Bears',
        value: 'bears'
      }, {
        label: 'An extremely lengthy truncated item',
        value: 'long'
      }],
      myEventItems: [{
        label: '200',
        value: 200,
        selected: true,
        disabled: true
      },
      {
        label: '400',
        value: 400
      },
      {
        label: '401',
        value: 401
      },
      {
        label: '404',
        value: 404
      },
      {
        label: '500',
        value: 500
      }],
      defaultItemsForAutosuggest: [],
      itemsForAutosuggest: [],
      loading: false,
      defaultItemsForDebouncedAutosuggest: [],
      itemsForDebouncedAutosuggest: [],
      loadingForDebounced: false,
      showNewItemValidationError: false,
    }
  },
  methods: {
    trackNewItems (item, added) {
      if (added) {
        this.addedItems.push(item)
      } else {
        this.addedItems = this.addedItems.filter(anItem => anItem.value !== item.value)
      }
    },
    handleItemSelect (item) {
      this.mySelect = item.label
    },
    clearIt () {
      this.myVal = []
    },
    customFilter ({items, query}) {
      return items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()))
    },
    deepClone(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    onQueryChange (val) {
      if (val === '' && !this.defaultItemsForAutosuggest.length) {
        this.loading = true;
        setTimeout(() => {
          this.defaultItemsForAutosuggest = allItems;
          this.itemsForAutosuggest = this.defaultItemsForAutosuggest.map(item => Object.assign({}, item));
          this.loading = false;
        }, 200);
        return;
      }
      if (val === '') {
        this.itemsForAutosuggest = this.defaultItemsForAutosuggest.map(item => Object.assign({}, item));
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.itemsForAutosuggest =
          allItems
            .filter(item => item.label.toLowerCase().includes(val.toLowerCase()) || item.description.toLowerCase().includes(val.toLowerCase()))
            .map(item => Object.assign({}, item));
        this.loading = false;
      }, 200);
    },
    onQueryChangeForDebounced (val) {
      if (val === '' && !this.defaultItemsForDebouncedAutosuggest.length) {
        this.loadingForDebounced = true;
        setTimeout(() => {
          this.defaultItemsForDebouncedAutosuggest = allItems;
          this.itemsForDebouncedAutosuggest = this.defaultItemsForDebouncedAutosuggest.map(item => Object.assign({}, item));
          this.loadingForDebounced = false;
        }, 200);
        return;
      }
      if (val === '') {
        this.itemsForDebouncedAutosuggest = this.defaultItemsForDebouncedAutosuggest.map(item => Object.assign({}, item));
        return;
      }
      this.debouncedHandler(val);
    },
    debouncedHandler: debounce(function (val) {
      this.loadingForDebounced = true;
      // mock API call for items that contain the keyword
      setTimeout(() => {
        this.itemsForDebouncedAutosuggest =
          allItems
            .filter(item => item.label.toLowerCase().includes(val.toLowerCase()) || item.description.toLowerCase().includes(val.toLowerCase()))
            .map(item => Object.assign({}, item));
        this.loadingForDebounced = false;
      }, 200);
    }, 400),
    handleAddedItem (item, added) {
      if (added) { // addition
        item.custom = true
        // mutate added items in some way
        item.value = `${item.label}-overridden`
        this.myEventItems.push(item)
      } else { // removal
        this.myEventItems = this.myEventItems.filter(anItem => anItem.value !== item.value)
      }
    },
    handleSelection (selectedItems) {
      // updated selected state
      this.myEventItems.forEach(item => {
        const itemSelected = selectedItems.filter(sItem => sItem.value === item.value).length
        item.selected = itemSelected ? true : false
      })
    },
    itemCreationValidator (value: string) {
      return value.length >= 3
    },
    onItemCreationQueryChange (query: string) {
      this.showNewItemValidationError = query ? !this.itemCreationValidator(query) : false
    }
  },
  computed: {
    defaultItemsLongList () {
      let items = []
      for (let i = 0; i < 30; i++) {
        items.push({
          label: `Item ${i}`,
          value: i
        })
      }

      return items
    }
  }
})
</script>

<style scoped lang="scss">
.json {
  inset: 0 !important;
}

.custom-item {
  display: flex;
  flex-direction: row;
  gap: $kui-space-30;

  &-title-container {
    flex: 1;
  }

  &-title {
    display: block;
  }

  &-description {
    color: $kui-color-text-neutral;
    display: block;
    font-size: $kui-font-size-20;
  }
}

.item-container {
  .item-label {
    font-weight: $kui-font-weight-semibold;
  }

  .item-description {
    color: $kui-color-text-neutral;
  }
}

.vertical-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.item-creation-validation-error-message {
  color: $kui-color-text-danger;
}
</style>
