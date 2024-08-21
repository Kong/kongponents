<template>
  <KTable
    client-sort
    :fetcher="fetcher"
    :fetcher-cache-key="String(fetchKey)"
    :headers="headers"
    pagination-offset
  >
    <template #actions="{ row }">
      <KButton
        appearance="danger"
        @click="handleDelete(row)"
      >
        Delete
      </KButton>
    </template>
  </KTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const fetchKey = ref<number>(1)
const headers = [
  { key: 'name', label: 'Full Name' },
  {
    key: 'actions',
    label: 'actions',
    hideLabel: true,
  },
]

let data: any = []
for (let i = 0; i < 40; i++) {
  data.push({ id: i, name: 'row' + i })
}

const sendToFirstPage = ref<boolean>(false)

const fetcher = async (params): Promise<any> => {
  const { pageSize, page, offset } = params

  let start = 0
  if (offset && !sendToFirstPage.value) {
    // start = Number(offset)
    start = page === 1 ? start : Number(offset)
  }

  const paginatedData = data.slice(start, start + pageSize)
  let nextOffset = start + pageSize
  if (nextOffset > data.length) {
    nextOffset = null
  }
  nextOffset = nextOffset ? `${nextOffset}` : null
  sendToFirstPage.value = false
  return {
    data: paginatedData,
    pagination: {
      // next?: string
      offset: nextOffset,
      // page?: Record<string, unknown>
      hasNextPage: nextOffset !== null,
    },
  }
}

const refetch = () => {
  fetchKey.value++
}
const handleDelete = (row) => {
  data = data.filter(d => d.id !== row.id)
  sendToFirstPage.value = true
  refetch()
}
</script>
