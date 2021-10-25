<template>
  <router-link
    v-if="locationParam"
    :to="locationParam">
    <KCard
      :data-testid="`${item.name || item.title || item.id}`"
      class="grid-item d-flex flex-column overflow-hidden k-card-catalog-item"
      has-hover
      role="button"
      tabindex="0"
      @click.native="handleCardClick($event, item)"
    >
      <template #title>
        <slot
          :item="item"
          name="card-title"
        >
          {{ item.title }}
        </slot>
      </template>
      <template #body>
        <div
          :item="item"
          :class="{ 'multi-line-truncate': truncate }">
          <slot
            name="card-body"
          >
            {{ item.description }}
          </slot>
        </div>
      </template>
    </KCard>
  </router-link>

  <KCard
    v-else
    :data-testid="`${item.name || item.title || item.id}`"
    class="grid-item d-flex flex-column overflow-hidden k-card-catalog-item"
    has-hover
    role="button"
    tabindex="0"
    @click.native="handleCardClick($event, item)"
  >
    <template #title>
      <slot
        :item="item"
        name="card-title"
      >
        {{ item.title }}
      </slot>
    </template>
    <template #body>
      <div
        :item="item"
        :class="{ 'multi-line-truncate': truncate }">
        <slot
          name="card-body"
        >
          {{ item.description }}
        </slot>
      </div>
    </template>
  </KCard>
</template>

<script>
export default {
  name: 'KCatalogItem',
  props: {
    item: {
      type: Object,
      default: () => {},
      // Item must have a title
      validator: (items) => !items.length || items.some(i => i.hasOwnProperty('title'))
    },
    locationParam: {
      type: String,
      default: ''
    },
    truncate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCardClick (evt, item) {
      this.$emit('clicked', {
        evt,
        item
      })
    }
  }
}
</script>

<style lang="scss">
.kong-card {
  --KCardBorderRadius: 5px;
  --KCardPaddingY: var(--spacing-lg);
  --KCardPaddingX: var(--spacing-md);

  display: flex;
  flex-direction: column;
  justify-content: stretch;

  .multi-line-truncate {
    --lh: 20px;
    --max-lines: 5;
    --max-lines-less: 4;
    line-height: var(--lh);
    position: relative;
    max-height: calc(var(--lh) * var(--max-lines));
    overflow: hidden;
    padding-right: 8px;
  }

  .multi-line-truncate::before {
    position: absolute;
    content: "...";
    top: calc(var(--lh) * var(--max-lines-less));
    right: 12px;
  }

  .k-card-body {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .description {
      flex-grow: 1;
    }
  }

  &:hover {
    cursor: pointer;
    --KCardShadow: none;
    --KCardBorder: 1px solid var(--blue-300);
  }
}
</style>
