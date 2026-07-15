<template>
  <router-view />
  <SandboxThemePicker />
</template>

<script setup lang="ts">
import SandboxThemePicker from './components/SandboxThemePicker.vue'
</script>

<style lang="scss">
body,
html {
  background-color: var(--kui-color-background, #ffffff);
  color: var(--kui-color-text, #000933);
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

* {
  box-sizing: border-box;
}

// Override external SandboxLayout nav link colors so they respond to theming.
// The SandboxLayout applies a compiled #eeeeee to every <a> via SCSS — reset it to
// transparent so dark/brand themes show a clean surface. Active anchors restore their
// background from --kui-navigation-color-background-selected (set per dark/brand theme).
.sandbox-link a {
  color: var(--kui-color-text, #000933) !important;
  background-color: transparent !important;
}

.sandbox-link a.router-link-active,
.sandbox-link a.router-link-exact-active {
  background-color: var(--kui-navigation-color-background-selected, transparent) !important;
  color: var(--kui-color-text-primary, #1155cb) !important;
}

.sandbox-link:hover a {
  color: var(--kui-color-text-primary, #1155cb) !important;
}
</style>
