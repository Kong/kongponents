<template>
  <ul
    class="k-breadcrumbs"
    v-bind="$attrs"
  >
    <li
      v-for="item in items"
      :key="item.key || item.text"
      class="k-breadcrumbs-item truncate"
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
          :class="[ 'k-breadcrumb-icon', {'has-no-text': !item.text} ]"
          hide-title
          size="20"
          color="var(--grey-500)"
        />
        <span
          v-if="item.text"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
          class="k-breadcrumb-text truncate"
        >{{ item.text }}</span>
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
          :class="[ 'k-breadcrumb-icon', {'has-no-text': !item.text} ]"
          hide-title
          size="20"
          color="var(--grey-500)"
        />
        <span
          v-if="item.text"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
          class="k-breadcrumb-text truncate"
        >{{ item.text }}</span>
      </a>

      <KIcon
        hide-title
        icon="chevronRight"
        size="15"
        color="var(--grey-500)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export interface BreadcrumbItem {
  to: object|string // router-link "to" object or href string
  text?: string // anchor text
  title?: string // anchor title
  icon?: string // icon before anchor
  key?: string // list item key
  maxWidth?: string // maxWidth of item, overrides itemMaxWidth
}

export default defineComponent({
  name: 'KBreadcrumbs',
  components: { KIcon },
  inheritAttrs: false,
  props: {
    items: {
      type: Array as PropType<BreadcrumbItem[]>,
      default: [] as BreadcrumbItem[],
      required: true,
      validator: (items: BreadcrumbItem[]): boolean => {
        return items && items.length > 0
      },
    },
    itemMaxWidth: {
      type: String,
      required: false,
      default: '38ch', // can handle a monospaced uuid
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-breadcrumbs {
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 1rem;
  list-style: none;
  border-radius: 0.25rem;
  font-size: 15px;
  font-weight: 600 !important;
  line-height: 24px !important;
}

.k-breadcrumbs .k-breadcrumbs-item :deep(.kong-icon) {
  display: inline-flex;
  padding: 0 12px 0 var(--spacing-xs);
  color: var(--grey-500);
  vertical-align: middle;

  &.k-breadcrumb-icon {
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-xs);

    &.has-no-text {
      padding-right: 0;
    }
  }
}

.k-breadcrumbs li {
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

    > .k-breadcrumb-text {
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
