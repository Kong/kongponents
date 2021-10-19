# Pagination

**KPagination** is a component used for pagination.

<template>
  <KPagination :totalCount="200" :pageSize="10"/>
</template>

## Props
### Total count - required
A total number of items inside the paginated data source.

```vue
<KPagination :totalCount="50" :pageSize="10"/>
```

### Page size - required
An initial number of items displayed on a single page.


```vue
<KPagination :totalCount="100" :pageSize="5"/>
```

### Neighbours - required
A number that sets the neighbours visible in a single view.

<template>
  <KPagination :totalCount="100" :pageSize="5" :neighbours="2"/>
</template>

```vue
<KPagination :totalCount="100" :pageSize="5" neighbours="2"/>
```

## Usage

<Komponent :data="{ names: ['Alice', 'Bob', 'Charlie', 'Derek', 'Ellie', 'Frank', 'George', 'Helen', 'Ingrid', 'Herman'], visibleNames: ['Alice', 'Bob', 'Charlie'], page: 1}" v-slot="{ data }">
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
    :pageSize="3" 
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
    :totalCount="9" 
    :pageSize="3"
    @pageChanged="({page, visibleItems, lastItem}) => visibleNames = names.slice(firstItem -1, lastItem )"/>
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
| `--KPaginationBorderColor `| KPagination border color


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
