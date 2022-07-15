# Select

**Select** - Dropdown/Select component
<div>
  <KSelect label="Pick Something:" :items="[{
      label: 'test',
      value: 'test'
    }, {
      label: 'Test 1',
      value: 'test1'
    }, {
      label: 'TEST 2',
      value: 'test2'
    }]"
  />
</div>

```vue
<KSelect label="Pick Something:" :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }, {
    label: 'TEST 2',
    value: 'test2'
  }]"
/>
```

## Props

### items

An array of items containing a `label` and `value`. May also specify that a certain item is `selected`
by default.

<div>
  <KSelect :items="[{
      label: 'test me because I am a super long option with text that wraps',
      value: 'test',
      selected: true
    }, {
      label: 'Test 1',
      value: 'test1'
    }, {
      label: 'TEST 2',
      value: 'test2'
    }]"
  />
</div>

```vue
<KSelect :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }, {
    label: 'TEST 2',
    value: 'test2'
  }]"
/>
```

### label

The label for the select.

<div>
  <KSelect label="Cool label" :items="[{
      label: 'test',
      value: 'test',
      selected: true
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect label="Cool label" :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

### labelAttributes

Use the `labelAttributes` prop to configure the **KLabel's** [props](/components/label.html) if using the `label` prop.

<div>
  <KSelect label="Name" :label-attributes="{
      help: 'I use the KLabel `help` prop',
      'data-testid': 'test'
    }"
    :items="[{
      label: 'test',
      value: 'test'
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect
  label="Name"
  :label-attributes="{
    help: 'I use the KLabel `help` prop',
    'data-testid': 'test'
  }"
  :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

### appearance

There are three styles of selects, `select` and `dropdown` (default) which are filterable, and lastly `button` which is not.

The `dropdown` appearance style has a selected item object. You can deselect the item by clicking
the Clear icon.

<div>
  <KSelect :items="[{
      label: 'test',
      value: 'test',
      selected: true
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

The `select` style displays the selected item in the textbox and also displays a chevron. There is no
way to clear the selection once it is made.

<div>
  <KSelect appearance='select' :items="[{
      label: 'test',
      value: 'test',
      selected: true
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect appearance='select' :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

The `button` style triggers the dropdown on click and you cannot filter the entries.

<div>
  <KSelect appearance='button' :items="[{
      label: 'test',
      value: 'test'
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect appearance='button' :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

### buttonText

You can configure the button text when an item is selected, if `appearance` is type `button`.

<div>
  <KSelect appearance='button' width="225" @selected="item => handleItemSelect(item)" :buttonText="`Show ${mySelect} per page`" :items="items" />
</div>

```vue
<KSelect
  appearance='button'
  width="225"
  @selected="item => handleItemSelect(item)"
  :buttonText="`Show ${mySelect} per page`"
  :items="items"
/>

<script>
export default {
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
}
</script>
```

### width

You can pass a `width` string for dropdown. By default the `width` is `200px`. This is the width
of the input, dropdown, and selected item. Currently we support numbers (will be converted to `px`), `auto`, and percentages for width.

:::tip Note
Because we are controlling the widths of multiple elements, we recommend using this prop to control the width instead of explicitly adding classes or styles to the `KSelect` component.
:::

<div>
  <KSelect width="250" :items="[{
      label: 'test',
      value: 'test',
      selected: true
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
  />
</div>

```vue
<KSelect width="100" :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>
```

### positionFixed

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `false`. See [`KPop` docs](popover.html#positionfixed) for more information.

### enableFiltering

Use this prop to control whether or not the `KSelect` component with an `appearance` prop set to a value of `select` or `dropdown` allows filtering. By default, filtering is enabled for `dropdown` appearance and is disabled for `select` appearance. `button` style `appearance` does not have filter support because it is a button.

<div>
  <KSelect :items="[{
      label: 'test',
      value: 'test'
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
    :enable-filtering="false"
    class="mb-2"
  />

  <KSelect :items="[{
      label: 'test',
      value: 'test'
    }, {
      label: 'Test 1',
      value: 'test1'
    }]"
    appearance="select"
    :enable-filtering="true"
  />
</div>

```html
<KSelect :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
  :enable-filtering="false"
/>

<KSelect :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
  appearance="select"
  :enable-filtering="true"
/>
```

### filterFunc

Use this prop to override the default filter function if you want to do something like filter on an attribute other than `label`. Your filter function
should take as parameter a JSON object containing the items to filter on (`items`) and the query string (`query`) and return the filtered items. See [Slots](#slots) for an example.

```js
myCustomFilter ({ items, query }) {
  return items.filter(anItem => anItem.label.includes(query))
}
```

### v-model

KSelect works as regular inputs do using v-model for data binding:

<Komponent :data="{myVal: 'test'}" v-slot="{ data }">
  <div>
    <KLabel>Value:</KLabel> {{ data.myVal }}
    <KSelect v-model="data.myVal" :items="[{
        label: 'test',
        value: 'test'
      }, {
        label: 'Test 1',
        value: 'test1'
      }]"
    />
  </div>
</Komponent>

```vue
<Komponent :data="{myVal: 'test'}" v-slot="{ data }">
  <div>
    <KLabel>Value:</KLabel> {{ data.myVal }}
    <KSelect v-model="data.myVal" :items="[{
        label: 'test',
        value: 'test'
      }, {
        label: 'Test 1',
        value: 'test1'
      }]"
    />
  </div>
</Komponent>
```

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<div>
  <KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
</div>

```vue
<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```

## Slots

You can use the `item-template` slot to customize the look and feel of your items. Use slots to gain access to the `item` data.

If you use the `select-item-label` and `select-item-desc` classes within the slot as shown in the example below, the dropdown items will inherit preconfigured styles for two-level select items which you're then free to customize.

<div>
  <KSelect appearance='select' :items="myItems" width="100%" :filterFunc="customFilter">
    <template v-slot:item-template="{ item }">
      <div class="select-item-label">{{ item.label }}</div>
      <div class="select-item-desc">{{ item.description }}</div>
    </template>
  </KSelect>
</div>

```html
<KSelect appearance='select' :items="myItems" width="100%" :filterFunc="customFilter">
  <template v-slot:item-template="{ item }">
    <div class="select-item-label">{{item.label}}</div>
    <div class="select-item-desc">{{item.description}}</div>
  </template>
</KSelect>

<script>
export default {
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
            label: "Item " + i,
            value: "item_" + i,
            description: "The item's description for number " + i
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
}
</script>
```

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `selected` | `selectedItem` Object |
| `input` | `selectedItem` Object or null |
| `change` | `selectedItem` Object or null |

<script>
function getItems(count) {
  let myItems = []
    for (let i = 0; i < count; i++) {
      myItems.push({
        label: "Item " + i,
        value: "item_" + i,
        description: "The item's description for number " + i
      })
    }
  return myItems
}

export default {
  data() {
    return {
      myItems: getItems(5),
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
    },
    customFilter ({items, query}) {
      return items.filter(item => item.label.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()))
    }
  }
}
</script>
