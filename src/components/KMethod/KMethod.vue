<template>
  <KBadge
    :background-color="backgroundColor || methodBadgeColors[method].backgroundColor"
    :border-color="borderColor || methodBadgeColors[method].borderColor"
    class="k-method"
    :class="[ `method-${method}`, isToggle ? 'k-method-toggle' : '']"
    :color="color || methodBadgeColors[method].color"
    :is-bordered="isToggle"
    max-width="auto"
    :shape="shape === 'rectangular' ? 'rectangular' : 'rounded'"
    v-on="isToggle ? { click: toggleValue } : {}"
  >
    <span v-if="!isToggle">{{ methodLabel }}</span>
    <KInputSwitch
      v-if="isToggle"
      v-model="modelValue"
      :label="methodLabel"
      label-position="left"
    />
  </KBadge>
</template>

<script lang="ts">
import { PropType, computed, ref, watch } from 'vue'
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
  shape: {
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
  borderColor: {
    type: String,
    required: false,
    default: '',
  },
  isToggle: {
    type: Boolean,
    required: false,
    default: false,
  },
  value: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const modelValue = ref<boolean>(props.value)

const methodLabel = computed((): string => {
  return props.label || props.method.toUpperCase()
})

interface MethodBadgeColors {
  color: string
  backgroundColor: string
  borderColor: string
}

const methodBadgeColors = computed((): Record<string, MethodBadgeColors> => {
  return {
    get: {
      color: 'var(--petrol-200, color(petrol-200))',
      backgroundColor: 'var(--petrol-100, color(petrol-100))',
      borderColor: 'var(--petrol-200, color(petrol-200))',
    },
    post: {
      color: 'var(--green-700, color(green-700))',
      backgroundColor: 'var(--green-100, color(green-100))',
      borderColor: 'var(--green-700, color(green-700))',
    },
    put: {
      color: 'var(--yellow-600, color(yellow-600))',
      backgroundColor: 'var(--yellow-100, color(yellow-100))',
      borderColor: 'var(--yellow-600, color(yellow-600))',
    },
    patch: {
      color: 'var(--teal-500, color(teal-500))',
      backgroundColor: 'var(--teal-100, color(teal-100))',
      borderColor: 'var(--teal-500, color(teal-500))',
    },
    delete: {
      color: 'var(--red-700, color(red-700))',
      backgroundColor: 'var(--red-100, color(red-100))',
      borderColor: 'var(--red-700, color(red-700))',
    },
    head: {
      color: 'var(--yellow-600, color(yellow-600))',
      backgroundColor: 'var(--yellow-200, color(yellow-200))',
      borderColor: 'var(--yellow-600, color(yellow-600))',
    },
    options: {
      color: 'var(--steel-700, color(steel-700))',
      backgroundColor: 'var(--steel-200, color(steel-200))',
      borderColor: 'var(--steel-700, color(steel-700))',
    },
    trace: {
      color: 'var(--white, color(white))',
      backgroundColor: 'var(--steel-500, color(steel-500))',
      borderColor: 'var(--steel-700, color(steel-700))',
    },
    connect: {
      color: 'var(--purple-400, color(purple-400))',
      backgroundColor: 'var(--purple-100, color(purple-100))',
      borderColor: 'var(--purple-400, color(purple-400))',
    },
    custom: {
      color: 'var(--white, color(white))',
      backgroundColor: 'var(--steel-500, color(steel-500))',
      borderColor: 'var(--steel-700, color(steel-700))',
    },
  }
})

const toggleValue = () => {
  modelValue.value = !modelValue.value
}

watch(modelValue, (value: boolean): void => {
  emit('update:modelValue', value)
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-method {
  &.k-method-toggle {
    padding: var(--spacing-xxs, spacing(xxs));
    padding-left: var(--spacing-sm, spacing(sm));
    --KInputSwitchLabel: v-bind('methodBadgeColors[method].color')

    :deep(.k-switch) {
      // disable pointer events to allow badge take care of toggling the value
      pointer-events: none;
    }
  }
}
</style>
