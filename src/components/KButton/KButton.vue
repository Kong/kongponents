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
        :size="KUI_ICON_SIZE_30"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :color="iconColor"
      icon="chevronDown"
      :size="KUI_ICON_SIZE_30"
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
        :size="KUI_ICON_SIZE_30"
      />
    </slot>

    <slot />

    <KIcon
      v-if="showCaret"
      :class="['caret']"
      :color="caretColor || iconColor"
      icon="chevronDown"
      :size="KUI_ICON_SIZE_30"
      view-box="2 2 15 15"
    />
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots, useAttrs } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import { type ButtonAppearance, ButtonAppearances, type ButtonSize, ButtonSizes } from '@/types'
import {
  KUI_COLOR_TEXT_NEUTRAL_WEAK,
  KUI_COLOR_TEXT_INVERSE,
  KUI_COLOR_TEXT_PRIMARY_STRONGER,
  KUI_ICON_SIZE_30,
} from '@kong/design-tokens'

const props = defineProps({
  /**
    * Base styling of the button
    * One of ['primary', 'secondary', 'tertiary', 'danger']
    */
  appearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'outline',
    validator: (value: ButtonAppearance): boolean => {
      return Object.values(ButtonAppearances).indexOf(value) !== -1
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
      return Object.values(ButtonSizes).indexOf(value) !== -1
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
  showCaret: { // TODO: remove this prop
    type: Boolean,
    default: false,
  },
  caretColor: { // TODO: remove this prop
    type: String,
    default: undefined,
  },
  isRounded: { // TODO: remove this prop
    type: Boolean,
    default: true,
  },
  icon: { // TODO: remove this prop
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
    return `var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK})`
  } else if (['primary', 'danger', 'creation'].includes(props.appearance)) {
    return `var(--kui-color-text-inverse, ${KUI_COLOR_TEXT_INVERSE})`
  } else if (props.appearance === 'secondary') {
    return `var(--kui-color-text-primary-stronger, ${KUI_COLOR_TEXT_PRIMARY_STRONGER})`
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
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>

@import '@/styles/tmp-variables';

@mixin boxShadow($color, $whiteShadowSpread: 2px, $colorShadowSpread: 4px) {
  box-shadow: 0 0 0 $whiteShadowSpread var(--kui-color-background, $kui-color-background), 0 0 0 $colorShadowSpread $color;
}

.k-button {
  align-items: center;
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  color: var(--kui-color-text, $kui-color-text);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  gap: var(--kui-space-40, $kui-space-40);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  padding: var(--kui-space-50, $kui-space-50) var(--kui-space-80, $kui-space-80);
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
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    padding: var(--kui-space-40, $kui-space-40) var(--kui-space-60, $kui-space-60);
  }

  &.medium {
    font-size: var(--kui-font-size-40, $kui-font-size-40);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-80, $kui-space-80);
  }

  &.large {
    font-size: var(--kui-font-size-40, $kui-font-size-40);
    line-height: var(--kui-line-height-10, $kui-line-height-10);
    padding: var(--kui-space-60, $kui-space-60) var(--kui-space-90, $kui-space-90);
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

  /* Appearance Variations */
  &.secondary {
    background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
    color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
    }
    &:active {
      background-color: var(--kui-color-background-primary-weak, $kui-color-background-primary-weak);
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary-weak, $kui-color-background-primary-weak));
    }
    &:disabled,
    &[disabled] {
      // Use !important to override conflicting styles
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.primary {
    background-color: var(--kui-color-background-primary, $kui-color-background-primary);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger);
    }
    &:active {
      background-color: var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger);
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary, $kui-color-background-primary));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.danger {
    background-color: var(--kui-color-background-danger, $kui-color-background-danger);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-danger-strong, rgba($kui-color-background-danger-strong, .85));
    }
    &:active {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong);
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-danger-strong, $kui-color-background-danger-strong));
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.creation {
    background-color: $tmp-color-green-500;
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);
    &:hover:not(:disabled) {
      background-color: rgba($tmp-color-green-600, .85);
    }
    &:active {
      background-color: $tmp-color-green-600;
    }
    &:focus {
      @include boxShadow($tmp-color-green-600);
    }
    &:disabled,
    &[disabled] {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.outline {
    background-color: var(--kui-color-background, $kui-color-background);
    border-color: var(--kui-color-border-primary, rgba($kui-color-border-primary, .4));
    color: var(--kui-color-text-primary, $kui-color-text-primary);
    outline-style: inherit;
    &:hover:not(:disabled) {
      border-color: var(--kui-color-border-primary, $kui-color-border-primary);
    }
    &:active {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      border-color: var(--kui-color-border-primary, $kui-color-border-primary);
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-primary, $kui-color-background-primary));
    }
    &:disabled,
    &[disabled] {
      border-color: var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak) !important;
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.btn-link {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    color: var(--kui-color-text-primary, $kui-color-text-primary);
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
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
    }
  }

  &.btn-link-danger {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    color: var(--kui-color-text-danger, $kui-color-text-danger);
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
    &:focus {
      @include boxShadow(var(--kui-color-background-danger-strong, $kui-color-background-danger-strong), 0, 2px);
    }
  }

  &.rounded {
    border-radius: var(--kui-border-radius-round, $kui-border-radius-round);
  }
}
</style>
