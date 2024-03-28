// This file is a shim to support deprecated components while properly mapping to the new component.
// If this deprecated component is used, it will warn the user to upgrade to the new component in the browser console.

import { defineComponent, h } from 'vue'
import KDropdown from '@/components/KDropdown.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'KDropdownMenu',
  setup(props, { attrs, slots, emit }) {
    console.warn("The Kongponents 'KDropdownMenu' component is deprecated and will be removed in a future release.\nPlease update all references of 'KDropdownMenu' to 'KDropdown'.\nKongponent Docs: https://alpha--kongponents.netlify.app/guide/migrating-to-version-9.html#kdropdownmenu")

    return () => h(KDropdown, {
      ...props,
      ...attrs,
      ...emit,
    }, slots)
  },
})
