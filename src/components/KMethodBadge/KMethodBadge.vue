<template>
  <KBadge
    :background-color="methodBadgeColors[method].backgroundColor"
    :border-color="methodBadgeColors[method].borderColor"
    class="k-method-badge"
    :class="[ `method-${method}`, { 'k-method-toggle': isToggle }]"
    :color="methodBadgeColors[method].color"
    :is-bordered="isToggle"
    max-width="auto"
    :shape="shape"
    v-on="isToggle ? { click: toggleValue } : {}"
  >
    <span v-if="!isToggle">{{ methodLabel }}</span>
    <KInputSwitch
      v-if="isToggle"
      v-model="switchValue"
      :label="methodLabel"
      label-position="left"
    />
  </KBadge>
</template>

<script lang="ts">
import { PropType, computed, ref, watch } from 'vue'
import { MethodsArray, ShapesArray } from '@/types'
import type { Method, MethodShape, MethodBadgeColors } from '@/types'
</script>

<script setup lang="ts">
const props = defineProps({
  method: {
    type: String as PropType<Method>,
    required: true,
    validator: (value: Method): boolean => {
      return MethodsArray.includes(value as Method)
    },
    default: 'custom',
  },
  shape: {
    type: String as PropType<MethodShape>,
    required: false,
    validator: (value: MethodShape): boolean => {
      return ShapesArray.includes(value as MethodShape)
    },
    default: 'rounded',
  },
  label: {
    type: String,
    required: false,
    default: '',
  },
  isToggle: {
    type: Boolean,
    required: false,
    default: false,
  },
  modelValue: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

// set initial value to prop value
const switchValue = ref<boolean>(props.modelValue)

const methodLabel = computed((): string => {
  return props.label || props.method.toUpperCase()
})

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
  switchValue.value = !switchValue.value
}

watch(switchValue, (value: boolean): void => {
  emit('update:modelValue', value)
})

watch(() => props.modelValue, (value: boolean): void => {
  switchValue.value = value
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-method-badge {
  &.k-method-toggle {
    padding: var(--spacing-xxs, spacing(xxs));
    padding-left: var(--spacing-sm, spacing(sm));
    --KInputSwitchLabel: v-bind('methodBadgeColors[method].color');

    :deep(.k-switch) {
      // disable pointer events to allow badge take care of toggling the value
      pointer-events: none;
    }
  }
}
</style>
