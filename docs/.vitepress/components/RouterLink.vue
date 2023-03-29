<template>
  <a :href="typeof to === 'string' ? to : (to.path ?? to.name)"><slot /></a>
</template>

<script setup>
defineProps({
  to: {
    type: [Object, String],
    required: true
  }
})
</script>
