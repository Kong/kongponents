# Breadcrumbs

**Krumbs** is a breadcrumbs component that takes an array of route objects and generates a list of links. You can pass both [vue router](https://router.vuejs.org/) route objects or pass your own url.

<KCard>
  <template v-slot:body>
    <Krumbs :items="internalBreadcrumbItems" />
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
          to: { path: '/' },
          title: 'Go Home',
          text: 'Home'
        },
        {
          key: 'button',
          to: { path: '/components/breadcrumbs.html' },
          title: 'Go to Button',
          text: 'Breadcrumbs'
        }
      ]
    }
  }
}
</script>
```

## Props

### items

An array of Breadcrumb items

```html
<!--
 * @typedef {Object} Item - breacrumb item holding router-link properties
 * @property {RawLocation} to - router-link 'to' object or href string
 * @property {string} text - The anchor text displayed
 * @property {string} title - The anchor title shown when hovering the link
 * @property {string} [key] - An ID when the list is generated. Defaults to text if not set.
 * @property {string} [maxWidth] - maxWidth of item, overrides itemMaxWidth
 -->
<Krumbs :items="[{ key: 'home', to: { path: '/' }, title: 'Home', text: 'Home' }]" />
 ```

#### Breadcrumb link
The `to` property can be a Vue route or traditional URL. When using a URL though the target will be blank and a new window will open. In most scenarios you will build your breadcrumb items using your Vue application routes.

<KCard>
  <template v-slot:body>
    <Krumbs :items="externalBreadcrumbItems" />
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
          to: { path: '/' },
          title: 'Home',
          text: 'Home'
        },
        {
          key: 'google',
          to: 'https://google.com',
          title: 'Search at Google',
          text: 'Google'
        }
      ]
    }
  }
}
</script>
```

### itemMaxWidth

Maximum width of each breadcrumb item for truncating to ellipsis.

<KCard>
  <template v-slot:body>
    <Krumbs :items="longBreadcrumbs" item-max-width="16ch" />
  </template>
</KCard>

```vue
<Krumbs :items="longBreadcrumbs" item-max-width="16ch" />
```


<script>
export default {
  data () {
    return {
      internalBreadcrumbItems: [
        {
          key: 'home',
          to: { path: '/' },
          title: 'Go Home',
          text: 'Home'
        },
        {
          key: 'button',
          to: { path: '/components/breadcrumbs.html' },
          title: 'Go to Button',
          text: 'Breadcrumbs'
        }
      ],
      externalBreadcrumbItems: [
        {
          key: 'home',
          to: { path: '/' },
          title: 'Go Home',
          text: 'Home'
        },
        {
          key: 'google',
          to: 'https://google.com',
          title: 'Search over at Google',
          text: 'Google'
        }
      ],
      longBreadcrumbs: [
        {
          to: { path: '/' },
          title: 'Overview',
          text: 'Overview'
        },
        {
          to: { path: '/' },
          title: 'Services',
          text: 'Services'
        },
        {
          to: { path: '/' },
          title: 'Go Home',
          text: 'f67a3ead-dfb9-4ef9-8cda-6646bc4db950'
        }
      ]
    }
  }
}
</script>

