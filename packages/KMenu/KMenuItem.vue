<template>
  <div
    :data-testid="item ? `${item.title.replace(' ', '-')}-menu-item` : 'menu-item'"
    :test-mode="testMode"
    :class="[isOpen && expandable ? 'title-dark' : '', {'expand-item' : expandable}]"
    aria-labelledby="menu-item"
    class="k-menu-item">
    <button
      :aria-expanded="isOpen && expandable"
      type="button"
      class="menu-title menu-button"
      @click="openMenuItem"
      @keyup.enter="openMenuItem">
      <span
        :class="isOpen && expandable ? 'title-dark' : ''"
        class="span-menu-title">
        <slot name="itemTitle">
          {{ item ? item.title : '' }}
        </slot>
      </span>
      <span
        class="span-icon-container">
        <KIcon
          v-if="expandable"
          :icon="isOpen ? 'chevronUp' : 'chevronDown'"
          color="var(--grey-400)"
          size="16"
        />
      </span>
    </button>
    <div
      :class="isOpen ? 'd-flex' : 'd-none'"
      class="menu-content">
      <slot name="itemBody">
        <div
          v-if="(type === 'string' || 'divider') && expandable">
          {{ item ? item.description : '' }}
        </div>
        <div
          v-else-if="(type === 'number' || 'divider') && expandable">
          {{ item ? item.description : '' }}
        </div>
      </slot>
    </div>
    <slot
      v-if="type === 'divider'">
      <KMenuDivider />
    </slot>
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
    expandable: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'string',
      validator: (value) => {
        return [
          'string',
          'number',
          'divider'
        ].indexOf(value) !== -1
      }
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      isOpen: false
    }
  },

  methods: {
    openMenuItem () {
      this.isOpen = !this.isOpen
    }
  }

}
</script>

<style scoped lang="scss">
.k-menu-item {
  list-style: none;
  margin: 0;
  white-space: nowrap;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: var(--grey-500);
  position: relative;
  padding-left: 24px;
  &:not(:last-child):after {
    content: " ";
    position: absolute;
    left: 56%;
    transform: translateX(-57%);
    bottom: 0;
    width: 88%;
    height: 1px;
    background-color: var(--grey-300);
  }
}

.k-menu ul:not(:last-child):after {
  content: " ";
  position: absolute;
  bottom: 0;
  width: 95%;
  height: 1px;
  background-color: var(--grey-300);
  }

.menu-title {
  width: 100%;
  display: flex;
  padding: 8px 0;
  text-align: center;
  font-family: var(--font-family-sans);
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  color: var(--grey-500);
}

.span-icon-container {
  margin-left: auto;
  padding-right: 14px;
  height: 24px;
  width: 24px;
}

.title-dark {
  color: var(--grey-600);
}

.k-menu-item.expand-item .menu-title {
  cursor: pointer;
  &:hover {
    color: var(--grey-600);
  }
}

.menu-content {
  color: var(--grey-500);
}

.menu-button {
  background-color: transparent;
  border: none;
}
</style>
