<template>
  <div 
    class="k-alert"
    :class="[appearance, alertAttributes['class']]" 
    v-bind="alertAttributes"
    role="alert" 
    v-if="show">
    <button v-if="isDismissible" type="button" aria-label="Close" class="close" @click="isShowing()">×</button>
    <slot name="alertMessage">{{alertMessage}}</slot>
  </div>
</template>

<script>
  export default {
    name: 'KAlert',
    props: {
      /**
      * Message to show in toaster
      */
      alertMessage: {
        type: String,
        required: true
      },
      /**
       * Set if close button is visible
       */
      isDismissible: {
        type: Boolean,
        default: false
      },
      /** 
        * Base styling of the button<br>
        * One of ['primary, danger, warning, success ]
        */
      appearance: {
        type: String,
        default: 'primary'
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
    data () {
      return {
        show: true
      }
    },
    methods: {
      isShowing () {
        this.show = false
      }
    }
  }
</script>

<style scoped>
  .k-alert {
    position: relative;
    display: flex;
    padding: 12px 20px;
    margin-bottom: 16px;
    border: 1px solid transparent;
    border-radius: .25rem;
  }
  .k-alert.primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
  }
  .k-alert.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  .k-alert.danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
  }
  .k-alert.warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
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
  .k-alert .close:hover,
  .k-alert .close:active {
    text-decoration: none;
    opacity: .75;
  }
</style>
