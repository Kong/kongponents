<template>
  <div class="kbutton-sandbox">
    <SandboxTitleComponent
      title="KButton"
    >
      <template #description>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=0%3A1&mode=dev">
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
      title="appearance"
    >
      <template #description>
        KButton component takes 1 of 4 appearance values:
        <ul>
          <li>
            <em>primary</em> - default value
          </li>
          <li>
            <em>secondary</em>
          </li>
          <li>
            <em>tertiary</em>
          </li>
          <li>
            <em>danger</em>
          </li>
        </ul>
      </template>
      <div class="horizontal-spacing">
        <KButton>Primary</KButton>
        <KButton>Secondary</KButton>
        <KButton>Tertiary</KButton>
        <KButton>Danger</KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton>Disabled</KButton>
        <KButton>Disabled</KButton>
        <KButton>Disabled</KButton>
        <KButton>Disabled</KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="size"
    >
      <template #description>
        KButton comes in 3 sizes: <em>large</em>, <em>medium</em> (default) and <em>small</em>.
      </template>
      <div class="horizontal-spacing">
        <KButton>Large</KButton>
        <KButton>Medium</KButton>
        <KButton>Small</KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="to"
    >
      <div class="horizontal-spacing">
        <KButton>Primary</KButton>
        <KButton>Secondary</KButton>
        <KButton>Tertiary</KButton>
        <KButton>Danger</KButton>
      </div>
    </SandboxSectionComponent>

    <!-- Slots -->
    <SandboxTitleComponent
      is-subtitle
      title="Slots"
    />
    <SandboxSectionComponent
      title="before"
    >
      <div class="horizontal-spacing">
        <KButton>Primary</KButton>
        <KButton>Secondary</KButton>
        <KButton>Tertiary</KButton>
        <KButton>Danger</KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="after"
    >
      <div class="horizontal-spacing">
        <KButton>Primary</KButton>
        <KButton>Secondary</KButton>
        <KButton>Tertiary</KButton>
        <KButton>Danger</KButton>
      </div>
    </SandboxSectionComponent>

    <!-- Icon Button -->
    <SandboxTitleComponent
      is-subtitle
      title="Icon Button"
    />
    <SandboxSectionComponent>
      <div class="horizontal-spacing">
        <KButton><AddCircleIcon /></KButton>
        <KButton><ProfileIcon /></KButton>
        <KButton><BookIcon /></KButton>
      </div>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KButton, KExternalLink } from '@/components'
import { AddCircleIcon, ProfileIcon, BookIcon } from '@kong/icons'
</script>

<style lang="scss" scoped>
.kbutton-sandbox {
  .horizontal-spacing {
    display: flex;
    gap: $kui-space-50;
    margin-bottom: $kui-space-70;
  }
}
</style>
