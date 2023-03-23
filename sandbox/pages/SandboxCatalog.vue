<template>
  <KCatalog
    :fetcher="fetcher"
  />
</template>

<script setup lang="ts">
import { KCatalog } from '@/components'

const fetcher = async (): Promise<any> => {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const responseData = await response.json()
  const catalogData = responseData.map((item: { name: string, email: string }) => {
    return {
      title: item.name,
      description: item.email,
    }
  })

  return {
    data: catalogData,
    total: catalogData.length,
  }
}
</script>
