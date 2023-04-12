<template>
  <li
    class="k-dropdown-item w-100"
    :class="{
      'has-divider': hasDivider,
      'disabled': type === 'default' && disabled,
      'danger': isDangerous,
      'k-dropdown-selected-option': selected
    }"
    :data-testid="`k-dropdown-item-${label.replace(/ /gi, '-')}`"
  >
    <a
      v-if="type === 'link' && to && !!disabled"
      class="k-dropdown-item-trigger"
      :class="{ 'disabled': disabled }"
      data-testid="k-dropdown-item-trigger"
      href="#"
      @click.prevent.stop=""
    >
      <slot>{{ label }}</slot>
    </a>
    <router-link
      v-else-if="type === 'link' && to"
      class="k-dropdown-item-trigger"
      :class="{ 'disabled': disabled }"
      data-testid="k-dropdown-item-trigger"
      :to="!disabled ? to : routePath"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </router-link>
    <KButton
      v-else-if="type === 'button'"
      class="k-dropdown-item-trigger btn-link k-button non-visual-button"
      data-testid="k-dropdown-item-trigger"
      :disabled="disabled"
      :is-rounded="false"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </KButton>
    <div
      v-else
      class="k-dropdown-item-trigger"
      data-testid="k-dropdown-item-trigger"
    >
      <slot>{{ label }}</slot>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { DropdownItem, DropdownItemType } from '@/types'
import { computed, PropType } from 'vue'
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
</script>

<style lang="scss">
// Must leave this block unscoped as it sometimes causes issues with slotted/nested styles
@import '@/styles/variables';
@import '@/styles/functions';

li.k-dropdown-item {
  align-items: center;
  display: flex;
  font-size: 16px;
  line-height: 1;

  &:not(:first-of-type).has-divider {
    $k-dropdown-item-divider-container-height: 24px; // set to the same value as --spacing-lg without the units
    $k-dropdown-item-divider-position: -13px; // this should be negative (<container-height> / 2 + 1)
    margin-top: $k-dropdown-item-divider-container-height;
    position: relative;

    &:before {
      background: var(--grey-200);
      content: '';
      display: block;
      height: 1px;
      position: absolute;
      top: $k-dropdown-item-divider-position;
      width: 100%;
    }
  }

  svg {
    margin-right: 12px;
  }

  &:hover {
    background-color: var(--grey-100);
  }

  .k-dropdown-item-trigger,
  // Override .btn-link styles
  .k-dropdown-item-trigger.btn-link {
    color: var(--black-70);
    padding: var(--spacing-md) var(--spacing-lg);
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:disabled,
    &.disabled {
      color: var(--grey-400) !important;
      cursor: not-allowed !important;

      &:hover {
        background-color: var(--grey-200) !important;
      }
    }
  }
}

.k-dropdown-item {
  a, button {
    &.k-dropdown-item-trigger {
      text-decoration: none !important;
    }
  }

  &.danger {
    button:not(:disabled),
    a:not(:disabled) {
      color: var(--red-500);
      transition: all 300ms;

      &:hover {
        color: var(--red-500);
      }
    }
  }
}
</style>
