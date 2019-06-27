<template>
  <a
    v-if="typeof to === 'string'"
    :type="type"
    :href="to"
    :class="[size === 'default' ? '' : size, {'icon-btn': !hasText && hasIcon}, appearance]"
    class="button"
    v-on="listeners">
    <slot name="icon" /><slot/>
  </a>
  <component
    v-else
    :type="type"
    :is="buttonType"
    :to="to"
    :class="[size === 'default' ? '' : size, {'icon-btn': !hasText && hasIcon}, appearance]"
    class="button"
    v-on="listeners">
    <slot name="icon" /><slot/>
  </component>
</template>

<script>
export const appearances = {
  primary: 'primary',
  danger: 'danger',
  secondary: 'secondary',
  outlinePrimary: 'outline-primary',
  outlineDanger: 'outline-danger',
  btnLink: 'btn-link',
  btnLinkDanger: 'btn-link-danger'
}

export default {
  name: 'KButton',
  props: {
    /**
      * Base styling of the button
      * One of ['primary, outline-primary, secondary, danger', 'outline-danger, btn-link', btn-link-danger ]
      */
    appearance: {
      type: String,
      default: 'secondary',
      validator: function (value) {
        return Object.values(appearances).indexOf(value) !== -1
      }
    },
    /**
      * Size variations
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
     * Route object or path. If object will render <router-link>, if string
     will render <a>
     */
    to: {
      type: [Object, String],
      default: null
    },
    type: {
      type: String,
      default: 'button'
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },

    hasIcon () {
      return this.$slots.icon
    },

    hasText () {
      return this.$slots.default
    },

    buttonType () {
      return this.to ? 'router-link' : 'button'
    }
  },

  mounted () {
    this.hasIcon && this.$slots.icon[0].elm.setAttribute('viewBox', '0 0 16 16')
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';

.button {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs, spacing(xs)) var(--spacing-sm, spacing(sm));
  font-family: var(--font-family-sans, font(sans));
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  text-decoration: none;
  color: var(--tblack-70, color(tblack-70));
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
    padding-right: var(--spacing-xs, spacing(xs));
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
    padding: var(--spacing-xxs, spacing(xxs)) var(--spacing-xs, spacing(xs));
    font-size: var(--type-sm, type(sm));
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
