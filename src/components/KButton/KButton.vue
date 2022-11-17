<template>
  <a
    v-if="typeof to === 'string'"
    :disabled="disabled ? disabled : undefined"
    :type="type"
    :href="to"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance]"
    class="k-button"
    v-bind="strippedAttrs"
  >

    <slot name="icon">
      <KIcon
        v-if="icon"
        :color="iconColor"
        :icon="icon"
        class="k-button-icon"
        size="16"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :color="iconColor"
      view-box="2 2 15 15"
      size="16"
      icon="chevronDown"
    />
  </a>

  <component
    :is="buttonType"
    v-else
    :disabled="disabled ? disabled : undefined"
    :type="type"
    :to="to"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance]"
    class="k-button"
    v-bind="strippedAttrs"
  >
    <slot name="icon">
      <KIcon
        v-if="icon"
        :color="iconColor"
        :icon="icon"
        class="k-button-icon"
        size="16"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :class="['caret']"
      :color="iconColor"
      view-box="2 2 15 15"
      size="16"
      icon="chevronDown"
    />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export const appearances = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  creation: 'creation',
  outline: 'outline',
  btnLink: 'btn-link',
}

export const sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export default defineComponent({
  name: 'KButton',
  components: { KIcon },
  inheritAttrs: false,
  props: {
    /**
      * Base styling of the button
      * One of ['primary, secondary, 'danger', 'creation', 'outline, btn-link' ]
      */
    appearance: {
      type: String,
      default: 'outline',
      validator: (value: string): boolean => {
        return Object.values(appearances).indexOf(value) !== -1
      },
    },
    /**
      * Size variations
      * One of ['default', 'small', 'medium', 'large' ]
      */
    size: {
      type: String,
      default: 'medium',
      validator: (value: string): boolean => {
        return Object.values(sizes).indexOf(value) !== -1
      },
    },
    /**
     * Route object or path. If object will render <router-link>, if string
     will render <a>
     */
    to: {
      type: [Object, String],
      default: null,
    },
    type: {
      type: String,
      default: 'button',
    },
    showCaret: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { attrs, slots }) {
    const hasIcon = computed((): boolean => !!slots.icon)

    const hasText = computed((): boolean => !!slots.default)

    const buttonType = computed((): string => props.to ? 'router-link' : 'button')

    const iconColor = computed((): string => {
      if (props.disabled) {
        return 'var(--grey-400)'
      } else if (['primary', 'danger', 'creation'].includes(props.appearance)) {
        return 'white'
      } else if (props.appearance === 'secondary') {
        return 'var(--KButtonSecondaryColor, var(--blue-600, color(blue-600)))'
      } else if (props.appearance === 'outline') {
        return 'var(--KButtonOutlineColor, var(--blue-500, color(blue-500)))'
      } else if (props.appearance === 'btn-link') {
        return 'var(--KButtonBtnLink, var(--blue-500, color(blue-500)))'
      } else if (props.appearance === 'btn-link-danger') {
        return 'var(--KButtonLinkDanger, var(--red-500, color(red-500)))'
      }
      return ''
    })

    /**
     * Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
     * Vue 3 no longer removes attribute if the value is boolean false. Instead, it's set as attr="false".
     * So for <KButton :disabled="false" to="SOME_URL">, the rendered <a> element will have `disabled="false"`,
     * which is greyed out and cannot be interacted with.
     */
    const strippedAttrs = computed((): typeof attrs => {
      if (props.disabled !== undefined && props.disabled !== false) {
        return attrs
      }

      const modifiedAttrs = Object.assign({}, attrs)

      delete modifiedAttrs.disabled

      return modifiedAttrs
    })

    return {
      hasText,
      hasIcon,
      buttonType,
      iconColor,
      strippedAttrs,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

@mixin boxShadow($color, $whiteShadowSpred: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpred var(--white, color(white)), 0 0 0 $colorShadowSpread $color;
}

.k-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs, spacing(xs));
  padding: var(--KButtonPaddingY, var(--spacing-sm, spacing(sm))) var(--KButtonPaddingX, var(--spacing-lg, spacing(lg)));
  font-family: var(--font-family-sans, font(sans));
  font-size: var(--KButtonFontSize, var(--type-md, type(md)));
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  vertical-align: middle;
  color: var(--black-70, color(black-70));
  border: 1px solid transparent;
  border-radius: var(--KButtonRadius, 3px);
  transition: all .2s ease-in-out;
  cursor: pointer;
  // Remove tap color highlight on mobile Safari
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:disabled,
  &[disabled] {
    cursor: not-allowed;
    &:hover {
      // ! is needed to ensure any type (a, button) keeps disabled state
      text-decoration: none !important;
    }

    .kong-icon,
    :deep(.kong-icon) {
      pointer-events: none;
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
  > :deep(.kong-icon) {
    display: inline-flex;
    box-sizing: unset;
  }

  &.icon-btn {
    height: 38px;
    justify-content: center;
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

  :deep(.caret) {
    margin-left: 15px;
    padding: 0;
    display: inline-block;
    transition: 250ms ease;
  }

  &.is-active :deep(.caret) {
    transform: rotate(-180deg);
    transition: 250ms ease;
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
      // Use !important to override conflicting styles
      background-color: var(--grey-300) !important;
      color: var(--grey-400) !important;
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
      background-color: var(--grey-300) !important;
      color: var(--grey-400) !important;
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
      background-color: var(--grey-300) !important;
      color: var(--grey-400) !important;
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
      background-color: var(--grey-300) !important;
      color: var(--grey-400) !important;
    }
  }

  &.outline {
    color: var(--KButtonOutlineColor, var(--blue-500, color(blue-500)));
    border-color: var(--KButtonOutlineBorder, rgba(color(blue-500), .4));
    background-color: var(--white, color(white));
    outline-style: inherit;
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
      border-color: var(--grey-400) !important;
      color: var(--grey-400) !important;
    }
  }
  &.btn-link {
    color: var(--KButtonBtnLink, var(--blue-500, color(blue-500)));
    background-color: transparent;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--KButtonOutlineBorder, var(--blue-500, color(blue-500))), 0, 2px);
    }
    &:disabled,
    &[disabled] {
      color: var(--grey-400) !important;
    }
  }

  &.btn-link-danger {
    color: var(--KButtonLinkDanger, var(--red-500, color(red-500)));
    background-color: transparent;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--red-700, color(red-700)), 0, 2px);
    }
  }

  &.rounded {
    border-radius: 100px;
  }
}
</style>
