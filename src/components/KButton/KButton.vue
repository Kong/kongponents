<template>
  <component
    :is="buttonType"
    class="k-button"
    :class="[buttonSize, buttonAppearance, { 'icon-button': icon === true || (!slots.default && slots.icon /* TODO: remove this once we remove icon slot */) }]"
    :disabled="disabled ? disabled : undefined"
    :tabindex="disabled && buttonType !== 'button' ? '-1' : undefined"
    :type="type"
    v-bind="strippedAttrs"
    v-on="listeners"
  >
    <!-- @deprecated -->
    <!-- KButton: `icon` slot will be removed in the next major release -->
    <slot name="icon" />
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, useAttrs, watch } from 'vue'
import { ButtonAppearances } from '@/types'
import type { ButtonAppearance, ButtonProps, ButtonSize, ButtonSlots } from '@/types'

const {
  appearance = 'primary',
  size = 'medium',
  to = null,
  type = 'button',
  disabled,
  icon,
} = defineProps<ButtonProps>()

// Deprecation warning. Remove this in next major release.
watch(() => icon, (value) => {
  if (typeof value === 'string') {
    console.warn('KButton: `icon` prop usage has changed. Please refer to the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kbutton')
  }
}, { immediate: true })

const slots = defineSlots<ButtonSlots>()
const attrs = useAttrs()

const buttonType = computed((): string => {
  if (to && typeof to === 'string') {
    return 'a'
  } else if (to) {
    return 'router-link'
  }

  return 'button'
})

const buttonAppearance = computed((): ButtonAppearance | [ButtonAppearance, string] => {
  // If the appearance is invalid, output both to keep backwards compatibility
  // in case some of the tests rely on the invalid appearance output
  if (Object.values(ButtonAppearances).indexOf(appearance) === -1) {
    return ['primary', appearance]
  }

  return appearance
})

const buttonSize = computed((): ButtonSize | null => {
  if (appearance === 'none' && !icon) {
    return null
  }

  return size
})

/**
* Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
* Vue 3 no longer removes attribute if the value is boolean false. Instead, it's set as attr="false".
* So for <KButton :disabled="false" to="SOME_URL">, the rendered <a> element will have `disabled="false"`,
* which is greyed out and cannot be interacted with.
*/
const strippedAttrs = computed((): typeof attrs => {
  const modifiedAttrs = Object.assign({}, attrs)

  if (to) {
    if (typeof to === 'string') {
      modifiedAttrs.href = to
    } else {
      // `to` prop is nessessary for router-link to successfully render
      modifiedAttrs.to = to
    }
    if (disabled) {
      // Set href to null so that user cannot bypass by right clicking it and opening in new tab
      modifiedAttrs.href = null
    }
  }

  if (disabled !== undefined && disabled !== false) {
    return modifiedAttrs
  }

  delete modifiedAttrs.disabled

  return modifiedAttrs
})

const stop = (event: Event) => {
  event.preventDefault()
  event.stopPropagation()
}

const listeners = computed(() => {
  if (!disabled || buttonType.value === 'button') {
    return {}
  }

  // Only prevent clicks on disabled links, emulating the same behavior as a disabled button
  return {
    clickCapture: stop,
    dblclickCapture: stop,
    mousedownCapture: stop,
    mouseupCapture: stop,
  }
})

onMounted(() => {
  if (slots.icon) {
    console.warn('KButton: `icon` slot is deprecated. Please slot an icon into the `default` slot instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kbutton')
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
/* Component styles */

.k-button {
  // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
  // stylelint-disable-next-line no-duplicate-selectors
  & {
    @include kButtonMediumSize; // medium size is the default (in case of invalid size)
  }

  // fixing mixed-decls deprecation: https://sass-lang.com/d/mixed-decls
  // stylelint-disable-next-line no-duplicate-selectors
  & {
    align-items: center;
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    cursor: pointer;
    display: inline-flex;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
    justify-content: center;
    // Remove tap color highlight on mobile Safari
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    text-align: center;
    text-decoration: none;
    transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc, border-color $kongponentsTransitionDurTimingFunc;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }

  &:focus, &:active, &:focus-visible {
    outline: none;
  }

  &:focus-visible {
    box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
  }

  &:disabled, &[disabled] {
    box-shadow: none;
    cursor: not-allowed;
  }

  /* Appearances */

  &.primary {
    background-color: var(--kui-color-background-primary, $kui-color-background-primary);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);

    &:hover:not(:disabled):not([disabled]):not(:focus):not(:active) {
      background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong);
    }

    &:focus-visible {
      background-color: var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger);
    }

    &:active {
      background-color: var(--kui-color-background-primary-strongest, $kui-color-background-primary-strongest);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.secondary {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-primary, $kui-color-border-primary);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled):not([disabled]):not(:focus):not(:active) {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      border-color: var(--kui-color-border-primary-strong, $kui-color-border-primary-strong);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus-visible {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      border-color: var(--kui-color-border-primary-stronger, $kui-color-border-primary-stronger);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    }

    &:active {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      border-color: var(--kui-color-border-primary-strongest, $kui-color-border-primary-strongest);
      color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      border-color: var(--kui-color-border-disabled, $kui-color-border-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.tertiary {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled):not([disabled]):not(:focus):not(:active) {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus-visible {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    }

    &:active {
      background-color: var(--kui-color-background-primary-weaker, $kui-color-background-primary-weaker);
      color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.danger {
    background-color: var(--kui-color-background-danger, $kui-color-background-danger);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);

    &:hover:not(:disabled):not([disabled]):not(:focus):not(:active) {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong);
    }

    &:focus-visible {
      background-color: var(--kui-color-background-danger-stronger, $kui-color-background-danger-stronger);
    }

    &:active {
      background-color: var(--kui-color-background-danger-strongest, $kui-color-background-danger-strongest);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  // reset the style of a button to bare minimum
  // using :where() here to make style override easier
  &:where(.none) {
    all: unset;
    align-items: center;
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    text-align: center;
    transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc, border-color $kongponentsTransitionDurTimingFunc;
    user-select: none;
    white-space: nowrap;

    &:where(.disabled, [disabled]) {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }

    &:where(.icon-button) {
      border-color: transparent;
      border-style: solid;
    }
  }

  /* Sizes */

  &.large {
    font-size: var(--kui-font-size-40, $kui-font-size-40);
    gap: var(--kui-space-40, $kui-space-40);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);

    &.icon-button {
      padding: var(--kui-space-30, $kui-space-30);
    }

    // enforce icon size exported by @kong/icons because it's defined by the design system
    :deep(#{$kongponentsKongIconSelector}) {
      height: var(--kui-icon-size-50, $kui-icon-size-50) !important;
      width: var(--kui-icon-size-50, $kui-icon-size-50) !important;
    }
  }

  &.medium {
    @include kButtonMediumSize;
  }

  &.small {
    border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
    border-width: var(--kui-border-width-10, $kui-border-width-10);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    gap: var(--kui-space-20, $kui-space-20);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    padding: var(--kui-space-10, $kui-space-10) var(--kui-space-30, $kui-space-30);

    &.icon-button {
      padding: var(--kui-space-10, $kui-space-10);
    }

    // enforce icon size exported by @kong/icons because it's defined by the design system
    :deep(#{$kongponentsKongIconSelector}) {
      height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
      width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
    }
  }
}
</style>
