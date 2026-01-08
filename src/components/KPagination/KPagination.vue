<template>
  <nav
    ref="kPaginationElement"
    class="k-pagination"
    :class="{ 'page-jump': !disablePageJump && !offset }"
    data-testid="k-pagination"
  >
    <template v-if="!offset">
      <span
        class="pagination-text large-screen"
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
            icon
            size="small"
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
            :aria-label="`Go to page ${page}`"
            class="pagination-button"
            :class="{ active: page == currentlySelectedPage }"
            :data-testid="`page-${page}-button`"
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
            icon
            size="small"
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
        class="pagination-text small-screen"
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
          class="page-size-dropdown-trigger"
          data-testid="page-size-dropdown-trigger"
          :disabled="pageSizeOptions.length <= 1"
          size="small"
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

<script setup lang="ts" generic="T">
import { ref, computed, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import KDropdown from '@/components/KDropdown/KDropdown.vue'
import KButton from '@/components/KButton/KButton.vue'
import PaginationOffset from './PaginationOffset.vue'
import type { DropdownItem, PopoverAttributes, PaginationProps, PaginationEmits } from '@/types'
import { BackIcon, ForwardIcon, ChevronDownIcon } from '@kong/icons'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'
import { DEFAULT_PAGE_SIZE } from '@/utilities/tableHelpers'

const kpopAttrs = {
  placement: 'top',
} satisfies PopoverAttributes

const {
  items = [],
  totalCount = 0,
  pageSizes = [15, 30, 50, 75, 100],
  initialPageSize = null,
  neighbors = 1,
  currentPage = null,
  disablePageJump,
  offset,
  offsetPreviousButtonDisabled,
  offsetNextButtonDisabled,
} = defineProps<PaginationProps<T>>()

const emit = defineEmits<PaginationEmits<T>>()

const kPaginationElement = ref<HTMLElement | null>(null)
const resizeObserver = ref<ResizeObserverHelper>()

const currPage = ref<number>(currentPage ? currentPage : 1)
const currentPageSize = ref<number>(initialPageSize ? initialPageSize : pageSizes[0] ?? DEFAULT_PAGE_SIZE)
const pageCount = computed((): number => Math.ceil(totalCount / currentPageSize.value))
const pageSizeOptions = pageSizes.map((size, i) => ({
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
const fittingNeighbors = ref<number>(neighbors)
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

  // if overflow detected and we can reduce the number of neighbors or sequential items visible
  if (overflowDetected && (fittingNeighbors.value > 1 || sequentialItemsVisible.value > 1)) {
    // first reduce the number of neighbors till we reach the minimum
    if (fittingNeighbors.value > 1) {
      fittingNeighbors.value--
    } else if (sequentialItemsVisible.value > 1) {
      // if we still have overflow, reduce the number of sequential items visible till we reach the minimum
      sequentialItemsVisible.value--
    }

    pagesVisible.value = getVisiblePages(currPage.value, pageCount.value, firstDetached.value, lastDetached.value)
  }
}

const getVisiblePages = (currPage: number, pageCount: number, firstDetached: boolean, lastDetached: boolean): number[] => {
  if (disablePageJump) {
    return []
  }

  let pages = [...Array(pageCount).keys()].map((n) => n + 1)
  // KPagination will attempt to display at least five sequential items (e.g. [1, 2, 3, 4, 5, ..., 10])
  // However if there is not enough space, it will reduce the number of sequential items visible to a minimum of 3
  // and display fitting number of neighbors (e.g. [1, 2, 3, ..., 10])
  // going even lower than 3 sequential items visible is not recommended as it might make the pagination hard to navigate
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
  return calculatedEndCount > totalCount
    ? totalCount
    : calculatedEndCount
})
const pagesString = computed((): string => `${startCount.value} to ${endCount.value}`)
const pageCountString = computed((): string => ` of ${totalCount}`)
const currentlySelectedPage = computed((): number => currentPage ? currentPage : currPage.value)

// Selected page, first page, last page, 2 placeholders and 2 * neighbors
const visiblePages = computed((): number => 5 + 2 * fittingNeighbors.value)
const firstDetached = ref<boolean>(currentlySelectedPage.value >= fittingNeighbors.value + (sequentialItemsVisible.value + 1) && pageCount.value > visiblePages.value)
const lastDetached = ref<boolean>(pageCount.value > (sequentialItemsVisible.value + 2) + (2 * fittingNeighbors.value))
const pagesVisible = ref<number[]>(getVisiblePages(
  currentlySelectedPage.value,
  pageCount.value,
  firstDetached.value,
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

const changePage = (page: number): void => {
  currPage.value = page
  updatePage()
}

const updatePage = (): void => {
  const lastEntry = (currPage.value - 1) * currentPageSize.value + currentPageSize.value
  forwardDisabled.value = lastEntry >= totalCount
  backDisabled.value = currPage.value === 1
  // The view will hold
  if (pageCount.value <= visiblePages.value) {
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
    visibleItems: items.slice(startCount.value - 1, endCount.value),
  })
}

const updatePageSize = (item: DropdownItem): void => {
  if (currentPageSize.value !== item.value) {
    currentPageSize.value = item.value as number

    emit('pageSizeChange', {
      pageSize: currentPageSize.value,
      pageCount: pageCount.value,
    })

    if (currentPage !== 1) {
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

watch(() => currentPage, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal) {
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
  if (!disablePageJump && !offset) {
    fixOverflow()
  }
})

onMounted(() => {
  if (!disablePageJump && !offset) {
    resizeObserver.value = ResizeObserverHelper.create(fixOverflow)

    resizeObserver.value.observe(kPaginationElement.value as HTMLDivElement)
  }
})

onBeforeUnmount(() => {
  if (!disablePageJump && !offset) {
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
  padding: var(--kui-space-20, $kui-space-20) var(--kui-space-0, $kui-space-0);
  width: 100%;

  &.page-jump {
    flex-direction: column;
    gap: var(--kui-space-50, $kui-space-50);

    @media (min-width: $kui-breakpoint-mobile) {
      flex-direction: row;
    }

    .pagination-button-container {
      width: calc(100% - 8px); // 8px is so that box-shadow doesn't get cut off in focus-visible

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

  .pagination-text {
    color: var(--kui-color-text-neutral, $kui-color-text-neutral);
    font-size: var(--kui-font-size-20, $kui-font-size-20);
    font-weight: var(--kui-font-weight-medium, $kui-font-weight-medium);
    line-height: var(--kui-line-height-20, $kui-line-height-20);
    min-width: 125px; // to prevent jumping when the text changes
    white-space: nowrap;

    @media (min-width: $kui-breakpoint-mobile) {
      font-size: var(--kui-font-size-30, $kui-font-size-30);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
    }

    .pagination-text-pages {
      color: var(--kui-color-text, $kui-color-text);
    }

    &.small-screen {
      display: block;

      @media (min-width: $kui-breakpoint-mobile) {
        display: none;
      }
    }

    &.large-screen {
      display: none;

      @media (min-width: $kui-breakpoint-mobile) {
        display: block;
      }
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
      height: 28px;
      min-width: 28px;

      @media (min-width: $kui-breakpoint-mobile) {
        height: 32px;
        min-width: 32px;
      }

      &:not(.arrow) {
        background-color: var(--kui-color-background-transparent, $kui-color-background-transparent);
        border: var(--kui-border-width-10, $kui-border-width-10) solid var(--kui-color-border, $kui-color-border);
        border-radius: var(--kui-border-radius-20, $kui-border-radius-20);
        color: var(--kui-color-text-primary, $kui-color-text-primary);
        cursor: pointer;
        font-size: var(--kui-font-size-20, $kui-font-size-20);
        font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
        line-height: var(--kui-line-height-20, $kui-line-height-20);
        transition: background-color $kongponentsTransitionDurTimingFunc border-color $kongponentsTransitionDurTimingFunc;

        @media (min-width: $kui-breakpoint-mobile) {
          font-size: var(--kui-font-size-30, $kui-font-size-30);
          line-height: var(--kui-line-height-30, $kui-line-height-30);
          padding: var(--kui-space-30, $kui-space-30);
        }

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

      &.arrow {
        @media (min-width: $kui-breakpoint-mobile) {
          // apply KButton medium size styles on screen larger than mobile
          @include kButtonMediumSize;
        }
      }
    }
  }

  .page-size-select {
    .page-size-dropdown {
      margin-left: var(--kui-space-30, $kui-space-30);
      margin-right: var(--kui-space-20, $kui-space-20); // need little spacing on the right so that box-shadow doesn't get cut off in focus-visible

      :deep(.popover-content) {
        border-bottom-left-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        border-bottom-right-radius: var(--kui-border-radius-30, $kui-border-radius-30);
        max-height: 200px;
        overflow-y: auto;
      }

      .page-size-dropdown-trigger {
        @media (min-width: $kui-breakpoint-mobile) {
          // apply KButton medium size styles on screen larger than mobile
          @include kButtonMediumSize;
        }
      }
    }
  }
}
</style>
