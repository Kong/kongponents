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

export default {
  name: 'PaginationOffset',
  components: {
    KIcon
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

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';
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
