<template>
  <a
    v-if="isHrefValid"
    class="k-external-link"
    :href="href"
    rel="noopener"
    target="_blank"
  >
    <slot />
    <KIcon
      v-if="!hideIcon"
      color="var(--blue-500)"
      icon="externalLink"
      size="12"
    />
  </a>
</template>

<script lang="ts">
const isValidUrl = (url: string): boolean => {
  try {
    // eslint-disable-next-line no-new
    new URL(url)

    // No error was thrown, so return true
    return true
  } catch {
    // Invalid URL
    return false
  }
}
</script>

<script setup lang="ts">
// eslint-disable-next-line import/first
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    required: true,
    validator: (value: string) => { return isValidUrl(value) },
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
})

const isHrefValid = computed((): boolean => !!isValidUrl(props.href))
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-external-link {
  align-items: center;
  color: color(blue-500);
  display: inline-flex;
  font-weight: 400;
  text-decoration: none;

  .kong-icon {
    margin-left: var(--spacing-xs);
  }
}
</style>
