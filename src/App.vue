<template>
  <h1>Kongponents Vite</h1>
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

    const openNotification = (options): void => {
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
