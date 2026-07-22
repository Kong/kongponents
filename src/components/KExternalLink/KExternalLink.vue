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
      decorative
      :size="`var(--kui-icon-size-30, ${KUI_ICON_SIZE_30})`"
    />
  </a>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { ExternalLinkIcon } from '@kong/icons'
import { KUI_ICON_SIZE_30 } from '@kong/design-tokens'
import { isValidUrl } from '@/utilities/urls'
import { warnInvalidProp } from '@/utilities/warning'
import type { ExternalLinkProps } from '@/types'

const {
  href,
  hideIcon,
} = defineProps<ExternalLinkProps>()

watch(() => href, (value: string) => {
  if (!isValidUrl(value)) {
    warnInvalidProp('href', `\`href\` should be a valid URL, but got "${value}".`)
  }
}, { immediate: true })

const isHrefValid = computed((): boolean => !!isValidUrl(href))
</script>

<style lang="scss" scoped>
.k-external-link {
  align-items: center;
  color: var(--kui-link-color-text, var(--kui-color-text-primary, $kui-color-text-primary));
  display: inline-flex;
  font-size: inherit;
  font-weight: var(--kui-link-font-weight, var(--kui-font-weight-regular, $kui-font-weight-regular));
  gap: var(--kui-space-20, $kui-space-20);
  list-style: inherit;
  outline: none;
  text-decoration: var(--kui-link-text-decoration, none);

  &:hover {
    color: var(--kui-link-color-text-hover, var(--kui-color-text-primary-strong, $kui-color-text-primary-strong));
    text-decoration: var(--kui-link-text-decoration-hover, none);
  }

  &:focus-visible {
    box-shadow: var(--kui-link-shadow-focus, var(--kui-shadow-focus, $kui-shadow-focus));
    color: var(--kui-link-color-text-hover, var(--kui-color-text-primary-strong, $kui-color-text-primary-strong));
    text-decoration: var(--kui-link-text-decoration-hover, none);
  }

  &:active {
    color: var(--kui-link-color-text-active, var(--kui-color-text-primary-strongest, $kui-color-text-primary-strongest));
  }
}
</style>
