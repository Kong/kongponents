<template>
  <KCard
    class="grid-item d-flex flex-column overflow-hidden k-card-catalog-item"
    :data-testid="item && item.title ? `${item.title.replace(/[^0-9a-z]/gi, '-')}-catalog-item` : 'catalog-item'"
    has-hover
    role="button"
    tabindex="0"
    :test-mode="!!testMode || undefined"
    @click="handleCardClick($event, item)"
  >
    <template #title>
      <slot name="cardTitle">
        {{ item ? item.title : '' }}
      </slot>
    </template>

    <template #body>
      <div :class="{ 'multi-line-truncate': truncate }">
        <slot name="cardBody">
          {{ item ? item.description : '' }}
        </slot>
      </div>
    </template>
  </KCard>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import type { CatalogItem } from '@/types'
import KCard from '@/components/KCard/KCard.vue'

defineProps({
  item: {
    type: Object as PropType<CatalogItem>,
    default: () => ({}),
  },
  truncate: {
    type: Boolean,
    default: true,
  },
  /**
     * Test mode - for testing only, strips out generated ids
     */
  testMode: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['clicked'])

const handleCardClick = (evt: Event, item: CatalogItem): void => {
  emit('clicked', {
    evt,
    item,
  })
}
</script>

<style lang="scss" scoped>
.k-card-catalog-item {
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  .multi-line-truncate {
    --lh: 20px;
    --max-lines: 5;
    --max-lines-less: 4;
    line-height: var(--lh);
    max-height: calc(var(--lh) * var(--max-lines));
    overflow: hidden;
    padding-right: 8px;

    position: relative;
  }

  .multi-line-truncate::before {
    content: "...";
    position: absolute;
    right: 12px;
    top: calc(var(--lh) * var(--max-lines-less));
  }

  &:hover {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.k-card-catalog-item.kong-card {
  --KCardBorderRadius: 5px;
  --KCardPaddingY: var(--spacing-lg);
  --KCardPaddingX: var(--spacing-md);

  .k-card-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .description {
      flex-grow: 1;
    }
  }

  &:hover {
    --KCardShadow: none;
    --KCardBorder: 1px solid var(--blue-300);
  }
}
</style>
