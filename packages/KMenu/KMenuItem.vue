<template>
  <div
    :id="menuItemId"
    :data-testid="item ? `${item.title.replace(' ', '-')}-menu-item` : 'menu-item'"
    :test-mode="testMode"
    :class="[isOpen ? 'title-dark' : '', {'expando-item' : expandable}]"
    class="k-menu-item">
    <KButton
      :aria-expanded="isOpen && expandable"
      type="button"
      class="menu-button non-visual-button"
      aria-labelledby="menuItemId"
      @click="toggleMenuItem"
      @keyup.enter="toggleMenuItem">
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
    </KButton>
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
      v-if="type === 'divider' || ('last-menu-item' && !expandable)">
      <KMenuDivider />
    </slot>
  </div>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KMenuDivider from './KMenuDivider.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
import { uuid } from 'vue-uuid'

export default {
  name: 'KMenuItem',
  components: { KButton, KMenuDivider, KIcon },
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

  data () {
    return {
      isOpen: false,
      menuItemId: !this.testMode ? uuid.v1() : 'test-menuitem-id-1234'
    }
  },

  methods: {
    toggleMenuItem () {
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
  padding-left: 2px;
  margin: 0 19px 0 24px;
}

.span-icon-container {
  margin-left: auto;
  height: 24px;
  width: 24px;
}

.title-dark {
  color: var(--grey-600);
}

.k-menu-item .menu-button {
  cursor: pointer !important;
  &:hover {
    color: var(--grey-600);
  }
}

.menu-content {
  color: var(--grey-500);
}

.k-button.menu-button {
  width: 100%;
  color: var(--KButtonOutlineColor, var(--grey-500));
  font-weight: 400 !important;
  padding-left: 0;
  padding-right: 0;
  font-family: var(--font-family-sans);
  font-size: 13px;
  line-height: 24px;
  &:focus {
    box-shadow: none;
  }
}

.k-button.medium {
  padding-top: 8px;
  padding-bottom: 8px;
}

.expando-item {
   border-bottom: 1px solid var(--grey-300);
    margin: 0 19px 0 24px;
}

.k-menu-item.expando-item > button + div + hr,
.last-menu-item,
.last-menu-item > button + div + hr,
.k-menu-item:last-of-type {
  border: 0;
}
</style>
