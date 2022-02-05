<template>
  <h1>Kongponents Vite</h1>
  <KLabel required>
    This is a label
  </KLabel>
  <br>
  <KButton>Button content</KButton>

  <div class="text-white bg-indigo-500 mx-auto my-4 px-4 py-4 rounded-xl max-w-sm">
    <p>This text block lets you know TailwindCSS is being properly imported.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
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
