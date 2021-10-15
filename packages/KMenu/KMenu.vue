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
        name="clearText">{{ clearText }}</slot>
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

  <style scoped>
  .k-menu{
    width: 284px;
    background-color: ghostwhite;
    background: #FFFFFF;
/* Grey/300 */
    border: 1px solid #E7E7EC;
    box-sizing: border-box;
    border-radius: 4px;
  }

  ul {
       margin: 12px 0px 24px 24px;
    padding: 0;
    list-style: none;
    /* border-bottom: 1px solid #E7E7EC; */
  }

  .clearText {
   font-family: Maison Neue;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 24px;
    color: #1155CB;
    width: 159px;
    height: 24px;
    white-space: nowrap;
    padding: 20.5px 101px 18.5px 24px;

  }

  .accordion:not(.is-open) > .accordion-body {
  display: none;
}

  </style>
