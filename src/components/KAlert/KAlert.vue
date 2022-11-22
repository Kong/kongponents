<template>
  <div
    v-if="isShowing"
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
      { 'is-banner': type === 'banner' }
    ]"
    class="k-alert"
    role="alert"
    @click.stop
  >
    <!-- leading icon -->
    <span
      v-if="type === 'banner' && size !== 'large'"
      :class="appearance"
      class="k-alert-ellipse"
    />

    <span
      v-if="icon || $slots.icon"
      :class="{
        'mr-3': type !== 'banner',
        'k-alert-icon-container-large': size === 'large'
      }"
      class="k-alert-icon-container"
    >
      <slot name="icon">
        <KIcon
          :size="iconSize"
          :color="iconColor"
          :icon="icon"
          class="k-alert-icon"
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
        class="k-alert-title bold-600"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        :class="{
          'k-alert-text': size === 'large',
          'k-alert-subtext': title || $slots.title
        }"
        class="k-alert-msg"
      >
        <!-- @slot Use this slot to pass default alert message  -->
        <slot name="alertMessage">
          {{ alertMessage }}
        </slot>
        <div class="alert-secondary-message">
          <!-- @slot Use this slot to pass secondary alert message  -->
          <slot name="alertSecondaryMessage">
            {{ alertSecondaryMessage }}
          </slot>
        </div>
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
      type="button"
      aria-label="Close"
      class="close"
      :class="alertSecondaryMessage || $slots.alertSecondaryMessage ? 'moveTop' : 'topDefault'"
      @click="dismissAlert"
    >
      <KIcon
        icon="close"
        size="14"
        :color="appearance"
        :class="appearance"
      />
    </button>

    <div
      v-if="hasActionButtons || dismissType !== 'none'"
      :class="appearance"
      class="k-alert-action"
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

<script lang="ts">
import { defineComponent, computed } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export const appearances = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
}

export default defineComponent({
  name: 'KAlert',
  components: { KIcon, KButton },
  props: {
    /**
    * Message to show in alert
    */
    alertMessage: {
      type: String,
      default: '',
    },
    alertSecondaryMessage: {
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
      default: '32',
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
      type: String,
      default: 'info',
      validator: (value: string): boolean => {
        return Object.values(appearances).includes(value)
      },
    },
    /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
    size: {
      type: String,
      default: '',
      validator: (value: string): boolean => {
        return ['', 'small', 'large'].includes(value)
      },
    },
    /**
     * Set whether alert box has icon/button to dismiss or none
     */
    dismissType: {
      type: String,
      default: 'none',
      validator: (value: string): boolean => {
        return ['none', 'icon', 'button'].includes(value)
      },
    },
    /**
     * Set whether alert box is alert or banner
     */
    type: {
      type: String,
      default: 'alert',
      validator: (value: string): boolean => {
        return ['alert', 'banner'].includes(value)
      },
    },
  },
  emits: ['closed', 'proceed'],
  setup(props, { slots, emit }) {
    const hasActionButtons = computed((): boolean => !!slots.actionButtons)

    const dismissAlert = (): void => {
      emit('closed')
    }

    const proceed = (): void => {
      emit('proceed')
    }

    return {
      hasActionButtons,
      dismissAlert,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-alert {
  position: relative;
  display: flex;
  padding: 14px;
  border-radius: 4px;
  overflow-wrap: anywhere;
  word-break: break-word; // Word-wrapping in Safari

  a {
    text-decoration: underline;
    color: var(--blue-600, color(blue-600));
  }

  & > div .k-alert-msg {
    font-weight: 400;
    font-size: var(--type-md, type(md));
    line-height: 24px;
    padding: 2px 0;
    margin-left: 2px;

    &.k-alert-subtext {
      font-size: var(--type-sm, type(sm));
    }

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .k-alert-description-text {
    display: block;
    padding-top: var(--spacing-xxs);
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    color: var(--grey-500);
  }

  // Action Buttons
  .k-alert-action {
    display: inline-flex;
    position: relative;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto;
    height: 100%;
  }

  .moveTop {
    top: -18px;
  }

  .topDefault {
    top: 0;
  }

  .close {
    position: absolute;
    right: var(--spacing-xs);
    bottom: 0;
    border: 0;
    background-color: transparent;
    transition: all 200ms ease;
    cursor: pointer;
    opacity: 0.5;

    &:hover,
    &:active {
      text-decoration: none;
      opacity: 1;
    }
  }

  // Sizes
   &.small {
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-xs, spacing(xs));

    & > div .k-alert-msg {
      font-size: var(--type-sm, type(sm));
    }
  }
  &.large {
    min-height: 80px;
    border-radius: 2px;

    .k-alert-icon-container-large {
      padding: var(--spacing-lg) 0;
    }
  }

  // Variants
  &.is-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  &.is-bordered {
    border: 1px solid;
  }

  &.is-centered {
    justify-content: center;
  }

  &.has-left-border {
    border-left: 3px solid;
    border-radius: 0;
  }

  &.has-right-border {
    border-right: 3px solid;
    border-radius: 0;
  }

  &.has-top-border {
    border-top: 3px solid;
    border-radius: 0;
  }

  &.has-bottom-border {
    border-bottom: 3px solid;
    border-radius: 0;
  }

  // Appearances - MUST FOLLOW VARIANTS
  &.info {
    color: var(--KAlertInfoColor, var(--blue-600, color(blue-600)));
    border-color: var(--KAlertInfoBorder, var(--blue-300, color(blue-300)));
    background-color: var(--KAlertInfoBackground, var(--blue-200, color(blue-200)));
  }

  &.success {
    color: var(--KAlertSuccessColor, var(--green-700, color(green-700)));
    border-color: var(--KAlertSuccessBorder, var(--green-200, color(green-200)));
    background-color: var(--KAlertSuccessBackground, var(--green-100, color(green-100)));
  }

  &.danger {
    color: var(--KAlertDangerColor, var(--red-700, color(red-700)));
    border-color: var(--KAlertDangerBorder, var(--red-300, color(red-300)));
    background-color: var(--KAlertDangerBackground, var(--red-100, color(red-100)));
  }

  &.warning {
    color: var(--KAlertWarningColor, var(--yellow-600, color(yellow-600)));
    border-color: var(--KAlertWarningBorder, var(--yellow-200, color(yellow-200)));
    background-color: var(--KAlertWarningBackground, var(--yellow-100, color(yellow-100)));
  }

  // Types - MUST FOLLOW APPEARANCES
  &.is-banner {
    background-color: var(--white);
    color: var(--grey-600);
    padding: 0;

    .k-alert-ellipse {
      height: 6px;
      width: 6px;
      border-radius: 100%;
      display: inline-block;
      margin: auto 8px;

      &.info {
        background-color: var(--blue-400);
      }

      &.success {
        background-color: var(--green-400);
      }

      &.warning {
        background-color: var(--yellow-400);
      }

      &.danger {
        background-color: var(--red-400);
      }
    }

    .button > div .k-alert-msg.k-alert-text {
      padding-left: 0;
      font-size: var(--type-md, type(md));
      line-height: 24px;
    }

    & > div.k-alert-msg-text {
      padding: var(--spacing-sm) var(--spacing-md);
    }
  }
}

.toaster-item .k-alert .k-alert-msg {
  padding: 0;
  margin: 0;
}
</style>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-alert {
  button.close > .kong-icon {
    &.info svg {
      stroke: var(--KAlertInfoColor, var(--blue-500, color(blue-500)));
    }

    &.success svg {
      stroke: var(--KAlertSuccessColor, var(--green-600, color(green-600)));
    }

    &.danger svg {
      stroke: var(--KAlertDangerColor, var(--red-700, color(red-700)));
    }

    &.warning svg {
      stroke: var(--KAlertWarningColor, var(--yellow-500, color(yellow-500)));
    }
  }

  .k-alert-action {
    & button {
      height: 30px;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;

      &:not(:first-of-type) {
        margin-left: var(--spacing-sm);
      }
    }

    &.info button.primary {
      --KButtonPrimaryBase: var(--blue-500);
      --KButtonPrimaryHover: var(--blue-200);
      color: var(--blue-500);
      background-color: var(--blue-100);
    }

    &.info button.outline {
      --KButtonOutlineBorder: var(--blue-500);
      --KButtonOutlineHoverBorder: var(--blue-600);
      --KButtonOutlineActive: var(--blue-100);
      --KButtonOutlineActiveBorder: var(--blue-500);
      color: var(--blue-500);
      border: 1px solid var(--blue-400);
    }

    &.warning button.primary {
      --KButtonPrimaryBase: var(--yellow-500);
      --KButtonPrimaryHover: var(--yellow-200);
      color: var(--yellow-500);
      background-color: var(--yellow-100);
    }

    &.warning button.outline {
      --KButtonOutlineBorder: var(--yellow-500);
      --KButtonOutlineHoverBorder: var(--yellow-500);
      --KButtonOutlineActive: var(--yellow-100);
      --KButtonOutlineActiveBorder: var(--yellow-500);
      color: var(--yellow-500);
      border: 1px solid var(--yellow-300);
    }

    &.success button.primary {
      --KButtonPrimaryBase: var(--green-600);
      --KButtonPrimaryHover: var(--green-200);
      color: var(--green-600);
      background-color: var(--green-100);
    }

    &.success button.outline {
      --KButtonOutlineBorder: var(--green-600);
      --KButtonOutlineHoverBorder: var(--green-600);
      --KButtonOutlineActive: var(--green-100);
      --KButtonOutlineActiveBorder: var(--green-600);
      color: var(--green-600);
      border: 1px solid var(--green-400);
    }

    &.danger button.primary {
      --KButtonPrimaryHover: var(--red-200);
      --KButtonPrimaryBase: var(--red-700);
      color: var(--red-700);
      background-color: var(--red-100);
    }

    &.danger button.outline {
      --KButtonOutlineBorder: var(--red-700);
      --KButtonOutlineColor: var(--red-700);
      --KButtonOutlineHoverBorder: var(--red-700);
      --KButtonOutlineActive: var(--red-100);
      --KButtonOutlineActiveBorder: var(--red-700);
      border: 1px solid var(--red-500);
    }
  }
}
</style>
