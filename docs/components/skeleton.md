# Skeleton

KSkeleton is used as a placeholder component while the primary content is still loading.

## Props

### type

There are 7 different types of loading states that KSkeleton supports: `card`, `table`, `form`, `spinner`, `fullscreen-kong`, `fullscreen-generic`, and a generic loading state. Defaults to a generic loading state. The following example shows a `form` type KSKeleton.

<KSkeleton type="form" />

```html
<KSkeleton type="form" />
```

### delayMilliseconds

The number of milliseconds to wait before showing the skeleton state. Defaults to `0`.

<KComponent :data="{ isLoading: false }" v-slot="{ data }">
  <div class="vertical-spacing-container">
    <KInputSwitch v-model="data.isLoading" label="Loading" />
    <div v-if="!data.isLoading">
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
    </div>
    <KSkeleton v-else="data.isLoading" delay-milliseconds="200" />
  </div>
</KComponent>

```html
<KComponent :data="{ isLoading: false }" v-slot="{ data }">
  <KInputSwitch v-model="data.isLoading" label="Loading" />
  <div v-if="!data.isLoading">
    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
  </div>
  <KSkeleton v-else="data.isLoading" delay-milliseconds="200" />
</KComponent>
```

## Generic Loading State

By default, KSkeleton will load a generic loading state. There are no props for this state.

<KSkeleton />

```html
<KSkeleton />
```

## Card Loading State

This loading state is using for card type components, like [KCard](/components/card) or similar.

<KSkeleton type="card" />

```html
<KSkeleton type="card" />
```

### cardCount

Used for displaying the number of cards in this loading state. Defaults to 1. The following example shows 3 cards.

<KSkeleton :card-count="2" type="card" />

```html
<KSkeleton :card-count="2" type="card" />
```

### maxWidth

Prop to specify width of each card. If not specified, KSkeleton will try to size them automatically in order to fit a maximum of 3 cards in a row without wrapping. If `cardCount` is `1` (or not specified) the maximum width a card will span is `470px`.

<KSkeleton max-width="100%" type="card" />

```html
<KSkeleton max-width="100%" type="card" />
```

## Form Loading State

This loading state is used for form type components. There are no props for this state.

<KSkeleton type="form" />

```html
<KSkeleton type="form" />
```

## Table Loading State

This loading state is used for table type components.

<KSkeleton type="table" />

```html
<KSkeleton type="table" />
```

### tableRows

Used for displaying the number of rows in this loading state. Defaults to 6. The following example shows 3 rows.

<KSkeleton type="table" :table-rows="3" />

```html
<KSkeleton type="table" :table-rows="3" />
```

### tableColumns

Used for displaying the number of columns in this loading state. Defaults to 6. The following example shows 3 columns.

<KSkeleton type="table" :table-columns="3" />

```html
<KSkeleton type="table" :table-columns="3" />
```

## Spinner Loading State

This loading state is used for a spinner, which can be used for a wide variety of situations. There are no props for this state.

<KSkeleton type="spinner" />

```html
<KSkeleton type="spinner" />
```

## Full Screen Loading State

The full screen loading state is used to display a full screen loader typically during initial render of an app to avoid any FOUC (Flash Of Unstyled Content) while the app tries to figure out if you are able to access the route and also to perform any expensive querying on first load.

### progress

Used for controlling the progress indicator.

### hideProgress

Defaults to `false`, you can use this prop to hide the progress indicator.

<div class="horizontal-spacing-container">
  <KButton @click="onClickNoProgress">Click for no progress indicator</KButton>
  <KButton @click="onClick">Click for default progress behavior</KButton>
  <KSkeleton
    v-if="loadingNone"
    :delay-milliseconds="0"
    type="fullscreen-kong"
  />
  <!-- Generic Spinner example -->
  <KSkeleton
    v-if="loading"
    :delay-milliseconds="0"
    type="fullscreen-generic"
  />
</div>

```html
<KButton @click="onClickNoProgress">Click for no progress indicator</KButton>
<KButton @click="onClick">Click for default progress behavior</KButton>

<KSkeleton
  v-if="loadingNone"
  :delay-milliseconds="0"
  hide-progress
  type="fullscreen-kong"
/>

<KSkeleton
  v-if="loading"
  :delay-milliseconds="0"
  type="fullscreen-generic"
/>
```

<div>
  <KButton @click="onClickProgress">Click me to simulate progress manually</KButton>

  <KSkeleton
    v-if="loadingManually"
    :delay-milliseconds="0"
    :progress="progress"
    type="fullscreen-kong"
  />
</div>

```vue
<template>
  <KButton @click="onClickProgress">Click me to simulate progress manually</KButton>

  <KSkeleton
    v-if="loadingManually"
    :delay-milliseconds="0"
    :progress="progress"
    type="fullscreen-kong"
  />
</template>

<script setup lang="ts">
const loadingManually = ref(false)
const progress = ref(0)

const onClickProgress = () => {
  progress.value = 0
  loadingManually.value = true
  const interval = setInterval(() => {
    progress.value = progress.value + 20
    if (progress.value >= 100) {
      loadingManually.value = false
      clearInterval(interval)
    }
  }, 500)
}
</script>
```

## KSkeletonBox

KSkeleton package uses a component to render the placeholder content `<KSkeletonBox>`. It can be used as a component primitive to create your own custom placeholder components.

### Box Props

#### width

Width of the skeleton box in relative units. Values `10`, `50`, `75`, `100` are percentage-based.

Accepted values: `1` (default), `2`, `5`, `6`, `10`, `50`, `75`, `100`.

#### height

Height of the skeleton box in relative units.

Accepted values: `1` (default), `2`.

<KSkeletonBox />
<KSkeletonBox width="2" height="2"/>
<KSkeletonBox width="5" height="2"/>
<KSkeletonBox width="50" height="1"/>
<KSkeletonBox width="100" height="2"/>

```html
<KSkeletonBox />
<KSkeletonBox width="2" height="2"/>
<KSkeletonBox width="5" height="2"/>
<KSkeletonBox width="50" height="1"/>
<KSkeletonBox width="100" height="2"/>
```

For example, here is a card skeleton with different arrangement of placeholders:

<KSkeleton class="k-skeleton-modified" type="card" :card-count="2">
  <template v-slot:card-header>
    <div class="skeleton-header-container">
      <div>
        <KSkeletonBox width="5" />
      </div>
      <hr>
    </div>
  </template>
  <template v-slot:card-content>
    <KSkeletonBox width="100"/>
  </template>
  <template v-slot:card-footer>
    <div class="skeleton-header-container">
      <div>
        <KSkeletonBox width="5" />
      </div>
    </div>
  </template>
</KSkeleton>

```html
<KSkeleton type="card" :card-count="2">
  <template v-slot:card-header>
    <div>
      <div>
        <KSkeletonBox width="5" />
      </div>
      <hr>
    </div>
  </template>
  <template v-slot:card-footer>
    <div>
      <div>
        <KSkeletonBox width="5" />
      </div>
    </div>
  </template>
</KSkeleton>
```

And another example:

<KSkeleton type="card">
  <template v-slot:card-header>
    <div>
      <div>
        <KSkeletonBox width="5" />
      </div>
      <hr>
    </div>
  </template>
  <template v-slot:card-content>
    <div>
      <template v-for="i in 8">
        <KSkeletonBox width="5" />
        <KSkeletonBox width="5" />
        <KSkeletonBox width="1" />
        <KSkeletonBox width="2" />
      </template>
    </div>
  </template>
  <template v-slot:card-footer>
    <KSkeletonBox width="100" />
  </template>
</KSkeleton>

```html
<template>
  <KSkeleton type="card">
    <template v-slot:card-header>
      <div>
        <div>
          <KSkeletonBox width="5" />
        </div>
        <hr>
      </div>
    </template>
    <template v-slot:card-content>
      <div>
        <template v-for="i in 8">
          <KSkeletonBox width="5" />
          <KSkeletonBox width="5" />
          <KSkeletonBox width="1" />
          <KSkeletonBox width="2" />
        </template>
      </div>
    </template>
    <template v-slot:card-footer>
      <KSkeletonBox width="100" />
    </template>
  </KSkeleton>
</template>
```

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const loadingNone = ref(false)
const loadingButton = ref(false)
const loadingManually = ref(false)
const loadingTheming = ref(false)
const progress = ref(0)

const onClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const onClickNoProgress = () => {
  loadingNone.value = true
  setTimeout(() => {
    loadingNone.value = false
  }, 1000)
}

const onClickProgress = () => {
  progress.value = 0
  loadingManually.value = true
  const interval = setInterval(() => {
    progress.value += 20
    if (progress.value >= 100) {
      loadingManually.value = false
      clearInterval(interval)
    }
  }, 500)
}
</script>

<style lang="scss" scoped>
.skeleton-header-container {
  width: 100%;
}

.vertical-spacing-container {
  display: flex;
  flex-direction: column;
  gap: $kui-space-50;
}

.horizontal-spacing-container {
  display: flex;
  gap: $kui-space-50;
  flex-wrap: wrap;
}
</style>
