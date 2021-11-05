# Menu


**KMenu** - Menu component

<script>
function getMenuItems(count) {
  let menuItems = []
  for (let i = 0; i < count; i++) {
    menuItems.push({
      title: "Item " + i,
      type: 'string',
      expandable: false,
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

## Props

### items

An array of items to populate the menu with. 

Properties:
  - `title` - menu item label 
  - `description` - text displayed when `expandable` item is expanded
  - `expandable` - boolean of whether or not this item is expandable
  - `type` - supported values: `string`, `number`, `divider`

> Note: `type='divider'` will insert an empty item that is just an `<hr>`.

<KMenu :items="getMenuItems(6)" />

```vue
function getMenuItems(count) {
  let menuItems = []
  for (let i = 0; i < count; i++) {
    menuItems.push({
      title: "Item " + i,
      type: 'string',
      expandable: false,
      description: "The item's description for number " + i
    })
  }
  return menuItems
}

<KMenu :items="getMenuItems(6)" />
```

### width
You can pass a `width` string for menu. By default the `width` is `284px`.

<KMenu :items="getMenuItems(3)" width="735" />

```
<KMenu :items="getMenuItems(3)" width="735" /> 
```

## KMenuItem
**KMenu** generates a **KMenuItem** for each item in the `items` property.

### Properties
- `item` - the menu item content is built from this.
  - Properties:
    - `title` - menu item label 
    - `description` - text displayed when `expandable` item is expanded
- `type` - supported values: `string`, `number`, `divider`
- `expandable` - boolean of whether or not this item is expandable
- `lastMenuItem` - boolean of whether or not this is the last item in the menu (for styling)

```vue
  <KMenuItem
    :item="{
      title: 'some title', 
      description: 'some description'
    }"
    :expandable="true"
    type="string" 
  />
```

### Slots
- `itemTitle` - the title content for the menu item
- `itemBody` - the body content for the menu item

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

## Slots
- `body` - The body of the menu, we expect this to be an array of `KMenuItem` components.
This should be used instead of the `items` property.
- `actionButton` - the button at the bottom of the menu

<KMenu>
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem>
      <template v-slot:itemTitle>
        Look mah!
      </template>
      <template v-slot:itemBody>
        <div>Cowabunga dude!</div>
      </template>
    </KMenuItem>
    <KMenuItem type="divider" />
    <KMenuItem :expandable="true" 
      :item="customItem" 
      type="string"
     />
    <KMenuItem :expandable="true" last-menu-item >
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
  <template v-slot:actionButton>
    <KButton>Clear all the filters</KButton>
  </template>
</KMenu>


```vue
<KMenu>
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem>
      <template v-slot:itemTitle>
        Look mah!
      </template>
      <template v-slot:itemBody>
        <div>Cowabunga dude!</div>
      </template>
    </KMenuItem>

    <KMenuItem type="divider" />
    
    <KMenuItem :expandable="true" 
      :item="customItem" 
      type="string"
     />
    <KMenuItem :expandable="true" last-menu-item>
      <template v-slot:itemTitle>
          <span>Updated</span>
      </template>
      <template v-slot:itemBody>
        <div>Vivamus blandit metus eu nisi venenatis, vel convallis neque mollis. In enim lectus, dignissim nec iaculis id, sodales quis nulla. Mauris pellentesque bibendum dui sed dictum.</div>
      </template>
    </KMenuItem>
  </template>
  <template v-slot:actionButton>
    <KButton>Clear all the filters</KButton>
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
