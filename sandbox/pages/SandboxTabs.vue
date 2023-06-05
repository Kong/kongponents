<template>
  <h2>Default behavior</h2>
  <KTabs
    :tabs="items"
  >
    <template
      v-for="item in items"
      :key="`${item.hash}-anchor`"
      #[`${item.hash}-anchor`]
    >
      {{ item.title }}
    </template>
    <template
      v-for="item in items"
      :key="`${item.hash}`"
      #[`${item.hash}`]
    >
      {{ item.title }}
    </template>
  </KTabs>

  <br>
  <hr>
  <br>

  <h2>Dynamic Router View</h2>
  <KTabs
    :has-panels="false"
    :tabs="items"
  >
    <template
      v-for="item in items"
      :key="`${item.hash}-anchor`"
      #[`${item.hash}-anchor`]
    >
      <router-link
        :to="{
          name: item.hash.split('?').shift(),
          hash: `#${item.hash.split('?').pop()}`,
        }"
      >
        {{ item.title }}
      </router-link>
    </template>
  </KTabs>
  <RouterView
    v-slot="{route}"
  >
    <h3>Router View content</h3>
    <p>{{ route.path }}{{ route.hash }}</p>
  </RouterView>
</template>

<script setup lang="ts">
import { KTabs } from '@/components'
const items = [
  {
    title: 'One',
    hash: 'tabs?one',
  },
  {
    title: 'Two',
    hash: 'tabs?two',
  },

]
</script>
