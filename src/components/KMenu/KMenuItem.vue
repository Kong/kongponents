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

export interface MenuItem {
  title: string
  description?: string
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
      type: String,
      default: 'string',
      validator: (val: string): boolean => ['string', 'number', 'divider'].includes(val),
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
    const isOpen = ref(false)
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
  position: relative;
  padding-left: 2px;
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  line-height: 24px;
  color: var(--grey-500);
  white-space: nowrap;
  list-style: none;
}

.span-icon-container {
  width: 24px;
  height: 24px;
  margin-left: auto;
}

.title-dark {
  color: var(--grey-600);
}

.k-menu-item .menu-button {
  padding-right: 24px;
  padding-left: 19px;
  cursor: pointer !important;
  &:hover {
    color: var(--grey-600);
  }
}

.menu-content {
  padding-right: 24px;
  padding-left: 19px;
  color: var(--grey-500);
}

.k-button.menu-button {
  width: 100%;
  font-family: var(--font-family-sans);
  font-size: 13px;
  font-weight: 400 !important;
  line-height: 24px;
  color: var(--KButtonOutlineColor, var(--grey-500));
  &:focus {
    box-shadow: 0 0 0 1px var(--blue-200);
  }
}

.k-button.medium {
  padding-top: 8px;
  padding-bottom: 8px;
}
.k-menu-item.expando-item > button + div + hr,
.last-menu-item,
.last-menu-item > button + div + hr,
.k-menu-item:last-of-type {
  border: 0;
}
</style>
