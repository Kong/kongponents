<template>
  <input
    :value="value"
    class="form-control k-input"
    @input="e => $emit('input', e.target.value)"
    v-on="listeners">
</template>

<script>
export default {
  name: 'KInput',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    listeners () {
      const listeners = { ...this.$listeners }

      // use @input in template for v-model support
      delete listeners['input']

      return listeners
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';
</style>
