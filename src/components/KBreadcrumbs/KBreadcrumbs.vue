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
        :class="{'no-underline': !item.text}"
        :title="item.title"
        :to="item.to"
      >
        <KIcon
          v-if="item.icon"
          :class="[ 'k-breadcrumb-icon', {'has-no-text': !item.text} ]"
          color="var(--grey-500)"
          hide-title
          :icon="item.icon"
          size="20"
        />
        <span
          v-if="item.text"
          class="k-breadcrumb-text truncate"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
        >{{ item.text }}</span>
      </router-link>

      <a
        v-else
        :class="{'no-underline': !item.text}"
        :href="item.to"
        target="_blank"
        :title="item.title"
      >
        <KIcon
          v-if="item.icon"
          :class="[ 'k-breadcrumb-icon', {'has-no-text': !item.text} ]"
          color="var(--grey-500)"
          hide-title
          :icon="item.icon"
          size="20"
        />
        <span
          v-if="item.text"
          class="k-breadcrumb-text truncate"
          :style="{maxWidth: item.maxWidth || itemMaxWidth}"
        >{{ item.text }}</span>
      </a>

      <KIcon
        color="var(--grey-500)"
        hide-title
        icon="chevronRight"
        size="15"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { BreadcrumbItem } from '@/types'

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
  border-radius: 4px;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-size: 15px;
  font-weight: 600 !important;
  line-height: 24px !important;
  list-style: none;
  margin-bottom: 16px;
  padding: 0;
}

.k-breadcrumbs .k-breadcrumbs-item :deep(.kong-icon) {
  color: var(--grey-500);
  display: inline-flex;
  padding: 0 12px 0 var(--spacing-xs);
  vertical-align: middle;

  &.k-breadcrumb-icon {
    align-items: center;
    justify-content: center;
    padding: 0 var(--spacing-xs) 0 0;

    &.has-no-text {
      padding-right: 0;
    }
  }
}

.k-breadcrumbs li {
  display: inline-flex;

  a {
    color: var(--grey-500);
    display: inline-flex;
    font-size: 15px;
    letter-spacing: 1px;

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
  align-items: center;
  display: inline-block;
  justify-content: center;
}
</style>
