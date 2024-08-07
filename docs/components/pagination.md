# Pagination

KPagination component is a user interface element that allows users to navigate through multiple pages of content in smaller, manageable sections.

<KPagination :total-count="300"/>

## Props

### totalCount

A total number of items inside the paginated data source. This prop is **required**.

```html
<KPagination :total-count="50"/>
```

### pageSizes

An array of numbers of page sizes that the user can choose from. The default page sizes are: `[15, 30, 50, 75, 100]`.

You can provide custom page sizes. The first number in the array will be the initial page size unless otherwise specified through the [`initialPageSize` prop](#initialpagesize).

<KPagination :total-count="100" :page-sizes="[10, 20, 30, 40]" />

```html
<KPagination :total-count="100" :page-sizes="[10, 20, 30, 40]" />
```

### initialPageSize

An optional initial page size. If the value is not set, the first number in the `pageSizes` array is selected as the default.

<KPagination :initial-page-size="20" :total-count="100" :page-sizes="[10, 20, 30, 40]" />

```html
<KPagination :initial-page-size="20" :total-count="100" :page-sizes="[10, 20, 30, 40]" />
```

### items

Optional array of items that can be provided for easy pagination. Slice of this array with visible items is returned as `visibleItems` inside the `pageChange` event.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="letter in data.visibleLetters">{{ letter }}</span>
    <KPagination
      :items="data.letters"
      :total-count="data.letters.length"
      :page-sizes="[3]"
      @page-change="({visibleItems}) => data.visibleLetters = visibleItems" />
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="letter in visibleLetters">{{ letter }}</span>
  <KPagination
    :items="letters"
    :total-count="letters.length"
    :page-sizes="[3]"
    @page-change="({visibleItems}) => visibleLetters = visibleItems" />
</template>

<script setup lang="ts">
const letters = ref<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
const visibleLetters = ref<string>(['a', 'b', 'c'])
</script>
```

### neighbors

A number that sets the neighboring pages visible to the left and right of the center page when ellipsis are visible on both sides. By default, 1 neighbor is shown. For bigger sets of data we want user to see more pages to go through the pagination faster.

<KPagination :neighbors="2" :total-count="1000" />

```html
<KPagination :neighbors="2" :total-count="1000" />
```

If KPagination detects horizontal overflow it will automatically reduce number of displayed neighbors down to a number at which it fits into the parent container without overflowing, ignoring the value provided through `neighbors` prop. It will always display at least 1 neighbor. See the example below where value passed through the `neighbors` prop is unreasonably high but KPagination only displays as many items as it can fit in without overflowing.

<KPagination :neighbors="20" :total-count="1000" />

```html
<KPagination :neighbors="20" :total-count="1000" />
```

### disablePageJump

Restrict navigation to only previous/next page. Defaults to `false`.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="letter in data.visibleLetters">{{ letter }} </span>
    <KPagination :items="data.letters" :total-count="data.letters.length" :page-sizes="[3]" disable-page-jump @page-change="({visibleItems}) => data.visibleLetters = visibleItems" />
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="letter in visibleLetters">{{ letter }}</span>
  <KPagination
    disable-page-jump
    :items="letters"
    :total-count="letters.length"
    :page-sizes="[3]"
    @page-change="({visibleItems}) => visibleLetters = visibleItems" />
</template>

<script setup lang="ts">
const letters = ref<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
const visibleLetters = ref<string>(['a', 'b', 'c'])
</script>
```

### currentPage

Prop for setting the current page. If using this prop you **must** keep it up-to-date using the `@page-change` event in order to remain reactive to clicking the previous, next, and specific page buttons.

<KComponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['d', 'e', 'f'], currPage: 2}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="letter in data.visibleLetters">{{ letter }}</span>
    <KPagination
      :items="data.letters"
      :total-count="data.letters.length"
      :page-sizes="[3]"
      :current-page="data.currPage"
      @page-change="({visibleItems, page}) => { data.visibleLetters = visibleItems; data.currPage = page }" />
  </div>
</KComponent>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="letter in visibleLetters">{{ letter }}</span>
  <KPagination
    :items="letters"
    :total-count="letters.length"
    :page-sizes="[3]"
    :current-page="currPage"
    @page-change="({visibleItems, page}) => {
      visibleLetters = visibleItems
      currPage = page
    }" />
</template>

<script setup lang="ts">
const letters = ref<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
const visibleLetters = ref<string>(['a', 'b', 'c'])
const currPage = ref<number>(2)
</script>
```

### offset

Set this prop to `true` if you want to use offset pagination. Defaults to `false`.

Offset pagination is a simpler version of pagination that omits the concept of pages. When using this type of pagination you will have to keep track of current offset and related logic in your component.

<div>
  <span><b>Visible letters: </b></span>
  <span v-for="letter in offsetVisibleLetters">{{ letter }}</span>
  <KPagination
    offset
    :offset-previous-button-disabled="currentOffset === 0"
    :offset-next-button-disabled="(currentOffset + 1) === (offsetLetters.length/offsetPageSize)"
    :items="offsetLetters"
    :total-count="offsetLetters.length"
    :page-sizes="[offsetPageSize]"
    @get-next-offset="getNextOffset"
    @get-previous-offset="getPreviousOffset" />
</div>

```vue
<template>
  <span><b>Visible letters: </b></span>
  <span v-for="letter in visibleLetters">{{ letter }}</span>
  <KPagination
    offset
    :offset-previous-button-disabled="currentOffset === 0"
    :offset-next-button-disabled="(currentOffset + 1) === (letters.length/pageSize)"
    :items="letters"
    :total-count="letters.length"
    :page-sizes="[pageSize]"
    @get-next-offset="getNextOffset"
    @get-previous-offset="getPreviousOffset" />
</template>

<script setup lang="ts">
const pageSize = 3
const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const currentOffset = ref<number>(0)
const visibleLetters = ref<string>(offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + pageSize)))

const getNextOffset = () => {
  currentOffset.value++
  visibleLetters.value = offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + pageSize))
}

const getPreviousOffset = () => {
  currentOffset.value--
  visibleLetters.value = offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + pageSize))
}
</script>
```

### offsetPreviousButtonDisabled

Pass in a boolean value for whether or not the offset-based previous button should be disabled.

### offsetNextButtonDisabled

Pass in a boolean value for whether or not the offset-based next button should be disabled.

## Events

### page-change

Emitted when the page has been changed. The page number is returned starting at 1 rather than 0 to be easier to use directly in the UI.

```json
{
  page,         // Current page
  pageCount,    // Max number of pages
  firstItem,    // Index of the first item visible on the current page
  lastItem,     // Index of the last item visible on the current page
  visibleItems  // A slice of `items` array visible on the current page
}
```

### page-size-change

Emitted when the number of items per page has been changed.

```json
{
  pageSize,     // Number of items on a single page
  pageCount,    // Max number of pages
}
```

### get-next-offset

Emitted when next arrow button clicked when [`offset` prop](#offset) is true.

### get-previous-offset

Emitted when previous arrow button clicked when [`offset` prop](#offset) is true.

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
    :total-count="data.names.length"
    :page-sizes="[3, 4, 5]"
    @page-change="({visibleItems}) => data.visibleNames = visibleItems" />
  </div>
</KComponent>

```vue
<template>
  <KCard title="Names list">
    <div v-for="name in visibleNames">{{name}}</div>
  </KCard>

  <KPagination
    :items="names"
    :total-count="names.length"
    :page-sizes="[3, 4, 5]"
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

<script setup lang="ts">
import { ref } from 'vue'

const offsetPageSize = 3
const offsetLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
const currentOffset = ref<number>(0)
const offsetVisibleLetters = ref<string>(offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + offsetPageSize)))

const getNextOffset = () => {
  currentOffset.value++
  offsetVisibleLetters.value = offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + offsetPageSize))
}

const getPreviousOffset = () => {
  currentOffset.value--
  offsetVisibleLetters.value = offsetLetters.slice((currentOffset.value * 3), ((currentOffset.value * 3) + offsetPageSize))
}
</script>
