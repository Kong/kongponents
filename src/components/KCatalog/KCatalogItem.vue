<template>
  <KCard
    class="k-catalog-item"
    :data-testid="item && item.title ? `${item.title.replace(/[^0-9a-z]/gi, '-')}-catalog-item` : 'catalog-item'"
    role="button"
    tabindex="0"
    @click="($event: any) => handleCardClick($event, item)"
  >
    <template #title>
      <slot name="card-title">
        {{ item ? item.title : '' }}
      </slot>
    </template>

    <template #actions>
      <slot name="card-actions" />
    </template>

    <div :class="{ 'multi-line-truncate': truncate }">
      <slot name="card-body">
        {{ item ? item.description : '' }}
      </slot>
    </div>

    <template #footer>
      <slot name="card-footer" />
    </template>
  </KCard>
</template>

<script setup lang="ts" generic="T extends CatalogItem">
import type { CatalogItemProps, CatalogItemEmits, CatalogItemSlots, CatalogItem } from '@/types'
import KCard from '@/components/KCard/KCard.vue'

const {
  item,
  truncate = true,
} = defineProps<CatalogItemProps<T>>()

const emit = defineEmits<CatalogItemEmits<T>>()

defineSlots<CatalogItemSlots>()

const handleCardClick = (evt: MouseEvent, item: T): void => {
  emit('click', {
    evt,
    item,
  })
}
</script>

<style lang="scss" scoped>
.k-catalog-item {
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow $kongponentsTransitionDurTimingFunc;

  &:hover {
    box-shadow: var(--kui-shadow, $kui-shadow);
  }

  .multi-line-truncate {
    @include truncate(3);
  }
}
</style>
