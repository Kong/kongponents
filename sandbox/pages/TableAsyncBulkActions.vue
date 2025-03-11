<template>
  <KTableView
    :key="tableKey"
    :data="data"
    :headers="headers"
    :loading="loading"
    :row-bulk-action-enabled="(row: any) => dataBulkActionsEvaluated ? dataBulkActionsEnabledMap[row.username] : false"
    row-key="username"
  >
    <template #bulk-action-items>
      <KDropdownItem>
        Delete
      </KDropdownItem>
    </template>
  </KTableView>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TableViewData } from '@/types'

const headers = [
  { key: 'name', label: 'Full Name' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'bulkActions', label: 'Bulk actions' },
]
const data = ref<TableViewData>([])

const tableKey = ref<number>(0)
const loading = ref<boolean>(false)

const dataBulkActionsEvaluated = ref<boolean>(false)
const dataBulkActionsEnabledMap = ref<Record<string, boolean>>({})

const fetchData = async (): Promise<void> => {
  loading.value = true

  dataBulkActionsEvaluated.value = false
  dataBulkActionsEnabledMap.value = {}

  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  responseData.forEach(async (item: any) => {
    dataBulkActionsEnabledMap.value[item.username] = false
  })

  data.value = responseData
  loading.value = false
}

watch(dataBulkActionsEnabledMap, async (map) => {
  if (Object.keys(map).length) {
    Object.keys(map).forEach(async (username) => {
      // Fake delay, here we would call canUserAccess to check permissions
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (username !== 'Samantha') {
        dataBulkActionsEnabledMap.value[username] = true
      }
    })

    dataBulkActionsEvaluated.value = true
    tableKey.value ++
  }
}, { deep: true })

onMounted(() => {
  fetchData()
})
</script>
