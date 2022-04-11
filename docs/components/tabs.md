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

```vue
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

```vue
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

By default the `KTabs` will set the first tab in the array as active. You can override this by passing in the hash of any other tab to be used with v-model.

<KTabs v-model="defaultTab" :tabs="tabs">
  <template v-slot:tab1>
    <p>Tab 1 content</p>
  </template>
  <template v-slot:tab2>
    <p>Tab 2 content</p>
  </template>
</KTabs>

```vue
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

<KButton @click="defaultProgrammaticTab = '#tab1'" class="mr-2">Activate Tab 1</KButton>
<KButton @click="defaultProgrammaticTab = '#tab2'">Activate Tab 2</KButton>

```vue
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

## Slots

In order to actually see your tabbed content you must slot it using the tab hash property without the hash mark.

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

```vue
<template>
  <KTabs :tabs="tabs">
    <template v-slot:pictures>Wow look Pictures!</template>
    <template v-slot:movies>Wow look Movies!</template>
    <template v-slot:books>Wow look Books!</template>
  </KTabs>
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

## Usage

### Router Hash

`KTabs` emits a `changed` event with the new tab hash when clicked. You can use this to set the router or window hash and in turn use that with [v-model](#v-model).

```vue
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

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTabsBottomBorderColor`| Border between the tabs and the tab content
| `--KTabBottomBorderColor`| Border on the bottom of each tab
| `--KTabsActiveColor`| Active color of tab and underline
| `--KTabsColor`| Default text color of the tab items

\
An Example of changing the primary KButton variant to green instead of blue might
look like.
> Note: We are scoping the overrides to a wrapper in this example

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
    }
  }
}
</script>

<style lang="scss">
.KTabs-wrapper {
  --KTabsActiveColor: green;
}
</style>
