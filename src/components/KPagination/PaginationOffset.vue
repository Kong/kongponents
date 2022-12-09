<template>
  <div class="pagination-offset-button-container mb-0 pa-0">
    <KButton
      aria-label="Go to the previous page"
      class="pagination-button"
      :class="{ disabled: prevButtonDisabled }"
      data-testid="prev-btn"
      @click.prevent="getPrevOffset"
    >
      <template #icon>
        <KIcon
          :color="prevButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowLeft"
          size="16"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
    <KButton
      aria-label="Go to the next page"
      class="pagination-button"
      :class="{ disabled: nextButtonDisabled }"
      data-testid="next-btn"
      @click.prevent="getNextOffset"
    >
      <template #icon>
        <KIcon
          :color="nextButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowRight"
          size="16"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'

export default defineComponent({
  name: 'PaginationOffset',
  components: {
    KIcon,
  },
  props: {
    prevButtonDisabled: {
      type: Boolean,
      default: false,
    },
    nextButtonDisabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['getPrevOffset', 'getNextOffset'],
  setup(props, { emit }) {
    const getNextOffset = (): void => {
      if (props.nextButtonDisabled) {
        return
      }

      emit('getNextOffset')
    }

    const getPrevOffset = (): void => {
      if (props.prevButtonDisabled) {
        return
      }

      emit('getPrevOffset')
    }

    return {
      getPrevOffset,
      getNextOffset,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
.pagination-offset-button-container {
  display: flex;

  .pagination-button.k-button {
    width: 34px;
    height: 34px;
    color: var(--grey-500);
    border: 1px solid var(--grey-300);
    background-color: white;
    border-radius: 4px;
    margin: 0 6px;
    padding: 6px;

    &:focus,
    &:hover {
      color: var(--blue-500);
      border-color: var(--blue-500);
      border-radius: 4px;
    }

    &.disabled:focus,
    &.disabled:hover {
      color: var(--black-45);
      border-color: var(--grey-200);
      box-shadow: none;
      cursor: not-allowed;
    }

    &.active {
      outline: none;
      color: var(--blue-500);
      border-color: var(--blue-200);
      border-radius: 4px;
      background-color: var(--blue-100);
    }
  }
}
</style>
