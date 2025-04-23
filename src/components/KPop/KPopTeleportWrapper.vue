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
import type { PopTeleportWrapperProps, PopTeleportWrapperSlots } from '@/types'

const {
  useTeleport,
  target = null,
} = defineProps<PopTeleportWrapperProps>()

defineSlots<PopTeleportWrapperSlots>()
</script>
