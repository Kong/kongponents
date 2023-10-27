<template>
  <div
    v-if="!isBadge"
    class="k-copy"
    :class="truncate ? null : 'copy-truncated'"
  >
    <KTooltip
      v-if="format !== 'hidden'"
      :class="truncate ? null : 'copy-content'"
      data-testid="copy-content"
      :label="contentTooltip"
      placement="bottomStart"
      position-fixed
    >
      <div
        :class="[
          'content-container',
          truncate ? 'truncated-content' : 'non-truncated-content',
          monospace ? 'monospace' : null
        ]"
        :style="widthStyle"
      >
        {{ contentFormat }}
      </div>
    </KTooltip>

    <KTooltip
      class="content-icon-wrapper"
      :label="`${props.badgeText}` ? iconTitle : tooltipText"
      max-width="500px"
      placement="bottomStart"
      position-fixed
    >
      <KClipboardProvider v-slot="{ copyToClipboard }">
        <span
          data-testid="copy-to-clipboard"
          role="button"
          tabindex="0"
          @click.stop="copyIdToClipboard(copyToClipboard)"
        >
          <KIcon
            class="content-icon"
            :hide-title="!!copyTooltip || undefined"
            icon="copy"
            size="16"
            :title="iconTitle"
          />
        </span>
      </KClipboardProvider>
    </KTooltip>
  </div>

  <div
    v-else
    class="k-copy-badge"
  >
    <span
      v-if="isBadge"
      class="copy-badge-text"
    >
      {{ badgeText }}
    </span>
    <KBadge
      v-if="isBadge"
      appearance="custom"
      background-color="#f9fafb"
      border-color="#d7d8fe"
      class="id-badge"
      color="#473cfb"
      is-bordered
      shape="rectangular"
    >
      <KCopy
        :badge-text="badgeText"
        class="id-badge-content"
        :content="content"
        :content-tooltip="contentTooltip"
        :copy-tooltip="copyTooltip"
        :monospace="monospace"
        :success-tooltip="successTooltip"
        :truncate="truncate"
        :truncation-limit="truncationLimit"
      />
    </KBadge>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import KBadge from '@/components/KBadge/KBadge.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KClipboardProvider from '@/components/KClipboardProvider'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

const props = defineProps({
  // text displayed before the copyable content when `isBadge` is true
  badgeText: {
    type: String,
    default: '',
  },
  // the copyable text
  content: {
    type: String,
    required: true,
  },
  // tooltip text displayed on hover over the `content`
  contentTooltip: {
    type: String,
    default: '',
  },
  // tooltip text displayed on hover over copy button
  copyTooltip: {
    type: String,
    default: 'Copy',
  },
  // formatting for copyable content (default, hidden, redacted, deleted)
  format: {
    type: String as PropType<'default' | 'hidden' | 'redacted' | 'deleted'>,
    required: false,
    default: 'default',
    validator: (val: string) => ['default', 'hidden', 'redacted', 'deleted'].includes(val),
  },
  // whether or not to display as a badge
  isBadge: {
    type: Boolean,
    default: false,
  },
  // false if `isBadge` is true
  monospace: {
    type: Boolean,
    default: true,
  },
  // whether or not the content should be truncated
  truncate: {
    type: Boolean,
    default: false,
  },
  // tooltip text displayed on successful copy
  successTooltip: {
    type: String,
    default: 'Copied',
  },
  // number of characters to truncate at
  truncationLimit: {
    type: Number,
    default: 8,
  },
})

const emit = defineEmits<{
  (e: 'copied', val: string): void
}>()

const hasSuccessTooltip = computed((): boolean => !!(props.copyTooltip && props.successTooltip))
const tooltipText = ref(props.copyTooltip)

const iconTitle = computed(() => {
  if (props.badgeText) {
    return `Copy ${props.badgeText}`
  }
  return 'Copy'
})

const widthStyle = computed(() => {
  return {
    maxWidth: props.truncate ? props.truncationLimit + 'ch' : undefined,
  }
})

const contentFormat = computed(() => {
  if (props.format === 'redacted') {
    return '*****'
  } else if (props.format === 'deleted') {
    return `*${props.content.substring(0, 5)}`
  }
  return props.content
})

const updateTooltipText = (msg: string): void => {
  tooltipText.value = msg
  setTimeout(() => {
    tooltipText.value = props.copyTooltip
  }, 1800)
}

const copyIdToClipboard = (executeCopy: (prop: string) => boolean) => {
  if (!executeCopy(props.content)) {
    if (hasSuccessTooltip.value) {
      updateTooltipText('Failed to copy id to clipboard')
    }

    return
  }

  if (hasSuccessTooltip.value) {
    updateTooltipText(props.successTooltip)
    emit('copied', props.content)
  }
}
</script>

<style lang="scss" scoped>
.k-copy {
  display: flex;

  &.copy-truncated {
    align-items: center;
    display: flex;
  }

  .id-badge {
    cursor: pointer;
  }

  .monospace {
    font-family: var(--kui-font-family-code, $kui-font-family-code);
  }

  .content-container {
    margin-right: $kui-space-50;
    white-space: nowrap;
  }

  .copy-content {
    align-items: center;
    display: inline-flex;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .truncated-content {
    margin-right: 1ch;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .non-truncated-content {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-icon-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  .content-icon {
    display: flex;
  }
}
.k-copy-badge {
  :deep(.k-badge) {
    &.id-badge {
      .k-badge-text {
        max-width: 300px;
      }
    }
  }

  .copy-badge-text {
    color: $kui-color-text-neutral;
    margin-right: $kui-space-20;
  }

  .id-badge-content .non-truncated-content{
    max-width: none !important;
  }
}
</style>
