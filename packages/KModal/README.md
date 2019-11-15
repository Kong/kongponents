# @kongponents/kmodal

[![](https://img.shields.io/npm/v/@kongponents/kmodal.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/kmodal)


```vue
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">
      Show Modal
    </KButton>
    <KModal
      :isVisible="isToggled"
      @proceed="toggle"
      @canceled="toggle" />
  </div>
</KToggle>
```
