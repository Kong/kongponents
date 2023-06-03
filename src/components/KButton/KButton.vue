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
    return 'var(--grey-400)' // crma
  } else if (['primary', 'danger', 'creation'].includes(props.appearance)) {
    return 'white'
  } else if (props.appearance === 'secondary') {
    return 'var(--kui-color-text-primary, $kui-color-text-primary)' // previously blue-600
  } else if (props.appearance === 'outline') {
    return 'var(--kui-color-text-primary, $kui-color-text-primary)' // previously blue-500
  } else if (props.appearance === 'btn-link') {
    return 'var(--kui-color-text-primary, $kui-color-text-primary)' // previously blue-500
  } else if (props.appearance === 'btn-link-danger') {
    return 'var(--kui-color-text-danger, $kui-color-text-danger)' // previously red-500
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
// KButton design system tokenization exercise
// nciv = no change in value
// font-line-ratio = "use line-height-X for font-size-X" pattern
// crma = couldn't replace, missing alternative

@import '@/styles/variables';
@import '@/styles/functions';

@mixin boxShadow($color, $whiteShadowSpread: 2px, $colorShadowSpread: 4px) { // absolute value
  box-shadow: 0 0 0 $whiteShadowSpread var(--kui-color-background, $kui-color-background), 0 0 0 $colorShadowSpread $color; // nciv
}

.k-button {
  align-items: center;
  border: var(--kui-border-width-10, $kui-border-width-1) solid var(--kui-color-border-transparent, $kui-color-border-transparent); // nciv
  border-radius: var(--kui-border-radius-4, $kui-border-radius-4); // previously 3px, rounded up
  color: var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest); // previously black-70
  cursor: pointer;
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text); // nciv
  font-size: var(--kui-font-size-30, $kui-font-size-30); // nciv
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold); // nciv
  gap: var(--kui-space-20, $kui-space-20); // nciv
  line-height: var(--kui-line-height-30, $kui-line-height-30); // previously 1.25, font-line-ratio
  padding: var(--kui-space-50, $kui-space-50) var(--kui-space-80, $kui-space-80); // nciv
  position: relative;
  // Remove tap color highlight on mobile Safari
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  transition: all .2s ease-in-out;
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
    height: 38px; // absolute value
    justify-content: center;
  }

  /* Size Variations */
  &.small {
    font-size: var(--kui-font-size-20, kui-font-size-20); // previously 13px, rounded down
    line-height: var(--kui-line-height-10, $kui-line-height-10); // previously 13px, rounded down to closest value
    padding: var(--kui-space-20, $kui-space-20) // nciv
  }

  &.medium {
    font-size: var(--kui-font-size-40, $kui-font-size-40); // nciv
    line-height: var(--kui-line-height-40, $kui-line-heigh-40); // previously 16px, font-line-ratio
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-80, $kui-space-80); // nciv
  }

  &.large {
    font-size: var(--kui-font-size-40, $kui-font-size-40); // nciv
    line-height: var(--kui-line-height-40, $kui-line-heigh-40); // previously 16px, font-line-ratio
    padding: var(--kui-space-60, $kui-space-60) var(--kui-space-110, $kui-space-110); // nciv
  }

  /* class to add for dropdown caret */

  :deep(.caret) {
    display: inline-block;
    margin-left: var(--kui-space-40, $kui-space-40); // nciv
    padding: var(--kui-space-0, $kui-space-0); // nciv
    transition: 250ms ease;
  }

  &.is-active :deep(.caret) {
    transform: rotate(-180deg);
    transition: 250ms ease;
  }

  /* Apperance Variations */
  &.secondary {
    background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker); // previously blue-200
    color: var(--kui-color-text-primary, $kui-color-text-primary); // previously blue-600
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak); // previously blue-300
    }
    &:active {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak); // previously blue-300
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary-weak, $kui-color-background-primary-weak)); // previously blue-300
    }
    &:disabled,
    &[disabled] {
      // Use !important to override conflicting styles
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important; // previously grey-300
      color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak) !important; // previously grey-400, missing value, should not resolve
    }
  }

  &.primary {
    background-color: var(--kui-color-background-primary, $kui-color-background-primary); // previously blue-500
    color: var(--kui-color-text-inverse, $kui-color-text-inverse); // nciv
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong); // previously blue-600
    }
    &:active {
      background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong); // previously blue-600
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary, $kui-color-background-primary)); // previously blue-500
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important; // previously grey-300
      color: var(--grey-400) !important; // crma
    }
  }
  &.danger {
    background-color: var(--kui-color-background-danger, $kui-color-background-danger); // previously red-500
    color: var(--kui-color-text-inverse, $kui-color-text-inverse); // nciv
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong); // previously red-700
    }
    &:active {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong); // previously red-700
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-danger-strong, $kui-color-background-danger-strong)); // previously red-700
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important; // previously grey-300
      color: var(--grey-400) !important; // crma
    }
  }

  &.creation {
    background-color: var(--KButtonCreationBase, var(--green-500, color(green-500))); // crma
    color: var(--kui-color-text-inverse, $kui-color-text-inverse); // nciv
    &:hover:not(:disabled) {
      background-color: var(--KButtonCreationHover, rgba(color(green-600), .85)); // crma
    }
    &:active {
      background-color: var(--KButtonCreationActive, var(--green-600, color(green-600))); // crma
    }
    &:focus {
      @include boxShadow(var(--KButtonCreationBase, var(--green-600, color(green-600)))); // crma
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important; // previously grey-300
      color: var(--grey-400) !important; // crma
    }
  }

  &.outline {
    background-color: var(--kui-color-background, $kui-color-background); // nciv
    border-color: var(--kui-color-border-primary, $kui-color-border-primary); // previously blue-500
    color: var(--kui-color-text-primary, $kui-color-text-primary); // previously blue-500
    outline-style: inherit;
    &:hover:not(:disabled) {
      border-color: var(--kui-color-border-primary, $kui-color-border-primary); // previously blue-500
    }
    &:active {
      background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker); // previously blue-100
      border-color: var(--kui-color-border-primary, $kui-color-border-primary); // previously blue-500
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary, $kui-color-background-primary)); // previously blue-500
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important; // previously grey-300
      color: var(--grey-400) !important; // crma
    }
  }

  &.btn-link {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent); // nciv
    color: var(--kui-color-text-primary, $kui-color-text-primary); // previously blue-500
    padding: var(--kui-space-0, $kui-space-0); // nciv

    &:hover:not(:disabled) {
      text-decoration: underline;
    }

    &:focus {
      text-decoration: underline;
    }

    &:focus-visible,
    &:focus-visible:disabled {
      border-radius: unset;
      outline: auto var(--kui-border-width-10, $kui-border-width-10); // nciv
      outline: -webkit-focus-ring-color auto var(--kui-border-width-10, $kui-border-width-10); // nciv
      outline-offset: 3px; // absolute value
      text-decoration: none;
      transition: none;
    }

    &:disabled,
    &[disabled] {
      color: var(--grey-400) !important; // crma
    }
  }

  &.btn-link-danger {
    background-color: transparent;
    color: var(--kui-color-text-danger, $kui-color-text-danger); // previously red-500
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-danger-strong, $kui-color-background-danger-strong), 0, 2px); // previously red-700
    }
  }

  &.rounded {
    border-radius: var(--kui-border-radius-circle, $kui-border-radius-circle); // previously 100px
  }
}
</style>
