<template>
  <ul class="pagination-button-container mb-0 pa-0">
    <li
      :class="{ disabled: prevButtonDisabled }"
      class="pagination-button"
      data-testid="prev-btn"
    >
      <a
        href="#"
        aria-label="Go to the previous page"
        @click.prevent="getPrevOffset"
      >
        <KIcon
          :color="prevButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowLeft"
          size="16"
          view-box="0 0 16 14"
        />
      </a>
    </li>
    <li
      :class="{ disabled: nextButtonDisabled }"
      class="pagination-button"
      data-testid="next-btn"
    >
      <a
        href="#"
        aria-label="Go to the next page"
        @click.prevent="getNextOffset"
      >
        <KIcon
          :color="nextButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowRight"
          size="16"
          view-box="0 0 16 14"
        />
      </a>
    </li>
  </ul>
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
.pagination-button-container {
  display: flex;
  list-style: none;
  text-align: center;
  a {
    text-decoration: none !important;
    font-weight: initial;
    display: block;
  }
  .pagination-button {
    align-self: center;
    width: 32px;
    height: 32px;
    line-height: 20px;
    font-size: 12px;
    font-weight: initial;
    color: var(--grey-500);
    border: 1px solid var(--grey-300);
    background-color: white;
    border-radius: 4px;
    margin: 0 6px;
    cursor: pointer;
    a, div {
      padding: 6px;
    }
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
