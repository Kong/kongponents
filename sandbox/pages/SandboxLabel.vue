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
          info: 'KLabel info prop.',
        }"
        required
      />
    </SandboxSectionComponent>

    <!-- Legacy -->
    <SandboxTitleComponent
      is-subtitle
      title="Legacy"
    />
    <SandboxSectionComponent
      description="Handles backwards compatibility for deprecated prop usage when passed directly to KLabel or propagated through other components through labelAttributes prop."
      title="Props: help (deprecated)"
    >
      <div class="vertical-spacing">
        <KLabel
          help="This is help text"
        >
          Label with help tooltip
        </KLabel>
        <KInput
          label="Label"
          :label-attributes="{
            help: 'KLabel help.',
          }"
        />
        <KRadio
          v-model="radioCheck"
          label="Label"
          :label-attributes="{ help: 'KLabel help.' }"
          :selected-value="true"
        />
        <KCheckbox
          v-model="radioCheck"
          label="Label"
          :label-attributes="{ help: 'KLabel help.' }"
        />
      </div>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KExternalLink, KLabel, KInput, KRadio, KCheckbox } from '@/components'

const radioCheck = ref<boolean>(false)
</script>

<style scoped lang="scss">
.klabel-sandbox {
  .vertical-spacing {
    display: flex;
    flex-direction: column;
    gap: $kui-space-50;
  }
}
</style>
