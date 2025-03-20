<template>
  <template v-if="useTeleport">
    <Teleport :to="target">
      <slot />
    </Teleport>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<script setup lang="ts">
defineProps({
  useTeleport: {
    type: Boolean,
    default: false,
  },
  target: {
    type: [String, null],
    default: null,
  },
})
</script>
