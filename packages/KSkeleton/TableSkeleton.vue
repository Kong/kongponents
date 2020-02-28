<template functional>
  <div class="skeleton-table-wrapper">
    <div
      v-for="row in props.rows"
      :key="row"
      class="skeleton-table-row">
      <div
        v-for="cell in props.columns"
        :key="cell"
        :class="{
          'mr-6': cell !== props.columns,
          'ml-auto': cell === props.columns,
          'width-10': [3,4].indexOf(cell) === -1 && cell !== props.columns,
          'width-6': [3,4].indexOf(cell) > -1 || cell === props.columns
        }"
        class="box height-1 skeleton-cell"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableSkeleton',
  props: {
    rows: {
      type: Number,
      default: 6
    },
    columns: {
      type: Number,
      default: 6
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
