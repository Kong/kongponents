# @kongponents/ktabs

[![](https://img.shields.io/npm/v/@kongponents/ktabs.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/ktabs)

```vue
<template>
  <KTabs :tabs="tabs">
    <template v-slot:tab1>
      <span>Tab 1 content</span>
    </template>
    <template v-slot:tab2>
      <span>Tab 2 content</span>
    </template>
  </KTabs>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          hash: '#tab1', 
          title: 'tab1'
        },
        {
          hash: '#tab2',
          title: 'tab2
        }
      ]
    }
  }
}
</script>
```
