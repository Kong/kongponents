<template>
  <li
    class="k-dropdown-item w-100"
    :class="{
      'has-divider': type !== 'link' && hasDivider,
      'disabled': type === 'default' && disabled,
      'danger': isDangerous,
      'k-dropdown-selected-option': selected
    }"
    :data-testid="`k-dropdown-item-${label.replace(/ /gi, '-')}`"
  >
    <a
      v-if="type === 'link' && to && !!disabled"
      class="k-dropdown-item-trigger"
      :class="{ 'disabled': disabled, 'has-divider': hasDivider }"
      data-testid="k-dropdown-item-trigger"
      href="#"
      @click.prevent.stop=""
    >
      <slot>{{ label }}</slot>
    </a>
    <router-link
      v-else-if="type === 'link' && to"
      class="k-dropdown-item-trigger"
      :class="{ 'disabled': disabled, 'has-divider': hasDivider }"
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

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import { DropdownItem } from './KDropdownMenu.vue'

export default defineComponent({
  name: 'KDropdownItem',
  components: { KButton },
  props: {
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
  },
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const type = computed(() => {
      if (props.item?.to) {
        return 'link'
      } else if (typeof props.onClick !== 'undefined' || props.selectionMenuChild) {
        // checking attrs since we deleted click from listeners
        return 'button'
      }
      return 'default'
    })

    const routePath = computed(() => {
      // @ts-ignore
      if ($route) {
        // @ts-ignore
        return $route?.path
      }

      return ''
    })

    const label = computed(() => {
      return (props.item?.label) || ''
    })

    const to = computed(() => {
      return (props.item?.to) || undefined
    })

    const handleClick = (evt: any): void => {
      emit('click', evt)

      if (props.selectionMenuChild) {
        emit('change', props.item)
      }
    }

    return {
      type,
      label,
      to,
      handleClick,
      routePath,
    }
  },
})
</script>

<style lang="scss">
// Must leave this block unscoped as it sometimes causes issues with slotted/nested styles
@import '@/styles/variables';
@import '@/styles/functions';

.k-dropdown-menu {
  li.k-dropdown-item {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 1;

    &.has-divider {
      $k-dropdown-item-divider-container-height: 24px; // set to the same value as --spacing-lg without the units
      $k-dropdown-item-divider-position: -13px; // this should be negative (<container-height> / 2 + 1)
      position: relative;
      margin-top: $k-dropdown-item-divider-container-height;

      &:before {
        position: absolute;
        top: $k-dropdown-item-divider-position;
        display: block;
        width: 100%;
        height: 1px;
        content: '';
        background: var(--grey-200);
      }
    }

    svg {
      margin-right: 12px;
    }

    &:hover {
      background-color: var(--grey-100);
    }

    .k-dropdown-item-trigger {
      width: 100%;
      padding: var(--spacing-md) var(--spacing-lg);
      color: var(--black-70);
      text-align: left;
      text-decoration: none;

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
}
</style>
