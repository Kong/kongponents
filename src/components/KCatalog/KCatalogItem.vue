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
  </KCard>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
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
})

const emit = defineEmits(['click'])

const handleCardClick = (evt: Event, item: CatalogItem): void => {
  emit('click', {
    evt,
    item,
  })
}
</script>
