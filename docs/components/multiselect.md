# Multiselect

**Multiselect** - Multiselect component

- The total count of selected items will be displayed as the placeholder text when the multiselect is collapsed.
- When items are selected they will be shown as dismissible badges above the filter input when the multiselect has focus.
- If at least one item is selected, there will be a clear all button displayed in place of the dropdown chevron when the multiselect has focus.
- Selected items are displayed at the top of the dropdown for easy access (refreshed on multiselect collapse).

<ClientOnly>
  <KMultiselect label="Pick Something" :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect label="Pick Something" :items="items" />
```

## Props

### items

An array of items containing a `label` and `value`.

You may also specify:
- a certain item is `selected` by default
- a certain item is `disabled`
- certain items are grouped under a `group`

:::tip TIP
If an item is specified with `selected: true` and `disabled: true`, then the item will be selected, disabled in the dropdown list, and the dismiss button will be removed, meaning a user cannot remove the selected item.

You can specify `disabledTooltipText` property to customize the disabled tooltip that appears when hovering over the lock icon. Defaults to `This item cannot be removed`.
:::

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
    disabledTooltipText: 'This item is locked and cannot be removed'
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
    value: 'tigers',
    disabled: true
  }, {
    label: 'Bears',
    value: 'bears'
  }, {
    label: 'A long & truncated item',
    value: 'long'
  }, {
    label: 'Duck',
    value: 'duck',
    group: 'Birds'
  }, {
    label: 'Oriole',
    value: 'oriole',
    group: 'Birds'
  }, {
    label: 'Trout',
    value: 'trout',
    group: 'Fish'
  }, {
    label: 'Salmon',
    value: 'salmon',
    group: 'Fish'
  }]"
/>
```

### enableItemCreation

`KMultiselect` can offer users the ability to add custom items to the list by typing the item they want to and then clicking the `... (Add new value)` item at the bottom of the list, which will also automatically select it.

Newly created items will have a `label` consisting of the user input and a randomly generated id for the `value` to ensure uniqueness. It will also have an attribute `custom` set to `true`. This action triggers an `item:added` event containing the added item data.

Deselecting the item will completely remove it from the list and underlying data, and trigger a `item:removed` event containing the removed item's data.

:::tip NOTE
You cannot add an item if the `label` matches the `label` of a pre-existing item. In that scenario the `... (Add new value)` item will not be displayed.
:::

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json ma-0">{{ JSON.stringify(mySelections) }}</pre>
  <KLabel>Added Items:</KLabel> <pre class="json ma-0">{{ JSON.stringify(addedItems) }}</pre>
  <KMultiselect
    v-model="mySelections"
    :items="deepClone(defaultItems)"
    enable-item-creation
    class="mt-2"
    @item:added="(item) => trackNewItems(item, true)"
    @item:removed="(item) => trackNewItems(item, false)"
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
    @item:added="(item) => trackNewItems(item, true)"
    @item:removed="(item) => trackNewItems(item, false)"
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

### label

The label for the select.

<ClientOnly>
  <KMultiselect label="Cool label" :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect label="Cool label" :items="items" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label) if using the `label` prop.

<ClientOnly>
  <KMultiselect label="Name" :label-attributes="{
      help: 'I use the KLabel `help` prop',
      'data-testid': 'test'
    }"
    :items="defaultItemsUnselect"
  />
</ClientOnly>

```html
<KMultiselect
  label="Name"
  :label-attributes="{
    help: 'I use the KLabel `help` prop',
    'data-testid': 'test'
  }"
  :items="items"
/>
```

### width

You can pass a `width` string for the dropdown. By default the `width` is `300px`. This is the width of the input, dropdown, and selected item.
Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

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

Use this prop to customize the number of rows of selections to display when the multiselect has focus. By default, we display 2 rows of selections. Additional selections will be combined into an additional count badge if the number of selections would extend beyond the selection row count. You can hover over this badge to see the remaining selections.

<ClientOnly>
  <KMultiselect :selected-row-count="1" :items="deepClone(defaultItemsCollapse)" />
</ClientOnly>

```html
<KMultiselect :selected-row-count="1" :items="items" />
```

### collapsedContext

By default, we try to keep the KMultiselect display slim. This means that KMultiselect only takes up a single line when it doesn't have focus. You can set `collapsedContext` to `true` if you want to continue to see the selections even when KMultiselect doesn't have focus. Note: the `selectedRowCount` determines the maximum number of rows the KMultiselect will take up when collapsed.

<ClientOnly>
  <KMultiselect collapsed-context :items="deepClone(defaultItemsManySelected)" />
  <br>
  <KMultiselect :selected-row-count="1" collapsed-context :items="deepClone(defaultItemsCollapse)" />
</ClientOnly>

```html
<KMultiselect collapsed-context :items="items" />
<KMultiselect :selected-row-count="1" collapsed-context :items="items" />
```

### expandSelected

By default, we try to keep the KMultiselect display slim. This means that KMultiselect only takes up a single line when it doesn't have focus, and when focused, if the selected entries would display beyond the `selectedRowCount` we collapse them into the additional count badge. You can set `expandSelected` to `true` if you want to continue to see the selections even when KMultiselect doesn't have focus. Instead of collapsing additional selections into the additional count badge we will allow you to scroll through all of your selections.

<ClientOnly>
  <KMultiselect expand-selected :items="deepClone(defaultItemsManySelected)" />
</ClientOnly>

```html
<KMultiselect expand-selected :items="items" />
```

### dropdownMaxHeight

You can pass a `dropdownMaxHeight` string for the dropdown. By default, the `dropdownMaxHeight` is `300px`. This is the maximum height of the `KMultiselect` dropdown when open. You can pass a number (will be converted to `px`), `auto`, percentages, or `vh` units.

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

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `true`. See [`KPop` docs](popover.html#positionfixed) for more information.

### loading

You can use the `loading` prop to show a loading indicator in place of the chevron while fetching data from API.
See [autosuggest](#autosuggest-with-debounce) for a functional example.

<ClientOnly>
  <KMultiselect loading :items="deepClone(defaultItemsUnselect)" />
</ClientOnly>

```html
<KMultiselect loading :items="items" />
```

### filterFunc

Use this prop to override the default filter function if you want to do something like filter on an attribute other than `label`. Your filter function
should take as parameter a JSON object containing the items to filter on (`items`) and the query string (`query`) and return the filtered items. See [Slots](#slots) for an example.

```js
myCustomFilter ({ items, query }) {
  return items.filter(anItem => anItem.label.includes(query))
}
```

::: tip NOTE
`filterFunc` does not work with `autosuggest` enabled.
For `autosuggest`, you are in charge of filtering the options, so `KMultiselect` won't filter them internally.
See [autosuggest](#autosuggest) for more details.
:::

### v-model

`KMultiselect` works as regular inputs do using v-model for data binding:

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json ma-0">{{ JSON.stringify(myVal) }}</pre>
  <KMultiselect v-model="myVal" :items="deepClone(defaultItems)" class="mt-2" />
  <br>
  <KButton @click="clearIt">Clear</KButton>
</ClientOnly>

```html
<div>
  <KLabel>Value:</KLabel> {{ myVal }}
  <KMultiselect v-model="myVal" :items="items" />
  <KButton @click="clearIt">Clear</KButton>
</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myVal: ['cats', 'bunnies'],
      items: [{
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
        label: 'A long & truncated item',
        value: 'long'
      }]
    }
  },
  methods: {
    clearIt() {
      this.myVal = []
    }
  }
})
</script>
```

### autosuggest

Add the `autosuggest` prop to trigger a query to an API with the filter keyword, and then update `items` asynchronously as suggestions as the user types.
Empty state content can be configured using the `empty` slot.

::: tip NOTE
When using `autosuggest`, you **MUST** use `v-model` otherwise the Multiselect can't maintain an accurate list of which items are selected.
:::

<ClientOnly>
  <KLabel>Value:</KLabel> <pre class="json ma-0">{{ JSON.stringify(myAutoVal) }}</pre>
  <KMultiselect
    v-model="myAutoVal"
    autosuggest
    :items="itemsForAutosuggest"
    :loading="loading"
    class="mt-2"
    @query-change="onQueryChange"
  >
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.description }}</div>
    </template>
    <template v-slot:empty>
      <div>No results found</div>
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect
  v-model="myAutoVal"
  autosuggest
  :items="items"
  :loading="loading"
  @query-change="onQueryChange"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.label }}</div>
  </template>
  <template v-slot:empty>
    <div>No results found</div>
  </template>
</KMultiselect>

<script lang="ts">
const allItems = new Array(10).fill().map((_, i) => ({
  label: `Item ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}));

export default {
  data() {
    return {
      myAutoVal: [],
      defaultItems: [],
      items: [],
      loading: false,
    }
  },
  methods: {
    onQueryChange (val) {
      if (val === '' && !this.defaultItems.length) {
        this.loading = true;
        // If query is empty and default items are not fetched, fetch them
        setTimeout(() => {
          this.defaultItems = allItems;
          this.items = this.defaultItems.map(item => Object.assign({}, item));
          this.loading = false;
        }, 200);
        return;
      }

      if (val === '') {
        // If query is empty and default items are fetched, use the default items
        this.items = this.defaultItems.map(item => Object.assign({}, item));
        return;
      }

      this.loading = true;

      // Otherwise fetch items that contain the keyword
      setTimeout(() => {
        this.items =
          allItems
            .filter(item => item.label.toLowerCase().includes(val.toLowerCase()) || item.description.toLowerCase().includes(val.toLowerCase()))
            .map(item => Object.assign({}, item));
        this.loading = false;
      }, 200);
    }
  }
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
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.label }}</div>
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect
  v-model="myDebounceAutoVal"
  autosuggest
  :items="items"
  :loading="loading"
  @query-change="onQueryChange"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.label }}</div>
  </template>
</KMultiselect>

<script lang="ts">
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
  label: `Item ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}));

export default {
  data() {
    return {
      myDebounceAutoVal: [],
      defaultItems: [],
      items: [],
      loading: true,
    }
  },
  methods: {
    onQueryChange (val) {
      if (val === '' && !this.defaultItems.length) {
        // If query is empty and default items are not fetched, fetch them
        this.loading = true;

        setTimeout(() => {
          this.defaultItems = allItems;
          this.items = this.defaultItems.map(item => Object.assign({}, item));
          this.loading = false;
        }, 200);
        return;
      }

      if (val === '') {
        // If query is empty and default items are fetched, use the default items
        this.items = this.defaultItems.map(item => Object.assign({}, item));

        return;
      }

      this.debouncedHandler(val);
    },
    debouncedHandler: debounce(function (val) {
      this.loading = true;
      // Fetch items that contain the keyword
      setTimeout(() => {
        this.items =
          allItems
            .filter(item => item.label.toLowerCase().includes(val.toLowerCase()) || item.description.toLowerCase().includes(val.toLowerCase()))
            .map(item => Object.assign({}, item));
        this.loading = false;
      }, 200);
    }, 400)
  }
}
</script>
```

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<ClientOnly>
  <KMultiselect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
</ClientOnly>

```html
<KMultiselect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```

### required

KMultiselect will display an `*` to indicate a field is required if you set the `required` attribute and provide a `label`. See **KLabel's** [`required`](/components/label#required) prop for more information.

:::tip NOTE
Text passed in for the `label` will automatically strip any trailing `*` when used with the `required` attribute to try to prevent duplicate asterisks.
:::

<ClientOnly>
  <KMultiselect label="Name" required :items="deepClone(defaultItems)" />
</ClientOnly>

```html
<KMultiselect label="Name" required :items="items" />
```

## Slots

- `item-template` - The template for each item in the dropdown list
- `empty` - Slot for the empty state in the dropdown list
- `dropdown-footer-text` - Slot for footer text in the bottom of the dropdown

### Item Template

You can use the `item-template` slot to customize the look and feel of your items. Use slots to gain access to the `item` data.

:::tip TIP
If you use the `.select-item-label` and `.select-item-desc` classes within the slot as shown in the example below, the dropdown items will inherit preconfigured styles for two-level select items which you're then free to customize.
:::

<ClientOnly>
  <KMultiselect :items="myItems" width="100%" :filterFunc="customFilter">
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.description }}</div>
    </template>
  </KMultiselect>
</ClientOnly>

```html
<KMultiselect :items="myItems" width="100%" :filterFunc="customFilter">
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.description }}</div>
  </template>
</KMultiselect>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myItems: this.getItems(5),
    }
  },
  methods: {
    getItems(count) {
      let myItems = []
        for (let i = 0; i < count; i++) {
          myItems.push({
            label: `Item ${i}`,
            value: `item_${i}`,
            description: `${i} - The item's description for number ${i}`
          })
        }
      return myItems
    },
    customFilter (items, queryStr) {
      return items.filter(item => {
        return item.label.toLowerCase().includes(queryStr.toLowerCase()) ||
          item.description.toLowerCase().includes(queryStr.toLowerCase())
      })
    }
  }
})
</script>
```

### Empty State

You can use the `empty` slot to customize the look of the dropdown list when there is no options. See [autosuggest](#autosuggest) for an example of this slot.

### Dropdown Footer Text

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

| Event               | Action                                                     | Returns                                      |
| :------------------ | :--------------------------------------------------------- | :------------------------------------------- |
| `selected`          | an item is clicked                                         | array of selected item objects               |
| `update:modelValue` | selections are changed                                     | array of selected item values                |
| `change`            | selections are changed                                     | last item selected/deselected Object or null |
| `item:added`        | enableItemCreation is true and an item is added            | item object being added to selections        |
| `item:removed`      | enableItemCreation is true and an added item is deselected | item object being removed from selections    |
| `query-change`      | filter string is changed                                   | `query` String                               |

An example of hooking into events to modify newly created items (`enableItemCreation`) as they are added.

<ClientOnly>
  <KLabel>myItems:</KLabel> <pre class="json ma-0">{{ JSON.stringify(myEventItems) }}</pre>
  <KMultiselect
    :items="myEventItems"
    enable-item-creation
    class="mt-2"
    @item:added="item => handleAddedItem(item, true)"
    @item:removed="item => handleAddedItem(item, false)"
    @selected="handleSelection"
  />
</ClientOnly>

```html
<template>
  <KMultiselect
    :items="myItems"
    enable-item-creation
    @item:added="item => handleAddedItem(item, true)"
    @item:removed="item => handleAddedItem(item, false)"
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
  label: `Item ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`,
  ...(i > 5 && { group: `${i % 2 === 0 ? 'Even items greater than 5' : 'Odd items greater than 5'}` })
}));

export default defineComponent({
  data() {
    return {
      myItems: getItems(5),
      mySelect: '',
      mySelections: ['cats', 'bunnies'],
      addedItems: [],
      myVal: ['cats', 'bunnies'],
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
        label: 'A long & truncated item',
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
        disabledTooltipText: 'This item is locked and cannot be removed'
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
        value: 'tigers',
        disabled: true
      }, {
        label: 'Bears',
        value: 'bears'
      }, {
        label: 'A long & truncated item',
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
        label: 'A long & truncated item',
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
        disabled: true,
        disabledTooltipText: 'This item is locked and cannot be removed'
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
        value: 'tigers',
        selected: true
      }, {
        label: 'Bears',
        value: 'bears',
        selected: true
      }, {
        label: 'A long & truncated item',
        value: 'long',
        selected: true
      }],
      defaultItemsUnselect: [{
        label: 'Cats',
        value: 'cats'
      }, {
        label: 'Dogs',
        value: 'dogs',
        selected: true,
        disabled: true,
        disabledTooltipText: 'This item is locked and cannot be removed'
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
        label: 'A long & truncated item',
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
