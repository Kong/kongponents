<template>
  <div class="k-card-catalog">
    <div
      v-if="title"
      class="k-card-catalog-title">
      <h3>{{ title }}</h3>
    </div>
    <KSkeleton
      v-if="isLoading"
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
    <KEmptyState
      v-else-if="hasError"
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
          v-if="errorStateActionMessage && errorStateActionRoute"
          :to="errorStateActionRoute"
          appearance="primary"
        >
          {{ errorStateActionMessage }}
        </KButton>
      </template>
    </KEmptyState>
    <KEmptyState
      v-else-if="!hasError && !data.length && !$scopedSlots.body"
      :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
      :icon="emptyStateIcon || ''"
      :icon-color="emptyStateIconColor"
      :icon-size="emptyStateIconSize"
    >
      <template v-slot:title>{{ emptyStateTitle }}</template>
      <template v-slot:message>{{ emptyStateMessage }}</template>
      <template v-slot:cta>
        <KButton
          v-if="emptyStateActionMessage && emptyStateActionRoute"
          :to="emptyStateActionRoute"
          appearance="primary"
        >
          {{ emptyStateActionMessage }}
        </KButton>
      </template>
    </KEmptyState>
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
    </div>
  </div>
</template>

<script>
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KSkeleton from '@kongponents/kskeleton/KSkeleton.vue'
import KCatalogItem from './KCatalogItem.vue'

import { useRequest } from '../../utils/utils'
import Vue from 'vue'
import VueCompositionAPI, { computed, defineComponent, ref, onMounted, watch } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

export default defineComponent({
  name: 'KCardCatalog',
  components: {
    KEmptyState,
    KSkeleton,
    KCatalogItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    /* pageSize: {
      type: Number,
      default: 12
    },
    totalCount: {
      type: Number,
      default: 0
    },
    searchTriggered: {
      type: Boolean,
      default: false
    }, */
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
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a fetcher function to enable server-side search, sort
     * and pagination
     */
    fetcher: {
      type: Function,
      default: undefined
    },
    /**
     * A prop to pass in a page size number for server-side pagination
     */
    pageSize: {
      type: Number,
      default: 10
    }
  },
  methods: {
    /* onPageChanged (page) {
      this.$emit('page-changed', page)
    } */
  },

  setup (props, ctx) {
    const data = ref([])
    const page = ref(1)
    const total = ref(10)

    const fetchData = async () => {
      const { data: fetcherData, total: totalCount } = await props.fetcher(
        props.pageSize,
        page.value
      )

      data.value = fetcherData
      console.log('fetcher')
      total.value = totalCount
    }

    const initData = async () => {
      if (props.fetcher) {
        fetchData()
      } else if (props.items && props.items.length) {
        data.value = props.items
      }
    }

    const { revalidate } = useRequest(
      () => props.fetcher && `catalog-item_${Math.floor(Math.random() * 1000)}`,
      () => fetchData(),
      { revalidateOnFocus: false }
    )

    // TEMP
    const totalPages = computed(() => Math.ceil(total.value / props.pageSize))

    watch(() => [page.value], () => {
      revalidate()
    }, { immediate: true })

    onMounted(() => {
      initData()
    })

    return {
      data,
      page,
      total,
      totalPages
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
</style>
