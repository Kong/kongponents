<template>
  <label class="k-radio">
    <input
      :checked="isSelected"
      v-bind="$attrs"
      type="radio"
      class="k-input"
      @click="handleClick">
    <span>
      <slot> {{ label }}</slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'KRadio',

  model: {
    prop: 'model',
    event: 'change'
  },

  props: {
    model: {
      type: [String, Number, Boolean, Object],
      required: true
    },
    /**
     * Sets whether or not radio is selected
     */
    value: {
      type: [String, Number, Boolean, Object],
      default: 'on'
    },
    /**
     * Sets label text
     */
    label: {
      type: String,
      default: ''
    }
  },

  computed: {
    isSelected () {
      return this.model === this.value
    }
  },

  methods: {
    handleClick () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@kongponents/styles/_variables.scss';
  @import '~@kongponents/styles/forms/_checkbox-radio.scss';
</style>
