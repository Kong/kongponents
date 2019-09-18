<template functional>
  <label class="k-input-label">
    <slot />
  </label>
</template>

<script>
export default {
  name: 'KLabel'
}
</script>

<style lang="scss" scoped>
  @import '~@kongponents/styles/_variables.scss';
  @import '~@kongponents/styles/forms/_labels.scss';
</style>
