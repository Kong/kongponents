# @kongponents/kinlineedit

[![](https://img.shields.io/npm/v/@kongponents/kinlineedit.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/kinlineedit)

```vue
<template>
  <EditableInput @changed="val => textVal = val">
    <h1>{{ textVal }}</h1>
  </EditableInput>
</template>
<script>
import EditableInput from "@/components/EditableInput";
export default {
  name: "App",
  components: { EditableInput },
  data() {
    return {
      textVal: "Inline Text"
    };
  }
};
</script>
```
