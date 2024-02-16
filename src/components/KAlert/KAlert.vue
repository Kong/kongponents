<template>
  <div class="k-alert">
    <!-- TODO -->
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { AlertAppearance } from '@/types'
import { AlertAppearances } from '@/types'

defineProps({
  message: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  appearance: {
    type: String as PropType<AlertAppearance>,
    default: 'info',
    validator: (value: AlertAppearance): boolean => {
      return Object.values(AlertAppearances).includes(value)
    },
  },
  hideIcon: {
    type: Boolean,
    default: true,
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['dismiss'])
</script>

<style lang="scss" scoped>
/* Component mixins */

/* Component styles */
.k-alert {
  // TODO
}
</style>
