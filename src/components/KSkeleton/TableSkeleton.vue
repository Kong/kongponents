<template>
  <div class="skeleton-table-wrapper">
    <div
      v-for="row in rows"
      :key="row"
      class="skeleton-table-row"
    >
      <slot>
        <KSkeletonBox
          v-for="cell in columns"
          :key="cell"
          class="skeleton-cell"
          :width="calcWidth(cell, columns || 6)"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
import { SkeletonBoxWidth } from '@/types'

defineProps({
  rows: {
    type: Number,
    default: 6,
  },
  columns: {
    type: Number,
    default: 6,
  },
})

const calcWidth = (cell: number, columns: number): SkeletonBoxWidth => {
  if ([3, 4].indexOf(cell) === -1 && cell !== columns) return '10'
  if ([3, 4].indexOf(cell) > -1 || cell === columns) return '6'
  return '1'
}

</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

$screen-lg: $kui-breakpoint-tablet;
$screen-md: $kui-breakpoint-phablet;

.skeleton-table-wrapper {
  overflow: hidden;
  width: 100%;

  .skeleton-table-row {
    display: flex;
    flex-direction: row;
    margin-bottom: var(--kui-space-90, $kui-space-90);
    /** Hide columns on smaller screens */

    .skeleton-cell {
      // 'mr-6': cell !== columns
      margin-right: var(--kui-space-90, $kui-space-90) !important;

      &:last-child {
        margin-right: var(--kui-space-0, $kui-space-0) !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width: $screen-lg) {
      .skeleton-cell {
        &:nth-of-type(n + 5) {
          display: none;
        }
        &:nth-of-type(4) {
          margin-left: var(--kui-space-auto, $kui-space-auto);
          margin-right: var(--kui-space-0, $kui-space-0);
        }
      }
    }
    @media only screen and (max-width: $screen-md) {
      .skeleton-cell {
        &:nth-of-type(n + 3) {
          display: none;
        }
        &:nth-of-type(2) {
          margin-left: var(--kui-space-auto, $kui-space-auto);
          margin-right: var(--kui-space-0, $kui-space-0);
          width: 96px;
        }
      }
    }
  }
}
</style>
