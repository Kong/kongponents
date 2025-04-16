<template>
  <slot :copy-to-clipboard="copyAdapter" />
</template>

<script setup lang="ts">
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

import type { ClipboardProviderSlots } from '@/types/clipboard-provider'

defineSlots<ClipboardProviderSlots>()

/**
 * This function is essential to shadow the actual function signature of `copyTextToClipboard`,
 * since `ClipboardProvider` is used in many places and we do not wish to break anything at the downstream.
 * @param text The text to copy to the clipboard
 */
const copyAdapter = (text: string | undefined = '') => copyTextToClipboard(text)
</script>
