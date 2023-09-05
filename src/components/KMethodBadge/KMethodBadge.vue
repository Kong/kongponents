<template>
  <KBadge
    :background-color="methodBadgeColors[method].backgroundColor"
    class="k-method-badge"
    :class="[ `method-${method}`, { 'k-method-toggle': isToggle }]"
    :color="methodBadgeColors[method].color"
    max-width="auto"
    :shape="isToggle ? 'rounded' : isRounded ? 'rounded' : 'rectangular'"
    v-on="{ click: isToggle ? toggleValue : undefined }"
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
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import { MethodsArray } from '@/types'
import type { Method, MethodBadgeColors } from '@/types'
</script>

<script setup lang="ts">
import {
  KUI_METHOD_COLOR_BACKGROUND_CONNECT,
  KUI_METHOD_COLOR_BACKGROUND_DELETE,
  KUI_METHOD_COLOR_BACKGROUND_GET,
  KUI_METHOD_COLOR_BACKGROUND_HEAD,
  KUI_METHOD_COLOR_BACKGROUND_OPTIONS,
  KUI_METHOD_COLOR_BACKGROUND_PATCH,
  KUI_METHOD_COLOR_BACKGROUND_POST,
  KUI_METHOD_COLOR_BACKGROUND_PUT,
  KUI_METHOD_COLOR_BACKGROUND_TRACE,
  KUI_COLOR_BACKGROUND_NEUTRAL_STRONG,
  KUI_METHOD_COLOR_TEXT_CONNECT,
  KUI_METHOD_COLOR_TEXT_DELETE,
  KUI_METHOD_COLOR_TEXT_GET,
  KUI_METHOD_COLOR_TEXT_HEAD,
  KUI_METHOD_COLOR_TEXT_OPTIONS,
  KUI_METHOD_COLOR_TEXT_PATCH,
  KUI_METHOD_COLOR_TEXT_POST,
  KUI_METHOD_COLOR_TEXT_PUT,
  KUI_METHOD_COLOR_TEXT_TRACE,
  KUI_COLOR_TEXT_INVERSE,
} from '@kong/design-tokens'

const props = defineProps({
  method: {
    type: String as PropType<Method>,
    required: true,
    validator: (value: Method): boolean => {
      return MethodsArray.includes(value as Method)
    },
    default: 'custom',
  },
  isRounded: {
    type: Boolean,
    required: false,
    default: false,
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
      color: `var(--petrol-200, var(--kui-method-color-text-get, ${KUI_METHOD_COLOR_TEXT_GET}))`,
      backgroundColor: `var(--petrol-100, var(--kui-method-color-background-get, ${KUI_METHOD_COLOR_BACKGROUND_GET}))`,
    },
    post: {
      color: `var(--green-700, var(--kui-method-color-text-post, ${KUI_METHOD_COLOR_TEXT_POST}))`,
      backgroundColor: `var(--green-100, var(--kui-method-color-background-post, ${KUI_METHOD_COLOR_BACKGROUND_POST}))`,
    },
    put: {
      color: `var(--yellow-600, var(--kui-method-color-text-put, ${KUI_METHOD_COLOR_TEXT_PUT}))`,
      backgroundColor: `var(--yellow-100, var(--kui-method-color-background-put, ${KUI_METHOD_COLOR_BACKGROUND_PUT}))`,
    },
    patch: {
      color: `var(--teal-500, var(--kui-method-color-text-patch, ${KUI_METHOD_COLOR_TEXT_PATCH}))`,
      backgroundColor: `var(--teal-100, var(--kui-method-color-background-patch, ${KUI_METHOD_COLOR_BACKGROUND_PATCH}))`,
    },
    delete: {
      color: `var(--red-700, var(--kui-method-color-text-delete, ${KUI_METHOD_COLOR_TEXT_DELETE}))`,
      backgroundColor: `var(--red-100, var(--kui-method-color-background-delete, ${KUI_METHOD_COLOR_BACKGROUND_DELETE}))`,
    },
    head: {
      color: `var(--yellow-600, var(--kui-method-color-text-head, ${KUI_METHOD_COLOR_TEXT_HEAD}))`,
      backgroundColor: `var(--yellow-200, var(--kui-method-color-background-head, ${KUI_METHOD_COLOR_BACKGROUND_HEAD}))`,
    },
    options: {
      color: `var(--steel-700, var(--kui-method-color-text-options, ${KUI_METHOD_COLOR_TEXT_OPTIONS}))`,
      backgroundColor: `var(--steel-200, var(--kui-method-color-background-options, ${KUI_METHOD_COLOR_BACKGROUND_OPTIONS}))`,
    },
    trace: {
      color: `var(--white, var(--kui-method-color-text-trace, ${KUI_METHOD_COLOR_TEXT_TRACE}))`,
      backgroundColor: `var(--steel-500, var(--kui-method-color-background-trace, ${KUI_METHOD_COLOR_BACKGROUND_TRACE}))`,
    },
    connect: {
      color: `var(--purple-400, var(--kui-method-color-text-connect, ${KUI_METHOD_COLOR_TEXT_CONNECT}))`,
      backgroundColor: `var(--purple-100, var(--kui-method-color-background-connect, ${KUI_METHOD_COLOR_BACKGROUND_CONNECT}))`,
    },
    custom: {
      color: `var(--white, var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE}))`,
      backgroundColor: `var(--steel-500, var(--kui-color-background-neutral-strong, ${KUI_COLOR_BACKGROUND_NEUTRAL_STRONG}))`,
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
  display: flex;
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  justify-content: center;

  &.k-method-toggle {
    padding: var(--spacing-xxs, var(--kui-space-20, $kui-space-20));
    padding-left: var(--spacing-sm, var(--kui-space-50, $kui-space-50));
    --KInputSwitchLabel: v-bind('methodBadgeColors[method].color');

    :deep(.k-switch) {
      // disable pointer events to allow badge take care of toggling the value
      pointer-events: none;
    }
  }
}
</style>
