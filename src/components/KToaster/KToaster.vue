<template>
  <TransitionGroup
    class="k-toaster"
    name="kongponents-slide-up-transition"
    tag="div"
  >
    <div
      v-for="toaster in toasterState"
      :key="toaster.key"
      class="toaster"
      :class="`${toaster.appearance}`"
      role="alert"
    >
      <div class="toaster-header">
        <div class="toaster-icon-container">
          <component
            :is="getToastIcon(toaster.appearance)"
            class="toaster-icon"
            :color="KUI_COLOR_TEXT"
          />
        </div>
        <span class="toaster-title">
          {{ toaster.title }}
        </span>
        <CloseIcon
          class="toaster-close-icon"
          :color="KUI_COLOR_TEXT_NEUTRAL_WEAK"
          data-testid="toaster-close-icon"
          role="button"
          :size="KUI_ICON_SIZE_50"
          tabindex="0"
          @click="() => $emit('close', toaster.key)"
        />
      </div>
      <p
        v-if="toaster.message"
        class="toaster-message"
      >
        {{ toaster.message }}
      </p>
    </div>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Toast, ToasterAppearance } from '@/types'
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, KongIcon, CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT, KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_50 } from '@kong/design-tokens'

type ToastIcon = typeof InfoIcon | typeof CheckCircleIcon | typeof WarningIcon | typeof ClearIcon | typeof KongIcon

defineProps({
  toasterState: {
    type: Array as PropType<Toast[]>,
    default: [] as Toast[],
    required: true,
  },
})

defineEmits<{
  (e: 'close', val: any): void
}>()

const getToastIcon = (appearance?: ToasterAppearance): ToastIcon => {
  switch (appearance) {
    case 'info':
      return InfoIcon
    case 'success':
      return CheckCircleIcon
    case 'warning':
      return WarningIcon
    case 'danger':
      return ClearIcon
    case 'system':
      return KongIcon
    default:
      return InfoIcon // info as default in case of invalid appearance
  }
}
</script>

<style lang="scss" scoped>
.k-toaster {
  bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-50, $kui-space-50);
  position: fixed;
  right: 16px;
  width: 400px;
  z-index: 10000;

  .toaster {
    background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    box-shadow: var(--kui-shadow, $kui-shadow);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-30, $kui-space-30);
    padding: var(--kui-space-50, $kui-space-50);
    width: 100%;

    .toaster-header {
      align-items: center;
      display: flex;
      gap: var(--kui-space-50, $kui-space-50);

      .toaster-icon-container {
        align-items: center;
        background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak); // info appearance as default in case of invalid appearance
        border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
        display: flex;
        height: 32px;
        justify-content: center;
        width: 32px;
      }

      .toaster-title {
        @include truncate;

        flex: 1;
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-50, $kui-font-size-50);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        letter-spacing: var(--kui-letter-spacing-minus-30, $kui-letter-spacing-minus-30);
        line-height: var(--kui-line-height-40, $kui-line-height-40);
      }

      .toaster-close-icon {
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        cursor: pointer;
        margin-left: var(--kui-space-auto, $kui-space-auto);
        outline: none;

        &:hover, &:focus {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker) !important;
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }
    }

    .toaster-message {
      font-family: var(--kui-font-family-text, $kui-font-family-text);
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin: var(--kui-space-0, $kui-space-0);
    }

    // appearances

    &.info {
      .toaster-icon-container {
        background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
      }
    }

    &.success {
      .toaster-icon-container {
        background-color: var(--kui-color-background-success-weak, $kui-color-background-success-weak);
      }
    }

    &.warning {
      .toaster-icon-container {
        background-color: var(--kui-color-background-warning-weak, $kui-color-background-warning-weak);
      }
    }

    &.danger {
      .toaster-icon-container {
        background-color: var(--kui-color-background-danger-weak, $kui-color-background-danger-weak);
      }
    }

    &.system {
      .toaster-icon-container {
        background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
      }
    }
  }
}
</style>
