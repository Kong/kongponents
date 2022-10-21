
<template>
  <div class="k-menu-item-divider">
    <hr>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KMenuDivider',
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables';
@import '@/styles/functions';

.k-menu-item-divider {
  padding: 0 19px 0 19px;
}
</style>
