<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KPagination"
  >
    <div class="kpagination-sandbox">
      <!-- Figma -->
      <SandboxTitleComponent
        is-subtitle
        title="Figma"
      />
      <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A11254&mode=dev&t=z4m6LiZVAeHHwxSH-1">
        Figma
      </KExternalLink>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="KCollapse title">
        <KCollapse
          content-id="contentId"
          title="KCollapse title"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </KCollapse>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="triggerAlignment">
        <KCollapse
          title="KCollapse title"
          trigger-alignment="leading"
          trigger-label="Trigger label"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </KCollapse>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="triggerLabel">
        <KCollapse
          trigger-label="Trigger label"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </KCollapse>
      </SandboxSectionComponent>

      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="visible-content">
        <KCollapse title="KCollapse title">
          <template #visible-content>
            This is the visible content
          </template>
          This is the hidden content
        </KCollapse>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="trigger-content">
        <KCollapse>
          <template #trigger-content>
            Custom trigger content
          </template>
          This is the hidden content
        </KCollapse>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="trigger">
        <KCollapse>
          <template #trigger="{ isCollapsed, toggle }">
            <KButton @click="toggle()">
              {{ isCollapsed ? 'Expand' : 'Collapse' }}
            </KButton>
          </template>
          This is the hidden content
        </KCollapse>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="title">
        <KCollapse>
          <template #title>
            Slotted title
          </template>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </KCollapse>
      </SandboxSectionComponent>

      <!-- Usage -->
      <SandboxTitleComponent
        is-subtitle
        title="Usage"
      />
      <SandboxSectionComponent title="Slotted title & cusom trigger">
        <KCollapse>
          <template #title>
            <KongIcon
              :color="KUI_COLOR_TEXT_NEUTRAL"
              :size="KUI_ICON_SIZE_40"
            />
            Slotted title
          </template>

          <template #trigger="{ isCollapsed, toggle }">
            <KButton @click="toggle()">
              {{ isCollapsed ? 'Expand' : 'Collapse' }}
            </KButton>
          </template>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </KCollapse>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_NEUTRAL, KUI_ICON_SIZE_40 } from '@kong/design-tokens'
</script>
