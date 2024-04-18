<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KStepper"
  >
    <div class="kstepper-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2760%3A12829&mode=dev&t=m6UqtRoz81rfy7Vk-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="steps">
        <KStepper :steps="steps" />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="maxLabelWidth">
        <KStepper
          max-label-width="150"
          :steps="longLabelSteps"
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import type { StepItem } from '@/types'

const steps: StepItem[] = [
  { label: 'Completed', state: 'completed' },
  { label: 'Active', state: 'active' },
  { label: 'Default', state: 'default' },
  { label: 'Pending', state: 'pending' },
  { label: 'Error', state: 'error' },
]

const longLabelSteps: StepItem[] = [
  { label: 'Completed. Lorem ipsum dolor sit amet.', state: 'completed' },
  { label: 'Active. Lorem ipsum dolor sit amet.', state: 'active' },
  { label: 'Default. Lorem ipsum dolor sit amet.', state: 'default' },
]
</script>
