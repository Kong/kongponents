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

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'
import KSelect from '@kongponents/kselect/KSelect.vue'

export default {
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
    }
  },
  methods: {
    getNextOffset () {
      if (this.nextButtonDisabled) {
        return
      }

      this.$emit('getNextOffset')
    },
    getPrevOffset () {
      if (this.prevButtonDisabled) {
        return
      }

      this.$emit('getPrevOffset')
    }
  }
}
</script>
