<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KInputSwitch"
  >
    <div class="kinputswitch-sandbox">
      <SandboxSectionComponent>
        <KInputSwitch v-model="vModel0" />
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="size">
        <div class="horizontal-spacing">
          <KInputSwitch
            v-model="vModel1"
            size="large"
          />
          <KInputSwitch v-model="vModel1" />
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="label">
        <KInputSwitch
          v-model="vModel1"
          label="Label"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="labelPosition">
        <KInputSwitch
          v-model="vModel1"
          label="Label"
          :label-attributes="{ info: 'I use the KLabel `info` prop' }"
          label-before
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabled">
        <KInputSwitch
          v-model="vModel1"
          disabled
          label="Disabled"
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="disabledTooltipText & tooltipAttributes">
        <KInputSwitch
          v-model="vModel1"
          disabled
          disabled-tooltip-text="Disabled tooltip text"
          label="Disabled"
          :tooltip-attributes="{ placement: 'bottom-start' }"
        />
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="label">
        <KInputSwitch v-model="vModel1">
          <template #label>
            Label
          </template>
        </KInputSwitch>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="label-tooltip">
        <KInputSwitch
          v-model="vModel1"
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

const vModel0 = ref<boolean>(false)
const vModel1 = ref<boolean>(false)
</script>

<style scoped lang="scss">
.kinputswitch-sandbox {
  .horizontal-spacing {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $kui-space-50;
  }
}
</style>
