<template>
  <div class="color-swatch-container">
    <div
      :style="getBackground"
      class="swatch" />
    <div class="description">
      <span>{{ colorName }}</span>
      <code class="color-name-value">--{{ colorName }}</code><br>
      <code class="color-name-value">{{ colorValue }}</code><br>
      <code>.color-{{ colorName }}</code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    required: true,
    default: ''
  }
})

const getBackground = computed((): string => `background-color: var(${props.color})`)
const colorName = computed((): string => props.color.replace('--', ''))
const colorValue = computed((): string => getComputedStyle(document.body).getPropertyValue(props.color))
</script>

<style lang="scss">
.color-swatch-container {
  display: flex;
  padding: $kui-space-80 $kui-space-0;

  .swatch {
    border: $kui-border-width-10 solid $kui-color-border-neutral-weak;
    border-radius: $kui-border-radius-20;
    height: 40px;
    width: 40px;
  }

  .description {
    flex: 1;
    margin-left: $kui-space-60;

    span {
      display: block;

      &:first-of-type {
        font-weight: $kui-font-weight-semibold;
        margin-bottom: $kui-space-20;
      }

      &:last-of-type {
        color: var(--vp-c-text, $kui-color-text);
        font-size: $kui-font-size-30;
      }
    }

    .color-name-value {
      margin-bottom: $kui-space-40;
    }
  }
}
</style>
