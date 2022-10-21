// This file is a shim to support deprecated components while properly mapping to the new component.
// If this deprecated component is used, it will warn the user to upgrade to the new component in the browser console.

import { defineComponent, h } from 'vue'
import KComponent from '@/components/KComponent'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Komponent',
  setup(props, { attrs, slots, emit }) {
    console.warn("The Kongponents 'Komponent' component is deprecated and will be removed in a future release.\nUpdate all references of 'Komponent' to 'KComponent'.\nKongponent Docs: https://kongponents.konghq.com/components/breadcrumbs.html")

    return () => h(KComponent, {
      ...props,
      ...attrs,
      ...emit,
    }, slots)
  },
})
