# Select

**Select** - Select input component

<div>
  <KSelect label="Pick Something:" :items="deepClone(defaultItemsUnselect)" />
</div>

```html
<KSelect label="Pick Something:" :items="items" />
```

## Props

### items

An array of items containing a `label` and `value`. You may also specify:
- a certain item is `selected` by default
- a certain item is `disabled`

<div>
  <KSelect :items="deepClone(defaultItemsWithDisabled)" />
</div>

```html
<KSelect :items="[{
    label: 'Cats',
    value: 'cats',
    selected: true
  }, {
    label: 'Dogs',
    value: 'dogs',
    disabled: true,
  }, {
    label: 'Bunnies',
    value: 'bunnies'
  }]"
/>
```

### label

The label for the select.

<div>
  <KSelect label="Cool label" :items="deepClone(defaultItemsUnselect)" />
</div>

```html
<KSelect label="Cool label" :items="items" />
```

### overlayLabel

Enable this prop to overlay the label on the input element's border for `select` and `dropdown` appearances. Defaults to `false`.

<KSelect label="Name" placeholder="I'm labelled!" :overlay-label="true" :items="deepClone(defaultItemsUnselect)" />
<KSelect label="Name" placeholder="I'm labelled!" :overlay-label="true" appearance="select" :items="deepClone(defaultItemsUnselect)" />
<KSelect label="Disabled" disabled placeholder="I'm disabled!" :overlay-label="true" :items="deepClone(defaultItemsUnselect)" />
<KSelect label="Readonly" readonly placeholder="I'm readonly!" :overlay-label="true" :items="deepClone(defaultItemsUnselect)" />

```html
<KSelect label="Name" placeholder="I'm labelled!" :overlay-label="true" :items="items" />
<KSelect label="Name" placeholder="I'm labelled!" :overlay-label="true" appearance="select" :items="items" />
<KSelect label="Disabled" disabled placeholder="I'm disabled!" :overlay-label="true" :items="items" />
<KSelect label="Readonly" readonly placeholder="I'm readonly!" :overlay-label="true" :items="items" />
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label) if using the `label` prop.

<div>
  <KSelect label="Name" :label-attributes="{
      help: 'I use the KLabel `help` prop',
      'data-testid': 'test'
    }"
    :items="defaultItemsUnselect"
  />
</div>

```html
<KSelect
  label="Name"
  :label-attributes="{
    help: 'I use the KLabel `help` prop',
    'data-testid': 'test'
  }"
  :items="items"
/>
```

### appearance

There are three styles of selects, `select` and `dropdown` (default) which are filterable, and lastly `button` which is not.

The `dropdown` appearance style has a selected item object. You can deselect the item by clicking the Clear icon.

<div>
  <KSelect :items="deepClone(defaultItems)" />
</div>

```html
<KSelect :items="items" />
```

The `select` style displays the selected item in the text box and also displays a chevron. To allow deselecting the item, you need to
set the `clearable` prop to `true`. See [clearable](#clearable) for an example.

<div>
  <KSelect appearance="select" :items="deepClone(defaultItems)" />
</div>

```html
<KSelect appearance="select" :items="items" />
```

The `button` style triggers the dropdown on click and you cannot filter the entries.

<div>
  <KSelect appearance="button" :items="deepClone(defaultItems)" />
</div>

```html
<KSelect appearance="button" :items="items" />
```

### clearable

The `clearable` prop is used to enable deselecting the selected item when `appearance` is `'select'`. Defaults to `false`.

<div>
  <KSelect appearance="select" :items="deepClone(defaultItems)" clearable />
</div>

```html
<KSelect appearance="select" :items="items" clearable />
```

### buttonText

You can configure the button text when an item is selected, if `appearance` is type `button`.

<div>
  <KSelect appearance="button" width="225" @selected="item => handleItemSelect(item)" :buttonText="`Show ${mySelect} per page`" :items="items" />
</div>

```html
<KSelect
  appearance="button"
  width="225"
  @selected="item => handleItemSelect(item)"
  :buttonText="`Show ${mySelect} per page`"
  :items="items"
/>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      mySelect: '',
      items: [{
        label: '25',
        value: '25'
      }, {
        label: '50',
        value: '50'
      }]
    }
  },
  methods: {
    handleItemSelect (item) {
      this.mySelect = item.label
    }
  }
})
</script>
```

### width

You can pass a `width` string for the dropdown. By default the `width` is `200px`. This is the width of the input, dropdown, and selected item.
Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

:::tip Note
Because we are controlling the widths of multiple elements, we recommend using this prop to control the width instead of explicitly adding classes or styles to the `KSelect` component.
:::

<div>
  <KSelect width="350" :items="deepClone(defaultItemsUnselect)"
  />
</div>

```html
<KSelect width="350" :items="items" />
```

### dropdownMaxHeight

You can pass a `dropdownMaxHeight` string for the dropdown. By default, the `dropdownMaxHeight` is `300px`. This is the maximum height of the `KSelect` dropdown when open. You can pass a number (will be converted to `px`), `auto`, percentages, or `vh` units.

<div>
  <KSelect width="250" :items="deepClone(defaultItemsLongList)" dropdown-max-height="150" />
</div>

```html
<KSelect width="250" :items="items" dropdown-max-height="150" />
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `true`. See [`KPop` docs](popover.html#positionfixed) for more information.

### enableFiltering

Use this prop to control whether or not the `KSelect` component with an `appearance` prop set to a value of `select` or `dropdown` allows filtering. By default, filtering is enabled for `dropdown` appearance and is disabled for `select` appearance.

`button` style `appearance` does not have filter support because it is a button.

<div>
  <KSelect :items="deepClone(defaultItemsUnselect)" :enable-filtering="false" class="mb-2" />
  <KSelect :items="deepClone(defaultItemsUnselect)" appearance="select" :enable-filtering="true" />
</div>

```html
<KSelect :items="items" :enable-filtering="false" />

<KSelect :items="items" appearance="select" :enable-filtering="true" />
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
For `autosuggest`, you are in charge of filtering the options, so `KSelect` won't filter them internally.
See [autosuggest](#autosuggest) for more details.
:::

### v-model

`KSelect` works as regular inputs do using v-model for data binding:

<div>
  <KLabel>Value:</KLabel> {{ myVal }}
  <KSelect v-model="myVal" :items="deepClone(defaultItems)" />
  <br>
  <KButton @click="clearIt">Clear</KButton>
</div>

```html
<div>
  <KLabel>Value:</KLabel> {{ myVal }}
  <KSelect v-model="myVal" :items="items" />
  <KButton @click="clearIt">Clear</KButton>
</div>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      myVal: 'cats',
    }
  },
  methods: {
    clearIt() {
      this.myVal = ''
    }
  }
})
</script>
```

### autosuggest

Add the `autosuggest` prop to trigger a query to an API with the filter keyword, and then update `items` asynchronously as suggestions as the user types.
Loading and empty state content can be configured using the `loading` and `empty` slots.

<KSelect autosuggest
  :items="itemsForAutosuggest"
  :loading="loading"
  width="300px"
  appearance="select"
  @query-change="onQueryChange"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.description }}</div>
  </template>
  <template v-slot:loading>
    <div>Loading...</div>
  </template>
  <template v-slot:empty>
    <div>No results found</div>
  </template>
</KSelect>

```vue
<KSelect
  autosuggest
  :items="items"
  :loading="loading"
  width="300px"
  appearance="select"
  @query-change="onQueryChange"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.label }}</div>
  </template>
  <template v-slot:loading>
    <div>Loading...</div>
  </template>
  <template v-slot:empty>
    <div>No results found</div>
  </template>
</KSelect>

<script>
const allItems = new Array(10).fill().map((_, i) => ({
  label: `Item ${i}`,
  description: `This is the description for item ${i}.`,
  value: `autosuggest-item-${i}`
}));
export default {
  data() {
    return {
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

:::tip Note
The `query-change` event triggers immediately when the user types in the input.
If you need to send API requests in the `query-change` event handler, you may want to implement a debounce function.
The following is an example:
:::

<KSelect autosuggest
  :items="itemsForDebouncedAutosuggest"
  :loading="loadingForDebounced"
  width="300px"
  appearance="select"
  @query-change="onQueryChangeForDebounced"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.label }}</div>
  </template>
</KSelect>

```vue
<KSelect
  autosuggest
  :items="items"
  :loading="loading"
  width="300px"
  appearance="select"
  @query-change="onQueryChange"
>
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.label }}</div>
  </template>
</KSelect>
<script>
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

### loading

When `autosuggest` is enabled, you can use the `loading` prop to show a loading indicator while fetching data from API.
By default, the loading indicator is a spinner icon, and you can implement your own indicator using the `loading` slot.
See [autosuggest](#autosuggest) for an example.

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<div>
  <KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
</div>

```html
<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```

## Slots

- `item-template` - The template for each item in the dropdown list
- `loading` - Slot for the loading indicator
- `empty` - Slot for the empty state in the dropdown list

### Item Template
You can use the `item-template` slot to customize the look and feel of your items. Use slots to gain access to the `item` data.

If you use the `.select-item-label` and `.select-item-desc` classes within the slot as shown in the example below, the dropdown items will inherit preconfigured styles for two-level select items which you're then free to customize.

<div>
  <KSelect :items="myItems" width="100%" :filterFunc="customFilter">
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.description }}</div>
    </template>
  </KSelect>
</div>

```html
<KSelect :items="myItems" width="100%" :filterFunc="customFilter">
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{ item.label }}</div>
    <div class="select-item-desc">{{ item.description }}</div>
  </template>
</KSelect>

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

### Loading

You can use the `loading` slot to customize the loading indicator. Note that this only applies when `autoggest` is `true`. See [autosuggest](#autosuggest) for an example of this slot.

### Empty State

You can use the `empty` slot to customize the look of the dropdown list when there is no options. See [autosuggest](#autosuggest) for an example of this slot.

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `selected` | `selectedItem` Object |
| `input` | `selectedItem` Object or null |
| `change` | `selectedItem` Object or null |
| `query-change` | `query` String |

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
      myItems: getItems(5),
      mySelect: '',
      myVal: 'cats',
      defaultItems: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs'
      }, {
        label: 'Bunnies',
        value: 'bunnies'
      }],
      defaultItemsWithDisabled: [{
        label: 'Cats',
        value: 'cats',
        selected: true
      }, {
        label: 'Dogs',
        value: 'dogs',
        disabled: true
      }, {
        label: 'Bunnies',
        value: 'bunnies'
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
      }],
      items: [{
        label: '25',
        value: '25'
      }, {
        label: '50',
        value: '50'
      }],
      defaultItemsForAutosuggest: [],
      itemsForAutosuggest: [],
      loading: false,
      defaultItemsForDebouncedAutosuggest: [],
      itemsForDebouncedAutosuggest: [],
      loadingForDebounced: true,
    }
  },
  methods: {
    handleItemSelect (item) {
      this.mySelect = item.label
    },
    clearIt () {
      this.myVal = ''
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
