<template>
  <a
    v-if="isHrefValid"
    class="k-external-link"
    :href="href"
    rel="noopener"
    target="_blank"
    @mouseleave="isMouseOver = false"
    @mouseover="isMouseOver = true"
  >
    <slot />
    <KIcon
      v-if="!hideIcon"
      :color="iconColor"
      icon="externalLink"
      size="12"
    />
  </a>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { KUI_COLOR_TEXT_PRIMARY, KUI_COLOR_TEXT_PRIMARY_STRONG } from '@kong/design-tokens'
import { isValidUrl } from '@/utilities/urls'

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

const isMouseOver = ref(false)
const iconColor = computed((): string => isMouseOver.value ? `var(--KExternalLinkColorHover, var(--blue-600, var(--kui-color-text-primary-strong, ${KUI_COLOR_TEXT_PRIMARY_STRONG})))` : `var(--KExternalLinkColor, var(--kui-color-text-primary, ${KUI_COLOR_TEXT_PRIMARY}))`)
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-external-link {
  align-items: center;
  color: var(--KExternalLinkColor, var(--kui-color-text-primary, $kui-color-text-primary));
  display: inline-flex;
  font-weight: var(--kui-font-weight-regular, $kui-font-weight-regular);
  text-decoration: none;

  &:hover {
    color: var(--KExternalLinkColorHover, var(--kui-color-text-primary-strong, $kui-color-text-primary-strong));
  }

  .kong-icon {
    margin-left: var(--spacing-xs, var(--kui-space-40, $kui-space-40));
  }
}
</style>
