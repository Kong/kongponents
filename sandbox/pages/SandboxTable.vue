<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTable"
  >
    <KTable
      :fetcher="fetcher"
      :headers="[
        { key: 'name', label: 'Name' },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'actions', hideLabel: true }
      ]"
      :initial-fetcher-params="{
        pageSize: 30
      }"
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
    </KTable>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { MoreIcon } from '@kong/icons'

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
