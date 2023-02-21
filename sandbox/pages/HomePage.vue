<template>
  <h1>Sandbox Components</h1>
  <div class="app-layout">
    <div class="nav-container">
      <ul>
        <li>
          <router-link :to="{ name: 'home'}">
            Home
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'alert'}">
            KAlert
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'button'}">
            KButton
          </router-link>
        </li>
      </ul>
    </div>
    <div class="sandbox-container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
}
.nav-container {

}

.sandbox-container {
  border: 1px solid #eee;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
}
</style>
