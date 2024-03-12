<template>
  <ul
    class="k-breadcrumbs"
    v-bind="$attrs"
  >
    <li
      v-for="(item, idx) in items"
      :key="getBreadcrumbKey(item, idx)"
      class="breadcrumbs-item-container"
    >
      <component
        :is="getComponentAttrs(item).type"
        v-bind="getComponentAttrs(item).attrs"
        class="breadcrumbs-item"
        :class="{ 'link': !!item.to, 'active': idx === items.length - 1}"
      >
        <span
          v-if="$slots[`icon-${getBreadcrumbKey(item, idx)}`]"
          class="breadcrumbs-icon-container"
        >
          <slot :name="`icon-${getBreadcrumbKey(item, idx)}`" />
        </span>
        <span
          v-if="item.text"
          class="breadcrumbs-text"
          :style="{ maxWidth: item.maxWidth? getSizeFromString(item.maxWidth) : getSizeFromString(itemMaxWidth) }"
          :title="item.text"
        >
          {{ item.text }}
        </span>
      </component>

      <span
        v-if="idx < items.length - 1"
        class="breadcrumbs-divider"
      >
        <slot name="divider">
          <!-- forward slash -->
          &#47;
        </slot>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { BreadcrumbItem } from '@/types'
import useUtilities from '@/composables/useUtilities'

const { getSizeFromString } = useUtilities()

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
    default: '100px',
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
.k-breadcrumbs {
  align-items: center;
  display: flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  gap: var(--kui-space-20, $kui-space-20);
  list-style: none;
  margin: var(--kui-space-0, $kui-space-0);
  padding: var(--kui-space-0, $kui-space-0);

  .breadcrumbs-item-container {
    align-items: center;
    display: flex;
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    gap: var(--kui-space-20, $kui-space-20);
    line-height: var(--kui-line-height-30, $kui-line-height-30);

    .breadcrumbs-item {
      align-items: center;
      border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
      color: var(--kui-color-text-neutral, $kui-color-text-neutral);
      display: flex;
      gap: var(--kui-space-20, $kui-space-20);
      padding: var(--kui-space-10, $kui-space-10) var(--kui-space-20, $kui-space-20);
      text-decoration: none;
      transition: color $kongponentsTransitionDurTimingFunc, background-color $kongponentsTransitionDurTimingFunc, box-shadow $kongponentsTransitionDurTimingFunc;
      user-select: none;

      #{$kongponentsKongIconSelector} {
        height: var(--kui-icon-size-30, $kui-icon-size-30);
        width: var(--kui-icon-size-30, $kui-icon-size-30);
      }

      .breadcrumbs-text {
        @include truncate;

        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
      }

      &.link {
        cursor: pointer;
        outline: none;

        &:hover {
          background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weaker);
        }

        &:focus-visible {
          background-color: var(--kui-color-background-neutral-weak, $kui-color-background-neutral-weaker);
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }
      }

      &.active {
        .breadcrumbs-text {
          color: var(--kui-color-text, $kui-color-text);
        }
      }
    }

    .breadcrumbs-divider {
      color: var(--kui-color-text-neutral-weak, $kui-color-text-neutral-weak);
      font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
      user-select: none;
    }
  }
}
</style>
