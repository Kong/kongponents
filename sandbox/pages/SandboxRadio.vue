<template>
  <div class="kradio-sandbox">
    <SandboxTitleComponent
      title="KRadio"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=763%3A12969&mode=dev">
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
      <KRadio
        v-model="modelValue"
        label="Label"
        selected-value="foobar"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="description">
      <KRadio
        v-model="modelValue"
        description="Lorem ipsum dolor sit amet."
        label="Label"
        selected-value="foobar1"
      />
    </SandboxSectionComponent>
    <SandboxSectionComponent title="type">
      <div class="horizontal-spacing">
        <KRadio
          v-model="modelValue"
          description="Lorem ipsum dolor sit amet."
          label="Label"
          selected-value="foobar2"
          type="card"
        >
          <WorldIcon />
        </KRadio>
        <KRadio
          v-model="modelValue"
          description="Lorem ipsum dolor sit amet."
          label="Label"
          selected-value="foobar3"
          type="card"
        >
          <WorldPrivateIcon />
        </KRadio>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="labelAttributes">
      <KRadio
        v-model="modelValue"
        label="Label"
        :label-attributes="{ info: 'Tooltip it is' }"
        selected-value="foobar4"
      />
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent title="default">
      <KRadio
        v-model="modelValue"
        selected-value="foobar5"
      >
        Label
      </KRadio>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="description">
      <KRadio
        v-model="modelValue"
        label="Label"
        selected-value="foobar6"
      >
        <template #description>
          Lorem ipsum dolor sit amet.
        </template>
      </KRadio>
    </SandboxSectionComponent>
    <SandboxSectionComponent title="default & description">
      <KRadio
        v-model="modelValue"
        selected-value="foobar7"
      >
        Label
        <template #description>
          Lorem ipsum dolor sit amet.
        </template>
      </KRadio>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KRadio, KExternalLink } from '@/components'
import { WorldIcon, WorldPrivateIcon } from '@kong/icons'

const modelValue = ref('foobar')
</script>

<style lang="scss" scoped>
.horizontal-spacing {
  align-items: flex-end;
  display: flex;
  gap: $kui-space-50;
}
</style>
