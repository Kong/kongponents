import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'KToggle',
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggled'],
  setup(props, { slots, emit }) {
    const isToggled = ref(props.toggled)

    const toggle = (): void => {
      isToggled.value = !isToggled.value

      emit('toggled', isToggled.value)
    }

    try {
      if (!slots.default) {
        throw new Error('KToggle expects slot content')
      }

      return () => slots?.default && slots.default({
        isToggled,
        toggle,
      })
    } catch (_) {
      console.error(`KToggle expects to have slot content.

  Example usage:

    <KToggle>
      <button v-slot:default="{isToggled, toggle}" @click="toggle">
        {{ isToggled ? 'hello' : 'goodbye' }}
      </button>
      ^^------add slotted content
    </KToggle>
  `)
      return () => null
    }
  },
})
