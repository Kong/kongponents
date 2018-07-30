<template>
  <button
    v-bind="buttonAttributes"
    :class="[{rounded: isRounded}, appearance, buttonAttributes['class']]"
    class="button"
    @click="handleClick">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KButton',
  props: {
    /**
     * Adds border radius
     */
    isRounded: {
      type: Boolean,
      default: true
    },
    /**
      * Base styling of the button<br>
      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]
      */
    appearance: {
      type: String,
      default: 'primary',
      validator: function (value) {
        return [
          'primary',
          'danger',
          'secondary',
          'outline-primary',
          'outline-danger',
          'btn-link',
          'btn-link-danger'
        ].indexOf(value) !== -1
      }
    },
    /**
      * Add custom attributes or definitions
      */
    buttonAttributes: {
      type: Object,
      default: function () {
        return {
          class: ''
        }
      }
    },
    /**
      * Click handler
      */
    handleClick: {
      type: Function,
      default: () => () => null
    }
  }
}
</script>

<style scoped>
  .button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    line-height: 1.25;
    border-radius: 3px;
    border: 1px solid transparent;
    padding: .5rem .75rem;
    transition: all .2s ease-in-out;
    cursor: pointer;
  }

  .button.primary {
    font-weight: 500;
    color: white;
    background-color: #0095ff;
    border-color: transparent !important;
  }

  .button.primary:hover {
    background-color: #4db5ff;
  }

  .button.danger {
    font-weight: 500;
    background-color: #f2110d;
    color: white;
    border-color: transparent !important;
  }

  .button.danger:hover {
    background-color: #f65855;
  }

  .button.danger:active {
    background-color: #aa0c09;
  }

  .button.secondary {
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, 0.7);
    border-color: rgba(0, 0, 0, 0.12);
  }

  .button.secondary:hover {
    color: rgba(0, 0, 0, 0.85);
    border-color: rgba(0, 0, 0, 0.25);
  }

  .button.secondary:active {
    color: rgba(0, 0, 0, 0.7);
    background-color: gainsboro;
  }

  .button.outline-primary {
    background-color: rgba(255,255,255,.5);
    color: #0077cc;
    border-color: #80caff;
  }

  .button.outline-primary:hover {
    font-weight: 500;
    background-color: #4db5ff;
    color: #ffffff;
    border-color: transparent;
  }

  .button.outline-primary:active {
    background-color: #0068b3;
  }

  .button.outline-primary:active {
    background-color: #0068b3;
    color: #ffffff;
    border-color: transparent;
  }

  .button.outline-danger {
    font-weight: 500;
    background-color: transparent;
    color: #f2110d;
    border-color: #ff8280;
  }

  .button.outline-danger:hover {
    background-color: #f65855;
    color: #ffffff;
    border-color: transparent;
  }

  .button.outline-danger:active {
    background-color: #aa0c09;
    color: #ffffff;
    border-color: transparent;
  }

  .button.btn-link {
    background-color: transparent;
    color: #0077cc;
  }

  .button.btn-link:hover {
    color: #0077cc;
  }

  .button.btn-link:active {
    color: #003c66;
  }

  .button.btn-link-danger {
    background-color: transparent;
    color: #f2110d;
  }

  .button.btn-link-danger:hover {
    color: #f2110d;
    text-decoration: underline;
  }

  .button.btn-link-danger:active {
    color: #910a08;
  }
  .rounded {
    border-radius: 3px;
  }
</style>
