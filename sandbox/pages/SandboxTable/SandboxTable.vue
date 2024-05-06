<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTable"
  >
    <div class="ktable-sandbox">
      <SandboxSectionComponent>
        <iframe
          allowfullscreen
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FYze0SWXl5nKjR0rFdilljK%2FComponents%3Ftype%3Ddesign%26node-id%3D418%253A12464%26mode%3Ddesign%26t%3DLUYNbmqFH50qSmKC-1"
          style="border: 1px solid rgba(0, 0, 0, 0.1);"
          width="800"
        />
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="rowHover & emptyStateIconVariant & emptyStateTitle & emptyStateMessage & emptyStateActionMessage & emptyStateActionRoute & sortHandlerFunction">
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

          <KTable
            :key="data.tableKey"
            client-sort
            empty-state-action-message="Empty state action"
            empty-state-action-route="/"
            empty-state-icon-variant="kong"
            empty-state-message="Empty state message"
            empty-state-title="Empty state title"
            :fetcher="data.tableEmptyState ? emptyFetcher : fetcher"
            :headers="headers(false, true)"
            resize-columns
            :row-hover="data.tableRowHover"
            :sort-handler-function="sortHandlerFunction"
          >
            <template #actions>
              <SandboxTableActions />
            </template>
          </KTable>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="This table has clickable rows."
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

          <KTable
            empty-state-action-message="Add new item"
            :error="data.tableErrorState"
            error-state-action-message="Error state action"
            error-state-action-route="/"
            error-state-message="Error state message"
            error-state-title="Error state title"
            :fetcher="fetcher"
            :headers="headers(true)"
            :loading="data.tableLoadingState"
            resize-columns
            @row:click="(_event: any, row: any) => onRowClick(row)"
          >
            <template #actions>
              <SandboxTableActions />
            </template>
          </KTable>
        </KComponent>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="column header & column tooltip & cell">
        <KTable
          :fetcher="fetcher"
          :headers="headers()"
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
          <template #actions>
            <SandboxTableActions />
          </template>
        </KTable>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="toolbar">
        <KTable
          :fetcher="fetcher"
          :headers="headers()"
        >
          <template #toolbar>
            <KInput />
            <KButton size="large">
              <AddIcon /> Add user
            </KButton>
          </template>
          <template #actions>
            <SandboxTableActions />
          </template>
        </KTable>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error-state">
        <KTable
          error
          :fetcher="fetcher"
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
        </KTable>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state">
        <KTable
          :fetcher="emptyFetcher"
          :headers="headers()"
        >
          <template #empty-state>
            <KEmptyState
              action-button-text="Slotted empty state action"
              message="Slotted empty state message"
              title="Slotted empty state title"
            />
          </template>
        </KTable>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state-action-icon">
        <KTable
          empty-state-action-message="Empty state action"
          :fetcher="emptyFetcher"
          :headers="headers()"
        >
          <template #empty-state-action-icon>
            <AddIcon />
          </template>
        </KTable>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../../components/SandboxSectionComponent.vue'
import SandboxTableActions from './SandboxTableActions.vue'
import { AddIcon } from '@kong/icons'
import type { TableHeader } from '@/types'

const headers = (hidable: boolean = false, sortable: boolean = false): TableHeader[] => {
  return [
    { key: 'name', label: 'Full Name' },
    {
      key: 'username',
      label: 'Username',
      tooltip: 'Columns with a tooltip.',
      sortable,
      ...(sortable && { useSortHandlerFunction: true }),
    },
    { key: 'email', label: 'Email', hidable },
    { key: 'actions', label: 'Row actions', hideLabel: true },
  ]
}

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

const emptyFetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return {
    data: [],
    total: 0,
  }
}

const sortHandlerFunction = ({ key, sortColumnOrder, data }: any) => {
  return data.sort((a: any, b: any) => {
    if (key === 'username') {
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

    return data
  })
}

const onRowClick = (row: any) => {
  alert(`Row clicked:' ${JSON.stringify(row)}`)
}
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-50;
}
</style>
