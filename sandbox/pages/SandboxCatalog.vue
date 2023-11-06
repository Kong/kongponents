<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KCatalog"
  >
    <KCatalog
      :fetcher="fetcher"
    />
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'

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
