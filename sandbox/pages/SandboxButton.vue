<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KButton"
  >
    <div class="kbutton-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=0%3A1&mode=dev">
        Figma
      </KExternalLink>

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
        description="Here we pass an invalid value to the appearance prop (see the error in the console) which the KButton handles by falling back to primary appearance."
        title="invalid value"
      >
        <KButton appearance="outline">
          Still Primary
        </KButton>
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
        title="to (a)"
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
          <KButton
            disabled
            target="_blank"
            to="https://kongponents.konghq.com/"
          >
            Disabled
          </KButton>
        </div>
      </SandboxSectionComponent>

      <SandboxSectionComponent
        title="to (router-link)"
      >
        <div class="horizontal-spacing">
          <KButton
            target="_blank"
            :to="{ name: 'home' }"
          >
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            target="_blank"
            :to="{ name: 'home' }"
          >
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            target="_blank"
            :to="{ name: 'home' }"
          >
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            target="_blank"
            :to="{ name: 'home' }"
          >
            Danger
          </KButton>
          <KButton
            disabled
            target="_blank"
            :to="{ name: 'home' }"
          >
            Disabled
          </KButton>
        </div>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent
        title="default"
      >
        <!-- icon before -->
        <div class="horizontal-spacing">
          <KButton size="large">
            <AddCircleIcon />
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            size="large"
          >
            <AddCircleIcon />
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            size="large"
          >
            <AddCircleIcon />
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            size="large"
          >
            <AddCircleIcon />
            Danger
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton>
            <AddCircleIcon />
            Primary
          </KButton>
          <KButton appearance="secondary">
            <AddCircleIcon />
            Secondary
          </KButton>
          <KButton appearance="tertiary">
            <AddCircleIcon />
            Tertiary
          </KButton>
          <KButton appearance="danger">
            <AddCircleIcon />
            Danger
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton size="small">
            <AddCircleIcon />
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            size="small"
          >
            <AddCircleIcon />
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            size="small"
          >
            <AddCircleIcon />
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            size="small"
          >
            <AddCircleIcon />
            Danger
          </KButton>
        </div>
        <!-- icon after -->
        <div class="horizontal-spacing">
          <KButton size="large">
            Primary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="secondary"
            size="large"
          >
            Secondary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="tertiary"
            size="large"
          >
            Tertiary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="danger"
            size="large"
          >
            Danger
            <ChevronDownIcon />
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton>
            Primary
            <ChevronDownIcon />
          </KButton>
          <KButton appearance="secondary">
            Secondary
            <ChevronDownIcon />
          </KButton>
          <KButton appearance="tertiary">
            Tertiary
            <ChevronDownIcon />
          </KButton>
          <KButton appearance="danger">
            Danger
            <ChevronDownIcon />
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton size="small">
            Primary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="secondary"
            size="small"
          >
            Secondary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="tertiary"
            size="small"
          >
            Tertiary
            <ChevronDownIcon />
          </KButton>
          <KButton
            appearance="danger"
            size="small"
          >
            Danger
            <ChevronDownIcon />
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
            <template #icon>
              <AddCircleIcon />
            </template>
          </KButton>
          <KButton
            appearance="secondary"
            size="large"
          >
            <template #icon>
              <ProfileIcon />
            </template>
          </KButton>
          <KButton
            appearance="tertiary"
            size="large"
          >
            <template #icon>
              <BookIcon />
            </template>
          </KButton>
          <KButton
            appearance="danger"
            size="large"
          >
            <template #icon>
              <DisabledIcon />
            </template>
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton>
            <template #icon>
              <AddCircleIcon />
            </template>
          </KButton>
          <KButton appearance="secondary">
            <template #icon>
              <ProfileIcon />
            </template>
          </KButton>
          <KButton appearance="tertiary">
            <template #icon>
              <BookIcon />
            </template>
          </KButton>
          <KButton appearance="danger">
            <template #icon>
              <DisabledIcon />
            </template>
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton size="small">
            <template #icon>
              <AddCircleIcon />
            </template>
          </KButton>
          <KButton
            appearance="secondary"
            size="small"
          >
            <template #icon>
              <ProfileIcon />
            </template>
          </KButton>
          <KButton
            appearance="tertiary"
            size="small"
          >
            <template #icon>
              <BookIcon />
            </template>
          </KButton>
          <KButton
            appearance="danger"
            size="small"
          >
            <template #icon>
              <DisabledIcon />
            </template>
          </KButton>
        </div>
      </SandboxSectionComponent>

      <!-- Legacy -->
      <SandboxTitleComponent
        is-subtitle
        title="Legacy"
      />
      <SandboxSectionComponent
        description="Using KIcon."
        title="Prop: icon"
      >
        <div class="horizontal-spacing">
          <KButton
            icon="chevronDown"
            size="large"
          >
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            icon="chevronDown"
            size="large"
          >
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            icon="chevronDown"
            size="large"
          >
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            icon="chevronDown"
            size="large"
          >
            Danger
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton icon="chevronDown">
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            icon="chevronDown"
          >
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            icon="chevronDown"
          >
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            icon="chevronDown"
          >
            Danger
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton
            icon="chevronDown"
            size="small"
          >
            Primary
          </KButton>
          <KButton
            appearance="secondary"
            icon="chevronDown"
            size="small"
          >
            Secondary
          </KButton>
          <KButton
            appearance="tertiary"
            icon="chevronDown"
            size="small"
          >
            Tertiary
          </KButton>
          <KButton
            appearance="danger"
            icon="chevronDown"
            size="small"
          >
            Danger
          </KButton>
        </div>
      </SandboxSectionComponent>
      <SandboxSectionComponent
        description="When KIcon is slotted in through icon slot, we can't control the icon color unless we pass color prop to KIcon."
        title="Slot: icon"
      >
        <div class="horizontal-spacing">
          <KButton size="large">
            Primary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="secondary"
            size="large"
          >
            Secondary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="tertiary"
            size="large"
          >
            Tertiary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="danger"
            size="large"
          >
            Danger
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton>
            Primary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton appearance="secondary">
            Secondary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton appearance="tertiary">
            Tertiary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton appearance="danger">
            Danger
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton size="small">
            Primary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="secondary"
            size="small"
          >
            Secondary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="tertiary"
            size="small"
          >
            Tertiary
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
          <KButton
            appearance="danger"
            size="small"
          >
            Danger
            <template #icon>
              <KIcon icon="trash" />
            </template>
          </KButton>
        </div>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
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
  }
}
</style>
