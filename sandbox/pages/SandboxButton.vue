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
        <KButton @click="test">
          Primary
        </KButton>
        <KButton
          appearance="secondary"
          @click="test"
        >
          Secondary
        </KButton>
        <KButton
          appearance="tertiary"
          @click="test"
        >
          Tertiary
        </KButton>
        <KButton
          appearance="danger"
          @click="test"
        >
          Danger
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton
          disabled
          @click="test"
        >
          Disabled
        </KButton>
        <KButton
          appearance="secondary"
          disabled
          @click="test"
        >
          Disabled
        </KButton>
        <KButton
          appearance="tertiary"
          disabled
          @click="test"
        >
          Disabled
        </KButton>
        <KButton
          appearance="danger"
          disabled
          @click="test"
        >
          Disabled
        </KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="size"
    >
      <template #description>
        KButton comes in 3 sizes: <em>large</em>, <em>medium</em> (default) and <em>small</em>.
      </template>
      <div class="horizontal-spacing">
        <KButton size="large">
          Large
        </KButton>
        <KButton>Medium</KButton>
        <KButton size="small">
          Small
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton
          appearance="secondary"
          size="large"
        >
          Large
        </KButton>
        <KButton appearance="secondary">
          Medium
        </KButton>
        <KButton
          appearance="secondary"
          size="small"
        >
          Small
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton
          appearance="tertiary"
          size="large"
        >
          Large
        </KButton>
        <KButton appearance="tertiary">
          Medium
        </KButton>
        <KButton
          appearance="tertiary"
          size="small"
        >
          Small
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton
          appearance="danger"
          size="large"
        >
          Large
        </KButton>
        <KButton appearance="danger">
          Medium
        </KButton>
        <KButton
          appearance="danger"
          size="small"
        >
          Small
        </KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="to"
    >
      <div class="horizontal-spacing">
        <KButton
          target="_blank"
          to="https://kongponents.konghq.com/"
        >
          Primary
        </KButton>
        <KButton
          appearance="secondary"
          target="_blank"
          to="https://kongponents.konghq.com/"
        >
          Secondary
        </KButton>
        <KButton
          appearance="tertiary"
          target="_blank"
          to="https://kongponents.konghq.com/"
        >
          Tertiary
        </KButton>
        <KButton
          appearance="danger"
          target="_blank"
          to="https://kongponents.konghq.com/"
        >
          Danger
        </KButton>
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
        <KButton size="large">
          <template #before>
            <AddCircleIcon />
          </template>
          Primary
        </KButton>
        <KButton
          appearance="secondary"
          size="large"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Secondary
        </KButton>
        <KButton
          appearance="tertiary"
          size="large"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Tertiary
        </KButton>
        <KButton
          appearance="danger"
          size="large"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Danger
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton>
          <template #before>
            <AddCircleIcon />
          </template>
          Primary
        </KButton>
        <KButton appearance="secondary">
          <template #before>
            <AddCircleIcon />
          </template>
          Secondary
        </KButton>
        <KButton appearance="tertiary">
          <template #before>
            <AddCircleIcon />
          </template>
          Tertiary
        </KButton>
        <KButton appearance="danger">
          <template #before>
            <AddCircleIcon />
          </template>
          Danger
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton size="small">
          <template #before>
            <AddCircleIcon />
          </template>
          Primary
        </KButton>
        <KButton
          appearance="secondary"
          size="small"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Secondary
        </KButton>
        <KButton
          appearance="tertiary"
          size="small"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Tertiary
        </KButton>
        <KButton
          appearance="danger"
          size="small"
        >
          <template #before>
            <AddCircleIcon />
          </template>
          Danger
        </KButton>
      </div>
    </SandboxSectionComponent>
    <SandboxSectionComponent
      title="after"
    >
      <div class="horizontal-spacing">
        <KButton size="large">
          Primary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="secondary"
          size="large"
        >
          Secondary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="tertiary"
          size="large"
        >
          Tertiary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="danger"
          size="large"
        >
          Danger
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton>
          Primary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton appearance="secondary">
          Secondary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton appearance="tertiary">
          Tertiary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton appearance="danger">
          Danger
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton size="small">
          Primary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="secondary"
          size="small"
        >
          Secondary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="tertiary"
          size="small"
        >
          Tertiary
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
        <KButton
          appearance="danger"
          size="small"
        >
          Danger
          <template #after>
            <ChevronDownIcon />
          </template>
        </KButton>
      </div>
    </SandboxSectionComponent>

    <!-- Icon Button -->
    <SandboxTitleComponent
      is-subtitle
      title="Icon Button"
    />
    <SandboxSectionComponent>
      <div class="horizontal-spacing">
        <KButton size="large">
          <template #before>
            <AddCircleIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="secondary"
          size="large"
        >
          <template #before>
            <ProfileIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="tertiary"
          size="large"
        >
          <template #before>
            <BookIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="danger"
          size="large"
        >
          <template #before>
            <DisabledIcon />
          </template>
          <template #after>
            <BookIcon />
          </template>
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton>
          <template #before>
            <AddCircleIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton appearance="secondary">
          <template #before>
            <ProfileIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton appearance="tertiary">
          <template #before>
            <BookIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton appearance="danger">
          <template #before>
            <DisabledIcon />
          </template>
          <template #after>
            <BookIcon />
          </template>
        </KButton>
      </div>
      <div class="horizontal-spacing">
        <KButton size="small">
          <template #before>
            <AddCircleIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="secondary"
          size="small"
        >
          <template #before>
            <ProfileIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="tertiary"
          size="small"
        >
          <template #before>
            <BookIcon />
          </template>
          <template #after>
            <DisabledIcon />
          </template>
        </KButton>
        <KButton
          appearance="danger"
          size="small"
        >
          <template #before>
            <DisabledIcon />
          </template>
          <template #after>
            <BookIcon />
          </template>
        </KButton>
      </div>
    </SandboxSectionComponent>
  </div>
</template>

<script setup lang="ts">
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KButton, KExternalLink } from '@/components'
import { AddCircleIcon, ProfileIcon, BookIcon, ChevronDownIcon, DisabledIcon } from '@kong/icons'

const test = () => {
  alert('Clicked!')
}
</script>

<style lang="scss" scoped>
.kbutton-sandbox {
  .horizontal-spacing {
    align-items: flex-end;
    display: flex;
    gap: $kui-space-50;
    margin-bottom: $kui-space-70;
  }
}
</style>
