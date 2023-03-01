<template>
  <div class="sandbox-wrapper">
    <router-link
      class="sandbox-link"
      :to="{ name: 'home'}"
    >
      <h1>
        Kongponents Sandbox
      </h1>
    </router-link>
    <div class="sandbox-layout">
      <div class="nav-container">
        <ul>
          <li>
            <router-link
              class="sandbox-link"
              :to="{ name: 'alert'}"
            >
              KAlert
            </router-link>
          </li>
          <li>
            <router-link
              class="sandbox-link"
              :to="{ name: 'button'}"
            >
              KButton
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sandbox-container">
        <div
          v-if="isHomePage"
          class="sandbox-welcome"
        >
          <h2>Welcome to the Sandbox!</h2>
          <p>
            The sandbox mode in Kongponents provides developers with a controlled environment to test and ensure that no styles from the docs app leak through into the component library. This feature guarantees that the components look and function as intended, without any external interference.
          </p>
          <p>
            By using the sandbox mode, you can have confidence that components maintain their visual consistency, regardless of the context in which they are used.
          </p>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isHomePage = computed((): boolean => route.name === 'home')
</script>

<style lang="scss" scoped>
.sandbox-wrapper {
  padding: 20px;

  .sandbox-layout {
    display: flex;

    .nav-container {
      min-width: 300px;
    }
  }

  .sandbox-link {
    color: var(--blue-500);
    text-decoration: none;

    &:hover {
      color: var(--blue-600);
    }

    &:visited {
      color: var(--blue-500);
    }

    &:visited:hover {
      color: var(--blue-600);
    }
  }
}

.sandbox-container {
  border: 1px solid #eee;
  min-height: 80vh;
  padding: 20px;
  width: 100%;

  .sandbox-welcome {
    margin: 0 auto;
    max-width: 700px;

    h2 {
      text-align: center;
    }
  }
}
</style>
