<template>
  <slot
    v-if="$slots.default"
    :is-toggled="isToggledWrapper[0]"
    :toggle="toggle"
  />
</template>

<script setup lang="ts">
import type { ToggleEmits, ToggleProps, ToggleSlots } from '@/types'
import { ref } from 'vue'

const { toggled } = defineProps<ToggleProps>()

const emit = defineEmits<ToggleEmits>()

const isToggled = ref(toggled)
// We need to wrap `isToggled` in an array to ensure it's not unref'd when passed to the slot
// in the template. It's cheaper than using a computed property.
const isToggledWrapper = [isToggled]

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
