<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KLabel"
  >
    <div class="klabel-sandbox">
      <SandboxSectionComponent>
        <KLabel>
          This is a label
        </KLabel>
      </SandboxSectionComponent>

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

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="tooltip">
        <KLabel>
          Label
          <template #tooltip>
            <KExternalLink
              href="https://kongponents.konghq.com/"
              target="_blank"
            >
              External link
            </KExternalLink> inside of a tooltip
          </template>
        </KLabel>
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="KInput">
        <KInput
          label="Label"
          :label-attributes="{
            info: 'KLabel info prop.',
          }"
          required
        />
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
</script>
