<template>
  <div class="k-menu">
    <ul>
      <KMenuItem
        v-for="item in items"
        :key="item.key"
        :item="item" />
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
  }
  </style>
