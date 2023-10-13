<template>
  <div class="kdropdown-sandbox">
    <SandboxTitleComponent
      title="KDropdown"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=466%3A9443&mode=dev">
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
      title="button-text (replacement for deprecated label)"
    >
      <KDropdownMenu
        :items="[
          { label: 'Props', to: { path: '/components/dropdown-menu.html', hash: '#props' } },
          { label: 'Slots', to: { path: '/components/dropdown-menu.html', hash: '#slots' } },
          { label: 'Top', to: { path: '/components/dropdown-menu.html' } }
        ]"
        label="Documentation"
      />
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KDropdownMenu, KExternalLink } from '@/components'
</script>
