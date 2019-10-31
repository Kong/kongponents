# Breadcrumbs

**Krumbs** is a breadcrumbs component that takes an array of route objects and generates a list of links. You can pass both [vue router](https://router.vuejs.org/) route objects or pass your own url.

<KCard>
  <template v-slot:body>
    <Krumbs :items="breadcrumbItems" />
  </template>
</KCard>

```vue
<template>
  <Krumbs :items="breadcrumbItems" />
</template>
<script>
export default {
  data () {
    return {
      breadcrumbItems: [
        {
          key: 'home',
          to: '/',
          title: 'Go Home',
          text: 'Home'
        },
        {
          key: 'breadcrumbs',
          to: '/components/breadcrumbs.html',
          title: 'Go to Krumbs',
          text: 'Breadcrumbs'
        }
      ]
    }
  }
}
</script>
```

## Usage
### Breadcrumb object
A breadcrumb object is comprised of 4 key properties
- `key` An ID when the list is generated
- `to` An external URL or a Vue Route object
- `title` The anchor title shown when hovering the link
- `text` The anchor text displayed

### Breadcrumb link
The `to` property can be a Vue route or traditional URL. When using a URL though the target will be blank and a new window will open. In most scenarios you will build your breadcrumb items using your Vue application routes.

```vue
<script>
export default {
  data () {
    return {
      breadcrumbItems: [
        {
          key: 'root-services',
          to: { name: 'services', params: {}, path: '/services/' },
          title: 'Services',
          text: 'Services'
        },
        {
          key: 'view-services',
          to: { name: 'view-service', params: { id }, path: '/services/:id' },
          title: 'Service 123',
          text: 'Service 123'
        }
      ]
    }
  }
}
</script>
```

<script>
export default {
  data () {
    return {
      breadcrumbItems: [
        {
          key: 'home',
          to: '/',
          title: 'Go Home',
          text: 'Home'
        },
        {
          key: 'breadcrumbs',
          to: '/components/breadcrumbs.html',
          title: 'Go to Krumbs',
          text: 'Breadcrumbs'
        }
      ]
    }
  }
}
</script>
