<template>
  <nav
    aria-label="Pagination Navigation"
    data-testid="k-pagination-container"
  >
    <div class="card-pagination-bar">
      <template v-if="paginationType === 'default'">
        <span
          class="pagination-text"
          data-testid="visible-items"
        >
          <span class="pagination-text-pages">{{ pagesString }}</span>
          {{ pageCountString }}
        </span>
        <ul class="pagination-button-container">
          <li
            class="pagination-button square"
            :class="{ disabled: backDisabled }"
            data-testid="prev-btn"
          >
            <a
              aria-label="Go to the previous page"
              href="#"
              @click.prevent="pageBack"
            >
              <KIcon
                :color="backDisabled ? 'var(--KPaginationDisabledColor, var(--grey-500))' : 'var(--KPaginationColor, var(--blue-400))'"
                icon="arrowLeft"
                size="16"
                view-box="0 0 16 14"
              />
            </a>
          </li>
          <li
            v-if="!disablePageJump && firstDetached"
            class="pagination-button"
            data-testid="page-1-btn"
          >
            <a
              aria-label="Go to the first page"
              href="#"
              @click.prevent="changePage(1)"
            >1</a>
          </li>
          <li
            v-if="!disablePageJump && firstDetached"
            class="pagination-button placeholder"
          >
            ...
          </li>
          <li
            v-for="page in pagesVisible"
            :key="page"
            class="pagination-button"
            :class="{ active: page == currentlySelectedPage }"
            :data-testid="`page-${ page }-btn`"
          >
            <a
              :aria-current="page == currentlySelectedPage && 'page' || undefined"
              :aria-label="`Go to page ${ page }`"
              href="#"
              @click.prevent="changePage(page)"
            >{{ page }}</a>
          </li>
          <li
            v-if="!disablePageJump && lastDetached"
            class="pagination-button placeholder"
          >
            ...
          </li>
          <li
            v-if="!disablePageJump && lastDetached"
            class="pagination-button"
          >
            <a
              aria-label="Go to the last page"
              data-testid="last-btn"
              href="#"
              @click.prevent="changePage(pageCount)"
            >{{ pageCount }}</a>
          </li>
          <li
            class="pagination-button square"
            :class="{ disabled: forwardDisabled }"
            data-testid="next-btn"
          >
            <a
              aria-label="Go to the next page"
              href="#"
              @click.prevent="pageForward"
            >
              <KIcon
                :color="forwardDisabled ? 'var(--KPaginationDisabledColor, var(--grey-500))' : 'var(--KPaginationColor, var(--blue-400))'"
                icon="arrowRight"
                size="16"
                view-box="0 0 16 14"
              />
            </a>
          </li>
        </ul>
      </template>
      <PaginationOffset
        v-else
        :next-button-disabled="offsetNextButtonDisabled"
        :prev-button-disabled="offsetPrevButtonDisabled"
        @get-next-offset="getNextOffset"
        @get-prev-offset="getPrevOffset"
      />
      <span
        class="page-size-select"
        data-testid="page-size-dropdown"
      >
        <KSelect
          appearance="button"
          :button-text="pageSizeText"
          :items="pageSizeOptions"
          :kpop-attributes="kpopAttrs"
          :placeholder="`${ currentPageSize } items per page`"
          position-fixed
          :test-mode="!!testMode || undefined"
          width="205"
          @selected="updatePageSize"
        />
      </span>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed, watch, PropType } from 'vue'
import KIcon from '@/components/KIcon/KIcon.vue'
import KSelect from '@/components/KSelect/KSelect.vue'
import PaginationOffset from './PaginationOffset.vue'
import type { PaginationType } from '@/types'

export default defineComponent({
  name: 'KPagination',
  components: {
    KIcon,
    KSelect,
    PaginationOffset,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [15, 30, 50, 75, 100],
      validator: (pageSizes: number[]): boolean => !!pageSizes.length && pageSizes.every(i => typeof i === 'number'),
    },
    initialPageSize: {
      type: Number,
      default: null,
    },
    neighbors: {
      type: Number,
      default: 1,
    },
    searchTriggered: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: null,
    },
    disablePageJump: {
      type: Boolean,
      default: false,
    },
    paginationType: {
      type: String as PropType<PaginationType>,
      default: 'default',
      validator: (value: PaginationType) => ['default', 'offset'].includes(value),
    },
    offsetPrevButtonDisabled: {
      type: Boolean,
      default: false,
    },
    offsetNextButtonDisabled: {
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
  emits: ['pageChanged', 'pageSizeChanged', 'getNextOffset', 'getPrevOffset'],
  setup(props, { emit }) {
    const currPage: Ref<number> = ref(props.currentPage ? props.currentPage : 1)
    const currentPageSize: Ref<number> = ref(props.initialPageSize ? props.initialPageSize : props.pageSizes[0])
    const pageCount: Ref<number> = ref(Math.ceil(props.totalCount / currentPageSize.value))
    const pageSizeOptions = props.pageSizes.map((size, i) => ({
      label: `${size}`,
      key: `size-${i}`,
      value: size,
    }))
    const pageSizeText = ref('')

    const getVisiblePages = (currPage: number, pageCount: number, firstDetached: boolean, lastDetached: boolean): number | number[] => {
      if (props.disablePageJump) {
        return 0
      }
      let pages = [...Array(pageCount).keys()].map((n) => n + 1)
      const visiblePages = 5 + 2 * props.neighbors
      // All pages fit on one screen
      if (pages.length <= visiblePages) {
        return pages
      }
      if (!firstDetached) {
        // First pages
        pages = pages.filter((n) => n <= props.neighbors * 2 + 3)
      } else if (firstDetached && lastDetached) {
        // Middle pages (if they do not fit on one screen)
        pages = pages.filter(
          (n) =>
            n > currPage - props.neighbors - 1 &&
            n < currPage + props.neighbors + 1,
        )
      } else if (firstDetached && !lastDetached) {
        // Last pages
        pages = pages.filter((n) => n > pageCount - props.neighbors * 2 - 3)
      }
      return pages
    }

    const backDisabled = ref(currPage.value === 1)
    const forwardDisabled = ref(currPage.value === pageCount.value)

    const startCount = computed((): number => (currPage.value - 1) * currentPageSize.value + 1)
    const endCount = computed((): number => {
      const calculatedEndCount = startCount.value - 1 + currentPageSize.value
      return calculatedEndCount > props.totalCount
        ? props.totalCount
        : calculatedEndCount
    })
    const pagesString = computed((): string => `${startCount.value} to ${endCount.value}`)
    const pageCountString = computed((): string => ` of ${props.totalCount}`)
    const currentlySelectedPage = computed((): number => props.currentPage ? props.currentPage : currPage.value)
    const firstDetached = ref(false)
    const lastDetached = ref(pageCount.value > 5 + 2 * props.neighbors)
    const pagesVisible = ref(getVisiblePages(
      currentlySelectedPage.value,
      pageCount.value,
      false,
      pageCount.value > 5 + 2 * props.neighbors,
    ))

    const pageForward = ():void => {
      if (forwardDisabled.value) return

      currPage.value++
      updatePage()
    }

    const pageBack = ():void => {
      if (backDisabled.value) return

      currPage.value--
      updatePage()
    }

    const changePage = (page: number):void => {
      currPage.value = page
      updatePage()
    }

    const updatePage = (): void => {
      const lastEntry = (currPage.value - 1) * currentPageSize.value + currentPageSize.value
      forwardDisabled.value = lastEntry >= props.totalCount
      backDisabled.value = currPage.value === 1
      // The view will hold
      // Selected page, first page, last page, 2 placeholders and 2 * neighbors
      const visiblePages = 5 + 2 * props.neighbors
      if (pageCount.value <= visiblePages) {
        // All pages will fit in screen
        firstDetached.value = false
        lastDetached.value = false
      } else {
        firstDetached.value = currPage.value >= props.neighbors + 4
        lastDetached.value = currPage.value <= pageCount.value - props.neighbors - 3
      }
      pagesVisible.value = getVisiblePages(currPage.value, pageCount.value, firstDetached.value, lastDetached.value)
      emit('pageChanged', {
        page: currPage.value,
        pageCount: pageCount.value,
        firstItem: startCount.value,
        lastItem: endCount.value,
        visibleItems: props.items.slice(startCount.value - 1, endCount.value),
      })
    }

    const updatePageSize = (event: any): void => {
      currentPageSize.value = event.value
      pageSizeText.value = currentPageSize.value + ' items per page'
      pageCount.value = Math.ceil(props.totalCount / currentPageSize.value)
      emit('pageSizeChanged', {
        pageSize: currentPageSize.value,
        pageCount: pageCount.value,
      })
      if (props.currentPage !== 1) {
        changePage(1)
      }
    }

    const getNextOffset = (): void => {
      emit('getNextOffset')
    }

    const getPrevOffset = (): void => {
      emit('getPrevOffset')
    }

    watch(() => props.currentPage, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        changePage(newVal)
      }
    })

    return {
      kpopAttrs: {
        placement: 'top',
      },
      currentPageSize,
      pageCount,
      pageSizeOptions,
      backDisabled,
      forwardDisabled,
      pageSizeText,
      pagesVisible,
      firstDetached,
      lastDetached,
      startCount,
      endCount,
      pagesString,
      pageCountString,
      currentlySelectedPage,
      pageForward,
      pageBack,
      changePage,
      updatePage,
      updatePageSize,
      getNextOffset,
      getPrevOffset,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.card-pagination-bar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.pagination-text {
  color: var(--grey-500);
  font-size: 14px;
  font-weight: 500;
  min-width: 115px;

  &-pages {
    color: black;
  }
}

.page-size-select {
  --KButtonLink: var(--KPaginationPageSizeColor, var(--blue-400));
  --KButtonOutlineBorder: var(--KPaginationPageSizeColor, var(--blue-400));
  --KButtonFontSize: var(--type-sm);
  color: var(--blue-400);
  font-weight: 600;
  line-height: 20px;
}

.pagination-button-container {
  display: flex;
  list-style: none;
  text-align: center;

  a {
    display: block;
    font-weight: initial;
    text-decoration: none !important;
  }

  .pagination-button {
    align-self: center;
    background-color: white;
    border: 1px solid var(--KPaginationBorderColor, var(--grey-300));
    border-radius: 4px;
    color: var(--KPaginationColor, var(--grey-500));
    cursor: pointer;
    font-size: 12px;
    font-weight: initial;
    height: 32px;
    line-height: 20px;
    margin: 0 6px;
    min-width: 32px;

     &:not(.square) {
      background-color: var(--KPaginationBackgroundColor, white);
    }

    a, div {
      padding: 6px;
    }

    &.square {
      border: none;
    }

    &.placeholder {
      align-items: center;
      color: var(--KPaginationColor, var(--grey-500));
      cursor: initial;
      display: flex;
      justify-content: center;
    }

    &:focus:not(.placeholder),
    &:hover:not(.placeholder) {
      border-color: var(--KPaginationActiveColor, var(--blue-500));
      border-radius: 4px;
      color: var(--KPaginationActiveColor, var(--blue-500));
    }

    &.disabled:focus:not(.placeholder),
    &.disabled:hover:not(.placeholder) {
      border-color: var(--grey-200);
      color: var(--black-45);
    }

    &.disabled {
      a {
        cursor: not-allowed !important;
      }
    }

    &.active {
      background-color: var(--blue-100);
      background-color: var(--KPaginationActiveBackgroundColor, var(--blue-100));
      border-color: var(--KPaginationActiveBorderColor, var(--blue-200));
      border-radius: 4px;
      color: var(--KPaginationActiveColor, var(--blue-500));
      outline: none;

      a {
        color: var(--KPaginationActiveColor, var(--blue-500));
      }
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
