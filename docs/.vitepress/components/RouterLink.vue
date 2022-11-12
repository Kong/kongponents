<template>
  <a :href="typeof to === 'string' ? to : to.path"><slot /></a>
</template>

<script setup>
defineProps({
  to: {
    type: [Object, String],
    required: true
  }
})
</script>

<script>
export default {
  inheritAttrs: false
}
</script>
