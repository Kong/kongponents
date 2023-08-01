<template>
  <div class="skeleton-card-wrapper">
    <div
      v-for="c in cardCount"
      :key="c"
      class="skeleton-card-column"
    >
      <div class="skeleton-card">
        <div class="skeleton-card-header">
          <slot name="card-header">
            <KSkeletonBox
              class="card-header-content-1"
              height="2"
              width="25"
            />
            <KSkeletonBox
              class="card-header-content-2"
              height="2"
              width="75"
            />
            <hr>
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

<script lang="ts" setup>
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'

defineProps({
  cardCount: {
    type: Number,
    default: 1,
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

$borderColor: #e6e6e6;
.skeleton-card-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  justify-content: space-between;
  width: 100%;
}
.skeleton-card-column {
  margin-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  width: var(--KSkeletonCardWidth, calc(33% - var(--spacing-md, 16px)));
}
.skeleton-card {
  border: var(--kui-border-width-10, $kui-border-width-10) solid $borderColor;
  border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
  display: flex;
  flex-direction: column;
  min-height: 324px;
  overflow: hidden;
  padding: var(--spacing-md, var(--kui-space-60, $kui-space-60));
  .skeleton-card-header {
    display: flex;
    margin-bottom: var(--spacing-md, var(--kui-space-60, $kui-space-60));
    width: 100%;

    .card-header-content-2 {
      margin-left: var(--kui-space-40, $kui-space-40) !important;
    }

    hr {
      margin-bottom: var(--kui-space-0, $kui-space-0) !important;
    }
  }
  .skeleton-card-content {
    display: flex;
    justify-content: space-between;
  }
  .skeleton-card-footer {
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    margin-top: var(--kui-space-auto, $kui-space-auto);
    padding-top: var(--spacing-md, var(--kui-space-60, $kui-space-60));
    width: 100%;
  }
}
</style>
