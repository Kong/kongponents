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
import KButton from '@/components/KButton/KButton.vue'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

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

const route = useRoute()

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

const routePath = computed((): string => route ? route.path : '')

const to = computed((): string | object | undefined => (props.item?.to) || undefined)

const handleClick = (event: Event): void => {
  emit('click', event)

  if (props.selectionMenuChild) {
    emit('change', props.item)
  }
}

const preventAndStopDefault = (event: Event): void => {
  event.preventDefault()
  event.stopPropagation()
}

const componentType = computed((): DropdownItemRenderedType => {
  let result: DropdownItemRenderedType = 'div'

  if (type.value === 'link' && !!to.value && !!props.disabled) {
    result = 'link'
  } else if (type.value === 'link' && to.value) {
    result = 'router-link'
  } else if (type.value === 'button') {
    result = 'button'
  }

  return result
})

const availableComponents = computed((): DropdownItemRenderedRecord => ({
  link: {
    tag: 'a',
    onClick: preventAndStopDefault,
    attrs: {
      class: `k-dropdown-item-trigger ${props.disabled ? 'disabled' : ''}`,
      href: '#',
    },
  },
  'router-link': {
    tag: 'router-link',
    onClick: handleClick,
    attrs: {
      class: `k-dropdown-item-trigger ${props.disabled ? 'disabled' : ''}`,
      to: !props.disabled ? to.value : routePath.value,
    },
  },
  button: {
    tag: KButton,
    onClick: handleClick,
    attrs: {
      class: 'k-dropdown-item-trigger k-button tertiary',
      disabled: props.disabled,
      isRounded: false,
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

<style lang="scss">
// Must leave this block unscoped as it sometimes causes issues with slotted/nested styles

@import '@/styles/tmp-variables';

@import '@/styles/mixins';

li.k-dropdown-item {
  .k-button {
    justify-content: flex-start;
  }

  align-items: center;
  display: flex;
  font-size: var(--kui-font-size-40, $kui-font-size-40);
  line-height: var(--kui-line-height-40, $kui-line-height-40);
  width: 100% !important;

  &:not(:first-of-type).has-divider {
    $k-dropdown-item-divider-container-height: var(--kui-space-80, $kui-space-80); // set to the same value as --spacing-lg without the units
    $k-dropdown-item-divider-position: -13px; // this should be negative (<container-height> / 2 + 1)
    margin-top: $k-dropdown-item-divider-container-height;
    position: relative;

    &:before {
      background: var(--kui-color-background-disabled, $kui-color-background-disabled);
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: $k-dropdown-item-divider-position;
      width: 100%;
    }
  }

  svg {
    margin-right: var(--kui-space-50, $kui-space-50);
  }

  &:hover {
    background-color: var(--kui-color-background-disabled, $kui-color-background-disabled);
  }

  .k-dropdown-item-trigger,
  // Override .btn-link styles
  .k-dropdown-item-trigger.tertiary {
    color: var(--kui-color-text, $kui-color-text);
    line-height: var(--kui-line-height-40, $kui-line-height-40);
    padding: var(--kui-space-60, $kui-space-60) var(--kui-space-80, $kui-space-80);
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:disabled,
    &.disabled {
      color: var(--kui-color-text-disabled, $kui-color-text-disabled) !important;
      cursor: not-allowed !important;

      &:hover {
        background-color: var(--kui-color-background-neutral-weakest, $kui-color-background-neutral-weakest) !important;
      }
    }
  }
}

.k-dropdown-item {
  a, button {
    &.k-dropdown-item-trigger {
      @include non-visual-button;
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      text-decoration: none !important;

      .k-dropdown-item-trigger-label {
        @include truncate;
      }
    }
  }

  &.danger {
    button:not(:disabled),
    a:not(:disabled) {
      color: var(--kui-color-text-danger, $kui-color-text-danger);
      transition: all $tmp-animation-timing-2;

      &:hover {
        color: var(--kui-color-text-danger, $kui-color-text-danger);
      }
    }
  }
}
</style>
