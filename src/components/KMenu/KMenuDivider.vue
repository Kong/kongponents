<template>
  <div class="k-menu-item-divider">
    <hr>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>



.k-menu-item-divider {
  padding: var(--kui-space-0, $kui-space-0) var(--kui-space-70, $kui-space-70);

  hr {
    border: none;
    border-top: var(--kui-border-width-10, $kui-border-width-10) solid var(--grey-300, var(--kui-color-border-neutral-weak, $kui-color-border-neutral-weak));
    margin: var(--kui-space-60, $kui-space-60) var(--kui-space-0, $kui-space-0);
  }
}
</style>
