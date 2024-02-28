# Pagination

KPagination is a component used for pagination.

<KPagination :totalCount="300"/>

## Props

### totalCount

A total number of items inside the paginated data source. This prop is **required**.

```html
<KPagination :totalCount="50"/>
```

### pageSizes

An array of numbers of page sizes that the user can choose from. The default page sizes are: `[15, 30, 50, 75, 100]`.

You can provide custom page sizes. The first one in the array will be the initial page size unless otherwise specified through [`initialPageSize` prop](#initialpagesize).

<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]"/>

```html
<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]"/>
```

### initialPageSize

An optional initial page size. If the value is not set, the first one of the available `pageSizes` is selected as a page size.

<KPagination :initialPageSize="20" :totalCount="100" :pageSizes="[10, 20, 30, 40]" />

```html
<KPagination :initialPageSize="20" :totalCount="100" :pageSizes="[10, 20, 30, 40]" />
```

### items

Optional array of items that can be provided for easy pagination. Slice of this array with visible items is returned as `visibleItems` inside the `pageChange` event.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination
      :items="data.letters"
      :totalCount="data.letters.length"
      :pageSizes="[3]"
      @page-change="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="number in visibleLetters">{{ number }} </span>
  <KPagination
    :items="letters"
    :totalCount="letters.length"
    :pageSizes="[3]"
    @page-change="({visibleItems}) => visibleLetters = visibleItems"/>
</template>

<script setup lang="ts">
const letters = ref<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
const visibleLetters = ref<string>(['a', 'b', 'c'])
</script>
```

### neighbors

A number that sets the neighboring pages visible to the left and right of the center page when ellipsis are visible on both sides. By default, 1 neighbor is shown. For bigger sets of data we want user to see more pages to go through the pagination faster.

<KPagination :totalCount="1000" :neighbors="2"/>

```html
<KPagination :totalCount="1000" :neighbors="2"/>
```

### disablePageJump

Restrict navigation to only previous/next page. Defaults to `false`.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination :items="data.letters" :totalCount="data.letters.length" :pageSizes="[3]" :disablePageJump="true" @page-change="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="number in visibleLetters">{{ number }} </span>
  <KPagination
    :items="letters"
    :totalCount="letters.length"
    :pageSizes="[3]"
    :disablePageJump="true"
    @page-change="({visibleItems}) => visibleLetters = visibleItems" />
</template>

<script setup lang="ts">
const letters = ref<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
const visibleLetters = ref<string>(['a', 'b', 'c'])
</script>
```

### currentPage

Manually control the current page instead of using native handling. If using this prop you **must** keep it up-to-date using the `@page-change` event in order to remain reactive to clicking the prev, next, and specific page buttons.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['d', 'e', 'f'], currPage: 2}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination
      :items="data.letters"
      :totalCount="data.letters.length"
      :pageSizes="[3]"
      :currentPage="data.currPage"
      @page-change="({visibleItems, page}) => { data.visibleLetters = visibleItems; data.currPage = page }"/>
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="number in visibleLetters">{{ number }} </span>
  <KPagination
    :items="letters"
    :totalCount="letters.length"
    :pageSizes="[3]"
    :currentPage="currPage"
    @page-change="({visibleItems, page}) => {
      visibleLetters = visibleItems
      currPage = page
    }" />
</template>

<script setup lang="ts">
const currPage = ref<number>(2)
</script>
```

### paginationType

Pass in the type of pagination to be used. Options are `default` (page/pageSize) or `offset` (offset/pageSize).

<KPagination
  pagination-type="offset"
  :total-count="1000"
/>

```html
<KPagination
  pagination-type="offset"
  :total-count="1000"
/>
```

### offsetPrevButtonDisabled

Pass in a boolean value for whether or not the offset-based Previous button should be disabled.

### offsetNextButtonDisabled

Pass in a boolean value for whether or not the offset-based Next button should be disabled.

## Events

### pageChange

Emitted when the page has been changed. The event provides following information. All of the numbers are sent in a human-understandable base (starting at 1 instead of 0) to be used directly in UI.

```json
{
  page,         // Current page
  pageCount,    // Max number of pages
  firstItem,    // Index of the first item visible on the current page
  lastItem,     // Index of the last item visible on the current page
  visibleItems  // A slice of `items` array visible on the current page
}
```

### pageSizeChange

Emitted when the number of items per page has been changed.

```json
{
  pageSize,     // Number of items on a single page
  pageCount,    // Max number of pages
}
```

## Usage

<br/>
<KComponent :data="{ names: ['Alice', 'Bob', 'Charlie', 'Derek', 'Ellie', 'Frank', 'George', 'Helen', 'Ingrid'], visibleNames: ['Alice', 'Bob', 'Charlie'], page: 1}" v-slot="{ data }">
  <div>
    <KCard title="Names list">
      <div v-for="name in data.visibleNames">
        {{name}}
      </div>
    </KCard>

  <KPagination
    :items="data.names"
    :totalCount="data.names.length"
    :pageSizes="[3, 4, 5]"
    @page-change="({visibleItems}) => data.visibleNames = visibleItems"/>
  </div>
</KComponent>

```vue
<template>
  <KCard title="Names list">
    <div v-for="name in visibleNames">{{name}}</div>
  </KCard>

  <KPagination
    :items="names"
    :totalCount="names.length"
    :pageSizes="[3, 4, 5]"
    @page-change="({visibleItems}) => visibleNames = visibleItems" />
</template>

<script setup lang="ts">
const names = [
  'Alice', 'Bob', 'Charlie',
  'Derek', 'Ellie', 'Frank',
  'George', 'Helen', 'Ingrid'
]
const visibleNames = ref<string>(names.slice(0, 3))

const page = ref<number>(1)
</script>
```
