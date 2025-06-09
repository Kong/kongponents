<template>
  <div class="skeleton-card-wrapper">
    <div
      v-for="c in cardCount"
      :key="c"
      class="skeleton-card"
    >
      <div class="skeleton-card-header">
        <slot name="card-header">
          <KSkeletonBox width="50" />
        </slot>
      </div>
      <div class="skeleton-card-content">
        <slot name="card-content">
          <KSkeletonBox
            v-for="n in 3"
            :key="n"
            width="100"
          />
          <KSkeletonBox width="50" />
        </slot>
      </div>
      <div class="skeleton-card-footer">
        <slot name="card-footer">
          <KSkeletonBox
            v-for="n in 2"
            :key="n"
            height="2"
            width="5"
          />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
import { KUI_SPACE_50 } from '@kong/design-tokens'
import type { SkeletonCardProps, SkeletonCardSlots } from '@/types'
import { normalizeSize } from '@/utilities/css'

const {
  cardCount,
  maxWidth,
} = defineProps<SkeletonCardProps>()

defineSlots<SkeletonCardSlots>()

const cardMaxWidth = computed((): string => {
  if (maxWidth) {
    return normalizeSize(maxWidth)
  }

  if (cardCount === 1) {
    return '470px'
  }

  const rowCardCount = 3 // can't fit more than 3 cards in a row without wrapping to next row

  return `calc((100% / ${rowCardCount}) - ${KUI_SPACE_50})` // 100% / card count - gap
})
</script>

<style lang="scss" scoped>
.skeleton-card-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--kui-space-50, $kui-space-50);
  justify-content: space-between;
  width: 100%;

  .skeleton-card {
    border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
    border-radius: var(--kui-border-radius-30, $kui-border-radius-30);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--kui-space-90, $kui-space-90);
    max-width: v-bind('cardMaxWidth');
    min-width: 330px;
    padding: var(--kui-space-70, $kui-space-70);
    width: 100%;

    .skeleton-card-footer {
      display: flex;
      gap: var(--kui-space-20, $kui-space-20);
    }
  }
}
</style>
