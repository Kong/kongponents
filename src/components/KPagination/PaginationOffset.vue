<template>
  <ul class="pagination-button-container mb-0 pa-0">
    <li
      :class="{ disabled: prevButtonDisabled }"
      class="pagination-button"
      data-testid="prev-btn">
      <a
        href="#"
        aria-label="Go to the previous page"
        @click.prevent="getPrevOffset">
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
      data-testid="next-btn">
      <a
        href="#"
        aria-label="Go to the next page"
        @click.prevent="getNextOffset">
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
import KSelect from '@/components/KSelect/KSelect.vue'

export default defineComponent({
  name: 'PaginationOffset',
  components: {
    KIcon,
    KSelect
  },
  props: {
    prevButtonDisabled: {
      type: Boolean,
      default: false
    },
    nextButtonDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
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
  }
})
</script>
