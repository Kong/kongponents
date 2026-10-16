<template>
  <MyLayout>
    <template #home-hero-before>
      <HomePage />
    </template>
    <template #nav-bar-content-after>
      <GitHubStars />
      <DocsThemePicker />
    </template>
  </MyLayout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import DocsThemePicker from './components/DocsThemePicker.vue'
import GitHubStars from './components/GitHubStars.vue'
import HomePage from './components/HomePage.vue'

const { Layout: MyLayout } = DefaultTheme
</script>
