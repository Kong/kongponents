import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'KComponent',
  props: {
    data: {
      type: Object,
      default: {} as Record<string, any>,
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
