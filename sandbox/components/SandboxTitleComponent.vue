<template>
  <div class="sandbox-title">
    <component
      :is="isSubtitle ? 'h3' : 'h2'"
      class="title"
      :class="{ 'subtitle': isSubtitle }"
    >
      {{ title }}
    </component>
    <p
      v-if="hasDescription"
      class="description"
    >
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  isSubtitle: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const hasDescription = computed((): boolean => !!(props.description || slots.description))
</script>

<style lang="scss" scoped>
.sandbox-title {
  margin-bottom: $kui-space-70;

  .title {
    margin: $kui-space-0;

    & + .description {
      margin-top: $kui-space-50;
    }

    &.subtitle {
      margin-left: $kui-space-50;
      position: relative;

      &::before {
        bottom: 2px;
        color: $kui-color-text-primary;
        content: '#';
        font-size: $kui-font-size-30;
        left: -12px;
        position: absolute;
      }
    }
  }

  .description {
    color: $kui-color-text;
    font-size: $kui-font-size-40;
    line-height: $kui-line-height-40;
    margin: $kui-space-0;
    max-width: 700px;
  }
}
</style>
