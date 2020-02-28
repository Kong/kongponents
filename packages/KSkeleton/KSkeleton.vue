<template>
  <div
    v-if="isVisible || delayMilliseconds === 0"
    :class="{ 'w-100': type !== 'spinner' }"
    class="k-loading-state">
    <CardSkeleton
      v-if="type === 'card'"
      :card-count="cardCount "/>
    <TableSkeleton
      v-else-if="type === 'table'"
      :columns="tableColumns"
      :rows="tableRows"/>
    <FormSkeleton v-else-if="type === 'form'"/>
    <KIcon
      v-else-if="type === 'spinner'"
      icon="spinner"
      view-box="0 0 16 16"
      color="#000" />
    <Skeleton v-else />
  </div>
</template>

<script>
import Skeleton from './Skeleton'
import CardSkeleton from './CardSkeleton'
import TableSkeleton from './TableSkeleton'
import FormSkeleton from './FormSkeleton'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KSkeleton',
  components: { Skeleton, CardSkeleton, TableSkeleton, FormSkeleton, KIcon },
  props: {
    delayMilliseconds: {
      type: Number,
      required: false,
      default: 750
    },
    type: {
      type: String,
      default: '',
      validator: (val) => ['table', 'card', 'form', 'spinner', ''].indexOf(val) !== -1
    },
    cardCount: {
      type: Number,
      default: 1
    },
    tableColumns: {
      type: Number,
      required: false,
      default: 6
    },
    tableRows: {
      type: Number,
      required: false,
      default: 6
    }
  },
  data () {
    return {
      isVisible: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.isVisible = true
    }, this.delayMilliseconds)
  }
}
</script>

<style lang="scss">
.k-loading-state {
  display: flex;
  flex-wrap: wrap;
  .box {
    display: inline-flex;
    border-radius: 3px;
    background: linear-gradient(
      -70deg,
      #f2f2f2 0%,
      #f2f2f2 40%,
      #f7f7f7 50%,
      #f2f2f2 60%,
      #f2f2f2 100%
    ) repeat;
    background-size: 400% 100%;
    animation: gradient 1s ease infinite;

    // Provided box widths
    &.width {
      &-1 { width: 1rem; }
      &-2 { width: 2rem; }
      &-5 { width: 5rem; }
      &-6 { width: 6rem; }
      &-10 { width: 10rem; }
      &-12 { width: 12rem; }
      &-50 { width: 50%; }
      &-80 { width: 80%; }
      &-100 { width: 100%; }
    }
    // Provided box heights
    &.height {
      &-1 { height: 1rem; }
      &-2 { height: 2rem; }
    }
  }
}

@keyframes gradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
