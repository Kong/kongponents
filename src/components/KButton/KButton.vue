<template>
  <component
    :is="buttonType"
    class="k-button"
    :class="[size, appearance, { 'icon-button': !slots.default && slots.icon /** TODO: [beta] change this to be controlled by icon prop and clean up occurrences of 'icon-button' class */ }]"
    :disabled="disabled ? disabled : undefined"
    :type="type"
    v-bind="strippedAttrs"
  >
    <!-- TODO: [beta] remove this slot -->
    <slot name="icon">
      <KIcon
        v-if="icon"
        class="k-button-icon"
        :color="kIconColor"
        :icon="icon"
      />
    </slot>
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, useAttrs, useSlots } from 'vue'
import { ButtonAppearances, ButtonSizes } from '@/types'
import type { ButtonAppearance, ButtonSize } from '@/types'
import KIcon from '@/components/KIcon/KIcon.vue'
import { KUI_COLOR_TEXT_PRIMARY, KUI_COLOR_TEXT_INVERSE, KUI_COLOR_TEXT_DISABLED } from '@kong/design-tokens'

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
  // TODO: [beta] turn this into boolean to control icon-only buttons
  // TODO: [beta] also add a validator to ensure it's a boolean
  icon: {
    type: String,
    default: '',
    validator: (value: string): boolean => {
      if (value) {
        console.warn('KButton: `icon` prop will be changed to a boolean in the 9.0.0-beta.0 release. Please use the `default` slot instead. See KButton docs for more details: https://alpha--kongponents.netlify.app/components/button.html#default')
      }

      return true
    },
  },
})

const slots = useSlots()
const attrs = useAttrs()

const buttonType = computed((): string => {
  if (props.to && typeof props.to === 'string') {
    return 'a'
  } else if (props.to) {
    return 'router-link'
  }

  return 'button'
})

/**
* Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
* Vue 3 no longer removes attribute if the value is boolean false. Instead, it's set as attr="false".
* So for <KButton :disabled="false" to="SOME_URL">, the rendered <a> element will have `disabled="false"`,
* which is greyed out and cannot be interacted with.
*/
const strippedAttrs = computed((): typeof attrs => {
  const modifiedAttrs = Object.assign({}, attrs)

  if (props.to && typeof props.to === 'string') {
    modifiedAttrs.href = props.to
  } else if (props.to) {
    modifiedAttrs.to = props.to
  }

  if (props.disabled !== undefined && props.disabled !== false) {
    return modifiedAttrs
  }

  delete modifiedAttrs.disabled

  return modifiedAttrs
})

// TODO: [beta] remove this once once we remove the icon prop
const kIconColor = computed((): string => {
  if (props.disabled || strippedAttrs.value.disabled) {
    return KUI_COLOR_TEXT_DISABLED
  }

  if (props.appearance === 'secondary' || props.appearance === 'tertiary') {
    return KUI_COLOR_TEXT_PRIMARY
  }

  return KUI_COLOR_TEXT_INVERSE
})

// onMounted(() => {
//   if (slots.icon) {
//     console.warn('KButton: `icon` slot is deprecated. Please slot an icon into the `default` slot instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/components/button.html#icon-1')
//   }
// })
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kButtonPrimaryAppearance {
  background-color: var(--kui-color-background-primary, $kui-color-background-primary);
  border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
  color: var(--kui-color-text-inverse, $kui-color-text-inverse);

  &:hover:not(:disabled):not(:focus):not(:active) {
    background-color: var(--kui-color-background-primary-strong, $kui-color-background-primary-strong);
  }

  &:focus {
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

@mixin kButtonMediumSize {
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  gap: var(--kui-space-30, $kui-space-30);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  padding: var(--kui-space-20, $kui-space-20) var(--kui-space-40, $kui-space-40);

  &.icon-button {
    padding: var(--kui-space-20, $kui-space-20);
  }

  // TODO: [beta] remove :deep(.kong-icon) once once we remove the icon prop & slot
  // enforce icon size exported by @kong/icons because it's defined by the design system
  :deep(#{$kongponentsKongIconSelector}), :deep(.kong-icon) {
    height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    width: var(--kui-icon-size-40, $kui-icon-size-40) !important;

    // TODO: [beta] remove this once once we remove the icon prop & slot
    svg {
      height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
      width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    }
  }
}

/* Component styles */

.k-button {
  @include kButtonPrimaryAppearance; // primary appearance is the default (in case of invalid appearance)
  @include kButtonMediumSize; // medium size is the default (in case of invalid size)

  align-items: center;
  border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
  cursor: pointer;
  display: inline-flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  font-weight: var(--kui-font-weight-semibold, $kui-font-weight-semibold);
  justify-content: center;
  // Remove tap color highlight on mobile Safari
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  text-decoration: none;
  transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc, border-color $kongponentsTransitionDurTimingFunc;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

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

  // remove pointer events from only <a>
  &[disabled]:not(:disabled) {
    pointer-events: none;
  }

  /* Appearances */

  &.primary {
    @include kButtonPrimaryAppearance;
  }

  &.secondary {
    background-color: var(--kui-color-background, $kui-color-background);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-primary, $kui-color-border-primary);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled):not(:focus):not(:active) {
      background-color: var(--kui-color-background, $kui-color-background);
      border-color: var(--kui-color-border-primary-strong, $kui-color-border-primary-strong);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus {
      background-color: var(--kui-color-background, $kui-color-background);
      border-color: var(--kui-color-border-primary-stronger, $kui-color-border-primary-stronger);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
    }

    &:active {
      background-color: var(--kui-color-background, $kui-color-background);
      border-color: var(--kui-color-border-primary-strongest, $kui-color-border-primary-strongest);
      color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
    }

    &:disabled, &[disabled] {
      background-color: var(--kui-color-background, $kui-color-background);
      border-color: var(--kui-color-border-disabled, $kui-color-border-disabled);
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
    }
  }

  &.tertiary {
    background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
    border: var(--kui-border-width-20, $kui-border-width-20) solid var(--kui-color-border-transparent, $kui-color-border-transparent);
    color: var(--kui-color-text-primary, $kui-color-text-primary);

    &:hover:not(:disabled):not(:focus):not(:active) {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
    }

    &:focus {
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

    &:hover:not(:disabled):not(:focus):not(:active) {
      background-color: var(--kui-color-background-danger-strong, $kui-color-background-danger-strong);
    }

    &:focus {
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

  /* Sizes */

  &.large {
    font-size: var(--kui-font-size-40, $kui-font-size-40);
    gap: var(--kui-space-40, $kui-space-40);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding: var(--kui-space-30, $kui-space-30) var(--kui-space-50, $kui-space-50);

    &.icon-button {
      padding: var(--kui-space-30, $kui-space-30);
    }

    // TODO: [beta] remove :deep(.kong-icon) once once we remove the icon prop & slot
    // enforce icon size exported by @kong/icons because it's defined by the design system
    :deep(#{$kongponentsKongIconSelector}), :deep(.kong-icon) {
      height: var(--kui-icon-size-50, $kui-icon-size-50) !important;
      width: var(--kui-icon-size-50, $kui-icon-size-50) !important;

      // TODO: [beta] remove this once once we remove the icon prop & slot
      svg {
        height: var(--kui-icon-size-50, $kui-icon-size-50) !important;
        width: var(--kui-icon-size-50, $kui-icon-size-50) !important;
      }
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

    // TODO: [beta] remove :deep(.kong-icon) once once we remove the icon prop & slot
    // enforce icon size exported by @kong/icons because it's defined by the design system
    :deep(#{$kongponentsKongIconSelector}), :deep(.kong-icon) {
      height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
      width: var(--kui-icon-size-30, $kui-icon-size-30) !important;

      // TODO: [beta] remove this once once we remove the icon prop & slot
      svg {
        height: var(--kui-icon-size-30, $kui-icon-size-30) !important;
        width: var(--kui-icon-size-30, $kui-icon-size-30) !important;
      }
    }
  }
}
</style>
