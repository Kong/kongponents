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

  <KButton @click="openNotification('Adam message')">
    Show toaster
  </KButton>

  <div class="text-white bg-indigo-500 mx-auto my-4 px-4 py-4 rounded-xl max-w-sm">
    <p>This text block lets you know TailwindCSS is being properly imported.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const $toaster = getCurrentInstance()?.appContext.config.globalProperties.$toaster

    const openNotification = (options: Record<string, any> | string): void => {
      $toaster.open(options)
    }

    return {
      openNotification,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
