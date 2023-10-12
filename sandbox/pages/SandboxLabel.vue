<template>
  <div class="klabel-sandbox">
    <SandboxTitleComponent
      title="KLabel"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=418%3A15878&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <KLabel>
      This is a label
    </KLabel>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent title="info">
      <KLabel
        info="This is an info text"
      >
        Label
      </KLabel>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="required">
      <KLabel required>
        Required label
      </KLabel>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="required with info">
      <KLabel
        info="This is an info text"
        required
      >
        Required label
      </KLabel>
    </SandboxSectionComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Usage"
    />
    <SandboxSectionComponent title="KInput">
      <KInput
        label="Label"
        :label-attributes="{
          help: 'KLabel help prop.',
        }"
        required
      />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KExternalLink, KLabel, KInput } from '@/components'
</script>
