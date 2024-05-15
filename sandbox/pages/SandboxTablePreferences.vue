<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTable"
  >
    <KTable
      :fetcher="fetcher"
      :headers="headers"
      :table-preferences="tablePreferences"
      @update:table-preferences="onTablePreferencesUpdate"
    />
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import type { TableHeader, TablePreferences } from '@/types'
import { useTablePreferences } from '@kong-ui-public/core'

const { setTablePreferences, getTablePreferences } = useTablePreferences()

const preferencesKey = 'kongponents-sandbox-ktable-table-preferences'

const tablePreferences = ref<TablePreferences>(getTablePreferences(preferencesKey))

const onTablePreferencesUpdate = (newTablePreferences: TablePreferences): void => {
  console.log('Table preferences updated:', newTablePreferences)
  setTablePreferences(preferencesKey, newTablePreferences)
}

const headers: TableHeader[] = [
  { key: 'name', label: 'Full Name' },
  { key: 'username', label: 'Username', tooltip: 'Columns with a tooltip.' },
  { key: 'email', label: 'Email', hidable: true },
  { key: 'actions', label: 'Row actions', hideLabel: true },
]

const fetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: responseData,
    total: responseData.length,
  }
}
</script>
