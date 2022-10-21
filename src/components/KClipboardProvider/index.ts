import { defineComponent } from 'vue'

import { copyTextToClipboard } from '@/utilities/copyTextToClipboard'

export default defineComponent({
  name: 'KClipboardProvider',
  setup(_props, { slots }) {
    return () => slots?.default && slots.default({
      copyToClipboard: copyTextToClipboard,
    })
  },
})
