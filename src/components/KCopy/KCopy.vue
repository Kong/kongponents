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
      :class="{ 'copy-element': props.truncate || props.badge, 'badge-styles': badge }"
    >
      <KTooltip
        v-if="format !== 'hidden'"
        :class="[textTooltipClasses]"
        data-testid="copy-tooltip-wrapper"
        :label="textTooltipLabel"
        placement="bottomStart"
        position-fixed
      >
        <span
          class="copy-text"
          :class="{ 'monospace': monospace || !badge }"
        >
          {{ textFormat }}
        </span>
      </KTooltip>

      <KTooltip
        class="text-icon-wrapper"
        :label="tooltipText"
        max-width="500px"
        placement="bottomStart"
        position-fixed
      >
        <KClipboardProvider v-slot="{ copyToClipboard }">
          <CopyIcon
            :id="copyButtonElementId"
            class="text-icon"
            data-testid="copy-to-clipboard"
            :hide-title="!!copyTooltip || undefined"
            role="button"
            :size="KUI_ICON_SIZE_30"
            tabindex="0"
            @click.stop="copyIdToClipboard(copyToClipboard)"
          />
        </KClipboardProvider>
      </KTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'
import { CopyIcon } from '@kong/icons'
import KClipboardProvider from '@/components/KClipboardProvider'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import { v4 as uuid4 } from 'uuid'

const props = defineProps({
  /**
   * Text displayed before the copyable text when
   * `badge` is true
   */
  badgeLabel: {
    type: String,
    default: '',
  },
  /**
   * The copyable text
   */
  text: {
    type: String,
    required: true,
  },
  /**
   * Tooltip text displayed on hover over the `text`
   */
  textTooltip: {
    type: String,
    default: '',
  },
  /**
   * Tooltip text displayed on hover over copy button
   */
  copyTooltip: {
    type: String,
    default: '',
  },
  /**
   * Formatting for copyable text (default, hidden, redacted, deleted)
   */
  format: {
    type: String as PropType<'default' | 'hidden' | 'redacted' | 'deleted'>,
    required: false,
    default: 'default',
    validator: (val: string) => ['default', 'hidden', 'redacted', 'deleted'].includes(val),
  },
  /**
   * Whether or not to display as a badge
   */
  badge: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether or not to use monospace font
   */
  monospace: {
    type: Boolean,
    default: false,
  },
  /**
   * Whether or not the text should be truncated
   */
  truncate: {
    type: Boolean,
    default: false,
  },
  /**
   * Tooltip text displayed on successful copy
   */
  successTooltip: {
    type: String,
    default: 'Copied!',
  },
  /**
   * Number of characters to truncate at
   */
  truncationLimit: {
    type: Number,
    default: 8,
  },
})

const copyButtonElementId = computed((): string => uuid4())

const tooltipText = ref<string>('')
const nonSuccessText = computed((): string => {
  if (!props.badgeLabel || props.copyTooltip) {
    return props.copyTooltip || 'Copy'
  }

  // strip trailing colon from label if one exists
  return `Copy ${props.badgeLabel.replace(/:$/, '')}`
})

watch(nonSuccessText, (value: string): void => {
  tooltipText.value = value
}, { immediate: true })

const truncateLimitText = computed((): string | null => props.truncate ? `${props.text.substring(0, props.truncationLimit) + '...'}` : null)

// Computed for dynamic classes
const textTooltipClasses = computed((): string => {
  const tooltipWrapperClass = 'copy-tooltip-wrapper' // this selector is referenced in vars.scss - do not update without checking for usage in there first
  return `${tooltipWrapperClass} ${props.truncate || props.badge ? 'truncate-content' : ''}`
})

const textFormat = computed(() => {
  if (props.format === 'redacted') {
    return '*****'
  } else if (props.format === 'deleted') {
    return `*${props.text.substring(0, 5)}`
  }

  // This regex will only remove the quotes if they are the first and last characters of the string (truncateLimitText)
  return (props.truncate && props.truncationLimit && truncateLimitText.value) ? truncateLimitText.value.replace(/^"(.*)"$/, '$1') : props.text
})

const textTooltipLabel = computed((): string | undefined => {
  if (props.textTooltip) {
    return props.textTooltip
  }

  // don't show text tooltip if text is redacted or not truncated
  if (props.format === 'redacted' || !truncateLimitText.value) {
    return undefined
  }

  return props.text
})

const updateTooltipText = (msg?: string): void => {
  tooltipText.value = msg || props.successTooltip
  setTimeout(() => {
    tooltipText.value = nonSuccessText.value
  }, 1800)
}

const copyIdToClipboard = (executeCopy: (prop: string) => boolean) => {
  if (!executeCopy(props.text)) {
    updateTooltipText('Failed to copy')

    return
  }

  updateTooltipText()
}

const triggerCopy = () => {
  if (document.getElementById(copyButtonElementId.value)) {
    document.getElementById(copyButtonElementId.value)?.click()
  }
}

defineExpose({
  triggerCopy,
})
</script>

<style lang="scss" scoped>
/* Component styles */

.k-copy {
  align-items: center;
  display: flex;

  .copy-element {
    align-items: center;
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

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

    .text-icon:not(.k-button .k-copy .text-icon-wrapper .text-icon) {
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

  :deep(.k-popover-content) {
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  }
}
</style>
