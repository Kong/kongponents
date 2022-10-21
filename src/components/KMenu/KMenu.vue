<template>
  <div
    :style="widthStyle"
    class="k-menu"
  >
    <slot name="body">
      <div>
        <template
          v-for="(item, index) in items"
          :key="item.title + index"
        >
          <KMenuItem
            :item="item"
            :expandable="item.expandable"
            :type="item.type"
            :last-menu-item="index === items.length - 1"
            :test-mode="!!testMode || undefined"
            :class="{ 'last-menu-item': index === items.length - 1 }"
          />
        </template>
      </div>
    </slot>
    <div
      v-if="hasActionButton"
      class="clear-cta-button"
    >
      <KMenuDivider />
      <slot name="actionButton">
        <KButton
          @click="proceed"
          @keyup.enter="proceed"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import useUtilities from '@/composables/useUtilities'
import KMenuItem from '@/components/KMenu/KMenuItem.vue'
import type { MenuItem } from './KMenuItem.vue'
import KMenuDivider from '@/components/KMenu/KMenuDivider.vue'

const { getSizeFromString } = useUtilities()

export interface KMenuItemType extends MenuItem {
  expandable: boolean
  type: 'string' | 'number' | 'divider'
}

export default defineComponent({
  name: 'KMenu',
  components: { KMenuItem, KMenuDivider },
  props: {
    items: {
      type: Array as PropType<KMenuItemType[]>,
      required: false,
      default: () => [],
    },
    actionButton: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '284',
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['proceed'],
  setup(props, { emit, slots }) {
    const widthStyle = computed((): Record<string, string> => {
      return {
        width: getSizeFromString(props.width),
      }
    })

    const hasActionButton = computed((): boolean => !!slots.actionButton)

    const proceed = (): void => {
      emit('proceed')
    }

    return {
      widthStyle,
      hasActionButton,
      proceed,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-menu {
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  padding-top: 11px;
  padding-bottom: 8px;
}

.clear-cta-button > :deep(button.k-button) {
  border: none;
  color: var(--blue-300);
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 6px;
  margin-top: 10px;
  padding-top: 2px;

  &:active, &:hover {
    color: var(--blue-500);
    background-color: transparent;
  }

  &:focus {
    box-shadow: none;
    color: var(--blue-500);
    background-color: transparent;
  }
}

</style>
