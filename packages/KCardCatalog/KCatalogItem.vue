<template>
  <router-link :to="locationParam">
    <KCard
      :data-testid="`${item.name || item.title || item.id}`"
      class="grid-item d-flex flex-column overflow-hidden k-card-catalog-item"
      has-hover
      role="button"
      tabindex="0"
      @click.native="handleCardClick($event, item)"
    >
      <template slot="title">
        <p
          v-if="loading"
          class="item-card-title"
        >
          <KSkeletonBox width="10" />
        </p>
        <p
          v-else
          class="item-card-title truncate"
        >
          {{ item.title }}
        </p>
      </template>
      <template slot="body">
        <p class="multi-line-truncate truncate">
          <template
            v-if="loading"
          >
            <KSkeletonBox width="100" />
            <KSkeletonBox width="50" />
          </template>
          <template v-else>
            {{ item.description }}
          </template>
        </p>
      </template>
    </KCard>
  </router-link>
</template>

<script>
export default {
  name: 'KCatalogItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    locationParam: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.k-card-catalog-item {
  max-width: 200px;
}

.item-card-title {
  font-weight: 600;
  padding: 2rem 1rem;
  width: 100%;
}

.multi-line-truncate {
  --lh: 1.4rem;
  --max-lines: 5;
  --max-lines-less: 4;
  line-height: var(--lh);
  position: relative;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem;
  white-space: break-spaces;
}

.multi-line-truncate::before {
  position: absolute;
  content: "...";
  top: calc(var(--lh) * var(--max-lines-less));
  right: 12px;
}

.kong-card {
  &:hover {
    cursor: pointer;
    border: 1px solid #A6C6FF;
    border-radius: 5px;
  }
}
</style>

<style lang="scss">
.kong-card {
  --KCardBorderRadius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  &.relative .k-card-header {
    margin-bottom: 8px;
    min-height: 24px;
  }

  .k-card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .description {
      flex-grow: 1;
    }
  }
}
</style>
