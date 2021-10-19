<template>
  <div
    v-if="totalCount > pageSize"
    class="card-pagination-bar">
    <span class="pagination-text">
      <span class="pagination-text-pages">{{ pagesString }}</span>
      {{ pageCountString }}
    </span>
    <div class="pagination-button-container">
      <button
        :class="{ disabled: backDisabled }"
        class="pagination-button square"
        @click="pageBack"
      >
        <KIcon
          :color="backDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowLeft"
          width="16px"
          heigth="16px"
          view-box="0 0 16 14"
        />
      </button>
      <button
        v-if="firstDetached"
        class="pagination-button"
        @click="changePage(1)"
      >
        1
      </button>
      <button
        v-if="firstDetached"
        class="pagination-button placeholder">
        ...
      </button>
      <button
        v-for="page in pagesVisible"
        :key="page"
        :class="{ active: page == currentPage }"
        class="pagination-button"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <button
        v-if="lastDetached"
        class="pagination-button placeholder">
        ...
      </button>
      <button
        v-if="lastDetached"
        class="pagination-button"
        @click="changePage(pageCount)"
      >
        {{ pageCount }}
      </button>
      <button
        :class="{ disabled: forwardDisabled }"
        class="pagination-button square"
        @click="pageForward"
      >
        <KIcon
          :color="forwardDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowRight"
          width="16px"
          heigth="16px"
          view-box="0 0 16 14"
        />
      </button>
    </div>
    <span class="page-count-text">
      Show {{ pageSize }} items per page
      <KIcon
        icon="chevronDown"
        height="16px"
        view-box="0 0 16 14"
        color="var(--blue-400)"
      />
    </span>
  </div>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KPagination',
  components: {
    KIcon
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    totalCount: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 12
    },
    neighbours: {
      type: Number,
      default: 1
    },
    searchTriggered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const currentPage = 1
    const pageCount = Math.ceil(this.totalCount / this.pageSize)

    return {
      currentPage,
      pageCount,
      backDisabled: true,
      forwardDisabled: this.totalCount === 1,
      pagesVisible: this.getVisiblePages(
        currentPage,
        pageCount,
        false,
        pageCount > 5 + 2 * this.neighbours
      ),
      firstDetached: false,
      lastDetached: pageCount > 5 + 2 * this.neighbours
    }
  },
  computed: {
    startCount () {
      return (this.currentPage - 1) * this.pageSize + 1
    },
    endCount () {
      let calculatedEndCount = this.startCount - 1 + this.pageSize

      return calculatedEndCount > this.totalCount
        ? this.totalCount
        : calculatedEndCount
    },
    pagesString () {
      return `${this.startCount} to ${this.endCount}`
    },
    pageCountString () {
      return ` of ${this.totalCount} items`
    }
  },
  watch: {
    searchTriggered (newval) {
      if (newval === true) {
        this.returnToFirstPage()
      }
    }
  },
  methods: {
    pageForward () {
      if (this.forwardDisabled) {
        return
      }

      this.currentPage++
      this.updatePage()
    },
    pageBack () {
      if (this.backDisabled) {
        return
      }

      this.currentPage--
      this.updatePage()
    },
    changePage (page) {
      this.currentPage = page
      this.updatePage()
    },
    updatePage () {
      const lastEntry = (this.currentPage - 1) * this.pageSize + this.pageSize

      this.forwardDisabled = lastEntry >= this.totalCount
      this.backDisabled = this.currentPage === 1

      // The view will hold
      // Selected page, first page, last page, 2 placeholders and 2 * neighbours
      const visiblePages = 5 + 2 * this.neighbours

      if (this.pageCount <= visiblePages) {
        // All pages will fit in screen
        this.firstDetached = false
        this.lastDetached = false
      } else {
        this.firstDetached = this.currentPage >= this.neighbours + 4
        this.lastDetached =
          this.currentPage <= this.pageCount - this.neighbours - 3
      }

      this.pagesVisible = this.getVisiblePages()

      this.$emit('pageChanged', {
        page: this.currentPage,
        pageCount: this.pageCount,
        firstItem: this.startCount,
        lastItem: this.endCount,
        visibleItems: this.items.slice(this.startCount - 1, this.endCount)
      })
    },
    getVisiblePages (
      currentPage = this.currentPage,
      pageCount = this.pageCount,
      firstDetached = this.firstDetached,
      lastDetached = this.lastDetached
    ) {
      let pages = [...Array(pageCount).keys()].map((n) => n + 1)

      const visiblePages = 5 + 2 * this.neighbours
      // All pages fit on one screen
      if (pages.length <= visiblePages) {
        return pages
      }

      if (!firstDetached) {
        // First pages
        pages = pages.filter((n) => n <= this.neighbours * 2 + 3)
      } else if (firstDetached && lastDetached) {
        // Middle pages (if they do not fit on one screen)
        pages = pages.filter(
          (n) =>
            n > currentPage - this.neighbours - 1 &&
            n < currentPage + this.neighbours + 1
        )
      } else if (firstDetached && !lastDetached) {
        // Last pages
        pages = pages.filter((n) => n > pageCount - this.neighbours * 2 - 3)
      }

      return pages
    }
  }
}
</script>

<style lang="scss" scoped>
.card-pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-text {
  font-size: 13px;
  color: var(--grey-500);
  &-pages {
    color: black;
  }
}

.page-count-text {
  color: var(--blue-400);
  font-size: var(--type-sm);
  font-weight: 500;
  line-height: 20px;
}
.pagination-button-container {
  display: flex;

  .pagination-button {
    align-self: center;
    width: 32px;
    height: 32px;
    color: var(--grey-500);
    border: 1px solid var(--grey-200);
    background-color: white;
    border-radius: 4px;
    margin: 0 6px;
    cursor: pointer;

    &.square {
      border: none;
    }

    &.placeholder {
      cursor: initial;
    }

    &:focus:not(.placeholder),
    &:hover:not(.placeholder) {
      color: var(--blue-500);
      border-color: var(--blue-500);
      border-radius: 4px;
    }
    &.disabled:focus:not(.placeholder),
    &.disabled:hover:not(.placeholder) {
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
