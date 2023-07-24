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
              height="2"
              width="25"
            />
            <KSkeletonBox
              class="ml-2"
              height="2"
              width="75"
            />
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
  gap: var(--spacing-md, spacing(md));
  justify-content: space-between;
  width: 100%;
}
.skeleton-card-column {
  margin-bottom: var(--spacing-md, spacing(md));
  width: var(--KSkeletonCardWidth, calc(33% - var(--spacing-md, spacing(md))));
}
.skeleton-card {
  border: 1px solid $borderColor;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  min-height: 324px;
  overflow: hidden;
  padding: var(--spacing-md, spacing(md));
  .skeleton-card-header {
    display: flex;
    margin-bottom: var(--spacing-md, spacing(md));
    width: 100%;
  }
  .skeleton-card-content {
    display: flex;
    justify-content: space-between;
  }
  .skeleton-card-footer {
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding-top: var(--spacing-md, spacing(md));
    width: 100%;
  }
}
</style>
