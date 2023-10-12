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
    margin-bottom: $kui-space-90;
  }

  .section-header {
    margin-bottom: $kui-space-70;

    .section-title {
      color: $kui-color-text;
      margin: $kui-space-0;
      margin-left: $kui-space-50;
      position: relative;

      & + .section-description {
        margin-top: $kui-space-50;
      }

      &::before {
        bottom: 2px;
        color: $kui-color-text-neutral;
        content: '#';
        font-size: $kui-font-size-20;
        left: -12px;
        position: absolute;
        // transform: translateY(-50%);
      }
    }

    .section-description {
      color: $kui-color-text;
      font-size: $kui-font-size-40;
      line-height: $kui-line-height-40;
      margin: $kui-space-0;
      max-width: 700px
    }
  }

  .section-content {
    :deep(> *:not(:last-of-type)) {
      margin-bottom: $kui-space-70;
    }
  }
}
</style>
