import { defineComponent, reactive } from 'vue'

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'KComponent',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props, { slots }) {
    const slotData = reactive(props.data)

    return () => slots?.default && slots.default({
      data: slotData,
    })
  },
})
