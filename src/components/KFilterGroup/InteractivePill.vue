<template>
  <div>
    <KTooltip
      max-width="350"
      :text="tooltipContent"
    >
      <div
        class="interactive-pill"
        :class="pillState"
        data-testid="interactive-pill"
        v-bind="attrs"
      >
        <button
          ref="trigger"
          class="interactive-pill-trigger"
          data-testId="interactive-pill-trigger"
          type="button"
          @blur="onPillBlur"
          @click="onPillTrigger"
          @focus="onPillFocus"
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
            v-if="!hasContent"
            class="pill-icon open-icon"
            data-testid="interactive-pill-open-icon"
          >
            <slot name="open-icon">
              <ChevronDownIcon
                decorative
                :size="KUI_ICON_SIZE_30"
              />
            </slot>
          </div>
        </button>

        <button
          v-if="hasContent"
          ref="clear"
          class="pill-icon clear-icon"
          data-testid="interactive-pill-clear-icon"
          type="button"
          @blur="onClearBlur"
          @click="onClear"
          @focus="onClearFocus"
        >
          <div
            class="clear-focus-highlight"
            data-testid="interactive-pill-clear-focus"
          >
            <slot name="clear-icon">
              <CloseIcon
                decorative
                :size="KUI_ICON_SIZE_30"
              />
            </slot>
          </div>
        </button>
      </div>
    </KTooltip>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { ChevronDownIcon, CloseIcon } from '@kong/icons'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'

// we want to manually specify where the attrs get inherited to
defineOptions({ inheritAttrs: false })
const attrs = useAttrs()

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
const triggerRef = useTemplateRef('trigger')
const clearRef = useTemplateRef('clear')

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

  const clearFocusClass = clearFocus || browserClearFocus.value
    ? 'clear-focused'
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
    triggerRef.value?.blur()
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
@use "sass:color";
// `var()` can't be used inside `rgba()` unless you pull out the individual colors.
$shadowFocusNarrow: 0 0 0 2px rgba(
  var(--kui-color-background-primary,
  #{color.channel($kui-color-background-primary, "red", $space: rgb)},
  #{color.channel($kui-color-background-primary, "green", $space: rgb)},
  #{color.channel($kui-color-background-primary, "blue", $space: rgb)},
),
0.2);

.interactive-pill {
  align-items: stretch;
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  box-shadow: 0 0 0 0 transparent;
  display: inline-flex;
  max-width: 240px;
  overflow: hidden;
  transition: box-shadow $kongponentsTransitionDurTimingFunc;
  white-space: nowrap;

  .interactive-pill-trigger {
    cursor: pointer;
    display: flex;
    transition: all $kongponentsTransitionDurTimingFunc;
  }

  button {
    @include defaultButtonReset;
    overflow: hidden;
  }

  .label {
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    overflow: hidden;
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-20, $kui-space-20) var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);
    text-overflow: ellipsis;
    white-space: nowrap;

    .base-label {
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    }

    .content-label {
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
    }
  }

  .pill-icon {
    align-items: center;
    display: flex;
    flex-shrink: 0;
    padding-left: var(--kui-space-20, $kui-space-20);
    padding-right: var(--kui-space-20, $kui-space-20);
    transition: all $kongponentsTransitionDurTimingFunc;
  }

  &.no-content {
    background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
    border: var(--kui-border-width-10, $kui-border-width-10) dashed var(--kui-color-border, $kui-color-border);
    color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
  }

  &.has-content {
    background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-primary, $kui-color-border-primary);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
  }

  &:focus,
  button:focus {
    // no default browser styles for focus state
    box-shadow: none;
    outline: none;
  }

  &.focused {
    // more specific styles for pill focus when pillFocus true
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-primary, $kui-color-border-primary);
    box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    outline: none;
  }

  &.clear-focused .pill-icon .clear-focus-highlight {
    // more specific styles for clear focus when clearFocus true
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    box-shadow: $shadowFocusNarrow;
  }

  &.unfocused.no-content:hover {
    background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-primary, $kui-color-border-primary);
  }

  &.unfocused.has-content {
    .interactive-pill-trigger:hover,
    .interactive-pill-trigger:hover + .clear-icon,
    .clear-icon:hover {
      background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    }
  }

  :deep(#{$kongponentsKongIconSelector}) {
    height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
    width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
  }
}
</style>
