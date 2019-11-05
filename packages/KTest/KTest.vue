<template>
  <div
    v-on="listeners">
    <span>{{ description }}</span>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'KTest',
  props: {
    /**
     * Example documentation comment for a prop
     */
    description: {
      type: String,
      required: false,
      default: 'A default description'
    }
  }
}
</script>

<style scoped>
</style>
