---
sidebarDepth: 0
---
# Tabs

**KTabs** - A mindblowing tabs component
<ClientOnly>
  <KTabs :tabs="tabs">
    <template v-slot:tab1>
      <p>Tab 1 content</p>
    </template>
    <template v-slot:tab2>
      <p>Tab 2 content</p>
    </template>
  </KTabs>
</ClientOnly>

```vue
<KTabs :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          hash: '#tab1',
          title: 'TAB 1'
        },
        {
          hash: '#tab2',
          title: 'TAB 2'
        }
      ]
    }
  }
}
</script>
```

## Props
### tabs
KTabs takes one required prop which is an array of tab objects.

- `tabs`
- `@change` - Emitted when a tab is changed

```vue
<template>
  <KTabs :tabs="tabs" />
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        { hash: '#pictures', title: 'Pictures' },
        { hash: '#movies', title: 'Movies' },
        { hash: '#books', title: 'Books' },
      ]
    }
  }
}
</script>
```

### default-tab
By default the tabs will set the first tab in the array as active. You can override this by passing in the hash of any other tab to be used instead.
<ClientOnly>
  <KTabs
    default-tab="#tab2"
    :tabs="tabs">
    <template v-slot:tab1>
      <p>Tab 1 content</p>
    </template>
    <template v-slot:tab2>
      <p>Tab 2 content</p>
    </template>
  </KTabs>
</ClientOnly>

```vue
<KTabs
  default-tab-hash="#tab2"
  :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>
```

## Slots
In order to actually see your tabbed content you must slot it using the tab hash property without the hash mark.

<ClientOnly>
  <KTabs :tabs="slottedTabs">
    <template v-slot:pictures>
      <p>Wow look Pictures!</p>
    </template>
    <template v-slot:movies>
      <p>Wow look Movies!</p>
    </template>
    <template v-slot:books>
      <p>Wow look Books!</p>
    </template>
  </KTabs>
</ClientOnly>

```vue
<template>
  <KTabs :tabs="tabs">
    <template v-slot:pictures>Wow look Pictures!</template>
    <template v-slot:movies>Wow look Movies!</template>
    <template v-slot:books>Wow look Books!</template>
  </KTabs>
</template>
<script>
export default {
  data ) {
    return {
      tabs: [
        { hash: '#pictures', title: 'Pictures' },
        { hash: '#movies', title: 'Movies' },
        { hash: '#books', title: 'Books' },
      ]
    }
  }
}
</script>
```

## Usage
### Window Hash
KTabs emits a `changed` event with the new tab hash when clicked. You can use this to set the window hash as well as the [default-tab](#default-tab) prop.

*Try refreshing the page after clicking a tab below*

<ClientOnly>
  <KTabs
    :tabs="slottedTabs"
    :default-tab="activeTab"
    @changed="handleChange">
    <template v-slot:pictures>
      <p>Wow look Pictures!</p>
    </template>
    <template v-slot:movies>
      <p>Wow look Movies!</p>
    </template>
    <template v-slot:books>
      <p>Wow look Books!</p>
    </template>
  </KTabs>
</ClientOnly>

```vue
<template>
  <KTabs
    :tabs="tabs"
    :default-tab="activeTab"
    @changed="handleChange">
    <template v-slot:pictures>Wow look Pictures!</template>
    <template v-slot:movies>Wow look Movies!</template>
    <template v-slot:books>Wow look Books!</template>
  </KTabs>
</template>
<script>
export default {
  data ) {
    return {
      tabs: [
        { hash: '#pictures', title: 'Pictures' },
        { hash: '#movies', title: 'Movies' },
        { hash: '#books', title: 'Books' },
      ]
    }
  },
  computed: {
    activeTab () {
      return window.location.hash
    }
  }
  methods: {
    handleChange(newHash) {
      window.location.hash = newHash
    }
  }
}
</script>
```


## Theming
| Variable | Purpose
|:-------- |:-------
| `--KTabsBottomBorder `| Border between the tabs items and the tab content
| `--KTabsActiveColor`| Active color of tab and underline
| `--KTabsColor`| Default text color of the tab items

\
An Example of changing the primary KButton variant to green instead of blue might
look like.  
> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KTabs-wrapper">
    <ClientOnly>
      <KTabs :tabs="tabs">
        <template v-slot:tab1>
          <p>Tab 1 content</p>
        </template>
        <template v-slot:tab2>
          <p>Tab 2 content</p>
        </template>
      </KTabs>
    </ClientOnly>
  </div>
</template>

```vue
<template>
  <div class="KTabs-wrapper">
    <KTabs :tabs="tabs">
      <template v-slot:tab1>
        <p>Tab 1 content</p>
      </template>
      <template v-slot:tab2>
        <p>Tab 2 content</p>
      </template>
    </KTabs>
  </div>
</template>

<style>
.KTabs-wrapper {
  --KTabsActiveColor: green;
}
</style>
```

<script>
export default {
  data() {
    return {
      isSSR: false,
      tabs: [
        {
          hash: '#tab1',
          title: 'TAB 1'
        },
        {
          hash: '#tab2',
          title: 'TAB 2'
        }
      ],
      slottedTabs: [
        { hash: '#pictures', title: 'Pictures' },
        { hash: '#movies', title: 'Movies' },
        { hash: '#books', title: 'Books' },
      ],
    }
  },
  computed: {
    activeTab () {
      return this.isSSR && window.location.hash
    }
  },
  mounted () {
    this.isSSR = true
  },
  methods: {
    handleChange(newHash) {
      window.location.hash = newHash
    }
  }
}
</script>

<style lang="scss">
.KTabs-wrapper {
  --KTabsActiveColor: green;
}
</style>
