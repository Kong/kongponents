<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTable"
  >
    <SandboxSectionComponent>
      <div class="horizontal-container">
        <KInputSwitch
          v-model="tableEmptyState"
          label="Show empty state"
        />
        <KInputSwitch
          v-model="tableErrorState"
          label="Show error state"
        />
      </div>

      <KTable
        :key="tableKey"
        empty-state-action-message="Add new item"
        :fetcher="fetcher"
        :has-error="tableErrorState"
        :headers="[
          { key: 'name', label: 'Full Name' },
          { key: 'username', label: 'Username' },
          { key: 'email', label: 'Email' },
          { key: 'actions', hideLabel: true }
        ]"
        :initial-fetcher-params="{
          pageSize: 30
        }"
        resize-columns
      >
        <template #actions>
          <KDropdown>
            <template #default>
              <KButton
                appearance="tertiary"
                size="small"
              >
                <MoreIcon />
              </KButton>
            </template>
            <template #items>
              <KDropdownItem>
                Edit
              </KDropdownItem>
              <KDropdownItem
                danger
                has-divider
              >
                Delete
              </KDropdownItem>
            </template>
          </KDropdown>
        </template>
        <template #empty-state-action-icon>
          <AddIcon />
        </template>
      </KTable>
    </SandboxSectionComponent>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { MoreIcon, AddIcon } from '@kong/icons'

const tableKey = ref<number>(0)

const tableEmptyState = ref<boolean>(false)
const tableErrorState = ref<boolean>(false)

const fetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: tableEmptyState.value ? [] : responseData,
    total: responseData.length,
  }
}

watch([tableEmptyState, tableErrorState], () => {
  tableKey.value++
})
</script>

<style lang="scss" scoped>
.horizontal-container {
  display: flex;
  flex-wrap: wrap;
  gap: $kui-space-50;
}
</style>
