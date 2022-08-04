<template>
  <li
    :class="{
      'has-divider': type !== 'link' && hasDivider,
      'disabled': type === 'default' && disabled,
      'danger': isDangerous,
      'k-dropdown-selected-option': selected
    }"
    :data-testid="`k-dropdown-item-${label.replace(' ', '-')}`"
    class="k-dropdown-item w-100"
  >
    <router-link
      v-if="type === 'link' && to"
      v-bind="$attrs"
      :to="!disabled ? to : $route.path"
      :class="{ 'disabled': disabled, 'has-divider': hasDivider }"
      class="k-dropdown-item-trigger"
      data-testid="k-dropdown-item-trigger"
    >
      <slot>{{ label }}</slot>
    </router-link>
    <KButton
      v-else-if="type === 'button'"
      v-bind="$attrs"
      :disabled="disabled"
      :is-rounded="false"
      class="k-dropdown-item-trigger btn-link k-button non-visual-button"
      data-testid="k-dropdown-item-trigger"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </KButton>
    <div
      v-else
      v-bind="$attrs"
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
import { DropdownItem } from '@/components/KDropdownMenu/KDropdownMenu.vue'

export default defineComponent({
  name: 'KDropdownItem',
  components: { KButton },
  inheritAttrs: false,
  props: {
    item: {
      type: Object as PropType<DropdownItem>,
      default: null,
      // Items must have a label
      validator: (item: DropdownItem) => Object.hasOwn(item, 'label'),
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
  },
  emits: ['click', 'change'],
  setup(props, { attrs, emit }) {
    const type = computed(() => {
      if (props.item?.to) {
        return 'link'
      } else if (attrs.onClick || props.selectionMenuChild) {
        // checking attrs since we deleted click from listeners
        return 'button'
      }
      return 'default'
    })

    const label = computed(() => {
      return (props.item?.label) || ''
    })

    const to = computed(() => {
      return (props.item?.to) || undefined
    })

    const listeners = computed(() => {
      const onRE = /^on[^a-z]/
      const listeners = {} as any

      for (const property in attrs) {
        if (onRE.test(property) && !!attrs[property]) {
          listeners[property] = attrs[property]
        }
      }
      // use @click in template and emit
      delete listeners.click
      return listeners
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
      listeners,
      handleClick,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

li.k-dropdown-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1;

  &.has-divider {
    border-top: 1px solid var(--grey-200) !important;
  }

  svg {
    margin-right: .75rem;
  }

  &:hover {
    background-color: var(--grey-100);
  }

  .k-dropdown-item-trigger {
    text-align: left;
    padding: var(--spacing-md) var(--spacing-lg);
    text-decoration: none;
    width: 100%;
    color: var(--black-70);

    &:disabled,
    &.disabled {
      cursor: not-allowed !important;
      color: var(--grey-400) !important;

      &:hover {
        background-color: var(--grey-200) !important;
      }
    }
  }
}
</style>

<style lang="scss">
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
