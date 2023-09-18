<template>
  <div class="sandbox-header">
    <router-link
      class="home-link"
      :to="{ name: 'home'}"
    >
      <h1>
        Kongponents Sandbox
      </h1>
    </router-link>
    <div class="mobile-nav-container">
      <KToggle v-slot="{ isToggled, toggle }">
        <div>
          <KButton
            appearance="btn-link"
            size="small"
            @click="toggle"
          >
            <template #icon>
              <KIcon icon="list" />
            </template>
          </KButton>
          <KSlideout
            :is-visible="isToggled.value"
            @close="toggle"
          >
            <SandboxNavComponent @router-link-click="toggle" />
          </KSlideout>
        </div>
      </KToggle>
    </div>
  </div>
  <div class="sandbox-layout">
    <div class="desktop-nav-container">
      <SandboxNavComponent />
    </div>
    <div class="sandbox-container">
      <div
        v-if="isHomePage"
        class="sandbox-welcome"
      >
        <h2>Welcome to the Sandbox!</h2>
        <p>
          This sandbox (currently pointed to the <code>alpha</code> branch) provides users with a controlled environment to test and interact with components. This feature helps to guarantee that the components look and behave as intended, without external interference.
        </p>
        <p>
          By using the sandbox, you can verify that components maintain their visual consistency, regardless of the host app in which they are used.
        </p>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import SandboxNavComponent from '../components/SandboxNavComponent.vue'
import { KToggle, KButton, KSlideout, KIcon } from '@/components'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isHomePage = computed((): boolean => route.name === 'home')
</script>

<style lang="scss" scoped>
  .sandbox-header {
    align-items: center;
    border-bottom: 1px solid lightgray;
    display: inline-flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;

    @media only screen and (min-width: $kui-breakpoint-laptop) {
      border: none;
    }

    h1 {
      font-size: 18px;
      margin: 0;

      @media only screen and (min-width: $kui-breakpoint-phablet) {
        font-size: 24px;
      }
    }

    .mobile-nav-container {
      @media only screen and (min-width: $kui-breakpoint-laptop) {
        display: none;
      }
    }
  }

  .sandbox-layout {
    display: flex;
    padding: 20px;

    .desktop-nav-container {
      display: none;
      min-width: 280px;

      @media only screen and (min-width: $kui-breakpoint-laptop) {
        display: block;
      }
    }

    .mobile-nav-container, .desktop-nav-container {
      margin-right: 20px;
    }
  }

.sandbox-container {
  min-height: 50vh;
  width: 100%;

  @media only screen and (min-width: $kui-breakpoint-laptop) {
    border: 1px solid lightgray;
    padding: 20px;
  }

  .sandbox-welcome {
    margin: 0 auto;
    max-width: 700px;

    h2 {
      text-align: center;
    }
  }
}

.home-link {
  color: $kui-color-text-primary;
  text-decoration: none;
}
</style>
