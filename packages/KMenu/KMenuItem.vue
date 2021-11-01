<template>
  <div
    :class="{'expand-item':item.expandable}"
    :key="item.key"
    class="k-menu-item">
    <li>
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
          v-if="item.type === 'string'"
          name="stringMenuItem">
          <KEmptyState cta-is-hidden>
            <template v-slot:title>{{ `String Content` }}</template>
          </KEmptyState>
        </slot>
        <slot
          v-if="item.type === 'number'"
          name="numberMenuItem">
          <KEmptyState cta-is-hidden>
            <template v-slot:title>{{ `Number Content` }}</template>
          </KEmptyState>
        </slot>
      </div>
    </li>
  </div>
</template>

<script>
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KMenuDivider from './KMenuDivider.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KMenuItem',
  components: { KMenuDivider, KIcon, KEmptyState },
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
.k-menu-item {
  margin: 0;
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
    // left: 50%;
    // transform: translateX(-56%);
    bottom: 0;
    width: 95%;
    height: 1px;
    background-color: var(--grey-300);
  }
}

.menu-title {
  width: 100%;
  display: flex;
  padding: 8px 0;
  text-align: center;
}

.span-icon-container {
  margin-left: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 18px;
  // padding-top: 8px;
  height: 24px;
  width: 24px;
}

.title-dark {
  color: var(--grey-600);
}

.k-menu-item.expand-item {
  cursor: pointer;
  &:hover {
    color: var(--grey-600);
  }
}
</style>
