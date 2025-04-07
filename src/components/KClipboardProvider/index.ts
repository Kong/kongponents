import { defineComponent } from 'vue'
import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

import type { SlotsType } from 'vue'
import type { ClipboardProviderSlots } from '@/types/clipboard-provider'

export default defineComponent({
  name: 'KClipboardProvider',
  slots: Object as SlotsType<ClipboardProviderSlots>,
  setup(_props, { slots }) {
    return () => slots?.default && slots.default({
      copyToClipboard: copyTextToClipboard,
    })
  },
})
