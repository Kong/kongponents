<template>
  <div>
    <KTooltip
      :text="tooltipContent"
    >
      <div
        ref="pillRef"
        class="interactive-pill"
        :class="pillState"
        data-testid="interactive-pill"
        tabindex="0"
        v-bind="$attrs"
        @blur="onPillBlur"
        @click="onPillTrigger"
        @focus="onPillFocus"
        @keydown.enter="onPillTrigger"
      >
        <div
          ref="labelRef"
          class="label"
        >
          <span
            class="base-label"
            data-testid="interactive-pill-base-label"
          >
            {{ fullLabel }}
          </span>

          <span
            class="content-label"
            data-testid="interactive-pill-content-label"
          >
            {{ contentLabel }}
          </span>
        </div>

        <div
          v-if="hasContent"
          ref="clearRef"
          class="pill-icon clear-icon"
          data-testid="interactive-pill-clear-icon"
          tabindex="0"
          @blur="onClearBlur"
          @click.prevent.stop="onClear"
          @focus="onClearFocus"
          @keydown.enter.prevent.stop="onClear"
        >
          <div
            class="clear-focus-highlight"
            data-testid="interactive-pill-clear-focus"
          >
            <slot name="clearIcon">
              <CloseIcon
                decorative
                size="16"
              />
            </slot>
          </div>
        </div>
        <div
          v-else
          class="pill-icon open-icon"
          data-testid="interactive-pill-open-icon"
        >
          <slot name="openIcon">
            <ChevronDownIcon
              decorative
              size="16"
            />
          </slot>
        </div>
      </div>
    </KTooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { ChevronDownIcon, CloseIcon } from '@kong/icons'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

// we want to manually specify where the attrs get inherited to
defineOptions({ inheritAttrs: false })
const $attrs = useAttrs()

const {
  label,
  clearFocus = false,
  contentLabel = undefined,
  delimiter = ': ',
  pillFocus = false,
  tooltipText = undefined,
} = defineProps<{
  label: string
  clearFocus?: boolean
  contentLabel?: string
  delimiter?: string
  pillFocus?: boolean
  tooltipText?: string
}>()

const hasContent = computed<boolean>(() => !!contentLabel)
const browserClearFocus = ref(false)
const browserPillFocus = ref(false)
const pillRef = useTemplateRef('pillRef')
const clearRef = useTemplateRef('clearRef')

const emit = defineEmits<{
  (e: 'trigger'): void
  (e: 'clear'): void
}>()

const fullLabel = computed<string>(() => {
  return hasContent.value ? `${label}${delimiter}` : label
})

const truncated = ref(false)
const labelRef = useTemplateRef('labelRef')
watch(() => [fullLabel.value, contentLabel], async () => {
  await nextTick()
  truncated.value = labelRef.value
    ? labelRef.value.scrollWidth > labelRef.value.clientWidth
    : false
}, { immediate: true })

const tooltipContent = computed<string>(() => {
  if (pillFocus || clearFocus) {
    // while focused, a tooltip is distracting from the content the focused
    // state is supposed to be displaying/manipulating.
    return ''
  }

  if (tooltipText !== undefined) {
    return tooltipText
  }

  return hasContent.value && truncated.value
    ? `${fullLabel.value}${contentLabel}`
    : '' // no tooltip needed if there's no content
})

const pillState = computed<string>(() => {
  const contentClass = hasContent.value ? 'has-content' : 'no-content'
  const pillFocusClass = pillFocus || browserPillFocus.value
    ? 'focused'
    : 'unfocused'

  const clearFocusClass = (clearFocus || browserClearFocus.value)
    && !pillFocus && !browserPillFocus.value
    ? 'clear-focused' // only clear-focused if the pill itself isn't focused
    : 'clear-unfocused'
  return `${contentClass} ${pillFocusClass} ${clearFocusClass}`
})

const onPillFocus = () => {
  browserPillFocus.value = true
}

const onPillBlur = () => {
  browserPillFocus.value = false
}

const onClearFocus = () => {
  browserClearFocus.value = true
}

const onClearBlur = () => {
  browserClearFocus.value = false
}

const onPillTrigger = () => {
  emit('trigger')
  if (browserPillFocus.value) {
    pillRef.value?.blur()
  }
}

const onClear = () => {
  emit('clear')
  if (browserClearFocus.value) {
    clearRef.value?.blur()
  }
}
</script>

<style lang="scss" scoped>
$kui-shadow-focus-narrow: 0 0 0 2px rgba($kui-color-background-primary, 0.2);

.interactive-pill {
  align-items: stretch;
  border: 1px solid transparent;
  border-radius: $kui-border-radius-20;
  box-shadow: 0 0 0 0 transparent;
  cursor: pointer;
  display: inline-flex;
  font-size: $kui-font-size-20;
  max-width: 240px;
  overflow: hidden;
  transition: box-shadow 0.1s ease-in;
  white-space: nowrap;

  .label {
    line-height: 16px;
    overflow: hidden;
    padding: $kui-space-20 $kui-space-20 $kui-space-20 $kui-space-40;
    text-overflow: ellipsis;

    .base-label {
      font-weight: 600;
    }

    .content-label {
      font-weight: 700;
    }
  }

  .pill-icon {
    align-items: center;
    display: flex;
    flex-shrink: 0;
    padding-left: $kui-space-20;
    padding-right: $kui-space-20;
  }

  .label,
  .pill-icon {
    transition: all 0.2s ease-in;
  }

  &.no-content {
    background-color: $kui-color-background-neutral-weakest;
    border: 1px dashed $kui-color-border;
    color: $kui-color-text-neutral-stronger;
  }

  &.has-content {
    background-color: $kui-color-background-primary-weakest;
    border: 1px solid $kui-color-border-primary;
    color: $kui-color-text-primary;
  }

  &:focus,
  .clear-icon:focus {
    // no default browser styles for focus state
    box-shadow: none;
    outline: none;
  }

  &.focused {
    // more specific styles for pill focus when pillFocus true
    border: 1px solid $kui-color-border-primary;
    box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    outline: none;
  }

  &.clear-focused .pill-icon .clear-focus-highlight {
    // more specific styles for clear focus when clearFocus true
    border-radius: $kui-border-radius-20;
    box-shadow: var(--kui-shadow-focus-narrow, $kui-shadow-focus-narrow);
  }

  &.unfocused.no-content:hover {
    background-color: $kui-color-background-primary-weakest;
    border: 1px solid $kui-color-border-primary;
  }

  &.unfocused.has-content {
    .label:hover,
    .label:hover + .clear-icon,
    .clear-icon:hover {
      background-color: $kui-color-background-primary-weaker;
      color: $kui-color-text-primary-stronger;
    }
  }

  :deep(#{$kongponentsKongIconSelector}) {
    height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
    width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
  }
}
</style>
