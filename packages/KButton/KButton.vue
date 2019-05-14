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

<style scoped lang="scss">
@import '../styles/_variables.scss';

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

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Button w/ Icon */
  > svg {
    width: 1rem;
    height: 1rem;
    padding-right: var(--spacing-xs);
  }

  &.icon-btn {
    width: 38px;
    height: 38px;
    padding: 0;
    justify-content: center;
    > svg {
      padding-right: 0;
    }
  }

  /* Size Variations */
  &.small {
    padding: var(--spacing-xxs) var(--spacing-xs);
    font-size: var(--type-sm);
  }

  /* Apperance Variations */
  &.secondary {
    border-color: var(--KButtonSecondaryBorder, color(grey-88));
    background-color: var(--KButtonSecondaryBase, var(--secondary, color(grey-98)));
    &:hover {
      border-color: var(--KButtonSecondaryHoverBorder, darken(color(grey-88), 4%));
      background-color: var(--KButtonSecondaryHover, darken(color(grey-98), 4%));
    }
    &:active {
      border-color: var(--KButtonSecondaryActiveBorder, darken(color(grey-88), 8%));
      background-color: var(--KButtonSecondaryActive, darken(color(grey-98), 8%));
    }
  }
  &.primary {
    font-weight: 500;
    color: var(--twhite-1, #fff);
    background-color: var(--KButtonPrimaryBase, var(--primary, color(blue-base)));
    &:hover {
      background-color: var(--KButtonPrimaryHover, lighten(color(blue-base), 12%));
    }
    &:active {
      background-color: var(--KButtonPrimaryActive, darken(color(blue-base), 8%));
    }
  }
  &.danger {
    font-weight: 500;
    color: var(--twhite-1, #fff);
    background-color: var(--KButtonDangerBase, var(--danger, color(red-base)));
    &:hover {
      background-color: var(--KButtonDangerHover, lighten(color(red-base), 12%));
    }
    &:active {
      background-color: var(--KButtonDangerActive, darken(color(red-base), 8%));
    }
  }
  &.outline-primary {
    color: var(--KButtonLink, var(--btnLink, color(blue-link)));
    border-color: var(--KButtonOutlinePrimaryBorder, color(blue-light-01));
    background-color: var(--KButtonOutlineBackground, #fff);
    &:hover {
      background-color: var(--KButtonOutlinePrimaryHover, color(blue-lightest));
    }
    &:active {
      background-color: var(--KButtonOutlinePrimaryActive, darken(color(blue-lightest), 4%));
    }
  }
  &.outline-danger {
    color: var(--KButtonLinkDanger, var(--linkDanger, color(red-link)));
    border-color: var(--KButtonOutlineDangerBorder, color(red-light-01));
    background-color: var(--KButtonOutlineBackground, #fff);
    &:hover {
      background-color: var(--KButtonOutlineDangerHover, color(red-lightest));
    }
    &:active {
      background-color: var(--KbuttonOtlineDangerActive, darken(color(red-lightest), 4%));
    }
  }
  &.btn-link {
    color: var(--KButtonBtnLink, var(--linkPrimary, color(blue-link)));
    &:hover {
      text-decoration: underline;
    }
  }
  &.btn-link-danger {
    color: var(--KButtonLinkDanger, var(--linkDanger, color(red-link)));
    &:hover {
      text-decoration: underline;
    }
  }
}

</style>
