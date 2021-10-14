<template>
  <div
    :key="item.key"
    :data-testid="`k-menu-item-${item.value}`">
    <li>
      <span
        class="menu-title">
        <slot name="menu-title"> {{ item.title }}
        </slot>
      </span>
      <span>
        <KIcon
          icon="chevronDown"
          color="#000"
          size="16px"
        />
      </span>
      <hr>
    </li>
  </div>
</template>

<script>
import KMenuDivider from './KMenuDivider.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KMenuItem',
  components: { KMenuDivider, KIcon },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
/* .chevronDown {
      margin-left: 177px;
} */

li{
    list-style: none;
    padding: 20px 177px 16px 24px;
    white-space: nowrap;
  }

  hr{
    width: 241px;
  }
</style>
