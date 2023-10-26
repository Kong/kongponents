<template>
  <div class="kselect-sandbox">
    <SandboxTitleComponent
      title="KSelect"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=283%3A2898&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent
      title="items"
    >
      <KSelect
        :items="[{
          label: 'Cats',
          value: 'cats',
          selected: true
        }, {
          label: 'Dogs',
          value: 'dogs',
          disabled: true,
        }, {
          label: 'Bunnies',
          value: 'bunnies'
        }, {
          label: 'Duck',
          value: 'duck',
          group: 'Birds'
        }, {
          label: 'Oriole',
          value: 'oriole',
          group: 'Birds'
        }, {
          label: 'Trout',
          value: 'trout',
          group: 'Fish'
        }, {
          label: 'Salmon',
          value: 'salmon',
          group: 'Fish'
        }]"
      />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KSelect, KExternalLink } from '@/components'
</script>

<style lang="scss" scoped>
.kselect-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
  }
}
</style>
