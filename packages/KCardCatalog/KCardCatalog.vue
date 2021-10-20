<template>
  <div class="">
    <div class="k-catalog-page d-flex w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <KCatalogItem
        v-for="item in items"
        :key="item.key ? item.key : null"
        :item="item"
        :loading="loading"
        :location-param="item.locationParam ? item.locationParam : ''"
        class="catalog-item"
      />
    </div>
    <!-- <PaginationBar
      :page-size="pageSize"
      :total-count="totalCount"
      :search-triggered="searchTriggered"
      class="catalog-pagination mt-4"
      @pageChanged="onPageChanged"
    /> -->
  </div>
</template>

<script>
import KCatalogItem from './KCatalogItem.vue'
// import PaginationBar from './PaginationBar.vue'

export default {
  name: 'KCardCatalog',
  components: {
    KCatalogItem
    // PaginationBar
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    pageSize: {
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
    }
  },
  methods: {
    onPageChanged (page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.k-catalog-page {
  flex-wrap: wrap;
}
</style>
