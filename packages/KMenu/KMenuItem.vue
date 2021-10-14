<template>
  <div
    :key="item.key"
    :data-testid="`k-menu-item-${item.value}`">
    <li>
      <slot>{{ item.value }}</slot>
      <KIcon
        class="chevronDown"
        icon="chevronDown"
        color="var(--blue-200)" /></li>
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
</style>
