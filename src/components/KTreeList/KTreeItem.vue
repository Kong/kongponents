<template>
  <div
    class="tree-item-wrapper"
    :data-testid="`tree-item-wrapper-${item.id}`"
  >
    <ChevronDownIcon
      v-if="collapsible"
      :aria-controls="`tree-list-draggable-${controlsId}`"
      :aria-expanded="isExpanded"
      :aria-label="isExpanded ? 'Collapse' : 'Expand'"
      class="tree-item-expanded-icon"
      :class="{
        'collapsed': !isExpanded,
        'expanded': isExpanded
      }"
      data-testid="tree-item-expanded-icon"
      decorative
      role="button"
      :size="KUI_ICON_SIZE_40"
      tabindex="0"
      @click.stop="toggleItem"
    />

    <button
      class="tree-item"
      :class="{
        'not-draggable': disabled,
        'selected': item.selected,
        'expanded': collapsible && isExpanded,
        'collapsed': collapsible && !isExpanded
      }"
      :data-testid="`tree-item-${item.id}`"
      data-tree-item-trigger="true"
      draggable="false"
      type="button"
      @click.prevent="handleClick"
    >
      <div
        v-if="hasIcon"
        class="tree-item-icon"
        data-testid="tree-item-icon"
      >
        <slot name="item-icon">
          <ServiceDocumentIcon decorative />
        </slot>
      </div>
      <div
        class="tree-item-label"
        data-testid="tree-item-label"
      >
        <slot name="item-label">
          {{ item.name }}
        </slot>
      </div>
    </button>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, useSlots } from 'vue'
import type { TreeListItem } from '@/types'

export const itemsHaveRequiredProps = (items: TreeListItem[]): boolean => {
  return items.every(i => i.name !== undefined && i.id !== undefined && (!i.children?.length || itemsHaveRequiredProps(i.children)))
}
</script>

<script lang="ts" setup>
/**
 * button.tree-item has draggable="false" attribute to prevent native drag events in order to let vue-draggable-next handle dragging
 */
import { ref, watch } from 'vue'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import { ServiceDocumentIcon, ChevronDownIcon } from '@kong/icons'

const props = defineProps({
  item: {
    type: Object as PropType<TreeListItem>,
    required: true,
    validator: (item: TreeListItem) => itemsHaveRequiredProps([item]),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  hideIcons: {
    type: Boolean,
    default: false,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  initialCollapse: {
    type: Boolean,
    default: false,
  },
  controlsId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'selected', item: TreeListItem): void
  (event: 'expanded', val: boolean): void
}>()

const slots = useSlots()

const hasIcon = computed((): boolean => !props.hideIcons || !!slots['item-icon'])

const handleClick = (event: any) => {
  if (event.target) {
    const ignoredElements = 'a:not(.disabled), button:not([data-tree-item-trigger]), label, input, select'

    // check whether parent of target is not an ignored elem
    if (event.target.closest(ignoredElements) !== null) {
      return
    }
  }

  emit('selected', props.item)
}

const isExpanded = ref<boolean>(true)

watch(() => props.initialCollapse, (val, oldVal) => {
  if (val !== oldVal) {
    isExpanded.value = !val
  }
}, {
  immediate: true,
})

const toggleItem = (): void => {
  isExpanded.value = !isExpanded.value

  emit('expanded', isExpanded.value)
}
</script>

<style lang="scss" scoped>
.tree-item {
  align-items: center;
  background-color: var(--kui-color-background, $kui-color-background);
  border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border-disabled, $kui-color-border-disabled);
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  color: var(--kui-color-text, $kui-color-text);
  display: flex;
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  gap: var(--kui-space-20, $kui-space-20);
  line-height: var(--kui-line-height-30, $kui-line-height-30);
  outline: none;
  padding: var(--kui-space-30, $kui-space-30);
  text-decoration: none;
  transition: background-color $kongponentsTransitionDurTimingFunc, color $kongponentsTransitionDurTimingFunc, border-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
  user-select: none;
  width: 100%;

  &-wrapper {
    align-items: center;
    display: flex;
    gap: $kui-space-30;
  }

  .tree-item-icon,
  :deep(#{$kongponentsKongIconSelector}) {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    height: var(--kui-icon-size-40, $kui-icon-size-40) !important;
    transition: color $kongponentsTransitionDurTimingFunc;
    width: var(--kui-icon-size-40, $kui-icon-size-40) !important;
  }

  .tree-item-label {
    text-align: left;
    width: 100%;
  }

  &.selected {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    border-color: var(--kui-color-border-neutral-weaker, $kui-color-border-neutral-weaker);

    .tree-item-icon {
      color: var(--kui-color-text-neutral-strong, $kui-color-text-neutral-strong);
      pointer-events: none;
    }
  }

  &:hover {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    cursor: grab;
  }

  &:focus-visible {
    background-color: var(--kui-color-background-neutral-weaker, $kui-color-background-neutral-weaker);
    box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
  }

  &.not-draggable {
    cursor: pointer;
  }

  &-expanded-icon {
    cursor: pointer;
    transition: 0.1s all linear;
    // makes the button click easier on draggable wrapper
    z-index: 10;

    &.collapsed {
      transform: rotate(0);
    }

    &.expanded {
      transform: rotate(-90deg);
    }

    &:focus-visible {
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
      outline: none;
    }
  }
}
</style>
