<template>
  <a
    v-if="typeof to === 'string'"
    class="k-button"
    :class="[size, appearance, { 'icon-button': !slots.default }]"
    :disabled="disabled ? disabled : undefined"
    :href="to"
    :type="type"
    v-bind="strippedAttrs"
  >
    <slot name="before" />

    <slot />

    <slot
      v-if="!slots.before"
      name="after"
    />
  </a>

  <component
    :is="buttonType"
    v-else
    class="k-button"
    :class="[size, appearance, { 'icon-button': !slots.default }]"
    :disabled="disabled ? disabled : undefined"
    :to="to"
    :type="type"
    v-bind="strippedAttrs"
  >
    <slot name="before" />

    <slot />

    <slot
      v-if="!slots.before"
      name="after"
    />
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useAttrs, useSlots } from 'vue'
import { type ButtonAppearance, ButtonAppearances, type ButtonSize, ButtonSizes } from '@/types'

const props = defineProps({
  /**
  * Base styling of the button
  * One of ['primary', 'secondary', 'tertiary', 'danger']
  */
  appearance: {
    type: String as PropType<ButtonAppearance>,
    default: 'primary',
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
  disabled: {
    type: Boolean,
    default: false,
  },
})

const slots = useSlots()
const attrs = useAttrs()

const buttonType = computed((): string => props.to ? 'router-link' : 'button')

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

.k-button {
  align-items: center;
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  gap: var(--kui-space-30, $kui-space-30);
  line-height: var(--kui-line-height-30, $kui-line-height-30); // TODO: ask about this
  // Remove tap color highlight on mobile Safari
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  transition: all $tmp-animation-timing-2 ease-in-out; // TODO: add animation timing design token
  vertical-align: middle;
  white-space: nowrap;

  &:focus, &:active {
    box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
    outline: none;
  }

  &:disabled, &[disabled] {
    box-shadow: none;
    cursor: not-allowed;
  }

  // remove pointer events from only <a>
  &[disabled]:not(:disabled) {
    pointer-events: none;
  }

  /* Appearances */

  &.primary {
    background-color: var(--kui-color-background-primary, $kui-color-background-primary);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-inverse, $kui-color-text-inverse);

    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong);
    }

    &:focus, &:active {
      background-color: var(--kui-color-background-primary-stronger, $kui-color-background-primary-stronger);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.secondary {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-primary, $kui-color-border-primary);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled) {
      border-color: var(--kui-color-border-primary-strong, $kui-color-border-primary-strong);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus, &:active {
      border-color: var(--kui-color-border-primary-stronger, $kui-color-border-primary-stronger);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    }

    &:disabled, &[disabled] {
      border-color: var(--kui-color-border-disabled, $kui-color-border-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.tertiary {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus, &:active {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
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

    &:hover:not(:disabled) {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong);
    }

    &:focus, &:active {
      background-color: var(--kui-color-background-danger-stronger, $kui-color-background-danger-stronger);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  /* Sizes */

  &.large {
    padding: var(--kui-space-40, $kui-space-40) var(--kui-space-60, $kui-space-60);

    &.icon-button {
      padding: var(--kui-space-40, $kui-space-40);
    }

    :deep(.kui-icon) {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      height: var(--kui-font-size-50, $kui-font-size-50) !important;
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      width: var(--kui-font-size-50, $kui-font-size-50) !important;
    }
  }

  &.medium {
    padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);

    &.icon-button {
      padding: var(--kui-space-30, $kui-space-30);
    }

    :deep(.kui-icon) {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      height: var(--kui-font-size-40, $kui-font-size-40) !important;
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      width: var(--kui-font-size-40, $kui-font-size-40) !important;
    }
  }

  &.small {
    padding: var(--kui-space-20, $kui-space-20) var(--kui-space-30, $kui-space-30);

    &.icon-button {
      padding: var(--kui-space-20, $kui-space-20);
    }

    :deep(.kui-icon) {
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      height: var(--kui-font-size-30, $kui-font-size-30) !important;
      /* stylelint-disable-next-line @kong/design-tokens/use-proper-token */
      width: var(--kui-font-size-30, $kui-font-size-30) !important;
    }
  }
}
</style>
