# Pagination

**KPagination** is a component used for pagination.

<template>
  <KPagination :totalCount="300"/>
</template>

## Props

### totalCount - required

A total number of items inside the paginated data source.

```vue
<KPagination :totalCount="50"/>
```

### pageSizes

A list of page sizes that the user can choose from.

Prop is an Array of numbers. The default page sizes are: [15, 30, 50, 75, 100].

You can provide custom page sizes. The first one in the array will be the initial page size unless custom initialPageSize is set.

<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]"/>

```vue
<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]"/>
```

### initialPageSize

An optional initial page size.

Prop is a Number. If the value is not set, the first one of the available pageSizes is selected as a page size.

<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]" :initialPageSize="20"/>

```vue
<KPagination :totalCount="100" :pageSizes="[10, 20, 30, 40]" :initialPageSize="20"/>
```

### items

Optional array of items that can be provided for easy pagination. Slice of this array with visible items is returned as `visibleItems` inside the `pageChanged` event.

<Komponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination
      :items="data.letters"
      :totalCount="data.letters.length"
      :pageSizes="[3]"
      @pageChanged="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</Komponent>

```vue
<template>
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination 
      :items="data.letters"
      :totalCount="data.letters.length" 
      :pageSizes="[3]" 
      @pageChanged="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</template>

export default {
  data: {
    return {
      letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
      visibleLetters: ['a', 'b', 'c']
    };
  }
}
```

### neighbors

A number that sets the neighboring pages visible to the left and right of the center page when ellipsis are visible on both sides. By default, 1 neighbor is shown. For bigger sets of data we want user to see more pages to go through the pagination faster.

<template>
  <KPagination :totalCount="1000" :neighbors="2"/>
</template>

```vue
<KPagination :totalCount="1000" :pageSize="15" neighbors="2"/>
```

### disablePageJump

Restrict navigation to only `previous` / `next` page. Defaults to `false`.

<Komponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['a', 'b', 'c']}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination
      :items="data.letters"
      :totalCount="data.letters.length"
      :pageSizes="[3]"
      :disablePageJump="true"
      @pageChanged="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</Komponent>

```vue
<template>
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination 
      :items="data.letters"
      :totalCount="data.letters.length" 
      :pageSizes="[3]" 
      :disablePageJump="true"
      @pageChanged="({visibleItems}) => data.visibleLetters = visibleItems"/>
  </div>
</template>

export default {
  data: {
    return {
      letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], 
      visibleLetters: ['a', 'b', 'c']
    };
  }
}
```

### currentPage

Manually control the current page instead of using native handling. If using this prop you MUST keep it up-to-date using
the `@pageChanged` event in order to remain reactive to clicking the prev, next, and specific page buttons.

<Komponent :data="{ letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], visibleLetters: ['d', 'e', 'f'], currPage: 2}" v-slot="{ data }">
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination
      :items="data.letters"
      :totalCount="data.letters.length"
      :pageSizes="[3]"
      :currentPage="data.currPage"
      @pageChanged="({visibleItems, page}) => { data.visibleLetters = visibleItems; data.currPage = page }"/>
  </div>
</Komponent>

```vue
<template>
  <div>
    <span><b>Visible letters: </b></span>
    <span v-for="number in data.visibleLetters">{{ number }} </span>
    <KPagination 
      :items="data.letters"
      :totalCount="data.letters.length" 
      :pageSizes="[3]" 
      :currentPage="currPage"
      @pageChanged="({visibleItems, page}) => { 
        data.visibleLetters = visibleItems 
        currPage = page 
      }"/>
  </div>
</template>

export default {
  data () {
    return {
      currPage: 2
    }
  }
}
</script>
```

### paginationType

Pass in the type of pagination to be used. Options are `default` (page/pageSize) or `offset` (offset/pageSize)

### offsetPrevButtonDisabled

Pass in a boolean value for whether or not the offset-based Previous button should be disabled

### offsetNextButtonDisabled

Pass in a boolean value for whether or not the offset-based Next button should be disabled

## Usage

### Events

- `pageChanged` - emitted when the page has been changed. The event provides following information. All of the numbers are sent in a human-understandable base (starting at 1 instead of 0) to be used directly in UI.

  ```json
  {
    page,         // Current page
    pageCount,    // Max number of pages
    firstItem,    // Index of the first item visible on the current page
    lastItem,     // Index of the last item visible on the current page
    visibleItems  // A slice of `items` array visible on the current page
  }
  ```

- `pageSizeChanged` - emitted when the number of items per page has been changed

  ```json
  {
    pageSize,     // Number of items on a single page
    pageCount,    // Max number of pages
  }
  ```

### Example

<Komponent :data="{ names: ['Alice', 'Bob', 'Charlie', 'Derek', 'Ellie', 'Frank', 'George', 'Helen', 'Ingrid'], visibleNames: ['Alice', 'Bob', 'Charlie'], page: 1}" v-slot="{ data }">
  <div>
    <KCard title="Cool names list" class="mb-4">
      <template #body>
        <div v-for="name in data.visibleNames">
        {{name}}
        </div>
      </template>
    </KCard>

  <KPagination
    :items="data.names"
    :totalCount="data.names.length"
    :pageSizes="[3, 4, 5]"
    @pageChanged="({visibleItems}) => data.visibleNames = visibleItems"/>
  </div>
</Komponent>

```vue
<template>
  <div>
    <KCard title="Cool names list">
      <template #body>
        <div v-for="name in data.visibleNames">
        {{name}}
        </div>
      </template>
    </KCard>

    <KPagination 
      :items="data.names"
      :totalCount="data.names.length" 
      :pageSizes="[3, 4, 5]" 
      @pageChanged="({visibleItems}) => data.visibleNames = visibleItems"/>
  </div>
</template>

<script>
export default {
  data () {
    const names = [
      'Alice', 'Bob', 'Charlie', 
      'Derek', 'Ellie', 'Frank', 
      'George', 'Helen', 'Ingrid'
    ]
    return {
      names
      visibleNames: names.slice(0,3);
      page: 1
    }
  }
}
</script>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KPaginationBorderColor`| KPagination border color

An Example of changing the border color of KPagination to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KPagination-wrapper">
    <KPagination />
  </div>
</template>

```vue
<template>
  <div class="KPagination-wrapper">
    <KPagination />
  </div>
</template>

<style>
.KPagination-wrapper {
  --KPagination-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KPagination-wrapper {
  --KPagination-wrapperBorderColor: lime;
}
</style>
