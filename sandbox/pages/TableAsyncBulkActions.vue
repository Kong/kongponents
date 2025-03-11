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
    // once data is fetched, we can start evaluating bulk actions for each row
    Object.keys(map).forEach(async (username) => {
      // Fake delay, here we would call canUserAccess to check permissions
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (username !== 'Samantha') {
        dataBulkActionsEnabledMap.value[username] = true
      }
    })

    dataBulkActionsEvaluated.value = true // this ensures that we render all checkboxes disabled up until the moment once KTableView has been re-rendered and therefore can evaluate the new value of rowBulkActionEnabled
    tableKey.value ++ // we need to force re-render because internal properties in KTableView relied on old value provided through rowBulkActionEnabled to determine states of some elements (namely, the checkbox in the table header)
    // the reason why we want KTableView rather than KTableData here is because re-rendering would trigger fetcher function and we'd basically end up in an infinite loop
  }
}, { deep: true })

onMounted(() => {
  fetchData()
})
</script>
