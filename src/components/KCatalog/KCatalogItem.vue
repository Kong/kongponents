<template>
  <KCard
    class="k-card-catalog-item"
    :data-testid="item && item.title ? `${item.title.replace(/[^0-9a-z]/gi, '-')}-catalog-item` : 'catalog-item'"
    has-hover
    role="button"
    tabindex="0"
    :test-mode="!!testMode || undefined"
    @click="($event: any) => handleCardClick($event, item)"
  >
    <template #title>
      <slot name="cardTitle">
        {{ item ? item.title : '' }}
      </slot>
    </template>

    <template #actions>
      <slot name="cardActions" />
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
  overflow: hidden;

  .multi-line-truncate {
    line-height: var(--kui-line-height-30, $kui-line-height-30);
    max-height: 100px;
    overflow: hidden;
    padding-right: var(--kui-space-40, $kui-space-40);
    position: relative;
  }

  .multi-line-truncate::before {
    content: "...";
    position: absolute;
    right: 12px;
    top: 80px;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.k-card-catalog-item.kong-card {
  --KCardBorderRadius: var(--kui-border-radius-20, #{$kui-border-radius-20});
  --KCardPaddingY: var(--spacing-lg, var(--kui-space-80, #{$kui-space-80}));
  --KCardPaddingX: var(--spacing-md, var(--kui-space-60, #{$kui-space-60}));

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
    --KCardBorder: var(--kui-border-width-10, #{$kui-border-width-10}) solid var(--blue-300, var(--kui-color-border-primary-weak, #{$kui-color-border-primary-weak}));
  }
}
</style>
