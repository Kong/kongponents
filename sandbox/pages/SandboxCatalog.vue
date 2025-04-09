<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCatalog"
  >
    <div class="kcatalog-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="loading">
        <KComponent
          v-slot="{ data }"
          :data="{ isLoading: true }"
        >
          <KInputSwitch
            v-model="data.isLoading"
            label="Loading"
          />
          <KCatalog
            :fetcher="fetcher"
            :loading="data.isLoading"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="cardSize & hidePaginationWhenOptional">
        <KCatalog
          card-size="small"
          :fetcher="fetcher"
        />
        <KCatalog
          card-size="large"
          :fetcher="fetcher"
          :hide-pagination-when-optional="true"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title">
        <KCatalog
          :fetcher="fetcher"
          title="Catalog"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="truncateDescription">
        <KComponent
          v-slot="{ data }"
          :data="{ isTruncated: true }"
        >
          <KInputSwitch
            v-model="data.isTruncated"
            label="Truncated"
          />
          <KCatalog
            :fetcher="fetcher"
            :truncate-description="data.isTruncated"
          >
            <template #card-body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </template>
          </KCatalog>
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="emptyStateTitle & emptyStateMessage & emptyStateActionRoute & emptyStateActionMessage & emptyStateIconVariant">
        <KCatalog
          empty-state-action-message="Empty state action"
          empty-state-action-route="/"
          empty-state-icon-variant="kong"
          empty-state-message="Empty state message"
          empty-state-title="Empty state title"
          :fetcher="emptyFetcher"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error & errorStateTitle & errorStateMessage & errorStateActionRoute & errorStateActionMessage">
        <KCatalog
          error
          error-state-action-message="Error state action"
          error-state-action-route="/"
          error-state-message="Error state message"
          error-state-title="Error state title"
          :fetcher="fetcher"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="toolbar">
        <KCatalog
          :fetcher="fetcher"
          title="Card with toolbar"
        >
          <template #toolbar>
            <KInput />
            <KButton size="large">
              Toolbar button
            </KButton>
          </template>
        </KCatalog>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="card-title & card-actions & card-body">
        <KCatalog :fetcher="fetcher">
          <template #card-title>
            Card title
          </template>
          <template #card-actions>
            <KButton
              icon
              size="small"
            >
              <KongIcon />
            </KButton>
          </template>
          <template #card-body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </template>
        </KCatalog>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="empty-state-action-icon">
        <KCatalog
          empty-state-action-message="Empty state action"
          :fetcher="emptyFetcher"
        >
          <template #empty-state-action-icon>
            <KongIcon />
          </template>
        </KCatalog>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'
import { KCatalogItem } from '@/components'

const fetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const responseData = await response.json()
  const catalogData: any[] = []
  responseData.every((item: { title: string, body: string }, index: number) => {
    if (index <= 9) {
      catalogData.push({
        title: item.title,
        description: item.body,
      })

      return true
    } else {
      return false
    }
  })

  return {
    data: catalogData,
    total: catalogData.length,
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
