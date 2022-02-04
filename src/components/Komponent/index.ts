import { defineComponent, reactive, h } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Komponent',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props, { slots }) {
    const slotData = reactive(props.data)

    return () => h('span', slots?.default && slots.default({
      data: slotData,
    }))
  },
})
