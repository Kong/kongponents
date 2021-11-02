<template>
  <div
    :style="widthStyle"
    class="k-menu">
    <slot name="body">
      <div>
        <template v-for="item in items">
          <KMenuItem
            :item="item"
            :expandable="item.expandable"
            :key="item.key"
            :type="item.type"
            :test-mode="testMode"
          />
        </template>
      </div>
    </slot>
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
        width: this.width === 'auto' ? this.width : this.width + 'px'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.k-menu {
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  border-radius: 4px;
}
</style>
