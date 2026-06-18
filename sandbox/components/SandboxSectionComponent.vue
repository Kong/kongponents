<template>
  <section class="sandbox-section">
    <div class="section-header">
      <h4
        v-if="title"
        class="section-title"
      >
        {{ title }}
      </h4>
      <p
        v-if="hasDescription"
        class="section-description"
      >
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
})

const hasDescription = computed((): boolean => !!(props.description || slots.description))
</script>

<style lang="scss" scoped>
.sandbox-section {
  &:not(:last-of-type) {
    margin-bottom: var(--kui-space-90, $kui-space-90);
  }

  .section-header {
    margin-bottom: var(--kui-space-70, $kui-space-70);

    .section-title {
      color: var(--kui-color-text, $kui-color-text);
      margin: var(--kui-space-0, $kui-space-0);
      margin-left: var(--kui-space-50, $kui-space-50);
      position: relative;

      & + .section-description {
        margin-top: var(--kui-space-50, $kui-space-50);
      }

      &::before {
        bottom: 2px;
        color: var(--kui-color-text-neutral, $kui-color-text-neutral);
        content: '#';
        font-size: var(--kui-font-size-20, $kui-font-size-20);
        left: -12px;
        position: absolute;
      }
    }

    .section-description {
      color: var(--kui-color-text, $kui-color-text);
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      margin: var(--kui-space-0, $kui-space-0);
      /* stylelint-disable-next-line @kong/stylelint-plugin-design-tokens/use-proper-token */
      max-width: var(--kui-breakpoint-mobile, $kui-breakpoint-mobile);
    }
  }

  .section-content {
    :deep(> *:not(:last-of-type)) {
      margin-bottom: var(--kui-space-70, $kui-space-70);
    }

    :slotted(> p) {
      font-size: var(--kui-font-size-40, $kui-font-size-40);
      line-height: var(--kui-line-height-40, $kui-line-height-40);
      margin: 0;
      margin-bottom: var(--kui-space-50, $kui-space-50);
      /* stylelint-disable-next-line @kong/stylelint-plugin-design-tokens/use-proper-token */
      max-width: var(--kui-breakpoint-mobile, $kui-breakpoint-mobile);
    }
  }
}
</style>
