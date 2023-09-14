# Tabs

**KTabs** - A mindblowing tabs component

<KTabs :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

```html
<KTabs :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const tabs = [
      {
        hash: '#tab1',
        title: 'Tab 1'
      },
      {
        hash: '#tab2',
        title: 'Tab 2'
      }
    ]

    return {
      tabs,
    }
  }
})
</script>
```

## Props

### tabs

`KTabs` has one **required** prop, `tabs`, which is an array of tab objects with the following interface:

```ts
export interface Tab {
  hash: string
  title: string
}
```

```html
<template>
  <KTabs :tabs="tabs" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const tabs = [
      { hash: '#pictures', title: 'Pictures' },
      { hash: '#movies', title: 'Movies' },
      { hash: '#books', title: 'Books' },
    ]

    return {
      tabs,
    }
  }
})
</script>
```

### v-model

By default the `KTabs` will set the first tab in the array as active. You can override this by passing in the hash of any other tab to be used with `v-model`.

<KTabs v-model="defaultTab" :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

```html
<KTabs v-model="#tab2" :tabs="tabs">
  <template v-slot:tab1>Tab 1 content</template>
  <template v-slot:tab2>Tab 2 content</template>
</KTabs>
```

If you want to keep your `v-model` in sync so that you can programatically change the active tab after initialization, you also must respond to the `@changed` emitted event.

<KTabs v-model="defaultProgrammaticTab" :tabs="tabs" @changed="hash => defaultProgrammaticTab = hash">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

<hr />

<KButton @click="defaultProgrammaticTab = '#tab1'" class="horizontal-spacing">Activate Tab 1</KButton>
<KButton @click="defaultProgrammaticTab = '#tab2'">Activate Tab 2</KButton>

```html
<KTabs v-model="defaultTab" :tabs="tabs" @changed="hash => defaultTab = hash">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

<KButton @click="defaultTab = '#tab1'">Activate Tab 1</KButton>
<KButton @click="defaultTab = '#tab2'">Activate Tab 2</KButton>
```

### hasPanels

A `boolean` that determines whether all tabs should have corresponding "panel" (the tab content) containers. Defaults to `true`.

In some scenarios, you may want to implement the KTabs UI controls without utilizing the corresponding panel containers.

For example, you could set the `hasPanels` prop to `false` and then your host app could provide custom functionality such as navigating to a different page or `router-view` on click.

Here's an example where we display the active tab hash:

<KTabs :tabs="slottedTabs" :has-panels="false" @changed="hasPanelsChanged" />
<p>Active hash: {{ hasPanelsActiveHash }} </p>

```html
<template>
  <KTabs :tabs="tabs" :has-panels="false" @changed="tabChanged" />
  <p>Active hash: {{ activeTabHash }} </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]

const activeTabHash = ref<string>(tabs.value[0].hash)

const tabChanged = (hash: string) => {
  activeTabHash.value = hash
}
</script>
```

#### Dynamic RouterView

Here's an example (code only) of utlizing a dynamic `router-view` component within the host app:

```html
<KTabs
  :has-panels="false"
  :tabs="tabs"
>
  <template
    v-for="tab in tabs"
    :key="`${tab.hash}-anchor`"
    #[`${tab.hash}-anchor`]
  >
    <router-link
      :to="{
        name: tab.hash.split('?').shift(),
        hash: `#${tab.hash.split('?').pop()}`,
      }"
    >
      {{ tab.title }}
    </router-link>
  </template>
</KTabs>
<router-view
  v-slot="{ route }"
>
  <h3>Router View content</h3>
  <p>{{ route.path }}{{ route.hash }}</p>
</router-view>
```

## Slots

### Anchor Content

The tab control defaults to the `tab.title` string. You may use the `#{tab.hash}-anchor` slot to customize the content of the tab control.

<KTabs :tabs="slottedTabs">
  <template #pictures-anchor>
    Custom Pictures Tab
  </template>
  <template #pictures><p>Wow look <b>Pictures!</b></p></template>
  <template #movies-anchor>
    I love movies
  </template>
  <template #movies><p>Wow look <b>Movies!</b></p></template>
  <template #books-anchor>
    Need a book?
  </template>
  <template #books><p>Wow look <b>Books!</b></p></template>
</KTabs>

```html
<template>
  <KTabs :tabs="tabs">
    <template #pictures-anchor>
      Custom Pictures Tab
    </template>
    <template #pictures><p>Wow look <b>Pictures!</b></p></template>
    <template #movies-anchor>
      I love movies
    </template>
    <template #movies><p>Wow look <b>Movies!</b></p></template>
    <template #books-anchor>
      Need a book?
    </template>
    <template #books><p>Wow look <b>Books!</b></p></template>
  </KTabs>
</template>

<script setup lang="ts">
const tabs = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]
</script>
```

### Panel Content

In order provide the tab panel content (when the `hasPanels` prop is set to `true`) you must slot the content in the named slot, defined by the `tab.hash` string, without the `#`.

<KTabs :tabs="slottedTabs">
  <template #pictures><p>Wow look <b>Pictures!</b></p></template>
  <template #movies><p>Wow look <b>Movies!</b></p></template>
  <template #books><p>Wow look <b>Books!</b></p></template>
</KTabs>

```html
<template>
  <KTabs :tabs="tabs">
    <template #pictures><p>Wow look <b>Pictures!</b></p></template>
    <template #movies><p>Wow look <b>Movies!</b></p></template>
    <template #books><p>Wow look <b>Books!</b></p></template>
  </KTabs>
</template>

<script setup lang="ts">
const tabs = [
  { hash: '#pictures', title: 'Pictures' },
  { hash: '#movies', title: 'Movies' },
  { hash: '#books', title: 'Books' },
]
</script>
```

## Events

- `@changed` - Emitted when the active tab is updated, and includes the new active `hash` value

## Usage

### Router Hash

`KTabs` emits a `changed` event with the new tab hash when clicked. You can use this to set the router or window hash and in turn use that with [`v-model`](#v-model).

```html
<template>
  <KTabs
    :tabs="tabs"
    v-model="$route.hash"
    @changed="hash => $router.replace({hash})">
    <template v-slot:pictures>Wow look Pictures!</template>
    <template v-slot:movies>Wow look Movies!</template>
    <template v-slot:books>Wow look Books!</template>
  </KTabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// Importing $route and $router in your app may vary and is excluded in this example.

export default defineComponent({
  setup () {
    const tabs = [
      { hash: '#pictures', title: 'Pictures' },
      { hash: '#movies', title: 'Movies' },
      { hash: '#books', title: 'Books' },
    ]

    return {
      tabs,
    }
  }
})
</script>
```

<script>
export default {
  data() {
    return {
      defaultTab: '#tab2',
      defaultProgrammaticTab: '#tab2',
      tabs: [
        {
          hash: '#tab1',
          title: 'Tab 1'
        },
        {
          hash: '#tab2',
          title: 'Tab 2'
        }
      ],
      slottedTabs: [
        { hash: '#pictures', title: 'Pictures' },
        { hash: '#movies', title: 'Movies' },
        { hash: '#books', title: 'Books' },
      ],
      hasPanelsActiveHash: '#pictures'
    }
  },
  methods: {
    hasPanelsChanged(hash) {
      this.hasPanelsActiveHash = hash
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal-spacing {
  margin-right: $kui-space-40;
}
</style>
