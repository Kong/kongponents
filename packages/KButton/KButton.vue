<template>
  <a
    v-if="typeof to === 'string'"
    :type="type"
    :href="to"
    :class="[size === 'default' ? '' : size, {'icon-btn': !hasText && hasIcon}, appearance]"
    class="k-button"
    v-on="listeners">
    <slot name="icon" /><slot/>
  </a>
  <component
    v-else
    :type="type"
    :is="buttonType"
    :to="to"
    :class="[size === 'default' ? '' : size, {'icon-btn': !hasText && hasIcon}, appearance]"
    class="k-button"
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
      return !!this.$slots.icon
    },

    hasText () {
      return !!this.$slots.default
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

@mixin boxShadow($color, $whiteShadowSpred: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpred var(--white, color(white)), 0 0 0 $colorShadowSpread $color;
}

.k-button {
  display: inline-flex;
  align-items: center;
  padding: var(--KButtonPaddingY, var(--spacing-xs, spacing(xs))) var(--KButtonPaddingX, var(--spacing-sm, spacing(sm)));
  font-family: var(--font-family-sans, font(sans));
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  text-decoration: none;
  vertical-align: middle;
  color: var(--black-70, color(black-70));
  border: 1px solid transparent;
  border-radius: var(--KButtonRadius, 3px);
  transition: all .2s ease-in-out;
  cursor: pointer;

  &:disabled,
  &[disabled] {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      // ! is needed to ensure any type (a, button) keeps disabled state
      text-decoration: none !important;
    }
  }
  // remove pointer events from only <a>
  &[disabled]:not(:disabled) {
    pointer-events: none;
  }
  &:focus {
    outline: none;
  }

  /* Button w/ Icon */
  > svg {
    width: 1rem;
    height: 1rem;
    padding-right: var(--spacing-xs, spacing(xs));
    box-sizing: unset;
  }

  &.icon-btn {
    height: 38px;
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
    border-color: var(--KButtonSecondaryBorder, var(--black-10, color(black-10)));
    background-color: var(--KButtonSecondaryBase, var(--white, color(white)));
    &:hover:not(:disabled) {
      border-color: var(--KButtonSecondaryHoverBorder, var(--black-45, color(black-45)));
      background-color: var(--KButtonSecondaryHover);
    }
    &:active {
      border-color: var(--KButtonSecondaryActiveBorder, var(--black-45, color(black-45)));
      background-color: var(--KButtonSecondaryActive, rgba(0,0,0,.05));
    }
    &:focus {
      @include boxShadow(var(--KButtonSecondaryFocus, var(--black-70, color(black-70))));
    }
  }
  &.primary {
    font-weight: 500;
    color: var(--white, #fff);
    background-color: var(--KButtonPrimaryBase, var(--blue-500, color(blue-500)));
    &:hover:not(:disabled) {
      $hover: rgba(color(blue-500), .85);
      background-color: var(--KButtonPrimaryHover, $hover);
    }
    &:active {
      background-color: var(--KButtonPrimaryActive, var(--blue-600, color(blue-600)));
    }
    &:focus {
      @include boxShadow(var(--KButtonPrimaryBase, var(--blue-500, color(blue-500))));
    }
  }
  &.danger {
    font-weight: 500;
    color: var(--white, #fff);
    background-color: var(--KButtonDangerBase, var(--red-500, color(red-500)));
    &:hover:not(:disabled) {
      $hover: rgba(color(red-500), .85);
      background-color: var(--KButtonDangerHover, $hover);
    }
    &:active {
      background-color: var(--KButtonDangerActive, var(--red-600, color(red-600)));
    }
    &:focus {
      @include boxShadow(var(--KButtonDangerBase, var(--red-500, color(red-500))));
    }
  }
  &.outline-primary {
    color: var(--KButtonOutlinePrimaryColor, var(--blue-500, color(blue-500)));
    border-color: var(--KButtonOutlinePrimaryBorder, rgba(color(blue-500), .4));
    background-color: var(--white, color(white));
    &:hover:not(:disabled) {
      border-color: var(--KButtonOutlinePrimaryHoverBorder, rgba(color(blue-500), 1));
    }
    &:active {
      border-color: var(--KButtonOutlinePrimaryActiveBorder, rgba(color(blue-500), 1));
      background-color: var(--KButtonOutlinePrimaryActive, var(--blue-100, color(blue-100)));
    }
    &:focus {
      @include boxShadow(var(--KButtonOutlinePrimaryBorder, var(--blue-500, color(blue-500))));
    }
  }
  &.outline-danger {
    color: var(--KButtonOutlineDangerColor, var(--red-600, color(red-600)));
    border-color: var(--KButtonOutlineDangerBorder, rgba(color(red-500), .4));
    background-color: var(--white, color(white));
    &:hover:not(:disabled) {
      border-color: var(--KButtonOutlineDangerHoverBorder, rgba(color(red-500), 1));
    }
    &:active {
      border-color: var(--KButtonOutlineDangerActiveBorder, rgba(color(red-500), 1));
      background-color: var(--KbuttonOtlineDangerActive, var(--red-100, color(red-100)));
    }
    &:focus {
      @include boxShadow(var(--KButtonOutlineDangerBorder, var(--red-500, color(red-500))));
    }
  }
  &.btn-link {
    color: var(--KButtonBtnLink, var(--blue-600, color(blue-600)));
    background-color: transparent;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--blue-500, color(blue-500)), 0, 2px);
    }
  }
  &.btn-link-danger {
    color: var(--KButtonLinkDanger, var(--red-600, color(red-600)));
    background-color: transparent;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--red-500, color(red-500)), 0, 2px);
    }
  }
}

</style>
