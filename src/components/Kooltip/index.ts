import { defineComponent, h } from 'vue'
import KTooltip from '@/components/KTooltip/KTooltip.vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Kooltip',
  setup(props, { attrs, slots }) {
    console.warn("The Kongponents 'Kooltip' component is deprecated and will be removed in a future release.\nUpdate all references of 'Kooltip' to 'KTooltip'.\nKongponent Docs: https://kongponents.konghq.com/components/tooltip.html")

    return () => h(KTooltip, {
      ...props,
      ...attrs,
    }, slots)
  },
})
