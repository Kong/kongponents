<template>
  <!-- template required for global ui components, insert hidden stub -->
  <div hidden style="display: none;"/>
</template>

<script>
import Vue from 'vue'
import ToastManager from '../../../packages/KToaster/ToastManager'

export default {
  mounted () {
    // Register singletons
    Vue.prototype.$toaster = new ToastManager()
  }
}
</script>
