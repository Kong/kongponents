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
-`table-rows`

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
