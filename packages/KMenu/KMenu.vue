<template>
  <div class="k-menu">
    <ul>
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
      class="clearText">
      <slot
        name="clearText">{{ clearText }}
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
    clearText: {
      type: String,
      default: 'Clear all filters and sorting'
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

ul {
  margin: 11px 0px 24px 23px;
  padding: 0;
  list-style: none;
}

div.clearText {
  cursor: pointer;
  font-family: var(--font-family-sans);
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 24px;
  color: var(--blue-300);
  width: 159px;
  height: 24px;
  white-space: nowrap;
  padding: 0 0 18.5px 24px;

  &:hover {
    color: var(--blue-500);
  }
}
</style>
