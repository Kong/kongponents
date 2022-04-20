# Select

**Select** - Dropdown/Select component

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

```html
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

An array of items containing a `label` and `value`. May also specify that a certain item is `selected` by default.

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

```html
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

<KSelect label="Cool label" :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>

```html
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

```html
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

The `dropdown` appearance style has a selected item object. You can deselect the item by clicking the Clear icon.

<KSelect :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>

```html
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

The `select` style displays the selected item in the textbox and also displays a chevron. There is no way to clear the selection once it is made.

<KSelect appearance='select' :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>

```html
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

<KSelect appearance='button' :items="[{
    label: 'test',
    value: 'test'
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>

```html
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

<KSelect appearance='button' width="225" @selected="item => handleItemSelect(item)" :buttonText="`Show ${mySelect} per page`" :items="items" />

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

```html
<KSelect
  appearance='button'
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

You can pass a `width` string for dropdown. By default the `width` is `170px`. This is the width of the input, dropdown, and selected item.

<KSelect width="350" :items="[{
    label: 'test',
    value: 'test',
    selected: true
  }, {
    label: 'Test 1',
    value: 'test1'
  }]"
/>

```html
<KSelect width="350" :items="[{
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

Use fixed positioning of the popover to avoid content being clipped by parental boundaries - defaults to `true`. See [`KPop` docs](popover.html#positionfixed) for more information.

### v-model

KSelect works as regular inputs do using v-model for data binding:

<KComponent :data="{ myVal: 'test' }" v-slot="{ data }">
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
</KComponent>

```html
<KComponent :data="{myVal: 'test'}" v-slot="{ data }">
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
</KComponent>
```

## Attribute Binding

You can pass any input attribute and it will get properly bound to the element.

<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />

```vue
<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `selected` | `selectedItem` Object |
| `input` | `selectedItem` Object or null |
| `change` | `selectedItem` Object or null |
