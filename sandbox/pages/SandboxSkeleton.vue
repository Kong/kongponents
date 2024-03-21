<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KSkeleton"
  >
    <div class="kskeleton-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A12479&mode=dev&t=uQGBuUCQfJdk9Uab-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <SandboxSectionComponent title="default">
        <KSkeleton />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;table&quot;">
        <KSkeleton type="table" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="type=&quot;card&quot;">
        <KSkeleton type="card" />
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
