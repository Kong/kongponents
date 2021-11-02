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
  title: "Sample Item",
  description: "Cras aliquet auctor ex ut hendrerit. Donec sagittis est nec aliquet semper. Quisque feugiat metus orci, at ullamcorper odio molestie non. Nam dignissim sed ligula ut commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac accumsan nunc. Praesent pulvinar felis nec nunc rutrum, eu malesuada augue tincidunt. Proin vel porttitor erat. Vestibulum consequat consequat ornare."

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

<KMenu :items="getMenuItems(3)" />

```vue
<KMenu :items="getMenuItems(3)" />
```

<KMenu title="I'm slotted baby!">
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem
      :item="customItem"
      class="catalog-item"
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


```vue
<KMenu title="I'm slotted baby!">
  <template v-slot:body>
    <KMenuItem
      v-for="item in getMenuItems(3)"
      :item="item"
    />
    <KMenuItem
      :item="customItem"
      class="catalog-item"
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
### Prop1
Description of prop1

## Slots
- `default` - default slot description
- `slot1` - slot1 description

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KMenuBorderColor `| KMenu border color


An Example of changing the border color of KMenu to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KMenu-wrapper">
    <KMenu />
  </div>
</template>

```vue
<template>
  <div class="KMenu-wrapper">
    <KMenu />
  </div>
</template>

<style>
.KMenu-wrapper {
  --KMenu-wrapperBorderColor: lime;
}
</style>
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
