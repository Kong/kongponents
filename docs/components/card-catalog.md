# CardCatalog

**KCardCatalog** - A grid view of KCards

<script>
let items = []
for (let i = 0; i < 15; i++) {
  items.push({
    title: "Item " + i,
    description: "The item's description for number " + i
  })
}

export default {
  data () {
    return {
      items
    }
  }
}
</script>


<KCardCatalog :items="items" />
```vue
<KCardCatalog />
```

## Props
### Prop1
Description of prop1

Actual component using prop1
<KCardCatalog />

```vue
<KCardCatalog prop1="variation1" />
<KCardCatalog prop1="variation2" />
<KCardCatalog prop1="variation3" />
```

## Slots
- `default` - default slot description
- `slot1` - slot1 description

```vue
<KCardCatalog>
  here is some slot content
</KCardCatalog>
```

## Theming
| Variable | Purpose
|:-------- |:-------
| `--KCardCatalogBorderColor `| KCardCatalog border color


An Example of changing the border color of KCardCatalog to lime might look 
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KCardCatalog-wrapper">
    <KCardCatalog />
  </div>
</template>

```vue
<template>
  <div class="KCardCatalog-wrapper">
    <KCardCatalog />
  </div>
</template>

<style>
.KCardCatalog-wrapper {
  --KCardCatalog-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KCardCatalog-wrapper {
  --KCardCatalog-wrapperBorderColor: lime;
}
</style>
