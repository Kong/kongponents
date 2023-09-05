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
      class="menu-button"
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
          :color="`var(--grey-400, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`"
          :icon="isOpen ? 'chevronUp' : 'chevronDown'"
          :size="KUI_ICON_SIZE_30"
        />
      </span>
    </KButton>

    <div
      v-if="expandable"
      class="menu-content"
      :class="isOpen ? 'is-open' : 'is-closed'"
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

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, computed, useSlots } from 'vue'
import KButton from '@/components/KButton/KButton.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KMenuDivider from '@/components/KMenu/KMenuDivider.vue'
import { v1 as uuidv1 } from 'uuid'
import type { MenuItem, MenuType } from '@/types'
import { MenuTypeArray } from '@/types'
import { KUI_COLOR_TEXT_NEUTRAL_WEAK, KUI_ICON_SIZE_30 } from '@kong/design-tokens'

const props = defineProps({
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
    validator: (value: MenuType): boolean => MenuTypeArray.includes(value),
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
})
const emit = defineEmits<{
  (e: 'clicked', val: MenuItem | any): void
}>()

const slots = useSlots()

const isOpen = ref<boolean>(false)

const menuItemId = computed((): string => props.testMode ? 'test-menuitem-id-1234' : uuidv1())

const toggleMenuItem = (): void => {
  if (props.expandable) {
    isOpen.value = !isOpen.value
  } else {
    emit('clicked', (slots.itemTitle || props.item))
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';
@import '@/styles/mixins';

.k-menu-item {
  color: var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral));
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  line-height: var(--kui-line-height-20, $kui-line-height-20);
  list-style: none;
  margin: var(--kui-space-0, $kui-space-0);
  padding-left: var(--kui-space-10, $kui-space-10);
  position: relative;
  white-space: nowrap;
}

.span-icon-container {
  height: var(--spacing-lg, '24px');
  margin-left: auto;
  width: var(--spacing-lg, '24px');
}

.title-dark {
  color: var(--grey-600, var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest));
}

.k-menu-item .menu-button {
  @include non-visual-button;
  cursor: pointer !important;
  padding-left: var(--kui-space-70, $kui-space-70);
  padding-right: var(--kui-space-80, $kui-space-80);
  &:hover {
    color: var(--grey-600, var(--kui-color-text-neutral-strongest, $kui-color-text-neutral-strongest));
  }
}

.menu-content {
  color: var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral));
  padding-left: var(--kui-space-70, $kui-space-70);
  padding-right: var(--kui-space-80, $kui-space-80);
  &.is-open {
    display: flex !important;
  }

  &.is-closed {
    display: none !important;
  }
}

.k-button.menu-button {
  color: var(--KButtonOutlineColor, var(--grey-500, var(--kui-color-text-neutral, $kui-color-text-neutral)));
  font-family: var(--font-family-sans, var(--kui-font-family-text, $kui-font-family-text));
  font-size: var(--kui-font-size-20, $kui-font-size-20);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular) !important;
  line-height: var(--kui-line-height-40, $kui-line-height-40);
  width: 100%;
  &:focus {
    box-shadow: 0 0 0 1px var(--blue-200, var(--kui-color-border-primary-weaker, $kui-color-border-primary-weaker));
  }
}

.k-button.medium {
  padding-bottom: var(--kui-space-40, $kui-space-40);
  padding-top: var(--kui-space-40, $kui-space-40);
}
.k-menu-item.expando-item > button + div + hr,
.last-menu-item,
.last-menu-item > button + div + hr,
.k-menu-item:last-of-type {
  border: var(--kui-border-width-0, $kui-border-width-0);
}
</style>
