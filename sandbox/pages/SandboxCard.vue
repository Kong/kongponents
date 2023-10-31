<template>
  <div class="kcard-sandbox">
    <SandboxTitleComponent
      title="KCard"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=1152%3A19831&mode=dev">
          Figma
        </KExternalLink>
      </template>
    </SandboxTitleComponent>

    <!-- Props -->
    <SandboxTitleComponent
      is-subtitle
      title="Props"
    />
    <SandboxSectionComponent title="title">
      <KCard title="Card title">
        Card csontent
      </KCard>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KExternalLink, KCard } from '@/components'
</script>

<style scoped lang="scss">
.kcard-sandbox {
  .vertical-spacing {
    display: flex;
    flex-direction: column;
    gap: $kui-space-50;
  }
}
</style>
