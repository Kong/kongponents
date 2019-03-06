<template functional>
  <ul class="krumbs">
    <li
      v-for="item in props.items"
      :key="item.key"
      class="krumb-item"
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
    </li>
  </ul>
</template>

<script>
/**
 * @typedef {Object} Item - breacrumb item holding router-link properties
 * @property {Object|String} to - router-link "to" object or href string
 * @property {string} key - list item key
 * @property {string} text - anchor text
 * @property {string} title - anchor title
 */

export default {
  props: {
    /**
     * @type {{ new(): Item[]}}
     */
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.krumbs {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
}

.krumbs .krumb-item + .krumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #636c72;
  content: "\203A";
}

.krumbs .krumb-item:last-of-type:after,
.krumbs .krumb span:after {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  color: #636c72;
  content: "\203A";
}
</style>
