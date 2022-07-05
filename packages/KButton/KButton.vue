<template>
  <a
    v-if="typeof to === 'string'"
    :type="type"
    :href="to"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance]"
    class="k-button"
    v-on="listeners">
    <slot name="icon">
      <KIcon
        v-if="icon"
        :color="iconColor"
        :icon="icon"
        class="k-button-icon"
        size="16" />
    </slot>
    <slot/>
    <KIcon
      v-if="isOpen !== undefined"
      :class="[caretClasses]"
      :color="iconColor"
      view-box="2 2 15 15"
      size="16"
      icon="chevronDown"/>
  </a>
  <component
    v-else
    :type="type"
    :is="buttonType"
    :to="to"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance, caretClasses]"
    class="k-button"
    v-on="listeners">
    <slot name="icon">
      <KIcon
        v-if="icon"
        :color="iconColor"
        :icon="icon"
        class="k-button-icon"
        size="16" />
    </slot>
    <slot/>
    <KIcon
      v-if="isOpen !== undefined"
      :class="['caret', caretClasses]"
      :color="iconColor"
      view-box="2 2 15 15"
      size="16"
      icon="chevronDown"/>
  </component>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

export const appearances = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  creation: 'creation',
  outline: 'outline',
  btnLink: 'btn-link'
}

export const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large'
}

export default {
  name: 'KButton',
  components: { KIcon },
  props: {
    /**
      * Base styling of the button
      * One of ['primary, secondary, 'danger', 'creation', 'outline, btn-link' ]
      */
    appearance: {
      type: String,
      default: 'outline',
      validator: function (value) {
        return Object.values(appearances).indexOf(value) !== -1
      }
    },
    /**
      * Size variations
      * One of ['default', 'small', 'medium', 'large' ]
      */
    size: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return Object.values(sizes).indexOf(value) !== -1
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
    },
    isOpen: {
      type: Boolean,
      default: undefined
    },
    isRounded: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },

    attrs () {
      return {
        ...this.$attrs
      }
    },

    caretClasses () {
      if (this.isOpen === undefined) return

      return this.isOpen ? 'has-caret is-active' : 'has-caret'
    },

    hasIcon () {
      return !!this.$slots.icon
    },

    hasText () {
      return !!this.$slots.default
    },

    buttonType () {
      return this.to ? 'router-link' : 'button'
    },

    iconColor () {
      if (this.$attrs.disabled) {
        return 'var(--grey-400)'
      } else if (['primary', 'danger', 'creation'].includes(this.appearance)) {
        return 'white'
      } else if (this.appearance === 'secondary') {
        return 'var(--KButtonSecondaryColor, var(--blue-600, color(blue-600)))'
      } else if (this.appearance === 'outline') {
        return 'var(--KButtonOutlineColor, var(--blue-500, color(blue-500)))'
      } else if (this.appearance === 'btn-link') {
        return 'var(--KButtonBtnLink, var(--blue-500, color(blue-500)))'
      } else {
        return null
      }
    }
  },

  mounted () {
    this.hasIcon && this.$slots.icon[0].elm && this.$slots.icon[0].elm.setAttribute('viewBox', '0 0 16 16')
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';

@mixin boxShadow($color, $whiteShadowSpred: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpred var(--white, color(white)), 0 0 0 $colorShadowSpread $color;
}

.k-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: var(--KButtonPaddingY, var(--spacing-sm, spacing(sm))) var(--KButtonPaddingX, var(--spacing-lg, spacing(lg)));
  font-family: var(--font-family-sans, font(sans));
  font-size: var(--KButtonFontSize, var(--type-md, type(md)));
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
  > .kong-icon {
    display: inline-flex;
    padding-right: var(--spacing-xs, spacing(xs));
    box-sizing: unset;
  }

  .kong-icon,
  .kong-icon > svg {
    width: 1rem !important;
    height: 1rem !important;
  }

  &.icon-btn {
    height: 38px;
    justify-content: center;
    > .kong-icon {
      padding-right: 0;
    }
  }

  /* Size Variations */
  &.small {
    padding: var(--spacing-xs, spacing(xs)) var(--spacing-md, spacing(md));
    font-size: var(--KButtonFontSize, 13px);
    line-height: 13px;
  }

  &.medium {
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-lg, spacing(lg)) ;
    font-size: var(--KButtonFontSize, var(--type-md, type(md)));
    line-height: var(--type-md, type(md));
  }

  &.large {
    padding: var(--spacing-md, spacing(md)) var(--spacing-xl, spacing(xl)) ;
    font-size: var(--KButtonFontSize, var(--type-md, type(md)));
    line-height: var(--type-md, type(md));
  }

  /* class to add for dropdown caret */
  & .caret {
    margin-left: 15px;
    padding: 0;
    display: inline-block;
    transition: 250ms ease;

    &.is-active {
      transform: rotate(-180deg);
      transition: 250ms ease;
    }
  }

  /* Apperance Variations */
  &.secondary {
    color: var(--KButtonSecondaryColor, var(--blue-600, color(blue-600)));
    background-color: var(--KButtonSecondaryBase, var(--blue-200, color(blue-200)));
    &:hover:not(:disabled) {
      background-color: var(--KButtonSecondaryHover, var(--blue-300));
    }
    &:active {
      background-color: var(--KButtonSecondaryActive, var(--blue-300, color(blue-300)));
    }
    &:focus {
      @include boxShadow(var(--KButtonSecondaryBase, var(--blue-300, color(blue-300))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300);
      color: var(--grey-400);
    }
  }
  &.primary {
    color: var(--white, #fff);
    background-color: var(--KButtonPrimaryBase, var(--blue-500, color(blue-500)));
    &:hover:not(:disabled) {
      background-color: var(--KButtonPrimaryHover, var(--blue-600));
    }
    &:active {
      background-color: var(--KButtonPrimaryActive, var(--blue-600, color(blue-600)));
    }
    &:focus {
      @include boxShadow(var(--KButtonPrimaryBase, var(--blue-500, color(blue-500))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300);
      color: var(--grey-400);
    }
  }
  &.danger {
    color: var(--white, #fff);
    background-color: var(--KButtonDangerBase, var(--red-500, color(red-500)));
    &:hover:not(:disabled) {
      $hover: rgba(color(red-700), .85);
      background-color: var(--KButtonDangerHover, $hover);
    }
    &:active {
      background-color: var(--KButtonDangerActive, var(--red-700, color(red-700)));
    }
    &:focus {
      @include boxShadow(var(--KButtonDangerBase, var(--red-700, color(red-700))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300);
      color: var(--grey-400);
    }
  }
  &.creation {
    color: var(--white, #fff);
    background-color: var(--KButtonCreationBase, var(--green-500, color(green-500)));
    &:hover:not(:disabled) {
      $hover: rgba(color(green-600), .85);
      background-color: var(--KButtonCreationHover, $hover);
    }
    &:active {
      background-color: var(--KButtonCreationActive, var(--green-600, color(green-600)));
    }
    &:focus {
      @include boxShadow(var(--KButtonCreationBase, var(--green-600, color(green-600))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300);
      color: var(--grey-400);
    }
  }
  &.outline {
    color: var(--KButtonOutlineColor, var(--blue-500, color(blue-500)));
    border-color: var(--KButtonOutlineBorder, rgba(color(blue-500), .4));
    background-color: var(--white, color(white));
    &:hover:not(:disabled) {
      border-color: var(--KButtonOutlineHoverBorder, rgba(color(blue-500), 1));
    }
    &:active {
      border-color: var(--KButtonOutlineActiveBorder, rgba(color(blue-500), 1));
      background-color: var(--KButtonOutlineActive, var(--blue-100, color(blue-100)));
    }
    &:focus {
      @include boxShadow(var(--KButtonOutlineBorder, var(--blue-500, color(blue-500))));
    }
    &:disabled,
    &[disabled] {
      border-color: var(--grey-400);
      color: var(--grey-400);
    }
  }
  &.btn-link {
    color: var(--KButtonBtnLink, var(--blue-500, color(blue-500)));
    background-color: transparent;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--blue-500, color(blue-500)), 0, 2px);
    }
    &:disabled,
    &[disabled] {
      color: var(--grey-400);
    }
  }
  &.rounded {
    border-radius: 100px;
  }
}
</style>

<style lang="scss">
.k-button.btn-link.has-caret .caret.has-caret path {
  stroke: var(--KButtonBtnLink, var(--blue-500, color(blue-500)));
}
.k-button:disabled .kong-icon {
  pointer-events: none;
}
</style>
