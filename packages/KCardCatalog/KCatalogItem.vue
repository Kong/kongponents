<template>
  <KCard
    :data-testid="item && item.title ? `${item.title.replace(' ', '-')}-catalog-item` : 'catalog-item'"
    :test-mode="testMode"
    class="grid-item d-flex flex-column overflow-hidden k-card-catalog-item"
    has-hover
    role="button"
    tabindex="0"
    @click.native="handleCardClick($event, item)"
  >
    <template v-slot:title>
      <slot name="cardTitle">
        {{ item ? item.title : '' }}
      </slot>
    </template>
    <template v-slot:body>
      <div
        :class="{ 'multi-line-truncate': truncate }">
        <slot name="cardBody">
          {{ item ? item.description : '' }}
        </slot>
      </div>
    </template>
  </KCard>
</template>

<script>
import KCard from '@kongponents/kcard/KCard.vue'

export default {
  name: 'KCatalogItem',
  components: {
    KCard
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    locationParam: {
      type: String,
      default: ''
    },
    truncate: {
      type: Boolean,
      default: true
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
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
.k-card-catalog-item.kong-card {
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
