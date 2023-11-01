<template>
  <div class="k-copy">
    <span
      v-if="badge"
      class="copy-badge-text"
    >
      {{ badgeText }}
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
        :label="textTooltip"
        placement="bottomStart"
        position-fixed
      >
        <span>
          {{ textFormat }}
        </span>
      </KTooltip>

      <KTooltip
        class="text-icon-wrapper"
        :label="`${props.badgeText}` ? iconTitle : tooltipText"
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
import { computed, ref } from 'vue'
import { CopyIcon } from '@kong/icons'
import KClipboardProvider from '@/components/KClipboardProvider'
import KTooltip from '@/components/KTooltip/KTooltip.vue'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

const props = defineProps({
  /**
    * Text displayed before the copyable text when
    * `badge` is true
    */
  badgeText: {
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
    default: 'Copy',
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
    default: 'Copied',
  },
  /**
    * Number of characters to truncate at
    */
  truncationLimit: {
    type: Number,
    default: 8,
  },
})

const emit = defineEmits<{
  (e: 'copy', val: string): void
}>()

const hasSuccessTooltip = computed((): boolean => !!(props.copyTooltip && props.successTooltip))
const tooltipText = ref(props.copyTooltip)

const badgeTextLabel = computed((): string => {
  if (!props.badgeText) {
    return ''
  }

  // strip trailing colon from label if one exists
  return props.badgeText.replace(/:$/, '')
})

const iconTitle = computed(() => {
  if (props.badgeText) {
    return `Copy ${badgeTextLabel.value}`
  }
  return 'Copy'
})

const truncateLimitText = computed((): string | null => props.truncate ? `${props.text.substring(0, props.truncationLimit) + '...'}` : null)

// Computed for all dynamic classes
const truncateStyles = computed((): string | null => props.truncate ? 'copy-element' : null)
const badgeStyles = computed((): string | null => props.badge ? 'badge-styles' : null)
const truncateContent = computed((): string | null => props.truncate ? 'truncate-content' : null)
const useMono = computed((): string | null => props.badge ? null : 'monospace')

const textFormat = computed(() => {
  if (props.format === 'redacted') {
    return '*****'
  } else if (props.format === 'deleted') {
    return `*${props.text.substring(0, 5)}`
  }
  return (props.truncate && props.truncationLimit && truncateLimitText.value) ? truncateLimitText.value.replace(/^"(.*)"$/, '$1') : props.text
})

const updateTooltipText = (msg: string): void => {
  tooltipText.value = msg
  setTimeout(() => {
    tooltipText.value = props.copyTooltip
  }, 1800)
}

const copyIdToClipboard = (executeCopy: (prop: string) => boolean) => {
  if (!executeCopy(props.text)) {
    if (hasSuccessTooltip.value) {
      updateTooltipText('Failed to copy')
    }

    return
  }

  if (hasSuccessTooltip.value) {
    updateTooltipText(props.successTooltip)
    emit('copy', props.text)
  }
}
</script>

<style lang="scss" scoped>
.k-copy {
  align-items: center;
  display: flex;

  &-badge-text {
    margin-right: $kui-space-40;
  }

  .copy-element {
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
    background-color: #f9fafb;
    border-color: #d7d8fe;
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
    border-style: solid;
    border-width: var(--kui-border-width-10, $kui-border-width-10);
    color: #473cfb;
    display: inline-flex;
  }

  .copy-container {
    align-items: center;
    cursor: pointer;
    display: flex;
    font-size: $kui-font-size-20;
    padding: $kui-space-10 $kui-space-40;
    white-space: nowrap;
  }

  .monospace {
    font-family: var(--kui-font-family-code, $kui-font-family-code);
  }

  .text-icon-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
    margin-left: $kui-space-30;
  }

  .text-icon {
    display: flex;
  }

  .copy-badge-text {
    color: $kui-color-text-neutral;
    font-size: $kui-font-size-20;
    margin-right: $kui-space-20;
  }
}
</style>
