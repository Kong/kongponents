<template>
  <li
    :class="{'expand-item':!item.expandable}"
    :key="item.key"
    :data-testid="`k-menu-item-${item.value}`"
  >
    <div
      class="menu-title"
      @click="isOpen = !isOpen">
      <span
        :class="isOpen && item.expandable ? 'title-dark' : ''"
        class="span-menu-title">
        <slot name="menuTitle"> {{ item.title }}
        </slot>
      </span>
      <span

        class="span-icon-container">
        <KIcon
          v-if="item.expandable"
          :icon="isOpen ? 'chevronUp' : 'chevronDown'"
          color="var(--grey-400)"
          size="16"
        />
      </span>
      <slot/>
    </div>
    <div
      :class="isOpen ? 'd-block' : 'd-none'"
      class="menu-content">
      <slot
        v-if="item.itemType === 'String'"
        name="menuContent"> {{ item.itemType }}
      </slot>
      <slot
        v-else
        name="menuContent"> {{ item.itemType }}
      </slot>
    </div>
    <slot
      v-if="!menuDivider"
      name="menuDivider"><KMenuDivider/>
    </slot>
  </li>
</template>

<script>
import KMenuDivider from './KMenuDivider.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KMenuItem',
  components: { KMenuDivider, KIcon },
  props: {
    item: {
      type: Object,
      default: null
    },
    menuDivider: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      isOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
li {
  margin: 0;
  cursor: pointer;
  white-space: nowrap;
  font-family: var(--font-family-sans);
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: var(--grey-500);
  position: relative;

  &:not(:last-child):after {
    content: " ";
    position: absolute;
    left: 50%;
    transform: translateX(-56%);
    bottom: 0;
    width: 90%;
    height: 1px;
    background-color: var(--grey-300);
  }
}

.menu-title {
  width: 100%;
  display: flex;
  padding: 8px 0;
  text-align: center;

  &:hover {
    color: var(--grey-600);
  }
}

.span-icon-container {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 23px;
  height: 24px;
  width: 24px;
}

.title-dark {
  color: var(--grey-600);
}

li.expand-item {
  cursor: default;
}
</style>
