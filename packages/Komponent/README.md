# @kongponents/komponent

[![](https://img.shields.io/npm/v/@kongponents/komponent.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/komponent)

Expose reactive state to components.

```vue
<Komponent :data="{ count: 0 }" v-slot="{ data }">
  <div>
    <KButton @click="data.count = data.count - 1">-</KButton>
    {{ data.count }}
    <KButton @click="data.count = data.count + 1">+</KButton>
  </div>
</Komponent>
```
