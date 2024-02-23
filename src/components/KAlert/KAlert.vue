<template>
  <div
    class="k-alert"
    :class="[appearance]"
  >
    <div
      v-if="!hideIcon"
      class="alert-icon-container"
    >
      <slot name="icon">
        <component
          :is="getAlertIcon"
          class="alert-icon"
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
      @click="$emit('dismiss')"
      @keydown.space.prevent
      @keyup.enter="$emit('dismiss')"
      @keyup.space="$emit('dismiss')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PropType } from 'vue'
import type { AlertAppearance } from '@/types'
import { AlertAppearances } from '@/types'
import { InfoIcon, CheckCircleIcon, WarningIcon, ClearIcon, CloseIcon } from '@kong/icons'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'

type AlertIcon = typeof InfoIcon | typeof CheckCircleIcon | typeof WarningIcon | typeof ClearIcon

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  appearance: {
    type: String as PropType<AlertAppearance>,
    default: 'info',
    validator: (value: AlertAppearance): boolean => {
      return Object.values(AlertAppearances).includes(value)
    },
  },
  hideIcon: {
    type: Boolean,
    default: true,
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['dismiss'])

const getAlertIcon = computed((): AlertIcon => {
  switch (props.appearance) {
    case AlertAppearances.info:
      return InfoIcon
    case AlertAppearances.success:
      return CheckCircleIcon
    case AlertAppearances.warning:
      return WarningIcon
    case AlertAppearances.danger:
      return ClearIcon
    default:
      return InfoIcon // info as default in case of invalid appearance
  }
})
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kAlertAppearance($backgroundColor: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest), $textColor: var(--kui-color-text-primary, $kui-color-text-primary), $dismissIconHoverColor: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong)) {
  background-color: $backgroundColor;
  color: $textColor;

  .alert-dismiss-icon {
    &:hover,
    &:focus {
      color: $dismissIconHoverColor !important;
    }
  }
}

/* Component styles */
.k-alert {
  @include kAlertAppearance;

  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  display: flex;
  gap: var(--kui-space-30, $kui-space-30);
  padding: var(--kui-space-50, $kui-space-50);

  .alert-icon-container {
    :deep(#{$kongponentsKongIconSelector}) { // target slotted icon
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
      font-size: var(--kui-font-size-50, $kui-font-size-50);
      font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
      letter-spacing: var(--kui-letter-spacing-minus-30, $kui-letter-spacing-minus-30);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
    }

    .alert-message {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      line-height: var(--kui-line-height-30, $kui-line-height-30);

      p {
        margin: 0;
      }
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

  &.info {
    @include kAlertAppearance;
  }

  &.success {
    @include kAlertAppearance(var(--kui-color-background-success-weakest, $kui-color-background-success-weakest), var(--kui-color-text-success, $kui-color-text-success), var(--kui-color-text-success-strong, $kui-color-text-success-strong));
  }

  &.warning {
    @include kAlertAppearance(var(--kui-color-background-warning-weakest, $kui-color-background-warning-weakest), var(--kui-color-text-warning, $kui-color-text-warning), var(--kui-color-text-warning-strong, $kui-color-text-warning-strong));
  }

  &.danger {
    @include kAlertAppearance(var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest), var(--kui-color-text-danger, $kui-color-text-danger), var(--kui-color-text-danger-strong, $kui-color-text-danger-strong));
  }
}
</style>
