<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KTreeList"
  >
    <div class="ktreelist-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A12779&mode=dev&t=sqzAn4PCrvEoYpdz-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="item" />
      <SandboxSectionComponent title="draggable" />
      <SandboxSectionComponent title="maxDepth" />
      <SandboxSectionComponent title="width" />
      <SandboxSectionComponent title="hideIcon" />

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="item-icon" />
      <SandboxSectionComponent title="item-label" />
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
</script>
