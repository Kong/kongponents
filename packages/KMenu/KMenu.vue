<template>
  <div
    :style="widthStyle"
    class="k-menu">
    <template>
      <ul class="k-menu-list">
        <slot
          :items="items"
          name="items"
        >
          <KMenuItem
            v-for="item in items"
            :key="item.key"
            :item="item"
          />
        </slot>
      </ul>
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
    actionButton: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '284'
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
  }
}
</script>

<style scoped lang="scss">
.k-menu {
  background-color: var(--white);
  border: 1px solid var(--grey-300);
  border-radius: 4px;
  box-shadow: 0px 0px 12px 0px var(--black-10, color(black-10));
}

.k-menu-list {
  margin: 11px 0px 11px 23px;
  padding: 0;
  list-style: none;
}

.clear-cta-button > button.k-button {
  border: none;
  color: var(--blue-300);
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  margin-bottom: 6px;
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
