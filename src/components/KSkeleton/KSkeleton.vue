<template>
  <div
    v-if="isVisible"
    class="k-skeleton"
    :class="{ 'not-spinner': type !== 'spinner' }"
  >
    <CardSkeleton
      v-if="type === 'card'"
      :card-count="cardCount"
      :max-width="cardMaxWidth"
    >
      <template #card-header>
        <slot name="card-header" />
      </template>

      <template #card-content>
        <slot name="card-content" />
      </template>

      <template #card-footer>
        <slot name="card-footer" />
      </template>
    </CardSkeleton>

    <TableSkeleton
      v-else-if="type === 'table'"
      :columns="tableColumns"
      :rows="tableRows"
    >
      <slot name="default" />
    </TableSkeleton>

    <FormSkeleton v-else-if="type === 'form'" />

    <FullScreenKongSkeleton
      v-else-if="type === 'fullscreen-kong'"
      :hide-progress="hideProgress"
      :progress="progress"
      :z-index="zIndex"
    />

    <FullScreenGenericSpinner
      v-else-if="type === 'fullscreen-generic'"
      :hide-progress="hideProgress"
      :progress="progress"
      :z-index="zIndex"
    />

    <ProgressIcon
      v-else-if="type === 'spinner'"
      class="skeleton-spinner"
      :color="`var(--kui-color-text-neutral, ${KUI_COLOR_TEXT_NEUTRAL})`"
      title="Loading"
    />

    <Skeleton v-else />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import Skeleton from '@/components/KSkeleton/SkeletonBase.vue'
import CardSkeleton from '@/components/KSkeleton/CardSkeleton.vue'
import TableSkeleton from '@/components/KSkeleton/TableSkeleton.vue'
import FormSkeleton from '@/components/KSkeleton/FormSkeleton.vue'
import FullScreenKongSkeleton from '@/components/KSkeleton/FullScreenKongSkeleton.vue'
import FullScreenGenericSpinner from '@/components/KSkeleton/FullScreenGenericSpinner.vue'
import type { SkeletonProps, SkeletonSlots } from '@/types'
import { ProgressIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL } from '@kong/design-tokens'

const {
  type = '',
  delayMilliseconds = 0,
  cardCount = 1,
  cardMaxWidth = '',
  tableColumns = 5,
  tableRows = 6,
  progress = null,
  hideProgress,
  zIndex = 10500,
} = defineProps<SkeletonProps>()

defineSlots<SkeletonSlots>()

const isVisible = ref(delayMilliseconds === 0)

onMounted(() => {
  if (isVisible.value) {
    return
  }
  setTimeout(() => {
    isVisible.value = true
  }, delayMilliseconds)
})

</script>

<style lang="scss">

.k-skeleton {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  &.not-spinner {
    width: 100%;
  }
}
</style>
