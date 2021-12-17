<template>
  <div
    v-if="isShowing"
    :class="[
      appearance,
      size,
      type,
      dismissType,
      {'isBordered':isBordered},
      {'hasLeftBorder':hasLeftBorder},
      {'hasRightBorder':hasRightBorder},
      {'hasTopBorder':hasTopBorder},
      {'hasBottomBorder':hasBottomBorder},
      {'isCentered': isCentered},
      {'isFixed': isFixed}
    ]"
    class="k-alert"
    role="alert"
    @click.stop>
    <button
      v-if="dismissType === 'icon'"
      type="button"
      aria-label="Close"
      class="close"
      @click="dismissAlert">
      <KIcon
        :color="appearance"
        :class="appearance"
        icon="close"
        size="14" />
    </button>
    <div
      :class="appearance"
      class="k-alert-action ml-3">
      <!-- @slot Use this slot to pass extra buttons other than Dismiss  -->
      <slot
        v-if="hasActionButtons"
        name="actionButtons">
        <KButton
          size="small"
          @click="proceed"
          @keyup.enter="proceed"/>
      </slot>
      <KButton
        v-if="dismissType === 'button'"
        size="small"
        @click="dismissAlert">
        Dismiss
      </KButton>
    </div>
    <span
      v-if="(type === 'banner' && (size !== 'large'))"
      :class="appearance"
      class="k-alert-ellipse"/>
    <span v-if="size === 'large'">
      <KIcon
        :size="iconSize"
        :color="iconColor"
        :icon="icon ? icon : 'notificationInbox'"
        class="k-alert-icon" />
    </span>
    <div class="k-alert-msg-text">
      <div
        :class="type === 'banner' && size === 'large' ? 'k-alert-text' : ''"
        class="k-alert-msg">
        <!-- @slot Use this slot to pass default alert message  -->
        <slot name="alertMessage">{{ alertMessage }}
        </slot>
      </div>
      <div
        v-if="type === 'banner' && (size === 'large') && hasAlertDescription"
        class="k-alert-description-text">
        <!-- @slot Use this slot to pass alert message description for large banner type alert  -->
        <slot name="description">{{ description }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export const appearances = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning'
}
export default {
  name: 'KAlert',
  components: { KIcon, KButton },
  props: {
    /**
    * Message to show in alert
    */
    alertMessage: {
      type: String,
      default: ''
    },
    /**
     * Set whether or not the alert box is shown.
     */
    isShowing: {
      type: Boolean,
      default: true
    },
    /**
     * Fixes alert to top
     */
    isFixed: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not alert has full border is visible
     */
    isBordered: {
      type: Boolean,
      default: false
    },
    /**
     * Sets whether or not alert has left border
     */
    hasLeftBorder: {
      type: Boolean,
      default: false
    },
    /**
     * Sets whether or not alert has right border
     */
    hasRightBorder: {
      type: Boolean,
      default: false
    },
    /**
     * Sets whether or not alert has top border
     */
    hasTopBorder: {
      type: Boolean,
      default: false
    },
    /**
     * Sets whether or not alert has bottom border
     */
    hasBottomBorder: {
      type: Boolean,
      default: false
    },
    /**
     * Center text inside alert
     */
    isCentered: {
      type: Boolean,
      default: false
    },
    /**
     * Set alert box icon size
     */
    iconSize: {
      type: String,
      default: '32'
    },
    /**
     * Set alert box type of icon
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * Set alert box icon color
     */
    iconColor: {
      type: String,
      default: 'var(--red-500)'
    },
    /**
    * Alert message description
    */
    description: {
      type: String,
      default: ''
    },
    /**
      * Base styling of the button<br>
      * One of ['primary, danger, warning, success ]
      */
    appearance: {
      type: String,
      default: 'info',
      validator: function (value) {
        return Object.values(appearances).indexOf(value) !== -1
      }
    },
    /**
     * Set whether alert box is the default size or small for context (under form fields, etc),
     */
    size: {
      type: String,
      default: '',
      validator: (value) => {
        return [
          '',
          'small',
          'large'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Set whether alert box has icon/button to dismiss or none
     */
    dismissType: {
      type: String,
      default: 'none',
      validator: (value) => {
        return [
          'none',
          'icon',
          'button'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Set whether alert box is alert or banner
     */
    type: {
      type: String,
      default: 'alert',
      validator: (value) => {
        return [
          'alert',
          'banner'
        ].indexOf(value) !== -1
      }
    }
  },

  computed: {
    hasActionButtons () {
      return !!this.$slots.actionButtons
    },
    hasAlertDescription () {
      return !!this.$slots.alertMessage
    }
  },

  methods: {
    dismissAlert () {
      this.$emit('closed')
    },
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';

.k-alert {
  position: relative;
  display: flex;
  align-items: center;
  padding: 14px;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 4px;
  overflow-wrap: anywhere;
  a {
    text-decoration: underline;
    color: var(--blue-600, color(blue-600));
  }
  .close {
    position: absolute;
    top: 0;
    right: 8px;
    bottom: 0;
    border: 0;
    background-color: transparent;
    transition: all 200ms ease;
    cursor: pointer;
    opacity: .5;
    &:hover,
    &:active {
      text-decoration: none;
      opacity: 1;
    }
  }
  // Variants
  &.isFixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  &.isBordered {
    border: 1px solid;
  }
  &.isCentered {
    justify-content: center;
  }
  &.hasLeftBorder {
    border-left: 3px solid;
    border-radius: 0;
  }
  &.hasRightBorder {
    border-right: 3px solid;
    border-radius: 0;
  }
  &.hasTopBorder {
    border-top: 3px solid;
    border-radius: 0;
  }
  &.hasBottomBorder {
    border-bottom: 3px solid;
    border-radius: 0;
  }
  &.small {
    font-size: var(--type-sm, type(sm));
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-xs, spacing(xs));
  }
  &.large {
    min-height: 80px;
    border-radius: 2px;
  }
  // Appearances
  &.info {
    color: var(--KAlertInfoColor, var(--blue-700, color(blue-700)));
    border-color: var(--KAlertInfoBorder, var(--blue-300, color(blue-300)));
    background-color: var(--KAlertInfoBackground, var(--blue-200, color(blue-200)));
  }
  &.success {
    color: var(--KAlertSuccessColor, var(--green-500, color(green-500)));
    border-color: var(--KAlertSuccessBorder, var(--green-200, color(green-200)));
    background-color: var(--KAlertSuccessBackground, var(--green-100, color(green-100)));
  }
  &.danger {
    color: var(--KAlertDangerColor, var(--red-700, color(red-700)));
    border-color: var(--KAlertDangerBorder, var(--red-300, color(red-300)));
    background-color: var(--KAlertDangerBackground, var(--red-200, color(red-200)));
  }
  &.warning {
    color: var(--KAlertWarningColor, var(--yellow-400, color(yellow-400)));
    border-color: var(--KAlertWarningBorder, var(--yellow-200, color(yellow-200)));
    background-color: var(--KAlertWarningBackground, var(--yellow-100, color(yellow-100)));
  }
  & > div .k-alert-msg {
    font-weight: 400;
    font-size: var(--type-md, type(md));
    line-height: var(--type-md, type(md));
    padding: 2px 0;
    margin-left: 2px;

    p:last-of-type {
      margin-bottom: 0;
    }
  }
}

div.k-alert.banner {
  background-color: var(--white);
  color: var(--grey-600);
  padding: 0;
}

button.close > .kong-icon {
  &.info {
    stroke: var(--KAlertInfoColor, var(--blue-500, color(blue-500)));
  }
  &.success {
    stroke: var(--KAlertSuccessColor, var(--green-600, color(green-600)));
  }
  &.danger {
    stroke: var(--KAlertDangerColor, var(--red-700, color(red-700)));
  }
  &.warning {
    stroke: var(--KAlertWarningColor, var(--yellow-500, color(yellow-500)));
  }
}

.k-alert-ellipse {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  display: inline-block;
  margin: 24px 8px 26px 22px;

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

.k-alert-icon {
  padding: 23px 5px 25px 21px;
}

.toaster-item .k-alert .k-alert-msg {
  padding: 0;
  margin: 0;
}

.k-alert-action {
  display: inline-flex;
  position: absolute;
  right: 13px;
  & button {
    height: 30px;
    margin-left: 13px;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
  }

  &.info button.primary {
    color: var(--blue-500);
    background-color: var(--blue-100);
    --KButtonPrimaryBase: var(--blue-500);
    --KButtonPrimaryHover: var(--blue-200);
  }
  &.info button.outline {
    color: var(--blue-500);
    border: 1px solid var(--blue-400);
    --KButtonOutlineBorder: var(--blue-500);
    --KButtonOutlineHoverBorder: var(--blue-600);
     --KButtonOutlineActive: var(--blue-100);
    --KButtonOutlineActiveBorder: var(--blue-500);
  }
  &.warning button.primary {
    color: var(--yellow-500);
    background-color: var(--yellow-100);
    --KButtonPrimaryBase: var(--yellow-500);
    --KButtonPrimaryHover: var(--yellow-200);
  }
  &.warning button.outline {
    color: var(--yellow-500);
    border: 1px solid var(--yellow-300);
    --KButtonOutlineBorder: var(--yellow-500);
    --KButtonOutlineHoverBorder: var(--yellow-500);
    --KButtonOutlineActive: var(--yellow-100);
    --KButtonOutlineActiveBorder: var(--yellow-500);
  }
  &.success button.primary {
    color: var(--green-600);
    background-color: var(--green-100);
    --KButtonPrimaryBase: var(--green-600);
    --KButtonPrimaryHover: var(--green-200);
  }
  &.success button.outline {
    color: var(--green-600);
    border: 1px solid var(--green-400);
    --KButtonOutlineBorder: var(--green-600);
    --KButtonOutlineHoverBorder: var(--green-600);
    --KButtonOutlineActive: var(--green-100);
    --KButtonOutlineActiveBorder: var(--green-600);
  }
  &.danger button.primary {
    color: var(--red-700);
    background-color: var(--red-100);
    --KButtonPrimaryHover: var(--red-200);
    --KButtonPrimaryBase: var(--red-700);
  }
  &.danger button.outline {
    border: 1px solid var(--red-500);
    --KButtonOutlineBorder: var(--red-700);
    --KButtonOutlineColor: var(--red-700);
    --KButtonOutlineHoverBorder: var(--red-700);
    --KButtonOutlineActive: var(--red-100);
    --KButtonOutlineActiveBorder: var(--red-700);
  }
}

.k-alert-description-text {
  display: block;
  padding-top: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: var(--grey-500);
}

.k-alert.banner.button > div .k-alert-msg.k-alert-text {
  padding-left: 0;
  font-size: var(--type-md, type(md));
  line-height: 24px;
}

.k-alert.banner > div.k-alert-msg-text {
  padding: 12px 210px 12px 16px;
}
</style>
