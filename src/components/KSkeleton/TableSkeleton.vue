<template>
  <div class="skeleton-table-wrapper">
    <div
      v-for="row in rows"
      :key="row"
      class="skeleton-table-row"
    >
      <slot>
        <div
          v-for="cell in columns"
          :key="cell"
          class="skeleton-cell-container"
        >
          <KSkeletonBox
            class="skeleton-cell"
            :width="calcWidth(cell, row)"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
import type { SkeletonBoxWidth } from '@/types'

defineProps({
  rows: {
    type: Number,
    default: 6,
  },
  columns: {
    type: Number,
    default: 4,
  },
})

const calcWidth = (cell: number, row: number): SkeletonBoxWidth => {
  if (cell === 1 && row === 1) return '25'
  if (cell !== 1 && row !== 1) return '25'

  return '50'
}

</script>

<style lang="scss" scoped>
.skeleton-table-wrapper {
  overflow: hidden;
  width: 100%;

  .skeleton-table-row {
    display: flex;
    gap: var(--kui-space-20, $kui-space-20);
    padding: var(--kui-space-60, $kui-space-60) var(--kui-space-40, $kui-space-40);
    width: 100%;

    &:not(:last-child) {
      border-bottom: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    }

    .skeleton-cell-container {
      width: calc(100% / v-bind('columns'));

      &:first-child {
        width: 50%;
      }

      &:nth-child(even) {
        display: none;
      }

      // hide half of the columns on mobile
      @media (min-width: $kui-breakpoint-mobile) {
        &:nth-child(even) {
          display: block;
        }
      }
    }
  }
}
</style>
