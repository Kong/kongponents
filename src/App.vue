<template>
  <h1>Kongponents Vite</h1>
  <Krumbs
    :items="[
      {
        key: 'home',
        to: { path: '/' },
        title: 'Go Home',
        text: 'Home',
        icon: 'kong'
      },
      {
        key: 'button',
        to: { path: '/components/breadcrumbs.html' },
        title: 'Go to Button',
        text: 'Breadcrumbs'
      }
    ]"
  />
  <br>
  <Kooltip label="Tooltip">
    <KButton>Button content</KButton>
  </Kooltip>

  <br>

  <KButton @click="openNotification('Adam message')">
    Show toaster
  </KButton>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const $toaster = getCurrentInstance()?.appContext?.config?.globalProperties?.$toaster

const openNotification = (options: Record<string, any> | string): void => {
  // @ts-ignore
  $toaster.open(options)
}
</script>

<style>
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  text-align: center;
}
</style>
