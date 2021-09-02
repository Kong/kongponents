export default {
  name: 'KToggle',

  props: {
    toggled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isToggled: this.toggled
    }
  },

  methods: {
    toggle () {
      const newVal = !this.isToggled

      this.isToggled = newVal

      this.$emit('toggled', newVal)
    }
  },

  render () {
    try {
      return this.$scopedSlots.default({
        isToggled: this.isToggled,
        toggle: this.toggle
      })
    } catch (err) {
      console.warn(`KToggle expects a slot.

Example usage:
      
<KToggle>
  <button 
      ^------add slotted content

    v-slot:default="{isToggled, toggle}"
    @click="toggle">
    {{ isToggled ? 'hello' : 'goodbye' }}
  </button>
</KToggle>
  `)
      console.error(err)
    }
  }
}
