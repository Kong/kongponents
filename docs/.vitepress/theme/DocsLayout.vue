<template>
  <MyLayout>
    <template #nav-bar-content-after>
      <DocsThemePicker />
    </template>
  </MyLayout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import DocsThemePicker from './components/DocsThemePicker.vue'

const { Layout: MyLayout } = DefaultTheme
</script>
