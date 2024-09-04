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
      <SandboxSectionComponent title="rowHover & emptyStateIconVariant & emptyStateTitle & emptyStateMessage & emptyStateActionMessage & emptyStateActionRoute & emptyStateButtonAppearance & maxHeight">
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
            max-height="300"
            :pagination-attributes="{ totalCount: sortedData.length }"
            :row-hover="data.tableRowHover"
            @sort="sortData"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="All rows in this table are clickable."
        title="loading & resizeColumns & error & errorStateTitle & errorStateMessage & errorStateActionMessage & errorStateActionRoute & hidePagination"
      >
        <KComponent
          v-slot="{ data }"
          :data="{ tableLoadingState: false, tableErrorState: false, hidePagination: false }"
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
            <KInputSwitch
              v-model="data.hidePagination"
              label="Hide pagination"
            />
          </div>

          <KTableView
            :data="tableData"
            empty-state-action-message="Add new item"
            :error="data.tableErrorState"
            error-state-action-message="Error state action"
            error-state-action-route="/"
            error-state-message="Error state message"
            error-state-title="Error state title"
            :headers="headers(true)"
            :hide-pagination="data.hidePagination"
            :loading="data.tableLoadingState"
            :pagination-attributes="{ totalCount: tableData.length }"
            resize-columns
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (router-link)">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
          :row-link="getRowLinksRouter"
        >
          <template #action-items>
            <SandboxTableViewActions />
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
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="rowLink (anchor)">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
          :row-link="getRowLinksAnchor"
        >
          <template #action-items>
            <SandboxTableViewActions />
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
        </KTableView>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="column header & column tooltip & cell"
      >
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
        >
          <template #column-username>
            Username

            <KBadge>Beta</KBadge>
          </template>
          <template #tooltip-email>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
          <template #email="{ rowValue }">
            <KCopy :text="rowValue" />
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="toolbar">
        <KTableView
          :data="tableData"
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
        >
          <template #toolbar>
            <KInput />
            <KButton size="large">
              <AddIcon /> Add user
            </KButton>
          </template>
          <template #action-items>
            <SandboxTableViewActions />
          </template>
        </KTableView>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error-state">
        <KTableView
          :data="tableData"
          error
          :headers="headers()"
          :pagination-attributes="{ totalCount: tableData.length }"
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

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="Bulk actions">
        <div class="resizable-table">
          <KTableView
            :data="paginatedData"
            :headers="headers(true, false, true)"
            :pagination-attributes="{ totalCount: basicPaginatedData.length, pageSizes: [5, 10] }"
            resize-columns
            :row-bulk-action="getRowBulkAction"
            @bulk-actions-select="onBulkActionsSelect"
            @page-change="onPageChange"
            @page-size-change="onPageSizeChange"
          >
            <template #bulk-action-items>
              <SandboxTableViewActions :count="selectedData.length" />
            </template>
            <template #action-items>
              <SandboxTableViewActions />
            </template>
          </KTableView>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import SandboxTitleComponent from '../../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../../components/SandboxSectionComponent.vue'
import type { TableHeader, TableViewData, TableSortPayload, RowLink, PageChangeData, PageSizeChangeData, RowBulkAction } from '@/types'
import SandboxTableViewActions from './SandboxTableViewActions.vue'
import { AddIcon } from '@kong/icons'

const headers = (hidable: boolean = false, sortable: boolean = false, bulkActions: boolean = false): TableHeader[] => {
  return [
    { key: 'actions', label: 'Row actions' },
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username', tooltip: 'Columns with a tooltip.', sortable },
    { key: 'email', label: 'Email', hidable },
    ...(bulkActions ? [{ key: 'bulkActions', label: 'Bulk actions' }] : []),
  ]
}

const tableData: TableViewData = [
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

const sortedData = ref<TableViewData>(tableData)

const onRowClick = (row: any) => {
  alert(`Row clicked:' ${JSON.stringify(row)}`)
}

const sortData = (sortData: TableSortPayload): void => {
  const data = [...tableData]
  const { sortColumnKey, sortColumnOrder } = sortData || { sortColumnKey: 'username', sortColumnOrder: 'asc' }

  data.sort((a: Record<string, any>, b: Record<string, any>) => {
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

const getRowLinksRouter = (row: Record<string, any>): RowLink => ({
  // using static route for demonstration purposes
  // but you can generate dynamic routes based on the row data
  to: { name: 'home' }, // pass a string to render the link as an anchor element instead of a router-link
  target: '_blank',
})

const getRowLinksAnchor = (row: Record<string, any>): RowLink => ({
  to: 'https://kongponents.konghq.com/',
  target: '_blank',
})

const extraRecords: TableViewData = [
  {
    id: 11,
    name: 'Chris Lo',
    username: 'Krislow',
    email: 'dj@kris.low',
  },
  {
    id: 12,
    name: 'Vitaliy Yarmak',
    username: 'Tamarack',
    email: 'Right@sail.xyz',
  },
]
const basicPaginatedData: TableViewData = [...tableData, ...extraRecords]
const paginatedPageSize = ref<number>(5)
const paginatedData = ref<TableViewData>(basicPaginatedData.slice(0, paginatedPageSize.value))
const onPageChange = ({ page }: PageChangeData) => {
  if (page === 1) {
    paginatedData.value = basicPaginatedData.slice(0, paginatedPageSize.value)
  } else {
    paginatedData.value = basicPaginatedData.slice((paginatedPageSize.value * (page - 1)), (paginatedPageSize.value * (page - 1)) + paginatedPageSize.value)
  }
}
const onPageSizeChange = ({ pageSize }: PageSizeChangeData) => {
  paginatedPageSize.value = pageSize
}

const selectedData = ref<TableViewData>([])
const onBulkActionsSelect = (data: TableViewData) => {
  console.log('Selected data:', data)
  selectedData.value = data
}

const getRowBulkAction = (data: Record<string, any>): RowBulkAction => {
  if (data.id === 2) {
    return false
  }

  if (data.id === 3) {
    return { disabled: true }
  }

  if (data.id === 4) {
    return {
      disabled: true,
      disabledTooltip: 'This row is disabled.',
    }
  }

  return true
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

  .resizable-table {
    max-width: 100%;
    min-width: 515px;
    overflow-x: auto;
    resize: horizontal;
  }
}
</style>
