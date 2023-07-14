<template>
  <ul
    class="k-breadcrumbs"
    v-bind="$attrs"
  >
    <li
      v-for="(item, idx) in items"
      :key="item.key || item.text"
      class="k-breadcrumbs-item truncate"
    >
      <component
        :is="getComponentAttrs(item).type"
        v-bind="getComponentAttrs(item).attrs"
        class="no-underline"
      >
        <KIcon
          v-if="item.icon"
          :class="['k-breadcrumb-icon', { 'has-no-text': !item.text }]"
          :color="KUI_COLOR_TEXT_DECORATIVE"
          hide-title
          :icon="item.icon"
          size="16"
        />
        <span
          v-if="item.text"
          class="k-breadcrumb-text truncate"
          :class="{ 'non-link': !item.to, 'emphasis': emphasis }"
          :style="{ maxWidth: item.maxWidth || itemMaxWidth }"
        >{{ item.text }}</span>
      </component>

      <span
        v-if="item.to || idx < items.length - 1"
        class="k-breadcrumb-divider"
      >
        <slot name="divider">
          <KIcon
            color="var(--grey-500)"
            hide-title
            icon="chevronRight"
            size="15"
          />
        </slot>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { BreadcrumbItem } from '@/types'
import { KUI_COLOR_TEXT_DECORATIVE } from '@kong/design-tokens'
import KIcon from '@/components/KIcon/KIcon.vue'

defineProps({
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
  emphasis: {
    type: Boolean,
    default: false,
  },
})

const getComponentAttrs = (item: BreadcrumbItem) => {
  if (!item.to) {
    return {
      type: 'div',
      attrs: {},
    }
  } else if (typeof item.to === 'object') {
    return {
      type: 'router-link',
      attrs: {
        title: item.title,
        to: item.to,
      },
    }
  } else {
    return {
      type: 'a',
      attrs: {
        href: item.to,
        target: '_blank',
        title: item.title,
      },
    }
  }
}
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-breadcrumbs {
  border-radius: 4px;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-40, $kui-line-height-40);
  list-style: none;
  margin-bottom: 16px;
  padding: 0;

  .k-breadcrumbs-item {
    .k-breadcrumb-divider,
    .k-breadcrumb-icon {
      align-self: center;
      color: $kui-color-text-decorative;
      display: inline-flex;
      line-height: 1;
    }

    .k-breadcrumb-divider {
      padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);
    }

    .k-breadcrumb-icon {
      padding: 0 $kui-space-30 0 0;

      &:deep(.kong-icon) {
        align-items: center;
        align-self: baseline;
        justify-content: center;

        &.has-no-text {
          padding-right: 0;
        }
      }
    }

    .k-breadcrumb-text {
      &:hover {
        color: $kui-color-text-neutral-stronger; /** $kui-color-text-selected */
      }

      &.non-link {
        color: $kui-color-text;
      }

      &.emphasis {
        font-weight: $kui-font-weight-bold;
        letter-spacing: -0.14px;
      }
    }
  }

  li {
    display: inline-flex;

    a {
      color: $kui-color-text-neutral;
      display: inline-flex;
      font-size: $kui-font-size-30;

      &:hover,
      &.no-underline {
        text-decoration: none !important;
      }
    }
  }
}
</style>
