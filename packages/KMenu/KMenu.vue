<template>
  <div
    :style="widthStyle"
    class="k-menu">
    <slot name="body">
      <div>
        <template v-for="(item,index) in items">
          <KMenuItem
            :item="item"
            :expandable="item.expandable"
            :key="item.key"
            :type="item.type"
            :test-mode="testMode"
            :class="{'last-menu-item': index===items.length-1 }"
          />
        </template>
      </div>
    </slot>
    <div
      v-if="hasActionButton"
      class="clear-cta-button">
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

export default {
  name: 'KMenu',
  components: { KMenuItem },
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
        width: this.width === 'auto' ? this.width : this.width + 'px'
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
.k-menu {
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  padding-top: 11px;
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
