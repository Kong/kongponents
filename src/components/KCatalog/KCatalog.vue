<template>
  <div class="k-catalog">
    <component
      :is="titleTag"
      v-if="title"
      class="catalog-title"
      data-testid="catalog-title"
    >
      {{ title }}
    </component>

    <div
      v-if="hasToolbarSlot"
      class="catalog-toolbar"
      data-testid="catalog-toolbar"
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
    </div>

    <KSkeleton
      v-if="showLoading"
      :card-count="4"
      class="catalog-skeleton-loader"
      data-testid="catalog-skeleton-loader"
      type="card"
    />

    <div
      v-else-if="error"
      class="catalog-error-state"
      data-testid="catalog-error-state"
    >
      <slot name="error-state">
        <KEmptyState
          icon-variant="error"
          :message="errorStateMessage"
          :title="errorStateTitle"
        >
          <template
            v-if="!!errorStateActionMessage"
            #action
          >
            <KButton
              :data-testid="getTestIdString(errorStateActionMessage)"
              :to="errorStateActionRoute ? errorStateActionRoute : undefined"
              @click="emit('error-action-click')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="showEmptyState"
      class="catalog-empty-state"
      data-testid="catalog-empty-state"
    >
      <slot name="empty-state">
        <KEmptyState
          :icon-variant="emptyStateIconVariant"
          :message="emptyStateMessage"
          :title="emptyStateTitle"
        >
          <template
            v-if="!!emptyStateActionMessage"
            #action
          >
            <KButton
              :appearance="searchInput ? 'tertiary' : 'primary'"
              :data-testid="getTestIdString(emptyStateActionMessage)"
              :to="emptyStateActionRoute ? emptyStateActionRoute : undefined"
              @click="emit('empty-state-action-click')"
            >
              <slot name="empty-state-action-icon" />
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else
      class="catalog-page"
      :class="`card-${cardSize}`"
      :data-tableid="catalogId"
    >
      <slot
        :data="data"
        name="body"
      >
        <KCatalogItem
          v-for="(item, idx) in data"
          :key="item.key ? item.key : `catalog-${catalogId}-item-${idx}`"
          class="catalog-item"
          :data-testid="item.id ? item.id : `catalog-item-${idx}`"
          :item="item"
          :truncate="truncateDescription"
          @click="emit('card-click', item)"
        >
          <template #card-title>
            <slot
              :item="item"
              name="card-title"
            >
              {{ item.title }}
            </slot>
          </template>

          <template #card-actions>
            <slot
              :item="item"
              name="card-actions"
            />
          </template>

          <template #card-body>
            <slot
              :item="item"
              name="card-body"
            >
              {{ item.description }}
            </slot>
          </template>
        </KCatalogItem>
      </slot>
    </div>

    <KPagination
      v-if="showPagination"
      class="card-pagination"
      :current-page="page"
      data-testid="catalog-pagination"
      :disable-page-jump="disablePaginationPageJump"
      :initial-page-size="pageSize"
      :neighbors="paginationNeighbors"
      :offset="paginationOffset"
      :offset-next-button-disabled="!nextOffset || !hasNextPage"
      :offset-previous-button-disabled="!previousOffset"
      :page-sizes="paginationPageSizes"
      :total-count="total"
      @get-next-offset="getNextOffsetHandler"
      @get-previous-offset="getPrevOffsetHandler"
      @page-change="pageChangeHandler"
      @page-size-change="pageSizeChangeHandler"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends CatalogItem[] | readonly CatalogItem[]">
import { ref, computed, onMounted, watch, useId, type Ref } from 'vue'
import type {
  CatalogPreferences,
  SwrvStateData,
  CatalogState,
  PageChangeData,
  PageSizeChangeData,
  CatalogProps,
  CatalogEmits,
  CatalogSlots,
  CatalogItem,
} from '@/types'
import useUtilities from '@/composables/useUtilities'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KButton from '@/components/KButton/KButton.vue'
import KPagination from '@/components/KPagination/KPagination.vue'
import KCatalogItem from './KCatalogItem.vue'

const { useRequest, useDebounce, useSwrvState } = useUtilities()
const DEFAULT_PAGE_SIZE = 15

const {
  titleTag = 'div',
  loading,
  cardSize = 'medium',
  title = '',
  truncateDescription = true,
  emptyStateTitle = 'No Data',
  emptyStateMessage = 'There is no data to display.',
  emptyStateActionRoute = '',
  emptyStateActionMessage = '',
  emptyStateIconVariant = 'default',
  error,
  errorStateTitle = 'An error occurred',
  errorStateMessage = 'Data cannot be displayed due to an error.',
  errorStateActionRoute = '',
  errorStateActionMessage = '',
  fetcher,
  initialFetcherParams = null,
  cacheIdentifier = '',
  fetcherCacheKey = '',
  searchInput = '',
  paginationNeighbors = 1,
  paginationPageSizes = [15, 30, 50, 75, 100],
  paginationTotalItems = null,
  disablePaginationPageJump,
  disablePagination,
  hidePaginationWhenOptional,
  paginationOffset,
} = defineProps<CatalogProps<T>>()
const emit = defineEmits<CatalogEmits<T>>()
const slots = defineSlots<CatalogSlots<T>>()

const catalogId = useId()

const getInitialPageSize = (): number => {
  const initialPageSize = paginationPageSizes?.[0]

  if (initialPageSize) {
    return initialPageSize
  }

  return DEFAULT_PAGE_SIZE
}

// Cannot use `const data = ref<T[]>([])` as the items will be inferred incorrectly inside the template.
const data = ref([] as unknown as T) as Ref<T>
const total = ref<number>(0)
const filterQuery = ref<string>('')
const page = ref<number>(1)
const pageSize = ref<number>(getInitialPageSize())
const offset = ref<string | null>(null)
const offsets = ref<any[]>([])
const previousOffset = computed((): string | null => offsets.value[page.value - 1])
const nextOffset = ref<string | null>(null)
const hasNextPage = ref<boolean>(true)
const hasInitialized = ref<boolean>(false)
const hasToolbarSlot = computed((): boolean => !!slots.toolbar)

const defaultFetcherProps = {
  page: 1,
  pageSize: pageSize.value,
  query: '',
  offset: null,
}

// show loading if fetching, loading prop is `true` or if revalidating (swrv state)
const showLoading = computed((): boolean => (isCatalogLoading.value || loading || isRevalidating.value) && !error)
// show empty state if not loading and no data
const showEmptyState = computed((): boolean => !showLoading.value && data.value && !data.value.length)

// Store the catalogPreferences in a computed property to utilize in the watcher
const catalogPreferences = computed((): CatalogPreferences => ({
  pageSize: pageSize.value,
}))

const isInitialFetch = ref(true)
const fetchData = async () => {
  const res = await fetcher({
    query: searchInput || filterQuery.value,
    pageSize: pageSize.value,
    page: page.value,
    offset: offset.value,
  })

  if (res == null) {
    throw new Error('KCatalog: Fetcher did not return data correctly.')
  }

  data.value = res.data
  total.value = paginationTotalItems || res.total || res.data?.length

  if (paginationOffset) {
    if (!res.pagination?.offset) {
      nextOffset.value = null
    } else {
      nextOffset.value = res.pagination.offset

      if (!offsets.value[page.value]) {
        offsets.value.push(res.pagination.offset)
      }
    }

    hasNextPage.value = (res.pagination && 'hasNextPage' in res.pagination) ? !!res.pagination.hasNextPage : true
  }

  // if the data is empty and the page is greater than 1,
  // e.g. user deletes the last item on the last page,
  // reset the page to 1
  if (data.value.length === 0 && page.value > 1) {
    page.value = 1
    offsets.value = [null]
    offset.value = null
  }

  isInitialFetch.value = false

  return res
}

const initData = () => {
  // set up fetcher props
  const fetcherParams = {
    ...defaultFetcherProps,
    ...initialFetcherParams,
  }

  // don't allow overriding default settings with `undefined` values
  page.value = fetcherParams.page ?? defaultFetcherProps.page
  pageSize.value = fetcherParams.pageSize ?? defaultFetcherProps.pageSize
  filterQuery.value = fetcherParams.query ?? defaultFetcherProps.query

  if (paginationOffset) {
    offset.value = fetcherParams.offset
    offsets.value.push(fetcherParams.offset)
  }

  // trigger setting of catalogFetcherCacheKey
  hasInitialized.value = true
}

// once `initData()` finishes, setting catalogFetcherCacheKey to non-falsey value triggers fetch of data
const catalogFetcherCacheKey = computed((): string => {
  if (!fetcher || !hasInitialized.value) {
    return ''
  }

  // Set the default identifier to a random string
  let identifierKey: string = catalogId
  if (cacheIdentifier) {
    identifierKey = cacheIdentifier
  }

  if (fetcherCacheKey) {
    identifierKey += `-${fetcherCacheKey}`
  }

  return `k-catalog_${identifierKey}`
})

const query = ref('')
const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => {
  query.value = q
}, 350)
const search = generateDebouncedSearch(0) // generate a debounced function with zero delay (immediate)

// ALL fetching is done through this useRequest / revalidate
// don't fire until catalog FetcherCacheKey is set
const { data: fetcherData, error: fetcherError, revalidate, isValidating: fetcherIsValidating } = useRequest(
  () => catalogFetcherCacheKey.value,
  () => fetchData(),
  { revalidateOnFocus: false, revalidateDebounce: 0 },
)

const { state, hasData, swrvState } = useSwrvState(fetcherData, fetcherError, fetcherIsValidating)
const isCatalogLoading = ref<boolean>(true)
const stateData = computed((): SwrvStateData => ({
  hasData: hasData.value,
  state: state.value,
}))
const catalogState = computed((): CatalogState => isCatalogLoading.value ? 'loading' : fetcherError.value ? 'error' : 'success')

const pageChangeHandler = ({ page: newPage }: PageChangeData): void => {
  page.value = newPage
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangeData): void => {
  offsets.value = [null]
  offset.value = null
  pageSize.value = newPageSize
  page.value = 1
}

const getNextOffsetHandler = (): void => {
  page.value++
  offset.value = nextOffset.value
}

const getPrevOffsetHandler = (): void => {
  page.value--
  offset.value = previousOffset.value
}

const getTestIdString = (message: string): string => {
  return message.toLowerCase().replace(/[^[a-z0-9]/gi, '-')
}

const showPagination = computed((): boolean => {
  // if fetcher is not defined or disablePagination is true, don't show pagination
  if (!fetcher || disablePagination || !data.value || !data.value.length || error) {
    return false
  }

  const minPageSize = paginationPageSizes?.[0] ?? DEFAULT_PAGE_SIZE

  // this logic is built around min page size so that pagination doesn't disappear when a higher value is selected and hidePaginationWhenOptional is true
  if (hidePaginationWhenOptional && page.value === 1) {
    if (!paginationOffset) {
      // if using cursor-based pagination, hide pagination when number of items is less than min page size
      return total.value > minPageSize
    } else {
      // if using offset-based pagination, hide pagination when neither previous nor next offset is available and total items is less than min page size
      return !!previousOffset.value || !!nextOffset.value || data.value.length >= minPageSize
    }
  }

  return true
})

watch(fetcherData, (fetchedData: any) => {
  if (fetchedData?.length && !data.value.length) {
    data.value = fetchedData
  }
}, { deep: true, immediate: true })

// we want to tie loader to 'pending' since 'validating' is triggered even when pulling from cache, which should result in no loader
// however, if this is a manual revalidation (triggered by page change, query, etc), display loader when validating
watch(state, () => {
  switch (state.value) {
    case swrvState.PENDING:
      isCatalogLoading.value = true
      break
    case swrvState.VALIDATING_HAS_DATA:
      isCatalogLoading.value = isRevalidating.value
      break
    default:
      isCatalogLoading.value = false
      break
  }
}, { immediate: true })

watch([stateData, catalogState], (newData) => {
  emit('state', {
    state: newData?.[1], // newData[catalogState]
    hasData: newData?.[0]?.hasData, // newData[stateData].hasData
  })
})

watch(() => searchInput, (newValue: string) => {
  if (page.value !== 1) {
    page.value = 1
  }

  if (newValue === '') {
    search(newValue)
  } else {
    debouncedSearch(newValue)
  }
}, { immediate: true })

const isRevalidating = ref<boolean>(false)
watch([query, page, pageSize], async (newData, oldData) => {
  const oldQuery = oldData?.[0]
  const newQuery = newData[0]
  const newPage = newData[1]

  if (newQuery !== oldQuery && newPage !== 1) {
    page.value = 1
    offsets.value = [null]
    offset.value = null
  }

  // don't revalidate until we have finished initializing and made initial fetch
  if (hasInitialized.value && !isInitialFetch.value) {
    isRevalidating.value = true

    await revalidate()

    isRevalidating.value = false
  }
}, { deep: true, immediate: true })

// Emit an event whenever the catalogPreferences are updated
watch(catalogPreferences, (catalogPrefs: CatalogPreferences) => {
  emit('update:catalog-preferences', catalogPrefs)
})

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.k-catalog {
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-70, $kui-space-70);

  .catalog-title {
    font-family: var(--kui-font-family-text, $kui-font-family-text);
    font-size: var(--kui-font-size-60, $kui-font-size-60);
    font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
    line-height: var(--kui-line-height-50, $kui-line-height-50);
  }

  .catalog-toolbar {
    display: flex;
    gap: var(--kui-space-40, $kui-space-40);
  }

  .catalog-page {
    display: grid;
    grid-gap: var(--kui-space-70, $kui-space-70);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

    &.card-small {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    &.card-large {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
}
</style>
