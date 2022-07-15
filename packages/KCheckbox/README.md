# @kongponents/kcheckbox

[![](https://img.shields.io/npm/v/@kongponents/kcheckbox.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/kcheckbox)

```html
<template>
  <KCheckbox
    v-model="checked"
    @change="handleToggle" />
</template>
<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleToggle(isChecked) {
      // do something, make api call?
    }
  }
}
</script>
```
