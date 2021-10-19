<template>
  <nav aria-label="Pagination Navigation">
    <div
      v-if="totalCount > currentPageSize"
      class="card-pagination-bar">
      <span class="pagination-text">
        <span class="pagination-text-pages">{{ pagesString }}</span>
        {{ pageCountString }}
      </span>
      <ul class="pagination-button-container">
        <li
          :class="{ disabled: backDisabled }"
          class="pagination-button square"
          aria-label="Go to the previous page"
          @click="pageBack"
        ><a>
          <KIcon
            :color="backDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
            icon="arrowLeft"
            width="16px"
            heigth="16px"
            view-box="0 0 16 14"
          />
        </a></li>
        <li
          v-if="firstDetached"
          class="pagination-button"
          aria-label="Go to the first page"
          @click="changePage(1)"
        ><a>
          1
        </a></li>
        <li
          v-if="firstDetached"
          class="pagination-button placeholder"><a>
            ...
        </a></li>
        <li
          v-for="page in pagesVisible"
          :key="page"
          :class="{ active: page == currentPage }"
          :aria-current="page == currentPage && 'page'"
          :aria-label="`Go to page ${page}`"
          class="pagination-button"
          @click="changePage(page)"
        ><a>
          {{ page }}
        </a></li>
        <li
          v-if="lastDetached"
          class="pagination-button placeholder"><a>
            ...
        </a></li>
        <li
          v-if="lastDetached"
          class="pagination-button"
          aria-label="Go to the last page"
          @click="changePage(pageCount)"
        ><a>
          {{ pageCount }}
        </a></li>
        <li
          :class="{ disabled: forwardDisabled }"
          class="pagination-button square"
          aria-label="Go to the next page"
          @click="pageForward"
        ><a>
          <KIcon
            :color="forwardDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
            icon="arrowRight"
            width="16px"
            heigth="16px"
            view-box="0 0 16 14"
          />
        </a></li>
      </ul>
      <span class="page-size-select">
        <KSelect
          :placeholder="`${currentPageSize} items per page`"
          :items="pageSizeOptions"
          :test-mode="testMode"
          appearance="button"
          @selected="updatePageSize"
        />
      </span>
    </div>
  </nav>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'
import KSelect from '@kongponents/kselect/KSelect.vue'

export default {
  name: 'KPagination',
  components: {
    KIcon,
    KSelect
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
    pageSizes: {
      type: Array,
      default: () => [15, 25, 50, 75, 100]
    },
    neighbors: {
      type: Number,
      default: 1
    },
    searchTriggered: {
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
  data () {
    const currentPage = 1
    const currentPageSize = this.pageSizes[0]
    const pageCount = Math.ceil(this.totalCount / currentPageSize)

    const pageSizeOptions = this.pageSizes.map((size, i) => ({
      label: `${size}`,
      key: `size-${i}`,
      value: size
    }))

    return {
      currentPage,
      currentPageSize,
      pageCount,
      pageSizeOptions,
      backDisabled: true,
      forwardDisabled: this.totalCount === 1,
      pagesVisible: this.getVisiblePages(
        currentPage,
        pageCount,
        false,
        pageCount > 5 + 2 * this.neighbors
      ),
      firstDetached: false,
      lastDetached: pageCount > 5 + 2 * this.neighbors
    }
  },
  computed: {
    startCount () {
      return (this.currentPage - 1) * this.currentPageSize + 1
    },
    endCount () {
      let calculatedEndCount = this.startCount - 1 + this.currentPageSize

      return calculatedEndCount > this.totalCount
        ? this.totalCount
        : calculatedEndCount
    },
    pagesString () {
      return `${this.startCount} to ${this.endCount}`
    },
    pageCountString () {
      return ` of ${this.totalCount}`
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
      const lastEntry =
        (this.currentPage - 1) * this.currentPageSize + this.currentPageSize

      this.forwardDisabled = lastEntry >= this.totalCount
      this.backDisabled = this.currentPage === 1

      // The view will hold
      // Selected page, first page, last page, 2 placeholders and 2 * neighbors
      const visiblePages = 5 + 2 * this.neighbors

      if (this.pageCount <= visiblePages) {
        // All pages will fit in screen
        this.firstDetached = false
        this.lastDetached = false
      } else {
        this.firstDetached = this.currentPage >= this.neighbors + 4
        this.lastDetached =
          this.currentPage <= this.pageCount - this.neighbors - 3
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
    updatePageSize (event) {
      this.currentPageSize = event.value
      this.pageCount = Math.ceil(this.totalCount / this.currentPageSize)

      this.$emit('pageSizeChanged', {
        pageSize: this.currentPageSize,
        pageCount: this.pageCount
      })

      this.changePage(1)
    },
    getVisiblePages (
      currentPage = this.currentPage,
      pageCount = this.pageCount,
      firstDetached = this.firstDetached,
      lastDetached = this.lastDetached
    ) {
      let pages = [...Array(pageCount).keys()].map((n) => n + 1)

      const visiblePages = 5 + 2 * this.neighbors
      // All pages fit on one screen
      if (pages.length <= visiblePages) {
        return pages
      }

      if (!firstDetached) {
        // First pages
        pages = pages.filter((n) => n <= this.neighbors * 2 + 3)
      } else if (firstDetached && lastDetached) {
        // Middle pages (if they do not fit on one screen)
        pages = pages.filter(
          (n) =>
            n > currentPage - this.neighbors - 1 &&
            n < currentPage + this.neighbors + 1
        )
      } else if (firstDetached && !lastDetached) {
        // Last pages
        pages = pages.filter((n) => n > pageCount - this.neighbors * 2 - 3)
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

.page-size-select {
  --KButtonFontSize: var(--type-sm);
  color: var(--blue-400);
  font-weight: 500;
  line-height: 20px;
}

.pagination-button-container {
  display: flex;
  list-style: none;
  text-align: center;

  a {
    text-decoration: none !important;
    font-weight: initial;
  }

  .pagination-button {
    align-self: center;
    width: 32px;
    height: 32px;

    line-height: 32px;
    font-weight: initial;
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
