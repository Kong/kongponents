<template>
  <div
    class="k-empty-state"
    :class="[iconVariant]"
  >
    <div class="empty-state-content">
      <div class="empty-state-icon">
        <slot name="icon">
          <component
            :is="getEmptyStateIcon"
            :color="getIconColor"
            decorative
            :size="KUI_ICON_SIZE_60"
          />
        </slot>
      </div>
      <div
        v-if="title || $slots.title"
        class="empty-state-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
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
      v-if="(actionButtonVisible && actionButtonText) || $slots.action"
      class="empty-state-action"
    >
      <slot name="action">
        <KButton
          :disabled="actionButtonDisabled"
          type="button"
          @click="emit('click-action')"
        >
          {{ actionButtonText }}
        </KButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { AnalyticsIcon, WarningIcon, SearchIcon, KongIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_COLOR_TEXT_WARNING, KUI_ICON_SIZE_60 } from '@kong/design-tokens'
import KButton from '@/components/KButton/KButton.vue'
import { EmptyStateIconVariants } from '@/types'
import type { EmptyStateProps, EmptyStateEmits, EmptyStateSlots } from '@/types'

type EmptyStateIcon = typeof AnalyticsIcon // all icons are the same type so we can use any of them

const {
  title = '',
  message = '',
  actionButtonText = '',
  actionButtonVisible = true,
  actionButtonDisabled,
  iconVariant = EmptyStateIconVariants.Default,
} = defineProps<EmptyStateProps>()

const emit = defineEmits<EmptyStateEmits>()

defineSlots<EmptyStateSlots>()

const getEmptyStateIcon = computed((): EmptyStateIcon => {
  switch (iconVariant) {
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
  switch (iconVariant) {
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
  box-sizing: border-box;
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
