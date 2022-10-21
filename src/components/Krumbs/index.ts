// This file is a shim to support deprecated components while properly mapping to the new component.
// If this deprecated component is used, it will warn the user to upgrade to the new component in the browser console.

import { defineComponent, h, onMounted } from 'vue'
import KBreadcrumbs from '@/components/KBreadcrumbs/KBreadcrumbs.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Krumbs',
  setup(props, { attrs, slots, emit }) {
    onMounted(() => console.warn("The Kongponents 'Krumbs' component is deprecated and will be removed in a future release.\nUpdate all references of 'Krumbs' to 'KBreadcrumbs'.\nKongponent Docs: https://kongponents.konghq.com/components/breadcrumbs.html"))

    return () => h(KBreadcrumbs, {
      ...props,
      ...attrs,
      ...emit,
    }, slots)
  },
})
