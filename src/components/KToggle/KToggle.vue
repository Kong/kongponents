<template>
  <slot
    v-if="$slots.default"
    :is-toggled="isToggled"
    :toggle="toggle"
  />
</template>

<script setup lang="ts">
import type { ToggleEmits, ToggleProps, ToggleSlots } from '@/types'
import { ref } from 'vue'

const { toggled } = defineProps<ToggleProps>()

const emit = defineEmits<ToggleEmits>()

const isToggled = ref(toggled)

const toggle = (): void => {
  isToggled.value = !isToggled.value
  emit('toggled', isToggled.value)
}

const slots = defineSlots<ToggleSlots>()

if (!slots.default) {
  console.error(`KToggle expects to have slot content.

Example usage:

<KToggle>
  <template #default="{ isToggled, toggle }">
    <button @click="toggle">
      {{ isToggled ? 'hello' : 'goodbye' }}
    </button>
  </template>
</KToggle>
`)
}
</script>
