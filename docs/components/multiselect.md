# Multiselect

<div v-if="hasMounted">

**Multiselect** - Multiselect component

- The total count of selected items will be displayed as the placeholder text when the multiselect is collapsed.
- When items are selected they will be shown as dismissible badges above the filter input when the multiselect has focus.
- If at least one item is selected, there will be a clear all button displayed in place of the dropdown chevron when the multiselect has focus.
- Selected items are displayed at the top of the dropdown for easy access (refreshed on multiselect collapse).

<div>
  <KMultiselect label="Pick Something" :items="deepClone(defaultItemsUnselect)" />
</div>

```html
<KMultiselect label="Pick Something" :items="items" />
```

## Props

### items

An array of items containing a `label` and `value`. You may also specify that a certain items are `selected` by default.

<div>
  <KMultiselect :items="deepClone(defaultItems)" />
</div>

```html
<KMultiselect :items="[{
    label: 'Cats',
    value: 'cats',
    selected: true
  }, {
    label: 'Dogs',
    value: 'dogs'
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
  }]"
/>
```

### label

The label for the select.

<div>
  <KMultiselect label="Cool label" :items="deepClone(defaultItemsUnselect)" />
</div>

```html
<KMultiselect label="Cool label" :items="items" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop.

<div>
  <KMultiselect label="Name" :label-attributes="{
      help: 'I use the KLabel `help` prop',
      'data-testid': 'test'
    }"
    :items="defaultItemsUnselect"
  />
</div>

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

:::tip Note
Because we are controlling the widths of multiple elements, we recommend using this prop to control the width instead of explicitly adding classes or styles to the `KMultiselect` component.
:::

<div>
  <KMultiselect width="350" :items="deepClone(defaultItemsUnselect)" />
</div>

```html
<KMultiselect width="350" :items="items" />
```

### selectedRowCount

Use this prop to customize the number of rows of selections to display when the multiselect has focus. By default, we display 2 rows of selections. Additional selections will be combined into an additional count badge if the number of selections would extend beyond the selection row count. You can hover over this badge to see the remaining selections.

<div>
  <KMultiselect :selected-row-count="1" :items="deepClone(defaultItemsCollapse)" />
</div>

```html
<KMultiselect :selected-row-count="1" :items="items" />
```

### dropdownMaxHeight

You can pass a `dropdownMaxHeight` string for the dropdown. By default, the `dropdownMaxHeight` is `300px`. This is the maximum height of the `KMultiselect` dropdown when open. You can pass a number (will be converted to `px`), `auto`, percentages, or `vh` units.

<div>
  <KMultiselect :items="deepClone(defaultItemsLongList)" dropdown-max-height="150" />
</div>

```html
<KMultiselect :items="items" dropdown-max-height="150" />
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `true`. See [`KPop` docs](popover.html#positionfixed) for more information.

### loading

You can use the `loading` prop to show a loading indicator in place of the chevron while fetching data from API.
See [autosuggest](#autosuggest-with-debounce) for a functional example.

<div>
  <KMultiselect loading :items="deepClone(defaultItemsUnselect)" />
</div>

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

:::tip Note
`filterFunc` does not work with `autosuggest` enabled.
For `autosuggest`, you are in charge of filtering the options, so `KMultiselect` won't filter them internally.
See [autosuggest](#autosuggest) for more details.
:::

### v-model

`KMultiselect` works as regular inputs do using v-model for data binding:

<div>
  <KLabel>Value:</KLabel> {{ myVal }}
  <KMultiselect v-model="myVal" :items="deepClone(defaultItems)" />
  <br>
  <KButton @click="clearIt">Clear</KButton>
</div>

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
        value: 'dogs'
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

:::tip Note
When using `autosuggest`, you **MUST** use `v-model` otherwise the Multiselect can't maintain an accurate list of which items are selected.
:::

<div>
  <KLabel>Value:</KLabel> {{ myAutoVal }}
  <KMultiselect
    v-model="myAutoVal"
    autosuggest
    :items="itemsForAutosuggest"
    :loading="loading"
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
</div>

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
  value: `autosuggest-item-${i}`
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

:::tip Note
The `query-change` event triggers immediately when the user types in the input.
If you need to send API requests in the `query-change` event handler, you may want to implement a debounce function.
The following is an example:
:::

<div>
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
</div>

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
  value: `autosuggest-item-${i}`
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

<div>
  <KMultiselect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
</div>

```html
<KMultiselect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```

## Slots

- `item-template` - The template for each item in the dropdown list
- `empty` - Slot for the empty state in the dropdown list

### Item Template

You can use the `item-template` slot to customize the look and feel of your items. Use slots to gain access to the `item` data.

If you use the `.select-item-label` and `.select-item-desc` classes within the slot as shown in the example below, the dropdown items will inherit preconfigured styles for two-level select items which you're then free to customize.

<div>
  <KMultiselect :items="myItems" width="100%" :filterFunc="customFilter">
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.description }}</div>
    </template>
  </KMultiselect>
</div>

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

## Events

| Event                 | returns             |
| :--------             | :------------------ |
| `selected`            | array of selected item objects |
| `update:modelValue`   | array of selected item values |
| `change`              | last item selected/deselected Object or null |
| `query-change`        | `query` String |

</div>

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
  value: `autosuggest-item-${i}`
}));

export default defineComponent({
  data() {
    return {
      hasMounted: false,
      myItems: getItems(5),
      mySelect: '',
      myVal: ['cats', 'bunnies'],
      myAutoVal: [],
      myDebounceAutoVal: [],
      defaultItems: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs'
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
      defaultItemsCollapse: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs'
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
        label: 'A long & truncated item',
        value: 'long'
      }],
      defaultItemsForAutosuggest: [],
      itemsForAutosuggest: [],
      loading: false,
      defaultItemsForDebouncedAutosuggest: [],
      itemsForDebouncedAutosuggest: [],
      loadingForDebounced: false,
    }
  },
  mounted() {
    this.hasMounted = true
  },
  methods: {
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
    }, 400)
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
