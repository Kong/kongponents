
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

<script lang="ts">
import { defineComponent } from 'vue'
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'

export default defineComponent({
  name: 'CardSkeleton',
  components: { KSkeletonBox },
  props: {
    cardCount: {
      type: Number,
      default: 1,
    },
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
  gap: 16px;
  width: 100%;
}
.skeleton-card-column {
  width: var(--KSkeletonCardWidth, calc(33% - 16px));
  margin-bottom: 16px;
}
.skeleton-card {
  display: flex;
  flex-direction: column;
  min-height: 324px;
  padding: 16px;
  overflow: hidden;
  border: 1px solid $borderColor;
  border-radius: 3px;
  .skeleton-card-header {
    display: flex;
    width: 100%;
    margin-bottom: 16px;
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
    padding-top: 16px;
    margin-top: auto;
  }
}
</style>
