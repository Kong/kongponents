<template>
  <li
    class="k-dropdown-item"
    :class="[{
      'has-divider': hasDivider,
      'disabled': disabled,
      'danger': danger || isDangerous,
      'dropdown-selected-option': selected,
    }, $attrs.class, $attrs.style]"
    data-testid="dropdown-item"
  >
    <component
      :is="availableComponents[componentType].tag"
      data-testid="dropdown-item-trigger"
      v-bind="availableComponents[componentType].attrs"
      @click="availableComponents[componentType].onClick"
    >
      <span
        class="dropdown-item-trigger-label"
      >
        <slot>{{ label }}</slot>
      </span>
    </component>
  </li>
</template>

<script lang="ts" setup generic="T extends DropdownItem<string | number> | null = null">
import { computed, useAttrs, watch } from 'vue'
import type { DropdownItem, DropdownItemEmits, DropdownItemProps, DropdownItemRenderedRecord, DropdownItemRenderedType, DropdownItemType } from '@/types'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()

const {
  // item should be T rather than T | null that Vue compiler infers here
  item = null as T,
  hasDivider,
  danger,
  disabled,
  selected,
  selectionMenuChild,
  onClick,
  isDangerous = undefined,
} = defineProps<DropdownItemProps<T>>()

watch(() => isDangerous, (newVal) => {
  if (typeof newVal !== 'undefined') {
    console.warn('KDropdownItem: `isDangerous` prop is deprecated. Please use `danger` prop instead. See the migration guide for more details: https://kongponents.konghq.com/guide/migrating-to-version-9.html#kdropdownmenu')
  }
})

const emit = defineEmits<DropdownItemEmits<T>>()

const type = computed((): DropdownItemType => {
  if (item?.to) {
    return 'link'
  } else if (typeof onClick !== 'undefined' || selectionMenuChild) {
    // checking attrs since we deleted click from listeners
    return 'button'
  }

  return 'default'
})

const label = computed((): string => (item?.label) || '')

const to = computed((): string | object | undefined => (item?.to) || undefined)

const handleClick = (event: MouseEvent): void => {
  emit('click', event)

  if (selectionMenuChild) {
    emit('change', item)
  }
}

const componentType = computed((): DropdownItemRenderedType => {
  let result: DropdownItemRenderedType = 'div'

  if (type.value === 'link' && to.value && typeof to.value === 'string') {
    result = 'link'
  } else if (type.value === 'link' && to.value && typeof to.value === 'object') {
    result = 'router-link'
  } else if (type.value === 'button') {
    result = 'button'
  }

  return result
})

// Strips falsy `disabled` attribute, so it does not fall onto native <a> elements.
const strippedAttrs = computed((): typeof attrs => {
  const modifiedAttrs = Object.assign({}, attrs)

  // remove some attributes because we want them on wrapper element not the trigger element
  delete modifiedAttrs.class
  delete modifiedAttrs.disabled
  delete modifiedAttrs.style

  return modifiedAttrs
})

// do not change this value, it's used in tests
const dropdownItemTriggerClass = 'dropdown-item-trigger'

const availableComponents = computed((): DropdownItemRenderedRecord => ({
  link: {
    tag: 'a',
    attrs: {
      // add disabled class instead of disabled attribute because disabled is not a valid attribute for links
      class: `${dropdownItemTriggerClass} ${disabled ? 'disabled' : ''}`,
      href: to.value as string,
      ...strippedAttrs.value,
    },
  },
  'router-link': {
    tag: 'router-link',
    onClick: handleClick,
    attrs: {
      // add disabled class instead of disabled attribute because disabled is not a valid attribute for links
      class: `${dropdownItemTriggerClass} ${disabled ? 'disabled' : ''}`,
      to: to.value,
      ...strippedAttrs.value,
    },
  },
  button: {
    tag: 'button',
    onClick: handleClick,
    attrs: {
      type: 'button',
      // don't add disabled class because we want the disabled attribute on the button
      class: dropdownItemTriggerClass,
      disabled: disabled,
      ...strippedAttrs.value,
    },
  },
  div: {
    tag: 'div',
    attrs: {
      // add disabled class instead of disabled attribute because disabled is not a valid attribute for div
      class: `${dropdownItemTriggerClass} ${disabled ? 'disabled' : ''}`,
      ...strippedAttrs.value,
    },
  },
}))
</script>

<style lang="scss" scoped>
/* Component mixins */

@mixin kDropdownItemTriggerDefaults {
  transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc;
}

/* Component styles */

.k-dropdown-item, :deep(.k-dropdown-item) {
  display: flex;
  list-style: none;

  &.has-divider {
    display: flex;
    flex-direction: column;

    &::before {
      border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
      content: '';
      margin: var(--kui-space-20, $kui-space-20) 0;
      width: 100%;
    }
  }

  &.danger {
    .dropdown-item-trigger {
      color: var(--kui-color-text-danger, $kui-color-text-danger);

      &:hover:not(:disabled):not(.disabled):not(:focus):not(:active) {
        background-color: var(--kui-color-background-danger-weakest, $kui-color-background-danger-weakest);
        color: var(--kui-color-text-danger, $kui-color-text-danger);
      }

      &:focus:not(:disabled):not(.disabled), &:active:not(:disabled):not(.disabled) {
        background-color: var(--kui-color-background-danger-weaker, $kui-color-background-danger-weaker);
        color: var(--kui-color-text-danger, $kui-color-text-danger);
      }
    }
  }

  &.disabled {
    // add cursor pointer on wrapper element because <a> tag has pointer-events: none;
    cursor: not-allowed;
  }

  &.dropdown-selected-option {
    .dropdown-item-trigger {
      background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);

      &:hover:not(:disabled):not(.disabled):not(:focus):not(:active),
      &:focus:not(:disabled):not(.disabled),
      &:active:not(:disabled):not(.disabled) {
        background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
      }

      &:disabled, &[disabled], &.disabled {
        background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
      }
    }
  }

  .dropdown-item-trigger {
    background-color: var(--kui-color-background, $kui-color-background);
    border: 0;
    color: var(--kui-color-text, $kui-color-text);
    cursor: pointer;
    display: flex;
    flex: 1;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    max-width: 100%;
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-60, $kui-space-60);
    text-align: left;
    text-decoration: none;
    transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc;

    &:focus, &:active, &:focus-visible {
      outline: none;
    }

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      z-index: 1; // need this to prevent box shadow being cut off by the next/previous sibling
    }

    &:hover:not(:disabled):not(.disabled):not(:focus):not(:active) {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    }

    &:focus:not(:disabled):not(.disabled), &:active:not(:disabled):not(.disabled) {
      background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weak);
    }

    &:disabled, &[disabled], &.disabled {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled);
      cursor: not-allowed;
    }

    // remove pointer events from only <a>
    &.disabled {
      pointer-events: none;
    }

    .dropdown-item-trigger-label {
      align-items: center;
      display: inline-flex;
      gap: var(--kui-space-40, $kui-space-40);
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
// must stay unscoped as it's causing issues with the slotted/nested elements
// all rules must be very specific to avoid conflicts with other components

.k-dropdown-item {
  .dropdown-item-trigger {
    .dropdown-item-trigger-label {
      #{$kongponentsKongIconSelector} {
        height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
        width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
      }

      [role="button"] {
        &:not([disabled]) {
          cursor: pointer;

          &:focus, &:active {
            outline: none;
          }

          &:hover, &:focus {
            color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger) !important;
          }
        }

        &[disabled] {
          color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
