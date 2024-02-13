<template>
  <a
    v-if="isHrefValid"
    class="k-external-link"
    :href="href"
    rel="noopener"
    target="_blank"
  >
    <slot />
    <ExternalLinkIcon
      v-if="!hideIcon"
      :size="KUI_ICON_SIZE_40"
    />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { KUI_ICON_SIZE_40 } from '@kong/design-tokens'
import { isValidUrl } from '@/utilities/urls'
import { ExternalLinkIcon } from '@kong/icons'

const props = defineProps({
  href: {
    type: String,
    required: true,
    validator: (value: string): boolean => !!isValidUrl(value),
  },
  hideIcon: {
    type: Boolean,
    default: false,
  },
})

const isHrefValid = computed((): boolean => !!isValidUrl(props.href))
</script>

<style lang="scss" scoped>
.k-external-link {
  align-items: center;
  color: var(--kui-color-text-primary, $kui-color-text-primary);
  display: inline-flex;
  font-size: inherit;
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  gap: var(--kui-space-20, $kui-space-20);
  list-style: inherit;
  outline: none;
  text-decoration: none;

  &:hover {
    color: var(--kui-color-text-primary-strong, $kui-color-text-primary-strong);
  }

  &:focus-visible {
    color: var(--kui-color-text-primary-stronger, $kui-color-text-primary-stronger);
  }

  &:active {
    color: var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest);
  }
}
</style>
