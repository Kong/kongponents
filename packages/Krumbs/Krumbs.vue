<template>
  <ul
    class="krumbs"
    v-on="$listeners">
    <li
      v-for="item in items"
      :key="item.key || item.text"
      class="krumb-item truncate"
    >
      <router-link
        v-if="typeof item.to === 'object'"
        :to="item.to"
        :title="item.title"
        :class="{'no-underline': !item.text}"
      >
        <KIcon
          v-if="item.icon"
          :icon="item.icon"
          :class="[ 'breadcrumb-icon', {'has-no-text': !item.text} ]"
          hide-title
          size="16"
          viewbox="0 0 16 16"
          color="var(--grey-500)"
        />
        <span
          v-if="item.text"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
          class="breadcrumb-text truncate">{{ item.text }}</span>
      </router-link>

      <a
        v-else
        :title="item.title"
        :href="item.to"
        :class="{'no-underline': !item.text}"
        target="_blank"
      >
        <KIcon
          v-if="item.icon"
          :icon="item.icon"
          :class="[ 'breadcrumb-icon', {'has-no-text': !item.text} ]"
          hide-title
          size="15"
          color="var(--grey-500)"
        />
        <span
          v-if="item.text"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
          class="breadcrumb-text truncate">{{ item.text }}</span>
      </a>

      <KIcon
        hide-title
        icon="chevronRight"
        size="15"
        color="var(--grey-500)" />
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
 * @property {string} icon - icon before anchor
 * @property {string} [key] - list item key
 * @property {string} [maxWidth] - maxWidth of item, overrides itemMaxWidth
 */
export default {
  name: 'Krumbs',
  components: {KIcon},
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
@import "~@kongponents/styles/variables";

.krumbs {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
  font-size: 15px;
  font-weight: 500 !important;
  line-height: 24px !important;
}

.krumbs .krumb-item .kong-icon {
  display: inline-flex;
  padding: 0 12px 0 var(--spacing-xs);
  color: var(--grey-500);
  vertical-align: middle;

  &.breadcrumb-icon {
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-xs);

    &.has-no-text {
      padding-right: 0;
    }
  }
}

.krumbs li {
  display: inline-flex;

  a {
    display: inline-flex;
    color: var(--grey-500);
    letter-spacing: 1px;
    font-size: 15px;

    &:hover,
    &.no-underline {
      text-decoration: none !important;
    }

    > .breadcrumb-text {
      transition: all 0.2s ease-in-out;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.truncate {
  display: inline-block;
  align-items: center;
  justify-content: center;
}
</style>
