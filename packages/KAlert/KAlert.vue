<template>
  <div
    v-if="isShowing || hasButton || isWideBanner"
    :class="[
      appearance,
      size,
      {'isBordered':isBordered},
      {'hasLeftBorder':hasLeftBorder},
      {'hasRightBorder':hasRightBorder},
      {'hasTopBorder':hasTopBorder},
      {'hasBottomBorder':hasBottomBorder},
      {'isCentered': isCentered},
      {'isFixed': isFixed},
      {'hasButton': hasButton},
      {'isWideBanner': isWideBanner}
    ]"
    class="k-alert"
    role="alert">
    <button
      v-if="isDismissible"
      type="button"
      aria-label="Close"
      class="close"
      @click="dismissAlert()">
      <KIcon
        :color="appearance"
        :class="appearance"
        icon="close"
        size="20" />
    </button>
    <span
      v-if="hasIcon"
      class="alert-icon">
      <slot name="alertIcon"/>
    </span>
    <span
      v-if="hasEllipse"
      :class="appearance"
      class="ellipse"/>
    <span class="alert-msg">
      <slot name="alertMessage">{{ alertMessage }}</slot>
    </span>
    <div v-if="isWideBanner">
      <span class="mainMessageText"><slot name="mainMessageText">{{ mainMessageText }}</slot></span>
      <span class="secMessageText"><slot name="secMessageText">{{ secMessageText }}</slot></span>
    </div>
    <span
      v-if="hasActionButtons"
      :class="appearance"
      class="alert-action">
      <slot
        name="actionButtons"/>
    </span>
  </div>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

export const appearances = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning'
}

export default {
  name: 'KAlert',
  components: { KIcon },
  props: {
    /**
    * Message to show in alert
    */
    alertMessage: {
      type: String,
      default: ''
    },
    /**
    * Long Message to show in the first line in alert
    */
    mainMessageText: {
      type: String,
      default: ''
    },
    /**
    * Short Message in the second line to show in alert
    */
    secMessageText: {
      type: String,
      default: ''
    },
    /**
     * Set if close button is visible
     */
    isDismissible: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not the alert box is shown.
     */
    isShowing: {
      type: Boolean,
      default: true
    },
    /**
     * Set whether or not the alert box shown has button.
     */
    hasButton: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not the alert box shown has ellipse.
     */
    hasEllipse: {
      type: Boolean,
      default: false
    },
    /**
     * Set whether or not the alert box shown is a banner.
     */
    isWideBanner: {
      type: Boolean,
      default: false
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
          'small'
        ].indexOf(value) !== -1
      }
    }
  },

  computed: {
    hasIcon () {
      return !!this.$slots.alertIcon
    },
    hasActionButtons () {
      return !!this.$slots.actionButtons
    }
  },

  methods: {
    dismissAlert () {
      this.$emit('closed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.k-alert {
  position: relative;
  display: flex;
  align-items: center;
  width: 806px;
  padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 16px;
  font-family: inherit;
  border-radius: 3px;
  overflow-wrap: anywhere;
  margin-bottom: 1rem;
  a {
    text-decoration: underline;
    color: var(--blue-600, color(blue-600));
  }

  .close {
    position: absolute;
    top: 0;
    right: 14.4px;
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

  // Appearances
  &.info {
    color: var(--KAlertInfoColor, var(--blue-600, color(blue-600)));
    border-color: var(--KAlertInfoBorder, var(--blue-300, color(blue-300)));
    background-color: var(--KAlertInfoBackground, var(--blue-200, color(blue-200)));
  }
  &.success {
    color: var(--KAlertSuccessColor, var(--green-600, color(green-600)));
    border-color: var(--KAlertSuccessBorder, var(--green-200, color(green-200)));
    background-color: var(--KAlertSuccessBackground, var(--green-100, color(green-100)));
  }
  &.danger {
    color: var(--KAlertDangerColor, var(--red-700, color(red-700)));
    border-color: var(--KAlertDangerBorder, var(--red-300, color(red-300)));
    background-color: var(--KAlertDangerBackground, var(--red-200, color(red-200)));
  }
  &.warning {
    color: var(--KAlertWarningColor, var(--yellow-500, color(yellow-500)));
    border-color: var(--KAlertWarningBorder, var(--yellow-200, color(yellow-200)));
    background-color: var(--KAlertWarningBackground, var(--yellow-100, color(yellow-100)));
  }

  &.isWideBanner {
    width: 1220px;
    height: 80px;
    padding: 0;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 1rem;
    color: var(--black-500);
  }

  &.hasButton {
    width: 763px;
    height: 56px;
    padding: 0;
    border-radius: 4px;
    background-color: white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 1rem;
    color: var(--black-500);

    & > .ellipse {
      &.info {
        background-color: var(--blue-500);
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
  }
    & .alert-msg {
      padding: 8px 0;
      font-weight: 500;
      font-size: 15px;
      line-height: 20px;
    }
}

button.close > svg {
  &.info {
    stroke: var(--KAlertInfoColor, var(--blue-600, color(blue-600)));
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

.button-right {
  position: absolute;
  right: 14.4px;
  border: 0;
  transition: all 200ms ease;
  cursor: pointer;
}

.alert-icon {
  padding: 23px 20px 25px 21px;
  width: 32px;
  height: 32px;
}

.ellipse {
  height: 6px;
  width: 6px;
  background-color: var(--red-500);
  border-radius: 50%;
  display: inline-block;
  margin: 24px 24px 26px;
}

.alert-action {
  display: inline-flex;
  margin-left: auto;

  &.info button {
    color: var(--blue-500);
    background-color: var(--blue-100);
    border: var(--blue-100);
  }

  &.success button {
    color: var(--green-600);
    background-color: var(--green-100);
    border: var(--green-100);
  }

  &.warning button {
    color: var(--yellow-500);
    background-color: var(--yellow-100);
    border: var(--yellow-100);
    &:hover:not(:disabled) {
      background-color: var(--yellow-400);
      border-color: var(--yellow-400);
    }
  }

  &.danger button {
    color: var(--red-700);
    background-color: var(--red-100);
    border: var(--red-100);
  }

  & button {
    height: 30px;
    margin-right: 13px;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
    position: relative;
    cursor: pointer;
  }
}

.alert-action.info button.outline {
  color: var(--KButtonOutlineColor, var(--blue-500));
  border: 1px solid var(--blue-500);
  background-color: var(--white, #ffffff);
}

.alert-action.warning button.outline {
  color: var(--KButtonOutlineColor, var(--yellow-500));
  border: 1px solid var(--yellow-500);
  background-color: var(--white, #ffffff);
  --KButtonOutlineBorder: var(--yellow-500);
}

.alert-action.success button.outline {
  color: var(--KButtonOutlineColor, var(--green-600));
  border: 1px solid var(--green-600);
  background-color: var(--white, #ffffff);
  --KButtonOutlineBorder: var(--green-600);
}
.alert-action.danger button.outline {
  color: var(--KButtonOutlineColor, var(--red-700));
  border: 1px solid var(--red-700);
  background-color: var(--white, #ffffff);
  --KButtonOutlineBorder: var(--red-700);
}

.k-alert > .close + .alert-msg {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
}

.mainMessageText {
  display: block;
  padding-top: 6px;
  padding-bottom: 2px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.secMessageText {
  display: block;
  padding-top: 2px;
  padding-bottom: 6px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #6F7787;
}

</style>
