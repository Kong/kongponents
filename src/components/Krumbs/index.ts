import { defineComponent, h } from 'vue'
import KBreadcrumbs from '@/components/KBreadcrumbs/KBreadcrumbs.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Krumbs',
  setup(props, { attrs, slots }) {
    console.warn("The Kongponents 'Krumbs' component is deprecated and will be removed in a future release.\nUpdate all references of 'Krumbs' to 'KBreadcrumbs'.\nKongponent Docs: https://kongponents.konghq.com/components/breadcrumbs.html")

    return () => h(KBreadcrumbs, {
      ...props,
      ...attrs,
    }, slots)
  },
})
