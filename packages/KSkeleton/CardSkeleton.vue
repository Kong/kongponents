<template>
  <div class="skeleton-card-wrapper">
    <div
      v-for="c in cardCount"
      :key="c"
      class="skeleton-card-column">
      <div class="skeleton-card">
        <div class="skeleton-card-header">
          <slot name="card-header">
            <KSkeletonBox
              height="2"
              width="25" />
            <KSkeletonBox
              class="ml-2"
              width="75"
              height="2" />
            <hr class="mb-0">
          </slot>
        </div>
        <div class="skeleton-card-content">
          <slot name="card-content">
            <KSkeletonBox width="10" />
          </slot>
        </div>
        <div class="skeleton-card-footer">
          <slot name="card-footer">
            <KSkeletonBox width="5" />
            <KSkeletonBox width="5" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KSkeletonBox from './KSkeletonBox'

export default {
  name: 'CardSkeleton',
  components: { KSkeletonBox },
  props: {
    cardCount: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #e6e6e6;
.skeleton-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.skeleton-card-column {
  padding: 0 1rem 0 0;
  margin-bottom: 1rem;
  width: var(--KSkeletonCardWidth, 33%);
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  height: 324px;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid $borderColor;
  overflow: hidden;
  .skeleton-card-header {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
  }
  .skeleton-card-content {
    display: flex;
    justify-content: space-between;
  }
  .skeleton-card-footer {
    display: flex;
    align-self: flex-end;
    justify-content: space-between;
    width: 100%;
    margin-top: auto;
    padding-top: 1rem;
  }
}
</style>
