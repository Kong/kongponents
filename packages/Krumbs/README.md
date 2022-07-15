# @kongponents/krumbs

[![](https://img.shields.io/npm/v/@kongponents/krumbs.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/krumbs)

```html
<template>
  <Krumbs :items="routes" />
</template>

<script>
export default {
  data: function () {
    return {
      routes: [
        {
          key: 'root-services',
          to: { name: 'services', params: {}, path: '/services/' },
          title: 'Services',
          text: 'Services'
        },
        {
          key: 'docs',
          to: 'https://docs.konghq.com',
          title: 'Go to Kong Docs',
          text: 'External Link'
        }
      ]
    }
  }
}
</script>
```
