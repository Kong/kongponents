<template>
  <div class="color-swatch-container">
    <div
      :style="getBackground"
      class="swatch" />
    <div class="description">
      <span>{{ colorName }}</span>
      <code class="mb-2">--{{ colorName }}</code><br>
      <code class="mb-2">{{ colorValue }}</code><br>
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
  padding: 1.5rem 0;

  .swatch {
    width: 40px;
    height: 40px;
    border: 1px solid var(--grey-200);
    border-radius: 4px;
  }

  .description {
    flex: 1;
    margin-left: 1rem;

    span {
      display: block;

      &:first-of-type {
        font-weight: 600;
        margin-bottom: .25rem;
      }

      &:last-of-type {
        color: var(--vp-c-text, var(--black-70));
        font-size: var(--type-sm);
      }
    }
  }
}
</style>
