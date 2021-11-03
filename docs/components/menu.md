# Menu


**KMenu** - Menu component

<script>
function getMenuItems(count) {
  let menuItems = []
  for (let i = 0; i < count; i++) {
    menuItems.push({
      title: "Item " + i,
      type: Math.random() < 0.5 ? 'string' : 'number',
      expandable: Math.random() < 0.5 ? true : false,
      description: "The item's description for number " + i
    })
  }
  return menuItems
}
const customItem = {
  title: "Item #",
  description: "Cras aliquet auctor ex ut hendrerit. Donec sagittis est nec aliquet semper. Quisque feugiat metus orci, at ullamcorper odio molestie non. Nam dignissim sed ligula ut commodo."
}

export default {
  data () {
    return {
      getMenuItems,
      customItem
    }
  }
}
</script>

<KMenu :items="getMenuItems(5)" />

```vue
<KMenu :items="items" />
```

<KMenu>
  <template v-slot:body>
    <KMenuItem
      :item="customItem"
    />
    <KMenuItem
      :item="customItem"
      :expandable="true"
    />
    <KMenuItem
      :item="customItem"
      :expandable="true"
    />
    <KMenuItem :expandable="true" :item="customItem" />
    <KMenuItem :expandable="true" type="divider"  >
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
  <template v-slot:actionButton>
    <KButton>Clear all sorting and filters</KButton>
  </template>
</KMenu>


```vue
<KMenu>
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem
      :item="customItem"
      :expandable="true"
      type="divider" 
    />
    <KMenuItem :expandable="true" :item="customItem" type="divider" />
    <KMenuItem :expandable="true" >
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
</KMenu>
```
## Props

items
The content of the menu item. Expects a `title`, `type(string,number,divider)`, `expandable` and a `description`.

> Note: `type='divider'` adds a full width horizontal line between the menu items.


<KMenu :items="getMenuItems(6)" />
```vue
function getMenuItems(count) {
  let menuItems = []
  for (let i = 0; i < count; i++) {
    menuItems.push({
      title: "Item " + i,
      type: Math.random() < 0.5 ? 'string' : 'number',
      expandable: Math.random() < 0.5 ? true : false,
      description: "The item's description for number " + i
    })
  }
  return menuItems
}

<KMenu :items="getMenuItems(6)" />
```

## KMenuItem
**KMenu** generates a **KMenuItem** for each item in the `items` property.

### Properties
- `item` - the menu item content is built from this, it expects a `title`, optionally a `description`, `type`, and `expandable` (sets whether the menu item would have an icon on the right or not, and is clickable or not).
  ```json
  { title: 'some title', 
    description: 'some description', 
    type: 'string', 
    expandable: false }
  ```

```vue
  <KMenuItem
    :item="customItem"
    :expandable="true"
    type="divider" 
  />
```

### Slots
- `itemTitle` - the title content for the menu item
- `itemBody` - the body content for the menu item
- `actionButton` - the button at the bottom of the menu

```vue
<KMenuItem>       
  <template v-slot:itemTitle>
    Custom Title!
  </template>
  <template v-slot:itemBody>
    Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus.
  </template>
</KMenuItem>
```

<KMenu :items="getMenuItems(3)">
  <template v-slot:actionButton>
    <KButton>Clear all the filters</KButton>
  </template>
</KMenu>  

```vue
<KMenu :items="getMenuItems(3)">
  <template v-slot:actionButton>
    <KButton>Clear all the filters</KButton>
  </template>
</KMenu> 
```

## Slots
- `body` - The body of the menu, we expect this to be an array of `KMenuItem` components.
This should be used instead of the `items` property.

<KMenu>
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem
      :item="customItem"
      :expandable="true"
      type="divider" 
    />
    <KMenuItem :expandable="true" 
      :item="customItem" 
      type="divider" />
    <KMenuItem :expandable="true" >
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
</KMenu>


```vue
<KMenu>
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem
      :item="customItem"
      :expandable="true"
      type="divider" 
    />
    <KMenuItem :expandable="true" :item="customItem" type="divider" />
    <KMenuItem :expandable="true" >
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
</KMenu>
```

<style lang="scss">
.KMenu-wrapper {
  --KMenu-wrapperBorderColor: lime;
}

div.menu-content div {
  white-space: normal;
  margin-right: 22px;
  text-align: justify;
}
</style>
