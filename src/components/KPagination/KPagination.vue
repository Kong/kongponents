<template>
  <nav
    ref="kPaginationElement"
    class="k-pagination"
    :class="{ 'full': !disablePageJump && !offset }"
    data-testid="k-pagination"
  >
    <template v-if="!offset">
      <span
        class="pagination-text"
        data-testid="visible-items"
      >
        <span class="pagination-text-pages">{{ pagesString }}</span>
        {{ pageCountString }}
      </span>
      <ul class="pagination-button-container">
        <li>
          <KButton
            appearance="tertiary"
            aria-label="Go to the previous page"
            class="pagination-button arrow"
            data-testid="previous-button"
            :disabled="backDisabled"
            type="button"
            @click="pageBack"
          >
            <BackIcon
              class="pagination-arrow-icon"
              decorative
            />
          </KButton>
        </li>
        <li v-if="!disablePageJump && firstDetached">
          <button
            aria-label="Go to the first page"
            class="pagination-button"
            data-testid="page-1-button"
            type="button"
            @click="changePage(1)"
          >
            1
          </button>
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
        >
          <button
            :aria-current="page == currentlySelectedPage && 'page' || undefined"
            :aria-label="`Go to page ${ page }`"
            class="pagination-button"
            :class="{ active: page == currentlySelectedPage }"
            :data-testid="`page-${ page }-button`"
            type="button"
            @click="changePage(page)"
          >
            {{ page }}
          </button>
        </li>
        <li
          v-if="!disablePageJump && lastDetached"
          class="pagination-button placeholder"
        >
          ...
        </li>
        <li v-if="!disablePageJump && lastDetached">
          <button
            aria-label="Go to the last page"
            class="pagination-button"
            data-testid="last-button"
            type="button"
            @click="changePage(pageCount)"
          >
            {{ pageCount }}
          </button>
        </li>
        <li>
          <KButton
            appearance="tertiary"
            aria-label="Go to the next page"
            class="pagination-button arrow"
            data-testid="next-button"
            :disabled="forwardDisabled ? true : undefined"
            type="button"
            @click="pageForward"
          >
            <ForwardIcon
              class="pagination-arrow-icon"
              decorative
            />
          </KButton>
        </li>
      </ul>
    </template>
    <PaginationOffset
      v-else
      :next-button-disabled="offsetNextButtonDisabled"
      :previous-button-disabled="offsetPreviousButtonDisabled"
      @get-next-offset="getNextOffset"
      @get-previous-offset="getPreviousOffset"
    />
    <div class="page-size-select">
      <span
        v-if="!disablePageJump && !offset"
        class="pagination-text-mobile"
        data-testid="visible-items"
      >
        <span class="pagination-text-pages">{{ pagesString }}</span>
        {{ pageCountString }}
      </span>

      <KDropdown
        class="page-size-dropdown"
        data-testid="page-size-dropdown"
        :disabled="pageSizeOptions.length <= 1"
        :items="pageSizeOptions"
        :kpop-attributes="kpopAttrs"
        selection-menu
        @change="updatePageSize"
      >
        <KButton
          appearance="tertiary"
          data-testid="page-size-dropdown-trigger"
          :disabled="pageSizeOptions.length <= 1"
          type="button"
        >
          {{ pageSizeText }}

          <ChevronDownIcon
            v-if="pageSizeOptions.length > 1"
            decorative
          />
        </KButton>
      </KDropdown>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { Ref, PropType } from 'vue'
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KButton from '@/components/KButton/KButton.vue'
import PaginationOffset from './PaginationOffset.vue'
import type { PageSizeChangeData, PageChangeData, DropdownItem } from '@/types'
import { BackIcon, ForwardIcon, ChevronDownIcon } from '@kong/icons'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'

const kpopAttrs = {
  placement: 'top',
}

const props = defineProps({
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
  offset: {
    type: Boolean,
    default: false,
  },
  offsetPreviousButtonDisabled: {
    type: Boolean,
    default: false,
  },
  offsetNextButtonDisabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'pageChange', val: PageChangeData): void
  (e: 'pageSizeChange', val: PageSizeChangeData): void
  (e: 'getNextOffset'): void
  (e: 'getPreviousOffset'): void
}>()

const kPaginationElement = ref<HTMLElement | null>(null)
const resizeObserver = ref<ResizeObserverHelper>()

const currPage: Ref<number> = ref(props.currentPage ? props.currentPage : 1)
const currentPageSize: Ref<number> = ref(props.initialPageSize ? props.initialPageSize : props.pageSizes[0])
const pageCount = computed((): number => Math.ceil(props.totalCount / currentPageSize.value))
const pageSizeOptions = props.pageSizes.map((size, i) => ({
  label: `${size}`,
  key: `size-${i}`,
  value: size,
  selected: size === currentPageSize.value,
}))
const pageSizeText = computed((): string => `${currentPageSize.value} ${currentPageSize.value === 1 ? 'item per page' : ' items per page'}`)
/**
 * KPagination will try to display specified number of neighbors
 * However, if it will detect overflow, it will try to reduce the number of neighbors to a minimum of 1
 */
const fittingNeighbors = ref<number>(props.neighbors)
/**
 * By default KPagination tries to display 3 items sequentially
 * However, if it will detect overflow, it will try to reduce the number of items to a minimum of 1
 */
const sequentialItemsVisible = ref<number>(3)

const hasOverflow = async (): Promise<boolean> => {
  await nextTick() // wait for the DOM to update

  if (!kPaginationElement.value) {
    return false
  }

  return kPaginationElement.value.scrollWidth > kPaginationElement.value.clientWidth
}

/**
 * Check if the pagination has overflow and reduce the number of neighbors or sequential items visible if possible
 */
const fixOverflow = async (): Promise<void> => {
  const overflowDetected = await hasOverflow()

  if (overflowDetected && (fittingNeighbors.value > 1 || sequentialItemsVisible.value > 1)) {
    if (fittingNeighbors.value > 1) {
      fittingNeighbors.value--
    } else if (sequentialItemsVisible.value > 1) {
      sequentialItemsVisible.value--
    }

    pagesVisible.value = getVisiblePages(currPage.value, pageCount.value, firstDetached.value, lastDetached.value)
  }
}

const getVisiblePages = (currPage: number, pageCount: number, firstDetached: boolean, lastDetached: boolean): number[] => {
  if (props.disablePageJump) {
    return []
  }

  let pages = [...Array(pageCount).keys()].map((n) => n + 1)
  const visiblePages = (sequentialItemsVisible.value + 2) + (2 * fittingNeighbors.value)

  // All pages fit on one screen
  if (pages.length <= visiblePages) {
    return pages
  }


  if (!firstDetached) {
    // First pages
    pages = pages.filter((n) => n <= (fittingNeighbors.value * 2) + sequentialItemsVisible.value)
  } else if (firstDetached && lastDetached) {
    // Middle pages (if they do not fit on one screen)
    pages = pages.filter(
      (n) =>
        n > currPage - fittingNeighbors.value - 1 &&
            n < currPage + fittingNeighbors.value + 1,
    )
  } else if (firstDetached && !lastDetached) {
    // Last pages
    pages = pages.filter((n) => n > pageCount - (fittingNeighbors.value * 2) - sequentialItemsVisible.value)
  }

  return pages
}

const backDisabled = ref<boolean>(currPage.value === 1)
const forwardDisabled = ref<boolean>(currPage.value === pageCount.value)

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
const firstDetached = ref<boolean>(false)
const lastDetached = ref<boolean>(pageCount.value > (sequentialItemsVisible.value + 2) + (2 * fittingNeighbors.value))
const pagesVisible = ref<Array<number>>(getVisiblePages(
  currentlySelectedPage.value,
  pageCount.value,
  false,
  lastDetached.value,
))

const pageForward = ():void => {
  currPage.value++
  updatePage()
}

const pageBack = ():void => {
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
  const visiblePages = 5 + 2 * fittingNeighbors.value
  if (pageCount.value <= visiblePages) {
    // All pages will fit in screen
    firstDetached.value = false
    lastDetached.value = false
  } else {
    firstDetached.value = currPage.value >= fittingNeighbors.value + (sequentialItemsVisible.value + 1)
    lastDetached.value = currPage.value <= pageCount.value - fittingNeighbors.value - sequentialItemsVisible.value
  }

  pagesVisible.value = getVisiblePages(currPage.value, pageCount.value, firstDetached.value, lastDetached.value)

  emit('pageChange', {
    page: currPage.value,
    pageCount: pageCount.value,
    firstItem: startCount.value,
    lastItem: endCount.value,
    visibleItems: props.items.slice(startCount.value - 1, endCount.value),
  })
}

const updatePageSize = (item: DropdownItem): void => {
  if (currentPageSize.value !== item.value) {
    currentPageSize.value = item.value as number

    emit('pageSizeChange', {
      pageSize: currentPageSize.value,
      pageCount: pageCount.value,
    })

    if (props.currentPage !== 1) {
      changePage(1)
    }
  }
}

const getNextOffset = (): void => {
  emit('getNextOffset')
}

const getPreviousOffset = (): void => {
  emit('getPreviousOffset')
}

watch(() => props.currentPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    changePage(newVal)
  }
})

// recalc if the total number of items changed (which changed pageCount)
watch(pageCount, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    forwardDisabled.value = currPage.value === newVal
    lastDetached.value = newVal > (sequentialItemsVisible.value + 2) + (2 * fittingNeighbors.value)

    pagesVisible.value = getVisiblePages(
      currentlySelectedPage.value,
      newVal,
      false,
      lastDetached.value,
    )
  }
})

watch(pagesVisible, () => {
  if (!props.disablePageJump && !props.offset) {
    fixOverflow()
  }
})

onMounted(() => {
  if (!props.disablePageJump && !props.offset) {
    resizeObserver.value = ResizeObserverHelper.create(fixOverflow)

    resizeObserver.value.observe(kPaginationElement.value as HTMLDivElement)
  }
})

onUnmounted(() => {
  if (!props.disablePageJump && !props.offset) {
    resizeObserver.value?.unobserve(kPaginationElement.value as HTMLDivElement)
  }
})
</script>

<style lang="scss" scoped>
.k-pagination {
  align-items: center;
  display: flex;
  font-family: var(--kui-font-family-text, $kui-font-family-text);
  justify-content: space-between;
  margin-top: var(--kui-space-20, $kui-space-20);
  padding: var(--kui-space-20, $kui-space-20);
  width: 100%;

  &.full {
    flex-direction: column;
    gap: var(--kui-space-50, $kui-space-50);

    @media (min-width: $kui-breakpoint-mobile) {
      flex-direction: row;
    }

    .pagination-text {
      display: none;

      @media (min-width: $kui-breakpoint-mobile) {
        display: block;
      }
    }

    .pagination-text-mobile {
      @media (min-width: $kui-breakpoint-mobile) {
        display: none;
      }
    }

    .pagination-button-container {
      width: 100%;

      @media (min-width: $kui-breakpoint-mobile) {
        width: auto;
      }

      li {
        &:first-child {
          margin-right: var(--kui-space-auto, $kui-space-auto);

          @media (min-width: $kui-breakpoint-mobile) {
            margin-right: var(--kui-space-0, $kui-space-0);
          }
        }

        &:last-child {
          margin-left: var(--kui-space-auto, $kui-space-auto);

          @media (min-width: $kui-breakpoint-mobile) {
            margin-right: var(--kui-space-0, $kui-space-0);
          }
        }
      }
    }

    .page-size-select {
      align-items: center;
      display: flex;
      gap: var(--kui-space-20, $kui-space-20);
      justify-content: space-between;
      width: 100%;

      @media (min-width: $kui-breakpoint-mobile) {
        width: auto;
      }
    }
  }

  .pagination-text,
  .pagination-text-mobile {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-30, $kui-font-size-30);
    font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    min-width: 125px; // to prevent jumping when the text changes
    white-space: nowrap;

    .pagination-text-pages {
      color: var(--kui-color-text, $kui-color-text);
    }
  }

  .pagination-button-container {
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
    list-style: none;
    margin: var(--kui-space-0, $kui-space-0);
    padding: var(--kui-space-0, $kui-space-0);
    text-align: center;

    .pagination-button {
      // styles for the arrow and page number buttons
      // since arrow uses KButton, it takes care of certain styles
      height: 32px;
      min-width: 32px;
      padding: var(--kui-space-30, $kui-space-30);

      &:not(.arrow) {
        background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
        border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-primary, $kui-color-text-primary);
        cursor: pointer;
        font-size: var(--kui-font-size-30, $kui-font-size-30);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
        line-height: var(--kui-line-height-30, $kui-line-height-30);
        transition: background-color $kongponentsTransitionDurTimingFunc border-color $kongponentsTransitionDurTimingFunc;

        &:hover:not(.placeholder),
        &:focus:not(.placeholder) {
          border-color: var(--kui-color-border-primary, $kui-color-border-primary) !important;
        }

        &:focus-visible {
          box-shadow: var(--kui-shadow-focus, $kui-shadow-focus);
        }

        &.placeholder {
          align-items: center;
          cursor: initial;
          display: flex;
          justify-content: center;
        }

        &.active {
          background-color: var(--kui-color-background-primary-weakest, $kui-color-background-primary-weakest);
          border-color: var(--kui-color-border-primary, $kui-color-border-primary);
        }
      }
    }
  }

  .page-size-select {
    .page-size-dropdown {
      margin-left: var(--kui-space-30, $kui-space-30);

      :deep(.popover-content) {
        border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        max-height: 200px;
        overflow-y: auto;
      }
    }
  }
}
</style>
