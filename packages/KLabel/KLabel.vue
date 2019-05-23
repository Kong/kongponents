<template functional>
  <label>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'KLabel'
}
</script>

<style scoped>
label {
  display: inline-block;
  color: var(--tblack-85);
  font-weight: 500;
  font-family: var(--font-family-sans);
  font-size: var(--type-sm);
  line-height: var(--type-lg);
  margin-bottom: var(--spacing-xs);
}
</style>
