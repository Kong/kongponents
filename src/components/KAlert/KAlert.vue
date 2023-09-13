<template>
  <div
    v-if="isShowing"
    class="k-alert"
    :class="[
      appearance,
      size,
      dismissType,
      { 'is-bordered': isBordered },
      { 'has-left-border': hasLeftBorder },
      { 'has-right-border': hasRightBorder },
      { 'has-top-border': hasTopBorder },
      { 'has-bottom-border': hasBottomBorder },
      { 'is-centered': isCentered },
      { 'is-fixed': isFixed },
      { 'is-alert': type === 'alert' },
      { 'is-banner': type === 'banner' }
    ]"
    role="alert"
    @click.stop
  >
    <!-- leading icon -->
    <span
      v-if="type === 'banner' && size !== 'large'"
      class="k-alert-ellipse"
      :class="appearance"
    />

    <span
      v-if="icon || $slots.icon"
      class="k-alert-icon-container"
      :class="{
        'k-alert-icon-container-large': size === 'large'
      }"
    >
      <slot name="icon">
        <KIcon
          class="k-alert-icon"
          :color="iconColor"
          :icon="icon"
          :size="iconSize"
        />
      </slot>
    </span>
    <!-- Main content of alert -->
    <div
      :class="[
        'k-alert-msg-text',
        { 'has-dismiss-icon': dismissType === 'icon' },
        { 'has-dismiss-button': dismissType === 'button' }
      ]"
    >
      <div
        v-if="title || $slots.title"
        class="k-alert-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        class="k-alert-msg"
        :class="{
          'k-alert-text': size === 'large',
          'k-alert-subtext': title || $slots.title
        }"
      >
        <!-- @slot Use this slot to pass default alert message  -->
        <slot name="alertMessage">
          {{ alertMessage }}
        </slot>
      </div>

      <div
        v-if="size === 'large' && (description || $slots.description)"
        class="k-alert-description-text"
      >
        <!-- @slot Use this slot to pass alert message description for large banner type alert  -->
        <slot name="description">
          {{ description }}
        </slot>
      </div>
    </div>
    <!-- Buttons -->
    <button
      v-if="dismissType === 'icon'"
      aria-label="Close"
      class="close"
      type="button"
      @click="dismissAlert"
    >
      <KIcon
        :class="appearance"
        :color="appearance"
        icon="close"
        :size="KUI_ICON_SIZE_20"
      />
    </button>

    <div
      v-if="hasActionButtons || dismissType !== 'none'"
      class="k-alert-action"
      :class="appearance"
    >
      <!-- @slot Use this slot to pass extra buttons other than Dismiss  -->
      <slot
        v-if="hasActionButtons"
        name="actionButtons"
      >
        <KButton
          size="small"
          @click="proceed"
          @keyup.enter="proceed"
        />
      </slot>

      <KButton
        v-if="dismissType === 'button'"
        size="small"
        @click="dismissAlert"
      >
        Dismiss
      </KButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { AlertAppearance, AlertDismissType, AlertAppearanceRecord, AlertSize, AlertType } from '@/types'
import { KUI_ICON_SIZE_20, KUI_ICON_SIZE_60 } from '@kong/design-tokens'

defineProps({
  /**
    * Message to show in alert
    */
  alertMessage: {
    type: String,
    default: '',
  },
  /**
     * Set whether or not the alert box is shown.
     */
  isShowing: {
    type: Boolean,
    default: true,
  },
  /**
     * Fixes alert to top
     */
  isFixed: {
    type: Boolean,
    default: false,
  },
  /**
     * Set whether or not alert has full border is visible
     */
  isBordered: {
    type: Boolean,
    default: false,
  },
  /**
     * Sets whether or not alert has left border
     */
  hasLeftBorder: {
    type: Boolean,
    default: false,
  },
  /**
     * Sets whether or not alert has right border
     */
  hasRightBorder: {
    type: Boolean,
    default: false,
  },
  /**
     * Sets whether or not alert has top border
     */
  hasTopBorder: {
    type: Boolean,
    default: false,
  },
  /**
     * Sets whether or not alert has bottom border
     */
  hasBottomBorder: {
    type: Boolean,
    default: false,
  },
  /**
     * Center text inside alert
     */
  isCentered: {
    type: Boolean,
    default: false,
  },
  /**
     * Set alert box icon size
     */
  iconSize: {
    type: String,
    default: KUI_ICON_SIZE_60,
  },
  /**
     * Set alert box type of icon
     */
  icon: {
    type: String,
    default: '',
  },
  /**
     * Set alert box icon color
     */
  iconColor: {
    type: String,
    default: '',
  },
  /**
     * Alert message title
     */
  title: {
    type: String,
    default: '',
  },
  /**
    * Alert message description
    */
  description: {
    type: String,
    default: '',
  },
  /**
      * Base styling of the button<br>
      * One of [ info, danger, warning, success ]
      */
  appearance: {
    type: String as PropType<AlertAppearance>,
    default: 'info',
    validator: (value: AlertAppearance): boolean => {
      return Object.values(appearances).includes(value)
    },
  },
  /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
  size: {
    type: String as PropType<AlertSize>,
    default: '',
    validator: (value: string): boolean => {
      return ['', 'small', 'large'].includes(value)
    },
  },
  /**
     * Set whether alert box has icon/button to dismiss or none
     */
  dismissType: {
    type: String as PropType<AlertDismissType>,
    default: 'none',
    validator: (value: string): boolean => {
      return ['none', 'icon', 'button'].includes(value)
    },
  },
  /**
     * Set whether alert box is alert or banner
     */
  type: {
    type: String as PropType<AlertType>,
    default: 'alert',
    validator: (value: string): boolean => {
      return ['alert', 'banner'].includes(value)
    },
  },
})

const emit = defineEmits(['closed', 'proceed'])

const slots = useSlots()
const hasActionButtons = computed((): boolean => !!slots.actionButtons)

const dismissAlert = (): void => {
  emit('closed')
}

const proceed = (): void => {
  emit('proceed')
}
</script>

<script lang="ts">
export const appearances: AlertAppearanceRecord = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
}
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';

.k-alert {
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  display: flex;
  overflow-wrap: anywhere;
  padding: var(--kui-space-50, $kui-space-50);
  position: relative;
  word-break: break-word; // Word-wrapping in Safari

  a {
    color: var(--kui-color-text-primary, $kui-color-text-primary);
    text-decoration: underline;
  }

  & > div .k-alert-msg {
    font-size: var(--kui-font-size-40, $kui-font-size-40);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    margin-left: var(--kui-space-10, $kui-space-10);
    padding: var(--kui-space-10, $kui-space-10) var(--kui-space-0, $kui-space-0);

    &.k-alert-subtext {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
    }

    p:last-of-type {
      margin-bottom: var(--kui-space-0, $kui-space-0);
    }
  }

  .k-alert-title {
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold) !important;
  }

  .k-alert-description-text {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    display: block;
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding-top: var(--kui-space-20, $kui-space-20);
  }

  // Action Buttons
  .k-alert-action {
    display: inline-flex;
    height: 100%;
    margin-bottom: auto;
    margin-left: auto;
    margin-top: auto;
    position: relative;
  }

  .close {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: var(--kui-border-width-0, $kui-border-width-0);
    bottom: 0;
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    right: 8px;
    top: 0;
    transition: all $tmp-animation-timing-2 ease;

    &:hover,
    &:active {
      opacity: 1;
      text-decoration: none;
    }
  }

  // Sizes
   &.small {
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-40, $kui-space-40);

    & > div .k-alert-msg {
      font-size: var(--kui-font-size-20, $kui-font-size-20);
    }
  }
  &.large {
    border-radius: var(--kui-border-radius-10, $kui-border-radius-10);
    min-height: 80px;

    .k-alert-icon-container-large {
      padding: var(--kui-space-80, $kui-space-80) var(--kui-space-0, $kui-space-0);
    }
  }

  // Variants
  &.is-fixed {
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  &.is-bordered {
    border: var(--kui-border-width-10, $kui-border-width-10) solid;
  }

  &.is-centered {
    justify-content: center;
  }

  &.has-left-border {
    border-left: var(--kui-border-width-30, $kui-border-width-30) solid;
    border-radius: var(--kui-border-radius-0, $kui-border-radius-0);
  }

  &.has-right-border {
    border-radius: var(--kui-border-radius-0, $kui-border-radius-0);
    border-right: var(--kui-border-width-30, $kui-border-width-30) solid;
  }

  &.has-top-border {
    border-radius: var(--kui-border-radius-0, $kui-border-radius-0);
    border-top: var(--kui-border-width-30, $kui-border-width-30) solid;
  }

  &.has-bottom-border {
    border-bottom: var(--kui-border-width-30, $kui-border-width-30) solid;
    border-radius: var(--kui-border-radius-0, $kui-border-radius-0);
  }

  // Appearances - MUST FOLLOW VARIANTS
  &.info {
    background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
    border-color: var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
  }

  &.success {
    background-color: $tmp-color-green-100;
    border-color: $tmp-color-green-200;
    color: $tmp-color-green-700;
  }

  &.danger {
    background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
    border-color: var(--kui-color-border-danger-weaker, $kui-color-border-danger-weaker);
    color: var(--kui-color-text-danger, $kui-color-text-danger);
  }

  &.warning {
    background-color: $tmp-color-yellow-100;
    border-color: $tmp-color-yellow-200;
    color: $tmp-color-yellow-600;
  }

  // Types - MUST FOLLOW APPEARANCES
  &.is-alert {
    .k-alert-icon-container {
      margin-right: var(--kui-space-50, $kui-space-50) !important;
    }
  }

  &.is-banner {
    background-color: var(--kui-color-background, $kui-color-background);
    color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest);
    padding: var(--kui-space-0, $kui-space-0);

    .k-alert-ellipse {
      border-radius: 100%;
      display: inline-block;
      height: 6px;
      margin: auto var(--kui-space-40, $kui-space-40);
      width: 6px;

      &.info {
        background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
      }

      &.success {
        background-color: $tmp-color-green-400;
      }

      &.warning {
        background-color: $tmp-color-yellow-400;
      }

      &.danger {
        background-color: var(--kui-color-background-danger-weak, $kui-color-background-danger-weak);
      }
    }

    .button > div .k-alert-msg.k-alert-text {
      font-size:var(--kui-font-size-40, $kui-font-size-40);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      padding-left: var(--kui-space-0, $kui-space-0);
    }

    & > div.k-alert-msg-text {
      padding: var(--kui-space-50, $kui-space-50) var(--kui-space-60, $kui-space-60);
    }
  }
}

.toaster-item .k-alert .k-alert-msg {
  margin: var(--kui-space-0, $kui-space-0);
  padding: var(--kui-space-0, $kui-space-0);
}
</style>

<style lang="scss">

@import '@/styles/tmp-variables';

.k-alert {
  button.close > .kong-icon {
    &.info svg {
      stroke: var(--kui-color-text-primary, $kui-color-text-primary);
    }

    &.success svg {
      stroke: $tmp-color-green-600;
    }

    &.danger svg {
      stroke: var(--kui-color-text-danger, $kui-color-text-danger);
    }

    &.warning svg {
      stroke: $tmp-color-yellow-500;
    }
  }

  .k-alert-action {
    & button {
      font-size: var(--kui-font-size-20, $kui-font-size-20);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      height: 30px;
      line-height: var(--kui-line-height-10, $kui-line-height-10);

      &:not(:first-of-type) {
        margin-left: var(--kui-space-50, $kui-space-50);
      }
    }

    &.info button.primary {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary, $kui-color-text-primary);

      &:hover {
        background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
      }
    }

    &.info button.outline {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-primary-weak, $kui-color-border-primary-weak);
      color: var(--kui-color-text-primary, $kui-color-text-primary);
    }

    &.warning button.primary {
      background-color: $tmp-color-yellow-100;
      color: $tmp-color-yellow-500;
    }

    &.warning button.outline {
      border: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-yellow-300;
      color: $tmp-color-yellow-500;
    }

    &.success button.primary {
      background-color: $tmp-color-green-100;
      color: $tmp-color-green-600;
    }

    &.success button.outline {
      border: var(--kui-border-width-10, $kui-border-width-10) solid $tmp-color-green-400;
      color: $tmp-color-green-600;
    }

    &.danger button.primary {
      background-color: var(--kui-color-background-danger-weakest, #{$kui-color-background-danger-weakest});
      color: var(--kui-color-text-danger, $kui-color-text-danger);
    }

    &.danger button.outline {
      border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-danger-weak, $kui-color-border-danger-weak);
    }
  }
}
</style>
