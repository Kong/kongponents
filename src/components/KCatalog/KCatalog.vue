<template>
  <div class="k-card-catalog">
    <div
      v-if="title"
      class="k-card-catalog-title"
      data-testid="k-catalog-title"
    >
      <h3>{{ title }}</h3>
    </div>

    <div
      v-if="hasToolbarSlot"
      class="k-catalog-toolbar"
      data-testid="k-catalog-toolbar"
    >
      <slot
        name="toolbar"
        :state="stateData"
      />
    </div>

    <KSkeleton
      v-if="(!testMode || testMode === 'loading') && (isCatalogLoading || isLoading || isRevalidating) && !hasError"
      :card-count="4"
      class="k-skeleton-grid"
      data-testid="k-catalog-skeleton"
      type="card"
    >
      <template #card-header>
        <KSkeletonBox
          class="k-catalog-skeleton-header"
          width="6"
        />
      </template>

      <template #card-content>
        <KSkeletonBox width="75" />
      </template>

      <template #card-footer>
        <div class="k-catalog-skeleton-footer-container">
          <KSkeletonBox
            width="2"
          />
          <KSkeletonBox width="5" />
        </div>
      </template>
    </KSkeleton>

    <div
      v-else-if="hasError"
      class="k-catalog-error-state"
      data-testid="k-card-catalog-error-state"
    >
      <slot name="error-state">
        <KEmptyState
          :cta-is-hidden="!errorStateActionMessage || !errorStateActionRoute"
          :icon="errorStateIcon || ''"
          :icon-color="errorStateIconColor"
          :icon-size="errorStateIconSize"
          is-error
        >
          <template #title>
            {{ errorStateTitle }}
          </template>

          <template #message>
            {{ errorStateMessage }}
          </template>

          <template #cta>
            <KButton
              v-if="errorStateActionMessage"
              appearance="primary"
              :data-testid="getTestIdString(errorStateActionMessage)"
              :to="errorStateActionRoute ? errorStateActionRoute : undefined"
              @click="$emit('kcatalog-error-cta-clicked')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!hasError && (!isCatalogLoading && !isLoading && !isRevalidating) && (data && !data.length)"
      class="k-catalog-empty-state"
      data-testid="k-card-catalog-empty-state"
    >
      <slot name="empty-state">
        <KEmptyState
          :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
          :icon="emptyStateIcon || ''"
          :icon-color="emptyStateIconColor"
          :icon-size="emptyStateIconSize"
        >
          <template #title>
            {{ emptyStateTitle }}
          </template>

          <template #message>
            {{ emptyStateMessage }}
          </template>

          <template #cta>
            <KButton
              v-if="emptyStateActionMessage"
              :appearance="searchInput ? 'btn-link' : 'primary'"
              :data-testid="getTestIdString(emptyStateActionMessage)"
              :icon="emptyStateActionButtonIcon"
              :to="emptyStateActionRoute ? emptyStateActionRoute : undefined"
              @click="$emit('kcatalog-empty-state-cta-clicked')"
            >
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else
      class="k-catalog-page"
      :class="`k-card-${cardSize}`"
      :data-tableid="catalogId"
    >
      <slot
        :data="data"
        name="body"
      >
        <KCatalogItem
          v-for="(item, idx) in data"
          :key="item.key ? item.key : `k-catalog-item-${idx}`"
          class="catalog-item"
          :data-testid="item.id ? item.id : `k-catalog-item-${idx}`"
          :item="(item as CatalogItem)"
          :test-mode="!!testMode || undefined"
          :truncate="!noTruncation"
          @click="$emit('card:click', item)"
        >
          <template #cardTitle>
            <slot
              :item="item"
              name="cardTitle"
            >
              {{ item.title }}
            </slot>
          </template>

          <template #cardActions>
            <slot
              :item="item"
              name="cardActions"
            />
          </template>

          <template #cardBody>
            <slot
              :item="item"
              name="cardBody"
            >
              {{ item.description }}
            </slot>
          </template>
        </KCatalogItem>
      </slot>

      <div
        v-if="!disablePagination && fetcher && !(hidePaginationWhenOptional && total <= paginationPageSizes[0])"
        class="card-pagination"
        data-testid="k-catalog-pagination"
      >
        <KPagination
          class="k-catalog-pagination"
          :current-page="page"
          :disable-page-jump="disablePaginationPageJump"
          :initial-page-size="pageSize"
          :neighbors="paginationNeighbors"
          :page-sizes="paginationPageSizes"
          :test-mode="!!testMode || undefined"
          :total-count="total"
          @page-changed="pageChangeHandler"
          @page-size-changed="pageSizeChangeHandler"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, computed, onMounted, watch, useSlots } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type {
  CatalogItem,
  CatalogPreferences,
  SwrvState,
  SwrvStateData,
  CardSize,
  CatalogState,
  PageChangedData,
  PageSizeChangedData,
} from '@/types'
import {
  CardSizeArray,
} from '@/types'
import useUtilities from '@/composables/useUtilities'
import KSkeleton from '@/components/KSkeleton/KSkeleton.vue'
import KSkeletonBox from '@/components/KSkeleton/KSkeletonBox.vue'
import KEmptyState from '@/components/KEmptyState/KEmptyState.vue'
import KButton from '@/components/KButton/KButton.vue'
import KPagination from '@/components/KPagination/KPagination.vue'
import KCatalogItem from './KCatalogItem.vue'

const { useRequest, useDebounce, useSwrvState } = useUtilities()

const props = defineProps({
  /**
   * A prop to pass in to display skeleton to indicate loading
   */
  isLoading: {
    type: Boolean,
    default: false,
  },
  cardSize: {
    type: String as PropType<CardSize>,
    default: 'medium',
    validator: (value: CardSize): boolean => CardSizeArray.includes(value),
  },
  /**
   * Card catalog title
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * Disable truncation of the KCard's 'description'
   */
  noTruncation: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass in a custom empty state title
   */
  emptyStateTitle: {
    type: String,
    default: 'No Data',
  },
  /**
   * A prop to pass in a custom empty state message
   */
  emptyStateMessage: {
    type: String,
    default: 'There is no data to display.',
  },
  /**
   * A prop to pass in a custom empty state action route
   */
  emptyStateActionRoute: {
    type: [Object, String],
    default: '',
  },
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionMessage: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom empty state action message
   */
  emptyStateActionButtonIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom empty state icon
   */
  emptyStateIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a color for the empty state icon
   */
  emptyStateIconColor: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a size for the empty state icon
   */
  emptyStateIconSize: {
    type: String,
    default: '50',
  },
  /**
   * A prop that enables the error state
   */
  hasError: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass in a custom error state title
   */
  errorStateTitle: {
    type: String,
    default: 'An error occurred',
  },
  /**
   * A prop to pass in a custom error state message
   */
  errorStateMessage: {
    type: String,
    default: 'Data cannot be displayed due to an error.',
  },
  /**
   * A prop to pass in a custom error state action route
   */
  errorStateActionRoute: {
    type: [Object, String],
    default: '',
  },
  /**
   * A prop to pass in a custom error state action message
   */
  errorStateActionMessage: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a custom error state icon
   */
  errorStateIcon: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a color for the error state icon
   */
  errorStateIconColor: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a size for the error state icon
   */
  errorStateIconSize: {
    type: String,
    default: '50',
  },
  /**
   * A prop to pass in a fetcher function to enable server-side pagination
   */
  fetcher: {
    type: Function,
    required: true,
  },
  /**
   * A prop to pass in a an object of intial params for the initial fetcher function call
   */
  initialFetcherParams: {
    type: Object,
    default: null,
  },
  /**
   * A prop used to uniquely identify this catalog in the swrv cache
   */
  cacheIdentifier: {
    type: String,
    default: '',
  },
  /**
   * A prop to trigger a revalidate of the fetcher function. Modifying this value
   * will trigger a manual refetch of the table data.
   */
  fetcherCacheKey: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a search string for server-side search
   */
  searchInput: {
    type: String,
    default: '',
  },
  /**
   * A prop to pass in a the number of pagination neighbors used by the pagination component
   */
  paginationNeighbors: {
    type: Number,
    default: 1,
  },
  /**
   * A prop to pass in an array of page sizes used by the pagination component
   */
  paginationPageSizes: {
    type: Array as PropType<number[]>,
    default: () => ([15, 30, 50, 75, 100]),
    validator: (pageSizes: number[]): boolean => !!pageSizes.length && pageSizes.every(i => typeof i === 'number'),
  },
  /**
   * A prop to pass the total number of items in the set for the pagination text
   */
  paginationTotalItems: {
    type: Number,
    default: null,
  },
  disablePaginationPageJump: {
    type: Boolean,
    default: false,
  },
  disablePagination: {
    type: Boolean,
    default: false,
  },
  /**
   * A prop to pass to hide pagination for total table records is less than or equal to pagesize
   */
  hidePaginationWhenOptional: {
    type: Boolean,
    default: false,
  },
  /**
   * for testing only, strips out generated ids and avoid loading state in tests.
   * 'true' - no id's no loading
   * 'loading' - no id's but allow loading
   */
  testMode: {
    type: [String, Boolean],
    default: false,
  },
})

const emit = defineEmits<{
  (e: 'card:click', item: CatalogItem): void
  (e: 'kcatalog-error-cta-clicked'): void
  (e: 'kcatalog-empty-state-cta-clicked'): void
  (e: 'update:catalog-preferences', preferences: CatalogPreferences): void
  (e: 'state', value: { state: CatalogState, hasData: boolean }): void
}>()

const slots = useSlots()

const catalogId = computed((): string => props.testMode ? 'test-catalog-id-1234' : uuidv4())
const defaultFetcherProps = {
  page: 1,
  pageSize: 15,
  query: '',
}

const data = ref<CatalogItem[]>([])
const total = ref<number>(0)
const filterQuery = ref<string>('')
const page = ref<number>(1)
const pageSize = ref<number>(15)
const hasInitialized = ref<boolean>(false)
const hasToolbarSlot = computed((): boolean => !!slots.toolbar)

// Store the catalogPreferences in a computed property to utilize in the watcher
const catalogPreferences = computed((): CatalogPreferences => ({
  pageSize: pageSize.value,
}))

const isInitialFetch = ref(true)
const fetchData = async () => {
  const searchInput = props.searchInput
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const res = await props.fetcher({
    query: searchInput || filterQuery.value,
    pageSize: pageSize.value,
    page: page.value,
  })

  data.value = res.data as CatalogItem[]
  total.value = props.paginationTotalItems || res.total || res.data?.length

  isInitialFetch.value = false

  return res
}

const initData = () => {
  // set up fetcher props
  const fetcherParams = {
    ...defaultFetcherProps,
    ...props.initialFetcherParams,
  }

  // don't allow overriding default settings with `undefined` values
  page.value = fetcherParams.page ?? defaultFetcherProps.page
  pageSize.value = fetcherParams.pageSize ?? defaultFetcherProps.pageSize
  filterQuery.value = fetcherParams.query ?? defaultFetcherProps.query

  // trigger setting of catalogFetcherCacheKey
  hasInitialized.value = true
}

// once `initData()` finishes, setting catalogFetcherCacheKey to non-falsey value triggers fetch of data
const catalogFetcherCacheKey = computed((): string => {
  if (!props.fetcher || !hasInitialized.value) {
    return ''
  }

  // Set the default identifier to a random string
  let identifierKey: string = catalogId.value
  if (props.cacheIdentifier) {
    identifierKey = props.cacheIdentifier
  }

  if (props.fetcherCacheKey) {
    identifierKey += `-${props.fetcherCacheKey}`
  }

  return `k-catalog_${identifierKey}`
})

const query = ref('')
const { debouncedFn: debouncedSearch, generateDebouncedFn: generateDebouncedSearch } = useDebounce((q: string) => { query.value = q }, 350)
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
  state: state.value as SwrvState,
}))
const catalogState = computed((): CatalogState => isCatalogLoading.value ? 'loading' : fetcherError.value ? 'error' : 'success')

const pageChangeHandler = ({ page: newPage }: PageChangedData): void => {
  page.value = newPage
}

const pageSizeChangeHandler = ({ pageSize: newPageSize }: PageSizeChangedData): void => {
  pageSize.value = newPageSize
  page.value = 1
}

const getTestIdString = (message: string): string => {
  return message.toLowerCase().replace(/[^[a-z0-9]/gi, '-')
}

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

watch(() => props.searchInput, (newValue: string) => {
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
.k-card-catalog {
  .k-card-catalog-title {
    color: var(--kui-color-text-neutral-stronger, $kui-color-text-neutral-stronger);
  }

  .k-catalog-page {
    display: grid;
    grid-gap: var(--kui-space-80, $kui-space-80);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

.k-catalog-toolbar {
  margin-bottom: var(--kui-space-80, $kui-space-80) !important;

  & > :deep(*) {
    display: flex;
  }
}
</style>

<style lang="scss">

.k-card-catalog {
  $cardHeight: 181px;

  .k-skeleton-grid {
    .skeleton-card {
      height: $cardHeight;

      .k-catalog-skeleton-header {
        justify-content: center !important;
        margin-bottom: var(--kui-space-50, $kui-space-50) !important;
        width: 100% !important;
      }

      .k-catalog-skeleton-footer-container {
        > :not(:last-child) {
          margin-right: var(--kui-space-40, $kui-space-40) !important;
        }
      }
    }
  }

  .k-catalog-page {
    &.k-card-small {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    &.k-card-large {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }

    a.catalog-item, a.catalog-item:focus, a.catalog-item:hover {
      text-decoration: none;
    }
  }

  .card-pagination {
    grid-column: 1 / -1;
  }

  .k-catalog-pagination {
    padding: var(--kui-space-20, $kui-space-20) !important;
  }
}
</style>
