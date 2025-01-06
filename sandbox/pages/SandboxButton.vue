<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KButton"
  >
    <div class="kbutton-sandbox">
      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent
        title="appearance"
      >
        <template #description>
          KButton component takes 1 of 5 appearance values:
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
            <li>
              <em>none</em>
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
          <KButton
            appearance="none"
            @click="test"
          >
            None
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
          <KButton
            appearance="none"
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
        <!-- @vue-expect-error -->
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
            appearance="none"
            target="_blank"
            to="https://kongponents.konghq.com/"
          >
            None
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
            appearance="none"
            target="_blank"
            :to="{ name: 'home' }"
          >
            None
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
          <KButton
            appearance="none"
            size="large"
          >
            None
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
          <KButton appearance="none">
            None
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
          <KButton
            appearance="none"
            size="small"
          >
            None
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
          <KButton
            icon
            size="large"
          >
            <AddCircleIcon />
          </KButton>
          <KButton
            appearance="secondary"
            icon
            size="large"
          >
            <ProfileIcon />
          </KButton>
          <KButton
            appearance="tertiary"
            icon
            size="large"
          >
            <BookIcon />
          </KButton>
          <KButton
            appearance="danger"
            icon
            size="large"
          >
            <DisabledIcon />
          </KButton>
          <KButton
            appearance="none"
            icon
            size="large"
          >
            <AddCircleIcon />
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton icon>
            <AddCircleIcon />
          </KButton>
          <KButton
            appearance="secondary"
            icon
          >
            <ProfileIcon />
          </KButton>
          <KButton
            appearance="tertiary"
            icon
          >
            <BookIcon />
          </KButton>
          <KButton
            appearance="danger"
            icon
          >
            <DisabledIcon />
          </KButton>
          <KButton
            appearance="none"
            icon
          >
            <AddCircleIcon />
          </KButton>
        </div>
        <div class="horizontal-spacing">
          <KButton
            icon
            size="small"
          >
            <AddCircleIcon />
          </KButton>
          <KButton
            appearance="secondary"
            icon
            size="small"
          >
            <ProfileIcon />
          </KButton>
          <KButton
            appearance="tertiary"
            icon
            size="small"
          >
            <BookIcon />
          </KButton>
          <KButton
            appearance="danger"
            icon
            size="small"
          >
            <DisabledIcon />
          </KButton>
          <KButton
            appearance="none"
            icon
            size="small"
          >
            <AddCircleIcon />
          </KButton>
        </div>
      </SandboxSectionComponent>
      <SandboxTitleComponent
        is-subtitle
        title="Custom button"
      />
      <SandboxSectionComponent>
        <div class="horizontal-spacing">
          <KButton
            appearance="none"
            class="custom-button"
            @click="test"
          >
            Custom
          </KButton>
          <KButton
            appearance="none"
            class="custom-button"
            disabled
            @click="test"
          >
            Custom
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
    flex-wrap: wrap;
    gap: $kui-space-50;
  }
}

/* Low-specificity styles should be able to override */
.custom-button {
  background-color: #42b883;
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;

  &:hover:not(:disabled) {
    background-color: #33a06f;
    transition-duration: .2s;
  }

  &:disabled {
    opacity: 0.3;
  }
}
</style>
