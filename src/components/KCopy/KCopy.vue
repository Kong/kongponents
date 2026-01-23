<template>
  <div class="k-copy">
    <span
      v-if="badge && badgeLabel"
      class="copy-badge-text"
    >
      {{ badgeLabel }}
    </span>
    <div
      class="copy-container"
      :class="{ 'copy-element': truncate || badge, 'badge-styles': badge }"
    >
      <KTooltip
        v-if="format !== 'hidden'"
        :class="[textTooltipClasses]"
        data-testid="copy-tooltip-wrapper"
        max-width="500px"
        placement="bottom-start"
        :text="textTooltipLabel"
      >
        <div
          ref="copyTextElement"
          class="copy-text"
          :class="{ 'monospace': monospace || !badge }"
        >
          {{ textFormat }}
        </div>
      </KTooltip>

      <KTooltip
        class="text-icon-wrapper"
        max-width="500px"
        placement="bottom-start"
        :text="tooltipText"
      >
        <KClipboardProvider v-slot="{ copyToClipboard }">
          <button
            :id="copyButtonElementId"
            :aria-label="tooltipText"
            class="copy-to-clipboard-button"
            data-testid="copy-to-clipboard"
            type="button"
            @click.stop="copyIdToClipboard(copyToClipboard)"
          >
            <CopyIcon
              class="text-icon"
              decorative
              :size="KUI_ICON_SIZE_30"
            />
          </button>
        </KClipboardProvider>
      </KTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, useId, onBeforeUnmount } from 'vue'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'
import { CopyIcon } from '@kong/icons'
import KClipboardProvider from '@/components/KClipboardProvider/KClipboardProvider.vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import type { CopyProps } from '@/types'
import type { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

const {
  badgeLabel = '',
  text,
  textTooltip = '',
  copyTooltip = '',
  format = 'default',
  badge,
  monospace,
  truncate,
  successTooltip = 'Copied!',
  truncationLimit = 8,
} = defineProps<CopyProps>()

const copyButtonElementId = useId()

const tooltipText = ref<string>('')
const nonSuccessText = computed((): string => {
  if (!badgeLabel || copyTooltip) {
    return copyTooltip || 'Copy'
  }

  // strip trailing colon from label if one exists
  return `Copy ${badgeLabel.replace(/:$/, '')}`
})

watch(nonSuccessText, (value: string): void => {
  tooltipText.value = value
}, { immediate: true })

// Computed for dynamic classes
const textTooltipClasses = computed((): string => {
  const tooltipWrapperClass = 'copy-tooltip-wrapper' // this selector is referenced in vars.scss - do not update without checking for usage in there first
  return `${tooltipWrapperClass} ${(truncate && isTruncated.value) || badge ? 'truncate-content' : ''}`
})

const textFormat = computed(() => {
  if (format === 'redacted') {
    return '*****'
  } else if (format === 'deleted') {
    return `*${String(text || '').substring(0, 5)}`
  }

  // This regex will only remove the quotes if they are the first and last characters of the string (truncateLimitText)
  return (truncate && truncationLimit && truncateLimitText.value) ? truncateLimitText.value.replace(/^"(.*)"$/, '$1') : text
})

const textTooltipLabel = computed((): string | undefined => {
  if (textTooltip) {
    return textTooltip
  }

  // don't show text tooltip if text is redacted or not truncated
  if (format === 'redacted' || !isTruncated.value) {
    return undefined
  }

  return text
})

const updateTooltipText = (msg?: string): void => {
  tooltipText.value = msg || successTooltip
  setTimeout(() => {
    tooltipText.value = nonSuccessText.value
  }, 1800)
}

const copyIdToClipboard = async (executeCopy: typeof copyTextToClipboard) => {
  if (!await executeCopy(text)) {
    updateTooltipText('Failed to copy')

    return
  }

  updateTooltipText()
}

const copy = () => {
  if (document?.getElementById(copyButtonElementId)) {
    document?.getElementById(copyButtonElementId)?.click()
  }
}

defineExpose({
  copy,
})

const copyTextElement = ref<HTMLDivElement>()
const resizeObserver = ref<ResizeObserverHelper>()
const truncateLimitText = computed((): string | null => truncate && typeof truncationLimit === 'number' ? `${String(text || '').substring(0, truncationLimit) + '...'}` : null)
const isTruncated = ref<boolean>(false)
const setTruncation = (): void => {
  if (!truncate) {
    return
  }

  if (truncationLimit !== 'auto' && truncateLimitText.value) {
    isTruncated.value = true
  } else if (truncationLimit === 'auto' && copyTextElement.value) {
    isTruncated.value = copyTextElement.value?.offsetWidth < copyTextElement.value?.scrollWidth
  }
}

onMounted(() => {
  resizeObserver.value = ResizeObserverHelper.create(setTruncation)

  resizeObserver.value.observe(copyTextElement.value as HTMLDivElement)
})

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.unobserve(copyTextElement.value as HTMLDivElement)
  }
})
</script>

<style lang="scss" scoped>
/* Component styles */

.k-copy {
  align-items: center;
  display: flex;
  font-variant-ligatures: no-contextual;
  max-width: 100%; /** necessary for truncation */

  .copy-element {
    align-items: center;
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .copy-text {
      @include truncate;
    }

    .truncate-content {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .badge-styles {
    @include badgeWrapper;
    @include decorativeBadgeAppearance;
  }

  .copy-container {
    align-items: center;
    display: flex;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    gap: var(--kui-space-30, $kui-space-30);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    white-space: nowrap;
  }

  .monospace {
    font-family: var(--kui-font-family-code, $kui-font-family-code);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  }

  .text-icon-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;

    .text-icon:not(.k-button .k-copy .text-icon-wrapper .text-icon):not(.badge-styles .text-icon-wrapper .text-icon) {
      &:hover,
      &:focus {
        // only applies to non-badge as for badge the mixin takes care hover styles
        color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong) !important;
      }
    }
  }

  .copy-badge-text {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    margin-right: var(--kui-space-20, $kui-space-20);
  }

  .copy-to-clipboard-button {
    @include defaultButtonReset;
  }
}
</style>
