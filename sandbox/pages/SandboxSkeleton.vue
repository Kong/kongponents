<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSkeleton"
  >
    <div class="kskeleton-sandbox">
      <SandboxSectionComponent title="default">
        <KSkeleton />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;table&quot;">
        <KSkeleton type="table" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;card&quot;">
        <p>Card count: 1</p>
        <KSkeleton type="card" />
        <p>Card count: 3</p>
        <KSkeleton
          :card-count="3"
          type="card"
        />
        <p>Card count: 4</p>
        <KSkeleton
          :card-count="4"
          type="card"
        />
        <p>Card count: 6</p>
        <KSkeleton
          :card-count="6"
          type="card"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;form&quot;">
        <KSkeleton type="form" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;spinner&quot;">
        <KSkeleton type="spinner" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;fullscreen-kong&quot;">
        <KButton @click="fullScreenKongSkeleton = true">
          Show
        </KButton>
        <KSkeleton
          v-if="fullScreenKongSkeleton"
          type="fullscreen-kong"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;fullscreen-generic&quot;">
        <KButton @click="fullScreenGenericSkeleton = true">
          Show
        </KButton>
        <KSkeleton
          v-if="fullScreenGenericSkeleton"
          type="fullscreen-generic"
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const fullScreenKongSkeleton = ref<boolean>(false)
const fullScreenGenericSkeleton = ref<boolean>(false)

watch([fullScreenKongSkeleton, fullScreenGenericSkeleton], () => {
  setTimeout(() => {
    fullScreenKongSkeleton.value = false
    fullScreenGenericSkeleton.value = false
  }, 3000)
})
</script>
