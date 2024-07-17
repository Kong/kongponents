<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="Kongponents Sandbox"
  >
    <div class="sandbox-welcome">
      <h2>Welcome to the Sandbox!</h2>
      <p>
        This sandbox provides users with a controlled environment to test and interact with components. This feature helps to guarantee that the components look and behave as intended, without external interference.
      </p>
      <p>
        By using the sandbox, you can verify that components maintain their visual consistency, regardless of the host app in which they are used.
      </p>
      <div ref="resizeObserverContainer">
        Resize Observer
      </div>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { ResizeObserverHelper } from '@/utilities/resizeObserverHelper'

const resizeObserverContainer = ref<HTMLElement | null>(null)
const resizeObserver = ref<ResizeObserverHelper>()

const onResizeCallback = () => {
  const elWidth = resizeObserverContainer.value?.offsetWidth
  if (resizeObserverContainer.value) {
    resizeObserverContainer.value.style.width = `${elWidth! + 10}px`
  }
}

onMounted(() => {
  resizeObserver.value = ResizeObserverHelper.create(onResizeCallback)
  resizeObserver.value.observe(resizeObserverContainer.value as HTMLDivElement)
})

onUnmounted(() => {
  resizeObserver.value?.unobserve(resizeObserverContainer.value as HTMLDivElement)
})
</script>
