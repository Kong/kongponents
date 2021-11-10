<template>
  <nav
    aria-label="Pagination Navigation"
    data-testid="k-pagination-container">
    <div
      v-if="totalCount > currentPageSize"
      class="card-pagination-bar">
      <span
        class="pagination-text"
        data-testid="visible-items">
        <span class="pagination-text-pages">{{ pagesString }}</span>
        {{ pageCountString }}
      </span>
      <ul class="pagination-button-container">
        <li
          :class="{ disabled: backDisabled }"
          class="pagination-button square"
          data-testid="prev-btn">
          <a
            href="#"
            aria-label="Go to the previous page"
            @click.prevent="pageBack">
            <KIcon
              :color="backDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
              icon="arrowLeft"
              width="16px"
              heigth="16px"
              view-box="0 0 16 14"
            />
          </a>
        </li>
        <li
          v-if="firstDetached"
          class="pagination-button"
          data-testid="page-1-btn">
          <a
            href="#"
            aria-label="Go to the first page"
            @click.prevent="changePage(1)">
            1
          </a>
        </li>
        <li
          v-if="firstDetached"
          class="pagination-button placeholder">
          ...
        </li>
        <li
          v-for="page in pagesVisible"
          :key="page"
          :class="{ active: page == currentlySelectedPage }"
          :data-testid="`page-${page}-btn`"
          class="pagination-button">
          <a
            :aria-label="`Go to page ${page}`"
            :aria-current="page == currentlySelectedPage && 'page'"
            href="#"
            @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>
        <li
          v-if="lastDetached"
          class="pagination-button placeholder">
          ...
        </li>
        <li
          v-if="lastDetached"
          class="pagination-button">
          <a
            href="#"
            aria-label="Go to the last page"
            data-testid="last-btn"
            @click.prevent="changePage(pageCount)">
            {{ pageCount }}
          </a>
        </li>
        <li
          :class="{ disabled: forwardDisabled }"
          class="pagination-button square"
          data-testid="next-btn">
          <a
            href="#"
            aria-label="Go to the next page"
            @click.prevent="pageForward">
            <KIcon
              :color="forwardDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
              icon="arrowRight"
              width="16px"
              heigth="16px"
              view-box="0 0 16 14"
            />
          </a>
        </li>
      </ul>
      <span
        class="page-size-select"
        data-testid="page-size-dropdown">
        <KSelect
          :placeholder="`${currentPageSize} items per page`"
          :items="pageSizeOptions"
          :test-mode="testMode"
          :button-text="pageSizeText"
          :kpop-attributes="kpopAttrs"
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
    currentPage: {
      type: Number,
      default: null
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
    const currPage = this.currentPage ? this.currentPage : 1
    const currentPageSize = this.pageSizes[0]
    const pageCount = Math.ceil(this.totalCount / currentPageSize)

    const pageSizeOptions = this.pageSizes.map((size, i) => ({
      label: `${size}`,
      key: `size-${i}`,
      value: size
    }))

    return {
      kpopAttrs: {
        placement: 'top'
      },
      currPage,
      currentPageSize,
      pageCount,
      pageSizeOptions,
      backDisabled: currPage === 1,
      forwardDisabled: this.totalCount === 1,
      pageSizeText: '',
      pagesVisible: this.getVisiblePages(
        this.currentlySelectedPage,
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
      return (this.currPage - 1) * this.currentPageSize + 1
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
    },
    currentlySelectedPage () {
      if (this.currentPage) {
        return this.currentPage
      } else {
        return this.currPage
      }
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

      this.currPage++
      this.updatePage()
    },
    pageBack () {
      if (this.backDisabled) {
        return
      }

      this.currPage--
      this.updatePage()
    },
    changePage (page) {
      this.currPage = page
      this.updatePage()
    },
    updatePage () {
      const lastEntry =
        (this.currPage - 1) * this.currentPageSize + this.currentPageSize

      this.forwardDisabled = lastEntry >= this.totalCount
      this.backDisabled = this.currPage === 1

      // The view will hold
      // Selected page, first page, last page, 2 placeholders and 2 * neighbors
      const visiblePages = 5 + 2 * this.neighbors

      if (this.pageCount <= visiblePages) {
        // All pages will fit in screen
        this.firstDetached = false
        this.lastDetached = false
      } else {
        this.firstDetached = this.currPage >= this.neighbors + 4
        this.lastDetached =
          this.currPage <= this.pageCount - this.neighbors - 3
      }

      this.pagesVisible = this.getVisiblePages()

      this.$emit('pageChanged', {
        page: this.currPage,
        pageCount: this.pageCount,
        firstItem: this.startCount,
        lastItem: this.endCount,
        visibleItems: this.items.slice(this.startCount - 1, this.endCount)
      })
    },
    updatePageSize (event) {
      this.currentPageSize = event.value
      this.pageSizeText = this.currentPageSize + ' items per page'
      this.pageCount = Math.ceil(this.totalCount / this.currentPageSize)

      this.$emit('pageSizeChanged', {
        pageSize: this.currentPageSize,
        pageCount: this.pageCount
      })

      this.changePage(1)
    },
    getVisiblePages (
      currPage = this.currPage,
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
            n > currPage - this.neighbors - 1 &&
            n < currPage + this.neighbors + 1
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
    display: block;
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

<style lang="scss">
.page-size-select {
  .k-select-pop-button[x-placement^="top"] {
    margin-bottom: 2px;
  }
}
</style>
