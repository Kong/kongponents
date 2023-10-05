<template>
  <div class="kbutton-sandbox">
    <SandboxTitleComponent
      title="KInput"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=218%3A646&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent title="label">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="labelAttributes">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="help">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="hasError">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="errorMessage">
      <KInput label="Label" />
    </SandboxSectionComponent>

    <!-- Attributes -->
    <SandboxTitleComponent
      is-subtitle
      title="Attributes"
    />
    <SandboxSectionComponent>
      <KInput
        label="Required"
        required
      />
      <KInput
        disabled
        label="Disabled"
      />
      <KInput
        label="Readonly"
        readonly
      />
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent title="before">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="after">
      <KInput label="Label" />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="label-tooltip">
      <KInput label="Label" />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KInput, KExternalLink } from '@/components'
</script>
