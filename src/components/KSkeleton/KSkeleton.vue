<template>
  <div
    v-if="isVisible"
    class="k-skeleton-container"
    :class="{ 'is-spinner': type !== 'spinner' }"
  >
    <CardSkeleton
      v-if="type === 'card'"
      :card-count="cardCount"
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
    />

    <FullScreenGenericSpinner
      v-else-if="type === 'fullscreen-generic'"
      :hide-progress="hideProgress"
      :progress="progress"
    />

    <KIcon
      v-else-if="type === 'spinner'"
      color="#000"
      icon="spinner"
      size="18"
    />

    <Skeleton v-else />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { onMounted, ref } from 'vue'
import Skeleton from '@/components/KSkeleton/SkeletonBase.vue'
import CardSkeleton from '@/components/KSkeleton/CardSkeleton.vue'
import TableSkeleton from '@/components/KSkeleton/TableSkeleton.vue'
import FormSkeleton from '@/components/KSkeleton/FormSkeleton.vue'
import FullScreenKongSkeleton from '@/components/KSkeleton/FullScreenKongSkeleton.vue'
import FullScreenGenericSpinner from '@/components/KSkeleton/FullScreenGenericSpinner.vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import type { SkeletonType } from '@/types'
import { SkeletonTypeArray } from '@/types'

const props = defineProps({
  delayMilliseconds: {
    type: Number,
    required: false,
    default: 0,
  },
  type: {
    type: String as PropType<SkeletonType>,
    default: '',
    validator: (val: SkeletonType): boolean => SkeletonTypeArray.includes(val),
  },
  progress: {
    type: Number,
    required: false,
    default: null,
  },
  hideProgress: {
    type: Boolean,
    default: false,
  },
  cardCount: {
    type: Number,
    default: 1,
  },
  tableColumns: {
    type: Number,
    required: false,
    default: 6,
  },
  tableRows: {
    type: Number,
    required: false,
    default: 6,
  },
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, props.delayMilliseconds)
})

</script>

<style lang="scss">



.k-skeleton-container {
  display: flex !important;
  flex-wrap: wrap !important;

  &.is-spinner {
    width: 100% !important;
  }
}
</style>
