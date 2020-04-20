export default {
  props: {
    initialState: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      state: this.initialState
    }
  },

  methods: {
    update (newState) {
      this.state = Object.assign(this.state, newState)
    }
  },

  render () {
    return this.$scopedSlots.default({
      state: this.state,
      update: this.update
    })
  }
}
