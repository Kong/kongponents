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
      <div class="toaster-icon-container">
        <component
          :is="getToastIcon(toaster.appearance)"
          class="toaster-icon"
          :color="`var(--kui-color-text, ${KUI_COLOR_TEXT})`"
          decorative
        />
      </div>
      <div class="toaster-content">
        <span
          v-if="toaster.title"
          class="toaster-title"
        >
          {{ toaster.title }}
        </span>
        <p
          v-if="toaster.message"
          class="toaster-message"
        >
          {{ toaster.message }}
        </p>
      </div>
      <button
        aria-label="Close"
        class="toaster-close-icon"
        data-testid="toaster-close-icon"
        type="button"
        @click.stop="emit('close', toaster.key)"
      >
        <CloseIcon
          :color="`var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK})`"
          :size="KUI_ICON_SIZE_50"
        />
      </button>
    </div>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { ToasterAppearance, ToasterProps, ToasterEmits } from '@/types'
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, KongIcon, CloseIcon } from '@kong/icons'
import { KUI_COLOR_TEXT, KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_50 } from '@kong/design-tokens'

type ToastIcon = typeof InfoIcon | typeof CheckCircleIcon | typeof WarningIcon | typeof ClearIcon | typeof KongIcon

const {
  toasterState = [],
  zIndex = 10000,
} = defineProps<ToasterProps>()

const emit = defineEmits<ToasterEmits>()

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
  right: 50%;
  transform: translateX(50%);
  width: 90%;
  z-index: v-bind('zIndex');

  @media (min-width: $kui-breakpoint-mobile) {
    right: 16px;
    transform: none;
    width: 400px;
  }

  .toaster {
    align-items: flex-start;
    align-items: center;
    background-color: var(--kui-color-background-inverse, $kui-color-background-inverse);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    box-shadow: var(--kui-shadow, $kui-shadow);
    box-sizing: border-box;
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    display: flex;
    gap: var(--kui-space-50, $kui-space-50);
    padding: var(--kui-space-50, $kui-space-50);
    width: 100%;

    .toaster-icon-container {
      align-items: center;
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak); // info appearance as default in case of invalid appearance
      border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle);
      display: flex;
      height: 32px;
      justify-content: center;
      width: 32px;
    }

    .toaster-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--kui-space-30, $kui-space-30);

      .toaster-title {
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-50, $kui-font-size-50);
        font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
        line-height: var(--kui-line-height-40, $kui-line-height-40);
      }

      .toaster-message {
        font-family: var(--kui-font-family-text, $kui-font-family-text);
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
        line-height: var(--kui-line-height-30, $kui-line-height-30);
        margin: var(--kui-space-0, $kui-space-0);
      }
    }

    .toaster-close-icon {
      @include defaultButtonReset;

      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      margin-left: var(--kui-space-auto, $kui-space-auto);
      outline: none;

      &:hover, &:focus {
        :deep(#{$kongponentsKongIconSelector}) {
          color: var(--kui-color-text-neutral-weaker, $kui-color-text-neutral-weaker) !important;
        }
      }

      &:focus-visible {
        box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      }
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
