export default {
  props: {
    initialState: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      // We can initialize our state using the
      // prop `initialState`
      state: this.initialState
    }
  },

  methods: {
    update (newState) {
      // Copy all properties from newState on to
      // this.state, overriding anything on this.state
      this.state = Object.assign(this.state, newState)
    }
  },

  render () {
    // Pass our state and the update function into
    // our scoped slot so we can render children.
    return this.$scopedSlots.default({
      state: this.state,
      update: this.update
    })
  }
}
