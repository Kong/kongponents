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
      <SandboxSectionComponent title="hasHover & emptyStateIconVariant & emptyStateTitle & emptyStateMessage & emptyStateActionMessage & emptyStateActionRoute">
        <KComponent
          v-slot="{ data }"
          :data="{ tableKey: 0, tableHasHover: false, tableEmptyState: false }"
        >
          <div class="horizontal-container">
            <KInputSwitch
              v-model="data.tableHasHover"
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
            empty-state-action-message="Emty state message"
            empty-state-action-route="/"
            empty-state-icon-variant="kong"
            empty-state-message="Empty state message"
            empty-state-title="Empty state title"
            :fetcher="data.tableEmptyState ? emptyFetcher : fetcher"
            :has-hover="data.tableHasHover"
            :headers="headers()"
          >
            <template #actions>
              <SandboxTableActions />
            </template>
          </KTable>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="loading & resizeColumns & error & errorStateTitle & errorStateMessage & errorStateActionMessage & errorStateActionRoute">
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
            error-state-action-message="Error state action"
            error-state-action-route="/"
            error-state-message="Error state message"
            error-state-title="Error state title"
            :fetcher="fetcher"
            :has-error="data.tableErrorState"
            :headers="headers(true)"
            :is-loading="data.tableLoadingState"
            resize-columns
          >
            <template #actions>
              <SandboxTableActions />
            </template>
          </KTable>
        </KComponent>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../../components/SandboxSectionComponent.vue'
import SandboxTableActions from './SandboxTableActions.vue'

const headers = (hidable: boolean = false) => {
  return [
    { key: 'name', label: 'Full Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email', hidable },
    { key: 'actions', hideLabel: true },
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
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-50;
}
</style>
