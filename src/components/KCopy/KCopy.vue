<template>
  <div
    v-if="!isBadge"
    class="k-copy"
    :class="truncate ? null : 'copy-truncated'"
  >
    <component
      :is="!!contentTooltip ? 'KTooltip' : 'div'"
      v-if="format !== 'hidden'"
      v-bind="contentWrapperProps"
      :class="truncate ? null : 'copy-content'"
      data-testid="copy-content"
    >
      <div
        :class="[
          'content-container',
          truncate ? 'truncated-content' : 'non-truncated-content',
          monospace ? 'monospace' : null
        ]"
        :style="{ maxWidth: truncationLimit }"
      >
        {{ contentFormat }}
      </div>
    </component>

    <component
      :is="!!copyTooltip ? 'KTooltip' : 'div'"
      v-bind="buttonWrapperProps"
      class="content-icon-wrapper"
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
    </component>
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
    type: String,
    default: '8ch',
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

const contentWrapperProps = computed(() => {
  return props.contentTooltip
    ? {
      label: props.contentTooltip,
      positionFixed: true,
      placement: 'bottomStart',
    }
    : {
      title: props.content,
    }
})

const buttonWrapperProps = computed(() => {
  return props.copyTooltip
    ? {
      label: tooltipText.value,
      positionFixed: true,
      maxWidth: '500px',
      placement: 'bottomStart',
    }
    : {}
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
  } else {
    emit('copied', props.content)
  }
}
</script>

<style lang="scss" scoped>
.k-copy {
  display: flex;

  &.copy-truncated {
    display: flex;
    align-items: center;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
  }

  .truncated-content {
    margin-right: 1ch;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .non-truncated-content {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: inline-block;
  }

  .content-icon-wrapper {
    align-items: center;
    cursor: pointer;
    display: flex;
  }

  .content-icon {
    display: flex;
  }

  .copy-badge-text {
    color: $kui-color-text-neutral;
    font-size: $kui-font-size-20;
    margin-right: $kui-space-20;
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

  .id-badge-content .non-truncated-content{
    max-width: none !important;
  }
}
</style>
