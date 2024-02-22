<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KEmptyState"
  >
    <div class="kemptystate-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A11252&mode=dev&t=oHjbEUosoGUvnzuN-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title" />
      <SandboxSectionComponent title="message" />
      <SandboxSectionComponent title="actionButtonVisible" />
      <SandboxSectionComponent title="actionButtonText" />
      <SandboxSectionComponent title="actionButtonDisabled" />
      <SandboxSectionComponent title="error" />

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default" />
      <SandboxSectionComponent title="icon" />
      <SandboxSectionComponent title="action" />
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
</script>
