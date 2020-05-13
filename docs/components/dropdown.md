# Dropdown

**KDropdown** is a dropdown component used to show actions or options in popout. This only uses CSS and is for simple use cases. For more dynamic use cases check out [KPop](/components/popover.html) 

<KDropdown
  toggle-text="Items"
  :items="['one', 'two', 'three']"/>

```vue
<KDropdown
  toggle-text="Items"
  :items="['one', 'two', 'three']"/>
```

## Props

### items - required
An array of items to show in the dropdown. Can be passed as strings or objects.

<Komponent :data="{ items: [{name: 'item1'}, {name: 'item2'}, {name:'item3'}] }" v-slot="{ data }">
  <KDropdown
    toggle-text="Items"
    :items="data.items" />
</Komponent>

```vue
<template>
  <KDropdown
    toggle-text="Items"
    :items="items"/>
  </template>
<script>
export default {
  data () {
    return {
      items: [
        {name: 'item1'},
        {name: 'item2'},
        {name:'item3'}
      ]
    }
  }
}
</script>
```

### Position
Sets the alignment of the dropdown panel - defaults to 'left'

- `left`
- `center`  
- `right`

<KCard>
  <template slot="body">
    <KDropdown
      toggle-text="Left"
      position="left"
      :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
    <KDropdown
      toggle-text="Center"
      position="center"
      class="ml-4"
      :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
    <KDropdown
      toggle-text="Right"
      position="right"
      class="ml-4"
      :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
  </template>
</KCard>

```vue
<KDropdown
  toggle-text="Left"
  position="left"
  :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
<KDropdown
  toggle-text="Center"
  position="center"
  :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
<KDropdown
  toggle-text="Right"
  position="right"
  :items="['dropdown item 1', 'dropdown item 2', 'dropdown item 3']"/>
```

## toggleText
Text shown in the dropdown button

<KDropdown
  toggle-text="Cool Dropdown Text"
  :items="['item 1', 'item 2', 'item 3']"/>

```vue
<KDropdown
  toggle-text="Cool Dropdown Text"
  :items="['item 1', 'item 2', 'item 3']"/>
</KDropdown>
```

## buttonAppearance
Sets if the appearance of the dropdown button. Uses 'Secondary' as default but can use any appearance of [KButton](/components/button.html#appearances)

<KCard>
  <template slot="body">
    <KDropdown
      buttonAppearance="primary"
      toggle-text="primary"
      :items="['item 1', 'item 2', 'item 3']"/>
    <KDropdown
      buttonAppearance="danger"
      toggle-text="danger"
      :items="['item 1', 'item 2', 'item 3']"/>
  </template>
</KCard>

```vue
<KDropdown
  buttonAppearance="primary"
  toggle-text="primary"
  :items="['item 1', 'item 2', 'item 3']"/>
<KDropdown
  buttonAppearance="danger"
  toggle-text="danger"
  :items="['item 1', 'item 2', 'item 3']"/>
```

### disabled
Sets the the dropdown button to disabled and prevents opening

<KDropdown
  toggle-text="disabled"
  disabled
  :items="['item 1', 'item 2', 'item 3']"/>

```vue
<KDropdown
  toggle-text="disabled"
  disabled
  :items="['item 1', 'item 2', 'item 3']"/>
```

## Selected
Optionally you can pass a 'selected' key for each item to highlight selected items. When using selected an emitter can be used to control when items have been selected/deselected. The emitter will pass back the clicked item as well as its index.

<KCard>
  <template slot="body">
    <div>
      <KDropdown
        :toggle-text="selectableToggleText"
        :items="selectableItems"
        @selected="handleSelect" />
    </div>
    <div class="mt-3">
      <pre class="language-javascript"><code>{{ selectableItems }}</code></pre>
    </div>
  </template>
</KCard>

```vue
<template>
  <KDropdown
    :toggle-text="selectableToggleText"
    :items="selectableItems"
    @selected="handleSelect" />
</template>
<script>
export default {
  data () {
    return {
      selectableItems: [
        { name: 'item 1', selected: false },
        { name: 'item 2', selected: true }
      ]
    }
  },
  computed: {
    selectableToggleText () {
      return this.selectableItems.filter(i => i.selected).length + ' selected'
    }
  },
  methods: {
    handleSelect(item, index) {
      this.selectableItems[index] = item
    }
  }
}
</script>
```

## Slots
Each item is also slotted by its value or name if passing in array of objects.

<Komponent :data="{items: ['column1', 'column2', 'column3']}" v-slot="{ data }">
  <template>
    <KDropdown
      toggle-text="Columns"
      :items="data.items">
        <template v-for="item in data.items" v-slot:[item]="{item}">
          <div>
            <input
              :id="`checkbox-${item}`"
              class="k-input"
              type="checkbox"
              :value="item"
              v-model="checkedItems" />
            <label :for="`checkbox-${item}`">{{item}}</label>
          </div>
        </template>
    </KDropdown>
  </template>
</Komponent>
<div class="mt-3">
  <pre class="language-javascript"><code>{{ checkedItems }}</code></pre>
</div>

```vue
<template>
  <KDropdown
    toggle-text="Columns"
    :items="['column1', 'column2', 'column3']">
    <template v-for="item in data.items" v-slot:[item]="{item}">
      <div>
        <input
          :id="`checkbox-${item}`"
          class="k-input"
          type="checkbox"
          :value="item"
          v-model="checkedItems" />
        <label :for="`checkbox-${item}`">{{item}}</label>
      </div>
    </template>
  </KDropdown>
</template>

<script>
export default {
  data () {
    return {
      checkedItems: ['column1']
    }
  }
}
</script>
```


<script>
export default {
  data () {
    return {
      checkedItems: [ 'column1' ],
      selectableItems: [
        { name: 'item 1', selected: false },
        { name: 'item 2', selected: true }
      ]
    }
  },
  computed: {
    selectableToggleText () {
      return this.selectableItems.filter(i => i.selected).length + ' selected'
    }
  },
   methods: {
    handleSelect(item, index) {
      this.selectableItems[index] = item
    }
  }
}
</script>
