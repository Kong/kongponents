<template>
  <KToggle v-slot="{toggle, isToggled}">
    <KPop
      v-bind="boundKPopAttributes"
      :on-popover-click="() => {
        toggle()
        return isToggled
      }"
      @opened="toggle"
      @closed="toggle"
    >
      <slot :is-open="isToggled">
        <KButton>Click Me!</KButton>
      </slot>
      <template v-slot:content>
        <ul class="k-dropdown-list">
          <slot
            :items="items"
            :is-open="isToggled"
            name="items"
          >
            <DropdownItem
              v-for="item in items"
              :key="item.label"
              :item="item"
            />
          </slot>
        </ul>
      </template>
    </KPop>
  </KToggle>
</template>

<script lang="ts">
import DropdownItem from './DropdownItem.vue'
import { placements } from '@kongponents/kpop/KPop.vue'

const defaultKPopAttributes = {
  hideCaret: true,
  popoverClasses: 'k-dropdown-popover mt-1',
  popoverTimeout: 0
}

export default {
  name: 'KDropdown',
  components: { DropdownItem },
  props: {
    kpopAttributes: {
      type: Object,
      default: () => ({})
    },
    width: {
      type: String,
      default: undefined
    },
    placement: {
      type: String,
      default: 'bottom',
      validator: function (value) {
        return Object.keys(placements).indexOf(value) !== -1
      }
    },
    /**
     * The display style, can be either dropdown or select
     */
    appearance: {
      type: String,
      default: 'dropdown',
      validator: function (value) {
        return ['dropdown', 'select'].indexOf(value) !== -1
      }
    },
    /**
     * Items are JSON objects with required 'label' and optional 'to' property
     * plugged into a <router-link> for navigation
     * {
     *  label: Item 1,
     *  to: '/home'
     * }
     */
    items: {
      type: Array,
      required: false,
      default: () => [],
      // Items must have a label
      validator: (items) => !items.length || items.some(i => i.hasOwnProperty('label'))
    }
  },

  computed: {
    boundKPopAttributes: function () {
      return {
        ...defaultKPopAttributes,
        ...this.kpopAttributes,
        popoverClasses: `${defaultKPopAttributes.popoverClasses} ${this.kpopAttributes.popoverClasses} k-dropdown-pop-${this.appearance}`,
        placement: this.placement
      }
    }
  }
}
</script>

<style lang="scss">
.k-drodpown-trigger:after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: var(--spacing-xs, spacing(xs));
  vertical-align: middle;
  content: "";
  border-top: 0.325em solid;
  border-right: 0.325em solid transparent;
  border-left: 0.325em solid transparent;
}

.k-dropdown-popover {
  &.k-dropdown-pop-dropdown {
    --KPopPaddingY: 10px;
    --KPopPaddingX: var(--spacing-sm);
    border: 1px solid var(--blue-200);
  }

  &.k-dropdown-pop-select {
    --KPopPaddingY: 10px;
    --KPopPaddingX: var(--spacing-sm);
    border: 1px solid var(--black-10);
  }

  ul {
    margin: 0;
    padding: 0;
  }

  a {
    flex: 1;
    color: var(--black-70);

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
}
</style>
