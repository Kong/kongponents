<template>
  <button
    v-bind="buttonBindings"
    :class="[size === 'default' ? '' : size, {'icon-btn': !hasText}, appearance, buttonAttributes['class']]"
    class="button"
    v-on="listeners">
    <slot name="icon" />
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'KButton',
  props: {
    /**
      * Base styling of the button<br>
      * One of ['primary, outline-primary, secondary, outline-secondary, danger', 'outline-danger, btn-link', btn-link-danger ]
      */
    appearance: {
      type: String,
      default: '',
      validator: function (value) {
        return [
          'primary',
          'danger',
          'secondary',
          'outline-primary',
          'outline-danger',
          'btn-link',
          'btn-link-danger',
          ''
        ].indexOf(value) !== -1
      }
    },
    /**
      * Size variations<br>
      * One of ['default', 'small' ]
      */
    size: {
      type: String,
      default: 'default',
      validator: function (value) {
        return [
          'default',
          'small'
        ].indexOf(value) !== 1
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
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },

    buttonBindings () {
      return {
        ...this.buttonAttributes
      }
    },
    hasIcon () {
      return this.$slots.icon
    },
    hasText () {
      return this.$slots.default
    }
  },

  mounted () {
    this.hasIcon && this.$slots.icon[0].elm.setAttribute('viewBox', '0 0 16 16')
  }
}
</script>

<style scoped>
  .button {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-family: var(--font-family-sans);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.25;
    color: var(--tblack-70);
    border: 1px solid transparent;
    border-radius: 3px;
    transition: all .2s ease-in-out;
    cursor: pointer;
  }
  .button:focus {
    outline: none;
  }
  .button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Button w/ Icon */
  .button > svg {
    width: 1rem;
    height: 1rem;
    padding-right: var(--spacing-xs);
  }
  .button.icon-btn {
    width: 38px;
    height: 38px;
    padding: 0;
    justify-content: center;
  }
  .button.icon-btn > svg {
    padding-right: 0;
  }

  /* Size Variations */
  .button.small {
    padding: var(--spacing-xxs) var(--spacing-xs);
    font-size: var(--type-sm);
  }

  /* Apperance Variations */
  .button.secondary {
    border-color: var(--secondaryBorder);
    background-color: var(--secondaryBase);
  }
  .button.secondary:hover {
    border-color: var(--secondaryHoverBorder);
    background-color: var(--secondaryHover)
  }
  .button.secondary:active {
    border-color: var(--secondaryActiveBorder);
    background-color: var(--secondaryActive);
  }

  .button.primary {
    font-weight: 500;
    color: var(--twhite-1);
    background-color: var(--primaryBase);
  }
  .button.primary:hover {
    background-color: var(--primaryHover);
  }
  .button.primary:active {
    background-color: var(--primaryActive);
  }

  .button.danger {
    font-weight: 500;
    color: var(--twhite-1);
    background-color: var(--dangerBase);
  }
  .button.danger:hover {
    background-color: var(--dangerHover);
  }
  .button.danger:active {
    background-color: var(--dangerActive);
  }

  .button.outline-primary {
    color: var(--btnLink);
    border-color: var(--outlinePrimaryBorder);
    background-color: var(--outlineBackground);
  }
  .button.outline-primary:hover {
    background-color: var(--outlinePrimaryHover);
  }
  .button.outline-primary:active {
    background-color: var(--outlinePrimaryActive);
  }

  .button.outline-danger {
    color: var(--btnLinkDanger);
    border-color: var(--outlineDangerBorder);
    background-color: var(--outlineBackground);
  }
  .button.outline-danger:hover {
    background-color: var(--outlineDangerHover);
  }
  .button.outline-danger:active {
    background-color: var(--outlineDangerActive);
  }

  .button.btn-link {
    color: var(--btnLink);
  }
  .button.btn-link:hover {
    text-decoration: underline;
  }
  .button.btn-link-danger {
    color: var(--btnLinkDanger);
  }
  .button.btn-link-danger:hover {
    text-decoration: underline;
  }
</style>
