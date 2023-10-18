<template>
  <li
    class="k-dropdown-item"
    :class="{
      'has-divider': hasDivider,
      'disabled': type === 'default' && disabled,
      'danger': isDangerous,
      'k-dropdown-selected-option': selected
    }"
    :data-testid="`k-dropdown-item-${label.replace(/ /gi, '-')}`"
  >
    <component
      :is="availableComponents[componentType].tag"
      data-testid="k-dropdown-item-trigger"
      v-bind="availableComponents[componentType].attrs"
      @click="availableComponents[componentType].onClick"
    >
      <span
        class="k-dropdown-item-trigger-label"
        :title="label"
      >
        <slot>{{ label }}</slot>
      </span>
    </component>
  </li>
</template>

<script lang="ts" setup>
import type { DropdownItem, DropdownItemRenderedRecord, DropdownItemRenderedType, DropdownItemType } from '@/types'
import type { PropType } from 'vue'
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const props = defineProps({
  item: {
    type: Object as PropType<DropdownItem>,
    default: null,
    // Items must have a label
    validator: (item: DropdownItem) => item.label !== undefined,
  },
  /**
   * Use this prop to add a divider above the item.
   */
  hasDivider: {
    type: Boolean,
    default: false,
  },
  isDangerous: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
  /**
   * Internal use only - for tracking selection in conjunction with items prop.
   */
  selectionMenuChild: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: undefined,
  },
})

const emit = defineEmits<{
  (e: 'click', val: Event): void;
  (e: 'change', item: DropdownItem): void;
}>()

const type = computed((): DropdownItemType => {
  if (props.item?.to) {
    return 'link'
  } else if (typeof props.onClick !== 'undefined' || props.selectionMenuChild) {
    // checking attrs since we deleted click from listeners
    return 'button'
  }
  return 'default'
})

const label = computed((): string => (props.item?.label) || '')

const to = computed((): string | object | undefined => (props.item?.to) || undefined)

const handleClick = (event: Event): void => {
  emit('click', event)

  if (props.selectionMenuChild) {
    emit('change', props.item)
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

  delete modifiedAttrs.class
  delete modifiedAttrs.disabled

  return modifiedAttrs
})

const availableComponents = computed((): DropdownItemRenderedRecord => ({
  link: {
    tag: 'a',
    attrs: {
      class: `k-dropdown-item-trigger ${props.disabled ? 'disabled' : ''} ${attrs.class || ''}`,
      href: to.value as string,
      // only add disabled attribute if props.disabled returns truthy value, otherwise it will be added as disabled="false" which will be treaded as disabled
      ...(!!props.disabled && { disabled: true }),
      ...strippedAttrs.value,
    },
  },
  'router-link': {
    tag: 'router-link',
    onClick: handleClick,
    attrs: {
      class: `k-dropdown-item-trigger ${props.disabled ? 'disabled' : ''} ${attrs.class || ''}`,
      to: to.value,
      // only add disabled attribute if props.disabled returns truthy value, otherwise it will be added as disabled="false" which will be treaded as disabled
      ...(!!props.disabled && { disabled: true }),
      ...strippedAttrs.value,
    },
  },
  button: {
    tag: 'button',
    onClick: handleClick,
    attrs: {
      class: `k-dropdown-item-trigger ${props.disabled ? 'disabled' : ''} ${attrs.class || ''}`,
      disabled: props.disabled,
      ...strippedAttrs.value,
    },
  },
  div: {
    tag: 'div',
    attrs: {
      class: 'k-dropdown-item-trigger',
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
  justify-content: space-between;
  list-style: none;

  &:first-of-type {
    .k-dropdown-item-trigger {
      border-top-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      border-top-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    }
  }

  &:last-of-type {
    .k-dropdown-item-trigger {
      border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
      border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    }
  }

  &.has-divider {
    border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
  }

  &.danger {
    .k-dropdown-item-trigger {
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

  .k-dropdown-item-trigger {
    background-color: var(--kui-color-background, $kui-color-background);
    border: 0;
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    cursor: pointer;
    display: flex;
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding: var(--kui-space-50, $kui-space-50) var(--kui-space-60, $kui-space-60);
    text-align: left;
    text-decoration: none;
    transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc;
    width: 100%;

    &:focus, &:active, &:focus-visible {
      outline: none;
    }

    &:focus-visible {
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      z-index: 1; // need this to prevent box shadow being cut off by the next/previous sibling
    }

    &:hover:not(:disabled):not(.disabled):not(:focus):not(:active) {
      background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest);
      color: var(--kui-color-text, $kui-color-text);
    }

    &:focus:not(:disabled):not(.disabled), &:active:not(:disabled):not(.disabled) {
      background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
      color: var(--kui-color-text, $kui-color-text);
    }

    &:disabled, &[disabled], &.disabled {
      cursor: not-allowed;
    }

    // remove pointer events from only <a>
    &[disabled]:not(:disabled) {
      pointer-events: none;
    }

    .k-dropdown-item-trigger-label {
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
  .k-dropdown-item-trigger {
    .k-dropdown-item-trigger-label {
      #{$kongponentsKongIconSelector} {
        height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
        width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
      }
    }
  }
}
</style>
