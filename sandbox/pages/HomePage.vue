<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="Kongponents Sandbox"
  >
    <div class="sandbox-welcome">
      <h2>Welcome to the Sandbox!</h2>
      <p>
        This sandbox (currently pointed to the <code>alpha</code> branch) provides users with a controlled environment to test and interact with components. This feature helps to guarantee that the components look and behave as intended, without external interference.
      </p>
      <p>
        By using the sandbox, you can verify that components maintain their visual consistency, regardless of the host app in which they are used.
      </p>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
</script>
