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

<KSelect label="Cool label" :items="[{ 
    label: 'test', 
    value: 'test',
    selected: true
  }, { 
    label: 'Test 1', 
    value: 'test1' 
  }]" 
/>

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

### appearance
There are two styles of selects, `select` and `dropdown` (default).

The `dropdown` appearance style has a selected item object. You can deselect the item by clicking
the Clear icon.

<KSelect :items="[{ 
    label: 'test', 
    value: 'test',
    selected: true
  }, { 
    label: 'Test 1', 
    value: 'test1'
  }]" 
/>

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

<KSelect appearance='select' :items="[{ 
    label: 'test', 
    value: 'test',
    selected: true
  }, { 
    label: 'Test 1', 
    value: 'test1'
  }]" 
/>

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

### width
You can pass a `width` string for dropdown. By default the `width` is `170px`. This is the width
of the input, dropdown, and selected item.

<KSelect width="100" :items="[{ 
    label: 'test', 
    value: 'test',
    selected: true
  }, { 
    label: 'Test 1', 
    value: 'test1'
  }]" 
/>

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

## Attribute Binding
You can pass any input attribute and it will get properly bound to the element.

<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />

```vue
<KSelect disabled placeholder="type something" :items="[{ label: 'test', value: 'test' }]" />
```
