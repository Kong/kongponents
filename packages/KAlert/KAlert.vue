<template>
  <div
    v-if="isShowing"
    :class="[appearance, size, {'isBordered':isBordered}, {'hasLeftBorder':hasLeftBorder}, {'isCentered': isCentered}, {'isFixed': isFixed}]"
    class="k-alert"
    role="alert">
    <button
      v-if="isDismissible"
      type="button"
      aria-label="Close"
      class="close"
      @click="dismissAlert()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12">
        <path
          fill="#000"
          fill-opacity=".25"
          fill-rule="evenodd"
          d="M0 1l1-1h.5L6 4.499939 10.5 0h.5l1 1v.5L7.5 6l4.5 4.5v.5l-1 1h-.5L6 7.5 1.5 12H1l-1-1v-.5L4.5 6 0 1.5z"/>
      </svg>
    </button>
    <span
      v-if="hasIcon"
      class="alert-icon">
      <slot name="alertIcon" />
    </span>
    <span>
      <slot name="alertMessage">{{ alertMessage }}</slot>
    </span>
  </div>
</template>

<script>
export const appearances = {
  info: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning'
}

export default {
  name: 'KAlert',
  props: {
    /**
    * Message to show in alert
    */
    alertMessage: {
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
  padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
  font-family: inherit;
  font-size: 1rem;
  border-radius: 3px;
  a {
    text-decoration: underline;
    color: var(--blue-link, color(blue-link));
  }

  .alert-icon {
    margin-right: var(--spacing-xs, spacing(xs));
    max-height: 1rem;
    svg,
    img {
      max-height: 1rem;
    }
  }

  .close {
    position: absolute;
    top: 0;
    right: 18px;
    bottom: 0;
    border: 0;
    background-color: transparent;
    transition: all 200ms ease;
    cursor: pointer;
    &:hover,
    &:active {
      text-decoration: none;
      opacity: .75;
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
  &.small {
    font-size: var(--type-sm, type(sm));
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-xs, spacing(xs));
  }

  // Appearances
  &.info {
    color: var(--KAlertInfoColor, var(--blue-dark, color(blue-dark)));
    border-color: var(--KAlertInfoBorder, var(--blue-light-01, color(blue-light-01)));
    background-color: var(--KAlertInfoBackground, var(--blue-lighter, color(blue-lighter)));
  }
  &.success {
    color: var(--KAlertSuccessColor, var(--green-dark, color(green-dark)));
    border-color: var(--KAlertSuccessBorder, var(--green-light-01, color(green-light-01)));
    background-color: var(--KAlertSuccessBackground, var(--green-lighter, color(green-lighter)));
  }
  &.danger {
    color: var(--KAlertDangerColor, var(--red-dark, color(red-dark)));
    border-color: var(--KAlertDangerBorder, var(--red-light-01, color(red-light-01)));
    background-color: var(--KAlertDangerBackground, var(--red-lighter, color(red-lighter)));
  }
  &.warning {
    color: var(--KAlertWarningColor, var(--yellow-darker, color(yellow-dark)));
    border-color: var(--KAlertWarningBorder, var(--yellow-light, color(yellow-light)));
    background-color: var(--KAlertWarningBackground, var(--yellow-lighter, color(yellow-lighter)));
  }
}
</style>
