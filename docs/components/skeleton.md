# Skeleton / Loading State

**KSkeleton** is used as a placeholder component while the primary content is still loading.

## Props

### type

- `type`

There are 5 different types of loading states that KSkeleton supports: Card,
Table, Form, Spinner and a generic loading state. Defaults to a generic loading
state. The following example shows a Form type KSKeleton.

<template>
  <KSkeleton type="form" />
</template>

```vue
<template>
  <KSkeleton type="form" />
</template>
```

### delayMilliseconds

- `delay-milliseconds`

The number of milliseconds to wait before showing the skeleton state. Defaults to 750.

<template>
  <Komponent :data="{ isLoading: false }" v-slot="{ data }">
    <div>
      <k-button class="mb-2" @click="()=>(data.isLoading=!data.isLoading)">Toggle loading - {{data.isLoading?'on':'off'}}</k-button>
        <div v-if="!data.isLoading">
          <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
        </div>
        <KSkeleton v-else="data.isLoading" />
    </div>
  </Komponent>
</template>

```vue
<template>
  <Komponent :data="{ isLoading: false }" v-slot="{ data }">
    <div>
      <k-button class="mb-2" @click="()=>(data.isLoading=!data.isLoading)">Toggle loading - {{data.isLoading?'on':'off'}}</k-button>
      <div v-if="!data.isLoading">
        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
      </div>
      <KSkeleton v-else="data.isLoading" />
    </div>
  </Komponent>
</template>
```

## Generic Loading State

By default, **KSkeleton** will load a generic loading state. There are no props for this state.

<template>
  <KSkeleton />
</template>

```vue
<template>
  <KSkeleton />
</template>
```

## Card Loading State

This loading state is using for card type components, like **KCard** or similar.

<template>
  <KSkeleton type="card" />
</template>

```vue
<template>
  <KSkeleton type="card" />
</template>
```

### cardCount

- `card-count`

Used for displaying the number of cards in this loading state. Defaults to 1. The following example shows 3 cards.

<template>
  <KSkeleton type="card" :card-count="3" />
</template>

```vue
<template>
  <KSkeleton type="card" :card-count="3" />
</template>
```

## Form Loading State

This loading state is used for form type components. There are no props for this state.

<template>
  <KSkeleton type="form" />
</template>

```vue
<template>
  <KSkeleton type="form" />
</template>
```

## Table Loading State

This loading state is used for table type components.

<template>
  <KSkeleton type="table" />
</template>

```vue
<template>
  <KSkeleton type="table" />
</template>
```

### rows

- `table-rows`

Used for displaying the number of rows in this loading state. Defaults to 6. The following example shows 3 rows.

<template>
  <KSkeleton type="table" :table-rows="3" />
</template>

```vue
<template>
  <KSkeleton type="table" :table-rows="3" />
</template>
```

### columns

- `table-columns`

Used for displaying the number of columns in this loading state. Defaults to 6. The following example shows 3 columns.

<template>
  <KSkeleton type="table" :table-columns="3" />
</template>

```vue
<template>
  <KSkeleton type="table" :table-columns="3" />
</template>
```

## Spinner Loading State

This loading state is used for a spinner, which can be used for a wide variety of situations. There are no props for this state.

<template>
  <KSkeleton type="spinner" />
</template>

```vue
<template>
  <KSkeleton type="spinner" />
</template>
```

## Button Loading State

This loading state is used to show a spinner, while loading its content. There are no props for this state.

<template>
  <KButton @click="clickedButton" :disabled="loadingButton">
    <KSkeleton v-if="loadingButton" type="spinner" class="mr-2" :delay-milliseconds="3000" />{{loadingButton ? 'Fetching' : 'Fetch'}}
  </KButton>
</template>

```vue
<template>
  <KButton @click="clickedButton" :disabled="loadingButton">
    <KSkeleton v-if="loadingButton" type="spinner" class="mr-2" :delay-milliseconds="3000" />{{loadingButton ? 'Fetching' : 'Fetch'}}
  </KButton>
</template>
```

## Full Screen Loading State

The full screen loading state is used to display a full screen loader typically
during initial render of an app to avoid any FOUC (Flash Of Unstyled Content)
while the app tries to figure out if you are able to access the route and also
to perform any expensive querying on first load.

<template>
  <div>
    <k-button @click="clicked()">click for default progress behavior</k-button>
    <k-button @click="clickProgress()">click me to simulate progress manually</k-button>
    <KSkeleton
      v-if="loading"
      type="fullscreen-kong"  
      :delay-milliseconds="0" />
    <KSkeleton
      v-if="loadingManually"
      type="fullscreen-kong"
      :progress="progress"
      :delay-milliseconds="0" />
  </div>
</template>

```vue
<template>
  <k-button @click="clicked()">click for default progress behavior</k-button>
  <KSkeleton
      v-if="loading"
      type="fullscreen-kong"
      :delay-milliseconds="0" />
</template>
```

## KSkeletonBox

KSkeleton package uses a component to render the placeholder content
`<KSkeletonBox>`. It can be used as a component primitive to create your own
custom placeholder components.

### Box Props

| Prop   | Allowed Values                                              | Description                                  |
| :----- | :---------------------------------------------------------- | -------------------------------------------- |
| width  | '1' (default), '2', '5', '6', '10', '50', '75', '100'       | Width of the skeleton box in relative units. Values 10, 50, 75, 100 are percentage based. |
| height | '1' (default), '2'                                          | Height of the skeleton box in relative units |

<KSkeletonBox />
<KSkeletonBox width="2" height="2"/>
<KSkeletonBox width="5" height="2"/>
<KSkeletonBox width="50" height="1"/>
<KSkeletonBox width="100" height="2"/>

```vue
<KSkeletonBox />
<KSkeletonBox width="2" height="2"/>
<KSkeletonBox width="5" height="2"/>
<KSkeletonBox width="50" height="1"/>
<KSkeletonBox width="100" height="2"/>
```

For example, here is a card skeleton with different arrangement of placeholders:

<template>
  <KSkeleton type="card" :card-count="3">
    <template v-slot:card-header>
      <div class="w-100">
        <div class="justify-content-center pb-3">
          <KSkeletonBox width="5" />
        </div>
        <hr>
      </div>
    </template>
    <template v-slot:card-content>
      <KSkeletonBox width="100"/>
    </template>
    <template v-slot:card-footer>
      <div class="w-100">
        <div class="d-flex justify-content-center">
          <KSkeletonBox width="5" />
        </div>
      </div>
    </template>
  </KSkeleton>
</template>

```vue
<KSkeleton type="card" :card-count="3">
  <template v-slot:card-header>
    <div class="w-100">
      <div class="d-flex justify-content-center pb-2">
        <KSkeletonBox width="5" />
      </div>
      <hr>
    </div>
  </template>
  <template v-slot:card-footer>
    <div class="w-100">
      <div class="d-flex justify-content-center pb-2">
        <KSkeletonBox width="5" />
      </div>
    </div>
  </template>
</KSkeleton>
```

And another example:

<template>
  <KSkeleton type="card">
    <template v-slot:card-header>
      <div>
        <div class="d-flex justify-content-center pb-2">
          <KSkeletonBox width="5" />
        </div>
        <hr>
      </div>
    </template>
    <template v-slot:card-content>
      <div class="d-block">
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

```vue
<KSkeleton type="card">
  <template v-slot:card-header>
    <div>
      <div class="d-flex justify-content-center pb-2">
        <KSkeletonBox width="5" />
      </div>
      <hr>
    </div>
  </template>
  <template v-slot:card-content>
    <div class="d-block">
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
```

## Theming

| Variable                             | Purpose                                                                                                                                                                    |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--KSkeletonFullScreenMargin`        | Margin around full screen variant. Useful for when you want to show full screen loader under header or next to sidebar since the full screen component has fixed position. |
| `--KSkeletonFullScreenProgressColor` | Progress bar fill color.                                                                                                                                                   |
| `--KSkeletonCardWidth`               | Width of the card. Default is 33%                                                                                                                                          |

### Examples

To reveal the header on this docs page during full page loader, click the button below.

<div class="mt-4 k-skeleton-full-screen-margin">
  <k-button @click="clickedTheming()">themed full screen loader</k-button>
  <KSkeleton v-if="loadingTheming" type="fullscreen-kong" :delay-milliseconds="0" />
</div>

<script>
export default {
  data () {
    return {
      loading: false,
      loadingButton: false,
      loadingManually: false,
      loadingTheming: false,
      progress: 0
    }
  },
  methods: {
    clicked() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },

    clickProgress () {
      this.progress = 0
      this.loadingManually = true
      const interval = setInterval(() => {
        this.progress = this.progress + 20
        if (this.progress >= 100) {
          this.loadingManually = false
          clearInterval(interval)
        }
      }, 500)
    },

    clickedTheming() {
      this.loadingTheming = true
      setTimeout(() => {
        this.loadingTheming = false
      }, 1000)
    },

    clickedButton() {
      this.loadingButton = true
      setTimeout(() => {
        this.loadingButton = false
      }, 5000)
    }
  }
}
</script>

<style>
.k-skeleton-full-screen-margin {
  --KSkeletonFullScreenMargin: 58px 0 0;
  --KSkeletonFullScreenProgressColor: var(--black-70);
}
</style>
