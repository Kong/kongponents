<template>
  <section
    class="k-empty-state"
    :class="[iconVariant]"
  >
    <div class="empty-state-content">
      <div class="empty-state-icon">
        <slot name="icon">
          <component
            :is="getEmptyStateIcon"
            class="alert-icon"
            :color="getIconColor"
            :size="KUI_ICON_SIZE_60"
          />
        </slot>
      </div>
      <span
        v-if="title"
        class="empty-state-title"
      >
        {{ title }}
      </span>
      <div
        v-if="message || $slots.default"
        class="empty-state-message"
      >
        <slot name="default">
          <p>
            {{ message }}
          </p>
        </slot>
      </div>
    </div>
    <div
      v-if="actionButtonVisible && (actionButtonText || $slots.action)"
      class="empty-state-action"
    >
      <slot name="action">
        <KButton
          :disabled="actionButtonDisabled"
          @click="$emit('action-click')"
        >
          {{ actionButtonText }}
        </KButton>
      </slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'
import { AnalyticsIcon, WarningIcon, SearchIcon, KongIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_COLOR_TEXT_WARNING, KUI_ICON_SIZE_60 } from '@kong/design-tokens'
import KButton from '@/components/KButton/KButton.vue'
import { EmptyStateIconVariants } from '@/types'
import type { EmptyStateIconVariant } from '@/types'

type EmptyStateIcon = typeof AnalyticsIcon // all icons are the same type so we can use any of them

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  actionButtonVisible: {
    type: Boolean,
    default: true,
  },
  actionButtonText: {
    type: String,
    default: '',
  },
  actionButtonDisabled: {
    type: Boolean,
    default: false,
  },
  iconVariant: {
    type: String as PropType<EmptyStateIconVariant>,
    default: EmptyStateIconVariants.Default,
  },
})

defineEmits(['action-click'])

const getEmptyStateIcon = computed((): EmptyStateIcon => {
  switch (props.iconVariant) {
    case EmptyStateIconVariants.Default:
      return AnalyticsIcon
    case EmptyStateIconVariants.Error:
      return WarningIcon
    case EmptyStateIconVariants.Search:
      return SearchIcon
    case EmptyStateIconVariants.Kong:
      return KongIcon
    default:
      return AnalyticsIcon // default variant in case of invalid value
  }
})

const getIconColor = computed((): string => {
  // TODO: add color for other variants
  switch (props.iconVariant) {
    case EmptyStateIconVariants.Error:
      return KUI_COLOR_TEXT_WARNING
    default:
      return KUI_COLOR_TEXT_NEUTRAL
  }
})
</script>

<style lang="scss" scoped>
.k-empty-state {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  display: flex;
  flex-direction: column;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  gap: var(--kui-space-70, $kui-space-70);
  padding: var(--kui-space-90, $kui-space-90) var(--kui-space-90, $kui-space-90);
  width: 100%;

  .empty-state-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-50, $kui-space-50);
    text-align: center;
    width: 100%;

    .empty-state-icon {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);

      :deep(#{$kongponentsKongIconSelector}) {
        height: var(--kui-icon-size-60, $kui-icon-size-60) !important;
        width: var(--kui-icon-size-60, $kui-icon-size-60) !important;
      }
    }

    .empty-state-title {
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-50, $kui-font-size-50);
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      max-width: 570px; // limit width so the text stays readable if title is too long
    }

    .empty-state-message {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      max-width: 640px; // limit width so the message stays readable if title is too long

      p {
        margin: var(--kui-space-0, $kui-space-0);
      }
    }
  }

  .empty-state-action {
    align-items: center;
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
  }
}
</style>
