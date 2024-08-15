<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTableView"
  >
    <div class="k-table-view-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="rowHover & emptyStateIconVariant & emptyStateTitle & emptyStateMessage & emptyStateActionMessage & emptyStateActionRoute & emptyStateButtonAppearance">
        <KComponent
          v-slot="{ data }"
          :data="{ tableKey: 0, tableRowHover: false, tableEmptyState: false }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableRowHover"
              label="Has hover"
            />
            <KInputSwitch
              v-model="data.tableEmptyState"
              label="Empty state"
              @change="data.tableKey++"
            />
          </div>

          <KTableView
            :key="data.tableKey"
            :data="data.tableEmptyState ? [] : sortedData"
            empty-state-action-message="Empty state action"
            empty-state-action-route="/"
            empty-state-button-appearance="secondary"
            empty-state-icon-variant="kong"
            empty-state-message="Empty state message"
            empty-state-title="Empty state title"
            :headers="headers(false, true)"
            :row-hover="data.tableRowHover"
            @sort="sortData"
          >
            <template #actions-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="First 2 rows in this table are links. The rest of the rows are clickable."
        title="loading & resizeColumns & error & errorStateTitle & errorStateMessage & errorStateActionMessage & errorStateActionRoute"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ tableLoadingState: false, tableErrorState: false }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableLoadingState"
              label="Loading state"
            />
            <KInputSwitch
              v-model="data.tableErrorState"
              label="Error state"
            />
          </div>

          <KTableView
            :data="tableDataWithLinks"
            empty-state-action-message="Add new item"
            :error="data.tableErrorState"
            error-state-action-message="Error state action"
            error-state-action-route="/"
            error-state-message="Error state message"
            error-state-title="Error state title"
            :headers="headers(true)"
            :loading="data.tableLoadingState"
            resize-columns
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #actions-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </KComponent>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        description="First 2 rows in this table are links."
        title="column header & column tooltip & cell"
      >
        <KTableView
          :data="tableDataWithLinks"
          :headers="headers()"
        >
          <template #column-username>
            Username

            <KBadge>Beta</KBadge>
          </template>
          <template #tooltip-email>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
          <template #username="{ rowValue }">
            <KExternalLink
              class="username-link"
              href="https://kongponents.konghq.com/components/alert.html"
            >
              @{{ rowValue }}
            </KExternalLink>
          </template>
          <template #email="{ rowValue }">
            <KCopy :text="rowValue" />
          </template>
          <template #actions-items>
            <SandboxTableViewActions />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="toolbar">
        <KTableView
          :data="tableData"
          :headers="headers()"
        >
          <template #toolbar>
            <KInput />
            <KButton size="large">
              <AddIcon /> Add user
            </KButton>
          </template>
          <template #actions-items>
            <SandboxTableViewActions />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="after">
        <KTableView
          :data="tableData"
          :headers="headers()"
        >
          <template #after>
            <KPagination :total-count="10" />
          </template>
          <template #actions-items>
            <SandboxTableViewActions />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error-state">
        <KTableView
          :data="tableData"
          error
          :headers="headers()"
        >
          <template #error-state>
            <KEmptyState
              action-button-text="Slotted error state action"
              icon-variant="error"
              message="Slotted error state message"
              title="Slotted error state title"
            />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state">
        <KTableView
          :data="[]"
          :headers="headers()"
        >
          <template #empty-state>
            <KEmptyState
              action-button-text="Slotted empty state action"
              message="Slotted empty state message"
              title="Slotted empty state title"
            />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state-action-icon">
        <KTableView
          :data="[]"
          empty-state-action-message="Empty state action"
          :headers="headers()"
        >
          <template #empty-state-action-icon>
            <AddIcon />
          </template>
        </KTableView>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../../components/SandboxSectionComponent.vue'
import type { TableHeader, TableData, TableDataEntry, TableSortPayload } from '@/types'
import SandboxTableViewActions from './SandboxTableViewActions.vue'
import { AddIcon } from '@kong/icons'

const headers = (hidable: boolean = false, sortable: boolean = false): TableHeader[] => {
  return [
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username', tooltip: 'Columns with a tooltip.', sortable },
    { key: 'email', label: 'Email', hidable },
    { key: 'actions', label: 'Row actions' },
  ]
}

const tableData: TableData = [
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

const sortedData = ref<TableData>(tableData)

const tableDataWithLinks = tableData.map((item, i) => {
  return {
    ...item,
    ...(i === 0 && { to: { name: 'home' } }),
    ...(i === 1 && { to: 'https://kongponents.konghq.com/', target: '_blank' }),
  }
})

const onRowClick = (row: any) => {
  alert(`Row clicked:' ${JSON.stringify(row)}`)
}

const sortData = (sortData: TableSortPayload): void => {
  const data = [...tableData]
  const { sortColumnKey, sortColumnOrder } = sortData || { sortColumnKey: 'username', sortColumnOrder: 'asc' }

  data.sort((a: TableDataEntry, b: TableDataEntry) => {
    if (sortColumnKey === 'username') {
      if (sortColumnOrder === 'asc') {
        if (a.username > b.username) {
          return 1
        } else if (a.username < b.username) {
          return -1
        }

        return 0
      } else {
        if (a.username > b.username) {
          return -1
        } else if (a.username < b.username) {
          return 1
        }

        return 0
      }
    }

    return 0
  })

  sortedData.value = data
}
</script>

<style lang="scss" scoped>
.k-table-view-sandbox {
  .horizontal-container {
    display: flex;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }

  .username-link {
    text-transform: lowercase;
  }
}
</style>
