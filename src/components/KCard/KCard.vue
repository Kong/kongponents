<template>
  <div class="k-card">
    <div
      v-if="showCardHeader"
      class="card-header"
    >
      <div
        v-if="$slots.title || title"
        class="card-title"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div
        v-if="$slots.actions"
        class="card-actions"
      >
        <slot name="actions" />
      </div>
    </div>
    <div
      v-if="$slots.default"
      class="card-content"
    >
      <slot name="default" />
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const slots = useSlots()

const showCardHeader = computed((): boolean => {
  return !!(slots.title || props.title || slots.actions)
})
</script>

<style lang="scss" scoped>
.k-card {
  @include cardDefaults;

  display: flex;
  flex-direction: column;
  gap: var(--kui-space-70, $kui-space-70);

  .card-header {
    align-items: flex-start;
    display: inline-flex;
    gap: var(--kui-space-50, $kui-space-50);
    justify-content: space-between;

    .card-title {
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-50, $kui-font-size-50);
      font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
      letter-spacing: var(--kui-letter-spacing-minus-30, $kui-letter-spacing-minus-30);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
    }

    .card-actions {
      display: flex;
      gap: var(--kui-space-30, $kui-space-30);
    }
  }

  .card-content {
    @include bodyText;
  }

  .card-footer {
    @include bodyText;

    display: flex;
    gap: var(--kui-space-30, $kui-space-30);
  }
}
</style>
