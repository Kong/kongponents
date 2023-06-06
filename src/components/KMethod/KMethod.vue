<template>
  <KBadge
    :background-color="backgroundColor || methodBadgeColors[method].backgroundColor"
    class="k-method"
    :class="`method-${method}`"
    :color="color || methodBadgeColors[method].color"
    :shape="appearance === 'rectangular' ? 'rectangular' : 'rounded'"
  >
    {{ methodLabel }}
  </KBadge>
</template>

<script lang="ts">
import { PropType, computed } from 'vue'
import type { Method, MethodAppearance } from '@/types'

export const methods: Method[] = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options', 'trace', 'connect', 'custom']

export const shapes: MethodAppearance[] = ['rounded', 'rectangular']
</script>

<script setup lang="ts">
const props = defineProps({
  method: {
    type: String as PropType<Method>,
    required: true,
    validator: (value: string): boolean => {
      return methods.includes(value as Method)
    },
    default: 'post',
  },
  appearance: {
    type: String as PropType<MethodAppearance>,
    required: false,
    validator: (value: string): boolean => {
      return shapes.includes(value as MethodAppearance)
    },
    default: 'rounded',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  color: {
    type: String,
    required: false,
    default: '',
  },
  backgroundColor: {
    type: String,
    required: false,
    default: '',
  },
})

const methodLabel = computed((): string => {
  return props.label || props.method.toUpperCase()
})

interface MethodBadgeColors {
  color: string
  backgroundColor: string
}

const methodBadgeColors = computed((): Record<string, MethodBadgeColors> => {
  return {
    get: {
      color: 'var(--petrol-200, color(petrol-200))',
      backgroundColor: 'var(--petrol-100, color(petrol-100))',
    },
    post: {
      color: 'var(--green-700, color(green-700))',
      backgroundColor: 'var(--green-100, color(green-100))',
    },
    put: {
      color: 'var(--yellow-600, color(yellow-600))',
      backgroundColor: 'var(--yellow-100, color(yellow-100))',
    },
    patch: {
      color: 'var(--teal-500, color(teal-500))',
      backgroundColor: 'var(--teal-100, color(teal-100))',
    },
    delete: {
      color: 'var(--red-700, color(red-700))',
      backgroundColor: 'var(--red-100, color(red-100))',
    },
    head: {
      color: 'var(--yellow-600, color(yellow-600))',
      backgroundColor: 'var(--yellow-200, color(yellow-200))',
    },
    options: {
      color: 'var(--steel-700, color(steel-700))',
      backgroundColor: 'var(--steel-200, color(steel-200))',
    },
    trace: {
      color: 'var(--white, color(white))',
      backgroundColor: 'var(--steel-500, color(steel-500))',
    },
    connect: {
      color: 'var(--purple-400, color(purple-400))',
      backgroundColor: 'var(--purple-100, color(purple-100))',
    },
    custom: {
      color: 'var(--white, color(white))',
      backgroundColor: 'var(--steel-500, color(steel-500))',
    },
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

</style>
