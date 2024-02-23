<template>
  <SandboxLayout
    :links="inject('app-links', [])"
    title="KEmptyState"
  >
    <div class="kemptystate-sandbox">
      <SandboxSectionComponent>
        <KExternalLink href="https://www.figma.com/file/Yze0SWXl5nKjR0rFdilljK/Components?type=design&node-id=2020%3A11252&mode=dev&t=oHjbEUosoGUvnzuN-1">
          Figma
        </KExternalLink>
      </SandboxSectionComponent>

      <!-- Props -->
      <SandboxTitleComponent
        is-subtitle
        title="Props"
      />
      <SandboxSectionComponent title="title & message & actionButtonText">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Content"
        />
        <p>Super long content</p>
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          title="Empty State Super Long Content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </SandboxSectionComponent>
      <SandboxSectionComponent title="actionButtonVisible">
        <KComponent
          v-slot="{ data }"
          :data="{ actionButtonVisible: true }"
        >
          <KInputSwitch
            v-model="data.actionButtonVisible"
            label="Action button visible"
          />

          <KEmptyState
            action-button-text="Action"
            :action-button-visible="data.actionButtonVisible"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
            title="Empty State Action Button"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="actionButtonDisabled">
        <KComponent
          v-slot="{ data }"
          :data="{ actionButtonEnabled: true }"
        >
          <KInputSwitch
            v-model="data.actionButtonEnabled"
            label="Action button enabled"
          />

          <KEmptyState
            :action-button-disabled="!data.actionButtonEnabled"
            action-button-text="Action"
            message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
            title="Empty State Action Button"
          />
        </KComponent>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="error">
        <KEmptyState
          action-button-text="Action"
          error
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Error"
        />
      </SandboxSectionComponent>
      <!-- Slots -->
      <SandboxTitleComponent
        is-subtitle
        title="Slots"
      />
      <SandboxSectionComponent title="default">
        <KEmptyState
          action-button-text="Action"
          title="Empty State Slotted Content"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="icon">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Icon"
        >
          <template #icon>
            <KongIcon
              :color="KUI_COLOR_TEXT_PRIMARY"
              :size="KUI_ICON_SIZE_80"
            />
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
      <SandboxSectionComponent title="action">
        <KEmptyState
          action-button-text="Action"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh."
          title="Empty State Slotted Action Button"
        >
          <template #action>
            <KButton>
              <AddCircleIcon />
              Create New
            </KButton>
          </template>
        </KEmptyState>
      </SandboxSectionComponent>
    </div>
  </SandboxLayout>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import SandboxTitleComponent from '../components/SandboxTitleComponent.vue'
import SandboxSectionComponent from '../components/SandboxSectionComponent.vue'
import { KongIcon, AddCircleIcon } from '@kong/icons'
import { KUI_COLOR_TEXT_PRIMARY, KUI_ICON_SIZE_80 } from '@kong/design-tokens'
</script>
