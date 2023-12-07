<template>
  <div class="k-copy">
    <span
      v-if="badge && badgeLabel"
      class="copy-badge-text"
    >
      {{ badgeLabel }}
    </span>
    <div
      :class="[
        'copy-container',
        truncateStyles,
        badgeStyles
      ]"
    >
      <KTooltip
        v-if="format !== 'hidden'"
        class="copy-text"
        :class="[truncateContent, useMono]"
        data-testid="copy-text"
        :label="textTooltip ? textTooltip : textFormat"
        placement="bottomStart"
        position-fixed
      >
        <span>{{ textFormat }}</span>
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
            class="text-icon"
            data-testid="copy-to-clipboard"
            :hide-title="!!copyTooltip || undefined"
            role="button"
            :size="KUI_ICON_SIZE_40"
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
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

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
   * False if `badge` is true
   */
  monospace: {
    type: Boolean,
    default: true,
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

const tooltipText = ref('')
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

// Computed for all dynamic classes
const truncateStyles = computed((): string | null => props.truncate || props.badge ? 'copy-element' : null)
const badgeStyles = computed((): string | null => props.badge ? 'badge-styles' : null)
const truncateContent = computed((): string | null => props.truncate || props.badge ? 'truncate-content' : null)
const useMono = computed((): string | null => props.badge ? null : 'monospace')

const textFormat = computed(() => {
  if (props.format === 'redacted') {
    return '*****'
  } else if (props.format === 'deleted') {
    return `*${props.text.substring(0, 5)}`
  }
  // This regex will only remove the quotes if they are the first and last characters of the string (truncateLimitText)
  return (props.truncate && props.truncationLimit && truncateLimitText.value) ? truncateLimitText.value.replace(/^"(.*)"$/, '$1') : props.text
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
</script>

<style lang="scss" scoped>
.k-copy {
  align-items: center;
  display: flex;

  .copy-element {
    align-items: center;
    display: inline-flex;
    margin: var(--kui-space-0, $kui-space-0) var(--kui-space-30, $kui-space-30);
    overflow: hidden;
    padding: var(--kui-space-10, $kui-space-10) var(--kui-space-40, $kui-space-40);
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
    background-color: var(--kui-color-background-decorative-purple-weakest, $kui-color-background-decorative-purple-weakest);
    border-color: var(--kui-color-border-decorative-purple, $kui-color-border-decorative-purple);
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
    border-style: solid;
    border-width: var(--kui-border-width-10, $kui-border-width-10);
    color: var(--kui-color-text-decorative-purple, $kui-color-text-decorative-purple);
    display: inline-flex;
  }

  .copy-container {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    gap: var(--kui-space-30, $kui-space-30);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding: var(--kui-space-10, $kui-space-10) var(--kui-space-30, $kui-space-30);
    white-space: nowrap;
  }

  .monospace {
    font-family: var(--kui-font-family-code, $kui-font-family-code);
  }

  .text-icon-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  .text-icon {
    display: flex;
  }

  .copy-badge-text {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    margin-right: var(--kui-space-20, $kui-space-20);
  }
}
</style>
