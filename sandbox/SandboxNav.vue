<template>
  <ul>
    <li
      v-for="link in links"
      :key="link.name"
      class="sandbox-link"
    >
      <router-link
        :to="link.to"
        @click="$emit('router-link-click')"
      >
        {{ link.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouteLocationRaw } from 'vue-router'

interface SandboxNavItem {
  name: string
  to: RouteLocationRaw
}

defineEmits(['router-link-click'])

const links = computed((): SandboxNavItem[] => (
  [
    { name: 'KAlert', to: { name: 'alert' } },
    { name: 'KButton', to: { name: 'button' } },
    { name: 'KCatalog', to: { name: 'catalog' } },
    { name: 'KTable', to: { name: 'table' } },
  ]
))
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sandbox-link {
  margin-bottom: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }

  a {
    background: #eee;
    border-radius: 4px;
    color: var(--blue-500);
    display: flex;
    font-weight: 500;
    padding: 8px 16px;
    text-decoration: none;
    transition: all .2s ease-in-out;

    &:hover {
      background: #ccc;
      color: var(--blue-700);
    }

    &.router-link-active {
      background: var(--blue-500);
      color: #fff;

      &:hover {
        background: var(--blue-500);
        color: #fff;
      }
    }
  }
}
</style>
