export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ...this.data
    }
  },

  render () {
    return this.$scopedSlots.default({
      data: this.$data
    })
  }
}
