<template>
  <div
    v-if="isVisible"
    class="d-flex flex-wrap k-skeleton-container"
    :class="{ 'w-100': type !== 'spinner', 'opacity-0': !isVisible }"
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

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Skeleton from '@/components/KSkeleton/SkeletonBase.vue'
import CardSkeleton from '@/components/KSkeleton/CardSkeleton.vue'
import TableSkeleton from '@/components/KSkeleton/TableSkeleton.vue'
import FormSkeleton from '@/components/KSkeleton/FormSkeleton.vue'
import FullScreenKongSkeleton from '@/components/KSkeleton/FullScreenKongSkeleton.vue'
import FullScreenGenericSpinner from '@/components/KSkeleton/FullScreenGenericSpinner.vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'KSkeleton',
  components: {
    Skeleton,
    CardSkeleton,
    TableSkeleton,
    FormSkeleton,
    FullScreenKongSkeleton,
    FullScreenGenericSpinner,
    KIcon,
  },
  props: {
    delayMilliseconds: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      default: '',
      validator: (val: string): boolean => [
        'table',
        'card',
        'form',
        'spinner',
        'fullscreen-kong',
        '', // default Skeleton.vue
      ].includes(val),
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
  },
  setup(props) {
    const isVisible = ref(false)

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = true
      }, props.delayMilliseconds)
    })

    return {
      isVisible,
    }
  },
})
</script>

<style lang="scss">
@import '@/styles/variables';
@import '@/styles/functions';

.k-skeleton-container.opacity-0 .box {
  opacity: 0;
}

.k-skeleton-container.opacity-0 :deep(.kong-icon) {
  display: none;
}

.k-skeleton-container.opacity-0.mr-2 {
  margin-right: 0 !important;
}
</style>
