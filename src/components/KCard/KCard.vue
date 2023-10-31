<template>
  <section class="k-card">
    <div
      v-if="$slots.title || title || $slots.actions"
      class="card-header"
    >
      <div
        v-if="$slots.title || title"
        class="card-title"
      >
        <h4>
          <slot name="title">
            {{ title }}
          </slot>
        </h4>
      </div>
      <div
        v-if="$slots.actions"
        class="card-actions"
      >
        <slot name="actions" />
      </div>
    </div>
    <div
      v-if="$slots.default || $slots.body || content"
      class="card-content"
    >
      <slot :name="contentSlotName">
        <p>{{ content }}</p>
      </slot>
    </div>
    <div
      v-if="$slots.footer"
      class="card-footer"
    >
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSlots, computed } from 'vue'

defineProps({
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
})

const slots = useSlots()

const contentSlotName = computed((): 'body' | 'default' => { // TODO: remove this when body slot is removed
  if (slots.body && !slots.default) {
    console.warn('KCard: `body` slot has been deprecated in favor of `default` slot. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kcard')

    return 'body'
  }

  return 'default'
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
      h4 {
        color: var(--kui-color-text, $kui-color-text);
        font-size: var(--kui-font-size-50, $kui-font-size-50);
        font-weight: var(--kui-font-weight-bold, $kui-font-weight-bold);
        letter-spacing: var(--kui-letter-spacing-minus-30, $kui-letter-spacing-minus-30);
        line-height: var(--kui-line-height-40, $kui-line-height-40);
        margin: 0; // reset default browser margin
      }
    }
  }

  .card-content {
    @include bodyText;

    p {
      @include bodyText;

      margin: 0; // reset default browser margin
    }
  }

  .card-footer {
    @include bodyText;
  }
}
</style>
