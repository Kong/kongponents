<template>
  <div class="k-menu">
    <template>
      <ul class="k-menu-list">
        <slot
          :items="items"
          name="items"
        >
          <KMenuItem
            v-for="(item, index) in items"
            :key="index"
            :item="item"
          />
        </slot>
      </ul>
      <div
        class="clear-filters">
        <slot
          name="clearFiltersText">{{ clearFiltersText }}
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
import KMenuItem from './KMenuItem.vue'

export default {
  name: 'KMenu',
  components: { KMenuItem },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    clearFiltersText: {
      type: String,
      default: ''
    },
    expandable: {
      type: Boolean,
      default: false
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.k-menu {
  width: 284px;
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  box-sizing: border-box;
  border-radius: 4px;
}

.k-menu-list {
  margin: 11px 0px 11px 23px;
  padding: 0;
  list-style: none;
}

div.clear-filters {
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: var(--blue-300);
  white-space: nowrap;
  padding: 0 0 18.5px 24px;

  &:hover {
    color: var(--blue-500);
  }
}
</style>
