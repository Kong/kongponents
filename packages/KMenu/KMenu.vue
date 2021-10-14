<template>
  <div class="k-menu">
    <ul>
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
    }
  },

  data: function () {
    return {
    }
  }
}
</script>

  <style scoped>
  .k-menu{
    width: 284px;
    background-color: ghostwhite;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  </style>
