<template>
  <ul>
    <li>
      <router-link
        class="sandbox-link"
        :to="{ name: 'alert'}"
        @click="$emit('router-link-click')"
      >
        KAlert
      </router-link>
    </li>
    <li>
      <router-link
        class="sandbox-link"
        :to="{ name: 'button'}"
        @click="$emit('router-link-click')"
      >
        KButton
      </router-link>
    </li>
  </ul>
</template>
