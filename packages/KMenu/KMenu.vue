<template>
  <div
    :style="widthStyle"
    class="k-menu">
    <slot name="body">
      <div>
        <KMenuItem
          v-for="(item,index) in items"
          :item="item"
          :expandable="item.expandable"
          :key="item.key"
          :type="item.type"
          :last-menu-item="index === items.length-1"
          :test-mode="testMode"
          :class="{ 'last-menu-item': index === items.length-1 }"
        />
      </div>
    </slot>
    <div
      v-if="hasActionButton"
      class="clear-cta-button">
      <KMenuDivider />
      <slot
        name="actionButton">
        <KButton
          @click="proceed"
          @keyup.enter="proceed"/>
      </slot>
    </div>
  </div>
</template>

<script>
import KMenuItem from './KMenuItem.vue'
import KMenuDivider from './KMenuDivider.vue'

export default {
  name: 'KMenu',
  components: { KMenuDivider, KMenuItem },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    actionButton: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '284'
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    widthStyle: function () {
      return {
        width: this.width === 'auto' || this.width.endsWith('%') || this.width.endsWith('px') ? this.width : this.width + 'px'
      }
    },

    hasActionButton () {
      return !!this.$slots.actionButton
    }
  },

  methods: {
    proceed () {
      this.$emit('proceed')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';

.k-menu {
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  padding-top: 11px;
  padding-bottom: 8px;
}

.clear-cta-button > button.k-button {
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
