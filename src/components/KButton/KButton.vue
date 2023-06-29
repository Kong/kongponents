<template>
  <a
    v-if="typeof to === 'string'"
    class="k-button"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance]"
    :disabled="disabled ? disabled : undefined"
    :href="to"
    :type="type"
    v-bind="strippedAttrs"
  >

    <slot name="icon">
      <KIcon
        v-if="icon"
        class="k-button-icon"
        :color="iconColor"
        :icon="icon"
        size="16"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :color="iconColor"
      icon="chevronDown"
      size="16"
      view-box="2 2 15 15"
    />
  </a>

  <component
    :is="buttonType"
    v-else
    class="k-button"
    :class="[size, {'icon-btn': !hasText && hasIcon, 'rounded': isRounded}, appearance]"
    :disabled="disabled ? disabled : undefined"
    :to="to"
    :type="type"
    v-bind="strippedAttrs"
  >
    <slot name="icon">
      <KIcon
        v-if="icon"
        class="k-button-icon"
        :color="iconColor"
        :icon="icon"
        size="16"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :class="['caret']"
      :color="caretColor || iconColor"
      icon="chevronDown"
      size="16"
      view-box="2 2 15 15"
    />
  </component>
</template>

<script setup lang="ts">
import { computed, PropType, useSlots, useAttrs } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { ButtonAppearance, ButtonAppearanceRecord, ButtonSize, ButtonSizeRecord } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_PRIMARY_STRONGER, KUI_COLOR_TEXT_PRIMARY, KUI_COLOR_TEXT_DANGER } from '@kong/design-tokens'

const props = defineProps({
  /**
    * Base styling of the button
    * One of ['primary', 'secondary', 'danger', 'creation', 'outline', 'btn-link', 'btn-link-danger', 'action-active']
    */
  appearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'outline',
    validator: (value: ButtonAppearance): boolean => {
      return Object.values(appearances).indexOf(value) !== -1
    },
  },
  /**
    * Size variations
    * One of ['small', 'medium', 'large' ]
    */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium',
    validator: (value: ButtonSize): boolean => {
      return Object.values(sizes).indexOf(value) !== -1
    },
  },
  /**
    * Route object or path. If object will render <router-link>, if string will render <a>
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
  caretColor: {
    type: String,
    default: undefined,
  },
  isRounded: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const attrs = useAttrs()

const hasIcon = computed((): boolean => !!slots.icon)

const hasText = computed((): boolean => !!slots.default)

const buttonType = computed((): string => props.to ? 'router-link' : 'button')

const iconColor = computed((): string => {
  if (props.disabled) {
    return `var(--grey-400, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`
  } else if (['primary', 'danger', 'creation'].includes(props.appearance)) {
    return `var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE})`
  } else if (props.appearance === 'secondary') {
    return `var(--KButtonSecondaryColor, var(--blue-600, var(--kui-color-text-primary-stronger, ${KUI_COLOR_TEXT_PRIMARY_STRONGER})))`
  } else if (props.appearance === 'outline') {
    return `var(--KButtonOutlineColor, var(--blue-500, var(--kui-color-text-primary, ${KUI_COLOR_TEXT_PRIMARY})))`
  } else if (props.appearance === 'btn-link') {
    return `var(--KButtonLink, var(--blue-500, var(--kui-color-text-primary, ${KUI_COLOR_TEXT_PRIMARY})))`
  } else if (props.appearance === 'btn-link-danger') {
    return `var(--KButtonLinkDanger, var(--red-500, var(--kui-color-text-danger, ${KUI_COLOR_TEXT_DANGER})))`
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

</script>

<script lang="ts">

export const appearances: ButtonAppearanceRecord = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
  creation: 'creation',
  outline: 'outline',
  btnLink: 'btn-link',
  btnLinkDanger: 'btn-link-danger',
  actionActive: 'action-active',
}

export const sizes: ButtonSizeRecord = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/tmp-variables';
@import '@/styles/functions';

@mixin boxShadow($color, $whiteShadowSpread: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpread var(--white, var(--kui-color-background, $kui-color-background)), 0 0 0 $colorShadowSpread $color;
}

.k-button {
  align-items: center;
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
  border-radius: var(--KButtonRadius, var(--kui-border-radius-20, $kui-border-radius-20));
  color: var(--black-70, color(black-70)); // token tbd
  cursor: pointer;
  display: inline-flex;
  font-family: var(--font-family-sans, var(--kui-font-family-text, $kui-font-family-text));
  font-size: var(--KButtonFontSize, var(--type-md, var(--kui-font-size-30, $kui-font-size-30)));
  font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
  gap: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  padding: var(--KButtonPaddingY, var(--spacing-sm, var(--kui-space-50, $kui-space-50))) var(--KButtonPaddingX, var(--spacing-lg, var(--kui-space-80, $kui-space-80)));
  position: relative;
  // Remove tap color highlight on mobile Safari
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  transition: all $tmp-animation-timing-2 ease-in-out;
  vertical-align: middle;
  white-space: nowrap;

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
    box-sizing: unset;
    display: inline-flex;
  }

  &.icon-btn {
    height: 38px;
    justify-content: center;
  }

  /* Size Variations */
  &.small {
    font-size: var(--KButtonFontSize, var(--kui-font-size-20, $kui-font-size-20));
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    padding: var(--spacing-xs, var(--kui-space-40, $kui-space-40)) var(--spacing-md, var(--kui-space-60, $kui-space-60));
  }

  &.medium {
    font-size: var(--KButtonFontSize, var(--type-md, var(--kui-font-size-40, $kui-font-size-40)));
    line-height: var(--type-md, var(--kui-line-height-10, $kui-line-height-10));
    padding: var(--spacing-sm, var(--kui-space-50, $kui-space-50)) var(--spacing-lg, var(--kui-space-80, $kui-space-80));
  }

  &.large {
    font-size: var(--KButtonFontSize, var(--type-md, var(--kui-font-size-40, $kui-font-size-40)));
    line-height: var(--type-md, var(--kui-line-height-10, $kui-line-height-10));
    padding: var(--spacing-md, var(--kui-space-60, $kui-space-60)) var(--spacing-xl, var(--kui-space-90, $kui-space-90));
  }

  /* class to add for dropdown caret */

  :deep(.caret) {
    display: inline-block;
    margin-left: var(--kui-space-40, $kui-space-40);
    padding: var(--kui-space-0, $kui-space-0);
    transition: $tmp-animation-timing-2 ease;
  }

  &.is-active :deep(.caret) {
    transform: rotate(-180deg);
    transition: $tmp-animation-timing-2 ease;
  }

  /* Apperance Variations */
  &.secondary {
    background-color: var(--KButtonSecondaryBase, var(--blue-200, var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker)));
    color: var(--KButtonSecondaryColor, var(--blue-600, var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger)));
    &:hover:not(:disabled) {
      background-color: var(--KButtonSecondaryHover, var(--blue-300, var(--kui-color-background-primary-weak, $kui-color-background-primary-weak)));
    }
    &:active {
      background-color: var(--KButtonSecondaryActive, var(--blue-300, var(--kui-color-background-primary-weak, $kui-color-background-primary-weak)));
    }
    &:focus {
      @include boxShadow(var(--KButtonSecondaryBase, var(--blue-300, var(--kui-color-background-primary-weak, $kui-color-background-primary-weak))));
    }
    &:disabled,
    &[disabled] {
      // Use !important to override conflicting styles
      background-color: var(--grey-300, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker)) !important;
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.primary {
    background-color: var(--KButtonPrimaryBase, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary)));
    color: var(--white, var(--kui-color-text-inverse, $kui-color-text-inverse));
    &:hover:not(:disabled) {
      background-color: var(--KButtonPrimaryHover, var(--blue-600, var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger)));
    }
    &:active {
      background-color: var(--KButtonPrimaryActive, var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger));
    }
    &:focus {
      @include boxShadow(var(--KButtonPrimaryBase, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker)) !important;
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.danger {
    background-color: var(--KButtonDangerBase, var(--red-500, var(--kui-color-background-danger, $kui-color-background-danger)));
    color: var(--white, var(--kui-color-text-inverse, $kui-color-text-inverse));
    &:hover:not(:disabled) {
      background-color: var(--KButtonDangerHover, var(--kui-color-background-danger-strong, rgba($kui-color-background-danger-strong, .85)));
    }
    &:active {
      background-color: var(--KButtonDangerActive, var(--red-700, var(--kui-color-background-danger-strong, $kui-color-background-danger-strong)));
    }
    &:focus {
      @include boxShadow(var(--KButtonDangerBase, var(--red-700, var(--kui-color-background-danger-strong, $kui-color-background-danger-strong))));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker)) !important;
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.creation {
    background-color: var(--KButtonCreationBase, var(--green-500, $tmp-color-green-500));
    color: var(--white, var(--kui-color-text-inverse, $kui-color-text-inverse));
    &:hover:not(:disabled) {
      background-color: var(--KButtonCreationHover, rgba($tmp-color-green-600, .85));
    }
    &:active {
      background-color: var(--KButtonCreationActive, var(--green-600, $tmp-color-green-600));
    }
    &:focus {
      @include boxShadow(var(--KButtonCreationBase, var(--green-600, $tmp-color-green-600)));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--grey-300, var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker)) !important;
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.outline {
    background-color: var(--white, var(--kui-color-background, $kui-color-background));
    border-color: var(--KButtonOutlineBorder, var(--kui-color-border-primary, rgba($kui-color-border-primary, .4)));
    color: var(--KButtonOutlineColor, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
    outline-style: inherit;
    &:hover:not(:disabled) {
      border-color: var(--KButtonOutlineHoverBorder, var(--kui-color-border-primary, $kui-color-border-primary));
    }
    &:active {
      background-color: var(--KButtonOutlineActive, var(--blue-100, var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest)));
      border-color: var(--KButtonOutlineActiveBorder, var(--kui-color-border-primary, $kui-color-border-primary));
    }
    &:focus {
      @include boxShadow(var(--KButtonOutlineBorder, var(--blue-500, var(--kui-color-background-primary, $kui-color-background-primary))));
    }
    &:disabled,
    &[disabled] {
      border-color: var(--grey-400, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak)) !important;
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.btn-link {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    color: var(--KButtonLink, var(--blue-500, var(--kui-color-text-primary, $kui-color-text-primary)));
    padding: var(--kui-space-0, $kui-space-0);

    &:hover:not(:disabled) {
      text-decoration: underline;
    }

    &:focus {
      text-decoration: underline;
    }

    &:focus-visible,
    &:focus-visible:disabled {
      border-radius: unset;
      outline: auto 1px;
      outline: -webkit-focus-ring-color auto 1px;
      outline-offset: 3px;
      text-decoration: none;
      transition: none;
    }

    &:disabled,
    &[disabled] {
      color: var(--grey-400, var(--kui-color-text-disabled, $kui-color-text-disabled)) !important;
    }
  }

  &.btn-link-danger {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    color: var(--KButtonLinkDanger, var(--red-500, var(--kui-color-text-danger, $kui-color-text-danger)));
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--red-700, var(--kui-color-background-danger-strong, $kui-color-background-danger-strong)), 0, 2px);
    }
  }

  &.rounded {
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
  }
}
</style>
