<template>
  <!-- Give KeepAlive a component boundary for arbitrary tab slot content. -->
  <slot />
</template>

<script setup lang="ts">
// KeepAlive needs a name to prune cached panels when caching is disabled.
defineOptions({ name: 'KTabsPanel' })
</script>
