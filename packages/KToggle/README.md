# @kongponents/ktoggle

[![](https://img.shields.io/npm/v/@kongponents/ktoggle.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/ktoggle)

Provide toggle functionality to components.

```vue
<KToggle>
  <template v-slot:default="{isToggled, toggle}">
    <KButton @click="toggle">
      {{ isToggled ? 'toggled' : 'not toggled' }}
    </KButton>
  </template>
</KToggle>
```
