# KToggle

Provide toggle functionality to components.

```vue
<KToggle>
  <template slot-scope="{isToggled, toggle}">
    <KButton @click="toggle">
      {{ isToggled ? 'toggled' : 'not toggled' }}
    </KButton>
  </template>
</KToggle>
```
