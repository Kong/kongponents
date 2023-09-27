<template>
  <section
    class="empty-state-wrapper"
    :class="{ 'is-error': isError }"
  >
    <div class="empty-state-title">
      <div
        v-if="isError || icon"
        class="k-empty-state-icon card-icon"
        :class="{ 'warning-icon': isError }"
      >
        <KIcon
          :color="isError ? iconColor || `var(--kui-color-text-neutral-strongest, ${KUI_COLOR_TEXT_NEUTRAL_STRONGEST})` : iconColor"
          :icon="icon ? icon : 'warning'"
          :secondary-color="isError ? iconSecondaryColor || 'currentColor' : iconSecondaryColor"
          :size="iconSize"
        />
      </div>
      <div
        v-if="$slots.title"
        class="k-empty-state-title-header"
      >
        <slot name="title" />
      </div>
    </div>
    <div class="empty-state-content">
      <div
        v-if="$slots.message"
        class="k-empty-state-message"
      >
        <slot name="message" />
      </div>
      <div
        v-if="$slots.cta || (!ctaIsHidden && ctaText)"
        class="k-empty-state-cta"
      >
        <slot name="cta">
          <KButton
            appearance="primary"
            size="small"
            @click.prevent="() => handleClick && handleClick()"
          >
            {{ ctaText }}
          </KButton>
        </slot>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { KUI_COLOR_TEXT_NEUTRAL_STRONGEST, KUI_ICON_SIZE_80 } from '@kong/design-tokens'

defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  iconSize: {
    type: String,
    default: KUI_ICON_SIZE_80,
  },
  icon: {
    type: String,
    default: '',
  },
  ctaIsHidden: {
    type: Boolean,
    default: false,
  },
  ctaText: {
    type: String,
    default: '',
  },
  handleClick: {
    type: Function,
    default: null,
  },
  iconColor: {
    type: String,
    default: '',
  },
  iconSecondaryColor: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';

.empty-state-wrapper {
  background-color: var(--kui-color-background, $kui-color-background);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  padding: var(--kui-space-110, $kui-space-110) var(--kui-space-0, $kui-space-0);
  text-align: center;

  > * + * {
    margin-top: var(--kui-space-60, $kui-space-60);
  }

  .k-empty-state-title-header {
    color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
    font-size: var(--kui-font-size-60, $kui-font-size-60);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    line-height: var(--kui-line-height-60, $kui-line-height-60);
  }

  .empty-state-title {
    .k-empty-state-icon {
      &.warning-icon {
        color: $tmp-color-yellow-400;
      }
    }

    & > * + * {
      margin-top: var(--kui-space-40, $kui-space-40);
    }
  }

  .k-empty-state-message {
    color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    margin-left: var(--kui-space-auto, $kui-space-auto);
    margin-right: var(--kui-space-auto, $kui-space-auto);
    max-width: 50%;
  }

  .empty-state-content > * + * {
    margin-top: var(--kui-space-90, $kui-space-90);
  }

  .k-empty-state-cta {
    margin-left: var(--kui-space-auto, $kui-space-auto);
    margin-right: var(--kui-space-auto, $kui-space-auto);
  }
}
</style>
