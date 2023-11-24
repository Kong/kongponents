<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KLabel"
  >
    <div class="kinputswitch-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <SandboxSectionComponent>
        <div>
          <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=624%3A12900&mode=dev">
            Figma
          </KExternalLink>
        </div>

        <div>
          <KInputSwitch v-model="vModel" />
        </div>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="size">
        <div class="horizontal-spacing">
          <KInputSwitch
            v-model="vModel"
            size="large"
          />
          <KInputSwitch v-model="vModel" />
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="label">
        <KInputSwitch
          v-model="vModel"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelPosition">
        <KInputSwitch
          v-model="vModel"
          label="Label"
          :label-attributes="{ info: 'I use the KLabel `info` prop' }"
          label-before
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabled">
        <KInputSwitch
          v-model="vModel"
          disabled
          label="Disabled"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="label">
        <KInputSwitch v-model="vModel">
          <template #label>
            Label
          </template>
        </KInputSwitch>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="label-tooltip">
        <KInputSwitch
          v-model="vModel"
          label="Label"
        >
          <template #label-tooltip>
            Id: <code>8576925e-d7e0-4ecd-8f14-15db1765e69a</code>
          </template>
        </KInputSwitch>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'

const vModel = ref<boolean>(false)
</script>

<style scoped lang="scss">
.kinputswitch-sandbox {
  .horizontal-spacing {
    display: flex;
    flex-direction: row;
    gap: $kui-space-50;
  }
}
</style>
