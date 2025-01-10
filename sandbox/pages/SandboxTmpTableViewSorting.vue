<template>
  <KTableView
    :data="newData"
    :headers="newHeaders"
    hide-pagination
    @sort="newSort"
  />
</template>

<script setup lang="ts">
import type { TableSortPayload } from '@/types'

const newHeaders = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
]

const newData = [
  { name: 'a', age: 40 },
  { name: 'bb', age: 30 },
  { name: 'ccc', age: 20 },
]

const newSort = (sortData: TableSortPayload): void => {
  console.log(sortData)
  const { sortColumnKey, sortColumnOrder } = sortData

  newData.sort((a: Record<string, any>, b: Record<string, any>) => {
    if (sortColumnKey === 'name') {
      if (a.name > b.name) {
        return sortColumnOrder === 'asc' ? 1 : -1
      } else if (a.name < b.name) {
        return sortColumnOrder === 'asc' ? -1 : 1
      }

      return 0
    }

    if (sortColumnKey === 'age') {
      if (sortColumnOrder === 'asc') {
        return a.age - b.age
      } else {
        return b.age - a.age
      }
    }

    return 0
  })
}
</script>
