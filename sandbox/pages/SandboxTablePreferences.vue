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
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import type { TableHeader, TablePreferences } from '@/types'
import { useTablePreferences } from '@kong-ui-public/core'

const { setTablePreferences, getTablePreferences } = useTablePreferences()

const preferencesKey = 'kongponents-sandbox-ktable-table-preferences'
const defaultPreferences: TablePreferences = {
  pageSize: 30,
  sortColumnKey: undefined,
  sortColumnOrder: undefined,
  columnWidths: {},
  columnVisibility: {},
}

// setup with default preferences and update on mounted to simulate race condition
const tablePreferences = ref<TablePreferences>(defaultPreferences)

const onTablePreferencesUpdate = (newTablePreferences: TablePreferences): void => {
  console.log('KTable preferences:', newTablePreferences)
  setTablePreferences(preferencesKey, newTablePreferences)
}

const headers: TableHeader[] = [
  { key: 'name', label: 'Full Name' },
  { key: 'username', label: 'Username', tooltip: 'Columns with a tooltip.' },
  { key: 'email', label: 'Email', hidable: true },
  { key: 'actions', label: 'Row actions', hideLabel: true },
]

const fetcher = (): any => {
  const responseData = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
    },
  ]

  return {
    data: responseData,
    total: responseData.length,
  }
}

onMounted(async () => {
  // update table preferences with value from local storage
  await nextTick()
  tablePreferences.value = getTablePreferences(preferencesKey)
})

watch(tablePreferences, (newTablePreferences) => {
  console.log('Sandbox preferences:', newTablePreferences)
}, { deep: true, immediate: true })
</script>
