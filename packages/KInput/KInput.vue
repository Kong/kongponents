<template>
  <input
    class="form-control k-input"
    v-on="listeners">
</template>

<script>
export default {
  name: 'KInput',
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/_variables.scss';
@import '~@kongponents/styles/forms/_inputs.scss';
</style>
