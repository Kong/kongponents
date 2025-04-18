<template>
  <div class="k-card">
    <div
      v-if="showCardHeader"
      class="card-header"
    >
      <component
        :is="titleTag"
        v-if="slots.title || title"
        class="card-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </component>
      <div
        v-if="slots.actions"
        class="card-actions"
      >
        <slot name="actions" />
      </div>
    </div>
    <div
      v-if="slots.default"
      class="card-content"
    >
      <slot name="default" />
    </div>
    <div
      v-if="slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps, CardSlots } from '@/types'

const {
  title = '',
  titleTag = 'div',
} = defineProps<CardProps>()

const slots = defineSlots<CardSlots>()

const showCardHeader = computed((): boolean => {
  return !!(slots.title || title || slots.actions)
})
</script>

<style lang="scss" scoped>
.k-card {
  @include cardDefaults;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: var(--kui-space-70, $kui-space-70);
  width: 100%;

  .card-header {
    align-items: flex-start;
    display: inline-flex;
    gap: var(--kui-space-50, $kui-space-50);
    justify-content: space-between;

    .card-title {
      align-items: center;
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
      line-height: var(--kui-line-height-30, $kui-line-height-30);
      margin: var(--kui-space-0, $kui-space-0);
      text-align: left;
      width: 100%;
    }

    .card-actions {
      display: flex;
      flex-shrink: 0;
      gap: var(--kui-space-30, $kui-space-30);
      margin-left: var(--kui-space-auto, $kui-space-auto);
    }
  }

  .card-content {
    @include bodyText;

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .card-footer {
    @include bodyText;

    display: flex;
    gap: var(--kui-space-30, $kui-space-30);
    width: 100%;
  }
}
</style>
