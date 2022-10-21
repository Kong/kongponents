// This file is a shim to support deprecated components while properly mapping to the new component.
// If this deprecated component is used, it will warn the user to upgrade to the new component in the browser console.

import { defineComponent, h, onMounted } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Kooltip',
  setup(props, { attrs, slots, emit }) {
    onMounted(() => console.warn("The Kongponents 'Kooltip' component is deprecated and will be removed in a future release.\nUpdate all references of 'Kooltip' to 'KTooltip'.\nKongponent Docs: https://kongponents.konghq.com/components/tooltip.html"))

    return () => h(KTooltip, {
      ...props,
      ...attrs,
      ...emit,
    }, slots)
  },
})
