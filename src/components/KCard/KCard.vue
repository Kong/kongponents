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
      v-if="showCardBody"
      class="card-content"
    >
      <slot v-if="$slots.default" />
      <slot
        v-else-if="!$slots.default && ($slots.body || body)"
        name="body"
      >
        {{ body }}
      </slot>
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
import { useSlots, computed, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  /**
   * @deprecated in favor of `content` prop
   */
  body: {
    type: String,
    default: '',
    validator: (value: string) => {
      if (value) {
        console.warn('KCard: `body` prop has been deprecated. Please use `default` slot instead. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kcard')
      }

      return true
    },
  },
})

const slots = useSlots()

const showCardHeader = computed((): boolean => {
  return !!(slots.title || props.title || slots.actions)
})

const showCardBody = computed((): boolean => {
  return !!(slots.default || slots.body || props.body)
})

onMounted(() => {
  if (slots.body) {
    // TODO: remove this when @deprecated `body` slot is removed
    console.warn('KCard: `body` slot has been deprecated in favor of `default` slot. See the migration guide for more details: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kcard')
  }
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
  }

  .card-content {
    @include bodyText;
  }

  .card-footer {
    @include bodyText;
  }
}
</style>
