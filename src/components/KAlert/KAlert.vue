<template>
  <div
    class="k-alert"
    :class="[appearance]"
  >
    <div
      v-if="showIcon || $slots.icon"
      class="alert-icon-container"
    >
      <slot name="icon">
        <component
          :is="getAlertIcon"
          class="alert-icon"
          decorative
          :size="KUI_ICON_SIZE_40"
        />
      </slot>
    </div>
    <div class="alert-content">
      <span
        v-if="title"
        class="alert-title"
      >
        {{ title }}
      </span>
      <div
        v-if="message || $slots.default"
        class="alert-message"
      >
        <slot>
          <p>{{ message }}</p>
        </slot>
      </div>
    </div>
    <CloseIcon
      v-if="dismissible"
      class="alert-dismiss-icon"
      :size="KUI_ICON_SIZE_40"
      tabindex="0"
      @click="emit('dismiss')"
      @keydown.space.prevent
      @keyup.enter="emit('dismiss')"
      @keyup.space="emit('dismiss')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertAppearances } from '@/types'
import type { AlertEmits, AlertProps, AlertSlots } from '@/types'
import { InfoIcon, CheckCircleIcon, WarningIcon, DangerIcon, CloseIcon, RocketIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

type AlertIcon = typeof InfoIcon // all icons are the same type so we can use any of them

const {
  title = '',
  message = '',
  appearance = AlertAppearances.info,
  showIcon,
  dismissible,
} = defineProps<AlertProps>()
const emit = defineEmits<AlertEmits>()
defineSlots<AlertSlots>()

const getAlertIcon = computed((): AlertIcon => {
  switch (appearance) {
    case AlertAppearances.info:
      return InfoIcon
    case AlertAppearances.success:
      return CheckCircleIcon
    case AlertAppearances.warning:
      return WarningIcon
    case AlertAppearances.danger:
      return DangerIcon
    case AlertAppearances.decorative:
      return RocketIcon
    default:
      return InfoIcon // info as default in case of invalid appearance
  }
})
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kAlertAppearance(
  $backgroundColor: var(--kui-color-background-info-weakest, $kui-color-background-info-weakest),
  $textColor: var(--kui-color-text-info, $kui-color-text-info),
  $hoverColor: var(--kui-color-text-info-strong, $kui-color-text-info-strong),
  $codeBackgroundColor: var(--kui-color-background-info-weaker, $kui-color-background-info-weaker)) {
  background-color: $backgroundColor;
  color: $textColor;

  .alert-dismiss-icon {
    &:hover,
    &:focus {
      color: $hoverColor !important;
    }
  }

  .alert-content {
    .alert-message {
      :slotted(a),
      :deep(a) {
        &:not([type='button']) {
          border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid $textColor;
          color: $textColor;
          text-decoration: none;

          &:hover {
            border-bottom-color: $textColor;
            color: $hoverColor;
            text-decoration: none;
          }
        }
      }

      :deep(code),
      :slotted(code) {
        background-color: $codeBackgroundColor;
        color: $hoverColor;
      }
    }
  }
}

/* Component styles */

.k-alert {
  @include kAlertAppearance;

  // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
  // stylelint-disable-next-line no-duplicate-selectors
  & {
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    box-sizing: border-box;
    display: flex;
    gap: var(--kui-space-30, $kui-space-30);
    padding: var(--kui-space-50, $kui-space-50);
  }

  .alert-icon-container {
    :deep(#{$kongponentsKongIconSelector}) { // target the slotted icon
      height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
      width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    }
  }

  .alert-content {
    align-self: center;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    gap: var(--kui-space-30, $kui-space-30);

    .alert-title {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
    }

    .alert-message {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);

      p {
        margin: 0;
      }

      :deep(code),
      :slotted(code) {
        @include codeTypography;

        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);
      }
    }

    .alert-title,
    .alert-message p {
      word-break: break-word;
    }
  }

  .alert-dismiss-icon {
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    cursor: pointer;
    margin-left: var(--kui-space-auto, $kui-space-auto);
    outline: none;

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    }
  }

  // appearances

  &.info {
    @include kAlertAppearance;
  }

  &.success {
    @include kAlertAppearance(
      var(--kui-color-background-success-weakest, $kui-color-background-success-weakest),
      var(--kui-color-text-success, $kui-color-text-success),
      var(--kui-color-text-success-strong, $kui-color-text-success-strong),
      #B5FFEE); // we don't have a kui-color-background-success-weaker token so use hardcoded value
  }

  &.warning {
    @include kAlertAppearance(
      var(--kui-color-background-warning-weakest, $kui-color-background-warning-weakest),
      var(--kui-color-text-warning, $kui-color-text-warning),
      var(--kui-color-text-warning-strong, $kui-color-text-warning-strong),
      var(--kui-color-background-warning-weaker, $kui-color-background-warning-weaker));
  }

  &.danger {
    @include kAlertAppearance(
      var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest),
      var(--kui-color-text-danger, $kui-color-text-danger),
      var(--kui-color-text-danger-strong, $kui-color-text-danger-strong),
      var(--kui-color-background-danger-weaker, $kui-color-background-danger-weaker));
  }

  &.decorative {
    @include kAlertAppearance(
      var(--kui-color-background-decorative-purple-weakest, $kui-color-background-decorative-purple-weakest),
      var(--kui-color-text-decorative-purple, $kui-color-text-decorative-purple),
      var(--kui-color-text-decorative-purple-strong, $kui-color-text-decorative-purple-strong),
      #CFC8FF); // we don't have a kui-color-background-decorative-purple-weaker (purple.20) token so use hardcoded value
  }
}
</style>
