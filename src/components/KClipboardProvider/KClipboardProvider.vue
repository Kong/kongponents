<template>
  <slot :copy-to-clipboard="copyTextToClipboard" />
</template>

<script setup lang="ts">
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

import type { ClipboardProviderSlots } from '@/types/clipboard-provider'

defineSlots<ClipboardProviderSlots>()
</script>
