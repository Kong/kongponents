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
