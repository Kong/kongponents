<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KAlert"
  >
    <KAlert alert-message="This is an alert" />
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
</script>
