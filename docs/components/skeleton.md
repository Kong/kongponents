# Skeleton / Loading State

**KSkeleton** is used as a placeholder component while the primary content is still loading.

## Props
### type
- `type`

There are 5 different types of loading states that KSkeleton supports: Card, Table, Form, Spinner and a generic loading state. Defaults to a generic loading state. The following example shows a Form type KSKeleton.

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

## Theming

| Variable                             | Purpose                                                                                                                                                                    |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--KSkeletonFullScreenMargin`        | Margin around full screen variant. Useful for when you want to show full screen loader under header or next to sidebar since the full screen component has fixed position. |
| `--KSkeletonFullScreenProgressColor` | Progress bar fill color.                                                                                                                                                   |

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
    }
  }
}
</script>

<style>
.k-skeleton-full-screen-margin {
  --KSkeletonFullScreenMargin: 58px 0 0;
  --KSkeletonFullScreenProgressColor: var(--tblack-70);
}
</style>
