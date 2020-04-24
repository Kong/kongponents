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
  created () { this.$emit('created') },
  mounted () { this.$emit('mounted') },

  render () {
    return this.$scopedSlots.default({
      data: this.$data
    })
  }
}
