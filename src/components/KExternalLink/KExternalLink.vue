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
  @include link;

  align-items: center;
  display: inline-flex;
  font-weight: var(--kui-link-font-weight, var(--kui-font-weight-regular, $kui-font-weight-regular));
  gap: var(--kui-space-20, $kui-space-20);
  list-style: inherit;
}
</style>
