<template>
  <div
    v-if="isShowing"
    v-bind="alertAttributes"
    :class="[appearance, size, {'border':hasBorder}, alertAttributes['class']]"
    class="k-alert"
    role="alert">
    <button
      v-if="isDismissible"
      type="button"
      aria-label="Close"
      class="close"
      @click="dismissAlert()">×</button>
    <!-- @slot Use this slot when passing in an icon -->
    <span class="alert-icon">
      <slot name="alertIcon" />
    </span>
    <slot name="alertMessage">{{ alertMessage }}</slot>
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
    * Message to show in toaster
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
      default: false
    },
    /**
     * Set whether or not left border is visible
     */
    hasBorder: {
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
      default: ''
    },
    /**
      * Add custom attributes or definitions
      */
    alertAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    }
  },
  methods: {
    dismissAlert () {
      this.isShowing = false
    }
  }
}
</script>

<style scoped>
  .k-alert {
    font-family: inherit;
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    font-size: 1rem;
    border-radius: .1875rem;
  }
  .k-alert .alert-icon {
    margin-right: .5rem;
    max-height: 1rem;
  }
  .k-alert .alert-icon svg,
  .k-alert .alert-icon img {
    max-height: 1rem;
  }
  .k-alert.small {
    font-size: .875rem;
    padding: .5rem;
  }
  .k-alert.border {
    border-left: 3px solid;
    border-radius: 0 .1875rem .1875rem 0;
  }
  .k-alert.info {
    color: #0E4C7C;
    border-color: #80CAFF;
    background-color: #E6F5FF;
  }
  .k-alert.success {
    color: #0F5A30;
    border-color: #8CD9AC;
    background-color: #E1F5EB;
  }
  .k-alert.danger {
    color: #D90000;
    border-color: #FF8280;
    background-color: #FEE6E6;
  }
  .k-alert.warning {
    color: #403624;
    border-color: #FFDF80;
    background-color: #FFF7E8;
  }
  .k-alert .alert-link {
    font-weight: 700;
  }
  .k-alert .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 15px;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
    opacity: .5;
    color: inherit;
    cursor: pointer;
    border: 0;
    background-color: transparent;
    text-shadow: 0 1px 0 #fff;
    -webkit-appearance: none;
  }
  .k-alert.small .close {
    padding: 4px 7.5px;
  }
  .k-alert .close:hover,
  .k-alert .close:active {
    text-decoration: none;
    opacity: .75;
  }
</style>
