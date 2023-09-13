<template>
  <ul
    class="k-breadcrumbs"
    v-bind="$attrs"
  >
    <li
      v-for="(item, idx) in items"
      :key="getBreadcrumbKey(item, idx)"
      class="k-breadcrumbs-item"
    >
      <component
        :is="getComponentAttrs(item).type"
        v-bind="getComponentAttrs(item).attrs"
        class="no-underline"
      >
        <div class="k-breadcrumb-icon-wrapper">
          <slot :name="`icon-${getBreadcrumbKey(item, idx)}`">
            <KIcon
              v-if="item.icon"
              :class="['k-breadcrumb-icon', { 'has-no-text': !item.text }]"
              :color="`var(--kui-color-text-decorative, ${KUI_COLOR_TEXT_DECORATIVE})`"
              hide-title
              :icon="item.icon"
              :size="KUI_ICON_SIZE_30"
            />
          </slot>
        </div>
        <span
          v-if="item.text"
          class="k-breadcrumb-text"
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
            :color="`var(--grey-500, var(--kui-color-text-neutral-weak, ${KUI_COLOR_TEXT_NEUTRAL_WEAK}))`"
            hide-title
            icon="chevronRight"
            :size="KUI_ICON_SIZE_30"
          />
        </slot>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { BreadcrumbItem } from '@/types'
import { KUI_COLOR_TEXT_DECORATIVE, KUI_ICON_SIZE_30, KUI_COLOR_TEXT_NEUTRAL_WEAK } from '@kong/design-tokens'
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

const getBreadcrumbKey = (item: BreadcrumbItem, idx: number): string => item.key || `breadcrumb-${idx}`
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style lang="scss" scoped>

@import '@/styles/mixins';

.k-breadcrumbs {
  border-radius: var(--kui-border-radius-40, $kui-border-radius-40);
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  font-size: var(--kui-font-size-30, $kui-font-size-30);
  font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
  line-height: var(--kui-line-height-40, $kui-line-height-40);
  list-style: none;
  margin-bottom: var(--kui-space-60, $kui-space-60);
  padding: var(--kui-space-0, $kui-space-0);

  .k-breadcrumb-icon-wrapper {
    display: inline-flex;
  }

  .k-breadcrumbs-item {
    @include truncate;

    .k-breadcrumb-divider,
    .k-breadcrumb-icon {
      align-self: center;
      color: var(--kui-color-text-decorative, $kui-color-text-decorative);
      display: inline-flex;
      line-height: 1;
    }

    .k-breadcrumb-divider {
      color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
      padding: var(--kui-space-0, $kui-space-0) var(--kui-space-20, $kui-space-20);
    }

    .k-breadcrumb-icon {
      padding: var(--kui-space-0, $kui-space-0) var(--kui-space-30, $kui-space-30) var(--kui-space-0, $kui-space-0) var(--kui-space-0, $kui-space-0);

      &:deep(.kong-icon) {
        align-items: center;
        align-self: baseline;
        justify-content: center;

        &.has-no-text {
          padding-right: var(--kui-space-0, $kui-space-0);
        }
      }
    }

    .k-breadcrumb-text {
      @include truncate;

      &:hover {
        color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger); /** TODO: use $kui-color-text-selected token, once it is added */
      }

      &.non-link {
        color: var(--kui-color-text, $kui-color-text);
      }

      &.emphasis {
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        letter-spacing: -0.14px;
      }
    }
  }

  li {
    display: inline-flex;

    a {
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: inline-flex;
      font-size: var(--kui-font-size-30, $kui-font-size-30);

      &:hover,
      &.no-underline {
        text-decoration: none !important;
      }
    }
  }
}
</style>
