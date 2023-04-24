
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
          :class="{
            'mr-6': cell !== columns,
            'w-100': cell === columns, // take the rest of the space
            'skeleton-cell': true
          }"
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

const calcWidth = (cell: any, columns: number): SkeletonBoxWidth => {
  if ([3, 4].indexOf(cell) === -1 && cell !== columns) return '10'
  if ([3, 4].indexOf(cell) > -1 || cell === columns) return '6'
  return ''
}

</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

$screen-lg: 1256px;
$screen-md: 756px;
.skeleton-table-wrapper {
  overflow: hidden;
  width: 100%;
  .skeleton-table-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 32px;
    /** Hide columns on smaller screens */
    @media only screen and (max-width: $screen-lg) {
      .skeleton-cell {
        &:nth-of-type(n + 5) {
          display: none;
        }
        &:nth-of-type(4) {
          margin-left: auto;
          margin-right: 0;
        }
      }
    }
    @media only screen and (max-width: $screen-md) {
      .skeleton-cell {
        &:nth-of-type(n + 3) {
          display: none;
        }
        &:nth-of-type(2) {
          margin-left: auto;
          margin-right: 0;
          width: 96px;
        }
      }
    }
  }
}
</style>
