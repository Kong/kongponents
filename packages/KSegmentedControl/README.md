# @kongponents/ksegmentedcontrol

[![](https://img.shields.io/npm/v/@kongponents/ksegmentedcontrol.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/ksegmentedcontrol)

```html
<template>
<KSegmentedControl
    :options="['one','two']"
    :v-model="selected"
    @click="handleToggle"
/>
</template>

<script>
export default {
  data() {
    return {
      selected: 'one'
    }
  },
  methods: {
    handleToggle(selected) {
      this.selected = selected
      // do something, make api call?
    }
  }
}
</script>
```
