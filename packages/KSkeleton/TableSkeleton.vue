<template>
  <div class="skeleton-table-wrapper">
    <div
      v-for="row in rows"
      :key="row"
      class="skeleton-table-row">
      <slot>
        <KSkeletonBox
          v-for="cell in columns"
          :key="cell"
          :width="calcWidth(cell, columns)"
          :class="{
            'mr-6': cell !== columns,
            'ml-auto': cell === columns,
            'skeleton-cell': true
          }"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import KSkeletonBox from './KSkeletonBox'

export default {
  name: 'TableSkeleton',
  components: {
    KSkeletonBox
  },
  props: {
    rows: {
      type: Number,
      default: 6
    },
    columns: {
      type: Number,
      default: 6
    }
  },

  methods: {
    calcWidth (cell, columns) {
      if ([3, 4].indexOf(cell) === -1 && cell !== columns) return '10'
      if ([3, 4].indexOf(cell) > -1 || cell === columns) return '6'
    }
  }
}
</script>

<style lang="scss" scoped>
$screen-lg: 1256px;
$screen-md: 756px;

.skeleton-table-wrapper {
  width: 100%;
  overflow: hidden;
  .skeleton-table-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;

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
          width: 6rem;
          margin-left: auto;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
