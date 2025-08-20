<template>
  <div
    class="k-empty-state"
    :class="[iconVariant]"
  >
    <div class="empty-state-content">
      <div
        :aria-hidden="$slots.image ? undefined : 'true'"
        :class="iconContainerClass"
      >
        <slot name="image">
          <slot name="icon">
            <component
              :is="getEmptyStateIcon"
              :color="getIconColor"
              decorative
              :size="KUI_ICON_SIZE_60"
            />
          </slot>
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
            <slot name="action-button-icon" />

            {{ actionButtonText }}
          </KButton>
        </slot>
      </div>
    </div>
    <div
      v-if="features.length"
      class="empty-state-features-container"
    >
      <template
        v-for="(feature, idx) in features"
        :key="`feature-${componentId}-${feature.key || idx}`"
      >
        <KCard class="empty-state-feature-card">
          <template #title>
            <div
              v-if="feature.key && $slots[`feature-icon-${feature.key}`]"
              aria-hidden="true"
              class="feature-icon"
            >
              <slot :name="`feature-icon-${feature.key}`" />
            </div>

            <div class="card-header">
              {{ feature.title }}
            </div>
          </template>

          <div :title="feature.description">
            {{ feature.description }}
          </div>
        </KCard>
      </template>
    </div>
    <div
      v-if="$slots.footer"
      class="empty-state-footer-container"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useId } from 'vue'
import { AnalyticsIcon, WarningIcon, SearchIcon, KongIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_DECORATIVE_AQUA, KUI_COLOR_TEXT_NEUTRAL, KUI_COLOR_TEXT_WARNING, KUI_ICON_SIZE_60 } from '@kong/design-tokens'
import KButton from '@/components/KButton/KButton.vue'
import { EmptyStateIconVariants } from '@/types'
import type { EmptyStateProps, EmptyStateEmits, EmptyStateSlots } from '@/types'
import KCard from '@/components/KCard/KCard.vue'

type EmptyStateIcon = typeof AnalyticsIcon // all icons are the same type so we can use any of them

const {
  title = '',
  message = '',
  actionButtonText = '',
  actionButtonVisible = true,
  actionButtonDisabled,
  iconVariant = EmptyStateIconVariants.Default,
  iconBackground = false,
  features = [],
} = defineProps<EmptyStateProps>()

const emit = defineEmits<EmptyStateEmits>()

const slots = defineSlots<EmptyStateSlots>()

const componentId = useId()

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
  if (iconBackground) {
    return KUI_COLOR_TEXT_DECORATIVE_AQUA
  }

  switch (iconVariant) {
    case EmptyStateIconVariants.Error:
      return KUI_COLOR_TEXT_WARNING
    default:
      return KUI_COLOR_TEXT_NEUTRAL
  }
})

const iconContainerClass = computed((): string => {
  if (slots.image) {
    return 'empty-state-image'
  }

  const defaultIconClass = 'empty-state-icon'
  if (iconBackground) {
    return `${defaultIconClass} has-background`
  }

  return defaultIconClass
})
</script>

<style lang="scss" scoped>
/* Component variables */

$kEmptyStateMaxWidth: 640px;

/* Component styles */

.k-empty-state {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  gap: var(--kui-space-90, $kui-space-90);
  padding: var(--kui-space-90, $kui-space-90);
  width: 100%;

  @media (min-width: $kui-breakpoint-phablet) {
    padding: var(--kui-space-110, $kui-space-110);
  }

  .empty-state-content {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-70, $kui-space-70);
    text-align: center;
    width: 100%;

    .empty-state-icon {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);

      :deep(#{$kongponentsKongIconSelector}) {
        height: var(--kui-icon-size-60, $kui-icon-size-60) !important;
        width: var(--kui-icon-size-60, $kui-icon-size-60) !important;
      }

      &.has-background {
        background-color: var(--kui-color-background-decorative-aqua-weakest, $kui-color-background-decorative-aqua-weakest);
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-decorative-aqua, $kui-color-text-decorative-aqua);
        padding: var(--kui-space-40, $kui-space-40);

        :deep(#{$kongponentsKongIconSelector}) {
          height: var(--kui-icon-size-50, $kui-icon-size-50) !important;
          width: var(--kui-icon-size-50, $kui-icon-size-50) !important;
        }
      }
    }

    .empty-state-image {
      max-width: $kEmptyStateMaxWidth;
      overflow: hidden;
      width: 100%;
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
      display: flex;
      flex-direction: column;
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      gap: var(--kui-space-70, $kui-space-70);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      max-width: $kEmptyStateMaxWidth; // limit width so the message stays readable if title is too long

      p {
        margin: var(--kui-space-0, $kui-space-0);
      }
    }

    .empty-state-action {
      align-items: center;
      display: flex;
      gap: var(--kui-space-40, $kui-space-40);
    }
  }

  .empty-state-features-container {
    display: grid;
    gap: var(--kui-space-70, $kui-space-70);
    grid-template-columns: 1fr;
    justify-content: space-around;
    max-width: $kEmptyStateMaxWidth;

    @media (min-width: $kui-breakpoint-phablet) {
      grid-template-columns: 1fr 1fr;
    }

    .empty-state-feature-card {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      gap: var(--kui-space-30, $kui-space-30);

      .feature-icon {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
        display: flex;
        margin-bottom: var(--kui-space-50, $kui-space-50);

        :deep(#{$kongponentsKongIconSelector}) {
          height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
          width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
        }
      }

      :deep(.card-title) {
        @include truncate(2);

        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        line-height: var(--kui-line-height-30, $kui-line-height-30);
      }

      :deep(.card-content) {
        @include truncate(3);

        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      }
    }
  }

  .empty-state-footer-container {
    border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: flex;
    flex-direction: column;
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    gap: $kui-space-40;
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    max-width: $kEmptyStateMaxWidth; // limit width so the message stays readable if title is too long
    padding-top: $kui-space-90;
    width: 100%;
  }
}
</style>
