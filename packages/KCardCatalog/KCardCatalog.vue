<template>
  <div class="k-card-catalog">
    <div
      v-if="title"
      class="k-card-catalog-title">
      <h3>{{ title }}</h3>
    </div>
    <KSkeleton
      v-if="!testMode && !$scopedSlots.body && (isCardLoading || isLoading) && !hasError"
      :card-count="4"
      class="k-skeleton-grid"
      type="card"
    >
      <template slot="card-header">
        <KSkeletonBox
          class="w-100 justify-content-center mb-3"
          width="6"
        />
      </template>
      <template slot="card-content">
        <KSkeletonBox width="75" />
      </template>
      <template slot="card-footer">
        <div class="d-flex justify-content-start">
          <KSkeletonBox
            width="2"
            class="mr-2"
          />
          <KSkeletonBox width="5" />
        </div>
      </template>
    </KSkeleton>

    <div
      v-else-if="hasError"
      data-testid="k-card-catalog-error-state">
      <slot name="error-state">
        <KEmptyState
          :cta-is-hidden="!errorStateActionMessage || !errorStateActionRoute"
          :icon="errorStateIcon || ''"
          :is-error="true"
          :icon-color="errorStateIconColor"
          :icon-size="errorStateIconSize"
        >
          <template v-slot:title>{{ errorStateTitle }}</template>
          <template v-slot:message>{{ errorStateMessage }}</template>
          <template v-slot:cta>
            <KButton
              v-if="errorStateActionMessage"
              :to="errorStateActionRoute ? errorStateActionRoute : null"
              appearance="primary"
              @click="$emit('kcardcatalog-error-cta-clicked')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!$scopedSlots.body && !hasError && (!isCardLoading && !isLoading) && (data && !data.length)"
      data-testid="k-card-catalog-empty-state">
      <slot name="empty-state">
        <KEmptyState
          :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
          :icon="emptyStateIcon || ''"
          :icon-color="emptyStateIconColor"
          :icon-size="emptyStateIconSize"
        >
          <template v-slot:title>{{ emptyStateTitle }}</template>
          <template v-slot:message>{{ emptyStateMessage }}</template>
          <template v-slot:cta>
            <KButton
              v-if="emptyStateActionMessage"
              :to="emptyStateActionRoute ? emptyStateActionRoute : null"
              appearance="primary"
              @click="$emit('kcardcatalog-empty-state-cta-clicked')"
            >
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else
      :class="`k-card-${cardSize}`"
      class="k-catalog-page">
      <slot name="body">
        <template v-for="item in data">
          <router-link
            v-if="item.locationParam"
            :key="item.key ? item.key : null">
            <KCatalogItem
              :item="item"
              :location-param="item.locationParam"
              :truncate="!noTruncation"
              :test-mode="testMode"
              class="catalog-item"
            />
          </router-link>
          <KCatalogItem
            v-else
            :key="item.key ? item.key : null"
            :item="item"
            :truncate="!noTruncation"
            :test-mode="testMode"
            class="catalog-item"
          />
        </template>
      </slot>
      <div
        v-if="!disablePagination && fetcher"
        class="card-pagination">
        <KPagination
          :total-count="total"
          :current-page="page"
          :neighbors="paginationNeighbors"
          :page-sizes="paginationPageSizes"
          :disable-page-jump="disablePaginationPageJump"
          class="pa-1"
          @pageChanged="pageChangeHandler"
          @pageSizeChanged="pageSizeChangeHandler"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCompositionAPI, { defineComponent, ref, onMounted, watch } from '@vue/composition-api'
import KButton from '@kongponents/kbutton/KButton.vue'
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KSkeleton from '@kongponents/kskeleton/KSkeleton.vue'
import KCatalogItem from './KCatalogItem.vue'
import KPagination from '@kongponents/kpagination/KPagination.vue'
import KSkeletonBox from '@kongponents/kskeleton/KSkeletonBox.vue'
import { useRequest } from '@kongponents/utils/utils.js'

Vue.use(VueCompositionAPI)

export default defineComponent({
  name: 'KCardCatalog',
  components: {
    KButton,
    KEmptyState,
    KSkeleton,
    KCatalogItem,
    KPagination,
    KSkeletonBox
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    /**
     * A prop to pass in to display skeleton to indicate loading
     */
    isLoading: {
      type: Boolean,
      default: false
    },
    cardSize: {
      type: String,
      default: 'medium',
      validator: function (value) {
        return ['small', 'medium', 'large'].indexOf(value) !== -1
      }
    },
    /**
     * Card catalog title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * Disable truncation of the KCard's 'description'
     */
    noTruncation: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom empty state title
     */
    emptyStateTitle: {
      type: String,
      default: 'No Data'
    },
    /**
     * A prop to pass in a custom empty state message
     */
    emptyStateMessage: {
      type: String,
      default: 'There is no data to display.'
    },
    /**
     * A prop to pass in a custom empty state action route
     */
    emptyStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state icon
     */
    emptyStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the empty state icon
     */
    emptyStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the empty state icon
     */
    emptyStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop that enables the error state
     */
    hasError: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom error state title
     */
    errorStateTitle: {
      type: String,
      default: 'An error occurred'
    },
    /**
     * A prop to pass in a custom error state message
     */
    errorStateMessage: {
      type: String,
      default: 'Data cannot be displayed due to an error.'
    },
    /**
     * A prop to pass in a custom error state action route
     */
    errorStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state action message
     */
    errorStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state icon
     */
    errorStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the error state icon
     */
    errorStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the error state icon
     */
    errorStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop to pass in a fetcher function to enable server-side pagination
     */
    fetcher: {
      type: Function,
      default: undefined
    },
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
      type: Object,
      default: null
    },
    /**
     * A prop to trigger a revalidate of the fetcher function. Modifying this value
     * will trigger a manual refetch of the table data.
     */
    fetcherCacheKey: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a the number of pagination neighbors used by the pagination component
     */
    paginationNeighbors: {
      type: Number,
      default: 1
    },
    /**
     * A prop to pass in an array of page sizes used by the pagination component
     */
    paginationPageSizes: {
      type: Array,
      default: () => ([15, 30, 50, 75, 100]),
      validator: (pageSizes) => pageSizes.length && pageSizes.every(i => typeof i === 'number')
    },
    /**
     * A prop to pass the total number of items in the set for the pagination text
     */
    paginationTotalItems: {
      type: Number,
      default: null
    },
    disablePaginationPageJump: {
      type: Boolean,
      default: false
    },
    disablePagination: {
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
  setup (props, ctx) {
    const defaultFetcherProps = {
      pageSize: 15,
      page: 1
    }

    const data = ref([])
    const total = ref(0)
    const page = ref(1)
    const pageSize = ref(15)
    const isCardLoading = ref(true)
    const hasInitialized = ref(false)

    const fetchData = async () => {
      isCardLoading.value = true
      const res = await props.fetcher({
        pageSize: pageSize.value,
        page: page.value
      })

      data.value = res.data
      total.value = props.paginationTotalItems || res.total || res.data.length
      isCardLoading.value = false

      return res
    }

    const initData = async () => {
      // set up fetcher props
      const fetcherParams = {
        ...defaultFetcherProps,
        ...props.initialFetcherParams
      }

      page.value = fetcherParams.page
      pageSize.value = fetcherParams.pageSize
      hasInitialized.value = true

      // get data
      if (props.fetcher) {
        await fetchData()
      } else if (props.items && props.items.length) {
        data.value = props.items
        total.value = props.items.length
      }

      if (props.isLoading === false) {
        isCardLoading.value = false
      }
    }

    const { revalidate } = useRequest(
      () => props.fetcher && hasInitialized.value && `catalog-item_${Math.floor(Math.random() * 1000)}_${props.fetcherCacheKey}`,
      () => fetchData(),
      { revalidateOnFocus: false }
    )

    const pageChangeHandler = ({ page: newPage }) => {
      page.value = newPage
    }

    const pageSizeChangeHandler = ({ pageSize: newPageSize }) => {
      pageSize.value = newPageSize
    }

    watch(() => [page.value, pageSize.value], () => {
      revalidate()
    }, { immediate: true })

    onMounted(() => {
      initData()
    })

    return {
      data,
      page,
      pageChangeHandler,
      pageSizeChangeHandler,
      pageSize,
      total,
      isCardLoading
    }
  }
})
</script>

<style lang="scss">
.k-card-catalog {
  $cardHeight: 181px;

  .k-card-catalog-title {
    color: var(--blue-600);
  }

  .k-skeleton-grid {
    --KSkeletonCardWidth: 25%;

    .skeleton-card-column {
      padding-right: 2rem;
    }
    .skeleton-card {
      height: $cardHeight;
    }
  }

  .k-catalog-page {
    display: grid;
    grid-gap: var(--spacing-lg);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

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
}

  .card-pagination {
    grid-column: 1 / -1;
  }
</style>
