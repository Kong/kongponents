<template>
  <ul
    class="krumbs style-body-bc"
    v-on="$listeners"
  >
    <li
      v-for="item in items"
      :key="item.key || item.text"
      :style="{ maxWidth: item.maxWidth || itemMaxWidth }"
      class="krumb-item truncate"
    >
      <router-link
        v-if="typeof item.to === 'object'"
        :to="item.to"
        :title="item.title"
      >{{ item.text }}</router-link>
      <a
        v-else
        :title="item.title"
        :href="item.to"
        target="_blank">{{ item.text }}</a>
      <KIcon
        hide-title
        icon="chevronRight"
        size="15"
        color="var(--grey-500)"/>
    </li>
  </ul>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

/**
 * @typedef {Object} Item - breacrumb item holding router-link properties
 * @property {Object|String} to - router-link "to" object or href string
 * @property {string} text - anchor text
 * @property {string} title - anchor title
 * @property {string} [key] - list item key
 * @property {string} [maxWidth] - maxWidth of item, overrides itemMaxWidth
 */
export default {
  name: 'Krumbs',
  components: { KIcon },
  props: {
    /**
     * @type {{ new(): Item[]}}
     */
    items: {
      type: Array,
      required: true
    },
    itemMaxWidth: {
      type: String,
      required: false,
      default: '38ch' // can handle a monospaced uuid
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.krumbs {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
}

.krumbs .krumb-item .kong-icon {
  display: inline-flex;
  padding: 0 var(--spacing-xs);
  color: var(--grey-500);
  vertical-align: middle
}

.krumbs li a {
  color: var(--grey-500);
  letter-spacing: 1px;
}

.truncate {
  display: block;
  align-items: center;
  justify-content: center;
}
</style>
