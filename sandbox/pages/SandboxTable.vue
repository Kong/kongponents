<template>
  <KTable
    :fetcher="fetcher"
    :headers="[
      { key: 'name', label: 'Name' },
      { key: 'username', label: 'Username' },
      { key: 'email', label: 'Email' },
    ]"
    :initial-fetcher-params="{
      pageSize: 30
    }"
  />
</template>

<script setup lang="ts">
import { KTable } from '@/components'

const fetcher = async (params: Record<string, any>): Promise<any> => {
  console.log('params', params)
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()

  return {
    data: responseData,
    total: responseData.length,
    page: {
      total_count: 25,
      has_next_page: false,
      next_cursor: 'f1kSUVBZGURFAEdcGQ19Q1wSMWYOCA4cDRVdU0ZHE0FcF0NQQQ',
    },
  }
}
</script>
