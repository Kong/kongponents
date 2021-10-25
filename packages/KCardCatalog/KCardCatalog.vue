<template>
  <div class="k-card-catalog">
    <div
      v-if="title"
      class="k-card-catalog-title">
      <h2>{{ title }}</h2>
    </div>
    <div
      :class="`k-card-${cardSize}`"
      class="k-catalog k-catalog-page">
      <slot name="body">
        <KCatalogItem
          v-for="item in items"
          :key="item.key ? item.key : null"
          :item="item"
          :location-param="item.locationParam ? item.locationParam : ''"
          :truncate="!noTruncation"
          class="catalog-item"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import KCatalogItem from './KCatalogItem.vue'

export default {
  name: 'KCardCatalog',
  components: {
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
    },
    loading: {
      type: Boolean,
      default: false
    }, */
    cardSize: {
      type: String,
      default: 'medium'
    },
    title: {
      type: String,
      default: ''
    },
    noTruncation: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /* onPageChanged (page) {
      this.$emit('page-changed', page)
    } */
  }
}
</script>

<style lang="scss">
.k-card-catalog {
  $cardHeight: 181px;

  .k-skeleton-grid {
    --KSkeletonCardWidth: 25%;

    .skeleton-card-column {
      padding-right: 2rem;
    }
    .skeleton-card {
      height: $cardHeight;
    }
  }

  .k-catalog {
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
