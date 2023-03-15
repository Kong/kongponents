<template>
  <div
    :id="menuItemId"
    class="k-menu-item"
    :class="[isOpen ? 'title-dark' : '', {'expando-item' : expandable}]"
    :data-testid="item ? `${item.title.replace(/ /gi, '-')}-menu-item` : 'menu-item'"
    :test-mode="!!testMode || undefined"
  >
    <KButton
      v-if="type !== 'divider'"
      :aria-expanded="isOpen && expandable || undefined"
      :aria-labelledby="menuItemId || undefined"
      class="menu-button non-visual-button"
      :is-rounded="false"
      type="button"
      @click="toggleMenuItem"
    >
      <span
        class="span-menu-title"
        :class="isOpen && expandable ? 'title-dark' : ''"
      >
        <slot name="itemTitle">
          {{ item ? item.title : '' }}
        </slot>
      </span>

      <span
        v-if="expandable"
        class="span-icon-container"
      >
        <KIcon
          color="var(--grey-400)"
          :icon="isOpen ? 'chevronUp' : 'chevronDown'"
          size="16"
        />
      </span>
    </KButton>

    <div
      v-if="expandable"
      class="menu-content"
      :class="isOpen ? 'd-flex' : 'd-none'"
    >
      <slot name="itemBody">
        <div v-if="(type === 'string' || type === 'divider') && expandable">
          {{ item ? item.description : '' }}
        </div>
        <div v-else-if="(type === 'number' || type === 'divider') && expandable">
          {{ item ? item.description : '' }}
        </div>
      </slot>
    </div>

    <div v-if="!lastMenuItem && (type === 'divider' || expandable)">
      <KMenuDivider />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KMenuDivider from '@/components/KMenu/KMenuDivider.vue'
import { v1 as uuidv1 } from 'uuid'
import type { MenuItem, MenuType, MenuTypeRecord } from '@/types'

const menuTypeRecord: MenuTypeRecord = {
  divider: 'divider',
  number: 'number',
  string: 'string',
}

export default defineComponent({
  name: 'KMenuItem',
  components: { KButton, KIcon, KMenuDivider },
  props: {
    item: {
      type: Object as PropType<MenuItem>,
      default: null,
    },
    expandable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String as PropType<MenuType>,
      default: 'string',
      validator: (value: MenuType): boolean => Object.values(menuTypeRecord).includes(value),
    },
    lastMenuItem: {
      type: Boolean,
      default: false,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['clicked'],
  setup(props, { emit, slots }) {
    const isOpen = ref<boolean>(false)

    const menuItemId = computed((): string => props.testMode ? 'test-menuitem-id-1234' : uuidv1())

    const toggleMenuItem = (): void => {
      if (props.expandable) {
        isOpen.value = !isOpen.value
      } else {
        emit('clicked', (slots.itemTitle || props.item))
      }
    }

    return {
      isOpen,
      menuItemId,
      toggleMenuItem,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-menu-item {
  color: var(--grey-500);
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  list-style: none;
  margin: 0;
  padding-left: 2px;
  position: relative;
  white-space: nowrap;
}

.span-icon-container {
  height: 24px;
  margin-left: auto;
  width: 24px;
}

.title-dark {
  color: var(--grey-600);
}

.k-menu-item .menu-button {
  cursor: pointer !important;
  padding-left: 19px;
  padding-right: 24px;
  &:hover {
    color: var(--grey-600);
  }
}

.menu-content {
  color: var(--grey-500);
  padding-left: 19px;
  padding-right: 24px;
}

.k-button.menu-button {
  color: var(--KButtonOutlineColor, var(--grey-500));
  font-family: var(--font-family-sans);
  font-size: 13px;
  font-weight: 400 !important;
  line-height: 24px;
  width: 100%;
  &:focus {
    box-shadow: 0 0 0 1px var(--blue-200);
  }
}

.k-button.medium {
  padding-bottom: 8px;
  padding-top: 8px;
}
.k-menu-item.expando-item > button + div + hr,
.last-menu-item,
.last-menu-item > button + div + hr,
.k-menu-item:last-of-type {
  border: 0;
}
</style>
